import 'dotenv/config';
import "reflect-metadata";
import { DataSource } from "typeorm";
import User from "./entities/User";

const port = parseInt(process.env.POSTGRES_PORT);

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
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
