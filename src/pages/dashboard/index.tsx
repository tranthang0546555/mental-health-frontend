import { Outlet } from 'react-router-dom'
import HeaderDashboard from '../../components/Dashboard/Header'
import SidebarDashboard from '../../components/Dashboard/Sidebar'
import LoginCheck from '../../components/LoginCheck'

export default function Dashboard() {
  return (
    <LoginCheck>
      <HeaderDashboard />
      <SidebarDashboard />
      <main id='main-dashboard'>
        <Outlet />
      </main>
    </LoginCheck>
  )
}
