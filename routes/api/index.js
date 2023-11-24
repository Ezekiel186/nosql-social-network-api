const router = require('express').Router();
const postRoutes = require('./postRoutes');
const userRoutes = require('./userRoutes');
const friendsRoutes = require('./friendsRoutes');

router.use('/posts', postRoutes);
router.use('/tags', userRoutes);
router.use('/tags', friendsRoutes);

module.exports = router;