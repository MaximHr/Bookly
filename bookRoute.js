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


// качва книгата
let fileName = uuidv4();
const storage = multer.diskStorage({
    destination: './client/src/files',
    filename: (req, file, cb) => {
        cb(null, fileName + '.pdf');
    }
})
const upload = multer({storage: storage, limits: {fileSize: 1073741824 }});

router.post('/uploadFile', upload.single('file'), async(req, res) => {
    res.send('File Uploaded')
});

router.post('/upload', async(req, res) => {
    const {title, cover, price, description, tags, user_id} = req.body;

    try {
        let priceNum;
        if(price === '' || price < 0) {
            priceNum = 0;
        } else {
            priceNum = JSON.parse(price);
        }
        const newBook = await pool.query('INSERT INTO Books (title, description, price, tags, file, cover, user_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *', [title, description, priceNum, tags, fileName, cover, user_id]);

        res.json(newBook.rows[0]);
        fileName = uuidv4();
    } catch(err) {
        res.status(500).send(err.message);
    }
});

//home страницата
router.get('/new/:offset/:limit', async(req, res) => {
    const {offset, limit} = req.params;
    try {
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
        const books = await pool.query('SELECT Books.id, name, cover, title,summedRating, numberOfRatings, price, file FROM Users JOIN Books ON Books.user_id = Users.id WHERE numberOfRatings != 0 ORDER BY books.summedRating / NULLIF(numberOfRatings, 0) DESC OFFSET $1 LIMIT $2', [offset, limit]);

        res.json(books.rows)

    }catch(err) {
        res.status(500).send(err.message);
    }
});


//bookDetail страницата
router.get('/details/:id', async(req,res) => {
    try {
        const details = await pool.query('SELECT Books.id, Books.user_id, age, name, school, gender, title, description, ratedBooks, price, summedRating, stripe_account, numberOfRatings, tags, cover FROM Users JOIN Books ON Books.user_id = Users.id WHERE file=$1', [req.params.id]);

        res.json(details.rows[0]);

    }catch(err) {
        res.status(500).send(err.message);
    }
});

// нова оценка на книгата
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

//търси за книга
router.get('/search/:text', async(req, res) => {
    const {text} = req.params;
    try {
        // всички книги с подобно заглавие
        const searchTitle = await pool.query('SELECT * FROM Books WHERE similarity(LOWER(title), LOWER($1)) > 0.4 ', [text]);

        // всички книги с подобен автор
        const searchAuthor = await pool.query('SELECT Books.id, name, cover, title, summedRating, numberOfRatings, price, file FROM Users JOIN Books ON Books.user_id = Users.id WHERE similarity(LOWER(name), LOWER($1)) > 0.4', [text]);

        // всички книги с подобен таг
        const searchTags = await pool.query('SELECT * FROM Books WHERE $1 ILIKE ANY(tags)', [text]);


        res.json({
            'title' : searchTitle.rows,
            'tags': searchTags.rows,
            'author': searchAuthor.rows
        });

    }catch(err) {
        res.status(500).send(err.message);
    }
});


//взима книгите на даден автор
router.get('/byAuthor/:id', async(req, res) => {
    const authorId = req.params.id;
    try {
        const books = await pool.query('SELECT * FROM Books WHERE user_id=$1', [authorId]);

        res.json(books.rows);

    }catch(err) {
        res.status(500).send(err.message);
    }
})

module.exports = router;