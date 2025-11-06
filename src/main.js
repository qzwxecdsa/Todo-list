import HeaderComponent from './view/headerComponent.js';
import {render, RenderPosition} from './framework/render.js';
import AddTaskFormComponent from './view/addtaskform_component.js';
import TaskBoardPresenter from './presenter/task-board-presenter.js';
import TasksModel from './model/taskModel.js';
import TasksApiService from './tasks-api-service.js';

const END_POINT = 'https://690cd118a6d92d83e84f89c2.mockapi.io';
const headerContainer = document.querySelector('.header');

const addTaskFormContainer = document.querySelector('.task');
const taskBoardContainer = document.querySelector('.board_container');

const tasksModel = new TasksModel({
    tasksApiService: new TasksApiService(END_POINT)
});

const taskBoardPresenter = new TaskBoardPresenter({boardContainer: taskBoardContainer, tasksModel});

const formAddTaskComponent = new AddTaskFormComponent({
    onClick: handleNewTaskButtonClick
});

function handleNewTaskButtonClick() {
    taskBoardPresenter.createTask();
}

render(new HeaderComponent(), headerContainer);
render(formAddTaskComponent, addTaskFormContainer); 

taskBoardPresenter.init();
