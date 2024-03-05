import { CustomError, UserEntity } from "../../domain";

/*El término mapeo, se refiere usualmente en la parte de infraestructura, a la labor de transformar un objeto a otro, el cual usualmente es de un objeto a una entidad, esta capa nos ayuda a proteger nuestra lógica de cambios inesperados de la base de datos que van desde nuevas propiedades o cambio de sus nombres.
 */
export class UserMapper {
  static userEntityFromObject(object: { [key: string]: any }) {
    const { _id, id, name, email, password, roles } = object;
    
    // if (!_id || !id) throw CustomError.badRequest("Missing Id");
    if (!(_id || id)) throw CustomError.badRequest("Missing Id");
    if (!name) throw CustomError.badRequest("Missing Name");
    if (!email) throw CustomError.badRequest("Missing Email");
    if (!password) throw CustomError.badRequest("Missing Password");
    if (!roles) throw CustomError.badRequest("Missing Roles");
    return new UserEntity(id || _id, name, email, password, roles);
  }
}
