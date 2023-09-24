import React, { useEffect, useState } from 'react';
import { ListTodo } from '../assets/components/ListTodo';

export const TodoList = () => {
  const [Todos, setTodos] = useState([]);
  const [NewTask, setNewTask] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [filteredTasks, setFilteredTasks] = useState([]);

  // GET LAST ID
  const GetLastId = () => {
    if (Todos.length === 0) {
      return 1;
    }
    const maxId = Math.max(...Todos.map((value) => value.id));
    return maxId + 1;
  };

  // ADD TO DO LIST
  const AddNewTask = () => {
    if (NewTask === '') return alert('New Task is required')
    if (NewTask) {
      const newTodo = {
        id: GetLastId(),
        task: NewTask,
        isCompleted: false,
        isEditing: false,
      };

      setTodos((todo) => [...todo, newTodo]);
      setNewTask('');
    }
  };

  // CHANGE STATUS isCompleted
  const changeIsCompleted = (id) => {
    setTodos((todos) => todos.map((todo) => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo)));
  };

  // EDIT TODO
  const EditTodo = (todoId, newTask) => {
    setTodos((todos) => todos.map((todo) => (todo.id === todoId ? { ...todo, task: newTask } : todo)));
  };

  // DELETE TODO
  const DeleteTodo = (paramsId) => {
    const newTodos = Todos.filter((todo) => todo.id !== paramsId);
    setTodos(newTodos);
  };

  // SEARCH TODO
  const handleSearchInput = (e) => {
    setSearch(e.target.value);
  };

  // HANDLE Filter Todo
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // RENDER TO DO LIST
  const renderTodoList = () => {
    if (search) {
      return filteredTasks
        .filter((todo) => {
          if (filter === 'All') return true;
          if (filter === 'Done') return todo.isCompleted;
          if (filter === 'Todo') return !todo.isCompleted;
          return true;
        })
        .map((todo, index) => {
          return <ListTodo key={todo.id} data={todo} index={index} functionDelete={DeleteTodo} functionIsCompleted={changeIsCompleted} functionEdit={EditTodo} />;
        });
    }
    return Todos.filter((todo) => {
      if (filter === 'All') return true;
      if (filter === 'Done') return todo.isCompleted;
      if (filter === 'Todo') return !todo.isCompleted;
      return true;
    }).map((todo, index) => {
      return <ListTodo key={todo.id} data={todo} index={index} functionDelete={DeleteTodo} functionIsCompleted={changeIsCompleted} functionEdit={EditTodo} />;
    });
  };

  useEffect(() => {
    const searchResults = Todos.filter((todo) => {
      return todo.task.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredTasks(searchResults);
  }, [search, filter, Todos]);
  
  useEffect(() => {
    console.log('todos', Todos);
  }, [Todos, filter]);

  return (
    <div className="flex flex-col py-10 px-96 h-full min-h-[100vh] gap-4 bg-slate-100">
      <span className="text-center text-3xl font-bold">TodoSearch</span>
      <div className="flex border-2 border-slate-300 rounded-lg">
        <div className="flex justify-between w-full p-6">
          <div className="flex flex-col gap-3">
            <input className="p-3 rounded-lg shadow-sm focus:outline-none" placeholder="Search Todo" onChange={handleSearchInput} value={search} />
          </div>
          <div className="flex gap-3">
            <input className="p-3 rounded-lg shadow-sm focus:outline-none" value={NewTask} placeholder="New Task" onChange={(e) => setNewTask(e.target.value)} />
            <button className="bg-sky-500 rounded-lg px-3 py-2 hover:bg-sky-600" onClick={AddNewTask}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <span className="text-center text-3xl font-semibold">TodoList</span>
      <div className="flex justify-center gap-4">
        <button className="bg-sky-500 hover:bg-sky-600 rounded-lg w-[15%] py-2" onClick={() => handleFilterChange('All')}>
          <span className="text-white font-semibold">All</span>
        </button>
        <button className="bg-sky-500 hover:bg-sky-600 rounded-lg w-[15%] py-2" onClick={() => handleFilterChange('Done')}>
          <span className="text-white font-semibold">Done</span>
        </button>
        <button className="bg-sky-500 hover:bg-sky-600 rounded-lg w-[15%] py-2" onClick={() => handleFilterChange('Todo')}>
          <span className="text-white font-semibold">Todo</span>
        </button>
      </div>
      {renderTodoList()}
    </div>
  );
};
