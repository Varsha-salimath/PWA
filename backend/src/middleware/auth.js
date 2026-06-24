import { Teacher } from '../db/models.js'
import { getSession } from '../services/sessionStore.js'

export async function requireAuth(req, res, next) {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required.' })
  }

  const token = header.slice(7)
  const session = getSession(token)
  if (!session) {
    return res.status(401).json({ error: 'Invalid or expired session.' })
  }

  const teacher = await Teacher.findById(session.teacherId).lean()

  if (!teacher) {
    return res.status(401).json({ error: 'Invalid session.' })
  }

  req.teacher = teacher
  req.accessToken = token
  req.refreshToken = session.refreshToken ?? null
  req.schoolIds = session.schoolIds ?? []
  req.batchIds = session.batchIds ?? []
  next()
}
