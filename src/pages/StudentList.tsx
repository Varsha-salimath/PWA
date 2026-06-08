import { useState } from 'react'
import AppShell from '../components/layout/AppShell'
import { IconChevronRight, IconSearch } from '../components/icons/Icons'
import { useNavigate } from '../router'
import '../styles/app.css'
import './pages.css'

type Filter = 'all' | 'uploaded' | 'pending'

const students = [
  { id: 'alexander', name: 'Alexander Thompson', meta: 'Class 10-B • #ST8823', status: 'uploaded' as const, image: '/assets/student-1.png' },
  { id: 'beatrice', name: 'Beatrice Vance', meta: 'Class 10-B • #ST8824', status: 'pending' as const, image: '/assets/student-2.png' },
  { id: 'caleb', name: 'Caleb Rogers', meta: 'Class 10-B • #ST8825', status: 'uploaded' as const, image: '/assets/student-3.png' },
  { id: 'daria', name: 'Daria Mikhailov', meta: 'Class 10-B • #ST8826', status: 'pending' as const, image: '/assets/student-4.png' },
  { id: 'evan', name: 'Evan Wright', meta: 'Class 10-B • #ST8827', status: 'uploaded' as const, image: '/assets/student-5.png' },
]

export default function StudentList() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<Filter>('all')
  const [search, setSearch] = useState('')

  const filtered = students.filter((s) => {
    const matchesFilter =
      filter === 'all' || (filter === 'uploaded' && s.status === 'uploaded') || (filter === 'pending' && s.status === 'pending')
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <AppShell topBarVariant="back" showFab fabIcon="plus" activeTab="schools" className="page-students">
      <div data-node-id="1:255">
        <div className="page page--with-header">
          <nav className="breadcrumb">
            <span>Schools</span>
            <span className="breadcrumb__sep">›</span>
            <span>Greenwood High</span>
            <span className="breadcrumb__sep">›</span>
            <span className="breadcrumb__active">Batch 2024-A</span>
          </nav>
          <h1 className="page__title">Student Enrollment</h1>
        </div>

        <div className="sticky-filters">
          <div className="search-input-wrap">
            <IconSearch className="search-icon" />
            <input
              type="search"
              className="search-input"
              placeholder="Search students by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="chip-row">
            {(['all', 'uploaded', 'pending'] as Filter[]).map((f) => (
              <button
                key={f}
                type="button"
                className={`chip ${filter === f ? 'chip--active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? 'All Students' : f === 'uploaded' ? 'Uploaded' : 'Pending'}
              </button>
            ))}
          </div>
        </div>

        <div className="student-list">
          {filtered.map((student) => (
            <button
              key={student.id}
              type="button"
              className="list-row"
              onClick={() => navigate('/student-profile')}
            >
              <div className="list-row__avatar">
                <img src={student.image} alt="" />
              </div>
              <div className="list-row__info">
                <p className="list-row__name">{student.name}</p>
                <p className="list-row__meta">{student.meta}</p>
              </div>
              <div className="list-row__right">
                <span className={`badge ${student.status === 'uploaded' ? 'badge--uploaded' : 'badge--pending'}`}>
                  {student.status}
                </span>
                <IconChevronRight />
              </div>
            </button>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
