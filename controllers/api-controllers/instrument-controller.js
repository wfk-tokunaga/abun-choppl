const { Instrument, User, Composition } = require('../../models');

module.exports = {
    getAllInstruments(req, res) {
        console.log(`====================`);
        Instrument.findAll({
                include: [{
                    model: Composition,
                    attributes: ['title', 'date']
                }]
            })
            .then(dbInstrumentData => {
                res.json(dbInstrumentData)
            }).catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    getOneInstrument(req, res) {
        console.log(`\n====================GET ONE INSTRUMENTS====================`);
        Instrument.findOne({
            where: {
                id: req.params.id
            },
            include: [
                // {
                //     model: User,
                //     attributes: ['id', 'username'],
                // },
                {
                    // THIS MIGHT NEED UPDATING
                    model: Composition,
                    attributes: ['id', 'title'],
                    include: [{
                        model: User,
                        attributes: ['username'],
                    }]
                },
            ]
        }).then(dbCompositionData => {
            res.json(dbCompositionData)
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },
    createInstrument(req, res) {
        // check the session
        if (req.session.loggedIn) {
            Instrument.create({
                    name: req.body.name,
                })
                .then(dbInstrumentData => res.json(dbInstrumentData))
                .catch(err => {
                    console.log(err);
                    res.status(400).json(err);
                });
        }
    },
    deleteInsrument(req, res) {
        Instrument.destroy({
            where: {
                id: req.params.id
            }
        }).then(dbInstrumentData => {
            if (!dbInstrumentData) {
                res.status(404).json({ message: "No Instrument with that ID found." });
                return;
            }
            res.status(200).json({ message: "Instrument deleted!" });
        }).catch(err => {
            console.log(err);
            res.json(err);
        })
    }
}