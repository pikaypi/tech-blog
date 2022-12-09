const { User } = require('../models');

const userData = [
    {
        "username": "pikaypi",
        "password": "qwer1234"
    },
    {
        "username": "batman",
        "password": "qwer1234"
    },
    {
        "username": "superman",
        "password": "qwer1234"
    },
    {
        "username": "spiderman",
        "password": "qwer1234"
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;