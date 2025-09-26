import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { Sequelize } from 'sequelize'
import SequelizeAuto from 'sequelize-auto'

const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_SSL = 'false',
  DB_SSL_REJECT_UNAUTHORIZED = 'true',
  DB_SSL_CA_PATH = '',
} = process.env

async function main() {
  if (!DB_HOST || !DB_NAME || !DB_USER) {
    throw new Error('Faltan variables de entorno DB_HOST, DB_NAME o DB_USER')
  }

  let ssl: any
  if (DB_SSL === 'true') {
    const caPath = DB_SSL_CA_PATH ? path.resolve(process.cwd(), DB_SSL_CA_PATH) : ''
    const hasCA = caPath && fs.existsSync(caPath)
    if (hasCA) {
      const ca = fs.readFileSync(caPath, 'utf8')
      ssl = { ca, rejectUnauthorized: DB_SSL_REJECT_UNAUTHORIZED !== 'false', minVersion: 'TLSv1.2', servername: DB_HOST }
    } else {
      ssl = { rejectUnauthorized: DB_SSL_REJECT_UNAUTHORIZED !== 'false', minVersion: 'TLSv1.2', servername: DB_HOST }
    }
  }

  const sequelize = new Sequelize(DB_NAME!, DB_USER!, DB_PASS || '', {
    host: DB_HOST,
    port: Number(DB_PORT || 3306),
    dialect: 'mariadb',
    logging: false,
    dialectOptions: {
      ...(ssl ? { ssl } : {}),
      connectTimeout: 15000,
      socketTimeout: 60000,
    },
    pool: { max: 5, min: 0, idle: 10000, acquire: 30000 },
  })

  const auto = new SequelizeAuto(sequelize as any, undefined as any, undefined as any, {
    directory: path.resolve(process.cwd(), 'models'),
    lang: 'ts',
    singularize: true,
    caseModel: 'p', // PascalCase Models
    caseFile: 'c', // camelCase files
    useDefine: false, // generate class + init instead of sequelize.define
    additional: {
      timestamps: false,
    },
  })

  await auto.run()
  // Post-proceso: arreglar imports de *Id cuando el modelo no tiene PK
  await postProcessModels(path.resolve(process.cwd(), 'models'))
  console.log('✅ Modelos generados en ./models')
  await sequelize.close()
}

async function postProcessModels(modelsDir: string) {
  const files = fs.readdirSync(modelsDir).filter(f => f.endsWith('.ts'))
  // Mapa de modelo -> si exporta XId
  const idExports = new Map<string, boolean>()
  for (const f of files) {
    const base = path.basename(f, '.ts') // e.g. tarea
    const name = toPascal(base) // e.g. Tarea
    const content = fs.readFileSync(path.join(modelsDir, f), 'utf8')
    idExports.set(name, /export\s+type\s+"?\w+Id"?\s*=/.test(content) || new RegExp(`export\\s+type\\s+${name}Id\\s*=`).test(content))
  }

  for (const f of files) {
    const full = path.join(modelsDir, f)
    let content = fs.readFileSync(full, 'utf8')
    let updated = content

    // Reescribir imports: import type { X, XId } from './x'
    for (const [modelName, hasId] of idExports) {
      if (hasId) continue
      const fileBase = toCamel(modelName)
      // remove Id from import specifier
      const importRegex = new RegExp(`(import\\s+type\\s*\\{[^}]*?)\\b${modelName}Id\\b([^}]*?\\}\\s*from\\s*['\"])\\./${fileBase}(['\"])`, 'g')
      updated = updated.replace(importRegex, (_m, p1, p2, q1, q2) => {
        // also remove trailing comma if needed
        let inner = (p1 + p2).replace(new RegExp(`,?\\s*${modelName}Id\\b`), '')
        inner = inner.replace(/\{\s*,/g, '{ ').replace(/,\s*\}/g, ' }')
        return `${inner}${q1}./${fileBase}${q2}`
      })
      // Replace usages of , ModelId> with , any>
      const usageRegex = new RegExp(`,\\s*${modelName}Id(\\s*>)`, 'g')
      updated = updated.replace(usageRegex, ', any$1')
    }

    if (updated !== content) {
      fs.writeFileSync(full, updated, 'utf8')
    }
  }
}

function toPascal(s: string) {
  return s.replace(/(^|[_-])(\w)/g, (_m, _p1, c) => c.toUpperCase())
}

function toCamel(s: string) {
  const pas = toPascal(s)
  return pas.charAt(0).toLowerCase() + pas.slice(1)
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('\n❌ Error generando modelos:')
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})
