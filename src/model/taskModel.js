import { tasks } from "../mock/tasks.js";

export default class TasksModel {
    #boardTasks = tasks;

    getTasks() {
        return this.#boardTasks;
    }
}