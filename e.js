const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use((req, res, next) => {
    console.log(req.url, req.method);
    next();
});

const PORT = 3005;

app.listen(PORT, () => {
    console.log('app listening on port', PORT);
});

app.get('/coutries', (req, res) => {
    res.send(countries);
});

app.post('/countries', (req, res) => {
    console.log(req.body);
    res.sendStatus(201);
});