import Observable from "../framework/observable.js";
import { UpdateType, UserAction } from "../const.js";
import generateID from "../utils.js";

export default class TasksModel extends Observable {
    #tasksApiService = null;
    #boardTasks = [];

    constructor ({tasksApiService}) {
        super();
        this.#tasksApiService = tasksApiService;

        this.#tasksApiService.tasks.then((tasks) => {
        })
    }

    get tasks() {
        return this.#boardTasks;
    }

    getTasksByStatus(status) {
        return this.tasks.filter(task => task.status === status);
    }

    async addTask(title) {
        const newTask = {
            title,
            status: 'backLog',
            id: generateID(),
        };

        this._notify(UserAction.LOADING_START);

        try {
            const createdTask = await this.#tasksApiService.addTask(newTask);
            this.#boardTasks.push(createdTask);
            this._notify(UserAction.ADD_TASK, createdTask);
            return createdTask;
        } catch(err) {
            console.error("Ошибка при добавлении задачи на сервер:", err);
            throw err;
        } finally {
            this._notify(UserAction.LOADING_END);
        }
    }

    async init() {
        try {
            const tasks = await this.#tasksApiService.tasks;
            this.#boardTasks = tasks;
        } catch(err) {
            this.#boardTasks = [];
        }
        this._notify(UpdateType.INIT)
    }

    deleteTask(taskId) {
        this.#boardTasks = this.#boardTasks.filter(task => task.id !== taskId);
        this._notify(UserAction.DELETE_TASK, {id: taskId});
    }

    async clearBucket() {
        const basketTasks = this.#boardTasks.filter(task => task.status === 'trash');
        this._notify(UserAction.LOADING_START)
        try {
            await Promise.all(basketTasks.map(task => this.#tasksApiService.deleteTask(task.id)));

            this.#boardTasks = this.#boardTasks.filter(task => task.status !== 'trash')
            this._notify(UserAction.DELETE_TASK, {status:'trash'});
        } catch (err) {
            console.error('Ошибка при удаление задач из корзины на сервере: ', err);
            throw err;
        } finally {
            this._notify(UserAction.LOADING_END)
        }
    }

    async updateTaskStatus(taskId, newStatus) {
        const task = this.#boardTasks.find(task => task.id === taskId);
        const previousStatus = task.status;
        if (task) {
            task.status = newStatus;
            this._notify(UserAction.LOADING_START);
            try {
                const updatedTask = await this.#tasksApiService.updateTask(task);
                Object.assign(task, updatedTask);
                this._notify(UserAction.UPDATE_TASK, task);
            } catch (err) {
                console.error('Ошибка при обновлении статуса задачи на сервер: ', err);
                task.status  = previousStatus;
                throw err;
            } finally {
                this._notify(UserAction.LOADING_END);
            }
        }
    }
}
