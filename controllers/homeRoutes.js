const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        console.log(`${req.method} request received for homepage`);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;