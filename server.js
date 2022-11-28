'use strict';
const express = require('express');
const fs = require('fs');
const path = require('path');

const home_router = require('./routers/home_router');
const papers_router = require('./routers/papers_router');

const csvToJson = require('convert-csv-to-json');
csvToJson.fieldDelimiter(',')

const XLSX = require('xlsx');

const bodyParser = require('body-parser');
const { fstat } = require('fs');
const e = require('express');


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





app.listen(8080);    



var studentGroupMap = new Map();
var startDateMap = new Map();

var weekArrayMap = new Map();

loadDataHeader();



/*
*   makeObject() creates an object from the given parameters
*/
function makeObject(name, year, month, day, filename, proj_num, group){
    var obj = new Object({
        filename: filename,
        name: name,
        year: year,
        month: month,
        day: day,
        week: null,
        group: group,
        proj_num: proj_num
        
    })
    return obj;
}

function loadDataHeader(){


    
        let filename = 'Project-Group-Student.json'
        let rawData = fs.readFile('SummerStudent/' + filename, (err, data)=> {
            
            if(err){
                console.log("there was an error! " + err);
            } else {
                if(data.byteLength == 0){
                    console.log("or an error here or something")
                }
                
                var JSONdata = JSON.parse(data);
              
                for(var i = 0; i < JSONdata.length; i++){
                    

                    if(startDateMap.has(JSONdata[i].ProjectNumber)){

                    } else {
                        var dateArr = JSONdata[i].StartDate.split('/');
                        
                        var year = '20' + dateArr[2];
                        var month = dateArr[1] - 1;
                        var day = dateArr[0];
                        startDateMap.set(JSONdata[i].ProjectNumber, new Date(year, month, day));
                    }
                    if(studentGroupMap.has(JSONdata[i].StudentName)){
                        studentGroupMap.get(JSONdata[i].StudentName).set(JSONdata[i].ProjectNumber, JSONdata[i].GroupName);
                        
                    } else {
                        var mp = new Map();
                        mp.set(JSONdata[i].ProjectNumber, JSONdata[i].GroupName);
                        studentGroupMap.set(JSONdata[i].StudentName, mp);
                    }
                }
                
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
            let info_array, name, group, month, day, year, dateArray,week, out_name;


            
            
            //Only iterates over .xlsx files
            if(file.name.substring(file.name.length-4) === 'xlsx'){

                info_array = file.name.split('-');
                name = info_array[2];
               

                
                
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
                
                var entryDate = new Date(year, month, day);
                
                var proj_num = 0;
                for(var i = 1; i < startDateMap.size + 1; i++){
                    

                    
                    if(entryDate > startDateMap.get(i)){
                        if(i > proj_num){
                            proj_num = i;
                        }
                        
                        
                    } 
                }
                
                group = studentGroupMap.get(name).get(proj_num);

                if(studentMap.has(name)){
                    studentMap.get(name).push(makeObject(name, year, month, day,file.name, proj_num, group));
                } else {
                    var entryArray = new Array();
                    entryArray.push(makeObject(name, year, month, day,  file.name, proj_num, group));
                    studentMap.set(name, entryArray);
                }
                
            }
            
            
        }
        
        directory.closeSync();

        
        for(var i = 1; i < startDateMap.size + 1; i++){
            var projWeek = new Map();
            weekArrayMap.set(i, projWeek);
            weekArrayMap.get(i).set(startDateMap.get(i).toDateString(), 'Week1');

            var currentWeek = new Date(startDateMap.get(i));

            for(var j = 2; j < 53; j++){
                currentWeek.setDate(currentWeek.getDate()+7);
                weekArrayMap.get(i).set(currentWeek.toDateString(),"Week"+j);
            }
            
        }
        

        
        //for(let [key, value] of sortedMap){
        for(let [key, value] of studentMap){
           
            
            for(var i = 0; i < value.length; i++){
                var date = new Date(value[i].year, value[i].month, value[i].day);
                

                var calcdWeek = weekArrayMap.get(value[i].proj_num).get(getWeekOfMonth(date).toDateString());
                
                
                
                var inputFilename = "SummerStudent/" + value[i].filename;
                var outputFilename = "SummerStudentCSV/" + value[i].name +"-"+value[i].group+"-"+calcdWeek+"-"+value[i].proj_num+".csv";
                
                const workBook = XLSX.readFile(inputFilename);
                XLSX.writeFile(workBook, outputFilename, { bookType: "csv" });
            }
            
        }
        

    
    

    //const workBook = XLSX.readFile(inputFilename);
    //XLSX.writeFile(workBook, outputFilename, { bookType: "csv" });

}


/*

*/
function getWeekOfMonth(date) {
    
    var dayOfWeek = date.getDay();
    var dayOfMonth = date.getDate();
    
    var year = date.getFullYear();
    var month = date.getMonth() ;
    var startDate;
    
    if(month == 7){
        

    }
    
    
    
    

    if(dayOfWeek == 0){
        dayOfWeek = 7;
    }
    
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

    return(startDate);
    // var calcdWeek = weekArrayMap.get(startDate.toDateString());
   
    // var inputFilename = "SummerStudent/" + value[i].filename;
    // var outputFilename = "SummerStudentCSV/" + value[i].name +"-"+value[i].group+"-"+calcdWeek+"-"+value[i].proj_num+".csv";
    
    // const workBook = XLSX.readFile(inputFilename);
    // XLSX.writeFile(workBook, outputFilename, { bookType: "csv" });

}

