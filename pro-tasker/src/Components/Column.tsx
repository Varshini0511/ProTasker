import type {Task} from '../types';
import { TaskCard } from './TaskCard';
import { useDroppable } from '@dnd-kit/core';
interface ColumnProps {
  title: string;
  tasks: Task[];
  id: string;
  //onDelete: (id: string) => void;
}

export const Column = ({ title, tasks, id }: ColumnProps) => {
 const { setNodeRef } = useDroppable({
    id: id,
  });
  return (
    <div className="column" ref={setNodeRef}>
      <h2>{title}</h2>
      <div className='column-content'>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task}   />
      ))}
      </div>
    </div>
  );
};