import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

import PublicPortal from './portals/public/PublicPortal'
import Home from './portals/public/Home'
import About from './portals/public/About'
import Programs from './portals/public/Programs'
import Admissions from './portals/public/Admissions'
import Life from './portals/public/Life'
import Contact from './portals/public/Contact'

import AdminPortal from './portals/admin/AdminPortal'
import AdminDashboard from './portals/admin/Dashboard'
import AdminStudents from './portals/admin/Students'
import AdminTeachers from './portals/admin/Teachers'
import AdminClasses from './portals/admin/Classes'
import AdminAdmissions from './portals/admin/AdmissionsQueue'
import AdminFees from './portals/admin/Fees'
import AdminAnnouncements from './portals/admin/Announcements'

import TeacherPortal from './portals/teacher/TeacherPortal'
import TeacherDashboard from './portals/teacher/Dashboard'
import TeacherMyClasses from './portals/teacher/MyClasses'
import TeacherAttendance from './portals/teacher/Attendance'
import TeacherGradebook from './portals/teacher/Gradebook'
import TeacherHomework from './portals/teacher/HomeworkPage'
import TeacherTimetable from './portals/teacher/TimetablePage'

import StudentPortal from './portals/student/StudentPortal'
import StudentDashboard from './portals/student/Dashboard'
import StudentMyClasses from './portals/student/MyClasses'
import StudentGrades from './portals/student/Grades'
import StudentHomework from './portals/student/HomeworkPage'
import StudentTimetable from './portals/student/TimetablePage'
import StudentAnnouncements from './portals/student/AnnouncementsPage'

import ParentPortal from './portals/parent/ParentPortal'
import ParentDashboard from './portals/parent/Dashboard'
import ParentChildren from './portals/parent/Children'
import ParentAttendance from './portals/parent/Attendance'
import ParentGrades from './portals/parent/Grades'
import ParentFees from './portals/parent/Fees'
import ParentCalendar from './portals/parent/Calendar'
import ParentMessages from './portals/parent/Messages'

export default function App() {
  return (
    <div className="min-h-screen bg-parchment font-body text-ink-900">
      <Navbar />
      <Routes>
        {/* Public marketing site */}
        <Route path="/" element={<PublicPortal />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="programs" element={<Programs />} />
          <Route path="admissions" element={<Admissions />} />
          <Route path="life" element={<Life />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Admin */}
        <Route path="/admin" element={<AdminPortal />}>
          <Route index element={<AdminDashboard />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="teachers" element={<AdminTeachers />} />
          <Route path="classes" element={<AdminClasses />} />
          <Route path="admissions" element={<AdminAdmissions />} />
          <Route path="fees" element={<AdminFees />} />
          <Route path="announcements" element={<AdminAnnouncements />} />
        </Route>

        {/* Teacher */}
        <Route path="/teacher" element={<TeacherPortal />}>
          <Route index element={<TeacherDashboard />} />
          <Route path="classes" element={<TeacherMyClasses />} />
          <Route path="attendance" element={<TeacherAttendance />} />
          <Route path="gradebook" element={<TeacherGradebook />} />
          <Route path="homework" element={<TeacherHomework />} />
          <Route path="timetable" element={<TeacherTimetable />} />
        </Route>

        {/* Student */}
        <Route path="/student" element={<StudentPortal />}>
          <Route index element={<StudentDashboard />} />
          <Route path="classes" element={<StudentMyClasses />} />
          <Route path="grades" element={<StudentGrades />} />
          <Route path="homework" element={<StudentHomework />} />
          <Route path="timetable" element={<StudentTimetable />} />
          <Route path="announcements" element={<StudentAnnouncements />} />
        </Route>

        {/* Parent */}
        <Route path="/parent" element={<ParentPortal />}>
          <Route index element={<ParentDashboard />} />
          <Route path="children" element={<ParentChildren />} />
          <Route path="attendance" element={<ParentAttendance />} />
          <Route path="grades" element={<ParentGrades />} />
          <Route path="fees" element={<ParentFees />} />
          <Route path="calendar" element={<ParentCalendar />} />
          <Route path="messages" element={<ParentMessages />} />
        </Route>
      </Routes>
    </div>
  )
}
