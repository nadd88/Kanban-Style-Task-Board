let tasks = [];
let taskIdCounter = 1;
let currentEditId = null;
let selectedColumn = "todo";

const todoList = document.getElementById("todoList");
const inprogressList = document.getElementById("inprogressList");
const doneList = document.getElementById("doneList");

const modal = document.getElementById("taskModal");
const titleInput = document.getElementById("taskTitle");
const descInput = document.getElementById("taskDesc");
const priorityInput = document.getElementById("taskPriority");
const dueDateInput = document.getElementById("taskDueDate");
const saveBtn = document.getElementById("saveTask");
const cancelBtn = document.getElementById("cancelTask");

const counter = document.getElementById("taskCounter");

function updateCounter() {
    counter.textContent = tasks.length;
}

function createTaskCard(taskObj) {

    const li = document.createElement("li");
    li.setAttribute("data-id", taskObj.id);
    li.classList.add("task-card");
    li.classList.add(taskObj.priority);

    const title = document.createElement("span");
    title.textContent = taskObj.title;
    title.classList.add("task-title");

    const desc = document.createElement("p");
    desc.textContent = taskObj.description;

    const priority = document.createElement("span");
    priority.textContent = taskObj.priority;

    const due = document.createElement("small");
    due.textContent = taskObj.dueDate;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.setAttribute("data-action", "edit");
    editBtn.setAttribute("data-id", taskObj.id);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute("data-action", "delete");
    deleteBtn.setAttribute("data-id", taskObj.id);

    li.appendChild(title);
    li.appendChild(desc);
    li.appendChild(priority);
    li.appendChild(due);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    return li;
}

function addTask(columnId, taskObj) {

    const list = document.getElementById(columnId + "List");

    const card = createTaskCard(taskObj);

    list.appendChild(card);

    tasks.push(taskObj);

    updateCounter();
}

function deleteTask(taskId) {

    const card = document.querySelector(`[data-id='${taskId}']`);
    if (!card) return;

    card.classList.add("fade-out");

    setTimeout(() => {
        card.remove();
        tasks = tasks.filter(t => t.id !== taskId);
        updateCounter();
    }, 300);
}

function editTask(taskId) {

    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    currentEditId = taskId;

    titleInput.value = task.title;
    descInput.value = task.description;
    priorityInput.value = task.priority;
    dueDateInput.value = task.dueDate;

    modal.classList.remove("hidden");
}

function updateTask(taskId, updatedData) {

    const index = tasks.findIndex(t => t.id === taskId);
    if (index === -1) return;

    tasks[index] = {
        ...tasks[index],
        ...updatedData
    };

    const oldCard = document.querySelector(`[data-id='${taskId}']`);

    if (oldCard) {
        const newCard = createTaskCard(tasks[index]);
        oldCard.replaceWith(newCard);
    }

    updateCounter();
}

[todoList, inprogressList, doneList].forEach(list => {

    list.addEventListener("click", function (event) {

        const action = event.target.getAttribute("data-action");
        const id = parseInt(event.target.getAttribute("data-id"));

        if (!action || !id) return;

        if (action === "delete") deleteTask(id);
        if (action === "edit") editTask(id);
    });
});

document.addEventListener("dblclick", function (event) {

    if (!event.target.classList.contains("task-title")) return;

    const oldValue = event.target.textContent;

    const input = document.createElement("input");
    input.value = oldValue;

    event.target.replaceWith(input);
    input.focus();

    function save() {
        const span = document.createElement("span");
        span.classList.add("task-title");
        span.textContent = input.value;

        input.replaceWith(span);
    }

    input.addEventListener("blur", save);

    input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") save();
    });
});

document.getElementById("priorityFilter").addEventListener("change", function () {

    const value = this.value;

    document.querySelectorAll(".task-card").forEach(card => {

        const match = value === "all" || card.classList.contains(value);

        card.classList.toggle("is-hidden", !match);
    });
});

document.getElementById("clearDone").addEventListener("click", function () {

    const cards = [...document.querySelectorAll("#doneList .task-card")];

    cards.forEach((card, index) => {

        setTimeout(() => {

            card.classList.add("fade-out");

            setTimeout(() => {
                card.remove();

                tasks = tasks.filter(t =>
                    t.id !== parseInt(card.getAttribute("data-id"))
                );

                updateCounter();
            }, 300);

        }, index * 100);
    });
});

document.querySelectorAll("button[data-column]").forEach(button => {

    button.addEventListener("click", function () {

        selectedColumn = this.getAttribute("data-column");

        currentEditId = null;

        titleInput.value = "";
        descInput.value = "";
        priorityInput.value = "low";
        dueDateInput.value = "";

        modal.classList.remove("hidden");
    });
});

cancelBtn.addEventListener("click", function () {
    modal.classList.add("hidden");
});

saveBtn.addEventListener("click", function () {

    const taskObj = {
        id: taskIdCounter++,
        title: titleInput.value,
        description: descInput.value,
        priority: priorityInput.value,
        dueDate: dueDateInput.value
    };

    addTask(selectedColumn, taskObj);

    modal.classList.add("hidden");
});

updateCounter();