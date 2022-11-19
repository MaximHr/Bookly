const pool = require('./db');
const router = require('express').Router();
const fs = require('fs');
const multer = require('multer');
const {v4: uuidv4} = require('uuid');

router.get('/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const book = await pool.query('SELECT * FROM Books WHERE id=$1', [id]);
        res.json(book.rows[0]);

    }catch(err) {
        res.status(500).send(err.message);
    }
})

const storage = multer.diskStorage({
    destination: './files',
    filename: (req, file, cb) => {
        cb(null, 'Hello' + '.pdf');
    }
})
const upload = multer({storage: storage});

router.post('/upload2', upload.single('file'), async(req, res) => {
    
})
router.post('/upload', async(req, res) => {

    const {title, file, cover, price, description, tags, user_id} = req.body;
    
    console.log(req.body);
    try {

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

        const books = await pool.query('SELECT Books.id, Users.name, cover,summedRating, numberOfRatings, title, price, file FROM Users JOIN Books ON Books.user_id = Users.id ORDER BY Books.id DESC OFFSET $1 LIMIT $2', [offset, limit]);

        res.json(books.rows)

    }catch(err) {
        res.status(500).send(err.message);
    }
});

router.get('/popular/:offset/:limit', async(req, res) => {
    const {offset, limit} = req.params;
    try {
        const books = await pool.query('SELECT Books.id, name, cover, title,summedRating, numberOfRatings, price, file FROM Users JOIN Books ON Books.user_id = Users.id ORDER BY Books.views DESC OFFSET $1 LIMIT $2', [offset, limit]);

        res.json(books.rows)

    }catch(err) {
        res.status(500).send(err.message);
    }
});

router.get('/highestRated/:offset/:limit', async(req, res) => {
    const {offset, limit} = req.params;
    try {
        const books = await pool.query('SELECT Books.id, name, cover, title,summedRating, numberOfRatings, price, file FROM Users JOIN Books ON Books.user_id = Users.id ORDER BY books.summedRating / NULLIF(numberOfRatings, 0) DESC OFFSET $1 LIMIT $2', [offset, limit]);

        res.json(books.rows)

    }catch(err) {
        res.status(500).send(err.message);
    }
});


//book detail page
router.get('/details/:id', async(req,res) => {
    try {
        const details = await pool.query('SELECT Books.id, age, name, school, gender, title, description, ratedBooks, price, summedRating, numberOfRatings, tags, cover FROM Users JOIN Books ON Books.user_id = Users.id WHERE file=$1', [req.params.id]);

        res.json(details.rows[0]);

    }catch(err) {
        res.status(500).send(err.message);
    }
});

// add new rating
router.put('/addRating', async(req, res) => {
    const {bookId, rating, userId} = req.body;
    try {
        const updatedBook = await pool.query('UPDATE Books SET summedRating=summedRating+$1, numberOfRatings=numberOfRatings+$2 WHERE id=$3 RETURNING *', [rating, 1, bookId]);

        const updatedUser = await pool.query('UPDATE Users SET ratedBooks=array_append(ratedBooks, $1) WHERE id=$2 RETURNING *',[bookId, userId]);

        res.json({updatedBook, updatedUser});

    }catch(err) {
        res.status(500).send(err.message);
    }
});

//search for book

router.get('/search/:text', async(req, res) => {
    //TODO: encode
    const {text} = req.params;
    try {
        const searchTitle = await pool.query('', text);

        const searchTags = await pool.query('', text);

        res.json({
            searchTitle,
            searchTags
        });

    }catch(err) {
        res.status(500).send(err.message);
    }
})


module.exports = router;