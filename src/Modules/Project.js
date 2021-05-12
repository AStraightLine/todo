export const Project = (title) => {
    let _title = title;
    let _Todos = [];
    

    const setTitle = (newTitle) => {
        _title = newTitle;
    };

    const getTitle = () => _title;

    const addTodo = (newTodo) => {
        _Todos.push(newTodo);
    }

    const getToDos = () => _Todos;

    return {
        setTitle,
        getTitle,
        addTodo,
        getToDos,
    }
}