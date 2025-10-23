import HeaderComponent from './view/headerComponent.js';
import {render, RenderPosition} from './framework/render.js';
import AddTaskFormComponent from './view/addtaskform_component.js';
import TaskBoardPresenter from './presenter/task-board-presenter.js';
import TasksModel from './model/taskModel.js';

const headerContainer = document.querySelector('.header');
const addTaskFormContainer = document.querySelector('.task');
const taskBoardContainer = document.querySelector('.board_container');

const tasksModel = new TasksModel();
const taskBoardPresenter = new TaskBoardPresenter({boardContainer: taskBoardContainer, tasksModel});

// Создаем экземпляр класса (без скобок вызова)
const formAddTaskComponent = new AddTaskFormComponent({
    onClick: handleNewTaskButtonClick
});

function handleNewTaskButtonClick() {
    taskBoardPresenter.createTask();
}

render(new HeaderComponent(), headerContainer);
// Передаем экземпляр, а не результат вызова функции
render(formAddTaskComponent, addTaskFormContainer); 

taskBoardPresenter.init();
