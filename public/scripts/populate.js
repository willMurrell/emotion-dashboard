

/*
 *   emotionColours is a map that containst the emotions and the colour associated with it
 */
const emotionColours = new Map();
emotionColours.set("Positive", "#48A9A6");
emotionColours.set("Negative", "#D1603D");
emotionColours.set("Other", "#E5E5E5");
emotionColours.set("Neutral", "#a1a1a1");
emotionColours.set("Missing", "#aaaaaa");
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
        //groupMap.set(data.group, newGroup);
        groupMap.set((data.group + " " + data.week), newGroup);
        //createGroupData(data);
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
                //entry[0] == "Other_emotion" || 
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



    var learnExpMap = new Map();

    var x = 0;
    if (data != null) {
        
        data.forEach((value) => {
            var posArr = new Array();
            var negArr = new Array();
            var span = document.createElement('span');
            if (x == 0) {
                x++;
            } else {
                
                span.textContent = " " + value[0];
                
                

                for (var i = 1; i < value.length; i++) {
                    var used = false;
                    span.addEventListener("click", sentenceClick);
                    if (positiveEmotions.includes(value[i])) {
                        posArr.push(value[i]);
                        span.addEventListener("mousemove", emotionHover);

                        used = true;
                    }
                    if (negativeEmotions.includes(value[i])) {
                        negArr.push(value[i]);

                        span.addEventListener("mousemove", emotionHover);

                    }
                }
                
                span.setAttribute("comment", value[value.length-1]);
                paragraph.appendChild(span);
            }

            if (posArr.length == 0 && negArr.length == 0) {

            } else if (posArr == 0) {
                span.setAttribute("class", "negativeSpan");

                var string = "";
                negArr.forEach((entry) => {
                    string += " " + entry + ",";
                });
                span.setAttribute("emotion", string.substring(0, string.length - 1));

            } else if (negArr == 0) {

                span.setAttribute("class", "positiveSpan");
                var string = "";
                posArr.forEach((entry) => {
                    string += " " + entry + ",";
                });
                span.setAttribute("emotion", string.substring(0, string.length - 1));
            } else {

                span.setAttribute("class", "mixedSpan");
                var string = "";
                posArr.forEach((entry) => {
                    string += " " + entry + ",";
                });
                negArr.forEach((entry) => {
                    string += " " + entry + ",";
                });
                span.setAttribute("emotion", string.substring(0, string.length - 1));
            }
            
        });
        
    }
    
    if (weekNumber != 1) {
        textEntry.style.display = "none";
    }
    
    textArea.appendChild(textEntry);
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

        } else {
            nextEntry = document.getElementById('Week' + nextWeek);
        }

    }
    currentEntry.style.display = "none";
    nextEntry.style.display = "block";
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

        } else {
            nextEntry = document.getElementById('Week' + nextWeek);
        }

    }
    currentEntry.style.display = "none";
    nextEntry.style.display = "block";
    // var commentEntry = document.getElementById("commentEntry");
    // commentEntry.value = "";
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
    if (event.path[0].getAttribute("class") == "negativeSpan") {
        test.style.border = "1px solid rgba(255, 89, 94, 1)";
    } else if (event.path[0].getAttribute("class") == "positiveSpan") {
        test.style.border = "1px solid rgba(138, 201, 38, 1)";
    } else if (event.path[0].getAttribute("class") == "mixedSpan") {
        test.style.border = "1px solid rgba(255, 184, 30, 1)";
    }
    var emotion = event.path[0].getAttribute("emotion");


    test.textContent = emotion
    test.style.display = "block";
    test.style.top = event.pageY + -70 + "px";
    test.style.left = event.pageX + 5 + "px";
}
/*
 *  sentenceClick is an event listener is used to select a sentence to add a comment to it
 */
const sentenceClick = function(event) {
    var graphs = document.querySelector('#textArea').children
    for (var i = 0; i < graphs.length; i++) {
        var spans = graphs[i].children[1].children;
        for (var j = 0; j < spans.length; j++) {
            spans[j].style.border = "none";
        }
    }
    event.path[0].style.border = "1px solid black";
    var commentEntry = document.getElementById("commentEntry");
    

    commentEntry.value = event.path[0].getAttribute("comment");

   // var selectedText = document.getElementById('selectedText');
   // selectedText.textContent = event.path[0].textContent;
}
/*
 *  addComment is a function that will take what is in the text entry element and
 *  set the sentence's comment attribute to it.
*/
function addComment(){
    var commentEntry = document.getElementById("commentEntry");
    var comment = commentEntry.value;
    
    var graphs = document.querySelector('#textArea').children
    for (var i = 0; i < graphs.length; i++) {
        var spans = graphs[i].children[1].children;
        for (var j = 0; j < spans.length; j++) {
            
            if(spans[j].style.border != "none"){
                spans[j].setAttribute("comment", comment);
            }
        }
    }
    commentEntry.setAttribute("readOnly" , "true");
}

function editComment(){
    
    var commentEntry = document.getElementById("commentEntry");
    commentEntry.removeAttribute("readOnly")
    commentEntry.focus();
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
        
    
}
/*
 * bookmarkClick is actually an event listener. Updates object and page when a bookmark is clicked
 */
const bookmarkClick = function() {
    console.log("click");
    var currentMark = this.checked;
    var infArr = this.id.split(" ");
    var id = infArr[0] + " " + infArr[1];
    var checkid = this.id;
    console.log(set);
    var map;
    if ( set == "course") { //COURSE LEVEL
        map = courseMap;
    } else if ( set == "group"){ //GROUP LEVEL
        map = groupMap;
    } else {  //INDIVIDUAL LEVEL
        const group = document.getElementById("courseTitle").textContent;
            
        id = infArr[0] + " " + group+" " + infArr[1];

        map = studentMap;
    }


        console.log(map.get(id));
        if (currentMark) {

            map.get(id).bookmarkTrue();
            document.getElementById(checkid).checked = true;

        } else {
            map.get(id).bookmarkFalse();
            document.getElementById(checkid).checked = false;

        }
    
    

}

/*
 *   clearGraphs is a function that removes all canva elements
 *   and creates a new empty div
 */
function clearGraphs() {
    document.querySelector('#new').remove();
    // document.querySelector('#groupButtonDiv').remove();
    var newDiv = document.createElement("div");
    newDiv.setAttribute("id", "new");
    var newDiv2 = document.createElement("div");
    newDiv2.setAttribute("id", "groupButtonDiv");
    var parent = document.querySelector('main');
    parent.appendChild(newDiv);
    //parent.appendChild(newDiv2);
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
    //checkbox.setAttribute("checked", "checked");
    //label.setAttribute("class", "switch");
    //label.textContent = "Bookmark";
    //bookmarkDiv.appendChild(label);
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
    console.log("SET: " + set);
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
 * displayIndividualGraphs is a function that will create and display the graphs of individual students
 */
function displayIndividualGraphs(group, map, deadMaps) {
    console.log(deadMaps);
    map.forEach((key) => {

        if (key.group == group) {
            var id = (key.name + " Week" + key.week);
            makeCanva(id);
            var dataG = new Array();
            var emotion_total = key.getTotalEmo();
            var exp_total = key.getTotalExp();

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
        var dataG = new Array();
        dataG.push(datasetMakerDuo("Missing", 1, 1));
        buildHorizontalGraph(dataG, ["Emotions", "Learning Experience"], value, value);
    });


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



            var em = Math.round(ChangeInEmo * 100 * 100) / 100;
            var ex = Math.round(ChangeInExp * 100 * 100) / 100;
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

    sortedMap.forEach((key, value) => {

        if (key.course == course || course == 'course') {
            var emotion_total = key.positiveEmotion + key.negativeEmotion + key.otherEmotion + key.neutralEmotion;
            var exp_total = key.positiveExp + key.negativeExp + key.neutralExp + key.otherExp;
            var dataG = new Array();

            makeCanva(key.name);
            dataG.push(datasetMakerDuo("Positive", (key.positiveEmotion / emotion_total), (key.positiveExp / exp_total)));
            dataG.push(datasetMakerDuo("Neutral", (key.neutralEmotion / emotion_total), (key.neutralExp / exp_total)));

            dataG.push(datasetMakerDuo("Negative", (key.negativeEmotion / emotion_total), (key.negativeExp / exp_total)));
            dataG.push(datasetMakerDuo("Other", (key.otherEmotion / emotion_total), (key.otherExp / exp_total)));

            buildHorizontalGraph(dataG, ["Emotions", "Learning Experience"], key.name, key.name);

            var emoChange = document.getElementById(key.name + " emo change");

            var expChange = document.getElementById(key.name + " exp change");
            var numStudentDiv = document.getElementById(key.name + " numStudents");
            var infoDiv = numStudentDiv.parentElement.closest('div');
            var currentWeek = key.week;

            var infArr = key.name.split(" ");
            var name = infArr[0]
            var set;

            var completed = studentsEntryPerGroup.get(name + " Week" + key.week).length;

            var total = studentInGroup.get(name).length;


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

                    var em = Math.round(ChangeInEmo * 100 * 100) / 100;
                    var ex = Math.round(ChangeInExp * 100 * 100) / 100;
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
        var dataG = new Array();
        dataG.push(datasetMakerDuo("Missing", 1, 1));
        buildHorizontalGraph(dataG, ["Emotions", "Learning Experience"], value, value);
    });
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
    console.log(week);




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