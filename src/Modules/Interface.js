import { Project } from './Project'
import { ToDo } from './ToDo'
import { format } from 'date-fns'

// Middle man between UI, Projects and ToDos
// Perhaps more of a controller too.
export const Interface = (() => {
    let _allToDos = []
    let _allProjects = []
    let _todayToDos = []

    const removeToDo = (toDo) => {
        _allToDos = _allToDos.filter((title) => !(title.getTitle() === toDo))
        _todayToDos = _todayToDos.filter(
            (title) => !(title.getTitle() === toDo)
        )

        for (let i = 0; i < _allProjects.length; i++) {
            for (let j = 0; j < _allProjects[i].getToDos().length; j++) {
                if (_allProjects[i].getToDos()[j].getTitle() === toDo) {
                    _allProjects[i].removeToDo(toDo)
                }
            }
        }
        _populateStorage()
    }

    const getProject = (project) => {
        if (project === '_allToDos' || project === '') {
            return _allToDos
        } else if (project === '_todayToDos') {
            return _todayToDos
        } else {
            for (let i = 0; i < _allProjects.length; i++) {
                if (_allProjects[i]._title === project) {
                    return _allProjects[i]
                }
            }
        }
    }

    // create new todo and project objects
    const newToDo = (title, desc, due, prio, formDue, project) => {
        const _newToDo = ToDo(title, desc, due, prio, formDue, project)
        _allToDos.push(_newToDo)
        if (project) {
            const _project = getProject(project)
            _project.addToDo(_newToDo)
        }
        const today = format(new Date(), 'dd.MM.yyyy')
        if (due === today) {
            _todayToDos.push(_newToDo)
        }
        _populateStorage()
    }

    const _assignToProjects = (todo) => {
        const project = todo.getProject()
        for (let i = 0; i < _allProjects.length; i++) {
            if (_allProjects[i].getTitle() === project) {
                _allProjects[i].addToDo(todo)
                return
            }
        }
    }

    const newProject = (title) => {
        _allProjects.push(Project(title))
        _populateStorage()
    }

    const getAllToDos = () => _allToDos
    const getAllProjects = () => _allProjects

    const initStorage = () => {
        // If local storage is available.
        if (_storageAvailable('localStorage')) {
            if (localStorage.length) {
                _storageRetrieve()
            } else {
                // Populate some example data
                let newProject = Project('Daily Routine')
                _allProjects.push(newProject)
                newProject = Project('The Odin Project')
                _allProjects.push(newProject)

                // And populate those with some toDos
                let newTodo = ToDo(
                    'Wake up',
                    'Get up now.',
                    '23.06.1995',
                    'Medium',
                    '1995-06-23',
                    'Daily Routine'
                )
                _allToDos.push(newTodo)
                newTodo = ToDo(
                    'Brush teeth',
                    'Do it Well, do it often.',
                    '23.06.1995',
                    'High',
                    '1995-06-23',
                    'Daily Routine'
                )
                _allToDos.push(newTodo)
                newTodo = ToDo(
                    'Make this app',
                    "It won't make itself.",
                    format(new Date(), 'dd.MM.yyyy'),
                    'High',
                    '2021-05-15',
                    'The Odin Project'
                )
                _allToDos.push(newTodo)
                _todayToDos.push(newTodo)

                _populateStorage()
            }
        }
    }

    const _populateStorage = () => {
        localStorage.setItem('_allToDos', JSON.stringify(_allToDos))
        localStorage.setItem('_todayToDos', JSON.stringify(_todayToDos))
        localStorage.setItem('_allProjects', JSON.stringify(_allProjects))
    }

    const _storageRetrieve = () => {
        let _storageReturn = JSON.parse(localStorage.getItem('_allProjects'))
        for (let i = 0; i < _storageReturn.length; i++) {
            const _project = Project(_storageReturn[i]._title)
            _allProjects[i] = _project
        }

        _storageReturn = JSON.parse(localStorage.getItem('_allToDos'))
        for (let i = 0; i < _storageReturn.length; i++) {
            const _todo = ToDo(
                _storageReturn[i]._title,
                _storageReturn[i]._desc,
                _storageReturn[i]._due,
                _storageReturn[i]._prio,
                _storageReturn[i]._formDue,
                _storageReturn[i]._project
            )
            _allToDos[i] = _todo
            _assignToProjects(_todo)
        }

        _storageReturn = JSON.parse(localStorage.getItem('_todayToDos'))
        for (let i = 0; i < _storageReturn.length; i++) {
            const _todo = ToDo(
                _storageReturn[i]._title,
                _storageReturn[i]._desc,
                _storageReturn[i]._due,
                _storageReturn[i]._prio,
                _storageReturn[i]._formDue,
                _storageReturn[i]._project
            )
            _todayToDos[i] = _todo
        }
    }

    // Detect whether local storage is available and supported
    const _storageAvailable = (type) => {
        let storage
        try {
            storage = window[type]
            const x = '__storage_test__'
            storage.setItem(x, x)
            storage.removeItem(x)
            return true
        } catch (e) {
            return (
                e instanceof DOMException &&
                // everything except Firefox
                (e.code === 22 ||
                    // Firefox
                    e.code === 1014 ||
                    // test name field too, because code might not be present
                    // everything except Firefox
                    e.name === 'QuotaExceededError' ||
                    // Firefox
                    e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                storage &&
                storage.length !== 0
            )
        }
    }

    return {
        newToDo,
        newProject,
        getAllToDos,
        getAllProjects,
        getProject,
        removeToDo,
        initStorage,
    }
})()
