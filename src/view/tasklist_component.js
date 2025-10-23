import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskListComponentTemplate(className, label) {
    return (
        `   <div class="${className} backlog_column">
                <h3>${label}</h3>
            </div>`
    );
}


export default class TaskListComponent extends AbstractComponent{
    constructor(className, label) {
        super()
        this.className = className;
        this.label = label;
    }

    get template() {
        return createTaskListComponentTemplate(this.className, this.label);
    }
}