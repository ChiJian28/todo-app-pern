import Home from "./components/Home";
import { Routes, Route } from 'react-router-dom';
import ShowSingleTodo from "./components/ShowSingleTodo";
import EditTodo from "./components/EditTodo";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/todos/details/:id' element={<ShowSingleTodo />} />
      <Route path='/todos/edit/:id' element={<EditTodo />} />
    </Routes>
  )
}

export default App