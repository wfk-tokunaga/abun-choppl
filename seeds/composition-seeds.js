const Composition = require('../models/Composition');
const faker = require('faker');
const {numberUsers} = require('./user-seeds');

const numberCompositions = 100;

const compositionData = [{
        title: 'Lu Dort, ritual',
        length: 364,
        // date: 
        // score_link: 
        // recording_link: 1,
        user_id: 1
    },
    {
        title: 'Jordan Poole, commit',
        length: 364,
        // date: 
        // score_link: 
        // recording_link: 1,
        user_id: 1
    },
    {
        title: 'Rajon Rondo, branch',
        length: 364,
        // date: 
        // score_link: 
        // recording_link: 1,
        user_id: 1
    },
    {
        title: 'DeAndre Ayton, throwing it down',
        length: 364,
        // date: 
        // score_link: 
        // recording_link: 1,
        user_id: 1
    },
    {
        title: 'Jimmy Butler, in trouble',
        length: 364,
        // date: 
        // score_link: 
        // recording_link: 1,
        user_id: 1
    },
    {
        title: `Crisp Apple`,
        length: 347,
        // date: 
        // score_link: 
        // recording_link: 1,
        user_id: 2
    },
    {
        title: `Tartar Sauce`,
        length: 412,
        // date: 
        // score_link: 
        // recording_link: 1,
        user_id: 2
    },
    {
        title: `Plump Plums`,
        length: 389,
        // date: 
        // score_link: 
        // recording_link: 1,
        user_id: 3
    },
    {
        title: `Dark Wood`,
        length: 298,
        // date: 
        // score_link: 
        // recording_link: 1,
        user_id: 3
    },
    {
        title: `The Brazilian Sun`,
        length: 337,
        // date: 
        // score_link: 
        // recording_link: 1,
        user_id: 4
    },
    {
        title: `Those Angry Jams`,
        length: 364,
        // date: 
        // score_link: 
        // recording_link: 1,
        user_id: 4
    },
    {
        title: `Abby's Salt Mine`,
        length: 371,
        // date: 
        // score_link: 
        // recording_link: 1,
        user_id: 5
    },
    {
        title: `Muddy Waters`,
        length: 290,
        // date: 
        // score_link: 
        // recording_link: 1,
        user_id: 5
    },
    {
        title: `Peaches in my Basket`,
        length: 314,
        // date: 
        // score_link: 
        // recording_link: 1,
        user_id: 5
    },
    {
        title: `Joe's Shopping Cart`,
        length: 329,
        // date: 
        // score_link: 
        // recording_link: 1,
        user_id: 2
    },
    {
        title: `Charizard's Vengeance`,
        length: 354,
        // date: 
        // score_link: 
        // recording_link: 1,
        user_id: 3
    },
    {
        title: `Source of Evil: Mickey Mouse`,
        length: 361,
        // date: 
        // score_link: 
        // recording_link: 1,
        user_id: 4
    },
    {
        title: `The Clowns Ate Grandma!`,
        length: 374,
        // date: 
        // score_link: 
        // recording_link: 1,
        user_id: 5
    }
];

for (let i = 0; i < numberCompositions; i += 1) {
    // const title = faker.music.songName();
    // const length = Math.round(Math.random() * 1000) + 1;
    // const score_link = faker.internet.url();
    // const recording_link = faker.internet.url();
    // user_id = Math.round(math.random() * numberUsers) + 1;
    const addComp = {
        title: faker.lorem.sentence(),
        length: Math.round(Math.random() * 1000) + 1,
        score_link: faker.internet.url(),
        recording_link: faker.internet.url(),
        user_id: Math.round(Math.random() * numberUsers) + 1,
    };
    compositionData.push(addComp)
}

const seedCompositions = () => Composition.bulkCreate(compositionData);

module.exports = {seedCompositions, numberCompositions};


// {
//     title: '',
//     length: ,
//     // date: 
//     // score_link: 
//     // recording_link: 1,
//     user_id: 1
// },
// {
//     title: '',
//     length: ,
//     // date: 
//     // score_link: 
//     // recording_link: 1,
//     user_id: 1
// },
// {
//     title: '',
//     length: ,
//     // date: 
//     // score_link: 
//     // recording_link: 1,
//     user_id: 1
// },
// {
//     title: '',
//     length: ,
//     // date: 
//     // score_link: 
//     // recording_link: 1,
//     user_id: 1
// },
// {
//     title: '',
//     length: ,
//     // date: 
//     // score_link: 
//     // recording_link: 1,
//     user_id: 1
// },
// {
//     title: '',
//     length: ,
//     // date: 
//     // score_link: 
//     // recording_link: 1,
//     user_id: 1
// },
// {
//     title: '',
//     length: ,
//     // date: 
//     // score_link: 
//     // recording_link: 1,
//     user_id: 1
// },
// {
//     title: '',
//     length: ,
//     // date: 
//     // score_link: 
//     // recording_link: 1,
//     user_id: 1
// },
// {
//     title: '',
//     length: ,
//     // date: 
//     // score_link: 
//     // recording_link: 1,
//     user_id: 1
// },
// {
//     title: '',
//     length: ,
//     // date: 
//     // score_link: 
//     // recording_link: 1,
//     user_id: 1
// },
// {
//     title: '',
//     length: ,
//     // date: 
//     // score_link: 
//     // recording_link: 1,
//     user_id: 1
// },
// {
//     title: '',
//     length: ,
//     // date: 
//     // score_link: 
//     // recording_link: 1,
//     user_id: 1
// },
// {
//     title: '',
//     length: ,
//     // date: 
//     // score_link: 
//     // recording_link: 1,
//     user_id: 1
// },