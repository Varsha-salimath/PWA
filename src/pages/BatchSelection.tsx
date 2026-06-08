import AppShell from '../components/layout/AppShell'
import { IconChevronRight, IconUsers } from '../components/icons/Icons'
import { useNavigate } from '../router'
import '../styles/app.css'
import './pages.css'

const batches = [
  { id: '2024-a', name: 'Batch 2024-A', students: 48, progress: 80, status: 'Active' as const, borderColor: 'var(--orange)' },
  { id: '2024-b', name: 'Batch 2024-B', students: 32, progress: 10, status: 'In Progress' as const, borderColor: 'var(--blue)' },
  { id: '2023-c', name: 'Batch 2023-C', students: 50, progress: 100, status: 'Completed' as const, borderColor: '#8a7263' },
]

const statusClass = {
  Active: 'badge--active',
  'In Progress': 'badge--progress',
  Completed: 'badge--completed',
}

export default function BatchSelection() {
  const navigate = useNavigate()

  return (
    <AppShell topBarVariant="back" showMore activeTab="schools" className="page-batches">
      <div className="page" data-node-id="1:156">
        <header className="page-header-block">
          <h1 className="page__title page__title--sm">Select Batch</h1>
          <p className="page__subtitle">
            Assigned batches for the 2024 academic cycle at Greenwood High.
          </p>
        </header>

        <div className="batch-list">
          {batches.map((batch) => (
            <button
              key={batch.id}
              type="button"
              className="batch-card"
              style={{ borderTopColor: batch.borderColor }}
              onClick={() => navigate('/students')}
            >
              <div className="batch-card__top">
                <div>
                  <span className={`badge ${statusClass[batch.status]}`}>{batch.status}</span>
                  <h3 className="batch-card__name">{batch.name}</h3>
                </div>
                <IconChevronRight />
              </div>
              <div className="batch-card__students">
                <IconUsers size={20} />
                <span>{batch.students} Students</span>
              </div>
              <div className="batch-card__progress">
                <div className="batch-card__progress-header">
                  <span className="label-caps">Course Progress</span>
                  <span className="batch-card__percent">{batch.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar__fill" style={{ width: `${batch.progress}%` }} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
