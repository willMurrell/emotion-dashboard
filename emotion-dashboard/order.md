## Functions

<dl>
<dt><a href="#filterForm">filterForm(arg, set)</a></dt>
<dd><p>filterForm is a method called by the filter on the main pages that have all the graphs on them
It will get the correctly sorted map first, then pass the variables to order() to filter out graphs.</p>
<p>I know what you are thinking... Why does the function called &quot;filterForm&quot; NOT filter out anything, only
change the order on the graphs? Also, why does the function called &quot;order&quot; NOT change the order of anything,
but actually filter out graphs?! And to that I say, yeah fair.  In the amount of time it took me to write this
I could&#39;ve changed them around, but where is the fun in that??</p>
</dd>
<dt><a href="#order">order(filterWeek, filterGroup, bookmark, missing)</a></dt>
<dd><p>order.  Probably best to look at the code comments for filterForm if you really want the full experience</p>
<p>This method just filters out stuff. My tummy hurts</p>
</dd>
</dl>

<a name="filterForm"></a>

## filterForm(arg, set)
filterForm is a method called by the filter on the main pages that have all the graphs on them
It will get the correctly sorted map first, then pass the variables to order() to filter out graphs.

I know what you are thinking... Why does the function called "filterForm" NOT filter out anything, only
change the order on the graphs? Also, why does the function called "order" NOT change the order of anything,
but actually filter out graphs?! And to that I say, yeah fair.  In the amount of time it took me to write this
I could've changed them around, but where is the fun in that??

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| arg | <code>String</code> | just a variable that will change the functionalty of this method. Usually somehting like course/group/individual |
| set | <code>String</code> | the scope of the dataset that needs to be worked on. |

<a name="order"></a>

## order(filterWeek, filterGroup, bookmark, missing)
order.  Probably best to look at the code comments for filterForm if you really want the full experience

This method just filters out stuff. My tummy hurts

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| filterWeek |  | idk if this is a string or int but yeah its just the week number |
| filterGroup | <code>String</code> | name of the group |
| bookmark | <code>Boolean</code> | wanna see the bookmarked values or nah? |
| missing | <code>Boolean</code> | wanna see the missing values or nah |

