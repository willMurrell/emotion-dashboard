/*
* Server.js
*
* @author Will Murrell
* 2022
*/

//Aquiring the required packages
'use strict';
const express = require('express');
const fs = require('fs');
const path = require('path');
const home_router = require('./routers/home_router');
const papers_router = require('./routers/papers_router');
const student_router = require('./routers/student_router');
const csvToJson = require('convert-csv-to-json');
csvToJson.fieldDelimiter(',')
const XLSX = require('xlsx');
const bodyParser = require('body-parser');
const app = express();
const converter = require('json-2-csv');
//local variable of class data
app.locals.classdata= require("./class.json");

//Default file paths to start with /public/
app.use('/static', express.static(path.join(__dirname, '/public/')));
app.use(bodyParser.json());
app.use(express.json())
//Using Pug templates
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* redirect root route `/` to `/home/` */
app.get('/', (req, res) => {
    res.redirect('/home/');
});








/* Setting routers */
app.use('/home/', home_router);
app.use('/papers/', papers_router);
app.use('/student/', student_router);

/*local host at 8080 */
app.listen(8080);    


/* Initialising required maps */
var studentGroupMap = new Map();
var startDateMap = new Map();
var studentsInGroup = new Map();
var weekArrayMap = new Map();

/* start of the function calls */
loadCSVHeader();




/*
*  makeObject() creates and returns an object from the given parameters
*/
function makeObject(name, year, month, day, filename, course, group){
    var obj = new Object({
        filename: filename,
        name: name,
        year: year,
        month: month,
        day: day,
        week: null,
        group: group,
        course: course
        
    })
    return obj;
}
/* loadCSVHeader converts the Project-Group_Student.csv to a json file
 * It will call loadJSONHeader if conversion is successful
*/
function loadCSVHeader(){
    
    let fileInputName = 'SummerStudent/Project-Group-Student.csv'
    let fileOutputName = 'SummerStudent/Project-Group-Student.json'

    let InputName = 'SummerStudent/overall-comments.csv'
    let OutputName = 'SummerStudent/overall-comments.json'
    
    const promise = new Promise((resolve, reject) =>{
        csvToJson.formatValueByType().generateJsonFileFromCsv(fileInputName,fileOutputName);
        csvToJson.formatValueByType().generateJsonFileFromCsv(InputName,OutputName);
    });
    
    promise
        .then(loadJSONHeader())
        .catch((value) => {
            console.log("Heres an error: " + value);
        });
}

/* loadJSONHeader */
function loadJSONHeader(){


        
        let filename = 'Project-Group-Student.json'
        let rawData = fs.readFile('SummerStudent/' + filename, (err, data)=> {
            
            if(err){
                console.log("there was an error! " + err);
            } else {
                //In the case that this method has been called before the file has been made
                if(data.byteLength == 0){
                    console.log("or an error here or something")
                    console.log("THIS IS THE BIG SCARY ERROR THAT I DO NOT KNOW HOW TO FIX");
                }
                //Parsing json data
                var JSONdata = JSON.parse(data);
                
                //Iterate over each entry in json data
                for(var i = 0; i < JSONdata.length; i++){
                    
                    if(studentsInGroup.has(JSONdata[i].Course)){
                        //Adds student to map if it isnt already in there
                        if(!studentsInGroup.get(JSONdata[i].Course).includes(JSONdata[i].StudentName)){
                            
                            studentsInGroup.get(JSONdata[i].Course).push(JSONdata[i].StudentName);
                        }
                    } else {
                        //Creates new entry in map for the course and adds an array for the students.
                        var studentArr = new Array();
                        studentArr.push(JSONdata[i].StudentName);
                        studentsInGroup.set(JSONdata[i].Course, studentArr);
                    }

                    if(studentsInGroup.has(JSONdata[i].GroupName)){
                        //Adds student to studentsInGroup map if it isnt already in there
                        if(!studentsInGroup.get(JSONdata[i].GroupName).includes(JSONdata[i].StudentName)){
                            
                            studentsInGroup.get(JSONdata[i].GroupName).push(JSONdata[i].StudentName);
                        }
                    } else {
                        //Creates new entry in map for the group and adds an array for the students.
                        var studentArr = new Array();
                        studentArr.push(JSONdata[i].StudentName);
                        studentsInGroup.set(JSONdata[i].GroupName, studentArr);
                    }
                    var course = JSONdata[i].Course;
                    if(startDateMap.has(course)){
                        //If map already contains a value it doesn't need to be calculated again
                    } else {
                        //Turns string date into date object
                        var dateArr = JSONdata[i].StartDate.split('/');
                        var year = '20' + dateArr[2];
                        var month = dateArr[1] - 1;
                        var day = dateArr[0];
                        startDateMap.set(course, new Date(year, month, day));
                    }
                    //creates maps of student groups
                    if(studentGroupMap.has(JSONdata[i].StudentName)){
                        studentGroupMap.get(JSONdata[i].StudentName).set(course, JSONdata[i].GroupName);
                        
                    } else {
                        var mp = new Map();
                        mp.set(course, JSONdata[i].GroupName);
                        studentGroupMap.set(JSONdata[i].StudentName, mp);
                    }
                }
                
                //Stringifying the data from studentsInGroup
                const json = JSON.stringify(Object.fromEntries(studentsInGroup));
                    //Writing data to file header.json
                    fs.writeFile("SummerStudentCSV/header.json", json, function(err) {
                        if (err) {
                            console.log("ERROR: "+err);
                        } else {
                            console.log("wrote successfully");
                        }
                    });
                //Next method is called    
                xlsxToCSV();
            }
            
        });
        
    
}
/*
*   xlsxToCSV() converts all the xlsx files specified to the folder variable to .csv files
*   it also finds out which week the entry is from and renames it, adding group and week
*   
*/

function xlsxToCSV(){

    const months = new Array(
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    );
        var folder = 'SummerStudent'
        const directory = fs.opendirSync(folder);
        let file;
        var studentMap = new Map();

        //Iterate through all files in a directory
        while((file = directory.readSync()) !== null){
            let info_array, name, group, month, day, year, dateArray, courseName;


            
            
            //Only iterates over .xlsx files
            if(file.name.substring(file.name.length-4) === 'xlsx'){
                //Splits name into an array
                info_array = file.name.split('-');
                name = info_array[2];
               

                
                //Figuring out date numbers
                dateArray = info_array[3].split(" ");
                var index = 0;
                
                if(dateArray.length == 4){
                    index++;
                    month = months.indexOf(dateArray[index+1]) ;
                    
                    day = dateArray[index];
                    
                } else {
                    month = months.indexOf(dateArray[index]) ;
                    
                    day = dateArray[index+1].substring(0,dateArray[index+1].length-1) ;
                    
                }
                
                
                year = dateArray[index+2].substring(0, dateArray[index+2].length-5);
                
                //Turning date into date object
                var entryDate = new Date(year, month, day);
                
                
                //Uses the entry date to working out which course an entry belongs to
                startDateMap.forEach((value, key) =>{
                    
                    if(entryDate > startDateMap.get(key)){

                        if(startDateMap.has(courseName)){
                            if(startDateMap.get(key) > startDateMap.get(courseName)){
                                courseName = key;
                            }
                        } else {
                            courseName = key;
                        }
                        
                        
                    } 
                });
                    

                    
                  
                
                
                group = studentGroupMap.get(name).get(courseName);
                
                //fills map with student name and an object that represents them
                if(studentMap.has(name)){
                    studentMap.get(name).push(makeObject(name, year, month, day,file.name, courseName, group));
                } else {
                    var entryArray = new Array();
                    entryArray.push(makeObject(name, year, month, day,  file.name, courseName, group));
                    studentMap.set(name, entryArray);
                }
                
        }
            
            
        }
        //closing the folder that was iterated over
        directory.closeSync();

        //Iterates over start dates, in order to work out the start date of each week from the original start date
        //It works out for 53 weeks
        var numberOfWeeks = 53;
        startDateMap.forEach((value, key) =>{
            var projWeek = new Map();
            
            weekArrayMap.set(key, projWeek);
           
            weekArrayMap.get(key).set(startDateMap.get(key).toDateString(), 'Week1');

            var currentWeek = new Date(startDateMap.get(key));

            for(var j = 2; j < numberOfWeeks; j++){
                //next date
                currentWeek.setDate(currentWeek.getDate()+7);
                //next week
                weekArrayMap.get(key).set(currentWeek.toDateString(),"Week"+j);
            }
            
        });
        
        //Iterates over all entries and works out which week they belong to.
        //This is done by using the entry date, figuring out what date is the start of that week, then matching it to the map created earlier
        for(let [key, value] of studentMap){
           
            
            for(var i = 0; i < value.length; i++){
                var date = new Date(value[i].year, value[i].month, value[i].day);
                //getWeekOfMonth works out what the start of the week date is
                var calcdWeek = weekArrayMap.get(value[i].course).get(getWeekOfMonth(date).toDateString());
                
                var inputFilename = "SummerStudent/" + value[i].filename;
                var outputFilename = "SummerStudentCSV/" + value[i].name +"-"+value[i].group+"-"+calcdWeek+"-"+value[i].course+".csv";
                
                //Writes file to csv.
                const workBook = XLSX.readFile(inputFilename);
                XLSX.writeFile(workBook, outputFilename, { bookType: "csv" });
            }
            
        }
}


/*
 *  getWeekOfMonth takes a date and returns the date of the start of that week
 *
 * i.e. if the entry date is on a wednesday or thursday, it will return the date of the monday of that week
*/
function getWeekOfMonth(date) {
    
    var dayOfWeek = date.getDay();
    var dayOfMonth = date.getDate();
    var year = date.getFullYear();
    var month = date.getMonth() ;
    var startDate;
  
    //Sunday is 0 (i think) so change it to 7 to be the end of the week
    //because I am using monday as the start of the week
    if(dayOfWeek == 0){
        dayOfWeek = 7;
    }
    //Firgues out what the date of the monday is
    if((dayOfMonth - (dayOfWeek - 1)) > 0){
        var startDay = dayOfMonth - (dayOfWeek - 1);
        startDate = new Date(date.getFullYear(), month, startDay );
        if(month == 7){      
        }  
    } else {  
       if(month == 0){
        var lastDayOfMonth = new Date(date.getFullYear()-1, 0, 0).getDate();
        var newDayOfMonth = lastDayOfMonth + (dayOfMonth - (dayOfWeek - 1));
        startDate = new Date(date.getFullYear(), date.getMonth()-1 , newDayOfMonth);
       } else {
            var lastDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
            var newDayOfMonth = lastDayOfMonth + (dayOfMonth - (dayOfWeek - 1));
            
            startDate = new Date(date.getFullYear(), date.getMonth() -1 , newDayOfMonth);
       }
    }
    //returns the start date
    return(startDate);
}

