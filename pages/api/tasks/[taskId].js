export default async function handler(req, res) {
  const { taskId } = req.query;

  if (req.method === "GET") {
    const response = await fetch(`http://localhost:3004/tasks/${taskId}`);
    const task = await response.json();
    res.status(200).json(task);
  } else if (req.method === "DELETE") {
    await fetch(`http://localhost:3004/tasks/${taskId}`, {
      method: "DELETE",
    });
    res.status(200).json({ message: "Task deleted" });
  }
  // const delTask = tasks.find((task) => task.id === parseInt(taskId));
  // const index = tasks.findIndex((task) => task.id === parseInt(taskId));
  // tasks.splice(index, 1);
  // res.status(200).json(delTask);
  else if (req.method === "PUT") {
    await fetch(`http://localhost:3004/tasks/${taskId}`, {
      method: "PUT",
      body: JSON.stringify({ id: taskId, text: req.body.task }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    res.status(200).json({ message: "Task Updated" });
    // const updTask = tasks.find((task) => task.id == parseInt(taskId));
    // const index = tasks.findIndex((task) => task.id === parseInt(taskId));
    // console.log("index", index);
    // tasks[index] = {
    //   ...updTask,
    //   text: tasktxt,
    // };
    // console.log("tasks", tasks);
    // res.status(200).json(updTask);
  }
}
