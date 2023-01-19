
/**
 * filterForm is a method called by the filter on the main pages that have all the graphs on them
 * It will get the correctly sorted map first, then pass the variables to order() to filter out graphs.
 * 
 * I know what you are thinking... Why does the function called "filterForm" NOT filter out anything, only
 * change the order on the graphs? Also, why does the function called "order" NOT change the order of anything,
 * but actually filter out graphs?! And to that I say, yeah fair.  In the amount of time it took me to write this
 * I could've changed them around, but where is the fun in that??
 * 
 * 
 * @param {String} arg just a variable that will change the functionalty of this method. Usually somehting like course/group/individual
 * @param {String} set the scope of the dataset that needs to be worked on.  
 */

function filterForm(arg, set){
    console.log("CLICK!")
    console.log("SET: " + set);
    console.log("ARG: " + arg);

    var week = document.querySelector('#weekSelector').value;
    var group = document.querySelector('#groupSelector').value;
    var bookmark = document.querySelector('#bookmarkInput').checked;
    var missing = document.querySelector('#missingInput').checked;
    var sort = document.querySelector('#sortSelector').value;
    var set;
    
   
    
    if(arg != undefined){
        if(arg == 'course'){
            
            set = 'course';
        }
        
        clearGraphs();
        switch (sort){
            case 'overallPos':
                
                var sortedMap = new Map(sortMapPositive(set));
                break;
            case 'overallNeg':
                
                var sortedMap = new Map(sortMapNegative(set));
                break;
            case 'emotionNeg':
                
                var sortedMap = new Map(sortMapEmoNegative(set));
                break;
            case 'experienceNeg':
                
                var sortedMap = new Map(sortMapExpNegative(set));
                break;
            case 'mostRecent':
                
                var sortedMap = new Map(sortMapMostRecent(set));
                break;
            case 'leastRecent':
                
                var sortedMap = new Map(sortMapLeastRecent(set));
                break;
            
            
        }
        
        
        if(set == "individuals"){
            displayIndividualGraphs(arg, sortedMap ,fillInMissingWeeks(sortedMap, set));
        } else if(set == "group"){
            
            displayGroupGraph(arg,sortedMap, fillInMissingWeeks(sortedMap, set));
        } else {
            displayGroupGraph(set,sortedMap, fillInMissingWeeks(sortedMap, set));
        }
        
        
        bookmarkEventListener(set); 
    } 


    order(week, group, bookmark, missing);
    
    
}
/**
 * order.  Probably best to look at the code comments for filterForm if you really want the full experience
 * 
 * This method just filters out stuff. My tummy hurts
 * 
 * @param filterWeek idk if this is a string or int but yeah its just the week number
 * @param {String} filterGroup name of the group
 * @param {Boolean} bookmark wanna see the bookmarked values or nah?
 * @param {Boolean} missing wanna see the missing values or nah
 * 
 */
function order(filterWeek, filterGroup, bookmark, missing){
    
    const graphs = document.querySelector('#new').children
    for(var i = 0; i < graphs.length; i++){
        
        
        var order = graphs[i].id.split(" ");
        var group = order[0];
        var week = order[1].substring(4);
        var fullWeek = order[1];
        

        var container = document.getElementById(graphs[i].id);
        container.style.display = "flex";
        if(filterWeek != "null"){
            
            
            if(week != filterWeek.substring(4)){
                
                container.style.display = "none";
            }
           
        }
        
        if(filterGroup != "null"){
            if(group != filterGroup){
                
                container.style.display = "none";
            }
        }
        

        if(bookmark){
            var bookmarkElement = document.getElementById(group+ " " +fullWeek + " checkbox");
            

            if(!bookmarkElement.checked){
                    container.style.display = "none";
              
                
            }
        }

        if(!missing){
            
            if(container.getAttribute("missing")){
                container.style.display = "none";
                
            }
        }

    }
    
}









