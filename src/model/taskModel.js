import { tasks } from "../mock/tasks.js";
import generateID from "../utils.js";

export default class TasksModel {
    #boardTasks = tasks;
    #observers = [];

    get tasks() {
        return this.#boardTasks;
    }

    getTasksByStatus(status) {
        return this.tasks.filter(task => task.status === status);
    }

    addTask(title) {
        const newTask = {
            title,
            status: 'backLog',
            id: generateID(),
        };

        this.#boardTasks.push(newTask);
        this._notifyObservers();
        return newTask;
    }

    clearBucket() {
        this.#boardTasks = this.#boardTasks.filter(task => task.status !== 'trash');
        this._notifyObservers();
    }

    addObserver(observer) {
        this.#observers.push(observer);
    }

    removeObserver(observer) {
        this.#observers = this.#observers.filter((obs) => obs !== observer);
    }

    _notifyObservers() {
        this.#observers.forEach((observer) => observer())
    }

    updateTaskStatus(taskId, newStatus, afterTaskId = null) {
        const task = this.#boardTasks.find(task => task.id === taskId);
        if (!task) return;

        task.status = newStatus;

        this.#boardTasks = this.#boardTasks.filter(t => t.id !== taskId);

        if (afterTaskId) {
            const index = this.#boardTasks.findIndex(t => t.id === afterTaskId);
            if (index !== -1) {
                this.#boardTasks.splice(index, 0, task);
            } else {
                this.#boardTasks.push(task);
            }
        } else {
            this.#boardTasks.push(task);
        }

        this._notifyObservers();
    }
}