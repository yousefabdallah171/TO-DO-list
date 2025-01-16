import { Check, Pencil, Save, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Input } from "./ui/input";

interface TaskItemProps {
  task: {
    id: string;
    text: string;
    completed: boolean;
  };
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export function TaskItem({ task, onComplete, onDelete, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleSave = () => {
    if (editedText.trim()) {
      onEdit(task.id, editedText);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedText(task.text);
    setIsEditing(false);
  };

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
      
      {isEditing ? (
        <div className="flex-1 flex items-center gap-2">
          <Input
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="flex-1"
            autoFocus
          />
          <button
            onClick={handleSave}
            className="p-2 hover:text-primary transition-colors"
          >
            <Save className="w-5 h-5" />
          </button>
          <button
            onClick={handleCancel}
            className="p-2 hover:text-destructive transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <>
          <span
            className={cn(
              "flex-1 text-lg transition-all",
              task.completed && "line-through text-muted-foreground"
            )}
          >
            {task.text}
          </span>
          
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 hover:text-primary transition-colors"
              disabled={task.completed}
            >
              <Pencil className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-2 hover:text-destructive transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}