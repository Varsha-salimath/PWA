/** Shared domain constants — same contract for web PWA and future native/webview. */

export const REVIEW_CATEGORIES = [
  'ptm',
  'principal_review',
  'parent_review',
  'teacher_review',
  'student_review',
]

export const REVIEW_CATEGORY_LABELS = {
  ptm: 'PTM',
  principal_review: 'Principal review',
  parent_review: 'Parent review',
  teacher_review: 'Teacher review',
  student_review: 'Student review',
}

export const CATEGORIES_TOTAL = REVIEW_CATEGORIES.length

export const HEALTH_TAGS = {
  ACTIVELY_UPLOADING: 'actively_uploading',
  IN_PROGRESS: 'in_progress',
  NEED_TO_GROW: 'need_to_grow',
}

export const HEALTH_TAG_LABELS = {
  actively_uploading: 'Actively uploading',
  in_progress: 'In progress',
  need_to_grow: 'Need to grow',
}

export const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'video/mp4',
  'video/quicktime',
]

export const MAX_PHOTO_BYTES = 10 * 1024 * 1024
export const MAX_VIDEO_BYTES = 100 * 1024 * 1024

export const MOCK_CREDENTIALS = {
  user_id: 'priya.sharma',
  password: 'wizklub123',
}

export const UPLOAD_STATUS = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
}
