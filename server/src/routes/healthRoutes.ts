import { Router } from 'express'
import { db } from '../config/db'
import fs from 'fs'
import path from 'path'

const router = Router()

router.get('/', async (_req, res) => {
  // Surface effective config to help diagnose env issues (no secrets)
  const envHost = process.env.DB_HOST
  const envPort = process.env.DB_PORT
  const envSSL = process.env.DB_SSL
  const envReject = process.env.DB_SSL_REJECT_UNAUTHORIZED
  const envCAPath = process.env.DB_SSL_CA_PATH
  const resolvedCA = envCAPath ? path.resolve(process.cwd(), envCAPath) : undefined
  const caExists = resolvedCA ? fs.existsSync(resolvedCA) : false
  const options: any = (db as any)?.options || {}
  const effHost = options.host
  const effPort = options.port
  const effSSL = !!options?.dialectOptions?.ssl
  const effReject = options?.dialectOptions?.ssl?.rejectUnauthorized
  const effHasCA = !!options?.dialectOptions?.ssl?.ca
  try {
    await db.authenticate()
    res.json({
      status: 'ok',
      db: 'up',
      config: {
        env: { host: envHost, port: envPort, ssl: envSSL, rejectUnauthorized: envReject, caPath: envCAPath, caResolved: resolvedCA, caExists },
        effective: { host: effHost, port: effPort, ssl: effSSL, rejectUnauthorized: effReject, hasCA: effHasCA },
      },
    })
  } catch (error: any) {
    // Log full diagnostic server-side
    // eslint-disable-next-line no-console
    console.error('DB health check error:', error)
    const original = error?.original || error?.parent || {}
    res.status(500).json({
      status: 'error',
      db: 'down',
      error: error?.message || String(error),
      details: {
        name: error?.name,
        code: original?.code,
        errno: original?.errno,
        sqlState: original?.sqlState,
        sqlMessage: original?.sqlMessage,
      },
      config: {
        env: { host: envHost, port: envPort, ssl: envSSL, rejectUnauthorized: envReject, caPath: envCAPath, caResolved: resolvedCA, caExists },
        effective: { host: effHost, port: effPort, ssl: effSSL, rejectUnauthorized: effReject, hasCA: effHasCA },
      },
    })
  }
})

export default router
