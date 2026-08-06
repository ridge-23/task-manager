const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");




addTaskButton,addEventListener("click", function () {
    const taskText = taskInput.value.trim();

    if (taskText ==="") {
        return;
    }

    const taskItem = document.createElement("li");
    taskItem.textContent = taskText;

    taskList.appendChild(taskItem);

    taskInput.value = "";

})

console.log(taskList)