const pool = require('./db');
const router = require('express').Router();
const express = require('express');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

//взима продавач
router.get('/account/:id', async(req, res) => {
    try {
        const account = await stripe.accounts.retrieve(req.params.id);
        res.send(account);


    }catch(err) {
        res.status(500).send(err.message);
    }
});

//плащане на книга
router.post('/payment', async(req, res) => {
    const {stripe_account, price, title, cover, id, userId} = req.body;
    console.log(stripe_account)
    try {
        let product;
        if(cover.length < 2048) {
            // ако има качена снимка за cover
            product = await stripe.products.create({
                name: title,
                images: [cover]
            });
        } else {
            product = await stripe.products.create({
                name: title
            });
        }
   
        const bookPrice = await stripe.prices.create({
            unit_amount: price * 100, //unit_amount е в стотинки, а bookPrice в левове.
            currency: 'bgn',
            product: product.id,
            billing_scheme: 'per_unit'
        });

        const origin = `${req.headers.origin}`;

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: [{price: bookPrice.id, quantity: 1}],
            payment_intent_data: {
              application_fee_amount: Math.floor((price * 100) * 0.07), //7 процента от цената на книгата отиват за bookly
              transfer_data: {destination: stripe_account},
            },
            metadata: {
                userId: userId,
                bookId: id
            },
            success_url: `${origin}/success`,
            cancel_url: `${origin}/cancel`,
        });
        console.log(session)

        res.send(session.url);

    }catch(err) {
        res.status(500).send(err.message);
    }
});

//създава продавач за книги
router.post("/account", async (req, res) => {
    try {
        const account = await stripe.accounts.create({
            type: 'express',
            country: 'BG',
            tos_acceptance: {service_agreement: 'full'},
            business_type: 'individual',
            email: req.body.email,
            capabilities: {
                card_payments: {
                  requested: true,
                },
                transfers: {
                  requested: true,
                },
              },
        });
        
        const updatedUser = await pool.query('UPDATE Users SET stripe_account=$1 WHERE id=$2 RETURNING *', [account.id, req.body.id]);

        const origin = `${req.headers.origin}`;
        
        const accountLink = await stripe.accountLinks.create({
            type: "account_onboarding",
            account: account.id,
            refresh_url: `${origin}/stripeAuth`,
            return_url: `${origin}/home`,
        });

        res.send({...updatedUser.rows[0], url: accountLink.url});

    } catch (err) {
        res.status(500).send({
            error: err.message,
        });
    }
});

//слуша за платена книга
router.post('/webhooks', express.raw({type: 'application/json'}), async(request, res) => {
    let event = request.body;
    if (endpointSecret) {
        //проверява дали заявката идва от Stripe
        const signature = request.headers['stripe-signature'];
        try {
            event = stripe.webhooks.constructEvent(
                request.body,
                signature,
                endpointSecret
            );
        } catch (err) {
            console.log(`⚠️  Webhook signature verification failed.`, err.message);
            return res.sendStatus(400);
        }
    }
    if(event.type === 'checkout.session.completed') {
        if(event.data.object.status === 'complete') {
            //добавя купената книга на клиента
            const {bookId, userId} = event.data.object.metadata;
            console.log(bookId, userId);
            try {
                await pool.query('UPDATE Users SET boughtbooks=array_append(readBooks, $1) WHERE id=$2 RETURNING *', [bookId, userId]);
                
                await pool.query('UPDATE Users SET readbooks=array_append(readBooks, $1) WHERE id=$2 RETURNING *', [bookId, userId]);
                
                await pool.query('UPDATE Books SET views=views+1 WHERE id=$1', [bookId]);
            }catch(err) {
                res.status(500).send(err.message);
            }
        }
    }
   
});

module.exports = router;