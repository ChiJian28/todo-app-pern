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
            const {todo} = jsonData;
            setTodo(todo);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchSingleTodo();
    }, []);
    return (
        <div>
            <div>
                <p>Age: {todo.age}</p>
                <p>Description: {todo.description}</p>
            </div>
            <button onClick={() => navigate('/')}>Back</button>
        </div>
    )
}

export default ShowSingleTodo