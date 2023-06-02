const express = require('express');
const studentsRoute = require('./routes/students')

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use((req, res, next) => {
    console.log(req.url, req.method);
    next();
});
app.use('/api/students', studentsRoute);

const PORT = 3009;

app.listen(PORT, () => {
    console.log('app listening on port', PORT);
});