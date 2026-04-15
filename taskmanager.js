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