import {Interface} from './Interface'

export const UI = (() => {

    // Open form buttons
    const _addToDoButton = document.getElementById('addToDoButton');
    const _newProjectButton = document.getElementById('newProjectButton');

    // ToDo form containers and buttons
    const _newToDoForm = document.getElementById('newToDoForm');
    const _toDoFormModal = document.getElementById('toDoFormModal');
    const _closeToDoFormButton = document.getElementById('closeToDoFormButton');
    const _clearToDoFieldsButton = document.getElementById('clearToDoFieldsButton');

    // ToDo form inputs
    const _toDoTitleInput = document.getElementById('toDoTitleInput');

    // Project form containers and buttons
    const _newProjectForm = document.getElementById('newProjectForm');
    const _newProjectFormContainer = document.getElementById('newProjectFormContainer');
    const _clearNewProjectFormButton = document.getElementById('clearFieldsButton');
    const _closeFormButton = document.getElementById('closeFormButton');

    // Project form inputs
    const _projectNameInput = document.getElementById('projectNameInput');

    // Area to populate with ToDos based on project selection (default 'All')
    const _toDosContainer = document.getElementById('toDosContainer');

    //Area to popualte with clickable project names
    const _projectsContainer = document.getElementById('projectsContainer');

    const initUI = () => {
        _populateToDoDisplay(Interface.getAllToDos());
        _populateProjectsDisplay();
        _initListeners();
    };

    const _initListeners = () => {
        _addToDoButton.addEventListener('click', _openToDoForm);
        _closeToDoFormButton.addEventListener('click', _closeToDoForm);
        _clearToDoFieldsButton.addEventListener('click', _clearToDoForm);
        _newProjectButton.addEventListener('click', _openNewProjectForm);
        _clearNewProjectFormButton.addEventListener('click', _clearNewProjectFormFields);
        _closeFormButton.addEventListener('click', _closeNewProjectForm);

        _newToDoForm.addEventListener('submit', function(e) {
            _addToDoSubmit();
            e.preventDefault();
        });

        _newProjectForm.addEventListener('submit', function(e) {
            _addProjectSubmit();
            e.preventDefault();
        });
    };

    const _openToDoForm = () => {
        _toDoFormModal.style.display = 'flex';
        _toDoFormModal.style.justifyContent = 'center';
        _toDoFormModal.style.alignItems = 'center';
    }

    const _closeToDoForm = () => {
        _toDoFormModal.style.display = 'none';
        _clearToDoForm();
    }

    const _clearToDoForm = () => {
        _toDoTitleInput.textContent = null;
        _toDoTitleInput.value = null;
        // If more inputs are added later, clear them too. 
    }

    const _addToDoSubmit = () => {
        // Do something with the data
        // Then
        _closeToDoForm();
    }

    const _openNewProjectForm = () => {
        _newProjectFormContainer.style.display = 'flex';
    };

    const _closeNewProjectForm = () => {
        _newProjectFormContainer.style.display = 'none';
        // Clear it too
        _clearNewProjectFormFields();
    };

    const _clearNewProjectFormFields = () => {
        _projectNameInput.textContent = null;
        _projectNameInput.value = null;
        // If more inputs are added later, clear them too. 
    };

    const _addProjectSubmit = () => {
        const _titleInput = document.getElementById('projectNameInput').value;
        Interface.newProject(_titleInput);
        
        _closeNewProjectForm();
    };

    const _populateProjectsDisplay = () => {
        for(let i = 0; i < Interface.getAllProjects().length; i++) {
            const _projectTitle = Interface.getAllProjects()[i].getTitle();
            const _project = document.createElement('li');

            _project.setAttribute('id', 'project' + _projectTitle);
            _project.classList.add('project');
            _project.textContent = _projectTitle;
            _projectsContainer.appendChild(_project);
        };
    };

    const _populateToDoDisplay = (project) => {
        for(let i = 0; i < project.length; i++) {
            // To Do Container
            const _toDoContainer = document.createElement('div');
            _toDoContainer.setAttribute('id', project[i].getTitle() + 'toDo');
            _toDoContainer.classList.add('toDoContainer');

            // To Do properties
            const _toDoTitle = document.createElement('div');
            _toDoTitle.classList.add('toDoTitle');
            _toDoTitle.textContent = project[i].getTitle();

            const _toDoDesc = document.createElement('div');
            _toDoDesc.classList.add('toDoDesc');
            _toDoDesc.textContent = project[i].getDesc();

            const _toDoDue = document.createElement('div');
            _toDoDue.classList.add('toDoDue');
            _toDoDue.textContent = project[i].getDue();

            const _toDoPrio = document.createElement('div');
            _toDoPrio.classList.add('toDoPrio');
            _toDoPrio.textContent = project[i].getPrio();

            const _toDoComplete = document.createElement('div');
            _toDoComplete.classList.add('toDoComplete');
            _toDoComplete.textContent = project[i].getComplete();

            // Add Properties to container
            _toDoContainer.appendChild(_toDoTitle);
            _toDoContainer.appendChild(_toDoDesc);
            _toDoContainer.appendChild(_toDoDue);
            _toDoContainer.appendChild(_toDoPrio);
            _toDoContainer.appendChild(_toDoComplete);

            // Add container to DOM
            _toDosContainer.appendChild(_toDoContainer);
        };
    };

    return {
        initUI,
    }

})();
