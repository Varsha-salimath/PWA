import AppShell from '../components/layout/AppShell'
import { IconExternalLink, IconTrendUp } from '../components/icons/Icons'
import '../styles/app.css'
import './pages.css'

const schools = [
  { name: 'Westside Tech High', enrolled: 240, percent: 100, color: 'green' as const },
  { name: 'Oakwood Academy', enrolled: 112, percent: 42, color: 'blue' as const },
  { name: 'Lincoln Elementary', enrolled: 318, percent: 88, color: 'orange' as const },
  { name: "St. Patrick's Global", enrolled: 614, percent: 75, color: 'gray' as const },
]

export default function Analytics() {
  return (
    <AppShell topBarVariant="back" showBell activeTab="profile" className="page-analytics">
      <div className="page" data-node-id="1:498">
        <div className="analytics-card card--shadow">
          <span className="label-caps">Total Enrollment</span>
          <div className="analytics-enrollment">
            <span className="analytics-enrollment__value">1,284</span>
            <span className="analytics-enrollment__trend">
              <IconTrendUp />
              +12.4%
            </span>
          </div>
          <p className="page__subtitle">
            Active captures across 12 scheduled school visits this week.
          </p>
        </div>

        <div className="analytics-card card--shadow">
          <div className="section-header">
            <h2 className="section-title">School Distribution</h2>
            <IconExternalLink />
          </div>
          <div className="distribution-list">
            {schools.map((school) => (
              <div key={school.name} className="distribution-item">
                <div className="distribution-item__header">
                  <div>
                    <p className="distribution-item__name">{school.name}</p>
                    <p className="distribution-item__meta">{school.enrolled} Students enrolled</p>
                  </div>
                  <div className="distribution-item__status">
                    <span className={`distribution-item__percent distribution-item__percent--${school.color}`}>
                      {school.percent}%
                    </span>
                    <span className="label-caps">Status</span>
                  </div>
                </div>
                <div className="progress-bar">
                  <div
                    className={`progress-bar__fill ${
                      school.color === 'green'
                        ? 'progress-bar__fill--green'
                        : school.color === 'blue'
                          ? 'progress-bar__fill--blue'
                          : ''
                    }`}
                    style={{ width: `${school.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <button type="button" className="btn-outline">View All Schools (12)</button>
        </div>

        <div className="analytics-card card--shadow analytics-card--blue">
          <h3 className="analytics-card__heading">Upload Progress</h3>
          <div className="donut-chart">
            <svg viewBox="0 0 100 100" className="donut-chart__svg">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f0eded" strokeWidth="12" />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#f5820a"
                strokeWidth="12"
                strokeDasharray="211 251"
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="donut-chart__center">
              <span className="donut-chart__value">84%</span>
              <span className="donut-chart__label">Sync Rate</span>
            </div>
          </div>
          <div className="sync-legend">
            <div className="sync-legend__row">
              <span><span className="sync-legend__dot sync-legend__dot--orange" /> Uploaded</span>
              <span>1,078 <span className="sync-legend__muted">(84%)</span></span>
            </div>
            <div className="sync-legend__row">
              <span><span className="sync-legend__dot sync-legend__dot--blue" /> Pending Sync</span>
              <span>206 <span className="sync-legend__muted">(16%)</span></span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
