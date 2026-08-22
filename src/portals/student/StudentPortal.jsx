import React from 'react'
import { Outlet } from 'react-router-dom'
import PortalLayout from '../../components/PortalLayout'

const items = [
  { to: '/student', end: true, icon: '📊', labelKey: 'dashboard' },
  { to: '/student/classes', icon: '📚', labelKey: 'myClassesTitle' },
  { to: '/student/grades', icon: '📈', labelKey: 'myGrades' },
  { to: '/student/homework', icon: '📝', labelKey: 'myHomework' },
  { to: '/student/timetable', icon: '📅', labelKey: 'myTimetable' },
  { to: '/student/announcements', icon: '📢', labelKey: 'announcements' },
]

export default function StudentPortal() {
  return (
    <PortalLayout roleLabelKey="roles.student" items={items}>
      <Outlet />
    </PortalLayout>
  )
}
