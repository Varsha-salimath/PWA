/**
 * Shared API client — matches /api/teacher/* contract from tech spec.
 * Web PWA and future native/webview both consume this module.
 * T0: mockStore backend. Swap implementation when real API is ready.
 */

import { getBatchCompletion, getStudentCompletion } from '../lib/completion'
import { validateUploadFile } from '../lib/uploads'
import { HEALTH_TAG_LABELS } from './constants'
import { mockStore } from './mockStore'

const USE_MOCK = true

function enrichBatches(batchPayload) {
  const uploads = mockStore.getUploads()
  return {
    ...batchPayload,
    batches: batchPayload.batches.map((batch) => {
      const { completion_avg, health_tag } = getBatchCompletion(uploads, batch.student_ids)
      return {
        id: batch.id,
        name: batch.name,
        student_count: batch.student_count,
        completion_avg,
        health_tag,
        health_label: HEALTH_TAG_LABELS[health_tag],
      }
    }),
  }
}

function enrichStudentDetail(detail) {
  const uploads = mockStore.getUploads()
  const completion = getStudentCompletion(uploads, detail.student.id)

  return {
    ...detail,
    student: {
      ...detail.student,
      completion_pct: completion.completion_pct,
      categories_done: completion.categories_done,
      categories_total: completion.categories_total,
      status: completion.status,
    },
    categories: completion.categories.map((row) => ({
      category: row.category,
      complete: row.complete,
      drafts: row.drafts,
      submitted: row.submitted,
    })),
  }
}

export const api = {
  async login(user_id, password) {
    if (!USE_MOCK) throw new Error('Real API not configured.')
    const result = mockStore.login(user_id, password)
    if (!result.ok) return { ok: false, error: result.error }
    return { ok: true, teacher: result.teacher }
  },

  async logout() {
    mockStore.logout()
    return { ok: true }
  },

  async getMe() {
    return mockStore.getMe()
  },

  restoreSession(teacherId) {
    return mockStore.restoreSession(teacherId)
  },

  async getDashboard() {
    return mockStore.getDashboard()
  },

  async getSchools() {
    return mockStore.getSchools()
  },

  async getBatches(schoolId) {
    const result = mockStore.getBatches(schoolId)
    if (!result) return null
    if (result.forbidden) return { forbidden: true }
    return enrichBatches(result)
  },

  async getStudents(batchId, filter = 'all') {
    const result = mockStore.getStudents(batchId, filter)
    if (!result) return null
    if (result.forbidden) return { forbidden: true }
    return result
  },

  async getStudent(studentId) {
    const result = mockStore.getStudent(studentId)
    if (!result) return null
    if (result.forbidden) return { forbidden: true }
    return enrichStudentDetail(result)
  },

  async uploadMedia(studentId, category, file) {
    const validation = validateUploadFile(file)
    if (!validation.ok) return { ok: false, status: 415, error: validation.error }

    const previewUrl = URL.createObjectURL(file)
    const result = mockStore.addUpload(studentId, category, file, previewUrl)
    return result
  },

  async deleteUpload(uploadId) {
    return mockStore.deleteUpload(uploadId)
  },

  async submitCategory(studentId, category) {
    return mockStore.submitCategory(studentId, category)
  },
}
