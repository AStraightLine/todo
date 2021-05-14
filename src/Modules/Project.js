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
        for (let i = 0; i < _ToDos.length; i++) {
            if (_ToDos[i].getTitle() == toDo) {
                _ToDos.splice(i, 1);
            }
        }
    };

    const getToDos = () => _ToDos;

    return {
        setTitle,
        getTitle,
        addToDo,
        getToDos,
        removeToDo,
    }
}