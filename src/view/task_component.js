import { createElement } from '../framework/render.js';
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskComponentTemplate(task) {
    const {title} = task;
    return (
        `   <ul class="task-list">
                    <li class="task_card">${title}</li>
                </ul>`
    );
}


export default class TaskComponent extends AbstractComponent{
    constructor({task}) {
        super()
        this.task = task;
    }

    get template() {
        return createTaskComponentTemplate(this.task);
    }
}