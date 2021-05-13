import {Project} from './Project'
import {ToDo} from './ToDo'
import {UI} from './UI'

// Middle man between UI, Projects and ToDos
// Perhaps more of a controller too.
export const Interface = (() => {

    let _allToDos = [];
    let _allProjects = [];

    // For testing purposes populating _allProjects with a few mocks
    _allProjects.push(Project('Daily Routine'));
    _allProjects.push(Project('The Odin Project'));
    // And populate those with some toDos
    _allToDos.push(ToDo('Wake up', 'Get up now.', '23/june/1995', 'Medium', false));
    _allToDos.push(ToDo('Brush teeth', 'Do it Well, do it often.', '23/june/1995', 'Low', false));
    _allToDos.push(ToDo('Make this app', "It won't make itself.", '23/june/1995', 'High', false));

    //title, desc, due, prio, complete

    // add new Todo and Project objects to array of Todos and Projects after they've been created.
    const _addToDo = (newTodo) => {
        _allToDos.push(newTodo);
    };

    const _addProject = (newProject) => {
        _allProjects.push(newProject);
    };

    const _getProject = (project) => {
        const _project = _allProjects.filter(obj => {
            obj.getTitle() == project;
        });
        return _project;
    };

    // create new todo and project objects
    const newToDo = (title, desc, due, prio, complete, project) => {
        _allToDos.push(ToDo(title, desc, due, prio, complete));
        if(project) {
            const _project = _getProject();
            _project[0].addTodo(_newTodo);
        }
    };

    const newProject = (title) => {
        _allProjects.push(Project(title));
    };

    const getAllToDos = () => _allToDos;
    const getAllProjects = () => _allProjects;

    return {
        newToDo,
        newProject,
        getAllToDos,
        getAllProjects,
    };
})();