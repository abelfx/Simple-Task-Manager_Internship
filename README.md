# 🧠 Simple Task Manager API

This is a simple backend-only Task Manager built using **Node.js** and **Express.js**. It allows users to:

- View a list of tasks
- Add a new task
- Mark a task as completed or update its title
- Delete a task
- Filter tasks by status (completed or pending)

> 💡 All data is stored in-memory using a local JavaScript array. No database required.

---

## 🚀 Features

- ✅ RESTful API design
- 🔄 Task filtering (completed/pending)
- 🧾 Input validations for task creation and updates
- 🌐 CORS enabled for frontend integration
- 🔧 Easily extendable with a database (optional)

## 🧩 Endpoints

### `GET /api/tasks`

Returns all tasks.  
Supports optional filtering by status.

**Query Params:**

| Param   | Description                         | Example                |
|---------|-------------------------------------|------------------------|
| status  | Filter by task status (optional)    | `/api/tasks?status=pending` |

**Example Response:**

```json
[
  {
    "id": "uuid",
    "title": "make injera",
    "completed": false
  }
]

```

![displayCompletedTasks](https://github.com/user-attachments/assets/899f763b-6bff-4f90-8261-6bcc73eff54e)

### `POST /api/tasks`

```json
{
  "title": "Do homework"
}
```
![addtask](https://github.com/user-attachments/assets/1ed1c7a9-c749-42c6-8695-fdc337a3c9d6)


### `PUT /tasks/:id`

```json
{
  "title": "Updated title",
  "completed": true
}
```
![image](https://github.com/user-attachments/assets/fcc4a7c7-198c-47a8-9c55-166123e4744f)


### `DELETE /tasks/:id`

**Example Response**
```json
{
  "message": "Task deleted successfully.",
  "task": {
    "id": "uuid",
    "title": "Deleted task",
    "completed": false
  }
}
```
![image](https://github.com/user-attachments/assets/544d36af-ec18-405b-90cd-b4f3259cfadb)


### Technologies Used
  - Express.js
  - UUID
  - CORS

### How to Install

### 1. Clone the repository

### 2. Navigate into the project directory
cd backend

### 3. Install dependencies
npm install

### 4. Start the server
npm run start for node 
npm run dev for nodemon
