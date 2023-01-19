/**
 * home_router.js
 *
 * @author Will Murrell
*/

const { Router } = require('express');
const express = require('express');
const fs = require('fs');
const csvToJson = require('convert-csv-to-json');

const Papa = require('papaparse');
csvToJson.fieldDelimiter(',');
const bodyParser = require('body-parser');
const { fstat } = require('fs');
const e = require('express');

const converter = require('json-2-csv');
/* create a router (to export) */
const router = express.Router();



//Render the 'home' pug template
router.get('/', async (req, res) => {

    res.render('home');
})








module.exports = router; // export the router

//Arrays of emotions and learning experiences

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
    var textEntries = new Array();
    var csvFolder = 'SummerStudentCSV';
    var comments;
    //Start of function calls
    iterateOverFiles(csvFolder);
    
    router.get('/students', (req, res) =>{
        res.send(JSON.stringify(entries));
    })
    
    router.get('/students/individuals', (req, res) =>{
        res.send(JSON.stringify(textEntries));
    })

    router.get('/students/comments', (req, res) =>{
        res.send(comments);
    })

    

    router.post('/comment', async (req, res) => {
        res.status(200).send({status: 'recieved'});
        const parcel = req.body;
        console.log("hi yeah");
        updateComments(parcel);
    })
/**
 * updateComments is a function that will update the csv file of comments with the new comment given in data
 * @param {Object} data an object containing a name, group and the comment
 */
    function updateComments(data){
        
        const fileName = "../SummerStudent/overall-comments.json";
        const file = require(fileName);
        
        var commentFound = false;
        file.forEach((comment) => {
            
            if(comment.Group == data.group && comment.Name == data.name){
                comment.Comment = data.comment;
                commentFound = true;
                console.log("New Comment! " + data.comment);
            }
    
        });
        if(!commentFound){
            var newComment = {
                Group: data.group,
                Name: data.name,
                Comment: data.comment
            }
            file.push(newComment);
        }
        
        const newFileName = "./SummerStudent/overall-comments.json";
        fs.writeFile(newFileName, JSON.stringify(file), function writeJSON(err) {
            if (err) return console.log(err);
            
            console.log('writing to ' + fileName);
        });
        converter.json2csv(file, (err, csv) => {
            if(err){
                throw err
            }
    
            console.log(csv);
            fs.writeFileSync("./SummerStudent/overall-comments.csv", csv)
        })
    
    
        readComments("overall-comments.json");
    }
    
    /**
     * iterateOverFiles will iterate over the folder passed to it and 
     * then call the parseCSV method on each one
     * 
     * @param {String} folder the name of the folder going to be iterated over
     * 
    */
    function iterateOverFiles(folder){
        const directory = fs.opendirSync(folder, 'utf8');
        let file;
        let filename = "header.json"
        let commentFilename = "overall-comments.json"
        readHeader(filename);
        readComments(commentFilename);
        while((file = directory.readSync()) !== null){
        //while((file = directory.readSync()) !== null){
            let info_array, name, group, week, out_name;
            if(file.name.substring(file.name.length-3) === 'csv'){
                
                
                info_array = file.name.split('-');
                name = info_array[0];
                group = info_array[1];
                week = info_array[2].substring(4);
                out_name = file.name.substring(0, file.name.length-4) + '.json';
                //turns csv into json
                parseCSV(file.name, out_name);
            }  
        }
        directory.closeSync();

    }

    /**
     * readHeader reads the csv header and turns it into json and adds it to entries array
     * 
     * @param {String} filename the name of the file to be read
    */
    async function readHeader(filename){
        let rawData = fs.readFile('SummerStudentCSV/' + filename, (err, data)=> {            
            if(err){
                console.log("there was an error! " + err);
            } else {
                if(data.byteLength == 0){
                    console.log(" no file ot something");
                    readHeader(filename)                   
                } else {
                    var JSONdata = JSON.parse(data);                   
                    entries.push(JSON.stringify(JSONdata));                    
                }               
            }
        });
    }
    /**
     * readHeader reads the json comment file and turns it into a map
     * 
     * @param {String} filename the name of the file to be read
    */
    async function readComments(filename){
        let rawData = fs.readFile('SummerStudent/' + filename, (err, data)=> {            
            if(err){
                console.log("there was an error! " + err);
            } else {
                if(data.byteLength == 0){
                    console.log(" no file ot something");
                                     
                } else {
                    console.log("success");
                    comments = JSON.parse(data);  
            
                }               
            }
        });
    }

    /**
     * parseCSV uses Papa.js to turn the csv files into json files
     * It will call readJSON on each file if converted properly
     * 
     * @param {String} input the name of the input file
     * @param {String} output the name of the output file
    */
    function parseCSV(input, output){
        let fileInputName = csvFolder+'/' + input; 
        let fileOutputName = 'JSON/' + output;
        let config = {
            header: true
        }
        const promise = new Promise((resolve, reject) =>{
            fs.readFile(fileInputName, 'utf8', (err, data) =>{
                if(err){
                    console.log(err);
                    return;
                }

                var json = Papa.parse(data, config);
                let jsonString = JSON.stringify(json.data);
                fs.writeFileSync(fileOutputName, jsonString);
            });
            
        });
        promise
            //readJSON will read the newly converted file
            .then(readJSON(fileOutputName))
            .catch((value) => {
                console.log("Heres an error: " + value);
            });
    }


    /**
     *  readJSON is a method that reads a JSON file and passes its information to 
     * the individualReport and emotionCounter method
     * 
     * @param {String} filename the name of the file to be read
    */
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
    
    
    /**
     * emotionCounter is a method that counts which emotions and their frequency per entry
     * 
     * @param data the data of that weeks entry
     * @param {String} name the name of the student
     * @param {String} group the name of the group/team
     * @param week which week of the course it is
     * @param {String} course the name of the course
    */
    function emotionCounter(data, name, group, week, course){
        const entryMap = new Map();
        entryMap.set("name", name);
        entryMap.set("group", group);
        entryMap.set("week", week);
        entryMap.set("course", course);
        const num_sentences = data.length -1 ;  // - 1 because the last entry is the "Overall"
        
        for(let i = 0; i < num_sentences; i++){
            
            let entry = data[i];
            
            emotions.forEach(emotion => {
                
                if(data[i][emotion] == 1){
  
                    if(entryMap.has(emotion)){
                        if(emotion == "Other_issue" || emotion == "Other_emotion" || emotion == "Other_positive" ){
                            console.log(emotion);
                        }
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

    /**
     * IndividualReport creates arrays of sentences to be used for the pages that 
     * view what the students have written
     * 
     * @param weekData this weeks entry's data
     * @param {String} name the name of the student
     * @param {String} group the name of the group/team
     * @param week which week of the course it is
     * @param {String} course the name of the course
    */
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
           
            //Randomly generated comments for testing
            let x = Math.floor(Math.random() * 3);
            let y = Math.floor(Math.random() * 6);
            const arr = ["Hmm sure whatever", "Eggs on toast", "not cool", "you smell", "try be better", "have you tried no being bad?", "You really woke up and decided to wear that?"];
            if(x == 1){

                singleEntry.push(arr[y]);
            } else {
                singleEntry.push(weekData[i]["comment"]);
            }
            //pushes enttry to array of sentences
            sentences.push(singleEntry);
        } 
        
        
       
        var jsonString = JSON.stringify(sentences);
        //pushes array of sentences to an array of entries
        textEntries.push(jsonString);  
        
    }
    
