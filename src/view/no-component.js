import { AbstractComponent } from '../framework/view/abstract-component.js';

function createPlugComponentTemplate() {
    return (
        `<div class='no_Task'>   
            Задач нет
        </div>`
      );
}

export default class PlugComponent extends AbstractComponent{
  get template() {
    return createPlugComponentTemplate();
  }
}