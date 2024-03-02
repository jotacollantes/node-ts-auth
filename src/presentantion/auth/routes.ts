import { Router } from "express";
import { AuthController } from "./controller";

//Manejador de rutas  de auth con las llamadas a su controlador
export class AuthRoutes {
  //Creamos un getter estatico
  static get routes(): Router {
    const router = Router();
    const controller=new AuthController
    //Definimos las rutas Principales
    //enviamos solo la referencia porque tambien puede ser (req,res)=>controller.loginUser(req,res) y en js se puede obiar 
    router.post("/login", controller.loginUser);
    router.post("/register", controller.registerUser);

    //retornamos el router
    return router;
  }
}
