const { Router } = require('express');
const { ObjectId } = require('mongodb');

const router = Router();

const children = [
    {
        "_id": "641d93a75624404e77517e0e",
        "name": "Abass",
        "age": 20,
        "DOB": {
            "date": 19,
            "month": "July",
            "year": 2002
        },
        "hobbies": [
            "Coding"
        ]
    },
    {
        "_id": "641d8b505624404e77517e0b",
        "name": "Abdullahi"
    },
    {
        "_id": "641d94925624404e77517e0f",
        "name": "Abdullahi",
        "age": 15,
        "DOB": {
            "date": 10,
            "month": "April",
            "year": 2007
        },
        "hobbies": [
            "Loves to play a lot"
        ]
    },
    {
        "_id": "641d8b505624404e77517e09",
        "name": "Adeola"
    },
    {
        "_id": "641d92d35624404e77517e0d",
        "name": "Adeola",
        "age": 26,
        "DOB": {
            "date": 6,
            "month": "November",
            "year": 1996
        },
        "hobbies": [
            "pressing Phone"
        ]
    },
    {
        "_id": "641d8b505624404e77517e08",
        "name": "Banji"
    },
    {
        "_id": "641d9deb32f1245f6f295970",
        "name": "Banji",
        "age": 31,
        "DOB": {
            "date": 25,
            "month": "September",
            "year": 1991
        },
        "hobbies": [
            "Driving"
        ]
    },
    {
        "_id": "6440f53e1f4535520d7f2077",
        "name": "Leo_Stein",
        "age": 25,
        "residece": {
            "address": "104 simp str",
            "country": "Ghana"
        }
    }
];

router.get('/familydb/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('children')
        .findOne({_id: ObjectId(req.params.id)})
       .then(doc => {
            res.status(200).json(doc);
     })
      .catch((err) => {
           res.status(500).json({error: 'Could not fetch the document'});
        })
   } else {
       res.status(500).json({error: 'Not a valid id'});
    }
});

// router.get('/familydb/:name', (req, res) => {
//     const { name } = req.params;
//     const familyTree = children.find(c => c.name = name);
//     res.send(familyTree);
// });

// router.get('/familydb/:age', (req, res) => {
//     const { Name } = req.params;
//     const familyTrees = family.find(f => children.age === age);
//     res.send(familyTrees);
// });

router.post('/familydb', (req, res) => {
    const family = req.body
    db.collection('children')
    .insertOne(family)
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        res.status(500).json({error: 'New document created'});
    });
});

module.exports = router;