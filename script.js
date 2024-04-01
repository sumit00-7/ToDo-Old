const inputData = document.querySelector(".todo-input");
const list = document.querySelector(".todo-list");
let details = [];

document.addEventListener("submit",addData);

function addData(event, value=null){
    if(event){
        event.preventDefault();
    }

    const listData = value ?? inputData.value;
    
    const newItem = document.createElement("input");
    newItem.type="checkbox";
    newItem.className="done";

    const span = document.createElement("span");
    span.className = "newListing";
    span.innerHTML = listData;

    const icon = document.createElement("i");
    icon.classList="fa fa-trash-o";
    icon.addEventListener("click", deleteTask);

    const newList = document.createElement("li");

    newList.appendChild(newItem);
    newList.appendChild(span);
    newList.appendChild(icon);

    
    list.appendChild(newList);

    
    details.push(listData);
    localStorage.setItem("todoDetails",JSON.stringify(details));

    inputData.value = "";

    newItem.addEventListener("change",markDone);

    
}

function deleteTask(event){
    const listItem = event.target.parentElement;

    let todos = JSON.parse(localStorage.getItem('todoDetails'));
    const removingValue = event.target.previousSibling.innerHTML;
    todos.splice(todos.indexOf(removingValue),1);
    localStorage.setItem("todoDetails", JSON.stringify(todos));
    
    listItem.remove();
}


function markDone(event){

    const listItem = event.target.parentElement;

    if(!event.target.checked){
        listItem.style.textDecoration = "none";
        listItem.style.color = "black";
    }
    else{
        listItem.style.textDecoration = "line-through";
        listItem.style.color = "grey";
    }
}

let time = document.querySelector(".timer");

let ticking = function(){
    let currentDate = new Date();

    let getHour = currentDate.getHours();
    let getMin = currentDate.getMinutes();
    let getSec = currentDate.getSeconds();

    let totalTime = `Current Time:${getHour}:${getMin}:${getSec}`;

    time.textContent = totalTime;
}

setInterval(ticking,1000);

window.addEventListener("load",getData);



function getData(){

    let data = JSON.parse(localStorage.getItem('todoDetails'));

    for(let i=0;i<data.length;i++){

        addData(undefined, data[i])

    }
}