export const UI = (() => {

    const _newProjectButton = document.getElementById('newProjectButton');

    const _newProjectFormContainer = document.getElementById('newProjectFormContainer');
    const _clearNewProjectFormButton = document.getElementById('clearFieldsButton');
    const _closeFormButton = document.getElementById('closeFormButton');

    const _projectNameInput = document.getElementById('projectNameInput');

    const initUI = () => {
        _initListeners();
    };

    const _initListeners = () => {
        _newProjectButton.addEventListener('click', _openNewProjectForm);
        _clearNewProjectFormButton.addEventListener('click', _clearNewProjectFormFields);
        _closeFormButton.addEventListener('click', _closeNewProjectForm);
    };

    const _openNewProjectForm = () => {
        _newProjectFormContainer.style.display = 'flex';
    };

    const _closeNewProjectForm = () => {
        _newProjectFormContainer.style.display = 'none';
    };

    const _clearNewProjectFormFields = () => {
        _projectNameInput.textContent = null;
        _projectNameInput.value = null;
        // If more inputs are added later, clear them too. 
    };

    const _addProjectSubmit = () => {
        // Do something with the data
        // then
        _closeNewProjectForm();
    };

    return {
        initUI,
    }

})();
