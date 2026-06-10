import { useAuth } from '../context/AuthContext.jsx'
import AppShell from '../components/layout/AppShell'
import PageHeader from '../components/ui/PageHeader'
import { useNavigate } from '../router'
import '../styles/app.css'
import './pages.css'

export default function Profile() {
  const navigate = useNavigate()
  const { teacher, logout } = useAuth()

  const handleSignOut = async () => {
    await logout()
    navigate('/login')
  }

  const initials = teacher?.full_name
    ?.split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <AppShell topBarVariant="back" showBell activeTab="profile" className="page-profile">
      <div className="page animate-in">
        <PageHeader
          eyebrow="Account"
          title="Profile"
          subtitle="Your teacher account and platform details."
        />

        <div className="profile-user card">
          <div className="profile-user__avatar">{initials}</div>
          <div>
            <h2 className="profile-user__name">{teacher?.full_name}</h2>
            <p className="page__subtitle">{teacher?.user_id}</p>
          </div>
        </div>

        <div className="profile-info card">
          <p className="profile-info__label">Current platform</p>
          <p className="profile-info__value">Web PWA</p>
          <p className="profile-info__hint">
            Native gallery and camera capture will connect to the same upload API in a future release.
          </p>
        </div>

        <button type="button" className="btn-outline profile-signout" onClick={handleSignOut}>
          Sign out
        </button>
      </div>
    </AppShell>
  )
}
