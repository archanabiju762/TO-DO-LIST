const input = document.querySelector(".todo-input");
const list = document.querySelector(".todo-list");
const addBtn = document.querySelector(".send-img");
const filters = document.querySelectorAll(".filter button");
const itemsLeftText = document.querySelector(".items-left");
const clearCompletedBtn = document.querySelector(".clear-completed");
const themeToggleBtn = document.querySelector(".toggle-theme");

themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const theme = document.body.classList.contains("light") ? "light" : "dark";
    localStorage.setItem("theme", theme);
});

function loadTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light");
    }
}

function saveTasks() {
    const tasks = [];

    const allTasks = document.querySelectorAll(".task");

    allTasks.forEach(task => {
        const text = task.querySelector("p").innerText;
        const status = task.classList.contains("status");

        tasks.push({ text, status });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTask(textValue, isStatus = false) {
    const task = document.createElement("div");
    task.classList.add("task");

    const circle = document.createElement("span");
    circle.classList.add("circle");

    const text = document.createElement("p");
    text.innerText = textValue;

    if (isStatus ) {
        task.classList.add("status");
        circle.classList.add("completed");
    }

    task.appendChild(circle);
    task.appendChild(text);
    list.appendChild(task);

    circle.addEventListener("click", () => {
        circle.classList.toggle("completed");
        task.classList.toggle("status");
        updateItemsLeft();
        filterTasks(getActiveFilter());
        saveTasks();
    });
}

function loadTasks() {
    const data = JSON.parse(localStorage.getItem("tasks")) || [];
    data.forEach(item => {
        createTask(item.text, item.status);
    });
    updateItemsLeft();
    filterTasks(getActiveFilter());
}

function getActiveFilter() {
    return document.querySelector(".filter button.active")?.getAttribute("data-filter") || "all";
}

function updateItemsLeft() {
    const tasks = document.querySelectorAll(".task");
    let count = 0;

    tasks.forEach(task => {
        if (!task.classList.contains("status")) count++;
    });

    itemsLeftText.innerText = `${count} items left`;

    const footer = document.querySelector(".todo-footer");

    if (tasks.length === 0) {
        footer.style.display = "none";
    } else {
        footer.style.display = "";
    }
}

function filterTasks(type) {
    const tasks = document.querySelectorAll(".task");
    tasks.forEach(task => {
        if (type === "all") {
            task.style.display = "flex";
        } else if (type === "active") {
            task.style.display = task.classList.contains("status") ? "none" : "flex";
        } else {
            task.style.display = task.classList.contains("status") ? "flex" : "none";
        }
    });
}

function addTask() {
    const taskText = input.value.trim();
    if (!taskText) return;
    createTask(taskText);
    input.value = "";
    updateItemsLeft();
    filterTasks(getActiveFilter());
    saveTasks();
}

addBtn.addEventListener("click", addTask);

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        filters.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        filterTasks(btn.getAttribute("data-filter"));
    });
});

clearCompletedBtn.addEventListener("click", () => {
    document.querySelectorAll(".task.status").forEach(task => task.remove());

    updateItemsLeft();
    filterTasks(getActiveFilter());
    saveTasks();
});

loadTheme();
loadTasks();