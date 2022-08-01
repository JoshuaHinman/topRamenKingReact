require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const expressSession = require('express-session')
const reviewsRouter = require('./routes/reviewsRouter');
const usersRouter = require('./routes/usersRouter');
const app = express();

let dbUrl = process.env.DATABASE_URL || "mongodb://localhost/topRamenKing"
mongoose.connect(dbUrl, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.on('open', () => console.log('Connected to ' + process.env.DATABASE_URL));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession({secret: "top ramen king",
                       resave: true,
                       saveUninitialized: true}))
app.use('/reviews', reviewsRouter);
app.use('/users', usersRouter);
app.use(express.static(path.resolve(__dirname, '../client/build')));

// app.get('*', (req, res) => {
//     //res.redirect('/reviews');
//     //res.sendFile(path.resolve(__dirname, '../client/build', index.html));
// })

let PORT = process.env.PORT
if (PORT == null || PORT == "") {
    PORT = 4000
}

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
});