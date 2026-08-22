import React from 'react'
import { Outlet } from 'react-router-dom'
import PortalLayout from '../../components/PortalLayout'

const items = [
  { to: '/parent', end: true, icon: '📊', labelKey: 'dashboard' },
  { to: '/parent/children', icon: '🎓', labelKey: 'myChildren' },
  { to: '/parent/attendance', icon: '✅', labelKey: 'attendanceTitle' },
  { to: '/parent/grades', icon: '📈', labelKey: 'myGrades' },
  { to: '/parent/fees', icon: '💰', labelKey: 'fees' },
  { to: '/parent/calendar', icon: '📅', labelKey: 'calendar' },
  { to: '/parent/messages', icon: '✉️', labelKey: 'messages' },
]

export default function ParentPortal() {
  return (
    <PortalLayout roleLabelKey="roles.parent" items={items}>
      <Outlet />
    </PortalLayout>
  )
}
