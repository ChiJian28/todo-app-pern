import { useState } from "react"
import { useParams, useNavigate } from 'react-router-dom';

const EditTodo = () => {
  const [description, setDescription] = useState('');
  const [age, setAge] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const updateTodo = async () => {
    try {
      const body = { description, age: Number(age) };
      await fetch(
        `${import.meta.env.VITE_PUBLIC_URL}/todos/edit/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );
      console.log('Edit successfully');
      navigate('/');
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <input onChange={e => setDescription(e.target.value)} type="text" placeholder="Description..." />
      <input onChange={e => setAge(e.target.value)} type="text" placeholder="Age..." />
      <button onClick={() => updateTodo()}>Edit !</button>
      <button onClick={() => navigate('/')}>Back</button>
    </div>
  )
}

export default EditTodo