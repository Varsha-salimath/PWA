import { ALLOWED_MIME_TYPES, MAX_PHOTO_BYTES, MAX_VIDEO_BYTES } from '../api/constants'

export function validateUploadFile(file) {
  if (!file) return { ok: false, error: 'No file selected.' }

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return { ok: false, error: 'Unsupported file type. Use JPEG, PNG, WebP, MP4, or MOV.' }
  }

  const isVideo = file.type.startsWith('video/')
  const maxSize = isVideo ? MAX_VIDEO_BYTES : MAX_PHOTO_BYTES

  if (file.size > maxSize) {
    const limitMb = isVideo ? 100 : 10
    return { ok: false, error: `File too large. Max ${limitMb} MB for ${isVideo ? 'video' : 'photo'}.` }
  }

  return { ok: true, mediaType: isVideo ? 'video' : 'photo' }
}
