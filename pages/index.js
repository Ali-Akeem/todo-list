import { useState, useEffect } from "react";

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [updating, setUpdating] = useState(false);
  const [updTask, setUpdTask] = useState({});

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch("api/tasks");
    const data = await response.json();
    setTasks(data);
  };

  const submitTask = async () => {
    await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ task }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setTask("");
    fetchTasks();
  };

  const deleteTask = async (taskId) => {
    await fetch(`/api/tasks/${taskId}`, {
      method: "DELETE",
    });
    fetchTasks();
  };

  const updateTask = async (taskId) => {
    await fetch(`/api/tasks/${taskId}`, {
      method: "PUT",
      body: JSON.stringify({ task }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setTask("");
    fetchTasks();
    setUpdating(false);
  };

  const triggerTaskUpdate = (taskId) => {
    setUpdating(true);
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    setTask(taskToUpdate.text);
    setUpdTask(taskToUpdate);
  };

  return (
    <div className="container">
      <h1 className="heading">toDo List</h1>

      <input
        className="writtingpad"
        type="text"
        value={task}
        onChange={(e) => {
          setTask(e.target.value);
        }}
      />

      {updating ? (
        <button className="updatebtn" onClick={() => updateTask(updTask?.id)}>
          Update
        </button>
      ) : (
        <button className="submitbtn" onClick={submitTask}>
          Save
        </button>
      )}

      {/** <button className="viewbtn" onClick={fetchTasks}>View tasks</button> */}

      {tasks.map((task) => {
        return (
          <div className="taskcontainer" key={task.id}>
            <span>{task.text}</span>
            <button className="deletebtn" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
            {!updating && (
              <button
                className="updatebtn"
                onClick={() => triggerTaskUpdate(task.id)}
              >
                Update
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default TasksPage;
