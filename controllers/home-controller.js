/* 
Contains all the user facing routes, 
such as the homepage and login page
*/

const router = require('express').Router();
const sequelize = require('../config/connection');
const { Composition, User, Instrument, CompInstruments } = require('../models');

module.exports = {
    renderHomepage(req, res) {
        Composition.findAll({
            order: [
                ['created_at', 'DESC']
            ],
            attributes: [
                'id', 'title', 'length', 'date', 'score_url', 'recording_url'
            ],
            include: [{
                model: Instrument,
                attributes: [
                    'id', 'name'
                ]
            }, {
                model: User,
                // attributes: ['username']
            }],
        }).then(dbCompositionData => {
            // Feed this into the handlebars template
            const compositions = dbCompositionData.map(composition => composition.get({ plain: true }));
            console.log('\n\n====== Rendering homepage ======\n\n');
            console.log(compositions);
            res.render('homepage', {
                compositions,
                loggedIn: req.session.loggedIn
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },
    renderLogin(req, res) {
        console.log('\n=====CHECKING IF LOGGED IN=====\n');
        if (req.session.loggedIn) {
            console.log('\n=====USER IS LOGGED IN ALREADY=====\n');
            res.redirect('/');
            return;
        }
        console.log('\n=====USER IS NOT LOGGED IN, RENDERING LOGIN PAGE=====\n');
        res.render('login');
    },
    renderSignUp(req, res) {
        if (req.session.loggedIn) {
            console.log('\n=====USER IS LOGGED IN ALREADY=====\n');
            res.redirect('/');
            return;
        }
        console.log('\n=====USER IS NOT LOGGED IN, RENDERING SIGNUP PAGE=====\n');
        res.render('signup');
    },
    renderSingleComposition(req, res) {
        Composition.findOne({
                where: {
                    id: req.params.id
                },
                attributes: [
                    'id', 'title', 'length', 'date', 'score_url', 'recording_url'
                ],
                include: [{
                        model: Instrument,
                        attributes: ['id', 'name'],
                    },
                    {
                        model: User,
                        attributes: ['id', 'username']
                    }
                ]
            })
            .then(dbCompositionData => {
                if (!dbCompositionData) {
                    res.status(404).json({ message: 'No composition found with this id' });
                    return;
                }

                // serialize the data
                const composition = dbCompositionData.get({ plain: true });

                // composition.instruments = composition.instruments.map(instrument => JSON.stringify(instrument));
                console.log(composition);

                // pass data to template
                res.render('single-composition', { composition, loggedIn: req.session.loggedIn });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    renderSingleInstrument(req, res) {
        Instrument.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: Composition,
                attributes: ['id', 'title'],
                include:
                {
                    model: User,
                    attributes: ['username']
                }
            }]
        }).then(dbInstrumentData => {
            if (!dbInstrumentData) {
                res.status(404).json({message: "No instrument found with that ID."});
                return;
            }
            // serialize the data
            const instrument = dbInstrumentData.get({ plain: true });

            console.log(instrument);

            res.render('single-instrument', instrument)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    renderSingleUser(req, res) {
        User.findOne({
            where: {
                id: req.params.id
            },
            include: {
                model: Composition
            }
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: "No user found with that ID"})
                return
            }
            console.log(dbUserData);

            const user = dbUserData.get({plain: true})
            res.render('single-user', user);
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
    })
    },
    renderInstrumentsPage(req, res) {
        Instrument.findAll({
            include: [{
                model: Composition
            }, {
                model: User
            }]
        }).then(dbInstrumentsData => {
            console.log('\n\n====== Rendering Instruments Page ======\n\n');
            const instruments = dbInstrumentsData.map(instrument => instrument.get({plain: true}));
            console.log(instruments);
            // BUG: Not passing the info into the handlebars template
            res.render('instruments', instruments);
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    }
}