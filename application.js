const express = require('express');
const { ObjectId } = require('mongodb');

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use((req, res, next) => {
    console.log(req.url, req.method);
    next();
});

const PORT = 4000;

const { connectToDb, getDb } = require('./database');
const { result, stubString, update } = require( 'lodash' );
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
        res.status(500).json({error: 'Could not fetch the dpcument'});
    });
});

app.get('/books/:name', (req, res) => {
    const { name } = req.params;
    const bookStore = books.find(b => b.name === name);
    res.send(bookStore);
});

app.get('/books/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('books')
        .findOne({_id: ObjectId(req.param.id)})
        .then((doc) => {
            res.status(200).json(doc);
        })
        .catch((err) => {
            res.status(500).json({error: 'Could not fetch the document'});
        });
    } else {
        res.status(500).json({error:'Invalid Id'});
    }
});

app.post('/books', (req, res) => {
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


app.delete('/books/:name', (req, res) => {
    const book = req.params
    db.collection('books')
    .deleteOne(book)
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
        res.status(500).json({error: 'Not a valid id'});
    };
});

app.patch('/books/:id', (req, res) => {
    const updates = req.body;
    if (ObjectId.isValid(req.params.id)) {
        db.collection('books')
        .updateOne({_id: ObjectId(req.params.id)}, {$set: updates})
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({error: 'Could not update the doument'});
        });
    };
});