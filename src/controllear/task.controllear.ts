import { Task } from '@prisma/client';
import { prisma } from '../config/db';
import {Request, Response} from 'express';

// CREATE
export const createTask = async (req:Request, res:Response) =>{
    try{
    const task = await prisma.task.create({
    data:{
    title:req.body.title,
    userId:res.locals.user.Id
    }
    });
    if(task){
    res.status(200).json({msg:"task created!"})
    }
    }catch(e){
    res.status(500).json({msg:`Error: ${e}`});
    }
    }
    


// Read Tasks
export const getAllTasks = async(req:Request, res:Response) => {

    try {

        let task = req.body as Task

        let tasks = await prisma.task.findMany({
            where: {
                userId:res.locals.user.Id
            },
            select: {
                id:true,
                title: true,
                IsCombleted: true,
                user: {
                    select: {
                        name: true
                    }
                }
            }
        })

        if(tasks) {

            return res.status(200).json(tasks);
        }
    
        throw("there was an error, try again!");

    } catch(err) {

        res.status(500).json({ error: err });
    }
}


// UPDATE
export const updateTask = async(req:Request, res:Response) => {
    
    let u_task = req.body as Task

    let { id } = req.params

    let task = await prisma.task.updateMany({
        where: {
            id: id,
            userId:res.locals.user.Id
        },
        data: {
            title: u_task.title,
            IsCombleted: u_task.IsCombleted
        }
    })

    if(task.count == 0) {

        res.status(200).json({ message: "No task updated" });

    } else {

        return res.status(200).json({ message: "task updated successfully!" });
    }

    throw("there was an error, try again!");
}

// DELETE
export const deleteTask = async(req:Request, res:Response) => {
    
    let d_task = req.body as Task

    let { id } = req.params

    let task = await prisma.task.deleteMany({
        where: {
            id: id,
            userId:res.locals.user.Id
        }
    })

    if(task.count == 0) {

        res.status(200).json({ message: "No task deleted" });

    } else {

        return res.status(200).json({ message: "task deleted successfully!" });
    }

    throw("there was an error, try again!");
}