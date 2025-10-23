import TaskListComponent from "../view/tasklist_component.js";
import TaskComponent from "../view/task_component.js";
import TaskBoardComponent from "../view/taskboard_component.js";
import { render } from "../framework/render.js";
import { Status, StatusLabel } from "../const.js";
import ClearButtonComponent from "../view/clearbutton_component.js";
import PlugComponent from "../view/no-component.js";

export default class TaskBoardPresenter {
    taskListComponent = new TaskListComponent();

    #clearBtnComponent = new ClearButtonComponent();
    #boardContainer = null;
    #tasksModel = null;

    #tasksBoardComponent = new TaskBoardComponent();
    #boardTasks = [];

    constructor({ boardContainer, tasksModel}) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
    }

    init() {
        this.#boardTasks = [...this.#tasksModel.tasks];
        this.#renderBoard()
    }

    #renderTask(task, container) {
        const taskComponent = new TaskComponent({task});
        render(taskComponent, container);
    }

    #renderTasksList(status, container) {
        const tasksListComponent = new TaskListComponent(status, StatusLabel[status]);
        render(tasksListComponent, container)
        return tasksListComponent
    }

    #renderClearButton(status, container) {
        if (status === Status.TRASH) {
            render(this.#clearBtnComponent, container)
        }
    }

    #renderPlugComponent(tasks, container) {
        if (tasks.length === 0) {
            const plugComponent = new PlugComponent();
            render(plugComponent, container);
        }
    }

    #renderBoard() {
        render(this.#tasksBoardComponent, this.#boardContainer);
        Object.values(Status).forEach(element => {
            const tasksListComponent = this.#renderTasksList(element, this.#tasksBoardComponent.element);

            const filteredTasks = this.#boardTasks.filter(task => task.status === element); 
            
            this.#renderPlugComponent(filteredTasks, tasksListComponent.element)

            for (let j = 0; j < filteredTasks.length; j++) {
                this.#renderTask(filteredTasks[j], tasksListComponent.element)
            }

            this.#renderClearButton(element, tasksListComponent.element)
        });
    }
}