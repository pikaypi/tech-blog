const router = require('express').Router();
const { Post } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll();

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', { posts });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/posts/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        const post = postData.get({ plain: true });
        res.render('post', { post });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;