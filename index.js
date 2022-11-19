const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./client'))


//routes
app.use('/users', require('./userRoute'));
app.use('/books', require('./bookRoute'));
app.use('/comments', require('./commentRoute'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
});