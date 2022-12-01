


/*
 *   emotionColours is a map that containst the emotions and the colour associated with it
 */
const emotionColours = new Map();

emotionColours.set("Positive", "#48A9A6");

// emotionColours.set("Happy/Joyful", "#008000");
// emotionColours.set("Engaged", "#118C11");
// emotionColours.set("Curious/Interested", "#1F991F");
// emotionColours.set("Suprised", "#1F991F");
// emotionColours.set("Confident", "#32A632");
// emotionColours.set("Hopeful", "#47B347");
// emotionColours.set("Proud", "#60BF60");
// emotionColours.set("Empathy", "#7ACC7A");

emotionColours.set("Negative", "#D1603D");

// emotionColours.set("Confused", "#A50104");
// emotionColours.set("Frustrated", "#B81702");
// emotionColours.set("Angry", "#EC3F13");
// emotionColours.set("Worry", "#FA5E1F");
// emotionColours.set("Anxious", "#FF7E33");
// emotionColours.set("Fearful", "#FF931F");
// emotionColours.set("Sad", "#FFAD33");
// emotionColours.set("Bored", "#FFB950");
// emotionColours.set("Hopeless", "#7A0103");
// emotionColours.set("Exhausted/Tired", "#8E0103");
// emotionColours.set("Shamed/Apologetic", "#db6612");

emotionColours.set("Other_emotion", "#FFE940");
//#a1a1a1
emotionColours.set("None_emotion", "#a1a1a1");

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

const neutralEmotion = new Array(
    "None_emotion"

);

const neutralExperience = new Array(
    "None_positive",
    "None_issue"
    //Will this not count a neutral SENTENCE twice? 

);
const positiveExperience = new Array(
    
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
);
const negativeExperience = new Array(
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
);


/*
 *   groupMap is a map that contains each Group from the data, and the number of positive
 *   negative and other emotions
 */
var courseMap = new Map();
var groupMap = new Map();
var studentMap = new Map();

var highestWeek = 0;
/*
 *   Group is a class that takes name as a constructor
 *
 *   addToPositive / Negative / Other are setters that allow
 *   the total number in each value to be increased
 */

class Group {
    constructor(name) {
        this.name = name;
        this.negativeEmotion = 0;
        this.positiveEmotion = 0;
        this.otherEmotion = 0;
        this.negativeExp = 0;
        this.positiveExp = 0;
        
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
    addToPositiveExp(percent) {
        this.positiveExp += percent;
    }
    addToNegativeExp(percent) {
        this.negativeExp += percent;
    }
}

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
        this.neutralEmotion= 0;
        this.negativeExp = 0;
        this.positiveExp = 0;
        this.bookmarked = false;
       
    }
    addToPositiveEmotion(percent) {
        this.positiveEmotion += percent;
        ;
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
    getOverallNegative(){
        var totalEmo = this.negativeEmotion + this.positiveEmotion;
        var totalExp = this.negativeExp + this.positiveExp;
        var percentEmo = this.negativeEmotion / totalEmo;
        var percentExp = this.negativeExp / totalExp;
        return percentEmo + percentExp;

    }
    getEmoNegative(){
        var totalEmo = this.negativeEmotion + this.positiveEmotion;
        var percentEmo = this.negativeEmotion / totalEmo;
        return percentEmo;
    }
    getExpNegative(){
        var totalExp = this.negativeExp + this.positiveExp;
        var percentExp = this.negativeExp / totalExp;
        return percentExp;
    }
    bookmarkTrue(){
        //console.log("bookmarked set to true");
        this.bookmarked = true;
    }
    bookmarkFalse(){
        //console.log("bookmarked set to false");
        this.bookmarked = false;
    
    }
}

class CoursePerWeek {
    constructor(course, week) {
        this.name = course + " " + week;
        this.week = week.substring(4);
        this.course = course;
        this.negativeEmotion = 0;
        this.positiveEmotion = 0;
        this.otherEmotion = 0;
        this.neutralEmotion= 0;
        this.negativeExp = 0;
        this.positiveExp = 0;
        this.bookmarked = false;
       
    }
    addToPositiveEmotion(percent) {
        this.positiveEmotion += percent;
        ;
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
    getOverallNegative(){
        var totalEmo = this.negativeEmotion + this.positiveEmotion;
        var totalExp = this.negativeExp + this.positiveExp;
        var percentEmo = this.negativeEmotion / totalEmo;
        var percentExp = this.negativeExp / totalExp;
        return percentEmo + percentExp;

    }
    getEmoNegative(){
        var totalEmo = this.negativeEmotion + this.positiveEmotion;
        var percentEmo = this.negativeEmotion / totalEmo;
        return percentEmo;
    }
    getExpNegative(){
        var totalExp = this.negativeExp + this.positiveExp;
        var percentExp = this.negativeExp / totalExp;
        return percentExp;
    }
    bookmarkTrue(){
        //console.log("bookmarked set to true");
        this.bookmarked = true;
    }
    bookmarkFalse(){
        //console.log("bookmarked set to false");
        this.bookmarked = false;
    }
}

function mostRecent(){
    clearGraphs();
    var sortedMap = new Map(sortMapNegative());
    //groupMap.forEach((key, value) => {
    // var currentWeek = 0;
    // sortedMap.forEach((key, value) => {
    //     if(currentWeek < key.week){
    //         currentWeek = key.week;
    //     }
    // });
    
    sortedMap.forEach((key, value) => {
        
            
            var emotion_total = key.positiveEmotion + key.negativeEmotion + key.otherEmotion;
            var exp_total = key.positiveExp + key.negativeExp;
            var dataG = new Array();
            makeCanva(key.name);
            dataG.push(datasetMakerDuo("Positive", (key.positiveEmotion/emotion_total), (key.positiveExp/exp_total)));
            dataG.push(datasetMakerDuo("Negative", (key.negativeEmotion/emotion_total), (key.negativeExp/exp_total)));
            dataG.push(datasetMakerDuo("Other_emotion", key.otherEmotion/emotion_total));
            buildHorizontalGraph(dataG, ["Emotions", "Learning Experience"], key.name, key.name);
            
            var emoChange = document.getElementById(key.name + " emo change");
            
            var expChange = document.getElementById(key.name + " exp change");
            if(key.week > 1){
                var info_array = key.name.split('-');
                var currentWeek = key.week;
                
                var prevWeek = key.group +" Week" +(currentWeek - 1);
                
                if(groupMap.has(prevWeek)){

                    var prev = groupMap.get(prevWeek)

                    var prevEmoTotal = prev.positiveEmotion + prev.negativeEmotion + prev.otherEmotion;
                    
                    var ChangeInEmo = (key.positiveEmotion/emotion_total)-(prev.positiveEmotion/prevEmoTotal);
                    

                    var prevExpTotal = prev.positiveExp + prev.negativeExp;
                    
                    var ChangeInExp = (key.positiveExp/exp_total)-(prev.positiveExp/prevExpTotal);
                    
                    var em = Math.round(ChangeInEmo * 100 * 100)/100;
                    var ex = Math.round(ChangeInExp * 100 * 100)/100;
                    emoChange.textContent = em
                    expChange.textContent = ex
                    emoChange.textContent += "%";
                    expChange.textContent += "%";

                   
                    //upArrow.textContent = "ahhh";
                    
                    //downArrow.textContent = "ahhh";
                    
                    //flatIcon.textContent = "ahhh";

                    var x = document.createElement("div");
                    x.setAttribute("class", "apoo");
                   
                    if(em == 0){
                        var flatIcon = document.createElement("i");
                    flatIcon.setAttribute("class", "fa-solid fa-minus");
                        emoChange.appendChild(flatIcon);
                    } else if(em > 0){
                        var upArrow = document.createElement('i');
                        upArrow.setAttribute("class", "fa-solid fa-caret-up");
                        emoChange.appendChild(upArrow);
                    } else if (em < 0){
                        var downArrow = document.createElement("i");
                    downArrow.setAttribute("class", "fa-solid fa-caret-down");
                        var flatIcon = document.createElement("i");
                    flatIcon.setAttribute("class", "fa-solid fa-minus");
                        emoChange.appendChild(downArrow);
                    }
                    if(ex == 0){
                        var flatIcon = document.createElement("i");
                    flatIcon.setAttribute("class", "fa-solid fa-minus");
                        expChange.appendChild(flatIcon);
                    } else if(ex > 0){
                        var upArrow = document.createElement('i');
                        upArrow.setAttribute("class", "fa-solid fa-caret-up");
                        expChange.appendChild(upArrow);
                    } else if (ex < 0){
                        var downArrow = document.createElement("i");
                        downArrow.setAttribute("class", "fa-solid fa-caret-down");
                        expChange.appendChild(downArrow);
                    }
                    //emoChange.textContent = Math.round((key.positiveEmotion - (prev.positiveEmotion/prevEmoTotal)) * 100)/100
                    //emoChange.textContent = (key.positiveEmotion - (prev.positiveEmotion/prevEmoTotal));
                    
                }
            }
            
            
        

    });
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
                    display: false
                }
            },
            layout: {
                padding: 5
            },
            barPercentage: 0.9,
            categoryPercentage: 1.0,
            maintainAspectRatio: false
        },
    };

    const myChart1 = new Chart(
        document.getElementById(id),
        config
    );
}

/*
 *   datasetMaker is a function that takes a key (the name if the value)
 *   and a value and creates a Chartly dataset for a graph
 *
 *   @return obj an object containing label, colour and data
 */
function datasetMaker(key, value) {
    
    var obj = new Object();
    var obj = {
        label: key,
        backgroundColor: emotionColours.get(key),
        borderColor: emotionColours.get(key),
        data: [value],
        barPercentage: 1.0,
        categoryPercentage: 1.0
    };
    return obj;

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
 */

function createGroupData(data) {
    
    var groupName = (data.group + " " + data.week);
    var courseName = (data.course + " " + data.week);

    if(data.week.substring(4) > highestWeek){
        highestWeek = data.week.substring(4);
    }
    
    if(courseMap.has(courseName)){

    } else {
        var newCourse = new CoursePerWeek(data.course, data.week);
        courseMap.set((data.course + " " + data.week), newCourse);
    }
    if (groupMap.has(groupName)) {

        Object.entries(data).forEach((entry) => {
            console.log(data);
            if (positiveEmotions.includes(entry[0])) {

                groupMap.get(groupName).addToPositiveEmotion(entry[1]);
                courseMap.get(courseName).addToPositiveEmotion(entry[1]);

            } else if (negativeEmotions.includes(entry[0])) {

                groupMap.get(groupName).addToNegativeEmotion(entry[1]);
                courseMap.get(courseName).addToNegativeEmotion(entry[1]);

            } else if (entry[0] == "Other_emotion" ) {
                //entry[0] == "Other_emotion" || 
                groupMap.get(groupName).addToOtherEmotion(entry[1]);
                courseMap.get(courseName).addToOtherEmotion(entry[1]);

            } else if (entry[0] == "None_emotion" ) {
                
                groupMap.get(groupName).addToNeutralEmotion(entry[1]);
                courseMap.get(courseName).addToNeutralEmotion(entry[1]);

            } else if (negativeExperience.includes(entry[0])) {
                
                groupMap.get(groupName).addToNegativeExp(entry[1]);
                courseMap.get(courseName).addToNegativeExp(entry[1]);

            } else if (positiveExperience.includes(entry[0])) {
                
                groupMap.get(groupName).addToPositiveExp(entry[1]);
                courseMap.get(courseName).addToPositiveExp(entry[1]);

            }
        });

    } else {
        //var newGroup = new Group(data.group);
        var newGroup = new GroupPerWeek(data.group, data.week, data.course);
        //groupMap.set(data.group, newGroup);
        groupMap.set((data.group + " " + data.week), newGroup);
        createGroupData(data);
    }

}

/*
 *   studentToGraph is a function that takes an entry, gets the information
 *   from it, and sends it to the buildHorizontalGraph function
 */
function studentToGraph(student) {

    var datac = new Array();
    
    var name, week, group;
    var x = 0;
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
        } else {
            //key = 'Other_issue' 'Happy/Joyful'
            var data = datasetMaker(key, value);

            datac.push(data);


        }

    });
    makeCanva(name + week);
    buildHorizontalGraph(datac, ['Emotions'], (name + " " + week), (name + week));
}

/*
 *   processData the function that is called by iteration of all the data.
 *   It takes a single entry and passes it on to other methods
 */

function processData(data, filter) {
    //Prints out individual entry graphs
    //studentToGraph(data);

    //Creates group data.
    if(filter == 'group' || 'set'){
        createGroupData(data);
        
    } 
    if(filter =='individuals'){
        //studentToGraph(data);
    }
    
}

/*
 *   getStudents is a function that is immediately called when the page loads.
 *   its job its to get the data from the web server and pass it on
 */
const getStudents = async (set, course) => {

    //fetching data from server
    const res = await fetch("http://localhost:8080/home/students/")
    const students = await res.json()
    


    //iterating over each entry
    Object.entries(students).forEach((student) => {
        //turning data into JSON objects
        studentData = JSON.parse(student[1]);
        
        //Not actually displaying the graphs!
        processData(studentData, set);

    });
    if(course == undefined){
        course = 'all';
    }
    if(set =='none'){
        displayGroups();
    }else if(set == 'group'){
        var sortedMap = new Map(sortMapNegative(set));
        displayGroupGraph(course, sortedMap);
        buildForm(groupMap, highestWeek);
        bookmarkEventListener(set);
    } else if(set == 'course'){
        
        var sortedMap = new Map(sortMapNegative(set));
        displayGroupGraph(course, sortedMap);
        buildForm(courseMap, highestWeek);
        bookmarkEventListener(set);
    }
    



}
function bookmarkEventListener(set){
    
    const graphs = document.querySelector('#new').children;
    for(var i = 0; i < graphs.length; i++){
        var currentMark, newMark;
        
        var infArr = graphs[i].id.split(" ");
        var id = infArr[0] + " " + infArr[1];

        var checkid = infArr[0] + " " + infArr[1] + " checkbox";
        

      
        if(set != 'course'){
            currentMark = groupMap.get(id).bookmarked;
            
            if(currentMark){
                //console.log("currentMark true");
                groupMap.get(id).bookmarkTrue();
                
                document.getElementById(checkid).checked = true;
            } else {
                //console.log("currentMark false");
                groupMap.get(id).bookmarkFalse();
                document.getElementById(checkid).checked = false;
            }

        } else if(set =='course'){
            currentMark = courseMap.get(id).bookmarked;
            if(currentMark){
                
                courseMap.get(id).bookmarkTrue();
                
                document.getElementById(checkid).checked = true;
            } else {
                
                courseMap.get(id).bookmarkFalse();
                document.getElementById(checkid).checked = false;
            }
            
        }


        var checkElm = document.getElementById(checkid);
        
        
        checkElm.addEventListener("click",bookmarkClick)
    }
}

const bookmarkClick = function (){
    
    var currentMark = this.checked;
    var infArr = this.id.split(" ");
    var id = infArr[0] + " " + infArr[1];
    var checkid = this.id;

    if(course == null){
        if(currentMark){
            
            courseMap.get(id).bookmarkTrue();
            document.getElementById(checkid).checked = true;
            
        } else {
            courseMap.get(id).bookmarkFalse();
            document.getElementById(checkid).checked = false;
            
        }  
    } else {
        //console.log(groupMap);
        if(course == groupMap.get(id).course){
           if(currentMark){
            //console.log("setting to true");
            groupMap.get(id).bookmarkTrue();
            document.getElementById(checkid).checked = true;
           } else {
            //console.log("setting to false");
            groupMap.get(id).bookmarkFalse();
            document.getElementById(checkid).checked = false;
           } 
        }
    }

}

/*
*   clearGraphs is a function that removes all canva elements
*   and creates a new empty div
*/
function clearGraphs(){
    document.querySelector('#new').remove();
    document.querySelector('#groupButtonDiv').remove();
    var newDiv = document.createElement("div");
    newDiv.setAttribute("id", "new");
    var newDiv2 = document.createElement("div");
    newDiv2.setAttribute("id", "groupButtonDiv");
    var parent = document.querySelector('main');
    parent.appendChild(newDiv);
    parent.appendChild(newDiv2);
}

function makeAside(id){
    
    var parentDiv = document.createElement("div");
    var emoDiv = document.createElement("div");
    var expDiv = document.createElement("div");
    var bookmarkDiv = document.createElement("div");
    bookmarkDiv.setAttribute("class", "bookmarkDiv");

    var checkbox = document.createElement("input");
    
    var span = document.createElement("span");
    span.setAttribute("class", "bookmark");
    span.setAttribute("id", id+ " bookmark");

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
    parentDiv.appendChild(bookmarkDiv);
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

function sortMapNegative(set){
   
    var unsortedArray;
    if(set == 'group'){
        unsortedArray = [...groupMap];
    } else if(set == 'course'){
        unsortedArray = [...courseMap];
    } else {
        unsortedArray = [...groupMap];
    }
    return unsortedArray.sort((a,b) => (a[1].getOverallNegative() < b[1].getOverallNegative()) ? 1 : -1);
}

function sortMapEmoNegative(set){
   
    var unsortedArray;
    if(set == 'group'){
        unsortedArray = [...groupMap];
    } else if(set == 'course'){
        unsortedArray = [...courseMap];
    } else {
        unsortedArray = [...groupMap];
    }
    return unsortedArray.sort((a,b) => (a[1].getEmoNegative() < b[1].getEmoNegative()) ? 1 : -1);
}

function sortMapExpNegative(set){
   
    var unsortedArray;
    if(set == 'group'){
        unsortedArray = [...groupMap];
    } else if(set == 'course'){
        unsortedArray = [...courseMap];
    } else {
        unsortedArray = [...groupMap];
    }
    return unsortedArray.sort((a,b) => (a[1].getExpNegative() < b[1].getExpNegative()) ? 1 : -1);
}


function sortMapPositive(set){
    console.log(set == 'course');
    var unsortedArray;
    if(set == 'group'){
        unsortedArray = [...groupMap];
    } else if(set == 'course'){
        unsortedArray = [...courseMap];
    } else {
        unsortedArray = [...groupMap];
    }
    return unsortedArray.sort((a,b) => (a[1].getOverallNegative() > b[1].getOverallNegative()) ? 1 : -1);
}


/*
 *   displayGroupGraph is a function that, when called
 *   will create graphs from the groupMap Map.
 */

function displayGroupGraph(course, sortedMap) {


    
    
    
    sortedMap.forEach((key, value) => {
        
        if(key.course == course || course == 'all'){
            var emotion_total = key.positiveEmotion + key.negativeEmotion + key.otherEmotion + key.neutralEmotion;
            var exp_total = key.positiveExp + key.negativeExp;
            var dataG = new Array();
            makeCanva(key.name);
            dataG.push(datasetMakerDuo("Positive", (key.positiveEmotion/emotion_total), (key.positiveExp/exp_total)));
            dataG.push(datasetMakerDuo("None_emotion", key.neutralEmotion/emotion_total));
            dataG.push(datasetMakerDuo("Negative", (key.negativeEmotion/emotion_total), (key.negativeExp/exp_total)));
            dataG.push(datasetMakerDuo("Other_emotion", key.otherEmotion/emotion_total));
            
            buildHorizontalGraph(dataG, ["Emotions", "Learning Experience"], key.name, key.name);
            
            var emoChange = document.getElementById(key.name + " emo change");
            
            var expChange = document.getElementById(key.name + " exp change");
            if(key.week > 1){
                
                
                var currentWeek = key.week;
                //console.log(key);
                var infArr = key.name.split(" ");
                var name = infArr[0]
                var prevWeek = name +" Week" +(currentWeek - 1);
                
                if(sortedMap.has(prevWeek)){
                    
                    var prev = sortedMap.get(prevWeek)

                    var prevEmoTotal = prev.positiveEmotion + prev.negativeEmotion + prev.otherEmotion + prev.neutralEmotion;
                    
                    var ChangeInEmo = (key.positiveEmotion/emotion_total)-(prev.positiveEmotion/prevEmoTotal);
                    

                    var prevExpTotal = prev.positiveExp + prev.negativeExp;
                    
                    var ChangeInExp = (key.positiveExp/exp_total)-(prev.positiveExp/prevExpTotal);
                    
                    

                    var em = Math.round(ChangeInEmo * 100 * 100)/100;
                    var ex = Math.round(ChangeInExp * 100 * 100)/100;
                    emoChange.textContent = em;
                    expChange.textContent = ex;
                    emoChange.textContent += "%";
                    expChange.textContent += "%";


                    
                   
                    if(em == 0){
                        var flatIcon = document.createElement("i");
                        flatIcon.setAttribute("class", "fa-solid fa-minus");
                        emoChange.appendChild(flatIcon);
                    } else if(em > 0){
                        var upArrow = document.createElement('i');
                        upArrow.setAttribute("class", "fa-solid fa-caret-up");
                        emoChange.appendChild(upArrow);
                    } else if (em < 0){
                        var downArrow = document.createElement("i");
                        downArrow.setAttribute("class", "fa-solid fa-caret-down");
                        var flatIcon = document.createElement("i");
                        flatIcon.setAttribute("class", "fa-solid fa-minus");
                        emoChange.appendChild(downArrow);
                    }
                    if(ex == 0){
                        var flatIcon = document.createElement("i");
                        flatIcon.setAttribute("class", "fa-solid fa-minus");
                        expChange.appendChild(flatIcon);
                    } else if(ex > 0){
                        var upArrow = document.createElement('i');
                        upArrow.setAttribute("class", "fa-solid fa-caret-up");
                        expChange.appendChild(upArrow);
                    } else if (ex < 0){
                        var downArrow = document.createElement("i");
                        downArrow.setAttribute("class", "fa-solid fa-caret-down");
                        expChange.appendChild(downArrow);
                    }
                    
                }
            }
        }
    });
}



function displayGroups(){
    
    var sillyGroup = new Map();
    
    groupMap.forEach((key, value) =>{
        sillyGroup.set(key.course, key.course);
    });
    
    sillyGroup.forEach((key, value) => {
        
        var groupButton = document.createElement('a');
        var element = document.querySelector('#groupButtonDiv');
        groupButton.setAttribute("class", "groupButton");
        groupButton.setAttribute("id", key);
        //var link = '/home/:'+ key;
        
        groupButton.setAttribute("href", "papers/"+key);
        groupButton.textContent = key;
        
        element.appendChild(groupButton);
        //var parent = document.querySelector('main');
        //parent.appendChild(element);
        
    });
}
function getIndividuals(){
    clearGraphs();
    getStudents('individuals');
}
function getGroups(){
    
    clearGraphs();
    getStudents('group');
    
}

function buildForm(map, highestWeek){
    var courseTitle = document.getElementById("courseTitle");
    var week = parseInt(highestWeek);
    var groupSet = new Set()
    if(courseTitle != null){
        week = 0;
        map.forEach((key)=>{
            if(key.course == courseTitle.textContent){
                
                if(key.week > week){
                    week = key.week;
                }
            }
        }); 
        week = parseInt(week);
    }
    
    
    
    for(var i = 1; i < week + 1 ; i++){
        
        var option = document.createElement("option");
        option.setAttribute("value", ("week"+i));
        option.textContent = "Week " + i;
        var element = document.getElementById('weekSelector');
        element.appendChild(option);
    }
    
    map.forEach((key)=>{
        if(courseTitle != null){
            if(key.course == courseTitle.textContent){
                groupSet.add(key.group);
            }
        } else {
            var group = key.name.split(" ")[0]
            groupSet.add(group);
        }
        
    });
    
    groupSet.forEach((value) =>{
        var option = document.createElement("option");
        option.setAttribute("value", value);
        option.textContent = value;
        var element = document.getElementById('groupSelector');
        element.appendChild(option);
    });
}

function loadCourseButtons(){
    getStudents('none');
}

function loadCourses(){
    getStudents('course');

}

function loadGroup(course){
    getStudents('group', course);
    
}

function testMethod(){
    
}

//getStudents('group');

//var set = 'group';
//getStudents(set);
