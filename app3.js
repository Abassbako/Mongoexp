const express = require('express');
const { ObjectId } = require('mongodb');

const app = express();

const port = 3006;

const { connectToDb, getDb } = require('./db4');
var db;

connectToDb((err) => {
    if (!err) {
        app.listen(port, () => {
            console.log('app listening on port', port);
        })
        db = getDb()
    }
});

app.get('/booksdb', (req, res) => {
    let books = []
    db.collection('books')
    .find()
    .sort({name: 1})
    .forEach(book => books.push(book))
    .then(() => {
        res.status(200).json(books);
    })
    .catch((err) => {
        res.status(500).json({error: 'Could not fetch the document'});
    });
});

app.get('/booksdb/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('books')
        .findOne({_id: ObjectId(req.params.id)})
        .then((doc) => {
            res.status(200).json(doc)
        })
        .catch((err) => {
            res.status(500).json({error: 'Could not fetch the document'});
        })
    } else {
        res.status(500).json({error: 'Not a valid id'});
    }
});

app.post('/booksdb', (req, res) => {
    const book = req.body
    db.collection('books')
    .insertOne(book)
    .then((result) => {
        res.status(201).json(result);
    })
    .catch((err) => {
        res.status(500).json({error: 'Could not create a new document'});
    });
});
