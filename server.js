const express = require('express');
const sequelize = require('./config/connection');
const path = require('path');
const routes = require('./routes');

// need to create our connection to the mysql server
const app = express();
const PORT = process.env.PORT || 3008;

// Setting up handlebars
const exphbs = require('express-handlebars');
// const helpers = require('./utils/helpers');
// const hbs = exphbs.create({ helpers });
const hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Setting up sessions
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUnitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

//Setting up middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});