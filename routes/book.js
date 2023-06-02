const { Router } = require('express');

const router = Router();

const books = [
    {
        "_id": "641f39381596585841770fca",
        "title": "Sunshine"
    },
    {
        "_id": "641f3a1b1596585841770fcb",
        "title": "Moonlight in the sky",
        "author": "Bako Abass",
        "rating": 9,
        "genres": [
            "Novels",
            "Dystopian"
        ]
    },
    {
        "_id": "641f880c81d94dc7ec6c53eb",
        "title": "Twilight",
        "author": "Joseph Lambo",
        "rating": 10,
        "genres": [
            "Encyclopedia"
        ]
    },
    {
        "_id": "641f896081d94dc7ec6c53ec",
        "title": "Teenegers Lifestyle",
        "author": "Bako Abass",
        "rating": 8,
        "genres": [
            {
                "genre": "Documentation"
            }
        ]
    },
    {
        "_id": "6420c3e2dce0306ae80ee9b1",
        "title": "Albert Einstein The Great Physician",
        "author": "Bako Abass",
        "rating": 10,
        "genres": [
            "Documentation",
            "Encyclopedia"
        ]
    },
    {
        "_id": "6420eefedce0306ae80ee9b2",
        "title": "The Way of Kings",
        "genres": [
            "Fantasy",
            "sci-fi"
        ],
        "rating": 9,
        "author": "Brandon Sanderson",
        "reviews": [
            {
                "name": "Great Road!",
                "body": "Lorem ispum..."
            },
            {
                "name": "so so i guess",
                "body": "Lorem ispum"
            },
            {
                "name": "My fav every book",
                "body": "Lorem ispum"
            }
        ]
    },
    {
        "_id": "6420fa2bdce0306ae80ee9b3",
        "title": "The life of a woman"
    },
    {
        "_id": "6420fa2bdce0306ae80ee9b4",
        "title": "Women are dangerous"
    },
    {
        "_id": "6420fa2bdce0306ae80ee9b5",
        "title": "Women are heartless",
        "genres": [
            "Encyclopedia",
            "Dystopia",
            "Fantasy"
        ]
    },
    {
        "_id": "64211c185bfca3f0ec117879",
        "title": "Women don't deserve good men",
        "author": {
            "name": "Patrick Lawson"
        },
        "rating": 5,
        "genres": [
            "fantasy",
            "Documentation"
        ]
    },
];

router.get('/bookdb/:title', (req, res) => {
    const { title } = req.params;
    const bookStore = books.find(b => b.title === title);
    res.send(bookStore);
});

module.exports = router;