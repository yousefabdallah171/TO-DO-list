import { Check, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  task: {
    id: string;
    text: string;
    completed: boolean;
  };
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onComplete, onDelete }: TaskItemProps) {
  return (
    <div
      className={cn(
        "group flex items-center gap-4 p-4 glass-panel rounded-lg mb-3 transition-all duration-300 task-enter",
        task.completed && "opacity-60"
      )}
    >
      <button
        onClick={() => onComplete(task.id)}
        className={cn(
          "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
          task.completed
            ? "bg-primary border-primary"
            : "border-gray-300 hover:border-primary"
        )}
      >
        {task.completed && <Check className="w-4 h-4 text-primary-foreground" />}
      </button>
      
      <span
        className={cn(
          "flex-1 text-lg transition-all",
          task.completed && "line-through text-muted-foreground"
        )}
      >
        {task.text}
      </span>
      
      <button
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:text-destructive"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}