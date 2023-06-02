const express = require('express');
const bookRoute = require('./routes/book');

const { ObjectId } = require('mongodb');

const app = express();

app.use(express.json());
app.use(express.text());
app.use((req, res, next) => {
    console.log(req.url, req.method);
    next();
});
app.use(bookRoute);

const PORT = 3004;

const { connectToDb, getDb } = require('./db3');
var db;

connectToDb((err) => {
    if (!err) {
        app.listen(PORT, () => {
            console.log('app listening on port', PORT);
        })
        db = getDb()
    }
}); 

app.get('/bookdb', (req, res) => {
    let books = []
    db.collection('books')
    .find()
    .sort({ name: 1 })
    .forEach(book => books.push(book))
    .then(() => {
        res.status(200).json(books);
    })
    .catch((err) => {
        res.status(500).json({err})
    });
});

app.get('/books/:id', (req, res) => {
    db.collection('books')
    .findOne({__id:ObjectId(req.params.id)})
    .then((doc) => {
        res.status(200).json(doc);
    })
    .catch((err) => {
        res.status(500).json({error: 'Could not fetch documet'})
    });
});

app.post('/booksdb', (req, res) => {
    const book = req.body
    db.collection('books')
    .inserOne(book)
    .then((result) => {
        res.status(201).json(result);
    })
    .catch((err) => {
        res.status(500).json({error: 'Could not fetch new document'});
    });
});