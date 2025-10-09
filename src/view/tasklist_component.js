import { createElement } from '../framework/render.js';

function createTaskListComponentTemplate(className, label) {
    return (
        `   <div class="${className} backlog_column">
                <h3>${label}</h3>
            </div>`
    );
}


export default class TaskListComponent {
    constructor(className, label) {
        this.className = className;
        this.label = label;
    }

    getTemplate() {
        return createTaskListComponentTemplate(this.className, this.label);
    }

    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate());
        }


        return this.element;
    }


    removeElement() {
        this.element = null;
    }
}