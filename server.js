const express = require('express');
const app = express();
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (request, response) => {
    response.render("home");
});
 
app.get('/', (request, response) => {
    response.render('home')
})
app.listen(8080);    