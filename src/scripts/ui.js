
// Read project from localstorage and display
export function projectSection(project) {
    const parent = document.querySelector(".task-content");
    const todoSection = progressSection("To-Do");
    const doingSection = progressSection("Doing");
    const doneSection = progressSection("Done");

    todoSection.setAttribute("id", "to-do");
    doingSection.setAttribute("id", "doing");
    doneSection.setAttribute("id", "done");

    [todoSection, doingSection, doneSection].forEach(section => {
        section.classList.add(`${project.type}`);
        parent.appendChild(section);
    });
}

// Render all tasks
// Display task in correct container (Project, Progress)
export function renderTasks(project, tasks) {
    for (const task of tasks) {
        const parent = document.querySelector(`#${task.progress.toLowerCase()}.${project.type} > .tasklist`);
        const container = document.createElement("section");
        const prioritySection = document.createElement("section");
        const descSection

        const heading = document.createElement("h2");
        const desc = document.createElement("p");

        heading.textContent = `${task.title}`;
        desc.textContent = `${task.dueDate}`;
        container.setAttribute("id", task.id);
        prioritySection.classList.add("priority");
        container.classList.add("task-header");

        prioritySection.style.backgroundColor = task.priority === "high" ?
            '#EF4444' : task.priority === "medium" ?
                '#F97316' : '#10B981';

        container.appendChild(heading);
        container.appendChild(prioritySection);
        container.appendChild(desc);

        parent.appendChild(container);
    }
}

function progressSection(type) {
    const section = document.createElement("section");
    const headerSection = document.createElement("section");
    const taskList = document.createElement("section");
    const btnSection = document.createElement("section");

    const header = document.createElement("h1");
    const button = document.createElement("button");

    button.textContent = "Add Task";
    button.classList.add("add-task");
    header.textContent = type;

    taskList.classList.add("tasklist");

    headerSection.appendChild(header);
    btnSection.appendChild(button);
    section.appendChild(headerSection);
    section.appendChild(taskList);
    section.appendChild(btnSection);

    return section;
}

export function hideTaskModal() {
    const modal = document.querySelector(".task-modal");
    modal.classList.remove("displayed");
    modal.classList.add("hidden");
}

export function displayTaskModal() {
    const modal = document.querySelector(".task-modal");
    modal.classList.remove("hidden");
    modal.classList.add("displayed");
}

export function displayProjectModal() {
    const modal = document.querySelector(".project-modal");
    modal.classList.remove("hidden");
    modal.classList.add("displayed");
}

export function hideProjectModal() {
    const modal = document.querySelector(".project-modal");
    modal.classList.remove("displayed");
    modal.classList.add("hidden");
}

export function renderTab(project) {
    const parent = document.querySelector(".main-nav");
    const tab = document.createElement("section");

    tab.setAttribute("id", `${project.type}`);
    tab.textContent = `${project.type}`;
    tab.classList.add("btn");
    tab.classList.add("nav-btn");

    parent.appendChild(tab);
}

export function clearUI() {
    const parent = document.querySelector(".task-content");
    for (const child of Array.from(parent.children)) {
        if (child.tagName !== "DIALOG") {
            parent.removeChild(child);
        }
    }
}