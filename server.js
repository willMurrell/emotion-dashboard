const express = require('express');
const app = express();
const path = require('path');

app.use('/static', express.static(path.join(__dirname, '/public/')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



app.get('/', (request, response) => {
    response.render("home");
});
 

app.listen(8080);    