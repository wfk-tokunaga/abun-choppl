const router = require('express').Router();

const userRoutes = require('./user-routes');
const compositionRoutes = require('./composition-routes');
const instrumentRoutes = require('./instrument-routes');

router.use('/users', userRoutes);
router.use('/compositions', compositionRoutes);
router.use('/instruments', instrumentRoutes);

module.exports = router;