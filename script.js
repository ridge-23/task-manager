const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");



function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText ==="") {
        return;
    }

    const taskItem = document.createElement("li");
    taskItem.textContent = taskText;

    taskItem.addEventListener("click", function() {
        taskItem.classList.toggle("completed")
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");

    deleteButton.addEventListener("click", function () {
        event.stopPropagation();
        taskItem.remove();
    });

    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);


    taskInput.value = "";
    taskInput.focus();

}
addTaskButton,addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event){
    if (event.key === "Enter") {
        addTask();
    }
})


