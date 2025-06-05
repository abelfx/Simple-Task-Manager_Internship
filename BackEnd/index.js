const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// demo data as a local array
let tasks = [
  { id: uuidv4(), title: "make injera", completed: false },
  { id: uuidv4(), title: "feed the chickens", completed: true },
  { id: uuidv4(), title: "go to kebele", completed: true },
];

// Display a List of tasks
app.get("/api/tasks", (req, res) => {
  const { status } = req.query;
  let filtered = tasks;

  // we can request completed, pending or all tasks to be displayed
  if (status !== undefined) {
    if (status === "completed") {
      filtered = tasks.filter((task) => task.completed === true);
    } else if (status === "pending") {
      filtered = tasks.filter((task) => task.completed === false);
    } else {
      return res.status(400).json({
        error: 'Invalid status filter. Use "completed" or "pending".',
      });
    }
  }

  return res.json(filtered);
});

// Add a new task
app.post("/api/addtasks", (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res
      .status(400)
      .json({ error: "Title is required and must be a non-empty string." });
  }

  const newTask = {
    id: uuidv4(),
    title: title.trim(),
    completed: false,
  };
  tasks.push(newTask);
  return res.status(201).json(newTask);
});

// Mark task as completed -- update task
app.put("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found." });
  }

  // Validate and update title if provided
  if (title !== undefined) {
    if (typeof title !== "string" || title.trim() === "") {
      return res
        .status(400)
        .json({ error: "If provided, title must be a non-empty string." });
    }
    tasks[index].title = title.trim();
  }

  // Validate and update completed if provided
  if (completed !== undefined) {
    if (typeof completed !== "boolean") {
      return res
        .status(400)
        .json({ error: "If provided, completed must be a boolean." });
    }
    tasks[index].completed = completed;
  }

  return res.json(tasks[index]);
});

// Delete task
app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found." });
  }

  const [deleted] = tasks.splice(index, 1);
  return res.json({ message: "Task deleted successfully.", task: deleted });
});

// listening on port == PORT but for you guys 3000 since you will not have access to the env
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}....`);
});
