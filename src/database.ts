import {createConnection, Connection} from "typeorm";

export default class ConnectionManager {

    connection :Connection= null;
    
    async getConnection(){

        this.connection = await createConnection({
            "type": "postgres",
            "host": "localhost",
            "username": "postgres",
            "password": "postgres",
            "database": "helpinghand",
            "port": 5432,
            "synchronize": false,
            "logging": "all",
            "logger": "file",
            "migrationsRun": true,
            "entities": [
                "src/**/*.entity.ts"
            ],
            "migrations": [
                "src/migration/*.ts"
            ],
            "subscribers": [
                "src/subscriber/*.ts"
            ],
            "cli": {
                "entitiesDir":  "src/**/*.entity.ts",
                "migrationsDir":  "src/migration",
                "subscribersDir": "src/subscriber"
            }
        });
        return this.connection;
    }

}
