/* 
    All routes for the user's dashboard page.
*/

const router = require('express').Router();
const sequelize = require('../config/connection');
const { Composition, User, Instrument } = require('../models');
const withAuth = require('../utils/auth');
const { renderDashboard, renderAddComposition, renderEditComposition } = require('../controllers/dashboard-controller');

router.route('/')
    .get(renderDashboard);

router.route('/add-composition')
    .get(renderAddComposition);

router.route('/edit/:id')
    .get(renderEditComposition);

module.exports = router;