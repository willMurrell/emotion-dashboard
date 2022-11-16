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


/* Server functions!
* I'm not too sure if these are all in the right place but oh well
*/

//iterateOverFiles('Example_Input_File');

//parseAllCSV();


const emotions = [
"Happy/Joyful", 
"Engaged", 
"Curious/Interested",
"Suprised",
"Confident",
"Hopeful",
"Proud",
"Empathy",
"Confused",
"Frustrated",
"Angry",
"Worry",
"Anxious",
"Fearful",
"Bored",
"Sad",
"Hopeless",
"Exhausted/Tired",
"Shamed/Apologetic",
"Other_emotion"
]
var filename = 'JSON/Bibi-Group2-week3.json';

console.log(readJSON(filename))


function parseCSV(input, output){
    let fileInputName = 'Example_Input_File/' + input; 
    let fileOutputName = 'JSON/' + output;

    
    csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);
    console.log("Parsed to JSON!");
}

function iterateOverFiles(folder){
    const directory = fs.opendirSync(folder);
    let file;
    while((file = directory.readSync()) !== null){
        let info_array, name, group, week, out_name;
        if(file.name.substring(file.name.length-3) === 'csv'){
            //console.log(file.name.substring(file.name.length-3));
            info_array = file.name.split('-');
            name = info_array[0];
            group = info_array[1];
            week = info_array[2].substring(0, info_array[2].length-4);
            out_name = file.name.substring(0, file.name.length-4) + '.json';

            parseCSV(file.name, out_name);




            //console.log(file.name+ out_name) ;

        }
        
    }
    directory.closeSync();
}

function emotionCounter(data){
    //console.log(data[0]);
    for(let i = 0; i < data.length - 1; i++){
        //console.log(data[i].Text);
        let entry = data[i];
        const emotionMap = new Map();

        emotions.forEach(emotions => {
            emotionMap.set(emotion, 0);
        })

        emotions.forEach(emotion => {
            if(data[i][emotion] == 1){
                console.log(emotion + ": " + data[i][emotion]);
            }
            
        });

    }

}

async function readJSON (filename){


    let rawData = fs.readFile(filename, (err, data)=> {
        console.log(data);
        var weekData = JSON.parse(data);
        emotionCounter(weekData);
    });


    return 0.5;
}


app.listen(8080);    

