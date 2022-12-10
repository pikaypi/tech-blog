const router = require('express').Router();
const { Comment, Post, User } = require('../../models');

// Dev only route to view all posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({ 
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
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET route to return the contents of a single post
// This route is used to populate the Post Editor in the dashboard
router.get('/:id', async (req, res) => {
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
        postData ? res.status(200).json(postData) : res.status(404).json({ message: 'Post not found'})
    } catch (err) {
        res.status(500).json(err);
    }
})

// POST route to create a new post
router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create(req.body);
        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
})

// PUT route to edit an existing post
router.put('/:id', async (req, res) => {
    try {
        const editPost = await Post.update(req.body, { where: { id: req.params.id }});
        res.status(200).json(editPost);
    } catch (err) {
        res.status(500).json(err)
    }
})

// DELETE route to delete an existing post
router.delete('/:id', async (req, res) => {
    try {
        const deletePost = await Post.destroy({ where: { id: req.params.id }});
        res.status(200).json(deletePost);
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;