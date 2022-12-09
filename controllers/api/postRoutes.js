const router = require('express').Router();
const { Comment, Post, User } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({ include: { model: Comment }});
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, { include: { model: Comment }});
        postData ? res.status(200).json(postData) : res.status(404).json({ message: 'Post not found'})
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create(req.body);
        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;