import Project from "./project";
import Task from "./task";
import {
    displayProjectModal, hideProjectModal,
    displayTaskModal, hideTaskModal,
    clearUI, projectSection,
    renderTab, renderTasks
} from "./ui";
import Storage from "./storage";

function projectFormHandler() {
    const project = new Project();
    const form = document.querySelector(".project-form");
    const formData = new FormData(form);

    for (const [key, val] of formData) {
        project[key] = val;
    }
    return project;
}

function taskFormHandler() {
    const task = new Task();
    const form = document.querySelector(".task-form");
    const formData = new FormData(form);

    for (const [key, val] of formData) {
        task[key] = val;
    }
    task['created'] = new Date(Date.now()).toDateString();
    return task;
}

(function() {
    const projectAdd = document.querySelector(".btn-add-project");
    projectAdd.addEventListener('click', (e) => {
        e.preventDefault();
        displayProjectModal();
    });
})();

// (function () {
//     const taskID = document.querySelector("");
// })();

(function() {
    const taskAdd = document.querySelector(".task-content");
    taskAdd.addEventListener("click", (e) => {
        const btn = e.target.matches(".add-task");
        if (!btn) return;
        displayTaskModal();
    });
})();

(function() {
    const button = document.querySelector(".task-button");
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const name = getActiveProject();
        const task = taskFormHandler();

        saveTaskToProject(name, task);
        const project = Storage.readProject(name);

        hideTaskModal();
        renderUI(project);
    });
})();

(function() {
    const btnCls = document.querySelector(".task-modal > .btn-close");
    btnCls.addEventListener("click", (e) => {
        hideTaskModal();
    });
})();

// Add new project
// Create project button & tab
(function() {
    const projectAdd = document.querySelector(".project-add");
    projectAdd.addEventListener('click', (e) => {
        e.preventDefault();
        const project = projectFormHandler();
        Storage.writeProject(project.type, project);
        Storage.updateActiveProject(project.type);
        clearUI();
        projectSection(project);
        renderTab(project);
        hideProjectModal();
        getAllTasks();
    });
})();

(function () {
    // TODO: Set up event delegation
    const parent = document.querySelector(".main-nav");
    parent.addEventListener('click', (e) => {
        if (!e.target.matches(".nav-btn")) return;

        const project = Storage.readProject(e.target.id);
        Storage.updateActiveProject(project.type);

        renderUI(project);
    });
})();

function getActiveProject() {
    return JSON.parse(Storage.storage.getItem("active"));
}

export function saveTaskToProject(name, task) {
    const project = Storage.readProject(name);
    project.addTask(task);
    Storage.writeProject(name, project);
}

export function loadDefault() {
    const project = new Project();
    project.type = "All-tasks";

    Storage.writeProject(project.type, project);
    Storage.updateActiveProject(project.type);

    const data = Storage.readProject(project.type);

    clearUI();
    projectSection(data);
    renderTab(project);
}

function renderUI(project) {
    clearUI();
    projectSection(project);
    renderTasks(project, project.tasks);
}

function getAllTasks() {
    const allTasks = [];
    const storageArray = Object.entries(Storage.storage);
    const filteredStorage = storageArray.filter(([key, value]) => key !== "active");
    const projects = Object.fromEntries(filteredStorage);

    for (const project in projects) {
        const tasks = JSON.parse(projects[project].toString()).tasks;
        tasks.map(task => allTasks.push(task));
    }
    return allTasks;
}

