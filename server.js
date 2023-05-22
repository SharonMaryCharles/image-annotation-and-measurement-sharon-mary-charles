const express = require('express')
const app = express();

const hbs = require('express-handlebars');
const path = require('path');

app.use(express.json());

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Connect mongodb database
require('./server/database/database')();

// Setup view engine
app.set('views/partials', path.join(__dirname))
app.set('view engine', 'hbs')

// First main handlebars
app.engine('hbs', hbs
({
    extname: 'hbs',
    defaultView : 'default',
    layoutsDir : path.join(__dirname , 'views'),
    partialsDir : path.join(__dirname, 'views/partials')
}));

// Second main handlebars
app.engine('hbs2', hbs
({
    extname: 'hbs',
    defaultLayout: 'alternative', 
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/layouts/partials2')
}));

app.use('/', require('./server/router/router'));

app.listen(3000, () => console.log(`Server is stated on http://localhost:3000`));