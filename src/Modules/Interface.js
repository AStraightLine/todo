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
    _allToDos.push(ToDo('Wake up', 'Get up now.', '23.06.1995', 'High', 'Daily Routine'));
    _allToDos.push(ToDo('Brush teeth', 'Do it Well, do it often.', '23.06.1995', 'High', 'Daily Routine'));
    _allToDos.push(ToDo('Make this app', "It won't make itself.", '23.06.1995', 'High', 'The Odin Project'));

    //title, desc, due, prio, complete

    // add new Todo and Project objects to array of Todos and Projects after they've been created.
    const _addToDo = (newTodo) => {
        _allToDos.push(newTodo);
    };

    const _addProject = (newProject) => {
        _allProjects.push(newProject);
    };

    const _getProject = (project) => {
        for(let i = 0; i < _allProjects.length; i++) {
            if(_allProjects[i].getTitle() == project) {
                return _allProjects[i];
            }
        };
    };

    // create new todo and project objects
    const newToDo = (title, desc, due, prio, project) => {
        const _newToDo = ToDo(title, desc, due, prio, project);
        _allToDos.push(_newToDo);
        if(project) {
            const _project = _getProject(project);
            _project.addTodo(_newToDo);
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