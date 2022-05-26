/* 
    All routes for the user's dashboard page.
*/

// const router = require('express').Router();
// const sequelize = require('../config/connection');
const { Composition, User, Instrument } = require('../models');
const withAuth = require('../utils/auth');

module.exports = {
    renderDashboard(req, res) {
        Composition.findAll({
                where: {
                    // use the ID from the session
                    user_id: req.session.user_id
                },
                attributes: [
                    'id',
                    'title',
                    'length',
                    'date',
                    'score_url',
                    'recording_url',
                    'created_at',
                ],
                include: {
                    model: Instrument,
                    attributes: ['name']
                },
                include: {
                    model: User,
                    attributes: ['username']
                }
            })
            .then(dbCompositionData => {
                // serialize data before passing to template
                const compositions = dbCompositionData.map(composition => composition.get({ plain: true }));
                res.render('dashboard', {compositions, loggedIn: true});
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    renderAddComposition(req, res) {
        res.render('add-composition');
    },
    renderEditComposition(req, res) {
        Composition.findOne({
            where: {
                id: req.params.id
            }
        }).then(dbCompositionData => {
            if (!dbCompositionData) {
                res.status(404).json({ message: "No composition found with that ID." });
                return;
            }
            const composition = dbCompositionData.get({ plain: true });
            console.log('\n\n' + JSON.stringify(composition));
            res.render('edit-composition', { composition, loggedIn: true })
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
}