export class Project {
    constructor(type, pType) {
        this.type = type;
        this.pType = pType;
        this.tasks = {};
    }

    addTask(task) {
        this.tasks[task.title] = task;
    }

    removeTask(task) {
        delete this.tasks[task.title];
    }
}