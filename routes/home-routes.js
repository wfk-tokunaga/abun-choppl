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


// // Rendering a single post by id
// router.get('/post/:id', (req, res) => {
//     Post.findOne({
//             where: {
//                 id: req.params.id
//             },
//             attributes: [
//                 'id',
//                 'title',
//                 'text',
//             ],
//             include: [{
//                     model: Comment,
//                     attributes: ['id', 'text', 'post_id', 'user_id', 'created_at'],
//                     include: {
//                         model: User,
//                         attributes: ['username']
//                     }
//                 },
//                 {
//                     model: User,
//                     attributes: ['username']
//                 }
//             ]
//         })
//         .then(dbPostData => {
//             if (!dbPostData) {
//                 res.status(404).json({ message: 'No post found with this id' });
//                 return;
//             }

//             // serialize the data
//             const post = dbPostData.get({ plain: true });

//             // pass data to template
//             res.render('single-post', { post, loggedIn: req.session.loggedIn });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

// module.exports = router;