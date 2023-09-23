import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TodoList } from '../pages/TodoList'

export const RouterList = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<TodoList/>}/>
        </Routes>
    </BrowserRouter>
  )
}
