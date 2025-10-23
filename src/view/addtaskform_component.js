import { createElement } from '../framework/render.js';
import { AbstractComponent } from '../framework/view/abstract-component.js';

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


export default class AddTaskFormComponent extends AbstractComponent{
    get template() {
        return createAddTaskFormComponentTemplate();
    }
}