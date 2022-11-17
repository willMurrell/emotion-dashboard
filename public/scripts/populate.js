/*
 *   emotionColours is a map that containst the emotions and the colour associated with it
 */
const emotionColours = new Map();

emotionColours.set("Positive", "#008000");
emotionColours.set("Happy/Joyful", "#008000");
emotionColours.set("Engaged", "#118C11");
emotionColours.set("Curious/Interested", "#1F991F");
emotionColours.set("Suprised", "#1F991F");
emotionColours.set("Confident", "#32A632");
emotionColours.set("Hopeful", "#47B347");
emotionColours.set("Proud", "#60BF60");
emotionColours.set("Empathy", "#7ACC7A");

emotionColours.set("Negative", "#A50104");
emotionColours.set("Confused", "#A50104");
emotionColours.set("Frustrated", "#B81702");
emotionColours.set("Angry", "#EC3F13");
emotionColours.set("Worry", "#FA5E1F");
emotionColours.set("Anxious", "#FF7E33");
emotionColours.set("Fearful", "#FF931F");
emotionColours.set("Sad", "#FFAD33");
emotionColours.set("Bored", "#FFB950");
emotionColours.set("Hopeless", "#7A0103");
emotionColours.set("Exhausted/Tired", "#8E0103");
emotionColours.set("Shamed/Apologetic", "#db6612");

emotionColours.set("Other_emotion", "##a1a1a1");

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

/*
 *   groupMap is a map that contains each Group from the data, and the number of positive
 *   negative and other emotions
 */

var groupMap = new Map();

/*
 *   Group is a class that takes name as a constructor
 *
 *   addToPositive / Negative / Other are setters that allow
 *   the total number in each value to be increased
 */

class Group {
    constructor(name) {
        this.name = name;
        this.negative = 0;
        this.positive = 0;
        this.other = 0;
    }
    addToPositive(percent) {
        this.positive += percent;
    }
    addToNegative(percent) {
        this.negative += percent;
    }
    addToOther(percent) {
        this.other += percent;
    }
}

/*
 *   buildHorizontalGraph is a function that takes a dataset, an array of labels
 *   a title and the HTML element id and creates a horizontal bar graph
 *   in that location by using Chartly
 */
function buildHorizontalGraph(datac, labels, title, id) {
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
                    borderWidth: 2,
                }
            },
            responsive: false,
            plugins: {
                legend: {
                    position: 'right',
                },
                title: {
                    display: true,
                    font: {
                        size: 20,
                        weight: 'bold',
                        lineHeight: 1.2,
                    },
                    text: title,

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
            }
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
        data: [value]
    };
    return obj;

}

/*
 *  createGroupData is function that is passed each entry and
 *  adds the positive, negative and other emotions to the
 *  group map.
 */

function createGroupData(data) {

    if (groupMap.has(data.group)) {

        Object.entries(data).forEach((entry) => {

            if (positiveEmotions.includes(entry[0])) {
                groupMap.get(data.group).addToPositive(entry[1])

            } else if (negativeEmotions.includes(entry[0])) {
                groupMap.get(data.group).addToNegative(entry[1])

            } else if (entry[0] == "Other_emotion") {

                groupMap.get(data.group).addToOther(entry[1])
            }
        });

    } else {
        var newGroup = new Group(data.group);
        groupMap.set(data.group, newGroup);
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
    createGroupData(data);
}

/*
 *   getStudents is a function that is immediately called when the page loads.
 *   its job its to get the data from the web server and pass it on
 */
const getStudents = async () => {

    //fetching data from server
    const res = await fetch("http://localhost:8080/home/students/")
    const students = await res.json()




    //iterating over each entry
    Object.entries(students).forEach((student) => {
        //turning data into JSON objects
        studentData = JSON.parse(student[1]);



        //Not actually displaying the graphs!
        processData(studentData, null);

    });
    displayGroupGraph();



}

/*
 *   makeCanva is a function that creates a canva HTML element
 *   it takes an id to be used to identify it.
 */
function makeCanva(id) {
    var newCanva = document.createElement("canvas");
    newCanva.setAttribute("id", id)
    var element = document.getElementById("new");
    element.appendChild(newCanva);

}

/*
 *   displayGroupGraph is a function that, when called
 *   will create graphs from the groupMap Map.
 */

function displayGroupGraph() {
    groupMap.forEach((key, value) => {
        console.log(key.name);
        var dataG = new Array();
        makeCanva(key.name);
        dataG.push(datasetMaker("Positive", key.positive));
        console.log("Pushing " + key.positive + " to " + key.name);
        dataG.push(datasetMaker("Negative", key.negative));
        dataG.push(datasetMaker("Other_emotion", key.other));
        buildHorizontalGraph(dataG, ["Emotions"], key.name, key.name);
    });

}

getStudents();