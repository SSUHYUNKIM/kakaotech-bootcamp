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
    document.getElementById("incomplete-count").innerText = "해야 할 일: " + incompleteCount;
}

function addTask() {
    if(inputBox.value === "") {
        alert("할 일을 작성해주세요!");
    }
    else {
        const li = document.createElement("li");
        li.innerHTML = inputBox.value;
        li.classList.add('unchecked');
        listContainer.appendChild(li);
        inputBox.value = "";

        const editBtn = document.createElement("edit");
        editBtn.innerHTML = "\u270E";
        editBtn.onclick = function() { editTask(li, editBtn); };
        li.appendChild(editBtn);

        const span = document.createElement("span");
        span.innerHTML = "\u00d7";
        span.onclick = function() { li.remove(); updateIncompleteCount(); saveData(); };
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
    updateIncompleteCount();
}

function editTask(li, editBtn) {
    const currentText = li.childNodes[0].nodeValue.trim();
    const input = document.createElement("input");
    input.type = "text";
    input.value = currentText;
    li.insertBefore(input, li.firstChild);
    li.removeChild(li.childNodes[1]);
    const span = li.querySelector("span");
    editBtn.innerHTML = "\u2713";

    editBtn.onclick = function() {
        li.textContent = input.value;
        li.appendChild(editBtn);
        li.appendChild(span);
        editBtn.innerHTML = "\u270E";
        editBtn.onclick = function() { editTask(li, editBtn); };
        updateIncompleteCount();
        saveData();
    };
}

function setActiveButton(buttonId) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(button => {
        if (button.id === buttonId) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

function filterTasks(filter) {
    const tasks = listContainer.getElementsByTagName('li');
    for (let task of tasks) {
        task.classList.remove('hidden');
        if (filter === 'active' && task.classList.contains('checked')) {
            task.classList.add('hidden');
        } else if (filter === 'completed' && !task.classList.contains('checked')) {
            task.classList.add('hidden');
        }
    }
    setActiveButton(filter); // 필터링 후 활성 버튼 설정
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
            console.log("test");
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