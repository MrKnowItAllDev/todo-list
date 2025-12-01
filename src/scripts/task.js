export default class Task {
    constructor(title, description, created, dueDate, notes, progress) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.created = created;
        this.dueDate = dueDate;
        this.notes = notes;
        this.progress = progress;
        this.tags = {};
    }

    editTask(title, description, dueDate, notes) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.notes = notes;
    }
}