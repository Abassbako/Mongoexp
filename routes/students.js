const { Router } = require('express');

const router = Router();

const students = [
    {
        name: 'Abass'
    },
    {
        name: 'Abdullahi'
    },
    {
        name: 'Temmy'
    },
    {
        name: 'Abraham'
    },
    {
        name: 'Olushola'
    },
];

router.get('/', (req, res) => {
    res.send(students);
});

router.get('/:name', (req, res) => {
    const { name } = req.params;
    const stdList = students.find(s => s.name === name);
    res.send(stdList);
});

router.post('/', (req, res) => {
    console.log(req.body);
    res.sendStatus(201);       
});

module.exports = router;