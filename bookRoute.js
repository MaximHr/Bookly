const pool = require('./db');
const router = require('express').Router();
const fs = require('fs');
const {v4: uuidv4} = require('uuid');

router.post('/upload', async(req, res) => {

    const {title, file, cover, price, description, tags, user_id} = req.body;
    
    console.log(req.body)
    try {
        const fileName = uuidv4();
        fs.appendFile(`./files/${fileName}`, file, err => {
            if(err) throw err;
        })

        const newBook = await pool.query('INSERT INTO Books (title, description, price, tags, file, cover, user_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *', [title, description, JSON.parse(price), tags, fileName, cover, user_id]);

        res.json(newBook.rows[0]);
    } catch(err) {
        res.status(500).send(err.message);
    }
});

//home page
router.get('/new/:offset/:limit', async(req, res) => {
    const {offset, limit} = req.params;
    try {
        // const books = await pool.query('SELECT * FROM Books JOIN Users ON Users.id = Books.user_id ORDER BY Books.id DESC OFFSET $1 LIMIT $2', [offset, limit]);

        // res.json(books.rows)

        const books = await pool.query('SELECT Books.id, name, cover, title, price, file FROM Users JOIN Books ON Books.user_id = Users.id ORDER BY Books.id DESC OFFSET $1 LIMIT $2', [offset, limit]);

        res.json(books.rows)

    }catch(err) {
        res.status(500).send(err.message);
    }
});


//book detail page
router.get('/details/:id', async(req,res) => {
    try {
        const details = await pool.query('SELECT age, name, school, title, description, price, tags, cover FROM Users JOIN Books ON Books.user_id = Users.id WHERE file=$1', [req.params.id]);

        res.json(details.rows[0]);

    }catch(err) {
        res.status(500).send(err.message);
    }
})


module.exports = router;