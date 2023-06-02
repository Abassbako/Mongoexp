const express = require('express');
const zooRoute = require('./routes/zoo');
const { connectToDb, getDb } = require('./dbzoo');
var db;

const port = 3007;

connectToDb((err) => {
    if (!err) {
        app.listen(port, () => {
            console.log('app listening on port', port);
        })
        db = getDb()
    }
});

const app = express();
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.url, req.method);
    next();
});
app.use(zooRoute);

app.get('/zoodb', (req, res) => {
    let animals = []
    db.collection('animals')
    .find()
    .sort({ name: 1 })
    .forEach(book => books.push(book))

    .then(() => {
        res.status(200).json(animals);
    })
    .catch((err) => {
        res.status(500).json({error: 'Could not fetch the document'});
    });
});