
const { Router } = require('express');
const express = require('express');
const fs = require('fs');
const csvToJson = require('convert-csv-to-json');

const Papa = require('papaparse');
csvToJson.fieldDelimiter(',');
const bodyParser = require('body-parser');
const { fstat } = require('fs');
const e = require('express');

/* create a router (to export) */
const router = express.Router();




router.get('/', async (req, res) => {

    res.render('home');
})






module.exports = router; // export the router


const emotions = [
    "None_emotion",
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
    // "None_issue",
    // "LackofDirection",
    // "LimitedKnowledge",
    // "TechnicalIssues",
    // "LackofAchievements",
    // "TimePressure",
    // "ProjectScope-toobig",
    // "ProjectScope-toosmall",
    // "TeamCommunication",
    // "TeamCollaboration",
    // "ProjectMonitoring ",
    // "ClientCommunication",
    // "AcademicStaffCommunication",
    // "PersonalityClash",
    // "Hindsights",
    // "AdditionalCommitments",
    // "Other_issue",
    // "None_positive",
    // "ClearDirection",
    // "EnoughKnowledge",
    // "SenseofAchievements",
    // "GoodTiming",
    // "AdequateProjectScope",
    // "GoodTeamCommunication",
    // "GoodTeamCollaboration",
    // "GoodProjectMonitoring ",
    // "GoodClientCommunication",
    // "GoodAcademicStaffCommunication",
    // "PersonalityMatch",
    // "Discovery",
    // "Other_positive",
    "None_positive",
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
    "None_issue",
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
    "Other_issue",
    "Other_positive"
    ]
const learning_experiences = [
    "None_positive",
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
    "None_issue",
    "Other_positive",
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
    "Other_issue",
]


    var entries = new Array();

    
    var individualMap = new Map();
    var textEntries = new Array();
    
    //console.log(readJSON(filename))
    var csvFolder = 'SummerStudentCSV';
    iterateOverFiles(csvFolder);

    router.get('/students', (req, res) =>{
        res.send(JSON.stringify(entries));
    })
    
    router.get('/students/individuals', (req, res) =>{
        res.send(JSON.stringify(textEntries));
    })

    function iterateOverFiles(folder){
        const directory = fs.opendirSync(folder, 'utf8');
        let file;
        let filename = "header.json"
        readHeader(filename);

        while((file = directory.readSync()) !== null){
        //while((file = directory.readSync()) !== null){
            let info_array, name, group, week, out_name;
            if(file.name.substring(file.name.length-3) === 'csv'){
                
                
                info_array = file.name.split('-');
                name = info_array[0];
                group = info_array[1];
                week = info_array[2].substring(4);
                
                out_name = file.name.substring(0, file.name.length-4) + '.json';
                console.log(file.name);
                parseCSV(file.name, out_name);
                
                
                // var json = Papa.parse(file);
                // console.log(json);
                // let data = JSON.stringify(json);
                // fs.writeFileSync(out_name, data);
                // readJSON(out_name);
    
                //console.log(file.name+ out_name) ;
    
            }
            
            
            
        }
        directory.closeSync();

    }

    function readHeader(filename){
        let rawData = fs.readFile('SummerStudentCSV/' + filename, (err, data)=> {
            
            if(err){
                console.log("there was an error! " + err);
            } else {
                if(data.byteLength == 0){
                    console.log(" no file ot something");
                    readHeader(filename)

                } else {
                    var JSONdata = JSON.parse(data);
                    console.log(data);
                    entries.push(JSON.stringify(JSONdata));
                }
                
            }
        });
    }


    function parseCSV(input, output){
        let fileInputName = csvFolder+'/' + input; 
        let fileOutputName = 'JSON/' + output;
        let config = {
            header: true
        }
        const promise = new Promise((resolve, reject) =>{
            //csvToJson.formatValueByType().generateJsonFileFromCsv(fileInputName,fileOutputName);
            fs.readFile(fileInputName, 'utf8', (err, data) =>{
                if(err){
                    console.log(err);
                    return;
                }

                var json = Papa.parse(data, config);
                //console.log(json);
                let jsonString = JSON.stringify(json.data);
                fs.writeFileSync(fileOutputName, jsonString);
            });
            
        });
        promise
            .then(readJSON(fileOutputName))
            .catch((value) => {
                console.log("Heres an error: " + value);
            });
        //console.log("Parsed to JSON!");
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
                for(var i = 0; i < weekData.length - 1; i++){
                    weekData[i].comment = "";
                    //weekData[i].bookmarked = false;

                }
                
                var info_array = filename.split('-');
                var name = info_array[0].substring(5);
                var group = info_array[1];
                var week = info_array[2];
                var course = info_array[3].substring(0, info_array[3].length - 5);
                
                
                individualReport(weekData, name, group, week, course);
                emotionCounter(weekData, name, group, week, course);
                
            }
            
        });
    
    }
    
    
    
    function emotionCounter(data, name, group, week, course){
        //console.log(name + group + week);
        const entryMap = new Map();
        entryMap.set("name", name);
        entryMap.set("group", group);
        entryMap.set("week", week);
        entryMap.set("course", course);
        const num_sentences = data.length -1 ;  // - 1 because the last entry is the "Overall"
        
        for(let i = 0; i < num_sentences; i++){
            
            let entry = data[i];
            
    
            // emotions.forEach(emotion => {
            //     entryMap.set(emotion, 0);
            // })
    
            emotions.forEach(emotion => {
                //console.log(data[i][emotion]);
                if(data[i][emotion] == 1){
                    
                   
                    if(entryMap.has(emotion)){
                        entryMap.set(emotion, entryMap.get(emotion) + 1)
                        
                        
                    } else {
                        entryMap.set(emotion, 1);
                    }
                    
                }
                
            });
            
    
        }
        
        //Divides each value by the number of sentences, EXECPT for name, group, course and week
        var x = 4;
        var total = 0;
        for (var [key, value]of entryMap){
            
            if(x != 0){
                
                x--;
            } else {
                
               entryMap.set(key, value/num_sentences);
               total += value/num_sentences;
            }
            
        }
        
        var obj = Object.fromEntries(entryMap);
        var jsonString = JSON.stringify(obj);
        
        
        entries.push(jsonString);
 
    }
    function individualReport(weekData, name, group, week, course){
        
        const num_sentences = weekData.length -1 ;  // - 1 because the last entry is the "Overall"
 
        var sentences = new Array();
        var id = name + " " + group + " " + course + " " + week;
        sentences.push(id);

        for(let i = 0; i < num_sentences; i++){
            let entry = weekData[i];
            var singleEntry = new Array();
            singleEntry.push(entry["Text"])
            


            emotions.forEach(emotion => {
                if(weekData[i][emotion] == 1){
                    singleEntry.push(emotion);
                }
            });
            //singleEntry.push(weekData[i]["comment"]);

            let x = Math.floor(Math.random() * 3);
            //let x = 1;
            let y = Math.floor(Math.random() * 6);
            const arr = ["Hmm sure whatever", "Eggs on toast", "not cool", "you smell", "try be better", "have you tried no being bad?", "You really woke up and decided to wear that?"];
            if(x == 1){

                singleEntry.push(arr[y]);
            } else {
                singleEntry.push(weekData[i]["comment"]);
            }
            //singleEntry.push("This is a really cool comment!");
            sentences.push(singleEntry);
        } 
        
        
       
        var jsonString = JSON.stringify(sentences);

        textEntries.push(jsonString);  
        
    }
    
