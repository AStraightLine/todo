import {Interface} from './Interface'
import {format, formatDistance, formatRelative, subDays} from 'date-fns'

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

    let _currentProjectSelection;

    const initUI = () => {
        _currentProjectSelection = Interface.getAllToDos();
        _highlightProjectSelection('allSelection');
        _populateToDoDisplay(_currentProjectSelection);
        _populateProjectsDisplay();
        _initListeners();
        _populateToDoFormProjectOptions(Interface.getAllProjects());
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

    const _highlightProjectSelection = (selectionID) => {
        const selection = document.getElementById(selectionID);
        selection.classList.toggle('projectSelected');
    }

    const _removeHighlightProjectSelection = () => {
        const previousSelected = document.getElementsByClassName('projectSelected');
        previousSelected.classList.toggle('projectSelection');
    }

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
        const _titleInput = document.getElementById('toDoTitleInput').value;
        const _DescInput = document.getElementById('toDoDescriptionInput').value;
        let _dueInput = document.getElementById('toDoDueDateInput').valueAsDate;
        _dueInput = format(_dueInput, 'dd.MM.yyyy');
        const _prioInput = document.getElementById('toDoPrioritySelect').value;
        const _projectInput = document.getElementById('toDoProjectSelect').value;

        Interface.newToDo(_titleInput, _DescInput, _dueInput, _prioInput, _projectInput);

        // Update ToDos Display
        _clearToDosDisplay();
        _populateToDoDisplay(_currentProjectSelection);

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

            _project.setAttribute('id', _projectTitle + 'selection');
            _project.classList.add('project');
            _project.textContent = _projectTitle;
            _projectsContainer.appendChild(_project);
        };
    };

    const _clearToDosDisplay = () => {
        while (_toDosContainer.firstChild) {
            _toDosContainer.removeChild(_toDosContainer.lastChild);
        }
    };

    const _populateToDoDisplay = (project) => {
        // Reverse so newest ToDos at the top
        for(let i =  project.length; i > 0; i--) {
            // To Do Container
            const _toDoContainer = document.createElement('div');
            _toDoContainer.setAttribute('id', project[i-1].getTitle() + 'toDo');
            _toDoContainer.classList.add('toDoContainer');

            // To Do properties
            const _toDoTitle = document.createElement('div');
            _toDoTitle.classList.add('toDoTitle');
            _toDoTitle.textContent = project[i-1].getTitle();

            const _toDoDesc = document.createElement('div');
            _toDoDesc.classList.add('toDoDesc');
            _toDoDesc.textContent = project[i-1].getDesc();

            const _toDoDue = document.createElement('div');
            _toDoDue.classList.add('toDoDue');
            _toDoDue.textContent = project[i-1].getDue();

            // Apply colour switching class based on priority
            const _toDoPrio = project[i-1].getPrio();
            switch (_toDoPrio) {
                case 'Low':
                case 'low':
                    _toDoContainer.classList.add('toDoLowPrio');
                    break;
                case 'Medium':
                case 'medium':
                    _toDoContainer.classList.add('toDoMediumPrio');
                    break;
                case 'High':
                case 'medium:':
                    _toDoContainer.classList.add('toDoHighPrio');
                    break;
            };

            // project[i].getComplete();
            // Change display color based on complete status
            

            // Add Properties to container
            _toDoContainer.appendChild(_toDoTitle);
            _toDoContainer.appendChild(_toDoDesc);
            _toDoContainer.appendChild(_toDoDue);

            // Add container to DOM
            _toDosContainer.appendChild(_toDoContainer);
        };
    };

    const _populateToDoFormProjectOptions = (projects) => {
        const _toDoProjectSelect = document.getElementById('toDoProjectSelect');

        for (let i = 0; i < projects.length; i++) {
            const _selectProjectOption = document.createElement('option');
            _selectProjectOption.setAttribute('value', projects[i].getTitle());
            _selectProjectOption.textContent = projects[i].getTitle();
            _toDoProjectSelect.appendChild(_selectProjectOption);
        };
    };

    return {
        initUI,
    }

})();
