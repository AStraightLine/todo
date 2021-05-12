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

    const initUI = () => {
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
        // working time to implement
        _closeNewProjectForm();
    };

    return {
        initUI,
    }

})();
