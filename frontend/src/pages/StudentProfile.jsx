import { useCallback, useEffect, useState } from 'react'
import { api } from '../api/client'
import CategoryUploadCard from '../components/CategoryUploadCard'
import AppShell from '../components/layout/AppShell'
import LoadingScreen from '../components/ui/LoadingScreen'
import '../styles/app.css'
import './pages.css'

function CompletionRing({ value, large }) {
  return (
    <div
      className={`completion-ring ${large ? 'completion-ring--lg' : ''}`}
      style={{ '--progress': value }}
    >
      <div className="completion-ring__inner">{value}%</div>
    </div>
  )
}

export default function StudentProfile({ studentId }) {
  const [data, setData] = useState(null)
  const [uploadingCategory, setUploadingCategory] = useState(null)
  const [submittingCategory, setSubmittingCategory] = useState(null)

  const loadStudent = useCallback(async () => {
    const result = await api.getStudent(studentId)
    setData(result)
  }, [studentId])

  useEffect(() => {
    loadStudent()
  }, [loadStudent])

  const handleUpload = async (category, files) => {
    setUploadingCategory(category)
    let lastError = null

    for (const file of files) {
      const result = await api.uploadMedia(studentId, category, file)
      if (!result.ok) lastError = result.error
    }

    setUploadingCategory(null)
    await loadStudent()
    return lastError ? { ok: false, error: lastError } : { ok: true }
  }

  const handleDelete = async (uploadId) => {
    const result = await api.deleteUpload(uploadId)
    if (result.ok) await loadStudent()
  }

  const handleSubmit = async (category) => {
    setSubmittingCategory(category)
    const result = await api.submitCategory(studentId, category)
    setSubmittingCategory(null)
    if (result.ok) await loadStudent()
    return result
  }

  if (!data) {
    return (
      <AppShell topBarVariant="back" activeTab="schools" className="page-profile-detail">
        <LoadingScreen message="Loading student…" />
      </AppShell>
    )
  }

  return (
    <AppShell topBarVariant="back" showRefresh showMore activeTab="schools" className="page-profile-detail">
      <div className="animate-in">
        <div className="profile-header">
          <div className="profile-header__avatar">
            <img src={data.student.image} alt={data.student.full_name} />
          </div>
          <div className="profile-header__info">
            <h1 className="page__title">{data.student.full_name}</h1>
            <p className="page__subtitle">{data.batch.name}</p>
            <p className="page__subtitle">{data.school.name}</p>
          </div>
        </div>

        <div className="profile-hero">
          <div className="profile-hero__progress">
            <CompletionRing value={data.student.completion_pct} large />
            <div className="profile-hero__progress-bar">
              <p className="profile-hero__progress-label">
                {data.student.categories_done} of {data.student.categories_total} categories submitted
              </p>
              <div className="progress-bar">
                <div
                  className="progress-bar__fill"
                  style={{ width: `${data.student.completion_pct}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <section className="category-grid">
          <h2 className="section-title">Review Categories</h2>
          <p className="page__subtitle category-grid__hint">
            Add multiple photos or videos per category, then submit to post them. Previously submitted media stays visible below.
          </p>
          <div className="category-grid__list">
            {data.categories.map((row) => (
              <CategoryUploadCard
                key={row.category}
                category={row.category}
                drafts={row.drafts}
                submitted={row.submitted}
                complete={row.complete}
                uploading={uploadingCategory === row.category}
                submitting={submittingCategory === row.category}
                onUpload={handleUpload}
                onDelete={handleDelete}
                onSubmit={handleSubmit}
              />
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  )
}
