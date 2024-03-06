import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import {
  AuthDataSource,
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from "../../domain";
import { UserMapper } from "../mappers/user.mapper";


type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDatasourceImpl implements AuthDataSource {
  //* para romper la dependencia oculta de BcryptAdapter podemos usar DI
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}
  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    //throw new Error("Method not implemented.");
    const { email, password } = loginUserDto;
    try {
      //Buscamos el usuario
      const userSession =await UserModel.findOne({email:email})
      if (!userSession)  //Se va por el catch
      throw CustomError.badRequest("User not found");
      
      //en este punto verificamos las contrasenas
      if (!this.comparePassword(password,userSession.password))
      throw CustomError.badRequest("Password is invalid");
      //Em este punto devolvemos la entidad UserEntity
      return UserMapper.userEntityFromObject(userSession)
    } catch (error) {
      //Los mensajes de errores son una intancia de CustomError
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    //throw new Error("Method not implemented.");
    const { name, email, password } = registerUserDto;
    try {
      //todo 1. verificar si el correo existe
      const userExist = await UserModel.findOne({ email });
      if (userExist) {
        //Se va por el catch
        throw CustomError.badRequest("User already exist");
      }
      //todo 2. Hash de clave

      const userNew = await UserModel.create({
        name,
        email,
        //*Para romper la dependencia oculta
        //password:BcryptAdapter.hash(password)
        password: this.hashPassword(password),
      });
      await userNew.save();
      //3. mapear a la identidad
      //return new UserEntity(userNew.id,name,email,userNew.password,userNew.roles);
      //console.log('userNew', JSON.stringify(userNew, null, 2))
      return UserMapper.userEntityFromObject(userNew)
    } catch (error) {
      //Los mensajes de errores son una intancia de CustomError
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
