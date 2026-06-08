import type { ReactNode } from 'react'
import type { NavTab } from './BottomNav'
import BottomNav from './BottomNav'
import Fab from './Fab'
import TopBar from './TopBar'
import './layout.css'

type AppShellProps = {
  children: ReactNode
  showTopBar?: boolean
  showBottomNav?: boolean
  showFab?: boolean
  fabIcon?: 'camera' | 'plus'
  activeTab?: NavTab
  topBarVariant?: 'menu' | 'back' | 'none'
  showRefresh?: boolean
  showMore?: boolean
  showBell?: boolean
  onBack?: () => void
  onFabClick?: () => void
  className?: string
}

export default function AppShell({
  children,
  showTopBar = true,
  showBottomNav = true,
  showFab = false,
  fabIcon = 'camera',
  activeTab,
  topBarVariant = 'menu',
  showRefresh = false,
  showMore = false,
  showBell = false,
  onBack,
  onFabClick,
  className = '',
}: AppShellProps) {
  return (
    <div className={`app-shell ${className}`}>
      {showTopBar && (
        <TopBar
          variant={topBarVariant}
          showRefresh={showRefresh}
          showMore={showMore}
          showBell={showBell}
          onBack={onBack}
        />
      )}
      <main className="app-shell__content">{children}</main>
      {showFab && <Fab icon={fabIcon} onClick={onFabClick} />}
      {showBottomNav && <BottomNav active={activeTab} />}
    </div>
  )
}
