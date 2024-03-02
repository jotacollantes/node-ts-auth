import express, { Router } from "express";

//Interface para el constructor
interface Options {
  port?: number;
  routes:Router
}
export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;
  //para especificar los parametros del express server enviamos los valores al constructor
  //En este punto no es necesario usar las variables de entorno porque crea dependencia oculta
  constructor({ port = 3100,routes }: Options) {
    this.port = port;
    this.routes=routes
  }
  async start() {
    //Usar las rutas definidas
    this.app.use(this.routes)
    this.app.listen(this.port, () => {
      console.log(`server running on port ${this.port}`);
    });
  }
}
