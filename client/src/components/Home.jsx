import { useState, useEffect } from "react"
import Todo from "./Todo";

const Home = () => {
    const [description, setDescription] = useState('');
    const [age, setAge] = useState('');
    const [todos, setTodos] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_PUBLIC_URL}/todos`);
            const jsonData = await response.json();
            const data = jsonData.allTodos;
            // console.log(data);
            setTodos(data);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const createTodo = async () => {
        try {
            const body = { description, age: parseInt(age, 10) };   // 十进制
            setAge('');
            setDescription('');
            await fetch(`${import.meta.env.VITE_PUBLIC_URL}/todos/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },    // indicate my request body to server is in json format
                body: JSON.stringify(body)
            });
            console.log('created successfully');
            fetchData();
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div>
            <h1>PERN STACK</h1>
            <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Description..." />
            <input value={age} onChange={(e) => setAge(e.target.value)} type="text" placeholder="Age..." />
            <button onClick={() => createTodo()}>Create</button>
            {todos.map((e) => (
                <Todo key={e.todo_id} e={e} />
            ))}
        </div>
    )
}

export default Home