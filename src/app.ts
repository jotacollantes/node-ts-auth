//Funcion anonima autoexec

import { envs } from "./config"
import { MongoDatabase } from "./data/mongodb"
import { AppRoutes } from "./presentantion/routes"
import { Server } from "./presentantion/server"

(()=>{
main()
})()

async function main()
{
    //todo: Conexion a DB
    await MongoDatabase.connect({
        mongoUrl:envs.MONGO_URL,
        dbName:envs.MONGO_DB_NAME})
    //todo inicio del server
    //llamo al objeto envs que es el unico lugar donde se va a configurar la manera en que se llaman las variables de entorno.
    new Server({
        port:envs.PORT,
        //Llamamos al archivo principal de rutas por medio de su metodo getter estatico routes
        routes:AppRoutes.routes
    }).start()
}