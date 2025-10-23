import { AbstractComponent } from '../framework/view/abstract-component.js';

function createClearButtonComponentTemplate() {
    return (
        `<div class='del_column button'>
                <button>✕ Очистить </button> 
                </div>`
    );
}

export default class ClearButtonComponent extends AbstractComponent{
    get template() {
        return createClearButtonComponentTemplate();
    }
}