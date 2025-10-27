export class Task {
    constructor(title, description, notes, dueDate, progress, priority) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.created = null;
        this.notes = notes;
        this.dueDate = dueDate;
        this.progress = progress;
        this.tags = {};
        this.priority = priority;
    }
}