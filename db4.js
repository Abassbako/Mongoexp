const { MongoClient } = require('mongodb');

var dbconnection;

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect('mongodb://127.0.0.1:27017/booksdb')
        .then((client) => {
            dbconnection = client.db();
            return cb();
        })
        .catch((err) => {
            console.error(err);
            return cb(err);
        })
    },
    getDb: () => dbconnection,
}