import React, { useState } from 'react';

export const ListTodo = (props) => {
  const [Task, setTask] = useState(props.data.task);
  const [Completed, setCompleted] = useState(props.data.isCompleted);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(Task);

  const handleIsCompleted = () => {
    setCompleted(!Completed);
    props.functionIsCompleted(props.data.id);
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    console.log("saving:", editedTask);
    setTask(editedTask);
    setIsEditing(false);
    props.functionEdit(props.data.id, editedTask);
  };
  
  const handleCancel = () => {
    setIsEditing(false);
    setEditedTask(Task);
  };
  
  const handleDelete = () => {
    props.functionDelete(props.data.id);
  };

  return (
    <div className={`flex justify-between bg-slate-200 p-4 rounded-lg ${Completed ? 'line-through text-red-500' : ''}`}>
      <div className="flex">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input type="text" value={editedTask} onChange={(e) => setEditedTask(e.target.value)} className="p-3 rounded-lg shadow-sm focus:outline-none" />
            <button onClick={handleSave} className='bg-green-500 hover:bg-green-600 p-3 rounded-lg'><span className='text-white font-semibold'>Save</span></button>
            <button onClick={handleCancel} className='bg-red-500 hover:bg-red-600 p-3 rounded-lg'><span className='text-white font-semibold'>Cancel</span></button>
          </div>
        ) : (
          <span>{Task}</span>
        )}
      </div>
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={Completed}
          onChange={() => {
            handleIsCompleted(props.data.isCompleted);
          }}
        />

        {/* Edit */}
        <button
          onClick={() => {
            handleEdit(props.data.id);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </button>

        {/* Hapus */}
        <button
          onClick={() => {
            handleDelete(props.data.id);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
