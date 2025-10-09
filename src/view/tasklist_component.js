import { createElement } from '../framework/render.js';

function createTaskListComponentTemplate() {
    return (
        `   <div class="backlog_column">
                <h3>Название блока</h3>
            </div>`
    );
}


export default class TaskListComponent {
    getTemplate() {
        return createTaskListComponentTemplate();
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