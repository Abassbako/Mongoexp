const { Router } = require('express');

const router = Router();

const pupils = [
        {
            "_id": "6424ee7de12cf595c4bf4bc8",
            "name": "Ayishat Olalere",
            "age": 20,
            "gender": "Female",
            "residence": {
                "country": "Ghana",
                "address": "24 Block a Kotoko Estate"
            }
        },
        {
            "_id": "6423119bd5e85de85657e009",
            "name": "Bako Abass",
            "age": 25,
            "gender": "Male",
            "course": "Computer Science",
            "residence": {
                "country": "Brasil",
                "address": "90 Rio de janiero"
            }
        },
        {
            "_id": "64228dbde3ea7627990f0824",
            "name": "Olagunju Oluwatobiloba",
            "age": 22,
            "gender": "Male",
            "cousre": "Microbiology",
            "residence": {
                "country": "Nigeria",
                "address": "34 Atakunmosa Osun"
            }
        },
        {
            "_id": "64228c88e3ea7627990f0822",
            "name": "Oyedare Temiloluwa Stephen",
            "age": 20,
            "gender": "Male",
            "course": "Geology",
            "residence": {
                "country": "Nigeria",
                "address": "31 Shomulu"
            }
        },
        {
            "_id": "64228d19e3ea7627990f0823",
            "name": "Oyinade Omobolanle",
            "age": 20,
            "gender": "Female",
            "course": "Chemistry",
            "residence": {
                "country": "England",
                "address": "123 Mahanton New York"
            }
        },
        {
            "_id": "6424ee7de12cf595c4bf4bc7",
            "name": "Sheikh Ibrahim",
            "age": 45,
            "gender": "Male",
            "residence": {
                "country": "South Sudan",
                "address": "Undisclosed"
            }
        }
];

// app.get('/studentsdb', (req, res) => {
//     if (ObjectId.isValid(req.params.id)) {
//         db.collection('pupils')
//         .findOne({_id: ObjectId(req.params.id)})
//         .then((doc) => {
//             res.status(200).json(doc);
//         })
//         .catch((err) => {
//             res.status(500).json({error: 'Could not fetch the document requested for'});
//         });
//     } else {
//         res.status(500).json({error: 'Not a valid id'});
//     }
// });

router.get('/studentsdb/:name', (req, res) => {
    const { name } = req.params;
    const stdId = pupils.find(p => p.name === name);
    res.send(stdId);
});

router.post('/studentsdb', (req, res) => {
    console.log(req.body);
    res.sendStatus(201);
});

module.exports = router;