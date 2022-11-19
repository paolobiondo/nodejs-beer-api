import { DataSource } from "typeorm"
import {Beer} from '../models/beer'
import {Production} from '../models/production'

export const dataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Beer,Production],
    synchronize: true,
    timezone: 'utc' 
})
