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
}