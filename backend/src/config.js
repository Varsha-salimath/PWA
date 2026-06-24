import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '../..', '.env') })

export const config = {
  port: Number(process.env.PORT) || 3001,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/wizklub',
  gcs: {
    bucketName: process.env.GCS_BUCKET_NAME ?? '',
    folder: process.env.GCS_FOLDER ?? 'wizklub',
    credentials: process.env.GCS_CREDENTIALS ?? '',
  },
}
