const pool = require('./db');
const router = require('express').Router();
const bcrypt = require('bcrypt');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


//създаване на user
router.post('/register', async(req, res) => {
    try {
        const {email, name, password, age, school, gender} = req.body;
        if(password.length > 5 && email && name) {

            //криптира паролата
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // payment account
            // const account = await stripe.accounts.create({type: 'express', email: email});
            // console.log(account);
            
            const  newUser = await pool.query('INSERT INTO Users (name, password, email, age, school, gender) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', [name, hashedPassword, email, age, school, gender]);

            delete newUser.rows[0].password;
            return res.json(newUser.rows[0]);
        } else {
            return res.status(500).send('Password is too weak');
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
});

// влизане в профила
router.post('/login', async(req, res) => {
    try {
        const {email, password} = req.body;

        const user = await pool.query(`SELECT * FROM Users WHERE email=$1`, [email]);
        
        if(user.rows.length === 0) {
            return res.status(500).send('Incorrect email or password.');
        }
        const encryptedPassword = user.rows[0].password;

        const checkPassword = bcrypt.compareSync(password, encryptedPassword);

        if(checkPassword) {
            delete user.rows[0].password;
            return res.json(user.rows[0]);
        } else {
            return res.status(500).send('Incorrect email or password.');
        }


    } catch (error) {
        res.status(500).send(error.message);
    }
});


//взима user-ът според id-то му.
router.get('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const user = await pool.query('SELECT * FROM Users WHERE id=$1', [id]);

        res.json(user);

    } catch (error) {
        res.status(500).send(error.message);
    }
});

//добавя книга в reading list-а на клиента.
router.put('/addBook', async(req, res) => {
    const{ userId, bookId } = req.body;
    try {
        const updatedUser = await pool.query('UPDATE Users SET readBooks=array_append(readBooks, $1) WHERE id=$2 RETURNING *', [bookId, userId]);

        await pool.query('UPDATE Books SET views=views+1 WHERE id=$1', [bookId]);

        res.json(updatedUser.rows[0]);
    }catch(err) {
        res.status(500).send(err.message);
    }
})


module.exports = router;
