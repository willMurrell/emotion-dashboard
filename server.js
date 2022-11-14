const express = require('express');

const path = require('path');
const home_router = require('./routers/home_router');


const app = express();

app.use('/static', express.static(path.join(__dirname, '/public/')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* redirect root route `/` to `/birds/` */
app.get('/', (req, res) => {
    res.redirect('/home/');
});

app.use('/home/', home_router);

app.listen(8080);    