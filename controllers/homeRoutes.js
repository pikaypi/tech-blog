const router = require('express').Router();
const { Comment, Post, User } = require('../models');

// GET route to render the homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll();

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', { posts, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET route to render the login page
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    } else {
        res.render('login');
    }
});

// GET route to render the page for a single post
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
        res.render('post', { ...post, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;