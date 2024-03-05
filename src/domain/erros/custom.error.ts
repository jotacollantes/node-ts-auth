export class CustomError extends Error{
    constructor(
        public readonly statusCode: number,
        public readonly message: string,

    ){
        //invocamos a la clase padre que es Error con super(message)
        super(message);
    }
    static badRequest(message:string){
        return new CustomError(400,message)
    }
    static unauthorized(message:string){
        return new CustomError(401,message)
    }

    static forbbiden(message:string){
        return new CustomError(403,message)
    }
    static notFound(message:string){
        return new CustomError(404,message)
    }

    static internalServer(message:string='Internal server error'){
        
        return new CustomError(500,message)
    }
}