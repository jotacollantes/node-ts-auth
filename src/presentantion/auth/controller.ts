import { Request,Response } from "express"
export class AuthController {
    //* DI
    consturctor() {

    }
    registerUser=(req:Request,res:Response)=>{
        res.json('Register user controller')

    }
    loginUser=(req:Request,res:Response)=>{
        res.json('Login user controller')
    }
}