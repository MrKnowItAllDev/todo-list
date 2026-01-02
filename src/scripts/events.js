import Project from "./project";
import Task from "./task";
import Storage from "./storage";
import {
    displayProjectModal, hideProjectModal,
    displayTaskModal, hideTaskModal,
    clearUI, projectSection,
    renderTab, renderTasks, renderTaskDetails
} from "./ui";

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

(function() {
    const btnCls = document.querySelector(".task-modal > .btn-close");
    btnCls.addEventListener("click", (e) => {
        hideTaskModal();
    });
})();

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

        saveTaskToProject(name, task)

        const project = Storage.readProject(name);

        hideTaskModal();
        renderUI(project);
    });
})();

// Click on task to view it
(function() {
    const taskUI = document.querySelector(".task-content");

    taskUI.addEventListener('click', (e) => {
        e.stopPropagation();
        const project = Storage.readProject(getActiveProject());
        const taskCard = e.target.closest(".task-header");
        if (!taskCard) return;
        const task = Storage.readTask(project.type, taskCard.id);
        renderTaskDetails(task);
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
    });
})();

(function () {
    const parent = document.querySelector(".main-nav");
    parent.addEventListener('click', (e) => {
        if (!e.target.matches(".nav-btn")) return;

        const project = Storage.readProject(e.target.id);
        document.querySelector("#header > h1").textContent = project.type;
        Storage.updateActiveProject(project.type);
        renderUI(project);
    });
})();

(function() {
    const deleteBtn = document.querySelector(".delete-task");

    const parent = document.querySelector(".detail-section");
    deleteBtn.addEventListener('click', (e) => {
        if (parent.children) {
            const currProject = getActiveProject();
            const project = Storage.readProject(currProject);
            const task = Storage.readTask(project.type, parent.children[0].id);
            
            project.removeTask(task.id);
            Storage.writeProject(project.type, project);
            
            renderUI(project);
        }
    });
})();

function getActiveProject() {
    return Storage.storage.getItem("active");
}

export function saveTaskToProject(name, task) {
    const project = Storage.readProject(name);
    if (name !== "All-tasks") {
        const project = Storage.readProject("All-tasks");
        project.addTask(task);
        Storage.writeProject(project.type, project);
    }
    project.addTask(task);
    Storage.writeProject(project.type, project);
}

export function loadDefault() {
    if (!Storage.storage.getItem("All-tasks")) {
        const project = new Project();
        project.type = "All-tasks";

        Storage.writeProject(project.type, project);
        Storage.updateActiveProject(project.type);
    }

    for (const project in { ...Storage.storage }) {
        if (project !== "active") {
            const proj = JSON.parse(Storage.storage[project]);
            renderTab(proj);
        }
    }

    const active = Storage.storage.getItem("active");
    const project = Storage.readProject(active);

    document.querySelector("#header > h1").textContent = active;
    renderUI(project);
}

function renderUI(project) {
    const details = document.querySelector(".detail-section");
    if (details.children) details.innerHTML = ``;
    clearUI();
    projectSection(project);
    renderTasks(project, project.tasks);
}
