function filterForm(){
    var week = document.querySelector('#weekSelector').value;
    var group = document.querySelector('#groupSelector').value;
    order(week, group);
    
    
}

function order(filterWeek, filterGroup){
    //const graphs = document.querySelectorAll("new div")
    const graphs = document.querySelector('#new').children
    for(var i = 0; i < graphs.length; i++){
        

        var order = graphs[i].id.split(" ");
        var group = order[0];
        var week = order[1].substring(4);


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
        
        

       
        //container.setAttribute("style", "order: "+week);

    }
    
}

