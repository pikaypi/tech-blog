const router = require('express').Router();
const { Comment, Post, User } = require('../models');

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
        const postData = await Post.findByPk(req.params.id, { 
            attributes: ['id', 'title', 'text', 'createdAt', 'updatedAt'],
            include: [
                { 
                    model: User, 
                    attributes: ['id', 'username'] 
                },
                { 
                    model: Comment, 
                    attributes: ['id', 'text', 'createdAt', 'updatedAt'],
                    include: {
                        model: User,
                        attributes: ['id', 'username']
                    }
                } 
            ]
        });
        
        const post = postData.get({ plain: true });
        res.render('post', { post });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;