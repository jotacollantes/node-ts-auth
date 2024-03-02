import 'dotenv/config'
import {get} from 'env-var'

//Definimos el objeto envs
export const envs={
    //get() va a leer de las variables de entorno .env
    PORT: get('PORT').required().asPortNumber()
}