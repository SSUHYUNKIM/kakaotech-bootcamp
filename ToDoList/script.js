const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function updateIncompleteCount() {
    const tasks = listContainer.getElementsByTagName("li");
    let incompleteCount = 0;
    for (let task of tasks) {
        if (!task.classList.contains("checked")) {
            incompleteCount++;
        }
    }
    document.getElementById("incomplete-count").innerText = "Incomplete items: " + incompleteCount;
}

function addTask() {
    if(inputBox.value === "") {
        alert("Please enter a task");
    }
    else {
        const li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        inputBox.value = "";
        const span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
    updateIncompleteCount();
}

function filterTasks(filter) {
    const tasks = listContainer.getElementsByTagName('li');
    for (let task of tasks) {
        task.classList.remove('hidden');
        if (filter === 'active' && task.classList.contains('checked')) {
            task.classList.add('hidden');
        } else if (filter === 'completed' && task.classList.contains('unchecked')) {
            task.classList.add('hidden');
        }
    }
}

function deleteAllTasks() {
    listContainer.innerHTML = '';
    saveData();
    updateIncompleteCount();
}

inputBox.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        addTask();
    }
});

listContainer.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        if(e.target.classList.contains('checked')) {
            e.target.classList.remove('checked');
            e.target.classList.add('unchecked');
        } else {
            e.target.classList.remove('unchecked');
            e.target.classList.add('checked');
        }
    } else if (e.target.tagName === 'SPAN') {
        e.target.parentElement.remove();
    }
    updateIncompleteCount();
    saveData();
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    updateIncompleteCount();
}

showTask();