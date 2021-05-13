export const ToDo = (title, desc, due, prio, complete) => {
    let _title = title;
    let _desc = desc;
    let _due = due;
    let _prio = prio;
    let _complete = complete;

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

    const setComplete = (status) => {
        _complete = status;
    };

    // Getters
    const getTitle = () => _title;
    const getDesc = () => _desc;
    const getDue = () => _due;
    const getPrio = () => _prio;
    const getComplete = () => _complete;

    return {
        setTitle,
        setDesc,
        setDue,
        setPrio,
        setComplete,
        getTitle,
        getDesc,
        getDue,
        getPrio,
        getComplete,
    };
};