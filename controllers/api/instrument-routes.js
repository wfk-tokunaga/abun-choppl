const router = require('express').Router();
const { User, Composition, Instrument, CompInstruments, UserInstruments } = require('../../models');
// const withAuth = require('../../utils/auth');

// Get all instruments
router.get('/', (req, res) => {
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
});

// Get individual Instrument by id
router.get('/:id', (req, res) => {
    console.log(`\n====================GET ALL COMPS====================`);
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
});

// Create new instrument
router.post('/', (req, res) => {
    // check the session
    if (req.session) {
        Instrument.create({
                name: req.body.name,
            })
            .then(dbInstrumentData => res.json(dbInstrumentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

// // Update title of post with specific id
// router.put('/:id', (req, res) => {

// });

// Delete an instrument with a specific id
router.delete('/:id', (req, res) => {
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
});

module.exports = router;