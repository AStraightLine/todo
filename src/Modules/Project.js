export const Project = (title) => {

    let _title = title;
    let _ToDos = [];
    

    const setTitle = (newTitle) => {
        _title = newTitle;
    };

    const getTitle = () => _title;

    const addToDo = (newTodo) => {
        _ToDos.push(newTodo);
    }

    const getToDos = () => _ToDos;

    return {
        setTitle,
        getTitle,
        addToDo,
        getToDos,
    }
}