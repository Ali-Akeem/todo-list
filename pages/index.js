import { useState } from "react"

function TasksPage() {

  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState('')

  const fetchTasks = async () => {
    const response = await fetch('api/tasks')
    const data = await response.json()
    setTasks(data)
  }

  const submitTask = async () => {
    const response = await fetch('api/tasks', {
      method: 'POST',
      body: JSON.stringify({ task }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    console.log(data)
  }

  const deleteTask = async taskId => {
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: 'DELETE',
    })
    fetchTasks()
  }

  const updateTask = async taskId => {
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify({ task }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  return (
    <div className="container">
      <h1 className="heading">toDo List</h1>
      <input 
        className="writtingpad"
        type='text'
        value={task}
        onChange={ e => setTask(e.target.value)}
      />

      <button className="submitbtn" onClick={submitTask}>Submit</button>
      
      <button className="viewbtn" onClick={fetchTasks}>View tasks</button>

      {
        tasks.map( task => {
          return(
            <div className="taskcontainer" key={task.id}>
                {task.text}
                <button 
                  className="deletebtn" 
                  onClick={ () => deleteTask(task.id)}  
                >
                  Delete
                </button> 
                <button 
                  className="updatebtn"
                  onClick={() => updateTask(task.id)}
                >
                  Update
                </button>
            </div>
          )
        })
      }
    </div>
  )
}

export default TasksPage