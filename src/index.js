import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/assets/css/index.css';
import { TodoList } from './pages/TodoList';
import { RouterList } from './routes/RouterList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <RouterList/>
  // </React.StrictMode>
);