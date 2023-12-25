import { useState } from 'react';
import { Link } from 'react-router-dom';

const Todo = ({ e }) => {

    const deleteTodo = async (id) => {
        try {
            await fetch(`${import.meta.env.VITE_PUBLIC_URL}/todos`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id })
            });
            console.log('deleted successfully');
            window.location.reload(true);       // FIXME: not a good way
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div>
            <p>Id: {e.todo_id}</p>
            <p>Description: {e.description}</p>
            <p>Age: {e.age}</p>
            <button onClick={() => deleteTodo(e.todo_id)}>Delete</button>
            <br />
            <Link to={`todos/details/${e.todo_id}`}>
                Show Single Todo details
            </Link>
            <br />
            <Link to={`todos/edit/${e.todo_id}`}>
                Edit
            </Link>
            <hr />
        </div>
    )
}

export default Todo