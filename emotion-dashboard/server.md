## Functions

<dl>
<dt><a href="#makeObject">makeObject(name, year, month, day, filename, course, group)</a> ⇒</dt>
<dd><p>makeObject() creates and returns an object from the given parameters</p>
</dd>
<dt><a href="#loadCSVHeader">loadCSVHeader()</a></dt>
<dd><p>loadCSVHeader converts the Project-Group_Student.csv to a json file. It will call loadJSONHeader if conversion is successful</p>
</dd>
<dt><a href="#loadJSONHeader">loadJSONHeader()</a></dt>
<dd><p>loadJSONHeader loads the &#39;Project-Group-Student.json&#39; file, creates some maps from the data and then calls the xlsxToCsv() function</p>
</dd>
<dt><a href="#xlsxToCSV">xlsxToCSV()</a></dt>
<dd><p>xlsxToCSV() converts all the xlsx files specified to the folder variable to .csv files
  it also finds out which week the entry is from and renames it, adding group and week</p>
</dd>
<dt><a href="#getWeekOfMonth">getWeekOfMonth(date)</a></dt>
<dd><p>getWeekOfMonth takes a date and returns the date of the start of that week. i.e. if the entry date is on a wednesday or thursday, it will return the date of the monday of that week</p>
</dd>
</dl>

<a name="makeObject"></a>

## makeObject(name, year, month, day, filename, course, group) ⇒
makeObject() creates and returns an object from the given parameters

**Kind**: global function  
**Returns**: obj - an object made with all the parameters  

| Param | Description |
| --- | --- |
| name | The name of the student |
| year | The year of the entry |
| month | The month of the entry |
| day | The day of the entry |
| filename | the title of the file for the entry |
| course | The course the entry is from |
| group | The group the entry is from |

<a name="loadCSVHeader"></a>

## loadCSVHeader()
loadCSVHeader converts the Project-Group_Student.csv to a json file. It will call loadJSONHeader if conversion is successful

**Kind**: global function  
<a name="loadJSONHeader"></a>

## loadJSONHeader()
loadJSONHeader loads the 'Project-Group-Student.json' file, creates some maps from the data and then calls the xlsxToCsv() function

**Kind**: global function  
<a name="xlsxToCSV"></a>

## xlsxToCSV()
xlsxToCSV() converts all the xlsx files specified to the folder variable to .csv files
  it also finds out which week the entry is from and renames it, adding group and week

**Kind**: global function  
<a name="getWeekOfMonth"></a>

## getWeekOfMonth(date)
getWeekOfMonth takes a date and returns the date of the start of that week. i.e. if the entry date is on a wednesday or thursday, it will return the date of the monday of that week

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>date</code> | a date |