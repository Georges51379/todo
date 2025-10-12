import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, Pin, Star, Check, Filter, FolderOpen, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

interface TodoItem {
  id: string;
  text: string;
  isDone: boolean;
  isPinned: boolean;
  isImportant: boolean;
  priority: "low" | "medium" | "high";
  createdAt: number;
}

interface Project {
  id: string;
  name: string;
  todos: TodoItem[];
  createdAt: number;
}

const ToDo = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [projectInput, setProjectInput] = useState("");
  const [todoInput, setTodoInput] = useState("");
  const [filter, setFilter] = useState<"all" | "done" | "undone" | "pinned" | "important">("all");

  useEffect(() => {
    const savedProjects = localStorage.getItem("projects");
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const sanitizeInput = (input: string) => {
    return input.replace(/<[^>]*>/g, "").trim();
  };

  const addProject = () => {
    const sanitized = sanitizeInput(projectInput);
    if (!sanitized) {
      toast.error("Please enter a project name");
      return;
    }

    const newProject: Project = {
      id: Date.now().toString(),
      name: sanitized,
      todos: [],
      createdAt: Date.now(),
    };

    setProjects([newProject, ...projects]);
    setProjectInput("");
    toast.success("Project created successfully");
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
    if (selectedProject === id) {
      setSelectedProject(null);
    }
    toast.success("Project deleted");
  };

  const addTodo = () => {
    if (!selectedProject) return;

    const sanitized = sanitizeInput(todoInput);
    if (!sanitized) {
      toast.error("Please enter a todo item");
      return;
    }

    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text: sanitized,
      isDone: false,
      isPinned: false,
      isImportant: false,
      priority: "medium",
      createdAt: Date.now(),
    };

    setProjects(
      projects.map((project) =>
        project.id === selectedProject
          ? { ...project, todos: [newTodo, ...project.todos] }
          : project
      )
    );
    setTodoInput("");
    toast.success("Todo added successfully");
  };

  const deleteTodo = (todoId: string) => {
    setProjects(
      projects.map((project) =>
        project.id === selectedProject
          ? { ...project, todos: project.todos.filter((t) => t.id !== todoId) }
          : project
      )
    );
    toast.success("Todo deleted");
  };

  const toggleTodoDone = (todoId: string) => {
    setProjects(
      projects.map((project) =>
        project.id === selectedProject
          ? {
              ...project,
              todos: project.todos.map((todo) =>
                todo.id === todoId ? { ...todo, isDone: !todo.isDone } : todo
              ),
            }
          : project
      )
    );
  };

  const toggleTodoPin = (todoId: string) => {
    setProjects(
      projects.map((project) =>
        project.id === selectedProject
          ? {
              ...project,
              todos: project.todos.map((todo) =>
                todo.id === todoId ? { ...todo, isPinned: !todo.isPinned } : todo
              ),
            }
          : project
      )
    );
  };

  const toggleTodoImportant = (todoId: string) => {
    setProjects(
      projects.map((project) =>
        project.id === selectedProject
          ? {
              ...project,
              todos: project.todos.map((todo) =>
                todo.id === todoId ? { ...todo, isImportant: !todo.isImportant } : todo
              ),
            }
          : project
      )
    );
  };

  const changePriority = (todoId: string, priority: "low" | "medium" | "high") => {
    setProjects(
      projects.map((project) =>
        project.id === selectedProject
          ? {
              ...project,
              todos: project.todos.map((todo) =>
                todo.id === todoId ? { ...todo, priority } : todo
              ),
            }
          : project
      )
    );
  };

  const currentProject = projects.find((p) => p.id === selectedProject);

  const sortedTodos = currentProject
    ? [...currentProject.todos].sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        if (a.isImportant && !b.isImportant) return -1;
        if (!a.isImportant && b.isImportant) return 1;
        return b.createdAt - a.createdAt;
      })
    : [];

  const filteredTodos = sortedTodos.filter((todo) => {
    if (filter === "done") return todo.isDone;
    if (filter === "undone") return !todo.isDone;
    if (filter === "pinned") return todo.isPinned;
    if (filter === "important") return todo.isImportant;
    return true;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-destructive";
      case "medium":
        return "text-warning";
      case "low":
        return "text-success";
      default:
        return "";
    }
  };

  if (!selectedProject) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 max-w-6xl animate-fade-in">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              My Projects
            </h1>
            <p className="text-muted-foreground">
              Organize your work into projects. Click on a project to manage its todos.
            </p>
          </div>

          <Card className="task-card p-6 mb-8">
            <div className="flex gap-2">
              <input
                type="text"
                value={projectInput}
                onChange={(e) => setProjectInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addProject()}
                placeholder="Create a new project..."
                className="flex-1 px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button onClick={addProject} size="lg" className="btn-primary">
                <Plus className="h-5 w-5" />
              </Button>
            </div>
          </Card>

          {projects.length === 0 ? (
            <Card className="task-card p-12 text-center">
              <FolderOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No projects yet. Create one to get started!
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="task-card p-6 cursor-pointer hover:scale-105 transition-all duration-300"
                  onClick={() => setSelectedProject(project.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <FolderOpen className="h-8 w-8 text-accent" />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProject(project.id);
                      }}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {project.todos.length} todo{project.todos.length !== 1 ? "s" : ""}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <div className="flex-1 text-center p-2 rounded bg-success/10">
                      <p className="text-xs text-muted-foreground">Done</p>
                      <p className="font-semibold text-success">
                        {project.todos.filter((t) => t.isDone).length}
                      </p>
                    </div>
                    <div className="flex-1 text-center p-2 rounded bg-warning/10">
                      <p className="text-xs text-muted-foreground">Pending</p>
                      <p className="font-semibold text-warning">
                        {project.todos.filter((t) => !t.isDone).length}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl animate-fade-in">
        <Button
          variant="ghost"
          onClick={() => setSelectedProject(null)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {currentProject?.name}
          </h1>
          <p className="text-muted-foreground">
            Manage todos for this project. Set priorities and track progress.
          </p>
        </div>

        <Card className="task-card p-6 mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTodo()}
              placeholder="Add a new todo..."
              className="flex-1 px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button onClick={addTodo} size="lg" className="btn-primary">
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

        <div className="space-y-3">
          {filteredTodos.map((todo) => (
            <Card
              key={todo.id}
              className={`task-card p-4 ${
                todo.isImportant ? "border-destructive" : ""
              } ${todo.isPinned ? "border-primary" : ""}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleTodoDone(todo.id)}
                  className={todo.isDone ? "text-success" : ""}
                >
                  <Check className="h-5 w-5" />
                </Button>

                <span
                  className={`flex-1 ${
                    todo.isDone ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {todo.text}
                </span>

                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleTodoPin(todo.id)}
                    className={todo.isPinned ? "text-primary" : ""}
                  >
                    <Pin className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleTodoImportant(todo.id)}
                    className={todo.isImportant ? "text-destructive" : ""}
                  >
                    <Star className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo(todo.id)}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-2 ml-12">
                {["low", "medium", "high"].map((p) => (
                  <Button
                    key={p}
                    variant="ghost"
                    size="sm"
                    onClick={() => changePriority(todo.id, p as any)}
                    className={`capitalize ${
                      todo.priority === p ? getPriorityColor(p) : ""
                    }`}
                  >
                    {p}
                  </Button>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {filteredTodos.length === 0 && (
          <Card className="task-card p-12 text-center">
            <p className="text-muted-foreground">
              {filter === "all"
                ? "No todos yet. Add one to get started!"
                : `No ${filter} todos found.`}
            </p>
          </Card>
        )}

        {currentProject && (
          <Card className="task-card p-4 mt-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">
                  {currentProject.todos.length}
                </p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-success">
                  {currentProject.todos.filter((t) => t.isDone).length}
                </p>
                <p className="text-sm text-muted-foreground">Done</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-warning">
                  {currentProject.todos.filter((t) => !t.isDone).length}
                </p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">
                  {currentProject.todos.filter((t) => t.isPinned).length}
                </p>
                <p className="text-sm text-muted-foreground">Pinned</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-destructive">
                  {currentProject.todos.filter((t) => t.isImportant).length}
                </p>
                <p className="text-sm text-muted-foreground">Important</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default ToDo;
