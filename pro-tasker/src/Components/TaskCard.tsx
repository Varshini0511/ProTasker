import type { Task } from '../types';
import { useDraggable } from '@dnd-kit/core';
import { useTasks } from '../Context/TaskContext';
import  {memo, useMemo} from 'react';
import { useCallback } from 'react';
interface TaskCardProps {
  task: Task;
 // onDelete: (id: string) => void;
}

export const TaskCardComponent = ({ task }: TaskCardProps) => {
 const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id, // Unique ID is critical for tracking
  });
  console.log(`Rendering Task: ${task.title}`);
const { deleteTask } = useTasks();
  // 2. Define the style for movement
  // If we are dragging, 'transform' contains the x/y coordinates
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;
    return (
    <div ref={setNodeRef} // 👈 Connect the DOM element to the library
      style={style}    // 👈 Apply the movement styles
      {...listeners}   // 👈 Listen for mouse clicks
      {...attributes}  // 👈 ARIA attributes for accessibility
      className="task-card"
    >
      <p>{task.title}</p>
      <button 
          className="delete-btn" 
          onClick={(e) =>{
            e.stopPropagation();
           deleteTask(task.id);}}
          onPointerDown={(e) => e.stopPropagation()}
        >
          ×
        </button>
    </div>
  );
};

export const TaskCard = memo(TaskCardComponent);