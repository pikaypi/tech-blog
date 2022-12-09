const router = require('express').Router();
const { User, Post } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({ attributes: ['id', 'username']});
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {include: { model: Post }});
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;