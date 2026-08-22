import React from 'react'
import { Outlet } from 'react-router-dom'
import PortalLayout from '../../components/PortalLayout'

const items = [
  { to: '/admin', end: true, icon: '📊', labelKey: 'dashboard' },
  { to: '/admin/students', icon: '🎓', labelKey: 'students' },
  { to: '/admin/teachers', icon: '👩‍🏫', labelKey: 'teachers' },
  { to: '/admin/classes', icon: '🏫', labelKey: 'classes' },
  { to: '/admin/admissions', icon: '📝', labelKey: 'admissions' },
  { to: '/admin/fees', icon: '💰', labelKey: 'fees' },
  { to: '/admin/announcements', icon: '📢', labelKey: 'announcements' },
]

export default function AdminPortal() {
  return (
    <PortalLayout roleLabelKey="roles.admin" items={items}>
      <Outlet />
    </PortalLayout>
  )
}
