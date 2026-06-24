import cors from 'cors'
import express from 'express'
import { config } from './config.js'
import { connectDatabase } from './db/connect.js'
import { createBatchUploadsRouter } from './routes/batchUploads.js'
import { createAuthRouter } from './routes/auth.js'
import { createTeacherRouter } from './routes/teacher.js'
import { createUploadsRouter } from './routes/uploads.js'
import { isStorageConfigured } from './services/storage.js'

await connectDatabase()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ ok: true, storage: isStorageConfigured() })
})

app.use('/api/teacher', createAuthRouter())
app.use('/api/teacher', createTeacherRouter())
app.use('/api/teacher', createUploadsRouter())
app.use('/api/teacher', createBatchUploadsRouter())

app.use((err, _req, res, _next) => {
  if (err?.message === 'Unsupported file type.' || err?.message === 'File too large.') {
    return res.status(415).json({ ok: false, error: err.message })
  }
  console.error(err)
  res.status(500).json({ error: 'Internal server error.' })
})

app.listen(config.port, () => {
  console.log(`WizKlub API listening on http://localhost:${config.port}`)
})
