


function filterForm(arg){
    
    

    var week = document.querySelector('#weekSelector').value;
    var group = document.querySelector('#groupSelector').value;
    var bookmark = document.querySelector('#bookmarkInput').checked;
    var sort = document.querySelector('#sortSelector').value;
    var set;
    
    
    if(arg != undefined){
        if(arg == 'course'){
            
            set = 'course';
        } else {
            set = arg;
        }
        console.log(set);
        clearGraphs();
        switch (sort){
            case 'overallPos':
                
                var sortedMap = new Map(sortMapPositive(arg));
                break;
            case 'overallNeg':
                
                var sortedMap = new Map(sortMapNegative(arg));
                break;
            case 'emotionNeg':
                
                var sortedMap = new Map(sortMapEmoNegative(arg));
                break;
            case 'experienceNeg':
                
                var sortedMap = new Map(sortMapExpNegative(arg));
                break;
        }
        if(set == 'course'){
            set = 'all';
        }
        
        displayGroupGraph(set,sortedMap, fillInMissingWeeks(sortedMap));
        
        bookmarkEventListener(arg);
    } 


    order(week, group, bookmark);
    
    
}

function order(filterWeek, filterGroup, bookmark){
    
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
        
        

       
        

    }
    
}


function textHoverFunction(){
    console.log("AHHH YES");
  
}
    






