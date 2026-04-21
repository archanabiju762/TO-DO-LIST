const input = document.querySelector(".todo-input");
const list = document.querySelector(".todo-list");
const button = document.querySelector(".send-img");

function addTask() {
    const taskText = input.value.trim();
    if (taskText === "") return;

    const task = document.createElement("div");
    task.classList.add("task");
    task.innerText = taskText;

    list.appendChild(task);
    input.value = "";
}

input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

button.addEventListener("click", addTask);