export const Project = (title) => {

    let _title = title;
    let _ToDos = [];
    

    const setTitle = (newTitle) => {
        _title = newTitle;
    };

    const getTitle = () => _title;

    const addToDo = (newTodo) => {
        _ToDos.push(newTodo);
    };

    const removeToDo = (toDo) => {
        _ToDos = _ToDos.filter(title => !(title.getTitle() == toDo));
    };

    const getToDos = () => _ToDos;

    return {
        setTitle,
        getTitle,
        addToDo,
        getToDos,
        removeToDo,
        _title,
        _ToDos,
    }
}