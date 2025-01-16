import { useState } from "react";
import { TaskInput } from "@/components/TaskInput";
import { TaskItem } from "@/components/TaskItem";
import { useToast } from "@/components/ui/use-toast";

interface Task {
  id: string;
  text: string;
  description: string;
  completed: boolean;
  scheduledDate?: Date;
  scheduledTime?: string;
  photoUrl?: string;
}

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { toast } = useToast();

  const addTask = (text: string, description: string, scheduledDate?: Date, scheduledTime?: string, photoUrl?: string) => {
    const newTask = {
      id: crypto.randomUUID(),
      text,
      description,
      completed: false,
      scheduledDate,
      scheduledTime,
      photoUrl,
    };
    setTasks((prev) => [newTask, ...prev]);
    toast({
      title: "Task added",
      description: "Your new task has been added to the list.",
    });
  };

  const completeTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    toast({
      title: "Task deleted",
      description: "The task has been removed from your list.",
      variant: "destructive",
    });
  };

  const editTask = (id: string, newText: string, newDescription: string, scheduledDate?: Date, scheduledTime?: string, photoUrl?: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, text: newText, description: newDescription, scheduledDate, scheduledTime, photoUrl } : task
      )
    );
    toast({
      title: "Task updated",
      description: "Your task has been successfully updated.",
    });
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Tasks</h1>
          <p className="text-muted-foreground">
            Organize your day with elegance and simplicity
          </p>
        </div>

        <TaskInput onAddTask={addTask} />

        <div className="space-y-1">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onComplete={completeTask}
              onDelete={deleteTask}
              onEdit={editTask}
            />
          ))}
          
          {tasks.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No tasks yet. Add one to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;