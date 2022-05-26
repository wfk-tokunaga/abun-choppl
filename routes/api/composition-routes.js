const router = require('express').Router();
// const { User, Composition, Instrument, CompInstruments, UserInstruments } = require('../../models');
const withAuth = require('../../utils/auth');
const { getAllCompositions, getOneComposition, createComposition, updateComposition, deleteComposition } = require('../../controllers/api-controllers/composition-controller');

router.route('/')
    .get(getAllCompositions)
    .post(createComposition);

// Get individual composition by id
// router.get('/:id', (req, res) => {
//     console.log(`\n====================GET ALL COMPS====================`);
//     Composition.findOne({
//         where: {
//             id: req.params.id
//         },
//         include: [{
//                 model: Instrument,
//                 attributes: ['id', 'name']
//             },
//             {
//                 // THIS MIGHT NEED UPDATING
//                 model: User,
//                 attributes: ['id', 'username']
//             },
//         ]
//     }).then(dbCompositionData => {
//         res.json(dbCompositionData)
//     }).catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     })
// });

router.route('/:id')
    .get(getOneComposition)
    .put(updateComposition)
    .delete(deleteComposition);

module.exports = router;