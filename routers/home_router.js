
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

router.get('/classes/:param/', async (req, res) => {
    console.log(req.params.param);
    res.render('group');
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
    "Other_emotion",
    //seeing if i can lump it all into one
    "None_issue",
    "LackofDirection",
    "LimitedKnowledge",
    "TechnicalIssues",
    "LackofAchievements",
    "TimePressure",
    "ProjectScope-toobig",
    "ProjectScope-toosmall",
    "TeamCommunication",
    "TeamCollaboration",
    "ProjectMonitoring ",
    "ClientCommunication",
    "AcademicStaffCommunication",
    "PersonalityClash",
    "Hindsights",
    "AdditionalCommitments",
    "Other_issue",
    "None_positive",
    "ClearDirection",
    "EnoughKnowledge",
    "SenseofAchievements",
    "GoodTiming",
    "AdequateProjectScope",
    "GoodTeamCommunication",
    "GoodTeamCollaboration",
    "GoodProjectMonitoring ",
    "GoodClientCommunication",
    "GoodAcademicStaffCommunication",
    "PersonalityMatch",
    "Discovery",
    "Other_positive",
    ]
const learning_experiences = [
    "None",
    "Lack of Direction",
    "Limited Knowledge",
    "Technical Issues",
    "Lack of Achievements",
    "Time Pressure",
    "Project Scope - too big",
    "Project Scope - too small",
    "Team Communication",
    "Team Collaboration",
    "Project Monitoring ",
    "Client Communication",
    "Academic Staff Communication",
    "Personality Clash",
    "Hindsights",
    "Additional Commitments",
    "Other",
    "None",
    "Clear Direction",
    "Enough Knowledge",
    "Sense of Achievements",
    "Good Timing",
    "Adequate Project Scope",
    "Good Team Communication",
    "Good Team Collaboration",
    "Good Project Monitoring ",
    "Good Client Communication",
    "Good Academic Staff Communication",
    "Personality Match",
    "Discovery",
    "Other",
]


   var entries = new Array();
    
    //console.log(readJSON(filename))
    var csvFolder = 'SummerStudentCSV';
    iterateOverFiles(csvFolder);
    router.get('/students', (req, res) =>{
        res.send(JSON.stringify(entries));
    })

    
    function parseCSV(input, output){
        let fileInputName = csvFolder+'/' + input; 
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
                week = info_array[2].substring(4);
                //console.log(info_array);
                out_name = file.name.substring(0, file.name.length-4) + '.json';
                //console.log(info_array);
                parseCSV(file.name, out_name);
                
    
    
    
                //console.log(file.name+ out_name) ;
    
            }
            
        }
        directory.closeSync();

    }
    
    function emotionCounter(data, name, group, week){
        //console.log(name + group + week);
        const entryMap = new Map();
        entryMap.set("name", name);
        entryMap.set("group", group);
        entryMap.set("week", week);
        const num_sentences = data.length - 1;
        for(let i = 0; i < num_sentences; i++){
            //console.log(data[i].Text);
            let entry = data[i];
            
    
            // emotions.forEach(emotion => {
            //     entryMap.set(emotion, 0);
            // })
    
            emotions.forEach(emotion => {
                if(data[i][emotion] == 1){
                    //console.log(emotion + ": " + data[i][emotion]);
                    if(entryMap.has(emotion)){
                        entryMap.set(emotion, entryMap.get(emotion) + 1)
                    } else {
                        entryMap.set(emotion, 1);
                    }
                    
                }
                
            });
            
    
        }
        
        var x = 3;
        for (var [key, value]of entryMap){
            if(x != 0){
                x--;
            } else {
                entryMap.set(key, value/num_sentences);
            }
            
        }
        var obj = Object.fromEntries(entryMap);
        var jsonString = JSON.stringify(obj);
        
        
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
                
                var weekData = JSON.parse(data);
                
                var info_array = filename.split('-');
                var name = info_array[0].substring(5);
                var group = info_array[1];
                var week = info_array[2];
                
                //console.log(info_array);
                emotionCounter(weekData, name, group, week);
                
            }
            
        });
    
    }
