import {createConnection, Connection} from "typeorm";

export default class ConnectionManager {

    connection :Connection= null;
    
    async getConnection(){

        this.connection = await createConnection({
            "type": "postgres",
            "host": "localhost",
            "username": "postgres",
            "password": "postgres",
            "database": "postgres",
            "port": 5432,
            "synchronize": true,
            "logging": false,
            "entities": [
                __dirname + '/entity/*.ts'
            ],
            "migrations": [
               "src/migration/**/*.ts"
            ],
            "subscribers": [
               "src/subscriber/**/*.ts"
            ],
            "cli": {
               "entitiesDir": "src/entity",
               "migrationsDir": "src/migration",
               "subscribersDir": "src/subscriber"
            }
        });
        return await this.connection;
    }

}
