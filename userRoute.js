const pool = require('./db');
const router = require('express').Router();
const bcrypt = require('bcrypt');

//създаване на user
router.post('/register', async(req, res) => {
    try {
        const {email, name, password, age, bio, gender} = req.body;
        if(password.length > 5 && email && name) {

            //криптира паролата
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            
            const  newUser = await pool.query('INSERT INTO Users (name, password, email, age, bio, gender) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', [name, hashedPassword, email, age, bio, gender]);

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
        //проверя дали тази книга вече е четена от потребителя
        const list = await pool.query('SELECT * FROM Users WHERE id=$1', [userId]);
        const response = list.rows[0].readbooks?.includes(bookId);  
        
        if(!response) {
            //добавя книгата
            const updatedUser = await pool.query('UPDATE Users SET readBooks=array_append(readBooks, $1) WHERE id=$2 RETURNING *', [bookId, userId]);

            // +1 потребител чете тази книга
            await pool.query('UPDATE Books SET views=views+1 WHERE id=$1', [bookId]);

            return res.json(updatedUser.rows[0]);
        } else {
            return res.json(list.rows[0]);
        }
    }catch(err) {
        res.status(500).send(err.message);
    }
})

module.exports = router;
