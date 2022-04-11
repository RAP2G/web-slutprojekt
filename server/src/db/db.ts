import path from "path";
import { Pool } from "node-postgres";
import { migrate } from "postgres-migrations";

const poolConfig = {
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.DB_HOST,
    port: Number( process.env.DB_PORT),
    max: Number(process.env.DB_POOL_SIZE),
    idleTimeoutMillis: Number(process.env.DB_POOL_CLIENT_IDLE_TIMEOUT),
    connectionTimeoutMillis: Number(process.env.DB_POOL_CLIENT_CONNECTION_TIMEOUT),

}

const pool = new Pool (poolConfig)

const db = {
    runMigartions: async function (): Promise<void> {
        const client = await pool.connect()
        try{
            await migrate({client}, path.resolve(__dirname, "migrations/sql"))
        }catch(err){
            console.error("migration failed", err)
        }finally{
            client.release()
        }
    },
}

export default db