const express = require('express');
const { connectToDb, getDb } = require( './db1' );
var db;

const familyRoute = require('./routes/child');

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use((req, res, next) => {
    console.log(req.url, req.method);
    next();
});
app.use(familyRoute);

const PORT = 3002;

connectToDb((err) => {
    if (!err) {
        app.listen(PORT, () => {
            console.log('app listening on port', PORT);
        })
        db = getDb();
    }
});

app.get('/familydb', (req, res) => {
    let children = []
    db.collection('children')
    .find()
    .sort({ name: 1 })
    .forEach(family => children.push(family))
    .then(() => {
        res.status(200).json(children);
    })
    .catch((err) => {
        res.status(500).json({error: 'Could not fetch the document'});
    });
});