import { createPool } from "mysql2/promise";


export const con = createPool({
    host: '172.17.0.6',
    user: 'root',
    password: 'WILDones123',
    port: '3306',
    database: 'alumnos'
})