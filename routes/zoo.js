const { Router } = require('express');
const { ObjectId } = require('express');

const router = Router();

// const animals = [
//     {  name: 'Dog' },
//     {
//       name: 'Dog',
//       price: '2000 Dollars',
//       breed: 'Midget Puppy'
//     },
//     {
//       name: 'Bear',
//       price: 'Undisclosed',
//       breed: 'Polar Bear'
//     },
//     {
//       name: 'Tiger',
//       price: 'Undisclosed',
//       breed: 'Asian Tiger'
//     },
//     {
//       name: 'Bird',
//       price: '300 Dollars'
//     },
// ];

router.get('/zoodb', (req, res) => {
    res.send(animals);
});

router.get('/zoodb/:name', (req, res) => {
    const { name } = req.params;
    const zoo = animals.find(a => a.name === name);
    res.send(zoo);
});

router.post('/zoodb', (req, res) => {
    console.log(req.body);
    res.sendStatus(201);
});

module.exports = router;