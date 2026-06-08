import { useNavigate, usePath } from '../../router'
import { IconHome, IconProfile, IconSchools, IconUpload } from '../icons/Icons'
import './layout.css'

export type NavTab = 'home' | 'schools' | 'upload' | 'profile'

const tabs: { id: NavTab; label: string; path: string; Icon: typeof IconHome }[] = [
  { id: 'home', label: 'Home', path: '/home', Icon: IconHome },
  { id: 'schools', label: 'Schools', path: '/schools', Icon: IconSchools },
  { id: 'upload', label: 'Upload', path: '/upload', Icon: IconUpload },
  { id: 'profile', label: 'Profile', path: '/profile', Icon: IconProfile },
]

type BottomNavProps = {
  active?: NavTab
}

export default function BottomNav({ active }: BottomNavProps) {
  const navigate = useNavigate()
  const path = usePath()

  const resolvedActive =
    active ??
    (path.startsWith('/home')
      ? 'home'
      : path.startsWith('/schools') || path.startsWith('/batches') || path.startsWith('/students')
        ? 'schools'
        : path.startsWith('/upload')
          ? 'upload'
          : path.startsWith('/profile')
            ? 'profile'
            : undefined)

  return (
    <nav className="bottom-nav">
      {tabs.map(({ id, label, path: tabPath, Icon }) => {
        const isActive = resolvedActive === id
        return (
          <button
            key={id}
            type="button"
            className={`bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`}
            onClick={() => navigate(tabPath)}
          >
            <Icon size={id === 'upload' ? 16 : 18} />
            <span>{label}</span>
          </button>
        )
      })}
    </nav>
  )
}
