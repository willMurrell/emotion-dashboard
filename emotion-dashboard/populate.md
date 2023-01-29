## Classes

<dl>
<dt><a href="#CoursePerWeek">CoursePerWeek</a></dt>
<dd><p>coursePerWeek is a class that takes course and week as a constructor</p>
<p>  addToPositive / Negative / Other are setters that allow
  the total number in each value to be increased</p>
</dd>
<dt><a href="#Student">Student</a></dt>
<dd><p>Student is a class that takes name, group, course and week as a constructor</p>
<p>  addToPositive / Negative / Other are setters that allow
  the total number in each value to be increased</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#buildHorizontalGraph">buildHorizontalGraph(datac, labels, title, id)</a></dt>
<dd><p>buildHorizontalGraph is a function that takes a dataset, an array of labels
  a title and the HTML element id and creates a horizontal bar graph
  in that location by using Chartly</p>
</dd>
<dt><a href="#datasetMakerDuo">datasetMakerDuo(key, emotion_value, exp_value)</a> ⇒</dt>
<dd><p>datasetMakerDuo is a function that takes a key (the name if the value)
  and 2 values (emotion and learning experience) and creates a Chartly dataset for a graph</p>
</dd>
<dt><a href="#createGroupData">createGroupData(data)</a></dt>
<dd><p>createGroupData is function that is passed each entry and
 adds the positive, negative and other emotions to the
 group map.</p>
<p> This is where the groupMap, courseMap and studentsEntryPerGroup
 map are created.</p>
</dd>
<dt><a href="#createIndividualData">createIndividualData(student)</a></dt>
<dd><p>createIndividualData is a function that takes an entry and adds that information
  to the correlating Student object</p>
</dd>
<dt><a href="#processData">processData(data, filter)</a></dt>
<dd><p>processData the function that is called by iteration of all the data.
  It takes a single entry and passes it on to other methods</p>
</dd>
<dt><a href="#getComments">getComments()</a></dt>
<dd><p>getComments is a function that gets the comment data from the webserver</p>
<p>It also then passes the data to the displayComments function</p>
</dd>
<dt><a href="#displayComments">displayComments(comments)</a></dt>
<dd><p>displayComments is a function that check if there is a comment for the current page, and display it if so</p>
</dd>
<dt><a href="#sendCommentToServer">sendCommentToServer(comment, group, name)</a></dt>
<dd><p>sendCommentToServer makes an object from the parameters and sends it to the webserver</p>
</dd>
<dt><a href="#getSpecificStudent">getSpecificStudent(name, page, course)</a></dt>
<dd><p>getSpecificStudent is a function that gets data from the webserver and passes it to the correct methods and such</p>
</dd>
<dt><a href="#sentenceEventListeners">sentenceEventListeners(present, firstTime)</a></dt>
<dd><p>sentenceEventListener is a function that brutally, and unapologetically rips eventListeners from
the sentences in the student blog page</p>
</dd>
<dt><a href="#removeTeacherParts">removeTeacherParts()</a></dt>
<dd><p>removeTeacherParts DOES NOT REMOVE BODY PIECES FROM YOUR TEACHER</p>
<p>It will hide some of the extra jazz that is for teachers only.
Is this an super lazy way of reusing the teacher code? Yep!
Does it work? Absolutely!!</p>
</dd>
<dt><a href="#elementKiller">elementKiller(id)</a></dt>
<dd><p>despite the name, elementKiller doesn&#39;t actually kill any elements.  It did at first but was changed just to hide 
them :(</p>
</dd>
<dt><a href="#showOverlay">showOverlay(show)</a></dt>
<dd><p>showOverlay is a function that toggles between displaying the teacher view and the student view</p>
<p>probably...</p>
</dd>
<dt><a href="#displayStudentCourses">displayStudentCourses(map, name)</a></dt>
<dd><p>displayStudentCourses is a function that displays the elements created in the createCoursesDiv</p>
<p>A fraud of a method that should feel bad for stealing all the fame from createCoursesDiv</p>
</dd>
<dt><a href="#getStudentsBlog">getStudentsBlog(name, page)</a></dt>
<dd><p>getStudentsBlog is an async function that takes a name and a page in its parameters and the does
absolutely nothing with it! There is nothing in this method! I should just delete it!!!</p>
</dd>
<dt><a href="#createCourseDiv">createCourseDiv(value, key, name)</a> ⇒</dt>
<dd><p>createCourseDiv is the real powerhouse of the creating-and-displaying-the-course-and-team-that-each-student-belong-to</p>
<p>it builds the html elements and inserts the data into into it</p>
</dd>
<dt><a href="#getStudents">getStudents(set, course)</a></dt>
<dd><p>getStudents is a function that is immediately called when the page loads.
  Its job is to get the data from the web server and pass it on</p>
<p>  It also calls the required methods for the page that called it</p>
<p>  THIS IS WHERE THE FUN BEGINS !!!
  It is painfully obvious that this was one of the first methods I wrote and never decided
  to change or update it.  It sucks!! I mean, just look at those parameters...</p>
</dd>
<dt><a href="#buildTrendGraph">buildTrendGraph(data, id)</a></dt>
<dd><p>buildTrendGraph takes a dataset and an id and builds and displays the chart</p>
</dd>
<dt><a href="#getTrendData">getTrendData(positiveArray, negativeArray, neutralArray)</a></dt>
<dd><p>getTrendData takes a positive, negative and neutral emotion/experience array and returns a dataset
  for a Chartly.js chart</p>
</dd>
<dt><a href="#processIndividuals">processIndividuals(set, course)</a></dt>
<dd><p>processIndividuals is a function that is immediately called when the page loads.
  Its job is to get the data from the web server and pass it on</p>
<p>  It also calls the required methods for the page that called it</p>
</dd>
<dt><a href="#addMissingWeeks">addMissingWeeks(arg)</a></dt>
<dd><p>addMissingWeeks is a fucntion that finds the highest week and fills in empty
entries.</p>
</dd>
<dt><a href="#displayReports">displayReports(data)</a></dt>
<dd><p>displayReports is a function calls passes on data only if it is required</p>
</dd>
<dt><a href="#studentDisplayReports">studentDisplayReports(data)</a></dt>
<dd><p>studentDisplayReports in an in-between function that calls the buildReportHTML on the correct things</p>
</dd>
<dt><a href="#buildReportHTML">buildReportHTML(data, week)</a></dt>
<dd><p>buildReportHTML is a function builds and displays all the sentences of an entry</p>
</dd>
<dt><a href="#addFilterDropDown">addFilterDropDown(week, posEmoMap, negEmoMap, posExpMap, negExpMap)</a></dt>
<dd><p>addFilterDropDown is a function that adds the emotions and experiences for each week to the report
 It will hide all of them but week 1&#39;s emotions</p>
</dd>
<dt><a href="#optionClick">optionClick(event)</a></dt>
<dd><p>optionClick is an event listener that will trigger each time a new <option> is selected
  It changes the values of the sentences depending on whether they are being selected or not</p>
</dd>
<dt><a href="#addToMap">addToMap(value, map)</a></dt>
<dd><p>addToMap takes a value and a map and increments the value associated with it</p>
</dd>
<dt><a href="#buildBarGraphs">buildBarGraphs(week, posEmoMap, negEmoMap, posExpMap, negExpMap)</a></dt>
<dd><p>buildBarGraphs will build and display the trend graphs</p>
</dd>
<dt><a href="#getBarGraphDatasets">getBarGraphDatasets(week, posEmoMap, negEmoMap, posExpMap, negExpMap)</a></dt>
<dd><p>getBarGraphDatasets takes the positive/negative emotion/learning experience maps and returns the datasets
  for the Chartly.js charts</p>
</dd>
<dt><a href="#radioCheck">radioCheck(event)</a></dt>
<dd><p>radioCheck is the method called by the event listener when the emotion/learning experience radio is selected
  It will change the highlighted sentence and the graph to the learning experience or emotion version</p>
</dd>
<dt><a href="#clearSelectedElements">clearSelectedElements()</a></dt>
<dd><p>clearSelectedElements removes the attribute &quot;selected&quot; from all elements
  This makes it easier to not accidentally have multiple sentences selected at once</p>
</dd>
<dt><a href="#commentDoubleClick">commentDoubleClick(event)</a></dt>
<dd><p>commentDoubleClick is the method called by the event listener when a comment is double clicked
  It will open up the functionality for editing and deleting the comment</p>
</dd>
<dt><a href="#commentClick">commentClick(event)</a></dt>
<dd><p>commentClick is the function called by the event listener when a comment is clicked on
It will highlight the relevant sentence, display the new comment section if needed
and scroll so the sentence is in view</p>
</dd>
<dt><a href="#previousWeek">previousWeek(id)</a></dt>
<dd><p>previousWeek is a function called by the the &quot;back&quot; button on the individual students page
it hides the current entry and displays the previous one</p>
</dd>
<dt><a href="#nextWeek">nextWeek(id)</a></dt>
<dd><p>nextWeek is a function called by the the &quot;next&quot; button on the individual students page
it hides the current entry and displays the next one</p>
</dd>
<dt><a href="#hideEmotionHover">hideEmotionHover(event)</a></dt>
<dd><p>hideEmotionHover is an event listener that hides the moving emotion overlay</p>
</dd>
<dt><a href="#emotionHover">emotionHover(event)</a></dt>
<dd><p>emotionHover is an event listener that displays the cursor following emotion overlay</p>
</dd>
<dt><a href="#sentenceClick">sentenceClick(event)</a></dt>
<dd><p>sentenceClick is an event listener is used to select a sentence to add a comment to it</p>
</dd>
<dt><a href="#saveComment">saveComment(arg)</a></dt>
<dd><p>saveComment is a function that will take what is in the text entry element and
 set the sentence&#39;s comment attribute to it.</p>
</dd>
<dt><a href="#addComment">addComment()</a></dt>
<dd><p>addComment is a method called by the add comment button on the &#39;student&#39; page
  It will make a comment entry from the text in the text area</p>
</dd>
<dt><a href="#fillInMissingWeeks">fillInMissingWeeks(map, set)</a> ⇒</dt>
<dd><p>fillInMissingWeeks is a function used to find missing entries</p>
</dd>
<dt><a href="#bookmarkEventListener">bookmarkEventListener(set)</a></dt>
<dd><p>bookmarkEventListener isn&#39;t an event listener... nice!
This function actual sees if an object should be bookmarked,
bookmarks it if so, then adds an event listener to the bookmark button</p>
</dd>
<dt><a href="#bookmarkClick">bookmarkClick()</a></dt>
<dd><p>bookmarkClick is actually an event listener. Updates object and page when a bookmark is clicked</p>
</dd>
<dt><a href="#clearGraphs">clearGraphs()</a></dt>
<dd><p>clearGraphs is a function that removes all canva elements
  and creates a new empty div</p>
</dd>
<dt><a href="#makeAside">makeAside(id)</a></dt>
<dd><p>makeAside is a function that builds the area to the right of the graphs.
This contains information like % change and number of students</p>
</dd>
<dt><a href="#makeCanva">makeCanva(id)</a></dt>
<dd><p>makeCanva is a function that creates a canva HTML element
  it takes an id to be used to identify it.</p>
</dd>
<dt><a href="#sortMapNegative">sortMapNegative(set)</a></dt>
<dd><p>sortMapNegative is a function that returns the correct map, sorted by the most negative first</p>
</dd>
<dt><a href="#sortMapEmoNegative">sortMapEmoNegative(set)</a></dt>
<dd><p>sortMapEmoNegative is a function that returns the correct map, sorted by the most negative emotiond first</p>
</dd>
<dt><a href="#sortMapExpNegative">sortMapExpNegative(set)</a></dt>
<dd><p>sortMapExpNegative is a function that returns the correct map, sorted by the most negative
learning experience first.</p>
</dd>
<dt><a href="#sortMapPositive">sortMapPositive(set)</a></dt>
<dd><p>sortMapPositive is a function that returns the correct map, sorted by the most positive</p>
</dd>
<dt><a href="#sortMapMostRecent">sortMapMostRecent(set)</a></dt>
<dd><p>sortMapMostRecent is a function that returns the correct map, sorted by the most recent week</p>
</dd>
<dt><a href="#sortMapLeastRecent">sortMapLeastRecent(set)</a></dt>
<dd><p>sortMapLeastRecent is a function that returns the correct map, sorted by the least recent week</p>
</dd>
<dt><a href="#displayIndividualGraphs">displayIndividualGraphs(group, map, deadMaps)</a></dt>
<dd><p>displayIndividualGraphs is a function that will create and display the graphs of individual students</p>
</dd>
<dt><a href="#displayAside">displayAside(key)</a></dt>
<dd><p>displayAside adds the information to the aside to the right of the graphs</p>
</dd>
<dt><a href="#addFormEventListeners">addFormEventListeners()</a></dt>
<dd><p>addFormEventListeners adds event listeners to the filter form, duh.</p>
</dd>
<dt><a href="#submitForm">submitForm()</a></dt>
<dd><p>submitForm is my favourite method. Originally I had a button you had to press to implement the filter,
but this was changed so it was automatic.  this was done by just hiding the button and making the eventListeners
press this invisible button!!</p>
</dd>
<dt><a href="#displayGroupGraph">displayGroupGraph(course, sortedMap, deadMaps)</a></dt>
<dd><p>displayGroupGraph is a function that, when called
  will create graphs from the map passed to it</p>
<p>It also adds information to the aside</p>
</dd>
<dt><a href="#averageArrays">averageArrays(positive, negative, neutral)</a> ⇒</dt>
<dd><p>averageArrays takes 3 arrays and averages each week of them.  With themselves, not with the other weeks</p>
</dd>
<dt><a href="#getTotal">getTotal(positive, negative, neutral, week)</a> ⇒</dt>
<dd><p>getTotal returns the sum of this weeks values across the tree arrays</p>
</dd>
<dt><a href="#addCurrentWeekData">addCurrentWeekData(key, array, type)</a> ⇒</dt>
<dd><p>I genuinely am looking at this method and have no clue what it does!</p>
</dd>
<dt><a href="#displayGroups">displayGroups()</a></dt>
<dd><p>displayGroups is a function that adds buttons that take you into their course/group</p>
</dd>
<dt><a href="#displayStudents">displayStudents(group)</a></dt>
<dd><p>displayStudents is a function that adds buttons that take you into their individual page</p>
</dd>
<dt><a href="#getIndividuals">getIndividuals()</a></dt>
<dd><p>getIndividuals is a function called by the html page</p>
</dd>
<dt><a href="#getGroups">getGroups()</a></dt>
<dd><p>getGroups is a function called by the html page</p>
</dd>
<dt><a href="#buildForm">buildForm(map, highestWeek, set)</a></dt>
<dd><p>buildForm add the values to the filter form</p>
</dd>
<dt><a href="#loadCourseButtons">loadCourseButtons()</a></dt>
<dd><p>loadCourseButtons is a function that just loads buttons to the courses</p>
</dd>
<dt><a href="#loadStudentCourses">loadStudentCourses(name, page)</a></dt>
<dd><p>loadStudentCourses is called from the script in the pug file
  it calls the getSpecificStudent method with the correct parameters!</p>
<p>  Who came up with these names??</p>
</dd>
<dt><a href="#loadBlog">loadBlog(name, course)</a></dt>
<dd><p>loadBlog is called from the script in the pug file
it also just calls the getSpecificStudent method with the correct parameters!</p>
</dd>
<dt><a href="#loadGroup">loadGroup(course)</a></dt>
<dd><p>loadGroup is a function that calls getStudents with group parameters and the pages course</p>
</dd>
<dt><a href="#loadIndividuals">loadIndividuals(group)</a></dt>
<dd><p>loadIndividuals is a function that calls getStudents with individual parameters and the group</p>
</dd>
<dt><a href="#submitDraftBlog">submitDraftBlog(name, course)</a></dt>
<dd><p>submitDraftBlog is called by the submit draft blog button (unsurprisingly!)
and is set up to take the data from the blog and uh... do something with it</p>
</dd>
<dt><a href="#submitBlog">submitBlog(name, course)</a></dt>
<dd><p>submitBlog is called by the submit blog button 
and should probably do something helpful</p>
</dd>
<dt><a href="#getBlogData">getBlogData()</a> ⇒</dt>
<dd><p>getBlogData is a method that creates an object from the users submitted blog</p>
</dd>
<dt><a href="#getNewWeek">getNewWeek()</a> ⇒</dt>
<dd><p>finds out which week is next</p>
</dd>
<dt><a href="#loadDraftBlog">loadDraftBlog(student, course, week)</a></dt>
<dd><p>loadDraftBlog is unfinished, but should load the users draft into the page to be finished/edited</p>
</dd>
<dt><a href="#draftButton">draftButton(draft)</a></dt>
<dd><p>draftButton switches between which button is shown</p>
</dd>
<dt><a href="#eventPath">eventPath(evt)</a> ⇒</dt>
<dd><p>Function graciously stolen from <a href="https://stackoverflow.com/questions/39245488/event-path-is-undefined-running-in-firefox">https://stackoverflow.com/questions/39245488/event-path-is-undefined-running-in-firefox</a></p>
<p>Thank you Guido Bouman!!!</p>
</dd>
</dl>

<a name="CoursePerWeek"></a>

## CoursePerWeek
coursePerWeek is a class that takes course and week as a constructor

  addToPositive / Negative / Other are setters that allow
  the total number in each value to be increased

**Kind**: global class  
<a name="Student"></a>

## Student
Student is a class that takes name, group, course and week as a constructor


  addToPositive / Negative / Other are setters that allow
  the total number in each value to be increased

**Kind**: global class  
<a name="buildHorizontalGraph"></a>

## buildHorizontalGraph(datac, labels, title, id)
buildHorizontalGraph is a function that takes a dataset, an array of labels
  a title and the HTML element id and creates a horizontal bar graph
  in that location by using Chartly

**Kind**: global function  

| Param | Description |
| --- | --- |
| datac | an array of datasets |
| labels | an array of the titles of the bars |
| title | is the title of the graph |
| id | is the ID used |

<a name="datasetMakerDuo"></a>

## datasetMakerDuo(key, emotion_value, exp_value) ⇒
datasetMakerDuo is a function that takes a key (the name if the value)
  and 2 values (emotion and learning experience) and creates a Chartly dataset for a graph

**Kind**: global function  
**Returns**: obj an object containing label, colour and data  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | is the type of data e.g. "Positive" or "Negative" or "Other" |
| emotion_value |  | is the value going into the Emotion bar |
| exp_value |  | is the value going into the Experience bar |

<a name="createGroupData"></a>

## createGroupData(data)
createGroupData is function that is passed each entry and
 adds the positive, negative and other emotions to the
 group map.

 This is where the groupMap, courseMap and studentsEntryPerGroup
 map are created.

**Kind**: global function  

| Param | Description |
| --- | --- |
| data | is an entry from the raw (no sauce?) data from the webserver |

<a name="createIndividualData"></a>

## createIndividualData(student)
createIndividualData is a function that takes an entry and adds that information
  to the correlating Student object

**Kind**: global function  

| Param | Description |
| --- | --- |
| student | is an entry from the data from the webserver |

<a name="processData"></a>

## processData(data, filter)
processData the function that is called by iteration of all the data.
  It takes a single entry and passes it on to other methods

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| data |  | an entry of the data from the webserver |
| filter | <code>String</code> | is a variable used to distinguish between loading the course/team or individual pages |

<a name="getComments"></a>

## getComments()
getComments is a function that gets the comment data from the webserver

It also then passes the data to the displayComments function

**Kind**: global function  
<a name="displayComments"></a>

## displayComments(comments)
displayComments is a function that check if there is a comment for the current page, and display it if so

**Kind**: global function  

| Param | Description |
| --- | --- |
| comments | is the json data with all the comments |

<a name="sendCommentToServer"></a>

## sendCommentToServer(comment, group, name)
sendCommentToServer makes an object from the parameters and sends it to the webserver

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| comment | <code>String</code> | the comment submitted |
| group | <code>String</code> | the name of the course the comment is from |
| name | <code>String</code> | the name of the student (if required) |

<a name="getSpecificStudent"></a>

## getSpecificStudent(name, page, course)
getSpecificStudent is a function that gets data from the webserver and passes it to the correct methods and such

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | is the name of the student that the data is required for |
| page | <code>String</code> | tells the function what page it is on and therefore which methods to run |
| course | <code>String</code> | is the name of the course that the student is in |

<a name="sentenceEventListeners"></a>

## sentenceEventListeners(present, firstTime)
sentenceEventListener is a function that brutally, and unapologetically rips eventListeners from
the sentences in the student blog page

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| present | <code>Boolean</code> | might do something... idk |
| firstTime | <code>Boolean</code> | first time? remove "click" event listeners if true |

<a name="removeTeacherParts"></a>

## removeTeacherParts()
removeTeacherParts DOES NOT REMOVE BODY PIECES FROM YOUR TEACHER

It will hide some of the extra jazz that is for teachers only.
Is this an super lazy way of reusing the teacher code? Yep!
Does it work? Absolutely!!

**Kind**: global function  
<a name="elementKiller"></a>

## elementKiller(id)
despite the name, elementKiller doesn't actually kill any elements.  It did at first but was changed just to hide 
them :(

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the html id attribute of the soon-to-be-killed element |

<a name="showOverlay"></a>

## showOverlay(show)
showOverlay is a function that toggles between displaying the teacher view and the student view

probably...

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| show | <code>Boolean</code> | this variable just toggles whether it is hiding or showing the elements |

<a name="displayStudentCourses"></a>

## displayStudentCourses(map, name)
displayStudentCourses is a function that displays the elements created in the createCoursesDiv

A fraud of a method that should feel bad for stealing all the fame from createCoursesDiv

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| map | <code>Map</code> | map map map map map map map map its the map to be used! |
| name | <code>\*</code> | is the name of the student... as it has been in all of these methods!! |

<a name="getStudentsBlog"></a>

## getStudentsBlog(name, page)
getStudentsBlog is an async function that takes a name and a page in its parameters and the does
absolutely nothing with it! There is nothing in this method! I should just delete it!!!

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | the name of the student ig |
| page | <code>String</code> | The page |

<a name="createCourseDiv"></a>

## createCourseDiv(value, key, name) ⇒
createCourseDiv is the real powerhouse of the creating-and-displaying-the-course-and-team-that-each-student-belong-to

it builds the html elements and inserts the data into into it

**Kind**: global function  
**Returns**: an html div containing all of your hopes, dreams and aspirations  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | is the group/team name |
| key | <code>\*</code> | is the course name |
| name | <code>\*</code> | IS THE NAME OF THE STUDENT LIKE IT ALWAYS HAS AND ALWAYS WILL BE |

<a name="getStudents"></a>

## getStudents(set, course)
getStudents is a function that is immediately called when the page loads.
  Its job is to get the data from the web server and pass it on

  It also calls the required methods for the page that called it

  THIS IS WHERE THE FUN BEGINS !!!
  It is painfully obvious that this was one of the first methods I wrote and never decided
  to change or update it.  It sucks!! I mean, just look at those parameters...

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| set | <code>String</code> | a variable saying where its individual/group/course |
| course | <code>String</code> | the course being loaded |

<a name="buildTrendGraph"></a>

## buildTrendGraph(data, id)
buildTrendGraph takes a dataset and an id and builds and displays the chart

**Kind**: global function  

| Param | Description |
| --- | --- |
| data | data data data data dataa data |
| id | id id id id id id id id id id id |

<a name="getTrendData"></a>

## getTrendData(positiveArray, negativeArray, neutralArray)
getTrendData takes a positive, negative and neutral emotion/experience array and returns a dataset
  for a Chartly.js chart

**Kind**: global function  

| Param | Description |
| --- | --- |
| positiveArray | an array containing all the positive values |
| negativeArray | an array containing all the negative values |
| neutralArray | I bet you can't guess what this one does!! |

<a name="processIndividuals"></a>

## processIndividuals(set, course)
processIndividuals is a function that is immediately called when the page loads.
  Its job is to get the data from the web server and pass it on

  It also calls the required methods for the page that called it

**Kind**: global function  

| Param | Description |
| --- | --- |
| set | Hi, whats up? |
| course | these parameters arn't used and should really be merk'd |

<a name="addMissingWeeks"></a>

## addMissingWeeks(arg)
addMissingWeeks is a fucntion that finds the highest week and fills in empty
entries.

**Kind**: global function  

| Param | Description |
| --- | --- |
| arg | the thing that your parents do while you are just trying to sleep! Nah jk! it does something, I just don't know what it is! |

<a name="displayReports"></a>

## displayReports(data)
displayReports is a function calls passes on data only if it is required

**Kind**: global function  

| Param | Description |
| --- | --- |
| data | student data probably ig |

<a name="studentDisplayReports"></a>

## studentDisplayReports(data)
studentDisplayReports in an in-between function that calls the buildReportHTML on the correct things

**Kind**: global function  

| Param | Description |
| --- | --- |
| data | is just some data I don't know |

<a name="buildReportHTML"></a>

## buildReportHTML(data, week)
buildReportHTML is a function builds and displays all the sentences of an entry

**Kind**: global function  

| Param | Description |
| --- | --- |
| data | data data data data data |
| week | the week it is for! |

<a name="addFilterDropDown"></a>

## addFilterDropDown(week, posEmoMap, negEmoMap, posExpMap, negExpMap)
addFilterDropDown is a function that adds the emotions and experiences for each week to the report
 It will hide all of them but week 1's emotions

**Kind**: global function  

| Param | Description |
| --- | --- |
| week | which week blog this is for |
| posEmoMap | map with the values present in this weeks blog |
| negEmoMap | map with the values present in this weeks blog |
| posExpMap | map with the values present in this weeks blog |
| negExpMap | map with the values present in this weeks blog |

<a name="optionClick"></a>

## optionClick(event)
optionClick is an event listener that will trigger each time a new <option> is selected
  It changes the values of the sentences depending on whether they are being selected or not

**Kind**: global function  

| Param | Description |
| --- | --- |
| event | the event! |

<a name="addToMap"></a>

## addToMap(value, map)
addToMap takes a value and a map and increments the value associated with it

**Kind**: global function  

| Param | Description |
| --- | --- |
| value | the item in the map to be incremented |
| map | which map to add to |

<a name="buildBarGraphs"></a>

## buildBarGraphs(week, posEmoMap, negEmoMap, posExpMap, negExpMap)
buildBarGraphs will build and display the trend graphs

**Kind**: global function  

| Param | Description |
| --- | --- |
| week | which week blog this is for |
| posEmoMap | map with the values present in this weeks blog |
| negEmoMap | map with the values present in this weeks blog |
| posExpMap | map with the values present in this weeks blog |
| negExpMap | map with the values present in this weeks blog |

<a name="getBarGraphDatasets"></a>

## getBarGraphDatasets(week, posEmoMap, negEmoMap, posExpMap, negExpMap)
getBarGraphDatasets takes the positive/negative emotion/learning experience maps and returns the datasets
  for the Chartly.js charts

**Kind**: global function  

| Param | Description |
| --- | --- |
| week | which week blog this is for |
| posEmoMap | map with the values present in this weeks blog |
| negEmoMap | map with the values present in this weeks blog |
| posExpMap | map with the values present in this weeks blog |
| negExpMap | map with the values present in this weeks blog |

<a name="radioCheck"></a>

## radioCheck(event)
radioCheck is the method called by the event listener when the emotion/learning experience radio is selected
  It will change the highlighted sentence and the graph to the learning experience or emotion version

**Kind**: global function  

| Param | Description |
| --- | --- |
| event | its an event!! |

<a name="clearSelectedElements"></a>

## clearSelectedElements()
clearSelectedElements removes the attribute "selected" from all elements
  This makes it easier to not accidentally have multiple sentences selected at once

**Kind**: global function  
<a name="commentDoubleClick"></a>

## commentDoubleClick(event)
commentDoubleClick is the method called by the event listener when a comment is double clicked
  It will open up the functionality for editing and deleting the comment

**Kind**: global function  

| Param | Description |
| --- | --- |
| event | its an event!! |

<a name="commentClick"></a>

## commentClick(event)
commentClick is the function called by the event listener when a comment is clicked on
It will highlight the relevant sentence, display the new comment section if needed
and scroll so the sentence is in view

**Kind**: global function  

| Param | Description |
| --- | --- |
| event | its an event!! |

<a name="previousWeek"></a>

## previousWeek(id)
previousWeek is a function called by the the "back" button on the individual students page
it hides the current entry and displays the previous one

**Kind**: global function  

| Param | Description |
| --- | --- |
| id | id!!!! |

<a name="nextWeek"></a>

## nextWeek(id)
nextWeek is a function called by the the "next" button on the individual students page
it hides the current entry and displays the next one

**Kind**: global function  

| Param | Description |
| --- | --- |
| id | id!!!! |

<a name="hideEmotionHover"></a>

## hideEmotionHover(event)
hideEmotionHover is an event listener that hides the moving emotion overlay

**Kind**: global function  

| Param | Description |
| --- | --- |
| event | its an event!! |

<a name="emotionHover"></a>

## emotionHover(event)
emotionHover is an event listener that displays the cursor following emotion overlay

**Kind**: global function  

| Param | Description |
| --- | --- |
| event | its an event!! |

<a name="sentenceClick"></a>

## sentenceClick(event)
sentenceClick is an event listener is used to select a sentence to add a comment to it

**Kind**: global function  

| Param | Description |
| --- | --- |
| event | its an event!! |

<a name="saveComment"></a>

## saveComment(arg)
saveComment is a function that will take what is in the text entry element and
 set the sentence's comment attribute to it.

**Kind**: global function  

| Param | Description |
| --- | --- |
| arg | RAAAAWWWWWRRRRR |

<a name="addComment"></a>

## addComment()
addComment is a method called by the add comment button on the 'student' page
  It will make a comment entry from the text in the text area

**Kind**: global function  
<a name="fillInMissingWeeks"></a>

## fillInMissingWeeks(map, set) ⇒
fillInMissingWeeks is a function used to find missing entries

**Kind**: global function  
**Returns**: missingEntries an array of missing entries  

| Param | Description |
| --- | --- |
| map | the map to search in for missing values |
| set | individual/group/course |

<a name="bookmarkEventListener"></a>

## bookmarkEventListener(set)
bookmarkEventListener isn't an event listener... nice!
This function actual sees if an object should be bookmarked,
bookmarks it if so, then adds an event listener to the bookmark button

**Kind**: global function  

| Param | Description |
| --- | --- |
| set | individual/group/course |

<a name="bookmarkClick"></a>

## bookmarkClick()
bookmarkClick is actually an event listener. Updates object and page when a bookmark is clicked

**Kind**: global function  
<a name="clearGraphs"></a>

## clearGraphs()
clearGraphs is a function that removes all canva elements
  and creates a new empty div

**Kind**: global function  
<a name="makeAside"></a>

## makeAside(id)
makeAside is a function that builds the area to the right of the graphs.
This contains information like % change and number of students

**Kind**: global function  

| Param | Description |
| --- | --- |
| id | id!! |

<a name="makeCanva"></a>

## makeCanva(id)
makeCanva is a function that creates a canva HTML element
  it takes an id to be used to identify it.

**Kind**: global function  

| Param | Description |
| --- | --- |
| id | id!! |

<a name="sortMapNegative"></a>

## sortMapNegative(set)
sortMapNegative is a function that returns the correct map, sorted by the most negative first

**Kind**: global function  

| Param | Description |
| --- | --- |
| set | individual/group/course |

<a name="sortMapEmoNegative"></a>

## sortMapEmoNegative(set)
sortMapEmoNegative is a function that returns the correct map, sorted by the most negative emotiond first

**Kind**: global function  

| Param | Description |
| --- | --- |
| set | individual/group/course |

<a name="sortMapExpNegative"></a>

## sortMapExpNegative(set)
sortMapExpNegative is a function that returns the correct map, sorted by the most negative
learning experience first.

**Kind**: global function  

| Param | Description |
| --- | --- |
| set | individual/group/course |

<a name="sortMapPositive"></a>

## sortMapPositive(set)
sortMapPositive is a function that returns the correct map, sorted by the most positive

**Kind**: global function  

| Param | Description |
| --- | --- |
| set | individual/group/course |

<a name="sortMapMostRecent"></a>

## sortMapMostRecent(set)
sortMapMostRecent is a function that returns the correct map, sorted by the most recent week

**Kind**: global function  

| Param | Description |
| --- | --- |
| set | individual/group/course |

<a name="sortMapLeastRecent"></a>

## sortMapLeastRecent(set)
sortMapLeastRecent is a function that returns the correct map, sorted by the least recent week

**Kind**: global function  

| Param | Description |
| --- | --- |
| set | individual/group/course |

<a name="displayIndividualGraphs"></a>

## displayIndividualGraphs(group, map, deadMaps)
displayIndividualGraphs is a function that will create and display the graphs of individual students

**Kind**: global function  

| Param | Description |
| --- | --- |
| group | the group the student is in! |
| map | the map containing the data |
| deadMaps | the map containing the missing values |

<a name="displayAside"></a>

## displayAside(key)
displayAside adds the information to the aside to the right of the graphs

**Kind**: global function  

| Param | Description |
| --- | --- |
| key | the current entry being processed |

<a name="addFormEventListeners"></a>

## addFormEventListeners()
addFormEventListeners adds event listeners to the filter form, duh.

**Kind**: global function  
<a name="submitForm"></a>

## submitForm()
submitForm is my favourite method. Originally I had a button you had to press to implement the filter,
but this was changed so it was automatic.  this was done by just hiding the button and making the eventListeners
press this invisible button!!

**Kind**: global function  
<a name="displayGroupGraph"></a>

## displayGroupGraph(course, sortedMap, deadMaps)
displayGroupGraph is a function that, when called
  will create graphs from the map passed to it

It also adds information to the aside

**Kind**: global function  

| Param | Description |
| --- | --- |
| course | is the course the group belongs to |
| sortedMap | the sorted map containing the data |
| deadMaps | the map containing the missing values |

<a name="averageArrays"></a>

## averageArrays(positive, negative, neutral) ⇒
averageArrays takes 3 arrays and averages each week of them.  With themselves, not with the other weeks

**Kind**: global function  
**Returns**: the normalized array  

| Param | Type | Description |
| --- | --- | --- |
| positive | <code>Array</code> | an array of the positive values |
| negative | <code>Array</code> | an array of the negative values |
| neutral | <code>Array</code> | an array of the neutral values |

<a name="getTotal"></a>

## getTotal(positive, negative, neutral, week) ⇒
getTotal returns the sum of this weeks values across the tree arrays

**Kind**: global function  
**Returns**: total of that week  

| Param | Type | Description |
| --- | --- | --- |
| positive | <code>Array</code> | an array of the positive values |
| negative | <code>Array</code> | an array of the negative values |
| neutral | <code>Array</code> | an array of the neutral values |
| week |  | the week being worked on |

<a name="addCurrentWeekData"></a>

## addCurrentWeekData(key, array, type) ⇒
I genuinely am looking at this method and have no clue what it does!

**Kind**: global function  
**Returns**: something idk  

| Param | Type |
| --- | --- |
| key | <code>\*</code> | 
| array | <code>\*</code> | 
| type | <code>\*</code> | 

<a name="displayGroups"></a>

## displayGroups()
displayGroups is a function that adds buttons that take you into their course/group

**Kind**: global function  
<a name="displayStudents"></a>

## displayStudents(group)
displayStudents is a function that adds buttons that take you into their individual page

**Kind**: global function  

| Param | Description |
| --- | --- |
| group | the group that the students belong to |

<a name="getIndividuals"></a>

## getIndividuals()
getIndividuals is a function called by the html page

**Kind**: global function  
<a name="getGroups"></a>

## getGroups()
getGroups is a function called by the html page

**Kind**: global function  
<a name="buildForm"></a>

## buildForm(map, highestWeek, set)
buildForm add the values to the filter form

**Kind**: global function  

| Param | Description |
| --- | --- |
| map | a map, usually printed, is a visual medium used to locate things in physical space |
| highestWeek | the highest week |
| set | my least favourite variable |

<a name="loadCourseButtons"></a>

## loadCourseButtons()
loadCourseButtons is a function that just loads buttons to the courses

**Kind**: global function  
<a name="loadStudentCourses"></a>

## loadStudentCourses(name, page)
loadStudentCourses is called from the script in the pug file
  it calls the getSpecificStudent method with the correct parameters!

  Who came up with these names??

**Kind**: global function  

| Param | Description |
| --- | --- |
| name | you know what this is |
| page | and this too hopefully! |

<a name="loadBlog"></a>

## loadBlog(name, course)
loadBlog is called from the script in the pug file
it also just calls the getSpecificStudent method with the correct parameters!

**Kind**: global function  

| Param | Description |
| --- | --- |
| name | name of student |
| course | name of course |

<a name="loadGroup"></a>

## loadGroup(course)
loadGroup is a function that calls getStudents with group parameters and the pages course

**Kind**: global function  

| Param | Description |
| --- | --- |
| course | name of course |

<a name="loadIndividuals"></a>

## loadIndividuals(group)
loadIndividuals is a function that calls getStudents with individual parameters and the group

**Kind**: global function  

| Param | Description |
| --- | --- |
| group | name of group |

<a name="submitDraftBlog"></a>

## submitDraftBlog(name, course)
submitDraftBlog is called by the submit draft blog button (unsurprisingly!)
and is set up to take the data from the blog and uh... do something with it

**Kind**: global function  

| Param | Description |
| --- | --- |
| name | name of student |
| course | name of course |

<a name="submitBlog"></a>

## submitBlog(name, course)
submitBlog is called by the submit blog button 
and should probably do something helpful

**Kind**: global function  

| Param | Description |
| --- | --- |
| name | name of student |
| course | name of course |

<a name="getBlogData"></a>

## getBlogData() ⇒
getBlogData is a method that creates an object from the users submitted blog

**Kind**: global function  
**Returns**: an object containing the blog and the answers to the self report  
<a name="getNewWeek"></a>

## getNewWeek() ⇒
finds out which week is next

**Kind**: global function  
**Returns**: the next week!  
<a name="loadDraftBlog"></a>

## loadDraftBlog(student, course, week)
loadDraftBlog is unfinished, but should load the users draft into the page to be finished/edited

**Kind**: global function  

| Param | Description |
| --- | --- |
| student | student name |
| course | course name |
| week | which week |

<a name="draftButton"></a>

## draftButton(draft)
draftButton switches between which button is shown

**Kind**: global function  

| Param | Description |
| --- | --- |
| draft | true or false! |

<a name="eventPath"></a>

## eventPath(evt) ⇒
Function graciously stolen from https://stackoverflow.com/questions/39245488/event-path-is-undefined-running-in-firefox

Thank you Guido Bouman!!!

**Kind**: global function  
**Returns**: the event path  
**Author**: Guido Bouman  

| Param | Type |
| --- | --- |
| evt | <code>Event</code> | 

