const { MongoClient } = require('mongodb');

var dbConnection;

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect('mongodb://127.0.0.1:27017/familydb')
        .then((client) => {
            dbConnection = client.db();
            return cb();
        })
        .catch((err) => {
            console.error(err);
            return cb(err)
        })
    },
    getDb: () => dbConnection,
}