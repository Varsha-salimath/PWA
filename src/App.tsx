import Login from './components/Login'
import { Router, usePath } from './router'
import Analytics from './pages/Analytics'
import BatchSelection from './pages/BatchSelection'
import Home from './pages/Home'
import Profile from './pages/Profile'
import SchoolsList from './pages/SchoolsList'
import StudentList from './pages/StudentList'
import StudentProfile from './pages/StudentProfile'
import Upload from './pages/Upload'

function AppRoutes() {
  const path = usePath()

  switch (path) {
    case '/login':
      return <Login />
    case '/home':
      return <Home />
    case '/schools':
      return <SchoolsList />
    case '/batches':
      return <BatchSelection />
    case '/students':
      return <StudentList />
    case '/student-profile':
      return <StudentProfile />
    case '/upload':
      return <Upload />
    case '/profile':
      return <Profile />
    case '/profile/analytics':
      return <Analytics />
    case '/':
      return <Login />
    default:
      return <Login />
  }
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export default App
