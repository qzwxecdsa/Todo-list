import { tasks } from "../mock/tasks.js";

export default class TasksModel {
    #boardTasks = tasks;

    get tasks() {
        return this.#boardTasks;
    }
}