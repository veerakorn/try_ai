import { useNavigate } from 'react-router'
import Button from './ui/Button'

function Navigation() {
  const navigate = useNavigate()

  return (
    <nav className="absolute top-8 left-8 z-30">
      <Button
        variant="secondary"
        onClick={() => navigate('/login')}
      >
        🔐 เข้าสู่ระบบ
      </Button>
    </nav>
  )
}

export default Navigation
