import Project from "./project";

export default class Storage {
    static storage = localStorage;

    static writeProject(name, project) {
        this.storage.setItem(name, JSON.stringify(project));
    }

    static readProject(name) {
        const data = JSON.parse(this.storage.getItem(name));
        return Object.assign(new Project(), data);
    }

    static deleteProject(name) {
        this.storage.removeItem(name);
    }

    static writeTask(name, task) {
        const project = this.readProject(name);
        project.addTask(task);
        this.storage.setItem(project.type, project);
    }

    static readTask(name, id) {
        const project = this.readProject(name);
        return project.tasks.find(task => task.id === id);
    }

    static updateActiveProject(name) {
        this.storage.setItem("active", name);
    }

    static clear() {
        this.storage.clear();
    }
}