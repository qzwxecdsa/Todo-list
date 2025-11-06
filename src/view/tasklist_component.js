import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskListComponentTemplate(className, label) {
    return (
        `<div class="${className} backlog_column">
            <h3>${label}</h3>
            <div class="tasks-container">

            </div>
        </div>`
    );
}

export default class TaskListComponent extends AbstractComponent {
    constructor(className, label, status, onTaskDrop) {
        super();
        this.className = className;
        this.label = label;
        this.status = status; 
        this.#setDropHandler(onTaskDrop);
    }

    get template() {
        return createTaskListComponentTemplate(this.className, this.label);
    }

    #setDropHandler(onTaskDrop) {
        const container = this.element;

        container.addEventListener('dragover', (event) => {
            event.preventDefault();
            container.classList.add('drag-over');
        });

        container.addEventListener('dragleave', () => {
            container.classList.remove('drag-over');
        });

        container.addEventListener('drop', (event) => {
            event.preventDefault();
            container.classList.remove('drag-over');
            const taskId = event.dataTransfer.getData('text/plain');

            const afterElement = this.#getDragAfterElement(container, event.clientY);
            const afterTaskId = afterElement?.dataset.taskId ?? null;

            onTaskDrop(taskId, this.status, afterTaskId);
        });
    }

    #getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.task_card:not(.dragging)')]; // Измените на .task_card

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}
}