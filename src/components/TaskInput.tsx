import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Calendar as CalendarIcon, Clock, ImagePlus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface TaskInputProps {
  onAddTask: (task: string, scheduledDate?: Date, scheduledTime?: string, photoUrl?: string) => void;
}

export function TaskInput({ onAddTask }: TaskInputProps) {
  const [task, setTask] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>("");
  const [photoUrl, setPhotoUrl] = useState<string>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim()) {
      onAddTask(task, date, time, photoUrl);
      setTask("");
      setDate(undefined);
      setTime("");
      setPhotoUrl(undefined);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // For now, we'll just store the file name until we have backend storage
      setPhotoUrl(file.name);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-8">
      <div className="flex gap-2">
        <Input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task..."
          className="h-12 glass-panel"
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "h-12 px-3",
                date && "text-primary"
              )}
            >
              <CalendarIcon className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="h-12 w-32"
          placeholder="Set time"
        />
        <label className="h-12 px-3 flex items-center justify-center border rounded-md hover:bg-accent cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <ImagePlus className="h-5 w-5" />
        </label>
        <Button type="submit" className="h-12 px-6" disabled={!task.trim()}>
          <PlusCircle className="w-5 h-5 mr-2" />
          Add
        </Button>
      </div>
      {photoUrl && (
        <div className="text-sm text-muted-foreground">
          Selected photo: {photoUrl}
        </div>
      )}
    </form>
  );
}