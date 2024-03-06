import { AuthDataSource, AuthRepository, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";

export class AuthRepositoryImpl implements AuthRepository{

constructor(
   //Inyeccion de dependencia authDatasource es del tipo AuthDataSource que es la abstraccion del AuthDataSource
    private readonly authDatasource: AuthDataSource
){}
    login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return this.authDatasource.login(loginUserDto)
    }

    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.authDatasource.register(registerUserDto)
    }
    
}