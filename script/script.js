const input = document.querySelector(".todo-input");
const list = document.querySelector(".todo-list");
const addBtn = document.querySelector(".send-img");
const filters = document.querySelectorAll(".filter button");
const itemsLeftText = document.querySelector(".items-left");
const clearCompletedBtn = document.querySelector(".clear-completed");
const themeToggleBtn = document.querySelector(".toggle-theme");

themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
});
function getActiveFilter() {
    return document.querySelector(".filter button.active")?.getAttribute("data-filter") || "all";
}

function updateItemsLeft() {
    const tasks = document.querySelectorAll(".task");
    let count = 0;

    tasks.forEach(task => {
        if (!task.classList.contains("done")) count++;
    });

    itemsLeftText.innerText = `${count} items left`;
}

function filterTasks(type) {
    const tasks = document.querySelectorAll(".task");

    tasks.forEach(task => {
        if (type === "all") {
            task.style.display = "flex";
        } else if (type === "active") {
            task.style.display = task.classList.contains("done") ? "none" : "flex";
        } else if (type === "completed") {
            task.style.display = task.classList.contains("done") ? "flex" : "none";
        }
    });
}

function addTask() {
    const taskText = input.value.trim();
    if (!taskText) return;

    const task = document.createElement("div");
    task.classList.add("task");

    const circle = document.createElement("span");
    circle.classList.add("circle");

    const text = document.createElement("p");
    text.innerText = taskText;

    task.appendChild(circle);
    task.appendChild(text);
    list.appendChild(task);

    input.value = "";

    updateItemsLeft();
    filterTasks(getActiveFilter());

    circle.addEventListener("click", () => {
        circle.classList.toggle("completed");
        task.classList.toggle("done");

        updateItemsLeft();
        filterTasks(getActiveFilter());
    });
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
    document.querySelectorAll(".task.done").forEach(task => task.remove());
    updateItemsLeft();
    filterTasks(getActiveFilter());
});

updateItemsLeft();