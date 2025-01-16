import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";

interface TaskInputProps {
  onAddTask: (task: string) => void;
}

export function TaskInput({ onAddTask }: TaskInputProps) {
  const [task, setTask] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim()) {
      onAddTask(task);
      setTask("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
      <Input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task..."
        className="h-12 glass-panel"
      />
      <Button type="submit" className="h-12 px-6" disabled={!task.trim()}>
        <PlusCircle className="w-5 h-5 mr-2" />
        Add
      </Button>
    </form>
  );
}