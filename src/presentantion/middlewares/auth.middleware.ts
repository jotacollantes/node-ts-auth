import {Request,Response, NextFunction } from "express";
import { JwtAdapter } from "../../config";
import { ObjectId } from "mongoose";
import { UserModel } from "../../data/mongodb";

export class AuthMiddleware{
    static validateJwt=async (req:Request,res:Response,next:NextFunction)=>{
        //console.log('Paso el middleware')
        const authorization=req.header('Authorization')
        // Si no existe el header
        if (!authorization) return res.status(401).json({error:'No token provided'})
        // SI el header no inicia con Bearer
        if (!authorization.startsWith('Bearer ')) return res.status(401).json({error:'Invalid bearer token'})
        //Tomamos el token que esta en la posicion del arreglo [1]
        const token =authorization.split(' ').at(1) ||''
        
        try {
            // Todo:
            //SIempre se va a recibir un valor ya sea el token decodificado o null
            //* al metodo validateToken le especificamos de manera generica que es de tipo {id:string} y nos va a devolver {id:string}|null 
            const payload=await JwtAdapter.validateToken<{id:string}>(token)
            if (!payload) return res.status(401).json({error:'Invalid Token'})
            //Todo Validamos la existencia del usuario en la bd
            const user=await UserModel.findById(payload.id)
            if(!user) return res.status(401).json({error:'User not Found'})
            //* anadimos el user en el req.body
            req.body.user=user
        } catch (error) {
            console.log(error)
            res.status(500).json({error:'Internal Server Error'})
        }
        
        //--header 'Authorization: Bearer vcbcbvcvb'
        next()
    }
}