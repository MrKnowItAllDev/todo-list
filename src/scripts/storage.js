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

    static readTasks(name) {
        const project = this.readProject(name);
        return project.tasks;
    }

    static updateActiveProject(name) {
        const projectName = JSON.parse(this.storage.getItem("active"));
        if (projectName) this.storage.setItem("active", JSON.stringify(name));
        else this.storage.setItem("active", JSON.stringify(name));
        return projectName;
    }

    static clear() {
        this.storage.clear();
    }
}