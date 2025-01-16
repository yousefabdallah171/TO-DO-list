import { Check, Pencil, Save, Trash2, X, Calendar as CalendarIcon, Clock, ImagePlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Button } from "./ui/button";

interface TaskItemProps {
  task: {
    id: string;
    text: string;
    description: string;
    completed: boolean;
    scheduledDate?: Date;
    scheduledTime?: string;
    photoUrl?: string;
  };
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string, newDescription: string, scheduledDate?: Date, scheduledTime?: string, photoUrl?: string) => void;
}

export function TaskItem({ task, onComplete, onDelete, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedDate, setEditedDate] = useState<Date | undefined>(task.scheduledDate);
  const [editedTime, setEditedTime] = useState(task.scheduledTime || "");
  const [editedPhotoUrl, setEditedPhotoUrl] = useState(task.photoUrl);

  const handleSave = () => {
    if (editedText.trim()) {
      onEdit(task.id, editedText, editedDescription, editedDate, editedTime, editedPhotoUrl);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedText(task.text);
    setEditedDescription(task.description);
    setEditedDate(task.scheduledDate);
    setEditedTime(task.scheduledTime || "");
    setEditedPhotoUrl(task.photoUrl);
    setIsEditing(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditedPhotoUrl(file.name);
    }
  };

  return (
    <div
      className={cn(
        "group flex flex-col gap-2 p-4 glass-panel rounded-lg mb-3 transition-all duration-300 task-enter",
        task.completed && "opacity-60"
      )}
    >
      <div className="flex items-center gap-4">
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
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Input
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="flex-1"
                autoFocus
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "px-3",
                      editedDate && "text-primary"
                    )}
                  >
                    <CalendarIcon className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={editedDate}
                    onSelect={setEditedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Input
                type="time"
                value={editedTime}
                onChange={(e) => setEditedTime(e.target.value)}
                className="w-32"
              />
              <label className="px-3 py-2 flex items-center justify-center border rounded-md hover:bg-accent cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <ImagePlus className="h-4 w-4" />
              </label>
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
            <Textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              placeholder="Add a description (optional)..."
              className="min-h-[80px]"
            />
          </div>
        ) : (
          <>
            <div className="flex-1">
              <span
                className={cn(
                  "text-lg transition-all block",
                  task.completed && "line-through text-muted-foreground"
                )}
              >
                {task.text}
              </span>
              {task.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {task.description}
                </p>
              )}
              <div className="text-sm text-muted-foreground space-x-4 mt-2">
                {task.scheduledDate && (
                  <span>📅 {format(task.scheduledDate, "PPP")}</span>
                )}
                {task.scheduledTime && (
                  <span>⏰ {task.scheduledTime}</span>
                )}
                {task.photoUrl && (
                  <span>📎 {task.photoUrl}</span>
                )}
              </div>
            </div>
            
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
    </div>
  );
}