


function filterForm(arg, set){
    console.log("SET: " + set);
    console.log("ARG: " + arg);

    var week = document.querySelector('#weekSelector').value;
    var group = document.querySelector('#groupSelector').value;
    var bookmark = document.querySelector('#bookmarkInput').checked;
    var missing = document.querySelector('#missingInput').checked;
    var sort = document.querySelector('#sortSelector').value;
    var set;
    
   console.log(missing);
    
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
            console.log(bookmarkElement);

            if(!bookmarkElement.checked){
                    container.style.display = "none";
              
                
            }

            // if(container.getAttribute("missing")){
            //     var arr = container.getAttribute("id").split(" ");
            //    document.getElementById(arr[0]+ " " +arr[1] + " checkbox").checked = true;
            //    console.log(document.getElementById(arr[0]+ " " +arr[1] + " checkbox").checked);
                
            // }
        }

        if(!missing){
            
            if(container.getAttribute("missing")){
                container.style.display = "none";
                
            }
        }
        
        

       
        

    }
    
}









