'use strict';
const express = require('express');
const fs = require('fs');
const path = require('path');

const home_router = require('./routers/home_router');
const papers_router = require('./routers/papers_router');

const csvToJson = require('convert-csv-to-json');
csvToJson.fieldDelimiter(',')

const bodyParser = require('body-parser');
const { fstat } = require('fs');


const app = express();

//app.locals.classdata= require("./individual.json");
app.locals.classdata= require("./class.json");

app.use('/static', express.static(path.join(__dirname, '/public/')));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* redirect root route `/` to `/home/` */
app.get('/', (req, res) => {
    
 
    

    


    res.redirect('/home/');
});

// app.post("/", function(req,res){
//     if(req.body){
//         var content = req.body;
//         console.log(content);
//     }
// })



app.use('/home/', home_router);
app.use('/papers/', papers_router);


parseAllCSV();
    
var filename = 'JSON/myOutputFile.json';

console.log(readJSON(filename))


function parseAllCSV(){
    let fileInputName = 'CSV/myInputFile.csv'; 
    let fileOutputName = 'JSON/myOutputFile.json';

    
    csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);
    console.log("step 2");
}

function emotionCounter(data){
    //console.log(data);
}

async function readJSON (filename){


    let rawData = fs.readFile('JSON/myOutputFile.json', (err, data)=> {
        console.log(data);
        var weekData = JSON.parse(data);
        emotionCounter(weekData);
    });


    return 0.5;
}


app.listen(8080);    

