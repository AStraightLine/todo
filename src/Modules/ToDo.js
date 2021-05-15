export const ToDo = (title, desc, due, prio, formDue, project) => {
    let _title = title;
    let _desc = desc;
    let _due = due;
    let _prio = prio;
    let _formDue = formDue;
    let _project = project;
    let _complete = false;

    // Setters
    const setTitle = (newTitle) => {
        _title = newTitle;
    };

    const setDesc = (newDesc) => {
        _desc = newDesc;
    };

    const setDue = (newDue) => {
        _due = newDue;
    }; 

    const setPrio = (newPrio) => {
        _prio = newPrio;
    };

    const setFormDue = (newFormDue) => {
        _formDue = newFormDue;
    };

    const setProject = (newProject) => {
        project = newProject;
    };

    const setComplete = (status) => {
        _complete = status;
    };

    // Getters
    const getTitle = () => _title;
    const getDesc = () => _desc;
    const getDue = () => _due;
    const getPrio = () => _prio;
    const getFormDue = () => _formDue;
    const getProject = () => _project;
    const getComplete = () => _complete;

    return {
        setTitle,
        setDesc,
        setDue,
        setPrio,
        setFormDue,
        setProject,
        setComplete,
        getTitle,
        getDesc,
        getDue,
        getPrio,
        getFormDue,
        getProject,
        getComplete,
    };
};