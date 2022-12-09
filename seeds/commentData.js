const { Comment } = require('../models');

const commentData = [
    {
        "user_id": 3,
        "post_id": 1,
        "text": "Congratulations! This site is great!"
    },
    {
        "user_id": 4,
        "post_id": 1,
        "text": "Thanks for making such a cool place for us to share with each other!"
    },
    {
        "user_id": 1,
        "post_id": 2,
        "text": "No I think that might just be you..."
    },
    {
        "user_id": 1,
        "post_id": 3,
        "text": "Sick Jimmy Eat World reference"
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;