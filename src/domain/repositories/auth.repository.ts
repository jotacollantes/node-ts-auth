
import { LoginUserDto, RegisterUserDto } from "..";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthRepository {
    //todo login
    abstract login(loginUserDto:LoginUserDto):Promise<UserEntity>

    abstract register(registerUserDto:RegisterUserDto):Promise<UserEntity>
}