import { Sequelize } from 'sequelize'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import colors from 'colors'
import { initModels } from '../models/init-models'

dotenv.config()

const {
  DB_HOST = 'localhost',
  DB_PORT = '3306',
  DB_NAME = 'test',
  DB_USER = 'root',
  DB_PASS = '',
  DB_SSL = 'false',
  DB_SSL_CA_PATH = '',
  DB_SSL_REJECT_UNAUTHORIZED = 'true',
  DB_LOG_SQL = 'false',
  DB_CONNECT_TIMEOUT = '15000',
  DB_SOCKET_TIMEOUT = '60000',
  DB_POOL_MAX = '5',
  DB_POOL_IDLE = '10000',
  DB_POOL_ACQUIRE = '30000',
} = process.env

let sslOptions: any
if (DB_SSL === 'true') {
  const caPath = DB_SSL_CA_PATH ? path.resolve(process.cwd(), DB_SSL_CA_PATH) : ''
  const hasCA = caPath && fs.existsSync(caPath)
  if (hasCA) {
    const ca = fs.readFileSync(caPath, 'utf8')
    sslOptions = { ca, rejectUnauthorized: DB_SSL_REJECT_UNAUTHORIZED !== 'false', minVersion: 'TLSv1.2', servername: DB_HOST }
  } else {
    // Enable SSL without explicit CA (use system trust store or skip verify per flag)
    sslOptions = { rejectUnauthorized: DB_SSL_REJECT_UNAUTHORIZED !== 'false', minVersion: 'TLSv1.2', servername: DB_HOST }
  }
}

const dialectOptions: any = {}
if (sslOptions) dialectOptions.ssl = sslOptions
// Increase connection/socket timeouts to avoid spurious 1s failures
dialectOptions.connectTimeout = Number(DB_CONNECT_TIMEOUT)
dialectOptions.socketTimeout = Number(DB_SOCKET_TIMEOUT)

export const db = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: 'mariadb',
  logging: DB_LOG_SQL === 'true',
  dialectOptions,
  pool: {
    max: Number(DB_POOL_MAX),
    min: 0,
    idle: Number(DB_POOL_IDLE),
    acquire: Number(DB_POOL_ACQUIRE),
  },
})

export const connectDB = async () => {
  try {
    await db.authenticate()
    initModels(db)
    console.log(colors.cyan.bold(`MariaDB conectado en ${DB_HOST}:${DB_PORT}`))
    console.log(colors.cyan.bold('Modelos inicializados correctamente'))
  } catch (error: any) {
    console.log(colors.red.bold(error.message))
    process.exit(1)
  }
}