const input = document.querySelector(".todo-input");
const list = document.querySelector(".todo-list");
const button = document.querySelector(".send-img");

function addTask() {
    const taskText = input.value.trim();
    if (taskText === "") return;

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

    circle.addEventListener("click", () =>{
        circle.classList.toggle("completed");
        task.classList.toggle("done");
        updateItemsLeft();
    });
}
function updateItemsLeft() 
{
        const tasks = document.querySelectorAll(".task");
        let count = 0;
        tasks.forEach(task => {
            if (!task.classList.contains("done")) {
                count++;
            }
        });
        document.querySelector(".items-left").innerText = `${count} items left`;
}

input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

button.addEventListener("click", addTask);
updateItemsLeft();