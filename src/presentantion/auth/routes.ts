import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";

//Manejador de rutas  de auth con las llamadas a su controlador
export class AuthRoutes {
  //Creamos un getter estatico
  static get routes(): Router {
    const router = Router();
    //aqui ya se usa las implementaciones.
    const datasource=new AuthDatasourceImpl()
    // La instancia AuthRepositoryImpl necesita que se le envie un objeto de tipo datasource, aqui ya se usa las implementaciones.
    const authRepository=new AuthRepositoryImpl(datasource)
    // La instancia AuthConroller necesita que se le envie un objeto de tipo AuthRepository 
    const controller=new AuthController(authRepository)
    //Definimos las rutas Principales
    //enviamos solo la referencia porque tambien puede ser (req,res)=>controller.loginUser(req,res) y en js se puede obiar 
    router.post("/login", controller.loginUser);
    router.post("/register", controller.registerUser);

    //retornamos el router
    return router;
  }
}
