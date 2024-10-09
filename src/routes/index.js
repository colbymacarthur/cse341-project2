const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Colby MacArthur - CSE341 Project 2');
});

router.use('/users', require('./users'));
router.use('/posts', require('./posts'));


module.exports = router;