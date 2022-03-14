import "reflect-metadata";
import {createConnection} from "typeorm";


export default  class formProductConnection{
    connection: any;
    userRepo: any;

    async createConnection(){
        //forming connection
        this.connection = await createConnection().catch(error => console.log(error));
        await console.log("++++++++connection formed++++++++++++++");

    }


    async  clearDatabase(userObj){
        //clearing already existing data
        this.userRepo = await this.connection.getRepository(userObj);
        // this.userRepo.clear().catch(error => console.log(error));
        await console.log("++++++++Data Deleted++++++++++++++");

    }

}