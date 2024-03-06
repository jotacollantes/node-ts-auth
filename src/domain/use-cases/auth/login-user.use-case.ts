import { AuthRepository, CustomError, LoginUserDto } from "../..";
import { JwtAdapter } from "../../../config";

interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
interface LoginUserUseCase {
  execute(loginUserDto: LoginUserDto): Promise<UserToken>;
}

type SignToken=  (payload: Object, duration?: string)=> Promise<string | null>

export class LoginUser implements LoginUserUseCase {

     //DI
    constructor(
        //el tipo AuthRepository es la abstraccion
        private readonly authRepository: AuthRepository,
        //Puedo como mandar como valor por defecto la referencia de JwtAdapter.generateToken
        private readonly signToken:SignToken=JwtAdapter.generateToken
    ){}
  async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
    //throw new Error("Method not implemented.");

    //Crear usuario
    const user = await this.authRepository.login(loginUserDto)
    //Token
    const token=await this.signToken({id:user.id},'2h')
    if (!token) throw CustomError.internalServer('Error generating token')
    return {
      token: token,
      user: {
        id:user.id,
        name:user.name,
        email:user.email,
      },
    };
  }
}