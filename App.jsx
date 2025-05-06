import { useState, useEffect } from "react";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (newTask.trim() === "") return;

    const task = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };

    setTasks([...tasks, task]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks =
    filter === "all"
      ? tasks
      : filter === "active"
      ? tasks.filter((task) => !task.completed)
      : tasks.filter((task) => task.completed);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl shadow-xl overflow-hidden border border-white/20">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Task Master
          </h1>

          <div className="flex items-center gap-2 mb-6">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <button
              onClick={addTask}
              className="px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add
            </button>
          </div>

          <div className="flex justify-between mb-6">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg transition-all ${
                filter === "all"
                  ? "bg-blue-500 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`px-4 py-2 rounded-lg transition-all ${
                filter === "active"
                  ? "bg-blue-500 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-4 py-2 rounded-lg transition-all ${
                filter === "completed"
                  ? "bg-blue-500 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Completed
            </button>
          </div>

          <div className="space-y-3">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700 group hover:border-blue-500 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="w-5 h-5 rounded-full accent-blue-500 cursor-pointer"
                    />
                    <span
                      className={`${
                        task.completed
                          ? "line-through text-gray-500"
                          : "text-white"
                      }`}
                    >
                      {task.text}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-gray-500 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                  >
                    ✕
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                {filter === "all"
                  ? "Your task list is empty. Add a new task to get started!"
                  : filter === "active"
                  ? "No active tasks. All caught up!"
                  : "No completed tasks yet. Keep going!"}
              </div>
            )}
          </div>

          {tasks.length > 0 && (
            <div className="mt-6 text-sm text-gray-500 text-center">
              {tasks.filter((task) => !task.completed).length} tasks remaining
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
