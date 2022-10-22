import 'dotenv/config';
import "reflect-metadata";
import { DataSource } from "typeorm";
import User from "./entities/User";

const port = parseInt(process.env.TYPEORM_PORT);

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.TYPEORM_HOST,
    port,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    synchronize: true,
    logging: false,
    entities: [
        User
    ],
    migrations: [
        "./src/migrations/*.ts"
    ],
    subscribers: [
        "./src/subscribers/*.ts"
    ],
    
})
