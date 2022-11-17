const emotionColours = new Map();
emotionColours.set("Happy/Joyful", "#008000");
emotionColours.set("Engaged", "#118C11");
emotionColours.set("Curious/Interested", "#1F991F");
emotionColours.set("Suprised", "#1F991F");
emotionColours.set("Confident", "#32A632");
emotionColours.set("Hopeful", "#47B347");
emotionColours.set("Proud", "#60BF60");
emotionColours.set("Empathy", "#7ACC7A");

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
    const negativeEmotions = new Array (
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
var groupMap = new Map();

class Group{
    constructor(name){
        this.name = name;
        this.negative = 0;
        this.positive = 0;
        this.other = 0;
    }
    addToPositive(percent){
        this.positive += percent;
    }
    addToNegative(percent){
        this.negative += percent;
    }
    addToOther(percent){
        this.other += percent;
    }
}

function studentToGraph(student) {
    // console.log(student);
    // for(var[key, value] in Object.entries(student)){
    //     console.log(key);
    // }
    //console.log(student);
    
    var datac = new Array();

    var name, week,group;
    var x = 0;
    Object.entries(student).forEach((entry) => {
        const [key, value] = entry;

        if (x == 0) {
            name = value;
            x++;
        } else if(x == 1){
            group = value;
            x++;
        } else if(x == 2){
            week = value;
            x++;
        } else {
            //console.log(`${key}: ${value}`);
            var data = datasetMaker(key, value);
            //console.log(data);
            datac.push(data);
            //console.log(datac);
        }

    });

    const labels = [
        'Emotion',

    ];

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
                    text: name + " " + week,

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
    //console.log(name+week);
    const myChart1 = new Chart(
        document.getElementById(name+week),
        config
    );
}

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

function groupGraphGenerator(data){
    //console.log(data.group);
    if(groupMap.has(data.group)){
        //console.log(data);
        Object.entries(data).forEach((entry) => {
            //console.log(entry[1])
            if(positiveEmotions.includes(entry[0])){
                groupMap.get(data.group).addToPositive(entry[1])
                //console.log("yeah baby");
            } else if(negativeEmotions.includes(entry[0])){
                groupMap.get(data.group).addToNegative(entry[1])
                //console.log("no baby");
            } else if(entry[0] == "Other_emotion"){
                //console.log("!!!!!! OTHER OMG OTHER !!!!!");
                groupMap.get(data.group).addToOther(entry[1])
            }
        });
        
    } else {
        var newGroup = new Group(data.group);
        groupMap.set(data.group, newGroup);
    }
    console.log(groupMap.get(data.group));
    
}

function displayGraphs(data, filter){
    studentToGraph(data);
    groupGraphGenerator(data);
    
}

const getStudents = async () => {
    const res = await fetch("http://localhost:8080/home/students/")
    const students = await res.json()

    //console.log(students);

    

    Object.entries(students).forEach((student) => {
        studentData = JSON.parse(student[1]);
        
        var newCanva = document.createElement("canvas");
        
        newCanva.setAttribute("id", studentData.name+studentData.week)

        var element = document.getElementById("new");
        element.appendChild(newCanva);

        displayGraphs(studentData, null);


        
        
    });

}

getStudents();