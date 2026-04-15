let tasks = [];
let taskIdCounter = 1;
let currentEditId = null;

// DOM
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