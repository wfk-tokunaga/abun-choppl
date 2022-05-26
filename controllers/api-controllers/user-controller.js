const { Instrument, User, Composition } = require('../../models');

module.exports = {
    getAllUsers(req, res) {
        User.findAll({
            attributes: {
                exclude: ['password']
            },
            include: [{
                model: Composition,
                attributes: ['id', 'title', 'length', 'score_url', 'recording_url', 'created_at']
            }]
        }).then(dbUserData => {
            res.status(200).json(dbUserData);
        }).catch(err => {
            res.status(500).json(err);
        })
    },
    getOneUser(req, res) {
        User.findOne({
            where: {
                id: req.params.id
            },
            // IF SOMETHING COMES UP LATER, THIS MIGHT BE THE ISSUE
            // attributes: {
            //     exclude: ['password']
            // },
            include: [{
                    model: Composition,
                    attributes: ['id', 'title', 'length', 'score_url', 'recording_url', 'created_at']
                },
                // {
                //     model: Comment,
                //     attributes: ['id', 'text', 'created_at'],
                //     include: {
                //         model: Post,
                //         attributes: ['title']
                //     }
                // }
            ]
        }).then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found that that ID.' });
                return;
            }
            res.status(200).json(dbUserData);
        }).catch(err => {
            res.status(500).json(err);
        })
    },
    addUser(req, res) {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            website: req.body.website
        }).then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json(dbUserData);
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },
    updateUser(req, res) {
        // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

        // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
        User.update(req.body, {
                individualHooks: true,
                where: {
                    id: req.params.id
                }
            })
            .then(dbUserData => {
                if (!dbUserData[0]) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    deleteUser(req, res) {
        User.destroy({
            where: {
                id: req.session.id,
            }
        }).then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found that that ID.' });
                return;
            }
            res.status(200).json({ message: 'User removed!' });
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },
    login(req, res) {
        // expects {email: 'lernantino@gmail.com', password: 'password1234'}
        // First, find the specific user trying to log
        console.log('=====LOGGING IN=====');
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(dbUserData => {
            // Make sure the user exists
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with that email." });
                return;
            }
            // Check password
            const validPw = dbUserData.checkPassword(req.body.password);
            if (!validPw) {
                res.status(400).json({ message: "Invalid password." });
                return;
            }
            // Create a new session
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;
                res.json({ user: dbUserData, message: "You are now logged in." });
            })
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },
    logout(req, res) {
        console.log('=====LOGGING OUT=====');
        if (req.session.loggedIn) {
            console.log('\n=====\nuser was logged in, but is now being logged out\n=====\n');
            req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    }
}