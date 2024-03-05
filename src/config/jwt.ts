import jwt from "jsonwebtoken";
import { envs } from ".";
export const JWT_SEED=envs.JWT_SEED
export class JwtAdapter {
  static async generateToken(
    payload: Object,
    duration: string = "2h"
  ): Promise<string | null> {
    return new Promise((resolve) => {
      //todo generacion del seed
      //Siempre se resuelve algo o null o el token
      jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
        if (err) return resolve(null);
        //en este piunto si todo sale bien se envia el token
        resolve(token!);
      });
    });
  }
  
  //*Sin promesa 
  // signToken = (email: string) => {
  //   if (!process.env.JWT_SECRET_SEED) {
  //     throw new Error("No hay Semilla de error");
  //   }

  //   return jwt.sign(
  //     //!Payload
  //     { email },
  //     //!Seed
  //     "SEED",
  //     //!Opciones
  //     { expiresIn: "1d" }
  //   );
  // };

 //* El tipo T tiene la firma <{id:string}> especificado en la llamada al metodo const payload=await JwtAdapter.validateToken<{id:string}>(token)    
  static validateToken<T>(token:string):Promise<T|null>{
    return new Promise((resolve)=>{
      jwt.verify(token,JWT_SEED,(error,decoded)=>{
        //si viene el error enviamos null
        if(error) return resolve(null)
        //si no hay error enviamos el token decodificado, SIEMPRE ENVIAMREMOS ALGO por el resolv de manera exitosa. definimos el tipo de datos de decode como T ya que es el tipo que se envio desde la llamada al metodo

        resolve(decoded as T)
      })
    })
  }
}
