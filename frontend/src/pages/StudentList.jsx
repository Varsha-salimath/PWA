import { useEffect, useState } from 'react'
import { api } from '../api/client'
import AppShell from '../components/layout/AppShell'
import LoadingScreen from '../components/ui/LoadingScreen'
import { IconChevronRight, IconSearch } from '../components/icons/Icons'
import { useNavigate } from '../router'
import '../styles/app.css'
import './pages.css'

const filters = ['all', 'uploaded', 'pending']

function CompletionRing({ value }) {
  return (
    <div className="completion-ring" style={{ '--progress': value }}>
      <div className="completion-ring__inner">{value}%</div>
    </div>
  )
}

export default function StudentList({ batchId }) {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [data, setData] = useState(null)

  useEffect(() => {
    api.getStudents(batchId, filter).then(setData)
  }, [batchId, filter])

  if (!data) {
    return (
      <AppShell topBarVariant="back" activeTab="schools" className="page-students">
        <LoadingScreen message="Loading students…" />
      </AppShell>
    )
  }

  const filtered = data.students.filter((student) =>
    student.full_name.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <AppShell topBarVariant="back" showFab fabIcon="plus" activeTab="schools" className="page-students">
      <div className="animate-in">
        <div className="page page--with-header">
          <nav className="breadcrumb">
            <span>Schools</span>
            <span className="breadcrumb__sep">›</span>
            <span className="breadcrumb__active">{data.batch.name}</span>
          </nav>
          <h1 className="page__title">Students</h1>
          <p className="page__subtitle">Filter by upload completion and open a profile to upload media.</p>
        </div>

        <div className="sticky-filters">
          <div className="search-input-wrap">
            <IconSearch className="search-icon" />
            <input
              type="search"
              className="search-input"
              placeholder="Search by student name…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="chip-row">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                className={`chip ${filter === f ? 'chip--active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? 'All' : f === 'uploaded' ? 'Uploaded' : 'Pending'}
              </button>
            ))}
          </div>
        </div>

        <div className="student-list">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <p className="empty-state__title">No students found</p>
              <p className="empty-state__text">Try a different filter or search term.</p>
            </div>
          ) : (
            filtered.map((student) => (
              <button
                key={student.id}
                type="button"
                className="list-row"
                onClick={() => navigate(`/students/${student.id}`)}
              >
                <div className="list-row__avatar">
                  <img src={student.image} alt="" />
                </div>
                <div className="list-row__info">
                  <p className="list-row__name">{student.full_name}</p>
                  <p className="list-row__meta">
                    Roll {student.roll_number} · {student.categories_done}/{student.categories_total} categories
                  </p>
                </div>
                <div className="list-row__right">
                  <CompletionRing value={student.completion_pct} />
                  <span className="chevron-btn" aria-hidden="true">
                    <IconChevronRight size={12} />
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </AppShell>
  )
}
