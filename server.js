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

xlsxToCSV();

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

function makeObject(name, year, month, day, group){
    var obj = new Object({
        name: name,
        year: year,
        month: month,
        day: day,
        week: null,
        group: group
        
    })
    return obj;
}

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
        while((file = directory.readSync()) !== null){
            let info_array, name, group, month, day, year, dateArray,week, out_name;
            if(file.name.substring(file.name.length-4) === 'xlsx'){

                info_array = file.name.split('-');
                name = info_array[2];
                group = "Group1";

                
                
                dateArray = info_array[3].split(" ");
                var index = 0;
                if(dateArray.length == 4){
                    index++;
                    month = months.indexOf(dateArray[index+1]) ;
                    day = dateArray[index];
                } else {
                    month = months.indexOf(dateArray[index]);
                    day = dateArray[index+1].substring(0,dateArray[index+1].length-1) ;
                
                }
                month++;
                if(month.toString().length == 1){
                    month = "0" + month.toString();
                }else{
                    month = month.toString();
                }
                year = dateArray[index+2].substring(0, dateArray[index+2].length-5);
                

                if(studentMap.has(name)){
                    studentMap.get(name).push(makeObject(name, year, month, day));
                } else {
                    var entryArray = new Array();
                    entryArray.push(makeObject(name, year, month, day, group));
                    studentMap.set(name, entryArray);
                }
                
            }
            
        }
        var sortedMap = new Map();
        for(let [key, value] of studentMap){
            //console.log(key + " = " + value)
            //var studentArray = arraySorter(key, value);s
            
            //console.log(value);
            var currentArray = value;
            var newArray = currentArray.sort(function(a, b){
                return ( a.year - b.year )|| (a.month - b.month) || (a.day - b.day);
            });
            //console.log(key);
            sortedMap.set(key, newArray);

            
            
        }
        var earliestYear = '9999'
        var earliestMonth = '12';
        var earliestDay = '31';
        for(let [key, value] of sortedMap){
            //console.log(value[0]);
            if(value[0].year <= earliestYear){
                earliestYear = value[0].year;
                if(value[0].month <= earliestMonth){
                    earliestMonth = value[0].month;
                    if(value[0].day < earliestDay){
                        earliestDay = value[0].day;
                    }
                } 
            } 
            
            
        }
        var earliestDate = new Date(earliestYear+"-"+earliestMonth+"-"+earliestDay);
        //var weekOffset = getWeekOfMonth(earliestDate);
        
        var startWeekDate = getWeekOfMonth(earliestDate);
        var currentWeek = new Date(startWeekDate);
        var weekMap = new Map();
        weekMap.set(currentWeek.toDateString(), "Week1");

        for(var i = 2; i < 53; i++){

            console.log(currentWeek);
            currentWeek.setDate(currentWeek.getDate()+7);
            weekMap.set(currentWeek.toDateString(),"Week"+i);
           
        }
        console.log(weekMap);
        //console.log(getWeek("2020", "05", "10", weekOffset, 4));
        //console.log(studentMap);

        for(let [key, value] of sortedMap){
            //console.log(value);
            for(var i = 0; i < value.length; i++){
                var calcdWeek = weekMap.get(getWeekOfMonth(new Date(value[i].year + "-" +value[i].month+"-"+value[i].day)).toDateString());
                console.log(calcdWeek);
            }
            
        }
        directory.closeSync();

    
    

    //const workBook = XLSX.readFile(inputFilename);
    //XLSX.writeFile(workBook, outputFilename, { bookType: "csv" });
}

function weekNumber(startWeekDate, currentDate){

}
/*

*/
function getWeekOfMonth(date) {
    //console.log(date.getDate());
    //var dateArray = date.toString().split(" ");
    //console.log(dateArray);
    var dayOfWeek = date.getDay();
    var dayOfMonth = date.getDate();
    var year = date.getFullYear();
    var month = date.getUTCMonth() ;
    var startDate;
    //console.log(year + " " + month + " " + dayOfMonth);


    if(dayOfWeek == 0){
        dayOfWeek = 7;
    }
    
    if((dayOfMonth - (dayOfWeek - 1)) > 0){
        //console.log(dayOfMonth - (dayOfWeek - 1));
        var startDay = dayOfMonth - (dayOfWeek - 1);
        startDate = new Date(date.getFullYear(), month, startDay );
        //console.log(startDate);
        //console.log(startDate.toString());
    } else {
        //console.log(dayOfMonth - (dayOfWeek - 1));
       if(month == 0){
        var lastDayOfMonth = new Date(date.getFullYear()-1, 0, 0).getDate();
        var newDayOfMonth = lastDayOfMonth + (dayOfMonth - (dayOfWeek - 1));
        //console.log(dayOfMonth);
        startDate = new Date(date.getFullYear(), date.getUTCMonth() - 1, newDayOfMonth);
        //console.log(startDate.toString());
       } else {
            var lastDayOfMonth = new Date(date.getFullYear(), date.getUTCMonth(), 0).getDate();
            var newDayOfMonth = lastDayOfMonth + (dayOfMonth - (dayOfWeek - 1));
            //console.log(dayOfMonth);
            startDate = new Date(date.getFullYear(), date.getUTCMonth() - 1, newDayOfMonth);
            //console.log(startDate.toString());
       }
        
    }
    return(startDate);
    // let adjustedDate = date.getDate()+ date.getDay();
    // console.log(adjustedDate);
    // let prefixes = ['0', '1', '2', '3', '4', '5'];
    // return (parseInt(prefixes[0 | adjustedDate / 7])+1);
}

function getWeek(year, month, day, offset, startMonth){
    var date = new Date(year+"-"+month+"-"+day);
    console.log(date);
    var week = getWeekOfMonth(date);
    console.log("Day: " + day);
    console.log("Week: " +week);
    var multiplier = month - startMonth + 1;
    //console.log(multiplier);
    return (week*multiplier);

}