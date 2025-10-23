import { AbstractComponent } from '../framework/view/abstract-component.js';

function createPlugComponentTemplate() {
    return (
        `<div class='no_Task'>   
            Перетащите карточку
        </div>`
      );
}

export default class PlugComponent extends AbstractComponent{
  get template() {
    return createPlugComponentTemplate();
  }
}