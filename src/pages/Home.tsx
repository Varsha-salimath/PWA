import AppShell from '../components/layout/AppShell'
import { IconAlert, IconChevronRight, IconTrendUp, IconUsers } from '../components/icons/Icons'
import { useNavigate } from '../router'
import '../styles/app.css'
import './pages.css'

const schools = [
  { id: 'westside', name: 'Westside Tech High', district: 'District 4', students: 240, image: '/assets/school-campus.png' },
  { id: 'oakwood', name: 'Oakwood Academy', district: 'District 7', students: 112, image: '/assets/university-library.png' },
  { id: 'lincoln', name: 'Lincoln Elementary', district: 'District 2', students: 318, image: '/assets/elementary-hallway.png' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <AppShell showFab showRefresh showMore activeTab="home" className="page-home">
      <div className="page page--with-header" data-node-id="1:42">
        <section className="greeting">
          <h1 className="page__title">Hello, Sarah Miller</h1>
          <p className="page__subtitle">Here is your field summary for today.</p>
        </section>

        <section className="summary-grid">
          <div className="summary-grid__large card">
            <div className="summary-grid__header">
              <span className="label-caps">Total Students</span>
              <IconUsers className="summary-grid__icon" />
            </div>
            <div className="summary-grid__value-row">
              <span className="stat-value stat-value--lg">1,284</span>
              <span className="summary-grid__trend">
                <IconTrendUp />
                <span>%</span>
              </span>
            </div>
          </div>

          <div className="card summary-grid__small">
            <span className="label-caps">Uploaded Today</span>
            <div className="summary-grid__small-content">
              <span className="stat-value stat-value--md">42</span>
              <div className="progress-bar progress-bar--sm">
                <div className="progress-bar__fill" style={{ width: '80%' }} />
              </div>
            </div>
          </div>

          <div className="card summary-grid__small">
            <span className="label-caps">Pending</span>
            <div className="summary-grid__small-content">
              <span className="stat-value stat-value--md stat-value--red">12</span>
              <span className="summary-grid__alert">
                <IconAlert />
                Needs review
              </span>
            </div>
          </div>
        </section>

        <section className="schools-section">
          <div className="section-header">
            <h2 className="section-title">Assigned Schools</h2>
            <button type="button" className="link-btn" onClick={() => navigate('/schools')}>
              View All
            </button>
          </div>
          <div className="schools-list">
            {schools.map((school) => (
              <button
                key={school.id}
                type="button"
                className="school-card card"
                onClick={() => navigate('/batches')}
              >
                <div className="school-thumb">
                  <img src={school.image} alt="" />
                </div>
                <div className="school-card__info">
                  <p className="school-card__name">{school.name}</p>
                  <p className="school-card__meta">
                    {school.district} • {school.students} Students
                  </p>
                </div>
                <IconChevronRight />
              </button>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  )
}
