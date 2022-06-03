/* 
Contains all the user facing routes, 
such as the homepage and login page
*/

const router = require('express').Router();
const sequelize = require('../config/connection');
const { renderHomepage, renderLogin, renderSignUp, renderSingleComposition, renderSingleInstrument, renderSingleUser, renderInstrumentsPage } = require('../controllers/home-controller');

router.route('/')
    .get(renderHomepage)

router.route('/login')
    .get(renderLogin);

router.route('/signup')
    .get(renderSignUp);

router.route('/composition/:id')
    .get(renderSingleComposition);

router.route('/instrument/:id')
    .get(renderSingleInstrument);

router.route('/user/:id')
    .get(renderSingleUser);

router.route('/instruments')
    .get(renderInstrumentsPage);
    
module.exports = router;