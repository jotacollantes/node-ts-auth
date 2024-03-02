import { Router } from "express";
import { AuthRoutes } from "./auth/routes";

//Manejador de rutas
export class AppRoutes
{
    //Creamos un getter estatico
    static get routes(): Router {
        const router=Router()
        //Definimos las rutas /api/auth
        router.use('/api/auth',AuthRoutes.routes)

        //retornamos el router
        return router
    }
    static test =()=> {
        return "hola"
    }
}