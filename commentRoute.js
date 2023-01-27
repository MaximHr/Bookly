const pool = require('./db');
const router = require('express').Router();

router.post('/create', async(req, res) => {
    const {text, user_id, book_id} = req.body;
    try {
        const comment = await pool.query('INSERT INTO Comments (text, user_id, book_id) VALUES($1, $2, $3) RETURNING *', [text, user_id, book_id]);

        res.json(comment.rows[0]);

    }catch(err) {
        res.status(500).send(err.message);
    }
});


router.get('/byBook/:id', async(req, res) => {
    const bookId = req.params.id;
    try {
        const comments = await pool.query('SELECT text, book_id, user_id, name, Comments.id FROM Users JOIN Comments ON user_id=Users.id WHERE book_id=$1', [bookId]);

        res.json(comments.rows);

    }catch(err) {
        res.status(500).send(err.message);
    }
});

router.get('/byUser/:id', async(req, res) => {
    const userId = req.params.id;
    try {
        const comments = await pool.query('SELECT * FROM Comments Where user_id=$1', [userId]);

        res.json(comments.rows);

    }catch(err) {
        res.status(500).send(err.message);
    }
});


router.delete('/delete/:id', async(req, res) => {
    const commentId = req.params.id;
    try {
        const deletedComment = await pool.query('DELETE FROM Comments WHERE id=$1 RETURNING *', [commentId]);
        
        res.json(deletedComment);

    }catch(err) {
        res.status(500).send(err.message);
    }
});


router.put('/update/', async(req, res) => {
    const {id, text} = req.body;
    try {
        const updatedComment = await pool.query('Update Comments SET text=$1 WHERE id=$2 RETURNING *', [text, id]);

        res.json(updatedComment.rows[0]);
    }catch(err) {
        res.status(500).send(err.message);
    }
})

module.exports = router;