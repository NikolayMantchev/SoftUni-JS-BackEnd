const express = require('express');
const path = require('path');   
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();


module.exports = () => {
    app.use(express.static(path.join(__dirname, '/static')));
    app.use(bodyParser.urlencoded({extended: false}));
    app.engine('.hbs',handlebars({extname:'.hbs',defaultLayout:false}));
    app.set('views',path.resolve(__dirname,'/views'));
    //     var hbs = exphbs.create({ /* config */ });

// // Register `hbs.engine` with the Express app.
//     app.engine('handlebars', hbs.engine);
//     app.set('view engine', 'handlebars');
};