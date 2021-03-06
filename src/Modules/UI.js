import { Interface } from './Interface'
import { format } from 'date-fns'

export const UI = (() => {
    // Mobile nav selection
    const _hamburgerMenuIcon = document.getElementById('hamburgerMenuIcon')

    // Side Nav
    const _sideNavContainer = document.getElementById('sideNavContainer')

    // Open form buttons
    const _addToDoButton = document.getElementById('addToDoButton')
    const _newProjectButton = document.getElementById('newProjectButton')

    // ToDo form containers and buttons
    const _newToDoForm = document.getElementById('newToDoForm')
    const _toDoFormModal = document.getElementById('toDoFormModal')
    const _closeToDoFormButton = document.getElementById('closeToDoFormButton')
    const _clearToDoFieldsButton = document.getElementById(
        'clearToDoFieldsButton'
    )

    // ToDo form inputs
    const _toDoTitleInput = document.getElementById('toDoTitleInput')
    const _toDoDescriptionInput = document.getElementById(
        'toDoDescriptionInput'
    )
    const _toDoDueDateInput = document.getElementById('toDoDueDateInput')
    const _toDoPrioritySelect = document.getElementById('toDoPrioritySelect')
    const _toDoProjectSelect = document.getElementById('toDoProjectSelect')

    // Default Projects
    const _allProject = document.getElementById('_allToDos')
    const _todayProject = document.getElementById('_todayToDos')

    // Project form containers and buttons
    const _newProjectForm = document.getElementById('newProjectForm')
    const _newProjectFormContainer = document.getElementById(
        'newProjectFormContainer'
    )
    const _clearNewProjectFormButton =
        document.getElementById('clearFieldsButton')
    const _closeFormButton = document.getElementById('closeFormButton')

    // Project form inputs
    const _projectNameInput = document.getElementById('projectNameInput')

    // Area to populate with ToDos based on project selection (default 'All')
    const _toDosContainer = document.getElementById('toDosContainer')

    // Area to popualte with clickable project names
    const _projectsContainer = document.getElementById('projectsContainer')

    // Edit form containers and buttons
    const _editToDoForm = document.getElementById('editToDoForm')
    const _toDoEditFormModal = document.getElementById('toDoEditFormModal')
    const _editCloseToDoFormButton = document.getElementById(
        'editCloseToDoFormButton'
    )
    const _editClearToDoFieldsButton = document.getElementById(
        'editClearToDoFieldsButton'
    )

    // Edit form inputs
    const _editToDoTitleInput = document.getElementById('editToDoTitleInput')
    const _editToDoDescriptionInput = document.getElementById(
        'editToDoDescriptionInput'
    )
    const _editToDoDueDateInput = document.getElementById(
        'editToDoDueDateInput'
    )
    const _editToDoPrioritySelect = document.getElementById(
        'editToDoPrioritySelect'
    )
    const _editToDoProjectSelect = document.getElementById(
        'editToDoProjectSelect'
    )

    let _currentProjectSelection
    let _editingToDo

    const initUI = () => {
        Interface.initStorage()
        _currentProjectSelection = '_allToDos'
        _highlightProjectSelection('_allToDos')
        _populateToDoDisplay(Interface.getProject(_currentProjectSelection))
        _populateProjectsDisplay()
        _initListeners()
        _populateToDoFormProjectOptions(Interface.getAllProjects())
        _populateEditToDoFormProjectOptions(Interface.getAllProjects())
    }

    const _initListeners = () => {
        _hamburgerMenuIcon.addEventListener('click', _mobileNavHandler)
        _addToDoButton.addEventListener('click', _openToDoForm)
        _closeToDoFormButton.addEventListener('click', _closeToDoForm)
        _clearToDoFieldsButton.addEventListener('click', _clearToDoForm)
        _newProjectButton.addEventListener('click', _openNewProjectForm)
        _clearNewProjectFormButton.addEventListener(
            'click',
            _clearNewProjectFormFields
        )
        _closeFormButton.addEventListener('click', _closeNewProjectForm)
        _editCloseToDoFormButton.addEventListener('click', _closeEditForm)
        _editClearToDoFieldsButton.addEventListener('click', _clearEditForm)

        // Default Project selectors
        _allProject.addEventListener('click', function (e) {
            _projectSelectionHandler(e)
        })

        _todayProject.addEventListener('click', function (e) {
            _projectSelectionHandler(e)
        })

        // Form submits
        _newToDoForm.addEventListener('submit', function (e) {
            _addToDoSubmit()
            e.preventDefault()
        })

        _newProjectForm.addEventListener('submit', function (e) {
            _addProjectSubmit()
            e.preventDefault()
        })

        _editToDoForm.addEventListener('submit', function (e) {
            _editProjectSubmit()
            e.preventDefault()
        })
    }

    const _getCurrentProject = () => {
        let _project
        if (
            _currentProjectSelection === '_allToDos' ||
            _currentProjectSelection === '_todayToDos' ||
            _currentProjectSelection === '_weekToDos'
        ) {
            _project = Interface.getProject(_currentProjectSelection)
        } else {
            _project = Interface.getProject(_currentProjectSelection).getToDos()
        }
        return _project
    }

    const _toDoDeleteHandler = (e) => {
        const _toDo = e.target.id.replace('Delete', '')
        Interface.removeToDo(_toDo)
        const _project = _getCurrentProject()
        _clearToDosDisplay()
        _populateToDoDisplay(_project)
    }

    const _toDoCompleteHandler = (e) => {
        let _targetToDo = e.target.id.replace('Complete', 'toDo')
        let _targetElement = document.getElementById(_targetToDo)
        _targetElement.classList.toggle('toDoCompleted')
        _targetToDo = _targetToDo.replace('toDo', 'Prio')
        _targetElement = document.getElementById(_targetToDo)
        _targetElement.classList.toggle('toDoCompleted')
    }

    const _projectSelectionHandler = (e) => {
        _removeHighlightProjectSelection()
        _highlightProjectSelection(e.target.id)
        const _projectTitle = e.target.id.replace('selection', '')
        _currentProjectSelection = _projectTitle
        const _project = _getCurrentProject()
        _clearToDosDisplay()
        _populateToDoDisplay(_project)
    }

    const _mobileNavHandler = () => {
        if (
            _sideNavContainer.style.display === '' ||
            _sideNavContainer.style.display === 'none'
        ) {
            _sideNavContainer.style.display = 'flex'
        } else {
            _sideNavContainer.style.display = ''
        }
    }

    const _highlightProjectSelection = (selectionID) => {
        const _selection = document.getElementById(selectionID)
        _selection.classList.add('projectSelected')
    }

    const _removeHighlightProjectSelection = () => {
        const _previousSelected =
            document.getElementsByClassName('projectSelected')
        _previousSelected[0].classList.remove('projectSelected')
    }

    const _openToDoForm = () => {
        _toDoFormModal.style.display = 'flex'
        _toDoFormModal.style.justifyContent = 'center'
        _toDoFormModal.style.alignItems = 'center'
    }

    const _closeToDoForm = () => {
        _toDoFormModal.style.display = 'none'
        _clearToDoForm()
    }

    const _clearToDoForm = () => {
        _toDoTitleInput.textContent = null
        _toDoTitleInput.value = null
        _toDoDescriptionInput.textContent = null
        _toDoDescriptionInput.value = null
        _toDoDueDateInput.value = null
        _toDoPrioritySelect.value = null
        _toDoProjectSelect.value = null
    }

    const _addToDoSubmit = () => {
        const _titleInput = document.getElementById('toDoTitleInput').value
        const _DescInput = document.getElementById('toDoDescriptionInput').value
        const _formDue = document.getElementById('toDoDueDateInput').value
        let _dueInput = document.getElementById('toDoDueDateInput').valueAsDate
        _dueInput = format(_dueInput, 'dd.MM.yyyy')
        const _prioInput = document.getElementById('toDoPrioritySelect').value
        const _projectInput = document.getElementById('toDoProjectSelect').value

        Interface.newToDo(
            _titleInput,
            _DescInput,
            _dueInput,
            _prioInput,
            _formDue,
            _projectInput
        )

        // Update ToDos Display
        _clearToDosDisplay()
        _populateToDoDisplay(Interface.getProject(_currentProjectSelection))

        _closeToDoForm()
    }

    const _editProjectSubmit = () => {
        // Delete Old version
        Interface.removeToDo(_editingToDo)

        // Create new version
        const _editTitleInput = _editToDoTitleInput.value
        const _editDescInput = _editToDoDescriptionInput.value
        const _editFormDue = _editToDoDueDateInput.value
        let _editDueInput = _editToDoDueDateInput.valueAsDate
        _editDueInput = format(_editDueInput, 'dd.MM.yyyy')
        const _editPrioInput = _editToDoPrioritySelect.value
        const _editProjectInput = _editToDoProjectSelect.value

        Interface.newToDo(
            _editTitleInput,
            _editDescInput,
            _editDueInput,
            _editPrioInput,
            _editFormDue,
            _editProjectInput
        )

        // Update ToDos Display
        _clearToDosDisplay()
        _populateToDoDisplay(Interface.getProject(_currentProjectSelection))

        _closeEditForm()
    }

    const _toDoEditHandler = (e) => {
        let _targetToDo = e.target.id.replace('Edit', '')
        _editingToDo = _targetToDo
        // Find the todo
        for (let i = 0; i < Interface.getAllToDos().length; i++) {
            if (Interface.getAllToDos()[i].getTitle() === _targetToDo) {
                _targetToDo = Interface.getAllToDos()[i]
            }
        }

        // set form input values to current project values
        _editToDoTitleInput.value = _targetToDo.getTitle()
        _editToDoDescriptionInput.value = _targetToDo.getDesc()
        _editToDoDueDateInput.value = _targetToDo.getFormDue()
        _editToDoPrioritySelect.value = _targetToDo.getPrio()
        _editToDoProjectSelect.value = _targetToDo.getProject()

        _openEditToDoForm(_targetToDo)
    }

    const _openEditToDoForm = () => {
        _toDoEditFormModal.style.display = 'flex'
        _toDoEditFormModal.style.justifyContent = 'center'
        _toDoEditFormModal.style.alignItems = 'center'
    }

    const _closeEditForm = () => {
        _toDoEditFormModal.style.display = 'none'
        _clearEditForm()
    }

    const _clearEditForm = () => {
        _editToDoTitleInput.textContent = null
        _editToDoTitleInput.value = null
        _editToDoDescriptionInput.textContent = null
        _editToDoDescriptionInput.value = null
        _editToDoDueDateInput.value = null
        _editToDoPrioritySelect.value = null
        _editToDoProjectSelect.value = null
    }

    const _openNewProjectForm = () => {
        _newProjectFormContainer.style.display = 'flex'
    }

    const _closeNewProjectForm = () => {
        _newProjectFormContainer.style.display = 'none'
        // Clear it too
        _clearNewProjectFormFields()
    }

    const _clearNewProjectFormFields = () => {
        _projectNameInput.textContent = null
        _projectNameInput.value = null
    }

    const _addProjectSubmit = () => {
        const _titleInput = document.getElementById('projectNameInput').value
        Interface.newProject(_titleInput)

        _clearProjectsDisplay()
        _populateProjectsDisplay()
        _clearToDoFormProjectOptions()
        _populateToDoFormProjectOptions(Interface.getAllProjects())
        _clearEditToDoFormProjectOptions()
        _populateEditToDoFormProjectOptions(Interface.getAllProjects())

        _closeNewProjectForm()
    }

    const _clearProjectsDisplay = () => {
        const _projectsContainer = document.getElementById('projectsContainer')
        while (_projectsContainer.firstChild) {
            _projectsContainer.removeChild(_projectsContainer.lastChild)
        }
    }

    const _populateProjectsDisplay = () => {
        for (let i = 0; i < Interface.getAllProjects().length; i++) {
            const _projectTitle = Interface.getAllProjects()[i].getTitle()
            const _project = document.createElement('li')

            _project.addEventListener('click', function (e) {
                _projectSelectionHandler(e)
            })

            _project.setAttribute('id', _projectTitle)
            _project.classList.add('project')
            _project.textContent = _projectTitle
            _projectsContainer.appendChild(_project)
        }
    }

    const _clearToDosDisplay = () => {
        while (_toDosContainer.firstChild) {
            _toDosContainer.removeChild(_toDosContainer.lastChild)
        }
    }

    const _clearToDoFormProjectOptions = () => {
        const _toDoProjectSelect = document.getElementById('toDoProjectSelect')
        while (_toDoProjectSelect.firstChild) {
            _toDoProjectSelect.removeChild(_toDoProjectSelect.lastChild)
        }
    }

    const _clearEditToDoFormProjectOptions = () => {
        const _toDoProjectSelect = document.getElementById(
            'editToDoProjectSelect'
        )
        while (_toDoProjectSelect.firstChild) {
            _toDoProjectSelect.removeChild(_toDoProjectSelect.lastChild)
        }
    }

    const _populateToDoDisplay = (project) => {
        // Reverse so newest ToDos at the top
        for (let i = project.length; i > 0; i--) {
            // To Do Container
            const _toDoContainer = document.createElement('div')
            _toDoContainer.setAttribute(
                'id',
                project[i - 1].getTitle() + 'toDo'
            )
            _toDoContainer.classList.add('toDoContainer')

            // To Do properties
            const _toDoTitle = document.createElement('div')
            _toDoTitle.classList.add('toDoTitle')
            _toDoTitle.textContent = project[i - 1].getTitle()

            const _toDoDue = document.createElement('div')
            _toDoDue.classList.add('toDoDue')
            _toDoDue.textContent = project[i - 1].getDue()

            // Edit
            const _toDoEditButton = document.createElement('div')
            _toDoEditButton.classList.add('toDoEdit')
            const _editImage = document.createElement('img')
            _editImage.setAttribute('src', './resources/editIcon.png')
            _editImage.setAttribute('id', project[i - 1].getTitle() + 'Edit')
            _editImage.classList.add('toDoEditImage')
            _toDoEditButton.appendChild(_editImage)

            // Delete ToDo button
            const _toDoDelete = document.createElement('div')
            _toDoDelete.classList.add('toDoDelete')
            const _deleteImage = document.createElement('img')
            _deleteImage.setAttribute('src', './resources/deleteIcon.png')
            _deleteImage.setAttribute(
                'id',
                project[i - 1].getTitle() + 'Delete'
            )
            _deleteImage.classList.add('toDoDeleteImage')
            _toDoDelete.appendChild(_deleteImage)

            // Apply colour switching class based on priority
            const _toDoPrio = project[i - 1].getPrio()
            const _toDoPrioDisplay = document.createElement('div')
            _toDoPrioDisplay.setAttribute(
                'id',
                project[i - 1].getTitle() + 'Prio'
            )
            _toDoPrioDisplay.classList.add('toDoPrio')
            switch (_toDoPrio) {
                case 'Low':
                case 'low':
                    _toDoPrioDisplay.classList.add('toDoLowPrio')
                    break
                case 'Medium':
                case 'medium':
                    _toDoPrioDisplay.classList.add('toDoMediumPrio')
                    break
                case 'High':
                case 'medium:':
                    _toDoPrioDisplay.classList.add('toDoHighPrio')
                    break
            }

            const _toDoComplete = document.createElement('div')
            _toDoComplete.classList.add('toDoComplete')
            const _toDoCompleteIcon = document.createElement('img')
            _toDoCompleteIcon.setAttribute('src', './resources/tickIcon.png')
            _toDoCompleteIcon.setAttribute(
                'id',
                project[i - 1].getTitle() + 'Complete'
            )
            _toDoCompleteIcon.classList.add('toDoCompleteImg')
            _toDoComplete.appendChild(_toDoCompleteIcon)

            // Add Properties to container
            _toDoContainer.appendChild(_toDoTitle)
            _toDoContainer.appendChild(_toDoDue)
            _toDoContainer.appendChild(_toDoPrioDisplay)
            _toDoContainer.appendChild(_toDoComplete)
            _toDoContainer.appendChild(_toDoEditButton)
            _toDoContainer.appendChild(_toDoDelete)

            // Add container to DOM
            _toDosContainer.appendChild(_toDoContainer)

            // Add eventlisteners for deleting ToDo
            _toDoDelete.addEventListener('click', function (e) {
                _toDoDeleteHandler(e)
            })

            // Add eventlisteners for opening ToDo edit
            _toDoEditButton.addEventListener('click', function (e) {
                _toDoEditHandler(e)
            })

            // On completion change color to green
            _toDoComplete.addEventListener('click', function (e) {
                _toDoCompleteHandler(e)
            })
        }
    }

    const _populateToDoFormProjectOptions = (projects) => {
        const _toDoProjectSelect = document.getElementById('toDoProjectSelect')
        const _selectNullOption = document.createElement('option')
        _selectNullOption.setAttribute('value', '')
        _toDoProjectSelect.appendChild(_selectNullOption)

        for (let i = 0; i < projects.length; i++) {
            const _selectProjectOption = document.createElement('option')
            _selectProjectOption.setAttribute('value', projects[i].getTitle())
            _selectProjectOption.textContent = projects[i].getTitle()
            _toDoProjectSelect.appendChild(_selectProjectOption)
        }
    }

    const _populateEditToDoFormProjectOptions = (projects) => {
        const _editToDoProjectSelect = document.getElementById(
            'editToDoProjectSelect'
        )
        const _selectNullOption = document.createElement('option')
        _selectNullOption.setAttribute('value', '')
        _editToDoProjectSelect.appendChild(_selectNullOption)

        for (let i = 0; i < projects.length; i++) {
            const _selectProjectOption = document.createElement('option')
            _selectProjectOption.setAttribute('value', projects[i].getTitle())
            _selectProjectOption.textContent = projects[i].getTitle()
            _editToDoProjectSelect.appendChild(_selectProjectOption)
        }
    }

    return {
        initUI,
    }
})()
