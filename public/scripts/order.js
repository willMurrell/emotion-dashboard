

function order(){
    //const graphs = document.querySelectorAll("new div")
    const graphs = document.querySelector('#new').children
    for(var i = 0; i < graphs.length; i++){
        //console.log("ah");
        var order = graphs[i].id.split(" ");
        console.log(order);
        var rank = order[0].substring(5) + order[1].substring(4);
        //console.log(rank);
        // document.getElementById(graphs[i].id).style.order = order;
        var container = document.getElementById(graphs[i].id);
        container.setAttribute("style", "order: "+rank);
    }
    
}