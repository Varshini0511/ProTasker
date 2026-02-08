import { useState } from 'react';
import { Column } from './Components/Column';
import type { Task } from './types';
import type { TaskStatus } from './types';
import { AddTaskForm } from './Components/AddTaskForm';
import './App.css';
import type {  DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import { useLocalStorage } from './Hooks/USeLocalStorage';
import { useTasks } from './Context/TaskContext';
import { TaskProvider } from './Context/TaskContext';

// Mock Data (Usually this comes from an API)
const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Setup Project', status: 'DONE' },
  { id: '2', title: 'Learn React Props', status: 'IN_PROGRESS' },
  { id: '3', title: 'Master TypeScript', status: 'TODO' },
];

const BoardContent = () => {
  // The "Source of Truth"
 // const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
 const { tasks, addTask, updateTaskStatus } = useTasks();
 const [searchQuery, setSearchQuery] = useState(''); // 👈 New Local State

  // Filter tasks based on search
  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
//const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', INITIAL_TASKS);
  // const handleAddTask = (title: string) => {
  //   const newTask: Task = {
  //     id: crypto.randomUUID(), // Generates a random ID
  //     title,
  //     status: 'TODO', // Default status
  //   };
    
    
  //   setTasks([...tasks, newTask]); 
  // };

  // // 2. DELETE TASK LOGIC
  // const handleDeleteTask = (id: string) => {
  //   // Filter out the task with the given ID
  //   setTasks(tasks.filter((task) => task.id !== id));
  // };
  // Helper function to filter tasks by status
  // In .NET: tasks.Where(t => t.Status == status)
  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter((task) => task.status === status);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if(!over) return; // Dropped outside any droppable area
    const draggedTaskId = active.id as string;
    const newStatus = over.id as TaskStatus;

    updateTaskStatus(draggedTaskId, newStatus)
    
  }

  return (
    <div className="app-container">
      <h1>ProTasker Board</h1>
      <input 
        type="text" 
        placeholder="Search tasks..." 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ 
          padding: '10px', 
          marginBottom: '20px', 
          width: '100%', 
          maxWidth: '300px',
          backgroundColor: 'white',
          color: 'black',
          border: '2px solid black',
          borderRadius: '6px'
        }}
      />
      <AddTaskForm onAddTask={addTask} />
      <DndContext onDragEnd={handleDragEnd}>
      <div className="board">
        <Column 
          title="To Do" 
          tasks={getTasksByStatus('TODO')} 
          id ="TODO"
          
        />
        <Column 
          title="In-Progress" 
          tasks={getTasksByStatus('IN_PROGRESS')} 
          id ="IN_PROGRESS"
        
        />
        <Column 
          title="Done" 
          tasks={getTasksByStatus('DONE')} 
          id ="DONE"
         
        />
      </div>
      </DndContext>
    </div>
  );
}
function App() {
  return (
    // ⚠️ Wrap the whole app in the Provider
    <TaskProvider>
      <BoardContent />
    </TaskProvider>
  );
}

export default App;