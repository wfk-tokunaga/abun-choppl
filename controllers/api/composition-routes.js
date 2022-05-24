const router = require('express').Router();
const { User, Composition, Instrument, CompInstruments, UserInstruments } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all compositions
router.get('/', (req, res) => {
    console.log(`====================`);
    Composition.findAll({
            include: [{
                    model: Instrument,
                    attributes: ['id', 'name'],
                },
                {
                    // THIS MIGHT NEED UPDATING
                    model: User,
                    attributes: ['id', 'username']
                },
            ]
        })
        .then(dbCompositionData => {
            res.json(dbCompositionData)
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// Get individual composition by id
router.get('/:id', (req, res) => {
    console.log(`\n====================GET ALL COMPS====================`);
    Composition.findOne({
        where: {
            id: req.params.id
        },
        include: [{
                model: Instrument,
                attributes: ['id', 'name']
            },
            {
                // THIS MIGHT NEED UPDATING
                model: User,
                attributes: ['id', 'username']
            },
        ]
    }).then(dbCompositionData => {
        res.json(dbCompositionData)
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// Create new composition
router.post('/', withAuth, (req, res) => {
    // check the session
    if (req.session) {
        Composition.create({
                title: req.body.title,
                length: req.body.length,
                score_url: req.body.score_url,
                recording_url: req.body.recording_url,
                // Will change this later to be req.session.user_id
                user_id: req.session.user_id,
            })
            .then((composition) => {
                if (req.body.instrumentIds.length) {
                    const compInstrumentArr = req.body.instrumentIds.map((instrument_id) => {
                        console.log(instrument_id);
                        return {
                            compositon_id: composition.id,
                            instrument_id,
                        };
                    });
                    console.log(compInstrumentArr);
                    return CompInstruments.bulkCreate(compInstrumentArr);
                }
                console.log("\n\nDONE\n\n");
                // if no composition has no instruments, just respond
                res.status(200).json(composition);
            })
            .then((compInstrumentIds) => res.status(200).json(compInstrumentIds))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

// Update a composition
router.put('/:id', withAuth, (req, res) => {
    Composition.update(req.body, {
            where: { id: req.params.id }
        }).then((composition) => {
            return CompInstruments.findAll({ where: { composition_id: req.params.id } });
        }).then(compInstrumentsList => {
            // get list of all current instrumentIds
            const compInstrumentIds = compInstrumentsList.map(({ instrument_id }) => instrument_id);
            // create list of new instrument_ids
            const newCompInstruments = req.body.instrumentIds
                .filter((instrument_id) => !compInstrumentIds.includes(instrument_id))
                .map((instrument_id) => {
                    return {
                        composition_id: req.params.id,
                        instrument_id
                    };
                });
            // figure out which to remove
            const compInstrumentsToRemove = compInstrumentsList
                .filter(({ instrument_id }) => !req.body.instrumentIds.includes(instrument_id))
                .map(({ id }) => id);
            return Promise.all([
                CompInstruments.destroy({ where: { id: compInstrumentsToRemove } }),
                CompInstruments.bulkCreate(newCompInstruments)
            ])
        })
        .then((updatedCompInstruments) => res.json(updatedCompInstruments))
        .catch((err) => {
            // console.log(err);
            res.status(400).json(err);
        });
});

// Delete a composition with a specific id
router.delete('/:id', withAuth, (req, res) => {
    Composition.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbCompositionData => {
        if (!dbCompositionData) {
            res.status(404).json({ message: "No composition with that ID found." });
            return;
        }
        res.status(200).json({ message: "Composition deleted!" });
    }).catch(err => {
        console.log(err);
        res.json(err);
    })
});

module.exports = router;