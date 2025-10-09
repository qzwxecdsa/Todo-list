import { createElement } from '../framework/render.js';

function createClearButtonComponentTemplate() {
    return (
        `<div class='del_column button'>
                <button>✕ Очистить </button> 
                </div>`
    );
}

export default class ClearButtonComponent {
    getTemplate() {
        return createClearButtonComponentTemplate();
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