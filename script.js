window.list = JSON.parse(localStorage.getItem("list")) || [];

let input = document.querySelector(".input");
let btn = document.querySelector(".btn");
let tasks = document.querySelector(".tasks");

function callTask() {
    let task = input.value.trim();
    
    if (task === "") {
        console.log("Empty");
        return; 
    }

    addTask(task);
}

function addTask(task, fromStorage = false) {
    let div = document.createElement("div");
    div.classList.add("task"); 

    let leftImg = document.createElement("img"); 
    leftImg.src = "tick.png"; 
    leftImg.alt = "Complete";
    leftImg.classList.add("leftImg");
    leftImg.addEventListener("click", () => {
        div.classList.toggle("completed"); 
        updateStorage();
    });
    
    let taskText = document.createElement("span");
    taskText.textContent = task;
    taskText.classList.add("task-text");

    let rightImg = document.createElement("img");
    rightImg.src = "delete.png"; 
    rightImg.alt = "Delete";
    rightImg.classList.add("rightImg");
    rightImg.addEventListener("click", () => {
        tasks.removeChild(div);
        window.list = window.list.filter(t => t !== task);
        updateStorage();
    });

    div.appendChild(leftImg);
    div.appendChild(taskText);
    div.appendChild(rightImg);
    
    tasks.appendChild(div);

    if (!fromStorage) {
        window.list.push(task);
        updateStorage();
    }

    input.value = "";
}

function updateStorage() {
    localStorage.setItem("list", JSON.stringify(window.list));
}

window.list.forEach(task => addTask(task, true));

btn.addEventListener("click", (event) => {
    event.preventDefault();
    callTask();
});
