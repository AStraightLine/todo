import {Project} from './Project'
import {ToDo} from './ToDo'
import {UI} from './UI'

// Middle man between UI, Projects and ToDos
// Perhaps more of a controller too.
const Interface = (() => {

    let _allToDos = [];
    let _allProjects = [];

    // add new Todo and Project objects to array of Todos and Projects after they've been created.
    const _addToDo = (newTodo) => {
        _allToDos.push(newTodo);
    };

    const _addProject = (newProject) => {
        _allProjects.push(newProject);
    };

    // Make new ToDo out of user input
    const newToDo = () => {

    };

    const newProject = () => {

    };

    return {
        newToDo,
        newProject,
    };
})();