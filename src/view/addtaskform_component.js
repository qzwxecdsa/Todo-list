import { createElement } from '../framework/render.js';

function createAddTaskFormComponentTemplate() {
    return (
        `   <div class="task">
            <h2 class="task_title">Новая задача</h2>
            <div class="input-group">
                <input type="text" class="task_input" placeholder="Название задачи ...">
                <button class="task_button">+ Добавить</button>
            </div>
        </div>`
    );
}


export default class AddTaskFormComponent {
    getTemplate() {
        return createAddTaskFormComponentTemplate();
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