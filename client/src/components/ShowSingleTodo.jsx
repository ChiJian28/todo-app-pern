import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

const ShowSingleTodo = () => {
    const [todo, setTodo] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchSingleTodo = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_PUBLIC_URL}/todos/details/${id}`);
            const jsonData = await response.json();
            // console.log(jsonData.allTodos.rows);
            setTodo(jsonData.allTodos.rows);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchSingleTodo();
    },[]);
    return (
        <div>
            {todo.map((e) => (
                <div key={e.todo_id}>
                    <p>{e.age}</p>
                    <p>{e.description}</p>
                </div>
            ))}
            <button onClick={() => navigate('/')}>Back</button>
        </div>
    )
}

export default ShowSingleTodo