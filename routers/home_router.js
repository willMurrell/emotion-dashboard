
const { Router } = require('express');
const express = require('express');
const fs = require('fs');
const csvToJson = require('convert-csv-to-json');
csvToJson.fieldDelimiter(',')
const bodyParser = require('body-parser');
const { fstat } = require('fs');

/* create a router (to export) */
const router = express.Router();


//console.log("This is where i am");

router.get('/', async (req, res) => {

    res.render('home');
})




module.exports = router; // export the router


/* Server functions!
* I'm not too sure if these are all in the right place but oh well
*/



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
   var entries = new Array();
    
    //console.log(readJSON(filename))
    iterateOverFiles('Example_Input_File');
    router.get('/students', (req, res) =>{
        res.send(JSON.stringify(entries));
    })

    
    function parseCSV(input, output){
        let fileInputName = 'Example_Input_File/' + input; 
        let fileOutputName = 'JSON/' + output;
    
        const promise = new Promise((resolve, reject) =>{
            csvToJson.formatValueByType().generateJsonFileFromCsv(fileInputName,fileOutputName);
        });
        promise
            .then(readJSON(fileOutputName))
            .catch((value) => {
                console.log("Heres an error: " + value);
            });
        //console.log("Parsed to JSON!");
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
    
    function emotionCounter(data, name, group, week){
        //console.log(name + group + week);
        const emotionMap = new Map();
        emotionMap.set("name", name);
        emotionMap.set("group", group);
        emotionMap.set("week", week);
        const num_sentences = data.length - 1;
        for(let i = 0; i < num_sentences; i++){
            //console.log(data[i].Text);
            let entry = data[i];
            
    
            // emotions.forEach(emotion => {
            //     emotionMap.set(emotion, 0);
            // })
    
            emotions.forEach(emotion => {
                if(data[i][emotion] == 1){
                    //console.log(emotion + ": " + data[i][emotion]);
                    if(emotionMap.has(emotion)){
                        emotionMap.set(emotion, emotionMap.get(emotion) + 1)
                    } else {
                        emotionMap.set(emotion, 1);
                    }
                    
                }
                
            });
            
    
        }
        
        var x = 3;
        for (var [key, value]of emotionMap){
            if(x != 0){
                x--;
            } else {
                emotionMap.set(key, value/num_sentences);
            }
            
        }
        var obj = Object.fromEntries(emotionMap);
        var jsonString = JSON.stringify(obj);
        //console.log(jsonString);
        //console.log("\n\n");
        entries.push(jsonString);
 
    }
    
    async function readJSON (filename){
    
    
        let rawData = fs.readFile(filename, (err, data)=> {
            if(err){
                readJSON(filename);
                return;
            } else {
                if(data.byteLength == 0){
                    readJSON(filename);
                    return;
                }
                //console.log(data);
                var weekData = JSON.parse(data);
                var info_array = filename.split('-');
                var name = info_array[0].substring(5);
                var group = info_array[1];
                var week = info_array[2].substring(0, info_array[2].length-5);
                emotionCounter(weekData, name, group, week);
                
            }
            
        });
    
    }
