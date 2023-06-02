const express = require('express');

const bookRoute = require('./routes/books');

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use((req, res, next) => {
    console.log(req.url, req.method);
    next();
});
app.use(bookRoute);

const port = 3000;

const { ObjectId } = require('mongodb');

const { connectToDb, getDb } = require('./db');
var db;

connectToDb((err) => {
    if (!err) {
        app.listen(port, () => {
            console.log('app listening on port', port);
        })
        db = getDb()
    }
});

app.get('/books', (req, res) => {
    let books = [];
    db.collection('books')
    .find()
    .sort({ name: 1 })
    .forEach(book => books.push(book))
    .then(() => {
        res.status(200).json(books);
    })
    .catch((err) => {
        res.status(500).json({error: 'Could not fetch the document'});
    });
});

// app.get('/books/:id', (req, res) => {
//     if (ObjectId.isValid(req.params.id)) {
//         db.collection('books')
//         .findOne({_id: ObjectId(req.params.id)})
//         .then((doc) => {
//             res.status(200).json(books);
//         })
//         .catch((err) => {
//             res.status(500).json({error: 'Could not fetch the document'});
//         })
//     } else {
//         res.status(500).json({error: 'Not a valid id'});
//     }
// });