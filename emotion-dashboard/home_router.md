## Functions

<dl>
<dt><a href="#updateComments">updateComments(data)</a></dt>
<dd><p>updateComments is a function that will update the csv file of comments with the new comment given in data</p>
</dd>
<dt><a href="#iterateOverFiles">iterateOverFiles(folder)</a></dt>
<dd><p>iterateOverFiles will iterate over the folder passed to it and 
then call the parseCSV method on each one</p>
</dd>
<dt><a href="#readHeader">readHeader(filename)</a></dt>
<dd><p>readHeader reads the csv header and turns it into json and adds it to entries array</p>
</dd>
<dt><a href="#readComments">readComments(filename)</a></dt>
<dd><p>readHeader reads the json comment file and turns it into a map</p>
</dd>
<dt><a href="#parseCSV">parseCSV(input, output)</a></dt>
<dd><p>parseCSV uses Papa.js to turn the csv files into json files
It will call readJSON on each file if converted properly</p>
</dd>
<dt><a href="#readJSON">readJSON(filename)</a></dt>
<dd><p>readJSON is a method that reads a JSON file and passes its information to 
the individualReport and emotionCounter method</p>
</dd>
<dt><a href="#emotionCounter">emotionCounter(data, name, group, week, course)</a></dt>
<dd><p>emotionCounter is a method that counts which emotions and their frequency per entry</p>
</dd>
<dt><a href="#individualReport">individualReport(weekData, name, group, week, course)</a></dt>
<dd><p>IndividualReport creates arrays of sentences to be used for the pages that 
view what the students have written</p>
</dd>
</dl>

<a name="updateComments"></a>

## updateComments(data)
updateComments is a function that will update the csv file of comments with the new comment given in data

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | an object containing a name, group and the comment |

<a name="iterateOverFiles"></a>

## iterateOverFiles(folder)
iterateOverFiles will iterate over the folder passed to it and 
then call the parseCSV method on each one

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| folder | <code>String</code> | the name of the folder going to be iterated over |

<a name="readHeader"></a>

## readHeader(filename)
readHeader reads the csv header and turns it into json and adds it to entries array

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>String</code> | the name of the file to be read |

<a name="readComments"></a>

## readComments(filename)
readHeader reads the json comment file and turns it into a map

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>String</code> | the name of the file to be read |

<a name="parseCSV"></a>

## parseCSV(input, output)
parseCSV uses Papa.js to turn the csv files into json files
It will call readJSON on each file if converted properly

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>String</code> | the name of the input file |
| output | <code>String</code> | the name of the output file |

<a name="readJSON"></a>

## readJSON(filename)
readJSON is a method that reads a JSON file and passes its information to 
the individualReport and emotionCounter method

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>String</code> | the name of the file to be read |

<a name="emotionCounter"></a>

## emotionCounter(data, name, group, week, course)
emotionCounter is a method that counts which emotions and their frequency per entry

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| data |  | the data of that weeks entry |
| name | <code>String</code> | the name of the student |
| group | <code>String</code> | the name of the group/team |
| week |  | which week of the course it is |
| course | <code>String</code> | the name of the course |

<a name="individualReport"></a>

## individualReport(weekData, name, group, week, course)
IndividualReport creates arrays of sentences to be used for the pages that 
view what the students have written

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| weekData |  | this weeks entry's data |
| name | <code>String</code> | the name of the student |
| group | <code>String</code> | the name of the group/team |
| week |  | which week of the course it is |
| course | <code>String</code> | the name of the course |
