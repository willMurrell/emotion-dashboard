function filterForm(){
    var week = document.querySelector('#weekSelector').value;
    var group = document.querySelector('#groupSelector').value;
    var bookmark = document.querySelector('#bookmarkInput').checked;
    
    order(week, group, bookmark);
    
    
}

function order(filterWeek, filterGroup, bookmark){
    //const graphs = document.querySelectorAll("new div")
    const graphs = document.querySelector('#new').children
    for(var i = 0; i < graphs.length; i++){
        
        
        var order = graphs[i].id.split(" ");
        var group = order[0];
        var week = order[1].substring(4);
        var fullWeek = order[1];
        //console.log(order);

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
        console.log(bookmark);
        if(bookmark){
            var bookmarkElement = document.getElementById(group+ " " +fullWeek + " checkbox");
            console.log(bookmarkElement);
            if(!bookmarkElement.checked){
                container.style.display = "none";
            }
        }
        
        

       
        //container.setAttribute("style", "order: "+week);

    }
    
}

