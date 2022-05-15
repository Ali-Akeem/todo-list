export default async function handler(req, res) {
  if (req.method === "GET") {
    const response = await fetch("http://localhost:3004/tasks");
    const tasks = await response.json();
    res.status(200).json(tasks);
  } else if (req.method === "POST") {
    const task = req.body.task;
    const newTask = {
      id: Date.now(),
      text: task,
    };
    fetch("http://localhost:3004/tasks", {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // tasks.push(newTask);
    // console.log("tasks after post", tasks);
    // res.status(201).json(newTask);
  }
}
