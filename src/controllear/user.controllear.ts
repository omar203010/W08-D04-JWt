import { prisma } from '../config/db';
import {Request, Response} from 'express';
import { User } from '@prisma/client';
import { verify } from 'argon2';
import { string } from 'zod';
import * as jwt from 'jsonwebtoken'
import { access } from 'fs';
const argon2 = require('argon2');



// Create User
export const createUser = async(req:Request, res:Response) => {
    try {

        let c_user = req.body as User

        const hashed = await argon2.hash(req.body.password);

    let user = await prisma.user.create({
        data: {
            name: c_user.name,
            email: c_user.email,
            password:hashed
        }
    });

    if(user) {

        return res.status(200).json({ message: "user created successfully!"+user });
    }

    throw("there was an error, try again!");

    } catch(err) {

        res.status(500).json({ error: err });
    }
}


// Read Users 
export const getAllUsers = async(req:Request, res:Response) => {

    try {
        
        let user = req.body as User

        let users = await prisma.user.findMany({

            where: {
                id: user.id
            },
            select: {
                id:true,
                name: true,
                password: true,
                task: {
                    select: {
                        title: true,
                        IsCombleted: true
                    }
                }
            }
        })

        if(users) {

            return res.status(200).json(users);
        }
    
        throw("there was an error, try again!");

    } catch(err) {

        res.status(500).json({ error: err });
    }
}


//login


export const login = async (req:Request, res:Response) => {
     try{
    let l_user = req.body as User

    let user = await prisma.user.findUnique({
        where: {
            email: l_user.email
            
        }
    });
    if (!user){
        return res.status(400).json({Error:"Weong email adress"});

    }else if(!await argon2.verify(user.password,req.body.password)){
        return res.status(400).json({Error:"Wrong password"});
    }
    const token = jwt.sign({
        id:user.id,
        name:user.name
    }, process.env.API_SECRET as string,{expiresIn:"3h"});
    return res.status(200).json({
        message:`hello ${user.name}`,
        token:token
    });
}catch(e){
    res.status(500).json({"wrror":e})
}
}





// interface user{
//     name:string,
//     role:string
// }

// import * as jwt from 'jsinwebtoken'
// const mysecret
// let enToken = jwt.sign ({name:"omar",role:"admin"},mysecret,{expiresIn});
// log(enToken);
// let deToken = jwt.verify(enToken,"mysecret") as user;
//log deToken
//log deToken.name
//log deToken.role