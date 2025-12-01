import "../style.css";
import Project from "./project";
import Task from "./task";
import Storage from "./storage";
import { saveTaskToProject, loadDefault } from "./events";
import {projectSection, renderTab, renderTasks } from "./ui";


window.addEventListener('DOMContentLoaded', (e) => {
    loadDefault();
})
