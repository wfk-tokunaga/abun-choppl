const User = require('../models/User');

const userData = [{
        username: 'eika',
        email: 'eika@gmail.com',
        password: 'eikaPW',
        first_name: 'Eika',
        last_name: 'Tokunaga',
        website: 'fk-tokunaga.surge.sh',
        bio: `Hello! I'm a composer from the bay area looking to learn more.`
    },
    {
        username: 'shae',
        email: 'shae@gmail.com',
        password: 'shaePW',
        first_name: 'Shae',
        last_name: 'Sult',
        // website: 'fk-tokunaga.surge.sh',
        // bio: `Hello! I'm a composer from the bay area looking to learn more.`
    },
    {
        username: 'eea',
        email: 'eea@gmail.com',
        password: 'eeaPW',
        first_name: 'Eea',
        last_name: 'Staudinger',
        website: 'eea.com',
        bio: `Hi! My name is Eea and I'm Eika's friend.`
    },
    {
        username: 'amadeus',
        email: 'amadeus@gmail.com',
        password: 'amadeusPW',
        first_name: 'Amadeus',
        last_name: 'Regucera',
        website: `amadeus.com`,
        bio: `I write music that is intense.`
    },
    {
        username: 'galen',
        email: 'galen@gmail.com',
        password: 'galenPW',
        first_name: 'Galen',
        last_name: 'Rogers',
        website: 'galen.com',
        bio: `Spreadsheets are dope`
    },
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUsers;