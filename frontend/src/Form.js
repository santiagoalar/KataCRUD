import React, { useContext, useRef, useState } from 'react';
import { Store, HOST_API } from './App';

const Form = () => {
    //Identifica las propiedades de un componente en especifico
    const formRef = useRef(null);
    const { dispatch, state: { item } } = useContext(Store);
    //const { dispatch} = useContext(Store);
    //const item = todo.item;
    //const [state, setState] = useState(item);
    const [state, setState] = useState({});

    const onAdd = (event) => {
        event.preventDefault();

        const request = {
            name: state.name,
            id: null,
            isCompleted: false
        };

        fetch(HOST_API + "/todo", {
            method: "POST",
            body: JSON.stringify(request),
            //Lo que se va a transpotar es un JSON
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then((todo) => {
                dispatch({ type: "add-item", item: todo });
                //Fragmenta todos los elementos que esten en el state
                setState({ name: "" });
                formRef.current.reset();
            });
    }

    const onEdit = (event) => {
        event.preventDefault();

        const request = {
            name: state.name,
            id: item.id,
            isCompleted: item.isCompleted
        };


        fetch(HOST_API + "/todo", {
            method: "PUT",
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((todo) => {
                dispatch({ type: "update-item", item: todo });
                setState({ name: "" });
                formRef.current.reset();
            });
    }

    return <form ref={formRef}>
        <input type="text"
            name="name"
            defaultValue={item.name}
            placeholder="¿Cuál es tu plan?"
            onChange={(event) => {
                setState({ ...state, name: event.target.value })
            }}  ></input>

        {item.id && <button onClick={onEdit}>Actualizar</button>}
        {!item.id && <button onClick={onAdd}>Crear</button>}
    </form>
}

export default Form;