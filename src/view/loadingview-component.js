import { AbstractComponent } from "../framework/view/abstract-component.js";

function createNoTaskTemplate() {
    return (
        `<p class=boardNoTasks>
        </p>`
    )
}

export default class LoadingViewComponent extends AbstractComponent {
    get template() {
        return createNoTaskTemplate();
    }
}
