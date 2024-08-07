// src/ToDOlist.js
import React, { useState } from 'react';
import './App.css';

function ToDOlist() {
  const [tasks, setTasks] = useState(["Eat breakfast", "Take a shower", "Walk the dog"]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null); // لتتبع المهمة التي يتم تعديلها
  const [editTask, setEditTask] = useState(""); // لتخزين نص المهمة أثناء التعديل

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function handleEditChange(event) {
    setEditTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  }

  function startEditing(index) {
    setEditIndex(index);
    setEditTask(tasks[index]);
  }

  function saveEdit() {
    if (editTask.trim() !== "") {
      const updatedTasks = tasks.map((task, i) => (i === editIndex ? editTask : task));
      setTasks(updatedTasks);
      setEditIndex(null);
      setEditTask("");
    }
  }

  function cancelEdit() {
    setEditIndex(null);
    setEditTask("");
  }

  return (
    <div className='to-do-list'>
      <h1>To-Do List</h1>
      <div>
        {editIndex === null ? (
          <>
            <input
              type='text'
              placeholder='Enter a task...'
              value={newTask}
              onChange={handleInputChange}
            />
            <button
              className='add-button'
              onClick={addTask}
            >
              Add
            </button>
          </>
        ) : (
          <>
            <input
              type='text'
              placeholder='Edit the task...'
              value={editTask}
              onChange={handleEditChange}
            />
            <button
              className='update-button'
              onClick={saveEdit}
            >
              Update
            </button>
            <button
              className='cancel-button'
              onClick={cancelEdit}
            >
              Cancel
            </button>
          </>
        )}
      </div>
      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className='text'>{task}</span>
            <button
              className='edit-button'
              onClick={() => startEditing(index)}
            >
              Edit
            </button>
            <button
              className='delete-button'
              onClick={() => deleteTask(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDOlist;
