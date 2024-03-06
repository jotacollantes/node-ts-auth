
import { AuthRepository, CustomError, RegisterUserDto } from "../..";
import { JwtAdapter } from "../../../config";

interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
interface RegisterUserUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<UserToken>;
}
type SignToken=  (payload: Object, duration?: string)=> Promise<string | null>

export class RegisterUser implements RegisterUserUseCase {

     //DI
    constructor(
        //el tipo AuthRepository es la abstraccion
        private readonly authRepository: AuthRepository,
        //Puedo como mandar como valor por defecto la referencia de JwtAdapter.generateToken
        private readonly signToken:SignToken=JwtAdapter.generateToken
    ){}
  async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
    //throw new Error("Method not implemented.");

    //Crear usuario
    const user = await this.authRepository.register(registerUserDto)
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