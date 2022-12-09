const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        console.log(`${req.method} request received at /api`);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;