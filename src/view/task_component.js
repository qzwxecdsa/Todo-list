import { createElement } from '../framework/render.js';
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskComponentTemplate(task) {
    const { title, id } = task;
    return (
        `<ul class="task-list">
            <li class="task_card" data-task-id="${id}">${title}</li>
        </ul>`
    );
}

export default class TaskComponent extends AbstractComponent {
    constructor({ task }) {
        super();
        this.task = task;
        this.#afterCreateElement();
    }

    get template() {
        return createTaskComponentTemplate(this.task);
    }

    #afterCreateElement() {
        this.#makeTaskDraggable();
    }

    #makeTaskDraggable() {
        const taskElement = this.element.querySelector('.task_card');
        taskElement.setAttribute('draggable', true);
        
        taskElement.addEventListener('dragstart', (event) => {
            taskElement.classList.add('dragging');
            event.dataTransfer.setData('text/plain', this.task.id);
        });

        taskElement.addEventListener('dragend', () => {
            taskElement.classList.remove('dragging');
        });
    }
}