import HeaderComponent from './view/headerComponent.js';
import {render, RenderPosition} from './framework/render.js';
import AddTaskFormComponent from './view/addtaskform_component.js';
import TaskBoardComponent from './view/taskboard_component.js';
import TaskListComponent from './view/tasklist_component.js';
import TaskComponent from './view/task_component.js';


const headerContainer = document.querySelector('.header');
const addTaskFormContainer = document.querySelector('.task');
const taskBoardContainer = document.querySelector('.board_container');

const taskBoardComponent = new TaskBoardComponent();

render(new HeaderComponent(), headerContainer);
render(new AddTaskFormComponent(), addTaskFormContainer); 
render(taskBoardComponent, taskBoardContainer);

for (let j=0; j<4;j++) {
    const taskListComponent = new TaskListComponent();

    render(taskListComponent, taskBoardComponent.getElement());

    for (let i=0;i<4;i++) {
        render(new TaskComponent(), taskListComponent.getElement());
    }

}