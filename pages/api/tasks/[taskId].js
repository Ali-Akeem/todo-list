import { tasks } from "../../../data/tasks";

export default function handler(req, res) {
    const { taskId } = req.query

    if(req.method === 'GET'){
        const task = tasks.find(
            (task) => task.id === parseInt(taskId)
        )
        res.status(200).json(task)
    }else if (req.method === 'DELETE'){
        const deletedTask = tasks.find(
            (task) => task.id === parseInt(taskId)
        )
        const index = tasks.findIndex(
            (task) => task.id === parseInt(taskId)
        )
        tasks.splice(index, 1)
        res.status(200).json(deletedTask)
    } else if (req.method === 'PUT'){
        {/**
            tasks.map(task => {
            if(task.id === taskId){
                return {...tasks, task}
            }
            return task
        })
        res.status(200).json(tasks)    
        */}
    }
}