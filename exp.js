const express = require('express');
const { ObjectId } = require('mongodb');
const booksRoute = require('./routes/ex');

const app = express();
app.use(booksRoute);
app.use(express.json());
app.use(express.urlencoded());
app.use((req, res, next) => {
    console.log(req.url, req.method);
    next();
});

const PORT = 4001;

const { connectToDb, getDb } = require('./database');
const { result } = require( 'lodash' );
var db;

connectToDb((err) => {
    if (!err) {
        app.listen(PORT, () => {
            console.log('app listening on port', PORT);
        })
        db = getDb();
    }
});

app.get('/books', (req, res) => {
    let books = []
    db.collection('books')
    .find()
    .sort({ name: 1 })
    .forEach(book => books.push(book))
    .then(() => {
        res.status(200).json(books);
    })
    .catch((err) => {
        res.status(500).json({error: 'Could not fetch the doument'});
    });
});

app.get('/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('books')
        .findOne({_id: ObjectId(req.params.id)})
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({error: 'Coukd not fetch the document'});
        }); 
    } else {
        res.status(500).json({error: 'invalid id'});
    }
});

app.post('/books', (req, res) => {
    db.collection('books')
    .insertOne(req.body)
    .then((result) => {
        res.status(201).json(result);
    })
    .catch((err) => {
        res.status(500).json({error: 'Could not create a new document'});
    });
});

app.delete('/books/:name', (req, res) => {
    db.collection('books')
    .deleteOne(req.params)
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        res.status(500).json({error: 'Could not delete the document'});
    });
});

app.delete('/books/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('books')
        .deleteOne({_id: ObjectId(req.params.id)})
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({error: 'Could not delete the document'});
        }); 
    } else {
        res.status(500).json({error: 'Invalid id'});
    }});