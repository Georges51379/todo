import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, Pin, Star, Check, Filter } from "lucide-react";
import { toast } from "sonner";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

interface Task {
  id: string;
  text: string;
  isDone: boolean;
  isPinned: boolean;
  isImportant: boolean;
  createdAt: number;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState<"all" | "done" | "undone" | "pinned" | "important">("all");

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const sanitizeInput = (input: string) => {
    return input.replace(/<[^>]*>/g, "").trim();
  };

  const addTask = () => {
    const sanitized = sanitizeInput(inputValue);
    if (!sanitized) {
      toast.error("Please enter a task");
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      text: sanitized,
      isDone: false,
      isPinned: false,
      isImportant: false,
      createdAt: Date.now(),
    };

    setTasks([newTask, ...tasks]);
    setInputValue("");
    toast.success("Task added successfully");
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.success("Task deleted");
  };

  const toggleDone = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  const togglePin = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isPinned: !task.isPinned } : task
      )
    );
  };

  const toggleImportant = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isImportant: !task.isImportant } : task
      )
    );
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(filteredTasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const reorderedTasks = items.map((task, index) => ({
      ...task,
      createdAt: Date.now() - index,
    }));

    const updatedTasks = tasks.map(
      (task) => reorderedTasks.find((t) => t.id === task.id) || task
    );
    setTasks(updatedTasks);
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    if (a.isImportant && !b.isImportant) return -1;
    if (!a.isImportant && b.isImportant) return 1;
    return b.createdAt - a.createdAt;
  });

  const filteredTasks = sortedTasks.filter((task) => {
    if (filter === "done") return task.isDone;
    if (filter === "undone") return !task.isDone;
    if (filter === "pinned") return task.isPinned;
    if (filter === "important") return task.isImportant;
    return true;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl animate-fade-in">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            My Tasks
          </h1>
          <p className="text-muted-foreground">
            Manage your daily tasks with ease. Pin, prioritize, and track your progress.
          </p>
        </div>

        <Card className="task-card p-6 mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTask()}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button onClick={addTask} size="lg" className="btn-primary">
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </Card>

        <div className="flex flex-wrap gap-2 mb-6">
          {["all", "done", "undone", "pinned", "important"].map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              onClick={() => setFilter(f as typeof filter)}
              className="capitalize"
            >
              <Filter className="h-4 w-4 mr-2" />
              {f}
            </Button>
          ))}
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-3"
              >
                {filteredTasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided, snapshot) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`task-card p-4 ${
                          snapshot.isDragging ? "shadow-lg scale-105" : ""
                        } ${task.isImportant ? "border-destructive" : ""} ${
                          task.isPinned ? "border-primary" : ""
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleDone(task.id)}
                            className={task.isDone ? "text-success" : ""}
                          >
                            <Check className="h-5 w-5" />
                          </Button>

                          <span
                            className={`flex-1 ${
                              task.isDone ? "line-through text-muted-foreground" : ""
                            }`}
                          >
                            {task.text}
                          </span>

                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => togglePin(task.id)}
                              className={task.isPinned ? "text-primary" : ""}
                            >
                              <Pin className="h-4 w-4" />
                            </Button>

                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleImportant(task.id)}
                              className={task.isImportant ? "text-destructive" : ""}
                            >
                              <Star className="h-4 w-4" />
                            </Button>

                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteTask(task.id)}
                              className="text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {filteredTasks.length === 0 && (
          <Card className="task-card p-12 text-center">
            <p className="text-muted-foreground">
              {filter === "all"
                ? "No tasks yet. Add one to get started!"
                : `No ${filter} tasks found.`}
            </p>
          </Card>
        )}

        <Card className="task-card p-4 mt-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">{tasks.length}</p>
              <p className="text-sm text-muted-foreground">Total</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-success">
                {tasks.filter((t) => t.isDone).length}
              </p>
              <p className="text-sm text-muted-foreground">Done</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-warning">
                {tasks.filter((t) => !t.isDone).length}
              </p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">
                {tasks.filter((t) => t.isPinned).length}
              </p>
              <p className="text-sm text-muted-foreground">Pinned</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-destructive">
                {tasks.filter((t) => t.isImportant).length}
              </p>
              <p className="text-sm text-muted-foreground">Important</p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Tasks;
