import AppShell from '../components/layout/AppShell'
import { useNavigate } from '../router'
import '../styles/app.css'
import './pages.css'

const menuItems = [
  { label: 'Overall Analytics', path: '/profile/analytics', description: 'Enrollment & upload stats' },
  { label: 'Account Settings', path: '#', description: 'Profile & preferences' },
  { label: 'Notifications', path: '#', description: 'Alerts & reminders' },
  { label: 'Help & Support', path: '#', description: 'Contact technical assistance' },
]

export default function Profile() {
  const navigate = useNavigate()

  return (
    <AppShell topBarVariant="back" showBell activeTab="profile" className="page-profile">
      <div className="page">
        <div className="profile-user card">
          <div className="profile-user__avatar">SM</div>
          <div>
            <h1 className="profile-user__name">Sarah Miller</h1>
            <p className="page__subtitle">Field Coordinator • instructor@school.edu</p>
          </div>
        </div>

        <nav className="profile-menu">
          {menuItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className="profile-menu__item card"
              onClick={() => item.path !== '#' && navigate(item.path)}
            >
              <div>
                <p className="profile-menu__label">{item.label}</p>
                <p className="profile-menu__desc">{item.description}</p>
              </div>
              <span className="profile-menu__arrow">›</span>
            </button>
          ))}
        </nav>

        <button type="button" className="btn-outline profile-signout" onClick={() => navigate('/login')}>
          Sign Out
        </button>
      </div>
    </AppShell>
  )
}
