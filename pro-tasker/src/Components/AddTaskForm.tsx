import { useState } from "react";

interface AddTaskFormProps {
  onAddTask: (title: string) => void;
}

export const AddTaskForm = ({ onAddTask }: AddTaskFormProps) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return; // Don't add empty tasks
    if (title.trim()) {
      onAddTask(title);
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        style={{
            backgroundColor: 'white',
            color: 'black',
            border: '2px solid black'
            
        }}
      />
      <button type="submit" style={{
            backgroundColor:  'white',
            color:  'black',
           
            cursor: 'pointer',
            
        }}>Add Task</button>
    </form>
  );
};