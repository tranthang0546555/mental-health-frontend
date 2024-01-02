import { Link } from 'react-router-dom'
import './index.css'
import { useAppSelector } from '../../../hooks/store'

type SidebarMenu = {
  name: string
  path: string
  role: Role[]
  icon?: React.ReactNode
  children?: SidebarMenu[]
}
const sidebarMenus: SidebarMenu[] = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    role: ['doctor', 'admin'],
    icon: <i className='bi bi-grid' />
  },
  {
    name: 'Bài viết',
    path: '/dashboard/post',
    role: ['doctor', 'admin'],
    icon: <i className='bi bi-newspaper'></i>,
    children: [
      {
        name: 'Danh sách',
        path: '/',
        role: ['doctor', 'admin']
      },
      {
        name: 'Tạo mới',
        path: '/create',
        role: ['doctor', 'admin']
      },
      {
        name: 'Thể loại',
        path: '/category',
        role: ['admin']
      }
    ]
  },
  {
    name: 'Người dùng',
    path: '/dashboard/user',
    role: ['admin'],
    icon: <i className='bi bi-person'></i>,
    children: [
      {
        name: 'Hoạt động',
        path: '/',
        role: ['admin']
      },
      {
        name: 'Danh sách đen',
        path: '/locked',
        role: ['admin']
      }
    ]
  },
  {
    name: 'Lịch khám',
    path: '/dashboard/appointment',
    role: ['user', 'doctor', 'appointment staff'],
    icon: <i className='bi bi-calendar'></i>,
    children: [
      {
        name: 'Lịch sắp tới',
        path: '/progress',
        role: ['user', 'doctor']
      },
      {
        name: 'Chờ xác nhận',
        path: '/pending',
        role: ['user', 'doctor']
      },
      {
        name: 'Đã khám',
        path: '/completed',
        role: ['user', 'doctor']
      },
      {
        name: 'Đã huỷ',
        path: '/cancel',
        role: ['user', 'doctor']
      },
      {
        name: 'Xếp lịch',
        path: '/order',
        role: ['appointment staff']
      }
    ]
  },
  {
    name: 'Hồ sơ bệnh án',
    path: '/dashboard/medical-record',
    role: ['user', 'doctor'],
    icon: <i className='bi bi-journal-medical'></i>
  },
  {
    name: 'Thời gian làm việc',
    path: '/dashboard/schedule',
    role: ['doctor'],
    icon: <i className='bi bi-clock'></i>
  },
  {
    name: 'Phương pháp trị liệu',
    path: '/dashboard/treatment',
    role: ['doctor', 'admin'],
    icon: <i className='bi bi-bandaid'></i>,
    children: [
      {
        name: 'Danh sách',
        path: '/',
        role: ['admin', 'doctor']
      },
      {
        name: 'Thêm mới',
        path: '/create',
        role: ['admin', 'doctor']
      }
    ]
  },
  {
    name: 'Thông tin',
    path: '/dashboard/profile',
    role: ['user', 'doctor', 'admin', 'appointment staff', 'online support staff'],
    icon: <i className='bi bi-person'></i>
  }
]

export default function SidebarDashboard() {
  const currentRole = useAppSelector((state) => state.auth.user?.role)
  return (
    <aside id='sidebar-dashboard' className='sidebar sidebar-dashboard'>
      <ul className='sidebar-nav' id='sidebar-nav'>
        {/* <li className="nav-heading">Pages</li> */}
        {sidebarMenus.map(({ name, path, role, icon, children }, index) => {
          if (role.includes(currentRole)) {
            if (children) {
              return (
                <li className='nav-item' key={name}>
                  <a
                    className='nav-link collapsed'
                    data-bs-target={`#menu-${index}`}
                    data-bs-toggle='collapse'
                    href='#'
                    aria-expanded='false'
                  >
                    {icon}
                    <span>{name}</span>
                    <i className='bi bi-chevron-down ms-auto'></i>
                  </a>
                  <ul id={`menu-${index}`} className='nav-content collapse show' data-bs-parent='#sidebar-nav'>
                    {children.map((child) => {
                      if (!child.role.includes(currentRole)) return
                      return (
                        <li key={name + '_' + child.name}>
                          <Link to={path + child.path}>
                            <i className='bi bi-circle'></i>
                            <span>{child.name}</span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </li>
              )
            }
            return (
              <li className='nav-item' key={name}>
                <Link className='nav-link collapsed' to={path}>
                  {icon}
                  <span>{name}</span>
                </Link>
              </li>
            )
          }
        })}
      </ul>
    </aside>
  )
}
