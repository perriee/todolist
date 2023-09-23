import React, { useEffect, useState } from 'react';
import { ListTodo } from '../assets/components/ListTodo';

export const TodoList = () => {
  const [Todos, setTodos] = useState([]);
  const [NewTask, setNewTask] = useState('');

  const GetLastId = () => {
    if (Todos.length === 0) {
      return 1;
    }
    const maxId = Math.max(...Todos.map((todo) => todo.id));
    return maxId + 1;
  };

  const AddNewTask = () => {
    if (NewTask) {
      const newTodo = {
        id: GetLastId(),
        task: NewTask,
        isCompleted: false,
      };

      setTodos([...Todos, newTodo]);
      setNewTask('');
    }
  };

  // EDIT TODO
  const EditTodo = () => {
    
  }

  // DELETE TODO
  const DeleteTodo = (paramsId) => {
    const newTodos = Todos.filter((value) => value.id !== paramsId);
    setTodos(newTodos);
  };

  const renderTodoList = () => {
    return Todos.map((value, index) => {
      return <ListTodo key={value.id} data={value} index={index} functionDelete={DeleteTodo} />;
    });
  };

  useEffect(() => {
    console.log(Todos);
  }, [Todos]);

  return (
    <div className="flex flex-col py-10 px-96 h-full min-h-[100vh] gap-4 bg-slate-100">
      <span className="text-center text-3xl font-bold">TodoSearch</span>
      <div className="flex border-2 border-slate-300 rounded-lg">
        <div className="flex justify-between w-full p-6">
          <div className="flex flex-col gap-3">
            <input className="p-3 rounded-lg shadow-sm focus:outline-none" placeholder="Search Todo" />
            <button className="bg-sky-500 px-4 py-2 rounded-lg hover:bg-sky-600">
              <span className="text-white font-semibold">Search</span>
            </button>
          </div>
          <div className="flex flex-col gap-3">
            <input className="p-3 rounded-lg shadow-sm focus:outline-none" value={NewTask} placeholder="New Task" onChange={(e) => setNewTask(e.target.value)} />
            <button className="bg-sky-500 rounded-lg px-4 py-2 hover:bg-sky-600" onClick={AddNewTask}>
              <span className="text-white font-semibold">Add new Task</span>
            </button>
          </div>
        </div>
      </div>
      <span className="text-center text-3xl font-semibold">TodoList</span>
      <div className="flex justify-center gap-4">
        <button className="bg-sky-500 hover:bg-sky-600 rounded-lg w-[15%] py-2">
          <span className="text-white font-semibold">All</span>
        </button>
        <button className="bg-sky-500 hover:bg-sky-600 rounded-lg w-[15%] py-2">
          <span className="text-white font-semibold">Done</span>
        </button>
        <button className="bg-sky-500 hover:bg-sky-600 rounded-lg w-[15%] py-2">
          <span className="text-white font-semibold">Todo</span>
        </button>
      </div>
      {renderTodoList()}
    </div>
  );
};
