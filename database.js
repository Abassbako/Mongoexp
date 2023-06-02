const { MongoClient } = require('mongodb');

var dbComnection;

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect('mongodb://127.0.0.1:27017/booksdb')
        .then((client) => {
            dbComnection = client.db();
            return cb();
        })
        .catch((err) => {
            console.error(new Error(err));
            return cb(err)
        });
    },
    getDb: () => dbComnection,
}