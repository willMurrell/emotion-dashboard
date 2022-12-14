

/*
 *   emotionColours is a map that containst the emotions and the colour associated with it
 */
const emotionColours = new Map();
emotionColours.set("Positive", "#48A9A6");
emotionColours.set("Negative", "#D1603D");
emotionColours.set("Other", "#E5E5E5");
emotionColours.set("Neutral", "#a1a1a1");
emotionColours.set("Missing", "rgba(0, 0, 0, 0.09)");
/*
 *   positiveEmotions and negative Emotions are arrays used when
 *   creating the group data, to tell whether an individual entry
 *   is a positive or negative emotion
 */
const positiveEmotions = new Array(
    "Happy/Joyful",
    "Engaged",
    "Curious/Interested",
    "Suprised",
    "Confident",
    "Hopeful",
    "Proud",
    "Empathy"
);
const negativeEmotions = new Array(
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
    "Shamed/Apologetic"
);

const positiveExperience = new Array(
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
    "Other_positive"
);
const negativeExperience = new Array(
    "Other_issue",
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
    "Additional Commitments"
);

/*
 *   courseMap is a map that contains an entry for each course per week. The entry will contain
 *   the collated number of positive, negative, neutral and other emotions of each student in that course
 */
var courseMap = new Map();
/*
 *   groupMap is a map that contains an entry for each group per week. The entry will contain
 *   the collated number of positive, negative, neutral and other emotions of each student in that group
 */
var groupMap = new Map();
/*
 *   studentMap is a map that contains an entry for each student per group per week. The entry will contain
 *   the collated number of positive, negative, neutral and other emotions of that student for that week
 */
var studentMap = new Map();
/*
 *   studentInGroup is a map that maps each course/group with an array of students that are in that group/course
 */
var studentInGroup = new Map();
/*
 *   studentsEntryPerGroup is a map of students who actually made an entry in that 
 *   specific week and group/course
 */

var studentsEntryPerGroup = new Map();

/*
 *   highestWeek is a variable used to store the last week of any group/course
 *   This is used to put a cap on filters and finding missing weeks and things
 */

var highestWeek = 0;


/*
 *   GroupPerWeek is a class that takes group and week as a constructor
 *
 *   addToPositive / Negative / Other are setters that allow
 *   the total number in each value to be increased
 */

class GroupPerWeek {
    constructor(group, week, course) {
        this.name = group + " " + week;
        this.group = group;
        this.week = week.substring(4);
        this.course = course;
        this.negativeEmotion = 0;
        this.positiveEmotion = 0;
        this.otherEmotion = 0;
        this.neutralEmotion = 0;
        this.negativeExp = 0;
        this.positiveExp = 0;
        this.neutralExp = 0;
        this.otherExp = 0;
        this.bookmarked = false;

    }
    addToPositiveEmotion(percent) {
        this.positiveEmotion += percent;
    }
    addToNegativeEmotion(percent) {
        this.negativeEmotion += percent;

    }
    addToOtherEmotion(percent) {
        this.otherEmotion += percent;

    }
    addToNeutralEmotion(percent) {
        this.neutralEmotion += percent;

    }
    addToPositiveExp(percent) {
        this.positiveExp += percent;

    }
    addToNegativeExp(percent) {
        this.negativeExp += percent;

    }
    addToOtherExp(percent) {
        this.otherExp += percent;

    }
    addToNeutralExp(percent) {
        this.neutralExp += percent;

    }
    getOverallNegative() {
        var totalEmo = this.negativeEmotion + this.positiveEmotion;
        var totalExp = this.negativeExp + this.positiveExp;
        var percentEmo = this.negativeEmotion / totalEmo;
        var percentExp = this.negativeExp / totalExp;
        return percentEmo + percentExp;

    }
    getEmoNegative() {
        var totalEmo = this.negativeEmotion + this.positiveEmotion;
        var percentEmo = this.negativeEmotion / totalEmo;
        return percentEmo;
    }
    getExpNegative() {
        var totalExp = this.negativeExp + this.positiveExp;
        var percentExp = this.negativeExp / totalExp;
        return percentExp;
    }
    //For setting the bookmark to true or false
    bookmarkTrue() {

        this.bookmarked = true;
    }
    bookmarkFalse() {

        this.bookmarked = false;

    }
}
/*
 *   coursePerWeek is a class that takes course and week as a constructor
 *
 *   addToPositive / Negative / Other are setters that allow
 *   the total number in each value to be increased
 */
class CoursePerWeek {
    constructor(course, week) {
        this.name = course + " " + week;
        this.week = week.substring(4);
        this.course = course;
        this.negativeEmotion = 0;
        this.positiveEmotion = 0;
        this.otherEmotion = 0;
        this.neutralEmotion = 0;
        this.negativeExp = 0;
        this.positiveExp = 0;
        this.neutralExp = 0;
        this.otherExp = 0;
        this.bookmarked = false;

    }
    addToPositiveEmotion(percent) {
        this.positiveEmotion += percent;;
    }
    addToNegativeEmotion(percent) {
        this.negativeEmotion += percent;

    }
    addToOtherEmotion(percent) {
        this.otherEmotion += percent;

    }
    addToNeutralEmotion(percent) {
        this.neutralEmotion += percent;

    }
    addToPositiveExp(percent) {
        this.positiveExp += percent;

    }
    addToNegativeExp(percent) {
        this.negativeExp += percent;

    }
    addToOtherExp(percent) {
        this.otherExp += percent;

    }
    addToNeutralExp(percent) {
        this.neutralExp += percent;

    }
    getOverallNegative() {
        var totalEmo = this.negativeEmotion + this.positiveEmotion + this.otherEmotion + this.neutralEmotion;
        var totalExp = this.negativeExp + this.positiveExp;
        var percentEmo = this.negativeEmotion / totalEmo;
        var percentExp = this.negativeExp / totalExp;
        return percentEmo + percentExp;

    }
    getEmoNegative() {
        var totalEmo = this.negativeEmotion + this.positiveEmotion + this.otherEmotion + this.neutralEmotion;
        var percentEmo = this.negativeEmotion / totalEmo;
        return percentEmo;
    }
    getExpNegative() {
        var totalExp = this.negativeExp + this.positiveExp + this.neutralExp + this.otherExp;
        var percentExp = this.negativeExp / totalExp;
        return percentExp;
    }
    bookmarkTrue() {

        this.bookmarked = true;
    }
    bookmarkFalse() {

        this.bookmarked = false;
    }
}
/*
 *   Student is a class that takes name, group, course and week as a constructor
 *
 * 
 *   addToPositive / Negative / Other are setters that allow
 *   the total number in each value to be increased
 */
class Student {
    constructor(name, group, course, week) {
        this.name = name;
        this.group = group;
        this.week = week.substring(4);
        this.course = course;
        this.negativeEmotion = 0;
        this.positiveEmotion = 0;
        this.otherEmotion = 0;
        this.neutralEmotion = 0;
        this.negativeExp = 0;
        this.positiveExp = 0;
        this.neutralExp = 0;
        this.otherExp = 0;
        this.bookmarked = false;

    }
    addToPositiveEmotion(percent) {
        this.positiveEmotion += percent;;
    }
    addToNegativeEmotion(percent) {
        this.negativeEmotion += percent;

    }
    addToOtherEmotion(percent) {
        this.otherEmotion += percent;

    }
    addToNeutralEmotion(percent) {
        this.neutralEmotion += percent;

    }
    addToPositiveExp(percent) {
        this.positiveExp += percent;

    }
    addToNegativeExp(percent) {
        this.negativeExp += percent;

    }
    addToOtherExp(percent) {
        this.otherExp += percent;

    }
    addToNeutralExp(percent) {
        this.neutralExp += percent;

    }
    getOverallNegative() {
        var totalEmo = this.negativeEmotion + this.positiveEmotion;
        var totalExp = this.negativeExp + this.positiveExp;
        var percentEmo = this.negativeEmotion / totalEmo;
        var percentExp = this.negativeExp / totalExp;
        return percentEmo + percentExp;

    }
    getEmoNegative() {
        var totalEmo = this.negativeEmotion + this.positiveEmotion;
        var percentEmo = this.negativeEmotion / totalEmo;
        return percentEmo;
    }
    getExpNegative() {
        var totalExp = this.negativeExp + this.positiveExp;
        var percentExp = this.negativeExp / totalExp;
        return percentExp;
    }
    bookmarkTrue() {
        this.bookmarked = true;
    }
    bookmarkFalse() {
        this.bookmarked = false;
    }

    getTotalEmo() {
        return this.positiveEmotion + this.negativeEmotion + this.otherEmotion + this.neutralEmotion;
    }
    getTotalExp() {
        return this.positiveExp + this.negativeExp + this.otherExp + this.neutralExp;
    }
}



/*
 *   buildHorizontalGraph is a function that takes a dataset, an array of labels
 *   a title and the HTML element id and creates a horizontal bar graph
 *   in that location by using Chartly
 */
function buildHorizontalGraph(datac, labels, title, id) {
    var titleArr = title.split(" ");
    var group = titleArr[0];
    var week = titleArr[1].substring(4);

    const newData = {
        labels: labels,
        datasets: datac
    }
    const config = {
        type: 'bar',
        data: newData,
        options: {
            indexAxis: 'y',
            // Elements options apply to all of the options unless overridden in a dataset
            // In this case, we are setting the border of each horizontal bar to be 2px wide
            elements: {
                bar: {
                    borderWidth: 0,
                }
            },
            responsive: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    font: {
                        size: 20,
                        weight: 'bold',
                        lineHeight: 1.2,
                        family: 'Poppins'
                    },
                    color: "black",
                    text: group + " Week " + week,

                }
            },
            scales: {
                x: {
                    stacked: true,
                    display: false

                },
                y: {
                    stacked: true,
                    display: false,
                    ticks: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            },
            layout: {
                padding: 5
            },
            barPercentage: 0.90,
            categoryPercentage: 1.0,
            maintainAspectRatio: false,

        },
    };

    const myChart1 = new Chart(
        document.getElementById(id),
        config
    );
}


/*
 *   datasetMakerDuo is a function that takes a key (the name if the value)
 *   and 2 values (emotion and learning experience) and creates a Chartly dataset for a graph
 *
 *   @return obj an object containing label, colour and data
 */
function datasetMakerDuo(key, emotion_value, exp_value) {
    var obj = new Object();
    var obj = {
        label: key,
        backgroundColor: emotionColours.get(key),
        borderColor: emotionColours.get(key),
        data: [emotion_value, exp_value]
    };
    return obj;

}

/*
 *  createGroupData is function that is passed each entry and
 *  adds the positive, negative and other emotions to the
 *  group map.
 * 
 *  This is where the groupMap, courseMap and studentsEntryPerGroup
 *  map are created.
 */

function createGroupData(data) {
    var groupName = (data.group + " " + data.week);
    var courseName = (data.course + " " + data.week);

    //Listing who made entries per group/ course per week
    if (studentsEntryPerGroup.has(groupName)) {

        studentsEntryPerGroup.get(groupName).push(data.name);



    } else {
        var arr = new Array();
        arr.push(data.name);

        studentsEntryPerGroup.set(groupName, arr);
    }
    if (studentsEntryPerGroup.has(courseName)) {

        studentsEntryPerGroup.get(courseName).push(data.name);


    } else {
        var arr = new Array();
        arr.push(data.name);

        studentsEntryPerGroup.set(courseName, arr);
    }



    if (data.week.substring(4) > highestWeek) {
        highestWeek = data.week.substring(4);
    }

    if (courseMap.has(courseName)) {

    } else {
        var newCourse = new CoursePerWeek(data.course, data.week);
        courseMap.set((data.course + " " + data.week), newCourse);

    }
    if (!groupMap.has(groupName)) {

        var newGroup = new GroupPerWeek(data.group, data.week, data.course);
        
        groupMap.set((data.group + " " + data.week), newGroup);
        
    }
    var hasNoneExp = 0;

    Object.entries(data).forEach((entry) => {

        if (positiveEmotions.includes(entry[0])) {
            
            groupMap.get(groupName).addToPositiveEmotion(entry[1]);
            courseMap.get(courseName).addToPositiveEmotion(entry[1]);

        } else if (negativeEmotions.includes(entry[0])) {

            groupMap.get(groupName).addToNegativeEmotion(entry[1]);
            courseMap.get(courseName).addToNegativeEmotion(entry[1]);

        } else if (entry[0] == "Other_emotion") {
            //entry[0] == "Other_emotion" || 
            groupMap.get(groupName).addToOtherEmotion(entry[1]);
            courseMap.get(courseName).addToOtherEmotion(entry[1]);

        } else if (entry[0] == "None_emotion") {

            groupMap.get(groupName).addToNeutralEmotion(entry[1]);
            courseMap.get(courseName).addToNeutralEmotion(entry[1]);

        } else if (negativeExperience.includes(entry[0])) {

            groupMap.get(groupName).addToNegativeExp(entry[1]);
            courseMap.get(courseName).addToNegativeExp(entry[1]);

        } else if (positiveExperience.includes(entry[0])) {

            groupMap.get(groupName).addToPositiveExp(entry[1]);
            courseMap.get(courseName).addToPositiveExp(entry[1]);

        } else if (entry[0] == "None_positive") {
            if (hasNoneExp == 1) {

                groupMap.get(groupName).addToNeutralExp(entry[1]);
                courseMap.get(courseName).addToNeutralExp(entry[1]);
            } else {
                hasNoneExp++;
            }

        } else if (entry[0] == "None_issue") {
            if (hasNoneExp == 1) {

                groupMap.get(groupName).addToNeutralExp(entry[1]);
                courseMap.get(courseName).addToNeutralExp(entry[1]);
            } else {
                hasNoneExp++;
            }

        }
        if (entry[0] == "Other_issue") {

            groupMap.get(groupName).addToOtherExp(entry[1]);
            courseMap.get(courseName).addToOtherExp(entry[1]);
        }


    });



}

/*
 *   createIndividualData is a function that takes an entry and adds that information
 *   to the correlating Student object
 */
function createIndividualData(student) {

    var datac = new Array();

    var name, week, group, course;
    var x = 0;
    var hasNoneExp = 0;
    Object.entries(student).forEach((entry) => {

        const [key, value] = entry;

        if (x == 0) {
            name = value;
            x++;
        } else if (x == 1) {
            group = value;
            x++;
        } else if (x == 2) {
            week = value;

            x++;
        } else if (x == 3) {
            course = value;

            x++;
        } else {
            var id = name + " " + group + " " + week;
            if (!studentMap.has(id)) {
                var studentObject = new Student(name, group, course, week)
                studentMap.set(id, studentObject);
            }
            if (positiveEmotions.includes(entry[0])) {

                studentMap.get(id).addToPositiveEmotion(entry[1]);


            } else if (negativeEmotions.includes(entry[0])) {

                studentMap.get(id).addToNegativeEmotion(entry[1]);


            } else if (entry[0] == "Other_emotion") {
                
                studentMap.get(id).addToOtherEmotion(entry[1]);


            } else if (entry[0] == "None_emotion") {

                studentMap.get(id).addToNeutralEmotion(entry[1]);


            } else if (negativeExperience.includes(entry[0])) {

                studentMap.get(id).addToNegativeExp(entry[1]);


            } else if (positiveExperience.includes(entry[0])) {

                studentMap.get(id).addToPositiveExp(entry[1]);


            } else if (entry[0] == "None_positive") {
                if (hasNoneExp == 1) {

                    studentMap.get(id).addToNeutralExp(entry[1]);

                } else {
                    hasNoneExp++;
                }

            } else if (entry[0] == "None_issue") {
                if (hasNoneExp == 1) {


                    studentMap.get(id).addToNeutralExp(entry[1]);
                } else {
                    hasNoneExp++;
                }

            }
            if (entry[0] == "Other_issue") {

                studentMap.get(id).addToOtherExp(entry[1]);

            }

        }

    });

}

/*
 *   processData the function that is called by iteration of all the data.
 *   It takes a single entry and passes it on to other methods
 */

function processData(data, filter) {
    //If loading a page of groups or courses
    if (filter == 'group' || 'set') {
        createGroupData(data);

    }
    //If loading an page of individuals
    if (filter == 'individuals') {

        createIndividualData(data);
    }
    
}


/*
 *   getStudents is a function that is immediately called when the page loads.
 *   Its job is to get the data from the web server and pass it on
 * 
 *   It also calls the required methods for the page that called it
 */
const getStudents = async (set, course) => {

    //fetching data from server
    var res
    if (set == 'individuals') {
        res = await fetch("../../home/students/");
    } else {
        res = await fetch("../home/students/");
    }

    const students = await res.json()



    //iterating over each entry
    Object.entries(students).forEach((student, value) => {
        //turning data into JSON objects
        studentData = JSON.parse(student[1]);

        if (value == 0) {
            //creates a map from the first value iterated over.  This contains
            //the information of each group/course and its students

            studentInGroup = new Map(Object.entries(studentData));

        } else {
            //This method will create the required maps and data in order to be displayed later
            processData(studentData, set);
        }

    });
    if (course == undefined) {
        course = 'course';
    }
    if (set == 'none') {
        displayGroups();
    } else if (set == 'group') {

        var sortedMap = new Map(sortMapNegative(set));
        //This method builds the graphs
        displayGroupGraph(course, sortedMap, fillInMissingWeeks(sortedMap, set));
        //This method adds the correct values to the filter
        buildForm(groupMap, highestWeek, set);
        //adds bookmark functionallity
        bookmarkEventListener(set);
        //builds maps for missing entries
        fillInMissingWeeks(sortedMap, set);
        //creates the buttons that let you go into a team
        displayGroups();
        
    } else if (set == 'course') {
        var sortedMap = new Map(sortMapNegative(set));
        //This method builds the graphs
        displayGroupGraph(course, sortedMap, fillInMissingWeeks(sortedMap, set));
        //This method adds the correct values to the filter
        buildForm(courseMap, highestWeek, set);
        //adds bookmark functionallity
        bookmarkEventListener(set);
        //builds maps for missing entries
        fillInMissingWeeks(sortedMap, set);
        //creates the buttons that let you go into a team
        displayGroups();
    } else if (set == 'individuals') {
        var sortedMap = new Map(sortMapNegative(set));
        //This method builds the graphs
        displayIndividualGraphs(course, sortedMap, fillInMissingWeeks(sortedMap, set));
        //adds correct values to the filter form
        buildForm(studentMap, highestWeek, set);
        //adds bookmark functionallity
        bookmarkEventListener(set);
        //creates the buttons that let you go into a students reports
        displayStudents(course);
    }




}

/*
*   buildTrendGraph takes a dataset and an id and builds and displays the chart
*/
function buildTrendGraph(data, id){
    var currentGraph = document.getElementById(id);
    currentGraph.remove();
    var trend = document.createElement('canvas');
    trend.setAttribute("id", id);
    var title = "Experience";
    if(id == "emoTrend"){
        title = "Emotions";
    }
    
    document.getElementById('trendsDiv').appendChild(trend);
    const config = {
        type: 'line',
        data: data,
        options: {
            plugins: {
                title:{
                    display: true,
                    text: title,
                    font: {
                        size: 25,
                        family: 'Poppins'
                    },
                    padding: {
                        top: 10,
                        bottom: 10
                    },
                    color: "black"

                },
                labels: {
                    font: {
                        color: "black"
                    }
                }
            },
            scales:{
                x:{
                    ticks: { color: "black"}
                },
                y:{
                    ticks: { color: "black"}
                }
            }
        }
      };

    const myChart1 = new Chart(
        document.getElementById(id),
        config
    );
   


}
/*
*   getTrendData takes a positive, negative and neutral emotion/experience array and returns a dataset
*   for a Chartly.js chart
*/
function getTrendData(positiveArray, negativeArray, neutralArray){
    var labels = new Array();
    for(let i = 1; i < positiveArray.length +1; i++){
        labels.push("Week " + (i-1 ));
    }
    


    const data = {
      labels: labels,
      datasets: [{
        label: 'Positive',
        data: positiveArray,
        fill: false,
        backgroundColor: '#48A9A6',
        borderColor: '#48A9A6',
        tension: 0.1
      }, {
        label: 'Negative',
        data: negativeArray,
        fill: false,
        backgroundColor: '#D1603D',
        borderColor: '#D1603D',
        tension: 0.1
      }, {
        label: 'Neutral',
        data: neutralArray,
        fill: false,
        backgroundColor: '#a1a1a1',
        borderColor: '#a1a1a1',
        tension: 0.1
      }]
    };

    return data;
}
/*
 *   processIndividuals is a function that is immediately called when the page loads.
 *   Its job is to get the data from the web server and pass it on
 * 
 *   It also calls the required methods for the page that called it
 */
const processIndividuals = async (set, course) => {
    //fetching data from server
    const res = await fetch("../../../home/students/individuals");
    const students = await res.json()
    //iterating over each entry
    students.forEach((title, data) => {
        //title is the name of the data... for some reason... idk
        var studentData = JSON.parse(title);
        //displays the text reports with their emotions
        displayReports(studentData);
    });
    //This event listener hides the emotion overlay when not hovering over a sentence
    var reportArea = document.getElementById('reportArea');
    reportArea.addEventListener("mouseover", hideEmotionHover);
    //Adds correct values to form
    
    //Adds empty weeks
    addMissingWeeks();
}

/*
 * addMissingWeeks is a fucntion that finds the highest week and fills in empty
 * entries.
 */
function addMissingWeeks() {
    var name = document.getElementById('studentName').textContent;
    var group = document.getElementById('groupName').textContent;
    var course = document.getElementById('courseName').textContent;
    var weeks = document.getElementById('textArea').children;
    var topWeek = 0;
    for (var i = 0; i < weeks.length; i++) {

        var weekNumber = parseInt(weeks[i].id.substring(4));
        if (weekNumber > topWeek) {
            topWeek = weekNumber;
        }
    }
    for (var i = 1; i < weekNumber + 1; i++) {
        var elm = document.getElementById("Week" + i);
        if (elm == null) {
            
            buildReportHTML(null, ("Week" + i));
        }
    }

}
/*
 * displayReports is a function calls passes on data only if it is required
 */
function displayReports(data) {
    var name = document.getElementById('studentName').textContent;
    var group = document.getElementById('groupName').textContent;
    var course = document.getElementById('courseName').textContent;
    var infArr = data[0].split(" ");
    if (infArr[0] == name && infArr[1] == group && infArr[2] == course) {
        buildReportHTML(data, infArr[3]);

    }
}
/*
 * buildReportHTML is a function builds and displays all the sentences of an entry
 */
function buildReportHTML(data, week) {
    var weekNumber = parseInt(week.substring(4));
    var textArea = document.getElementById('textArea');
    var textEntry = document.createElement('div');
    var paragraph = document.createElement('p');
    var textHeader = document.createElement('div');
    var weekTitle = document.createElement('h3');
    var commonLearning = document.createElement('div');
    commonLearning.setAttribute("class", "commonLearning");

    textHeader.setAttribute("class", "textHeader");

    weekTitle.setAttribute("id", "weekTitle");
    weekTitle.textContent = week.substring(0, 4) + " " + week.substring(4);
    var backButtonButton = document.createElement('button');
    backButtonButton.setAttribute("class", "backButtonButton");
    backButtonButton.setAttribute("id", "backButton " + weekNumber);
    backButtonButton.setAttribute("onclick", "previousWeek(this.id)");

    var nextButtonButton = document.createElement('button');
    nextButtonButton.setAttribute("class", "nextButtonButton");
    nextButtonButton.setAttribute("id", "nextButton " + weekNumber);
    nextButtonButton.setAttribute("onclick", "nextWeek(this.id)");

    var backButton = document.createElement('i');
    backButton.setAttribute("class", "fa-solid fa-caret-left");
    backButtonButton.appendChild(backButton);
    var nextButton = document.createElement('i');
    nextButton.setAttribute("class", "fa-solid fa-caret-right");
    nextButtonButton.appendChild(nextButton);

    textHeader.appendChild(backButtonButton);
    textHeader.appendChild(weekTitle);
    textHeader.appendChild(nextButtonButton);
    textHeader.appendChild(commonLearning);


    textEntry.setAttribute("id", week);
    textEntry.setAttribute("class", "textEntry");
    textEntry.style.order = week.substring(4);
    textEntry.appendChild(textHeader)
    textEntry.appendChild(paragraph);

    var allComments = document.getElementById("allComments");

    var emotionsRadio = document.getElementById('emotionRadio');
    var experienceRadio = document.getElementById('experienceRadio');

    emotionsRadio.addEventListener("click", radioCheck);
    experienceRadio.addEventListener("click", radioCheck);

    posEmoMap = new Map();
    negEmoMap = new Map();

    posExpMap = new Map();
    negExpMap = new Map();

    var x = 0;
    if (data != null) {
        var sentenceNumber = 0;
        data.forEach((value) => {
            var posEmoArr = new Array();
            var negEmoArr = new Array();

            var posExpArr = new Array();
            var negExpArr = new Array();

            

            var span = document.createElement('span');
            span.setAttribute("id", week + " " + sentenceNumber);
            span.setAttribute("display", "emotion");
            span.setAttribute("class", "sentence");
            span.setAttribute("shown", "true");
            if (x == 0) {
                x++;
            } else {
                
                span.textContent = " " + value[0];
                
                

                for (var i = 1; i < value.length; i++) {
                    var used = false;
                    span.addEventListener("click", sentenceClick);
                    if (positiveEmotions.includes(value[i])) {
                        posEmoArr.push(value[i]);
                        span.addEventListener("mousemove", emotionHover);
                        addToMap(value[i], posEmoMap);
                        used = true;
                    }
                    if (negativeEmotions.includes(value[i])) {
                        negEmoArr.push(value[i]);
                        addToMap(value[i], negEmoMap);
                        span.addEventListener("mousemove", emotionHover);

                    }
                    if (positiveExperience.includes(value[i])) {
                        posExpArr.push(value[i]);
                        addToMap(value[i], posExpMap);

                        used = true;
                    }
                    if (negativeExperience.includes(value[i])) {
                        negExpArr.push(value[i]);
                        addToMap(value[i], negExpMap);
                       

                    }
                }
                
                span.setAttribute("comment", value[value.length-1]);
                if(span.getAttribute("comment") == ""){
                    span.setAttribute("hasComment", "false");
                } else {
                    span.setAttribute("hasComment", "true");
                }
                var comment = document.createElement("div");
                comment.setAttribute("id", "comment " +week + " " + sentenceNumber);
                comment.setAttribute("class", "commentDiv");
                comment.setAttribute("selected", "false");
                comment.setAttribute("editing", "false");
                if(week != "Week1"){
                    comment.style.display = "none";
                } 
                
                if(span.getAttribute("comment") == ""){
                    comment.style.display = "none";
                }
                comment.textContent += span.getAttribute("comment");

                comment.addEventListener("click", commentClick);
                comment.addEventListener("dblclick", commentDoubleClick);
                allComments.appendChild(comment);
                
                paragraph.appendChild(span);
            }
            //EMOTIONS

            if (posEmoArr.length == 0 && negEmoArr.length == 0) {

            } else if (posEmoArr == 0) {
                span.setAttribute("emotionType", "negative");

                var string = "";
                negEmoArr.forEach((entry) => {
                    string += " " + entry + ",";
                });
                span.setAttribute("emotion", string.substring(0, string.length - 1));

            } else if (negEmoArr == 0) {

                span.setAttribute("emotionType", "positive");
                var string = "";
                posEmoArr.forEach((entry) => {
                    string += " " + entry + ",";
                });
                span.setAttribute("emotion", string.substring(0, string.length - 1));
            } else {

                span.setAttribute("emotionType", "mixed");
                var string = "";
                posEmoArr.forEach((entry) => {
                    string += " " + entry + ",";
                });
                negEmoArr.forEach((entry) => {
                    string += " " + entry + ",";
                });
                span.setAttribute("emotion", string.substring(0, string.length - 1));
            }

            //EXPERIENCES

            if (posExpArr.length == 0 && negExpArr.length == 0) {

            } else if (posExpArr == 0) {
                span.setAttribute("experienceType", "negative");

                var string = "";
                negExpArr.forEach((entry) => {
                    string += " " + entry + ",";
                });
                span.setAttribute("experience", string.substring(0, string.length - 1));

            } else if (negExpArr == 0) {

                span.setAttribute("experienceType", "positive");
                var string = "";
                posExpArr.forEach((entry) => {
                    string += " " + entry + ",";
                });
                span.setAttribute("experience", string.substring(0, string.length - 1));
            } else {

                span.setAttribute("experienceType", "mixed");
                var string = "";
                posExpArr.forEach((entry) => {
                    string += " " + entry + ",";
                });
                negExpArr.forEach((entry) => {
                    string += " " + entry + ",";
                });
                span.setAttribute("experience", string.substring(0, string.length - 1));
            }


            sentenceNumber++;
        });
        
    }
    
    if (weekNumber != 1) {
        textEntry.style.display = "none";
    }
    
    textArea.appendChild(textEntry);

    buildBarGraphs(week, posEmoMap, negEmoMap, posExpMap, negExpMap);
    addFilterDropDown(week, posEmoMap, negEmoMap, posExpMap, negExpMap);
}

/*
 *  addFilterDropDown is a function that adds the emotions and experiences for each week to the report
 *  It will hide all of them but week 1's emotions
*/
function addFilterDropDown(week, posEmoMap, negEmoMap, posExpMap, negExpMap){
    var EmoArray = new Array();
    var ExpArray = new Array();
    //adding option for all emotions / experiences
    EmoArray.push("All Emotions");
    ExpArray.push("All Experiences");

    //Adding each positive and negative emotion to an array
    posEmoMap.forEach((key, value) => {
        EmoArray.push(value);
    });
    negEmoMap.forEach((key, value) => {
        EmoArray.push(value);
    });
     //Adding each positive and negative experience to an array
    negExpMap.forEach((key, value) => {
        ExpArray.push(value);
    });
    posExpMap.forEach((key, value) => {
        ExpArray.push(value);
    });
    

    var sentenceFilterLabel = document.getElementById("sentenceFilterLabel");
    var EmoSentenceFilter = document.createElement("select");
    var ExpSentenceFilter = document.createElement("select");

    EmoSentenceFilter.setAttribute("id", week+"-EmoSentenceFilter")
    EmoSentenceFilter.addEventListener("change", optionClick, false);

    ExpSentenceFilter.setAttribute("id", week+"-ExpSentenceFilter")
    ExpSentenceFilter.addEventListener("change", optionClick, false);

    EmoSentenceFilter.setAttribute("class", "SentenceFilter")
    ExpSentenceFilter.setAttribute("class", "SentenceFilter")

        //hide all but emotions week 1
    if(week != "Week1"){
        EmoSentenceFilter.style.display = "none";
        EmoSentenceFilter.setAttribute("selected", "false");
    } else {
        EmoSentenceFilter.setAttribute("selected", "true");
    }
    ExpSentenceFilter.style.display = "none";
    ExpSentenceFilter.setAttribute("selected", "false");


    //creating the <options> element for the <select> element
    EmoArray.forEach((value) =>{

        var option = document.createElement("option");
        
        option.setAttribute("value", value)
        option.textContent = value;
        EmoSentenceFilter.appendChild(option);
    });
    ExpArray.forEach((value) =>{

        var option = document.createElement("option");
        
        option.setAttribute("value", value)
        option.textContent = value;
        ExpSentenceFilter.appendChild(option);
    });
    
    //Adding to page
    sentenceFilterLabel.appendChild(EmoSentenceFilter);
    sentenceFilterLabel.appendChild(ExpSentenceFilter);
    
}

/*
*   optionClick is an event listener that will trigger each time a new <option> is selected
*   It changes the values of the sentences depending on whether they are being selected or not
*/
const optionClick = function (event){
    console.log("click");
    
    var selecter = event.path[0];
    var week = selecter.getAttribute("id").split("-")[0];
    //The value present in the <select>
    var SelectedValue = selecter.value;
    
    //Looping over all the sentences
    var sentence = document.querySelector('#textArea').children
    for (var i = 0; i < sentence.length; i++) {
        
        //Looping over only the ones from the current week
        if(sentence[i].getAttribute("id") == week){
            
            var spans = sentence[i].children[1].children;
            for (var j = 0; j < spans.length; j++) {
                //The shown attribute refers to the background colour of the sentence
                // i.e. "false" means there will be no/a white background.  
                spans[j].setAttribute("shown", "false");

                var emotionRadio = document.getElementById("emotionRadio");
                var type = emotionRadio.checked;
                

                var array;
                if(type){
                    type = "emotion"
                } else {
                    type = "experience"
                }
                //Ignores sentences that have no colour behind them
                if(spans[j].getAttribute(type) != null){
                    //Turns all the emotions/experiences present in the sentence into an array
                    array = spans[j].getAttribute(type).split(", ");
                    
                    array[0] = array[0].substring(1)
                    var containsValue = false;
                   
                    //This searches through all of them and compares them to the selected value
                    array.forEach((value) => {

                        if(value == SelectedValue || SelectedValue == "All Emotions" || SelectedValue == "All Experiences"){
                            
                            containsValue = true;
                        } 
                            
                        
                    })
                    //Coded like this to avoid changing this attribute in the middle of the spans for loop
                    if(containsValue){
                        spans[j].setAttribute("shown", "true");
                    } 
                    
                }
                
                
            }
        }
    }
    
}
/*
*   addToMap takes a value and a map and increments the value associated with it
*/
function addToMap(value, map){
    if(!map.has(value)){
        map.set(value, 1);
    } else if(map.has(value)){
        map.set(value, (map.get(value) + 1));
    }

}
/*
* buildBarGraphs will build and display the trend graphs
*/
function buildBarGraphs(week,posEmoMap, negEmoMap, posExpMap, negExpMap){
        
        const data = getBarGraphDatasets(posEmoMap, negEmoMap, posExpMap, negExpMap);
        const emoConfig = {
            type: 'bar',
            data: data[0],
            options: {
                indexAxis: 'y',
                scales: {
                    y: {
                    beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                        font: {
                            size: 20,
                            weight: 'bold',
                            lineHeight: 1.2,
                            family: 'Poppins'
                            
                        },
                        color: "black",
                        text: "Emotions"
    
                    }
                    
                }
                },
        };

        var id = "emotionGraph " + week;
        var newCanva = document.createElement("canvas");
        newCanva.setAttribute("id", id)
        document.getElementById("graphArea").appendChild(newCanva);
        newCanva.style.display = "none";
        
        if(week == "Week1"){
            newCanva.style.display = "block";
            newCanva.setAttribute("current", "true");
        } 
        const emotionBar = new Chart(
            document.getElementById(id),
            emoConfig
        );
        const expConfig = {
            type: 'bar',
            data: data[1],
            options: {
            indexAxis: 'y',
            scales: {
                y: {
                beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    font: {
                        size: 20,
                        weight: 'bold',
                        lineHeight: 1.2,
                        family: 'Poppins'
                    },
                    color: "black",
                    text: "Learning Experience",

                }
                
            }
            },
        };

        id = "experienceGraph " + week;
        var newCanva = document.createElement("canvas");
        newCanva.setAttribute("id", id)
        document.getElementById("graphArea").appendChild(newCanva);
        newCanva.style.display = "none";
        if(week == "Week1"){
            newCanva.setAttribute("current", "true");
        } 
        const experienceBar = new Chart(
            document.getElementById(id),
            expConfig
        );
   

}

/*
*   getBarGraphDatasets takes the positive/negative emotion/learning experience maps and returns the datasets
*   for the Chartly.js charts
*/
function getBarGraphDatasets(posEmoMap, negEmoMap, posExpMap, negExpMap){
    var emotionsLabels = new Array();
    var emotionsData = new Array();
    var emoColors = new Array();
    var expColors = new Array();


    posEmoMap.forEach((key, value) =>{
        
        emotionsLabels.push(value);
        emotionsData.push(key);
        emoColors.push("rgba(138, 201, 38, 0.4)");
    })
    negEmoMap.forEach((key, value) =>{
       
        emotionsLabels.push(value);
        emotionsData.push(key);
        emoColors.push("rgba(255, 0, 8, 0.4)");
    })

    var experienceLabels = new Array();
    var experienceData = new Array();

    posExpMap.forEach((key, value) =>{
        
        experienceLabels.push(value);
        experienceData.push(key);
        expColors.push("rgba(138, 201, 38, 0.4)");
    })
    negExpMap.forEach((key, value) =>{
        
        experienceLabels.push(value);
        experienceData.push(key);
        expColors.push("rgba(255, 0, 8, 0.4)");
    })



    var emotions = {
        labels: emotionsLabels,
        datasets: [{
            label: "Emotions",
            data: emotionsData,
            backgroundColor: emoColors,
            borderColor: emoColors,
            borderWidth: 1
        }]
      };
      
    var experience = {
        labels: experienceLabels,
        datasets: [{
            label: 'Experience',
            data: experienceData,
            backgroundColor: expColors,
            borderColor: expColors,
            borderWidth: 1
        }]
      };

      return [emotions, experience];
    
}
/*
*   radioCheck is the method called by the event listener when the emotion/learning experience radio is selected
*   It will change the highlighted sentence and the graph to the learning experience or emotion version
*/
const radioCheck = function (event){
    
   var graphs = document.querySelector('#textArea').children;
   for (var i = 0; i < graphs.length; i++) {
    var spans = graphs[i].children[1].children;
    for (var j = 0; j < spans.length; j++) {
        if(event.path[0].getAttribute('value') == "experience"){
            spans[j].setAttribute("display", "experience");
            
        } else if(event.path[0].getAttribute('value') == "emotion"){
            spans[j].setAttribute("display", "emotion");
            
        }
    }
  }
 var barGraphs = document.querySelector("#graphArea").children;
 for(var i = 0; i < barGraphs.length; i++){
    if(event.path[0].getAttribute('value') == "experience"){
        
        if(barGraphs[i].getAttribute("current") == "true"){
            
            if(barGraphs[i].getAttribute("id").substring(0,2) =="ex"){
                
                barGraphs[i].style.display = "block";
            } else{
                barGraphs[i].style.display = "none";
            }
                    
        }

    
    } else if(event.path[0].getAttribute('value') == "emotion"){
        if(barGraphs[i].getAttribute("current") == "true"){
            
            if(barGraphs[i].getAttribute("id").substring(0,2) =="em"){
                
                barGraphs[i].style.display = "block";
            } else{
                barGraphs[i].style.display = "none";
            }
            
            
        }
    }
 }

    var filters = document.querySelector("#sentenceFilterLabel").children;
    var week;
    var found = false;
    for(var i = 0; i < filters.length; i++){
        if(filters[i].getAttribute("selected") == "true" && found != true){
            filters[i].setAttribute("selected", "false");
            filters[i].style.display = "none";
            var filterInfArr = filters[i].getAttribute("id").split("-");
            week = filterInfArr[0];
            var type = filterInfArr[1].substring(0,3);
            if(type == "Emo"){
                
                
                var exp = document.getElementById(week+"-ExpSentenceFilter");
                exp.style.display = "inline-block";
                exp.setAttribute("selected", "true");
                found = true;
            } 
            if(type == "Exp") {
                
                var emo = document.getElementById(week+"-EmoSentenceFilter");
                emo.style.display = "inline-block";
                emo.setAttribute("selected", "true");
                found = true;
            }
        }
    }
    
    var selectType;
    if(event.path[0].getAttribute('value') == "experience"){
        selectType = "Exp";
    } else {
        selectType = "Emo";
    }

    var selecter = document.getElementById(week+"-"+selectType+"SentenceFilter");
    var value = selecter.value;
    var event = new Event('change');
    selecter.dispatchEvent(event);
    //selecter.value = "All Emotions";
   
}
/*
*   clearSelectedElements removes the attribute "selected" from all elements
*   This makes it easier to not accidentally have multiple sentences selected at once
*/
function clearSelectedElements(){
    var comments = document.querySelector('#allComments').children;
    for (var i = 0; i < comments.length; i++) {
        comments[i].setAttribute("selected", "false");
        if(comments[i].getAttribute("editing") == "true"){
        
        }

    }
    var graphs = document.querySelector('#textArea').children
    for (var i = 0; i < graphs.length; i++) {
        var spans = graphs[i].children[1].children;
        for (var j = 0; j < spans.length; j++) {
            spans[j].setAttribute("selected", "false");
        }
    }
    var newCommentDiv = document.getElementById('newCommentDiv');
    newCommentDiv.firstChild.value = "";
    newCommentDiv.style.display = "none";
}

/*
*   commentDoubleClick is the method called by the event listener when a comment is double clicked
*   It will open up the functionality for editing and deleting the comment
*/
const commentDoubleClick = function(event){

    const comment =  event.path[0]
    if(comment.getAttribute("selected") == "false"){

    } else {

        var graphs = document.querySelector('#textArea').children
        for (var i = 0; i < graphs.length; i++) {
            var spans = graphs[i].children[1].children;
            for (var j = 0; j < spans.length; j++) {
                spans[j].removeEventListener("click", sentenceClick);
            }
        }
        comment.setAttribute("editing", "true");
        comment.removeEventListener("click", commentClick);
        comment.removeEventListener("dblclick", commentDoubleClick);

        var textEntry = document.createElement('textarea');
        textEntry.value = comment.textContent;
        comment.textContent = "";
        comment.appendChild(textEntry);

        var toolButtons = document.createElement('div');
        toolButtons.setAttribute("id", "toolButtons");

        var commentDelete = document.createElement('button');
        commentDelete.setAttribute("id", "commentDelete");
        
        commentDelete.setAttribute("onclick", "saveComment(false)");
        commentDelete.textContent = "Delete"

        var commentSave = document.createElement('button');
        commentSave.setAttribute("id", "commentSave");
        commentSave.setAttribute("onclick", "saveComment(true)");
        commentSave.textContent = "Save"

        toolButtons.appendChild(commentDelete);
        toolButtons.appendChild(commentSave);

        comment.appendChild(toolButtons);
    }
    
}
/* 
* commentClick is the function called by the event listener when a comment is clicked on
* It will highlight the relevant sentence, display the new comment section if needed
* and scroll so the sentence is in view
*/
const commentClick = function(event){

    var editing = false;
    var comments = document.querySelector('#allComments').children;
    for (var i = 0; i < comments.length; i++) {
        
        if(comments[i].getAttribute("editing") == "true"){
            
           editing = true;
        }

    }
    
    if(editing){
        
        
    } else if(event.path[0].getAttribute("id") == "commentSave" || event.path[0].getAttribute("id") == "commentDelete"){
    
    } else {
        
        clearSelectedElements();
        event.path[0].setAttribute("selected", "true");

        event.path[0].getAttribute("id");
        
        var sentence = document.getElementById(event.path[0].getAttribute("id").substring(8));
        sentence.setAttribute("selected", "true");
        sentence.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    
    }
    
}
/*
 * previousWeek is a function called by the the "back" button on the individual students page
 * it hides the current entry and displays the previous one
 */
function previousWeek(id) {
    var weeks = document.getElementById("textArea").children;
    var infArr = id.split(" ");
    var nextWeek = (parseInt(infArr[1]) - 1)

    var currentEntry = document.getElementById('Week' + infArr[1]);

    var nextEntry = document.getElementById('Week' + nextWeek);
    while (nextEntry == null) {
        nextWeek--;

        if (nextWeek < 1) {
            nextEntry = document.getElementById('Week' + weeks.length);
            nextWeek = weeks.length;
        } else {
            nextEntry = document.getElementById('Week' + nextWeek);
        }

    }
    currentEntry.style.display = "none";
    nextEntry.style.display = "block";
    
    var graphs = document.querySelector('#textArea').children
    for (var i = 0; i < graphs.length; i++) {
        var spans = graphs[i].children[1].children;
        for (var j = 0; j < spans.length; j++) {
            var infarr = spans[j].getAttribute('id').split(' ');
            var comment = document.getElementById("comment " + spans[j].getAttribute('id'));
            if(infarr[0] == ("Week"+nextWeek) && spans[j].getAttribute('hascomment') == "true"){
                
                comment.style.display = "block";
            } else {
                comment.style.display = "none";
            }

        }
    }

    var barGraphs = document.querySelector("#graphArea").children;
    var selectedRadio;
    
    if(document.getElementById("emotionRadio").checked){
        selectedRadio = "em";
    } else {
        selectedRadio = "ex";
    }
    
    for(var i = 0; i < barGraphs.length; i++){
        barGraphs[i].style.display = "none";
        barGraphs[i].setAttribute("current", "false");
        var graphWeek = barGraphs[i].getAttribute("id").split(" ")[1].substring(4);
        if(graphWeek == nextWeek){
            
            barGraphs[i].setAttribute("current", "true");
            if(barGraphs[i].getAttribute("id").substring(0,2) == selectedRadio){
                barGraphs[i].style.display = "block";
            }
            
        }
    }
    var filters = document.querySelector("#sentenceFilterLabel").children;
    
    for(var i = 0; i < filters.length; i++){
        if(filters[i].getAttribute("selected") == "true"){
            filters[i].setAttribute("selected", "false");
            filters[i].style.display = "none";
            var filterInfArr = filters[i].getAttribute("id").split("-");
            filters[i].style.display = "none";
            
            var nextFilter = document.getElementById("Week"+nextWeek+"-"+filterInfArr[1]);
            nextFilter.style.display = "inline-block"
            nextFilter.setAttribute("selected", "true");
            
        }
    }
}
/*
 * nextWeek is a function called by the the "next" button on the individual students page
 * it hides the current entry and displays the next one
 */
function nextWeek(id) {
    var weeks = document.getElementById("textArea").children;
    var infArr = id.split(" ");
    var nextWeek = (parseInt(infArr[1]) + 1)

    var currentEntry = document.getElementById('Week' + infArr[1]);

    var nextEntry = document.getElementById('Week' + nextWeek);
    while (nextEntry == null) {
        nextWeek++;

        if (nextWeek > weeks.length) {
            nextEntry = document.getElementById('Week1');
            nextWeek = 1;
        } else {
            nextEntry = document.getElementById('Week' + nextWeek);
        }

    }
    currentEntry.style.display = "none";
    nextEntry.style.display = "block";

    var graphs = document.querySelector('#textArea').children
    for (var i = 0; i < graphs.length; i++) {
        var spans = graphs[i].children[1].children;
        for (var j = 0; j < spans.length; j++) {
            var infarr = spans[j].getAttribute('id').split(' ');
            var comment = document.getElementById("comment " + spans[j].getAttribute('id'));
            if(infarr[0] == ("Week"+nextWeek) && spans[j].getAttribute('hascomment') == "true"){
                
                comment.style.display = "block";
            } else {
                comment.style.display = "none";
            }

        }
    }
   
   
    var barGraphs = document.querySelector("#graphArea").children;
    var selectedRadio;
    
    if(document.getElementById("emotionRadio").checked){
        selectedRadio = "em";
    } else {
        selectedRadio = "ex";
    }
    
    for(var i = 0; i < barGraphs.length; i++){
        barGraphs[i].style.display = "none";
        barGraphs[i].setAttribute("current", "false");
        var graphWeek = barGraphs[i].getAttribute("id").split(" ")[1].substring(4);
        if(graphWeek == nextWeek){
            
            barGraphs[i].setAttribute("current", "true");
            if(barGraphs[i].getAttribute("id").substring(0,2) == selectedRadio){
                barGraphs[i].style.display = "block";
            }
            
        }
    }

    var filters = document.querySelector("#sentenceFilterLabel").children;
    
    for(var i = 0; i < filters.length; i++){
        if(filters[i].getAttribute("selected") == "true"){
            filters[i].setAttribute("selected", "false");
            filters[i].style.display = "none";
            var filterInfArr = filters[i].getAttribute("id").split("-");
            filters[i].style.display = "none";
            
            var nextFilter = document.getElementById("Week"+nextWeek+"-"+filterInfArr[1]);
            nextFilter.style.display = "inline-block"
            nextFilter.setAttribute("selected", "true");
            
        }
    }

}
/*
 *  hideEmotionHover is an event listener that hides the moving emotion overlay
 */
const hideEmotionHover = function(event) {
    var test = document.getElementById('testDiv');
    test.style.display = "none"
}
/*
 *  emotionHover is an event listener that displays the cursor following emotion overlay
 */
const emotionHover = function(event) {
    var test = document.getElementById('testDiv');
    var span = event.path[0];
    var text;
    if(span.getAttribute('display') == "emotion"){
        if (span.getAttribute("emotionType") == "negative") {
            test.style.border = "1px solid rgba(255, 89, 94, 1)";
        } else if (span.getAttribute("emotionType") == "positive") {
            test.style.border = "1px solid rgba(138, 201, 38, 1)";
        } else if (span.getAttribute("emotionType") == "mixed") {
            test.style.border = "1px solid rgba(255, 184, 30, 1)";
        } else {
            return;
        }
        text = span.getAttribute("emotion");
    } else if(span.getAttribute('display') == "experience"){
        if (span.getAttribute("experienceType") == "negative") {
            test.style.border = "1px solid rgba(255, 89, 94, 1)";
        } else if (span.getAttribute("experienceType") == "positive") {
            test.style.border = "1px solid rgba(138, 201, 38, 1)";
        } else if (span.getAttribute("experienceType") == "mixed") {
            test.style.border = "1px solid rgba(255, 184, 30, 1)";
        } else {
            return;
        }
        text = span.getAttribute("experience");
    }
    


    test.textContent = text;
    test.style.display = "block";
    test.style.top = event.pageY + -70 + "px";
    test.style.left = event.pageX + 5 + "px";
}
/*
 *  sentenceClick is an event listener is used to select a sentence to add a comment to it
 */
const sentenceClick = function(event) {
    clearSelectedElements();
    event.path[0].setAttribute("selected", "true");
    var commentEntry = document.getElementById("newCommentDiv");
    
    if(event.path[0].getAttribute("hascomment") == "true"){
        
        commentEntry.style.display = "none";
    } else {
        commentEntry.style.display = "block";
    }

    event.path[0].getAttribute("id");
    var comment = document.getElementById("comment " + event.path[0].getAttribute("id"));
    
    comment.setAttribute("selected", "true");
}
/*
 *  saveComment is a function that will take what is in the text entry element and
 *  set the sentence's comment attribute to it.
*/
function saveComment(arg){
    
    var comments = document.querySelector('#allComments').children;
    var comment;
    var commentDiv;
    for (var i = 0; i < comments.length; i++) {
        
        if(comments[i].getAttribute("editing") == "true"){
            commentDiv = comments[i];
           comment = comments[i].firstChild.value;
           commentDiv.setAttribute("editing", "false");
        }

    }
    
    var hasComment = true;
    if(comment == "" || arg == false){
        hasComment = false;
    }
    var sentences = document.querySelector('#textArea').children
    for (var i = 0; i < sentences.length; i++) {
        var spans = sentences[i].children[1].children;
        for (var j = 0; j < spans.length; j++) {
            
            if(spans[j].getAttribute("selected") == "true"){
                var commentDiv = document.getElementById("comment "+  spans[j].getAttribute("id"));
                
                if(!hasComment){
                    spans[j].setAttribute("hasComment", "false");
                    commentDiv.style.display = "none";
                } else {
                    spans[j].setAttribute("hasComment", "true");
                    commentDiv.style.display = "block";
                    commentDiv.textContent = comment;
                }
                spans[j].setAttribute("comment", comment);
                
            }
        }
    }
    commentDiv.setAttribute("editing", "false");
    commentDiv.setAttribute("selected", "false");

    
    commentDiv.addEventListener("dblclick", commentDoubleClick);
    commentDiv.addEventListener("click", commentClick);


    var graphs = document.querySelector('#textArea').children
    for (var i = 0; i < graphs.length; i++) {
        var spans = graphs[i].children[1].children;
        for (var j = 0; j < spans.length; j++) {
            
            spans[j].addEventListener("click", sentenceClick);
        }
    }
}
/*
*   addComment is a method called by the add comment button on the 'student' page
*   It will make a comment entry from the text in the text area
*/
function addComment(){

    var newComment = document.getElementById('commentEntry').value;
    var hasComment = true;
    if(newComment == ""){
        hasComment = false;
    }
    var sentences = document.querySelector('#textArea').children
    for (var i = 0; i < sentences.length; i++) {
        var spans = sentences[i].children[1].children;
        for (var j = 0; j < spans.length; j++) {
            
            if(spans[j].getAttribute("selected") == "true"){
                var commentDiv = document.getElementById("comment "+  spans[j].getAttribute("id"));
                
                if(!hasComment){
                    spans[j].setAttribute("hasComment", "false");
                    commentDiv.style.display = "none";
                } else {
                    spans[j].setAttribute("hasComment", "true");
                    commentDiv.style.display = "block";
                    commentDiv.textContent = newComment;
                }
                spans[j].setAttribute("comment", newComment);
                
            }
        }
    }

    commentDiv.setAttribute("editing", "false");
    commentDiv.setAttribute("selected", "false");

    
    commentDiv.addEventListener("dblclick", commentDoubleClick);
    commentDiv.addEventListener("click", commentClick);

    document.getElementById('commentEntry').value = "";
    document.getElementById('newCommentDiv').style.display = "none";
}

/*
 *  fillInMissingWeeks is a function used to find missing entries
 *
 * @return missingEntries an array of missing entries
 */
function fillInMissingWeeks(map, set) {
    var week = 0;
    var groups = new Array();
    var courseTitle = document.getElementById("courseTitle");
    var missingEntries = new Array();

    
    if(set == "course"){
        map.forEach((value, key) => {
            var arr = key.split(" ");
            if (!groups.includes(arr[0])) groups.push(arr[0]);

            if (value.week > week) {
                week = value.week;
            }
        });
        week = parseInt(week);
    } else if (set == "group"){
        map.forEach((value, key) => {
            if (value.course == courseTitle.textContent) {
                var arr = key.split(" ");
                if (!groups.includes(arr[0])) groups.push(arr[0]);

                if (value.week > week) {
                    week = value.week;
                }
            }
        });
        week = parseInt(week);
    } else if(set == "individuals"){
        map.forEach((value, key) => {
            if (value.group == courseTitle.textContent) {
                var arr = key.split(" ");
                if (!groups.includes(arr[0])) groups.push(arr[0]);

                if (value.week > week) {
                    week = value.week;
                }
            }
        });
        week = parseInt(week);


    }


    groups.forEach((value) => {
        for (var i = 1; i < week + 1; i++) {
            var id;
            if(set == "individuals"){
                id = value + " "+ courseTitle.textContent +" Week" + i
            } else {
                id = value + " Week" + i
            }
            if (!map.has(id)) {
                missingEntries.push(value + " Week" + i);
            }
        }
    });

    return (missingEntries);
}

/*
 *  bookmarkEventListener isn't an event listener... nice!
 * This function actual sees if an object should be bookmarked,
 * bookmarks it if so, then adds an event listener to the bookmark button
 */
function bookmarkEventListener(set) {

    const graphs = document.querySelector('#new').children;
    var deadMaps;
    for (var i = 0; i < graphs.length; i++) {
        var currentMark, newMark;
        
        var infArr = graphs[i].id.split(" ");
        
        var id = infArr[0] + " " + infArr[1];

        var checkid = infArr[0] + " " + infArr[1] + " checkbox";
        if(set == "course"){
            map = courseMap;
        } else if(set == "group"){
            map = groupMap;
        } else if (set == "individuals"){
            
            const group = document.getElementById("courseTitle").textContent;
            
            id = infArr[0] + " " + group+" " + infArr[1];
            map = studentMap;
        }
        
        deadMaps = fillInMissingWeeks(map, set);
        
        if(map.get(id) != undefined){
            currentMark = map.get(id).bookmarked;
            if (currentMark) {
                map.get(id).bookmarkTrue();
                document.getElementById(checkid).checked = true;
            } else {
                map.get(id).bookmarkFalse();
                document.getElementById(checkid).checked = false;
            }
             var checkElm = document.getElementById(checkid);
            checkElm.addEventListener("click", bookmarkClick)
        }
    }

    deadMaps.forEach((value) => {
        

        var checkElm = document.getElementById(value + " checkbox");
        checkElm.addEventListener("click", bookmarkClick)
    }) 
    
}
/*
 * bookmarkClick is actually an event listener. Updates object and page when a bookmark is clicked
 */
const bookmarkClick = function() {
    
    var currentMark = this.checked;
    var infArr = this.id.split(" ");
    var id = infArr[0] + " " + infArr[1];
    var checkid = this.id;
    
    var map;
    if ( set == "course") { //COURSE LEVEL
        map = courseMap;
    } else if ( set == "group"){ //GROUP LEVEL
        map = groupMap;
    } else {  //INDIVIDUAL LEVEL
        const group = document.getElementById("courseTitle").textContent;
            
        StudentID = infArr[0] + " " + group+" " + infArr[1];
        

        map = studentMap;
    }


    
    if(document.getElementById(id + " container").hasAttribute("missing")){
        if(document.getElementById(id + " container").getAttribute("missing") == "true"){
            if (currentMark) {

                
                document.getElementById(checkid).checked = true;

            } else {
                
                document.getElementById(checkid).checked = false;

            }
        }
    } else {
       if (currentMark) {

            map.get(StudentID).bookmarkTrue();
            document.getElementById(checkid).checked = true;

        } else {
            map.get(StudentID).bookmarkFalse();
            document.getElementById(checkid).checked = false;

        } 
    }

}

/*
 *   clearGraphs is a function that removes all canva elements
 *   and creates a new empty div
 */
function clearGraphs() {
    document.querySelector('#new').remove();
    var newDiv = document.createElement("div");
    newDiv.setAttribute("id", "new");
    var newDiv2 = document.createElement("div");
    newDiv2.setAttribute("id", "groupButtonDiv");
    var parent = document.querySelector('main');
    parent.appendChild(newDiv);
}
/*
 * makeAside is a function that builds the area to the right of the graphs.
 * This contains information like % change and number of students
 */
function makeAside(id) {

    var parentDiv = document.createElement("div");
    var emoDiv = document.createElement("div");
    var expDiv = document.createElement("div");
    var bookmarkDiv = document.createElement("div");

    var infoDiv = document.createElement("div");
    infoDiv.setAttribute("class", "infoDiv");

    var numStudentsDiv = document.createElement("div");
    numStudentsDiv.setAttribute("class", "numStudentsDiv");
    numStudentsDiv.setAttribute("id", id + " numStudents");

    bookmarkDiv.setAttribute("class", "bookmarkDiv");

    var checkbox = document.createElement("input");

    var span = document.createElement("span");
    span.setAttribute("class", "bookmark");
    span.setAttribute("id", id + " bookmark");

    var bookmarktrue = document.createElement("i");
    var bookmarkfalse = document.createElement("i");
    bookmarktrue.setAttribute("class", "fa-solid fa-bookmark");
    bookmarkfalse.setAttribute("class", "fa-regular fa-bookmark");


    span.appendChild(bookmarkfalse);
    span.appendChild(bookmarktrue);
    checkbox.setAttribute("id", id + " checkbox");
    checkbox.setAttribute("class", "check");
    checkbox.setAttribute("type", "checkbox");
    bookmarkDiv.appendChild(checkbox);
    bookmarkDiv.appendChild(span);
    parentDiv.setAttribute("class", "graphAside");
    emoDiv.setAttribute("class", "changeValues");
    expDiv.setAttribute("class", "changeValues");
    emoDiv.setAttribute("id", id + " emo change");
    expDiv.setAttribute("id", id + " exp change");

    infoDiv.appendChild(bookmarkDiv);
    infoDiv.appendChild(numStudentsDiv);
    parentDiv.appendChild(infoDiv);
    parentDiv.appendChild(emoDiv);
    parentDiv.appendChild(expDiv);

    return parentDiv;
}

/*
 *   makeCanva is a function that creates a canva HTML element
 *   it takes an id to be used to identify it.
 */
function makeCanva(id) {
    var canvaContainer = document.createElement("div");
    canvaContainer.setAttribute("class", "canvaContainer");
    canvaContainer.setAttribute("id", id + " container");


    var newCanva = document.createElement("canvas");
    newCanva.setAttribute("id", id)


    var newDiv = makeAside(id);

    var element = document.getElementById("new");
    canvaContainer.appendChild(newCanva);
    canvaContainer.appendChild(newDiv);
    element.appendChild(canvaContainer);

}

/*
 * sortMapNegative is a function that returns the correct map, sorted by the most negative first
 */
function sortMapNegative(set) {
    
    var unsortedArray;
    if (set == 'group') {
        unsortedArray = [...groupMap];
    } else if (set == 'course') {
        unsortedArray = [...courseMap];
    } else if (set =='individuals'){
        unsortedArray = [...studentMap];
    }
    return unsortedArray.sort((a, b) => (a[1].getOverallNegative() < b[1].getOverallNegative()) ? 1 : -1);
}
/*
 * sortMapEmoNegative is a function that returns the correct map, sorted by the most negative emotiond first
 */
function sortMapEmoNegative(set) {

    var unsortedArray;
    if (set == 'group') {
        unsortedArray = [...groupMap];
    } else if (set == 'course') {
        unsortedArray = [...courseMap];
    } else if (set =='individuals'){
        unsortedArray = [...studentMap];
    }
    return unsortedArray.sort((a, b) => (a[1].getEmoNegative() < b[1].getEmoNegative()) ? 1 : -1);
}
/*
 * sortMapExpNegative is a function that returns the correct map, sorted by the most negative
 * learning experience first.
 */
function sortMapExpNegative(set) {

    var unsortedArray;
    if (set == 'group') {
        unsortedArray = [...groupMap];
    } else if (set == 'course') {
        unsortedArray = [...courseMap];
    } else if (set =='individuals'){
        unsortedArray = [...studentMap];
    }
    
    return unsortedArray.sort((a, b) => (a[1].getExpNegative() < b[1].getExpNegative()) ? 1 : -1);
}

/*
 * sortMapPositive is a function that returns the correct map, sorted by the most positive
 */
function sortMapPositive(set) {

    var unsortedArray;
    if (set == 'group') {
        unsortedArray = [...groupMap];
    } else if (set == 'course') {
        unsortedArray = [...courseMap];
    } else if (set =='individuals'){
        unsortedArray = [...studentMap];
    }
    return unsortedArray.sort((a, b) => (a[1].getOverallNegative() > b[1].getOverallNegative()) ? 1 : -1);
}

/*
 * sortMapMostRecent is a function that returns the correct map, sorted by the most recent week
 */
function sortMapMostRecent(set) {
    var unsortedArray;
    if (set == 'group') {
        unsortedArray = [...groupMap];
    } else if (set == 'course') {
        unsortedArray = [...courseMap];
    } else if (set =='individuals'){
        unsortedArray = [...studentMap];
    }
    return unsortedArray.sort((a, b) => (a[1].week < b[1].week) ? 1 : -1);
}

/*
 * sortMapLeastRecent is a function that returns the correct map, sorted by the least recent week
 */
function sortMapLeastRecent(set) {
    var unsortedArray;
    if (set == 'group') {
        unsortedArray = [...groupMap];
    } else if (set == 'course') {
        unsortedArray = [...courseMap];
    } else if (set =='individuals'){
        unsortedArray = [...studentMap];
    }
    return unsortedArray.sort((a, b) => (a[1].week > b[1].week) ? 1 : -1);
}

/*
 * displayIndividualGraphs is a function that will create and display the graphs of individual students
 */
function displayIndividualGraphs(group, map, deadMaps) {
    var selectedGroup =  document.getElementById('groupSelector').value;
    
    var highestWeek = 0;
    var positive = new Array();
    var negative = new Array();
    var neutral = new Array();

    var positiveExpArr = new Array();
    var negativeExpArr= new Array();
    var neutralExpArr = new Array();

    var highestWeek = 0;
    map.forEach((key) => {

        if (key.group == group) {
            var id = (key.name + " Week" + key.week);
            if(key.week > highestWeek){
                highestWeek = key.week;
            }
    
        
        
            makeCanva(id);
            var dataG = new Array();
            var emotion_total = key.getTotalEmo();
            var exp_total = key.getTotalExp();

            
            if(selectedGroup == "null") {
                positive[key.week] = key.positiveEmotion / emotion_total;
                negative[key.week] = key.negativeEmotion / emotion_total;
                neutral[key.week] = key.neutralEmotion / emotion_total;

                positiveExpArr[key.week] = key.positiveExp / exp_total;
                negativeExpArr[key.week] = key.negativeExp  / exp_total;
                neutralExpArr[key.week] = key.neutralExp  / exp_total;
            } else if(selectedGroup == key.name){
                
                positive[key.week] = key.positiveEmotion / emotion_total;
                negative[key.week] = key.negativeEmotion / emotion_total;
                neutral[key.week] = key.neutralEmotion / emotion_total;

                positiveExpArr[key.week] = key.positiveExp / exp_total;
                negativeExpArr[key.week] = key.negativeExp  / exp_total;
                neutralExpArr[key.week] = key.neutralExp  / exp_total;
            }

            dataG.push(datasetMakerDuo("Positive", (key.positiveEmotion / emotion_total), (key.positiveExp / exp_total)));
            dataG.push(datasetMakerDuo("Neutral", (key.neutralEmotion / emotion_total), (key.neutralExp / exp_total)));

            dataG.push(datasetMakerDuo("Negative", (key.negativeEmotion / emotion_total), (key.negativeExp / exp_total)));
            dataG.push(datasetMakerDuo("Other", (key.otherEmotion / emotion_total), (key.otherExp / exp_total)));

            buildHorizontalGraph(dataG, ["Emotions", "Learning Experience"], id, id);
            displayAside(key, group);

        }

    
    });
    
    deadMaps.forEach((value) => {

        
        makeCanva(value);
        var missingContainer = document.getElementById(value + " container");
        missingContainer.setAttribute("Missing", "true");
        
        var dataG = new Array();
        dataG.push(datasetMakerDuo("Missing", 1, 1));
        buildHorizontalGraph(dataG, ["Emotions", "Learning Experience"], value, value);
    });
    
    var emoTrendData = getTrendData(positive, negative, neutral);
    buildTrendGraph(emoTrendData, "emoTrend");

    var expTrendData = getTrendData(positiveExpArr, negativeExpArr, neutralExpArr);
    buildTrendGraph(expTrendData, "expTrend");
}
/*
 * displayAside adds the information to the aside to the right of the graphs
 */
function displayAside(key) {
    var emoChange = document.getElementById(key.name + " Week" + key.week + " emo change");

    var expChange = document.getElementById(key.name + " Week" + key.week + " exp change");
    

    var emotion_total = key.positiveEmotion + key.negativeEmotion + key.otherEmotion + key.neutralEmotion;
    var exp_total = key.positiveExp + key.negativeExp + key.neutralExp + key.otherExp;

    var currentWeek = key.week;
    if (key.week > 1) {

        var prevWeek = key.name + " " + group + " Week" + (currentWeek - 1);

        
        if (studentMap.has(prevWeek)) {

            var prev = studentMap.get(prevWeek)

            var prevEmoTotal = prev.positiveEmotion + prev.negativeEmotion + prev.otherEmotion + prev.neutralEmotion;

            var ChangeInEmo = (key.positiveEmotion / emotion_total) - (prev.positiveEmotion / prevEmoTotal);


            var prevExpTotal = prev.positiveExp + prev.negativeExp + prev.neutralExp + prev.otherExp;

            var ChangeInExp = (key.positiveExp / exp_total) - (prev.positiveExp / prevExpTotal);



            var em = Math.round(ChangeInEmo * 100) ;
            var ex = Math.round(ChangeInExp * 100 ) ;
            emoChange.textContent = em;
            expChange.textContent = ex;
            emoChange.textContent += "%";
            expChange.textContent += "%";




            if (em == 0) {
                var flatIcon = document.createElement("i");
                flatIcon.setAttribute("class", "fa-solid fa-minus");
                emoChange.appendChild(flatIcon);
            } else if (em > 0) {
                var upArrow = document.createElement('i');
                upArrow.setAttribute("class", "fa-solid fa-caret-up");
                emoChange.appendChild(upArrow);
            } else if (em < 0) {
                var downArrow = document.createElement("i");
                downArrow.setAttribute("class", "fa-solid fa-caret-down");
                var flatIcon = document.createElement("i");
                flatIcon.setAttribute("class", "fa-solid fa-minus");
                emoChange.appendChild(downArrow);
            }
            if (ex == 0) {
                var flatIcon = document.createElement("i");
                flatIcon.setAttribute("class", "fa-solid fa-minus");
                expChange.appendChild(flatIcon);
            } else if (ex > 0) {
                var upArrow = document.createElement('i');
                upArrow.setAttribute("class", "fa-solid fa-caret-up");
                expChange.appendChild(upArrow);
            } else if (ex < 0) {
                var downArrow = document.createElement("i");
                downArrow.setAttribute("class", "fa-solid fa-caret-down");
                expChange.appendChild(downArrow);
            }



        } else {
            emoChange.textContent = "0%";
            expChange.textContent = "0%";
        }
    } else {
        emoChange.textContent = "0%";
        expChange.textContent = "0%";
    }
}
/*
 *   displayGroupGraph is a function that, when called
 *   will create graphs from the map passed to it
 * 
 * It also adds information to the aside
 */

function displayGroupGraph(course, sortedMap, deadMaps) {
    var selectedGroup =  document.getElementById('groupSelector').value;
    
    var highestWeek = 0;
    var positive = new Array();
    var negative = new Array();
    var neutral = new Array();

    var positiveExpArr = new Array();
    var negativeExpArr= new Array();
    var neutralExpArr = new Array();


    sortedMap.forEach((key, value) => {

        if (key.course == course || course == 'course') {
            if(key.week > highestWeek){
                highestWeek = key.week;
            }
            var infArr = key.name.split(" ");
            var name = infArr[0]
            

            var completed = studentsEntryPerGroup.get(name + " Week" + key.week).length;

            var total = studentInGroup.get(name).length;

            var ratioOfCompleted = completed / total;

            var emotion_total = key.positiveEmotion + key.negativeEmotion + key.otherEmotion + key.neutralEmotion;
            var exp_total = key.positiveExp + key.negativeExp + key.neutralExp + key.otherExp;

          

            var dataG = new Array();
            //Trendline things
           
            if(course == 'course'){
                
                if(positive[key.week] == undefined){
                    positive[key.week] = 0;
                    positiveExpArr[key.week] = 0;
                }
                if(negative[key.week] == undefined){
                    negative[key.week] = 0;
                    negativeExpArr[key.week] = 0;
                }
                if(neutral[key.week] == undefined){
                    neutral[key.week] = 0;
                    neutralExpArr[key.week] = 0;
                }
                
                if(selectedGroup == "null"){
                    positive[key.week] = positive[key.week] + (key.positiveEmotion / emotion_total);
                    negative[key.week] = negative[key.week] + (key.negativeEmotion / emotion_total);
                    neutral[key.week] = neutral[key.week] + (key.neutralEmotion / emotion_total);

                    positiveExpArr[key.week] = key.positiveExp / exp_total;
                    negativeExpArr[key.week] = key.negativeExp  / exp_total;
                    neutralExpArr[key.week] = key.neutralExp  / exp_total;
                } else if (selectedGroup == key.course){
                    positive[key.week] = positive[key.week] + (key.positiveEmotion / emotion_total);
                    negative[key.week] = negative[key.week] + (key.negativeEmotion / emotion_total);
                    neutral[key.week] = neutral[key.week] + (key.neutralEmotion / emotion_total);

                    positiveExpArr[key.week] = key.positiveExp / exp_total;
                    negativeExpArr[key.week] = key.negativeExp  / exp_total;
                    neutralExpArr[key.week] = key.neutralExp  / exp_total;

                }
                
                
            } else if(selectedGroup == "null") {
                positive[key.week] = key.positiveEmotion / emotion_total;
                negative[key.week] = key.negativeEmotion / emotion_total;
                neutral[key.week] = key.neutralEmotion / emotion_total;

                positiveExpArr[key.week] = key.positiveExp / exp_total;
                negativeExpArr[key.week] = key.negativeExp  / exp_total;
                neutralExpArr[key.week] = key.neutralExp  / exp_total;
            } else if(selectedGroup == key.group){
                
                positive[key.week] = key.positiveEmotion / emotion_total;
                negative[key.week] = key.negativeEmotion / emotion_total;
                neutral[key.week] = key.neutralEmotion / emotion_total;

                positiveExpArr[key.week] = key.positiveExp / exp_total;
                negativeExpArr[key.week] = key.negativeExp  / exp_total;
                neutralExpArr[key.week] = key.neutralExp  / exp_total;
            } else {
                
            }
            

            //Regular graphs things
            makeCanva(key.name);
            dataG.push(datasetMakerDuo("Positive", (key.positiveEmotion / emotion_total) * ratioOfCompleted, (key.positiveExp / exp_total)* ratioOfCompleted));
            dataG.push(datasetMakerDuo("Neutral", (key.neutralEmotion / emotion_total)* ratioOfCompleted, (key.neutralExp / exp_total)* ratioOfCompleted));

            dataG.push(datasetMakerDuo("Negative", (key.negativeEmotion / emotion_total)* ratioOfCompleted, (key.negativeExp / exp_total)* ratioOfCompleted));
            dataG.push(datasetMakerDuo("Other", (key.otherEmotion / emotion_total)* ratioOfCompleted, (key.otherExp / exp_total)* ratioOfCompleted));

            dataG.push(datasetMakerDuo("Missing", 1 - ratioOfCompleted, 1 - ratioOfCompleted));

            buildHorizontalGraph(dataG, ["Emotions", "Learning Experience"], key.name, key.name);

            var emoChange = document.getElementById(key.name + " emo change");

            var expChange = document.getElementById(key.name + " exp change");
            var numStudentDiv = document.getElementById(key.name + " numStudents");
            var infoDiv = numStudentDiv.parentElement.closest('div');
            var currentWeek = key.week;

            


            var elm = document.createElement("div");
            elm.setAttribute("class", "missingStudents");
            elm.setAttribute("id", name + " Week" + key.week + " missingStudents");
            var order = 1;
            var goodArr = new Array();
            var badArr = new Array();
            studentInGroup.get(name).forEach((value) => {

                if (studentsEntryPerGroup.get(name + " Week" + key.week).includes(value)) {
                    goodArr.push(value);
                } else {
                    badArr.push(value);
                }
                order++;
            });
            goodArr.sort();
            badArr.sort();
            goodArr.forEach((entry) => {
                var goodBoy = document.createElement("span")
                goodBoy.setAttribute("class", "goodBoy");
                goodBoy.style.order = 1;


                goodBoy.textContent += entry;
                elm.appendChild(goodBoy);
                var icon = document.createElement("i");
                icon.setAttribute("class", "fa-solid fa-circle-dot");
                goodBoy.appendChild(icon);
            });
            badArr.forEach((entry) => {
                var badBoy = document.createElement("span");
                badBoy.setAttribute("class", "badBoy");
                badBoy.style.order = -1;

                badBoy.textContent += entry;
                elm.appendChild(badBoy);
                var icon = document.createElement("i");
                icon.setAttribute("class", "fa-solid fa-circle-dot");
                badBoy.appendChild(icon);

            });

            numStudentDiv.textContent = completed + " / " + total;

            infoDiv.appendChild(elm);
            var ratio = completed / total;
            if (ratio >= 1) {
                numStudentDiv.setAttribute("ratio", "green");
            } else if (ratio >= 0.5 && ratio < 1) {
                numStudentDiv.setAttribute("ratio", "orange");
            } else if (ratio < 0.5) {
                numStudentDiv.setAttribute("ratio", "red");
            }

            if (key.week > 1) {

                var prevWeek = name + " Week" + (currentWeek - 1);


                if (sortedMap.has(prevWeek)) {

                    var prev = sortedMap.get(prevWeek)

                    var prevEmoTotal = prev.positiveEmotion + prev.negativeEmotion + prev.otherEmotion + prev.neutralEmotion;

                    var ChangeInEmo = (key.positiveEmotion / emotion_total) - (prev.positiveEmotion / prevEmoTotal);

                    var prevExpTotal = prev.positiveExp + prev.negativeExp + prev.neutralExp + prev.otherExp;
                    var ChangeInExp = (key.positiveExp / exp_total) - (prev.positiveExp / prevExpTotal);

                    var em = Math.round(ChangeInEmo * 100);
                    var ex = Math.round(ChangeInExp * 100);
                    emoChange.textContent = em;
                    expChange.textContent = ex;
                    emoChange.textContent += "%";
                    expChange.textContent += "%";

                    if (em == 0) {
                        var flatIcon = document.createElement("i");
                        flatIcon.setAttribute("class", "fa-solid fa-minus");
                        emoChange.appendChild(flatIcon);
                    } else if (em > 0) {
                        var upArrow = document.createElement('i');
                        upArrow.setAttribute("class", "fa-solid fa-caret-up");
                        emoChange.appendChild(upArrow);
                    } else if (em < 0) {
                        var downArrow = document.createElement("i");
                        downArrow.setAttribute("class", "fa-solid fa-caret-down");
                        var flatIcon = document.createElement("i");
                        flatIcon.setAttribute("class", "fa-solid fa-minus");
                        emoChange.appendChild(downArrow);
                    }
                    if (ex == 0) {
                        var flatIcon = document.createElement("i");
                        flatIcon.setAttribute("class", "fa-solid fa-minus");
                        expChange.appendChild(flatIcon);
                    } else if (ex > 0) {
                        var upArrow = document.createElement('i');
                        upArrow.setAttribute("class", "fa-solid fa-caret-up");
                        expChange.appendChild(upArrow);
                    } else if (ex < 0) {
                        var downArrow = document.createElement("i");
                        downArrow.setAttribute("class", "fa-solid fa-caret-down");
                        expChange.appendChild(downArrow);
                    }

                } else {
                    emoChange.textContent += "0%";
                    expChange.textContent += "0%";
                }
            } else {
                emoChange.textContent += "0%";
                expChange.textContent += "0%";
            }
        }
    });

    deadMaps.forEach((value) => {
        makeCanva(value);
        var missingContainer = document.getElementById(value + " container");
        missingContainer.setAttribute("Missing", "true");
        var dataG = new Array();
        dataG.push(datasetMakerDuo("Missing", 1, 1));
        buildHorizontalGraph(dataG, ["Emotions", "Learning Experience"], value, value);
    });

    var emoTrendData = getTrendData(positive, negative, neutral);
    buildTrendGraph(emoTrendData, "emoTrend");

    var expTrendData = getTrendData(positiveExpArr, negativeExpArr, neutralExpArr);
    buildTrendGraph(expTrendData, "expTrend");

}
/*
 * displayGroups is a function that adds buttons that take you into their course/group
 */
function displayGroups() {
    var courseTitle = document.getElementById("courseTitle");
    var sillyGroup = new Map();
    var path;
    if (courseTitle != null) {
        path = ("../papers/" + courseTitle.textContent + "/");

        groupMap.forEach((key, value) => {
            if (key.course == courseTitle.textContent) {

                sillyGroup.set(key.group, key.group);
            }

        });
    } else {
        path = "../papers/"
        groupMap.forEach((key, value) => {
            sillyGroup.set(key.course, key.course);
        });
    }

    sillyGroup.forEach((key, value) => {
        var groupButton = document.createElement('a');
        var element = document.querySelector('#groupButtonDiv');
        groupButton.setAttribute("class", "groupButton");
        groupButton.setAttribute("id", key);
        groupButton.setAttribute("href", path + key);
        groupButton.textContent = key;
        element.appendChild(groupButton);
    });
}
/*
 * displayStudents is a function that adds buttons that take you into their individual page
 */
function displayStudents(group) {
    var courseTitle = document.getElementById("courseTitle");
    var sillyGroup = new Map();
    var path;
    if (courseTitle != null) {
        studentMap.forEach((key, value) => {
            if (key.group == courseTitle.textContent) {

                sillyGroup.set(key.name, key.name);
                path = ("../" + key.course + "/" + courseTitle.textContent + "/");
            }

        });

    }


    sillyGroup.forEach((key, value) => {

        var groupButton = document.createElement('a');
        var element = document.querySelector('#groupButtonDiv');
        groupButton.setAttribute("class", "groupButton");
        groupButton.setAttribute("id", key);
        groupButton.setAttribute("href", path + key);
        groupButton.textContent = key;
        element.appendChild(groupButton);
    });
}
/*
 * getIndividuals is a function called by the html page
 */
function getIndividuals() {
    clearGraphs();
    getStudents('individuals');
}
/*
 * getGroups is a function called by the html page
 */
function getGroups() {
    clearGraphs();
    getStudents('group');

}


/*
 * buildForm add the values to the filter form
 */
function buildForm(map, highestWeek, set) {

    var courseTitle = document.getElementById("courseTitle");
    var week;
    var groupSet = new Set()


    if(set == "course"){
        week = parseInt(highestWeek);
    } 
    if(set == "group"){
        week = 0
        if (courseTitle != null) {
            week = 0;
            map.forEach((key) => {
                if (key.course == courseTitle.textContent) {
    
                    if (key.week > week) {
                        week = key.week;
                    }
                }
            });
            week = parseInt(week);
        }
    } 
    if(set == "individuals"){
        week = 0
        if (courseTitle != null) {
            week = 0;
            map.forEach((key) => {
                if (key.group == courseTitle.textContent) {
    
                    if (key.week > week) {
                        week = key.week;
                    }
                }
            });
            week = parseInt(week);
        }
    } 
   
    for (var i = 1; i < week + 1; i++) {

        var option = document.createElement("option");
        option.setAttribute("value", ("week" + i));
        option.textContent = "Week " + i;
        var element = document.getElementById('weekSelector');
        element.appendChild(option);
    }

    map.forEach((key) => {
        if (set == "group") {
            if (key.course == courseTitle.textContent) {
                groupSet.add(key.group);
            }
        } else if(set == "individuals"){
            if (key.group == courseTitle.textContent) {
                groupSet.add(key.name);
            }
        } else {
            var group = key.name.split(" ")[0]
            groupSet.add(group);
        }

    });

    groupSet.forEach((value) => {
        var option = document.createElement("option");
        option.setAttribute("value", value);
        option.textContent = value;
        var element = document.getElementById('groupSelector');
        element.appendChild(option);
    });
}

/*
 * loadCourseButtons is a function that just loads buttons to the courses
 */
function loadCourseButtons() {
    getStudents('none');
}
/*
 * loadCourse is a function that just loads buttons to the courses
 *
 * Honestly I think it is exactly the same as the loadCourseButtons method...
 */
function loadCourses() {
    getStudents('course');

}
/*
 * loadGroup is a function that calls getStudents with group parameters and the pages course
 */
function loadGroup(course) {
    getStudents('group', course);
}
/*
 * loadIndividuals is a function that calls getStudents with individual parameters and the group
 */
function loadIndividuals(group) {
    getStudents('individuals', group);
}