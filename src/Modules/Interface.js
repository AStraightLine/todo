import {Project} from './Project'
import {ToDo} from './ToDo'
import {UI} from './UI'

// Middle man between UI, Projects and ToDos
// Perhaps more of a controller too.
export const Interface = (() => {

    let _allToDos = [];
    let _allProjects = [];

    // add new Todo and Project objects to array of Todos and Projects after they've been created.
    const _addToDo = (newTodo) => {
        _allToDos.push(newTodo);
    };

    const _addProject = (newProject) => {
        _allProjects.push(newProject);
    };

    const getProject = (project) => {
        if (project == '_allToDos' || project == '') {
            return _allToDos;
        } else {
            for(let i = 0; i < _allProjects.length; i++) {
                if(_allProjects[i].getTitle() == project) {
                    return _allProjects[i];
                }
            };
        };
    };

    // create new todo and project objects
    const newToDo = (title, desc, due, prio, project) => {
        const _newToDo = ToDo(title, desc, due, prio, project);
        _allToDos.push(_newToDo);
        if(project) {
            const _project = getProject(project);
            _project.addToDo(_newToDo);
        }
    };

    const newProject = (title) => {
        _allProjects.push(Project(title));
    };

    const getAllToDos = () => _allToDos;
    const getAllProjects = () => _allProjects;

    // For testing purposes populating _allProjects with a few mocks
    _allProjects.push(Project('Daily Routine'));
    _allProjects.push(Project('The Odin Project'));

    // And populate those with some toDos
    newToDo('Wake up', 'Get up now.', '23.06.1995', 'High', 'Daily Routine');
    newToDo('Brush teeth', 'Do it Well, do it often.', '23.06.1995', 'High', 'Daily Routine');
    newToDo('Make this app', "It won't make itself.", '23.06.1995', 'High', 'The Odin Project');

    return {
        newToDo,
        newProject,
        getAllToDos,
        getAllProjects,
        getProject,
    };
})();