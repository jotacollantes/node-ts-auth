import { Request, Response } from "express";
import { AuthRepository, CustomError, LoginUser, LoginUserDto, RegisterUser, RegisterUserDto } from "../../domain";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
export class AuthController {
  //* DI
  constructor(
    //El tipo siempre seran las abstracciones.
    private readonly authRepository: AuthRepository
  ) {}

  private handlerError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    //*En este punto no sabemos que tipo de error es ya que no esta en el listado de los error personalizados o controlados
    console.log(error);
    return res.status(500).json({ error: "Server Internal Error" });
  };

  registerUser = async (req: Request, res: Response) => {
    // No puedo crear una instancia del contructor porque ese solo se puede crear intermente. esta definido como private

    //Create le enviamos como argumento el req.body devuelve un array [error,dto]
    const [error, registerUserDto] = RegisterUserDto.create(req.body);

    if (error) return res.status(400).json({ error });

    //res.json('Register user controller')
    // en este punto todos los datos fueron verificados.
    //res.json(registerUserDto)

    // //* con callbacks()
    // //this.authRepository.register(registerUserDto!).then((user)=>res.json(user)).catch((error)=>res.status(500).json(error))
    // //* Con async/await
    // try {
    //   const user = await this.authRepository.register(registerUserDto!);
    //   res.json({
    //     user,
    //     //Generamos el JWT
    //     //token: await JwtAdapter.generateToken({ email: user.email }),
    //     token: await JwtAdapter.generateToken({ id: user.id }),
    //   });
    // } catch (error) {
    //   //res.status(500).json(error);
    //   this.handlerError(error, res);
    // }
   //! Con casos de usos
     //no se especifica el 2do argumento que es el jwtadapter ya que tomara el valor por defecto
     new RegisterUser(this.authRepository).execute(registerUserDto!).then((user)=>res.json(user)).catch((error)=>this.handlerError(error, res))
  };

  loginUser = (req: Request, res: Response) => {
    //res.json("Login user controller");
    const [error, loginUserDto] = LoginUserDto.create(req.body);
    if (error) return res.status(400).json({ error });
    //Mandamos la instancia del repositorio al caso de uso
    new LoginUser(this.authRepository).execute(loginUserDto!).then((user)=>res.json(user)).catch((error)=>this.handlerError(error, res))
  };

  getUsers=(req:Request,res:Response)=>{
    UserModel.find()
    //el campo user fue anadido al req.body en el middleware
    .then((users)=>res.json({user:req.body.user}))
    .catch(()=>res.status(500).json({error:'Internal server error'}))

  }
}
