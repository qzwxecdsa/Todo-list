import { AbstractComponent } from '../framework/view/abstract-component.js';

function createClearButtonComponentTemplate() {
    return (
        `<div class='del_column button'>
            <button class="clear-btn">✕ Очистить</button> 
        </div>`
    );
}

export default class ClearButtonComponent extends AbstractComponent {
    #handleClick = null;

    constructor({ onClick }) {
        super();
        this.#handleClick = onClick;
        
        // Добавляем обработчик после того как элемент создан
        this.element.addEventListener('click', this.#clickHandler);
    }

    get template() {
        return createClearButtonComponentTemplate();
    }

    #clickHandler = (evt) => {
        // Проверяем, что кликнули именно по кнопке
        if (evt.target.classList.contains('clear-btn')) {
            evt.preventDefault();
            this.#handleClick();
        }
    }
}