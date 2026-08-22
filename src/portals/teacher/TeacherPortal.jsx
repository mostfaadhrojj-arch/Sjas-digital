import React from 'react'
import { Outlet } from 'react-router-dom'
import PortalLayout from '../../components/PortalLayout'

const items = [
  { to: '/teacher', end: true, icon: '📊', labelKey: 'dashboard' },
  { to: '/teacher/classes', icon: '📚', labelKey: 'myClasses' },
  { to: '/teacher/attendance', icon: '✅', labelKey: 'attendanceGrade' },
  { to: '/teacher/gradebook', icon: '📈', labelKey: 'gradebook' },
  { to: '/teacher/homework', icon: '📝', labelKey: 'homework' },
  { to: '/teacher/timetable', icon: '📅', labelKey: 'timetable' },
]

export default function TeacherPortal() {
  return (
    <PortalLayout roleLabelKey="roles.teacher" items={items}>
      <Outlet />
    </PortalLayout>
  )
}
