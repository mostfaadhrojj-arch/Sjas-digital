import React from 'react'
import Sidebar from './Sidebar'

export default function PortalLayout({ roleLabelKey, items, children }) {
  return (
    <div className="flex min-h-[calc(100vh-64px)] max-w-7xl mx-auto">
      <Sidebar roleLabelKey={roleLabelKey} items={items} />
      <main className="flex-1 p-6 overflow-x-hidden">{children}</main>
    </div>
  )
}
