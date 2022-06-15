const User = require('../models/User');
const faker = require('faker');
const numberUsers = 10;

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

for (let i = 0; i < numberUsers; i++) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();
    const first_name = faker.name.firstName();
    const last_name = faker.name.lastName();
    const website = faker.internet.url();
    const numSentences = Math.round(Math.random()*3) + 1;
    const bio = faker.lorem.paragraph(numSentences);

    userData.push({ username, email, password, first_name, last_name, website, bio });
}

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = {seedUsers, numberUsers};