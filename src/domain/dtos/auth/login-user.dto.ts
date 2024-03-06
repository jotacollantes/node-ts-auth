import { Validators } from "../../../config";

export class LoginUserDto {
  private constructor(
    public email: string,
    public password: string
  ) {}

  //Recibimos un objeto del tipo req.body, vamos retornar un array donde el primer elemento es el mensaje de error y el segundo elemento es la intancia. La firma [key: string]: any significa que viene cualquier nombre de propiedad y que su valor es de cualquier tipo
  static create(object: { [key: string]: any }): [string?, LoginUserDto?] {

    const {email,password}=object
    if (!email) return ['Missing email',undefined]
    //Como Validators.email retorna una expresion regular podemos usar su metodo integrado test()
    if (!Validators.email.test(email)) return ['Email is not valid',undefined]
    if (!password) return ['Missing password',undefined]
    if (password.length < 6 ) return ['The password must be more than 6 characters',undefined]
    //En este punto todos los datos pasaron la validacion y devolvemos un undefined que representa el mensaje de error como primer elemento y com 2do elemento enviamos una instancia de RegisterUserDto  
    return [undefined,new LoginUserDto(email,password)];
  }
}