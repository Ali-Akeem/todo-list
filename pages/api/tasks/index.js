import { tasks } from "../../../data/tasks";

export default function handler(req, res){
    if(req.method === 'GET'){
        res.status(200).json(tasks)
    } else if(req.method === 'POST'){
        const task = req.body.task
        const newTask = {
            id: Date.now(),
            text: task
        }
        tasks.push(newTask)
        res.status(201).json(newTask)
    } else if(req.method === 'PUT'){
        const task = req.body.task
        const newTask = {
            id: Date.now(),
            text: task
        }
        tasks.push(newTask)
        res.status(201).json(newTask)

    }
    
}