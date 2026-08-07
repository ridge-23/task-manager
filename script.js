const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const taskItem = document.createElement("li");
        taskItem.textContent = task.text; 

        if (task.completed) {
            taskItem.classList.add("completed");
        }

        taskItem.addEventListener("click", function() {
            task.completed = !task.completed;

            saveTasks();
            renderTasks();
        });


        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-btn");


        deleteButton.addEventListener("click", function () {
            event.stopPropagation();
            
            tasks = tasks.filter(function (currentTask) {
                return currentTask.id !== task.id;
            });

            saveTasks();
            renderTasks();
        });

        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);

    });

}

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText ==="") {
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    renderTasks();

    taskInput.value = "";
    taskInput.focus();
}

addTaskButton,addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event){
    if (event.key === "Enter") {
        addTask();
    }
});

renderTasks();


