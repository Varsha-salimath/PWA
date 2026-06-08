import { IconCamera, IconPlus } from '../icons/Icons'
import './layout.css'

type FabProps = {
  icon?: 'camera' | 'plus'
  onClick?: () => void
}

export default function Fab({ icon = 'camera', onClick }: FabProps) {
  return (
    <button type="button" className="fab" onClick={onClick} aria-label="Quick action">
      {icon === 'camera' ? <IconCamera /> : <IconPlus />}
    </button>
  )
}
