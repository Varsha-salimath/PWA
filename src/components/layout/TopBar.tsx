import {
  IconBack,
  IconBell,
  IconMenu,
  IconMore,
  IconRefresh,
} from '../icons/Icons'
import './layout.css'

type TopBarVariant = 'menu' | 'back' | 'none'

type TopBarProps = {
  variant?: TopBarVariant
  showRefresh?: boolean
  showMore?: boolean
  showBell?: boolean
  onBack?: () => void
}

export default function TopBar({
  variant = 'menu',
  showRefresh = false,
  showMore = false,
  showBell = false,
  onBack,
}: TopBarProps) {
  const handleBack = () => {
    if (onBack) onBack()
    else window.history.back()
  }

  return (
    <header className="topbar">
      <div className="topbar__left">
        {variant === 'menu' && (
          <button type="button" className="topbar__icon-btn" aria-label="Menu">
            <IconMenu />
          </button>
        )}
        {variant === 'back' && (
          <button type="button" className="topbar__icon-btn" onClick={handleBack} aria-label="Go back">
            <IconBack />
          </button>
        )}
        <img src="/assets/logo.png" alt="WizKlub Futurz" className="topbar__logo" />
      </div>
      <div className="topbar__right">
        {showRefresh && (
          <button type="button" className="topbar__icon-btn" aria-label="Refresh">
            <IconRefresh />
          </button>
        )}
        {showBell && (
          <button type="button" className="topbar__icon-btn" aria-label="Notifications">
            <IconBell />
          </button>
        )}
        {showMore && (
          <button type="button" className="topbar__icon-btn" aria-label="More options">
            <IconMore />
          </button>
        )}
      </div>
    </header>
  )
}
