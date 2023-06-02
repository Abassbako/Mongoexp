const express = require('express');
const carRoute = require('./routes/cars');

const app = express();

app.use(carRoute);
app.use(express.json());
app.use(express.urlencoded());
app.use((req, res, next) => {
    console.log(req.url, req.method);
    next();
});

const port = 3002;

app.listen(port, () => {
    console.log('app listening on port', port);
});