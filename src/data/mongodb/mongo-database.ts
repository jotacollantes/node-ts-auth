import mongoose from "mongoose";
interface Options {
  mongoUrl: string;
  dbName: string;
}
export class MongoDatabase {
  static async connect({mongoUrl,dbName}:Options) {
    try {
      //mongoose.connect(`mongodb://127.0.0.1:27017/test`);
      await mongoose.connect(mongoUrl,{dbName})
      console.log('Db connected')
      
    } catch (error) {
        console.log(error)
        throw error
    }
  }
}
