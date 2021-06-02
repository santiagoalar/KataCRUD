import React, { useContext, useEffect } from 'react';
import { Store, HOST_API } from './App';

const List = () => {
    //const { dispatch, state } = useContext(Store);    
    const { dispatch, state } = useContext(Store);
    //const currentList = todo.list;

    useEffect(() => {
        //Endpoint
        fetch(HOST_API + "/todos")
            //Parseando a JSON
            .then(response => response.json())
            .then((list) => {
                dispatch({ type: "update-list", list })
            })
        //Condiciones 
        //}, [dispatch]);
        //}, [state.todo.list.length, dispatch]);
    }, [state.list.length, dispatch]);

    const onDelete = (id) => {
        fetch(HOST_API + "/" + id + "/todo", {
            method: "DELETE"
        }).then((list) => {
            dispatch({ type: "delete-item", id })
        })
    };

    const onEdit = (todo) => {
        dispatch({ type: "edit-item", item: todo })
    };

    return <div>
        <table >
            <thead>
                <tr>
                    <td>ID</td>
                    <td>Tarea</td>
                    <td>¿Está completado?</td>
                </tr>
            </thead>
            <tbody>
                {state.list.map((todo) => {
                    return <tr key={todo.id}>
                        <td>{todo.id}</td>
                        <td>{todo.name}</td>
                        <td>{todo.isCompleted}</td>
                        <td><button onClick={() => onDelete(todo.id)}>Eliminar</button></td>
                        <td><button onClick={() => onEdit(todo)}>Editar</button></td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
}

export default List;