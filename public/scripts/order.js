

function order(){
    //const graphs = document.querySelectorAll("new div")
    const graphs = document.querySelector('#new').children
    for(var i = 0; i < graphs.length; i++){
        var order = graphs[i].id.substring(5,6) + graphs[i].id.substring(11);
        document.getElementById(graphs[i].id).style.order = order;
    }
    
}