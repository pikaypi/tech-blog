const { Post } = require('../models');

const postData = [
    {
        "user_id": 1,
        "title": "First!",
        "text": "This is the first post on this site! Isn't that exciting?"
    },
    {
        "user_id": 3,
        "title": "I just noticed",
        "text": "Does anyone else love flying, or is it just me?"
    },
    {
        "user_id": 4,
        "title": "Urban Canyons",
        "text": "Swing, swing, swing from the tangles of my wrists..."
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;