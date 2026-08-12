const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const filterButtons = document.querySelectorAll(".filter-btn");
const taskCount = document.getElementById("task-count")

let currentFilter = "all";
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

function renderTasks() {
    taskList.innerHTML = "";
    let filteredTasks = tasks;

    if (currentFilter === "active") {
        filteredTasks = tasks.filter(function (task) {
            return !task.completed;
        });
    }

    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(function (task) {
            return task.completed;
        });
    }

    filteredTasks.forEach(task => {
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

    updateTaskCount();
};

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
};

function updateTaskCount() {
    const activeTasks = tasks.filter(function (task) {
        return !task.completed;
    });

    taskCount.textContent = `${activeTasks.length} tasks remainng`; 
}

filterButtons.forEach(function (button) {
    button.addEventListener("click", function(){
        currentFilter = button.dataset.filter;
        
        filterButtons.forEach(function (btn) {
            btn.classList.remove("active")
        }),

        button.classList.add("active")

        renderTasks();
    });
        
});

addTaskButton,addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event){
    if (event.key === "Enter") {
        addTask();
    }
});

renderTasks();



