export default class Project {
    constructor(type) {
        this.type = type;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(id) {
        this.tasks = this.tasks.filter(t => {
            return t.id !== id;
        });
    }
}