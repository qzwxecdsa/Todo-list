import { createElement } from '../framework/render.js';

function createTaskComponentTemplate() {
    return (
        `   <ul class="task-list">
                    <li class="task_card">Название первой задачи</li>
                </ul>`
    );
}


export default class TaskComponent {
    getTemplate() {
        return createTaskComponentTemplate();
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