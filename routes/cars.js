const { Router } = require('express');

const router = Router();

const cars = [ 
    {
    "Name": "Rolls Royce",
    "Label": "Brand New",
    "Quantity": "250px supply",
},
{
    "Name": "Buggatti Veron",
    "Label": "latest",
    "Quantity": "2 jetpack",
},
{
    "Name": "Chevrolet Camaro",
    "Label": "Fairly Used",
    "Quantity": "Laser",
},
{
    "Name": "Lexus 350",
    "Label": "Brand New",
    "Quantity": "250px supply",
},
{
    "Name": "Lamborghini",
    "Label": "Uk Used",
    "Quantity": "100 lightning",
},
{
    "Name": "Mercedes Benz",
    "Label": "Brand New",
    "Quantity": "080pc bat",
},
{
    "Name": "Maybach RF",
    "Label": "Brand New",
    "Quantity": "250px thunder",
},
{
    "Name": "Messratti",
    "Label": "Brand New",
    "Quantity": "900 power lag",
},
];

router.get('/cars/:Name', 
(req, res,  next) => {
    const { Name } = req.params;
    const carNames = cars.find(c => c.Name === Name);
    res.send(carNames);
    next();
});

router.get('/cars', (req, res) => {
    res.send(cars);
});

module.exports = router;