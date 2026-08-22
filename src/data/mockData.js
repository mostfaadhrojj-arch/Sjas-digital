// Temporary in-memory data. Every shape here mirrors a Supabase table
// (see supabase/schema.sql) so swapping mock -> live data is a 1:1 job —
// see src/services/dataService.js.

export const students = [
  { id: 'STU-001', name: 'Omar Khalil', grade: 'Grade 5A', attendance: 96, gpa: 3.8, parent: 'Ahmed Khalil', gender: 'male' },
  { id: 'STU-002', name: 'Laila Hassan', grade: 'Grade 7B', attendance: 98, gpa: 3.9, parent: 'Mona Hassan', gender: 'female' },
  { id: 'STU-003', name: 'Youssef Ibrahim', grade: 'Grade 3A', attendance: 94, gpa: 3.5, parent: 'Samar Ibrahim', gender: 'male' },
  { id: 'STU-004', name: 'Nour El-Din', grade: 'Grade 9C', attendance: 92, gpa: 3.2, parent: 'Hany El-Din', gender: 'female' },
  { id: 'STU-005', name: 'Mariam Said', grade: 'Grade 11A', attendance: 99, gpa: 4.0, parent: 'Fatma Said', gender: 'female' },
]

export const teachers = [
  { name: 'Dr. Sarah Mitchell', subject: 'Mathematics', classes: 3, students: 72 },
  { name: 'Mr. James Wilson', subject: 'English', classes: 4, students: 96 },
  { name: 'Ms. Amina Farouk', subject: 'Science', classes: 3, students: 68 },
  { name: 'Mr. Tarek El-Sayed', subject: 'Arabic', classes: 5, students: 120 },
  { name: 'Ms. Rania Hossam', subject: 'Art', classes: 2, students: 45 },
]

export const classes = [
  { name: 'Grade 5 - Section A', teacher: 'Dr. Sarah Mitchell', students: 24, room: 'A-201' },
  { name: 'Grade 7 - Section B', teacher: 'Mr. James Wilson', students: 26, room: 'B-105' },
  { name: 'Grade 3 - Section A', teacher: 'Ms. Amina Farouk', students: 22, room: 'A-103' },
  { name: 'Grade 9 - Section C', teacher: 'Mr. Tarek El-Sayed', students: 28, room: 'C-301' },
  { name: 'Grade 11 - Section A', teacher: 'Dr. Sarah Mitchell', students: 25, room: 'C-205' },
]

export const admissionsQueue = [
  { name: 'Youssef Ahmed', grade: 'KG2', parent: 'Ahmed Hassan', date: 'Aug 15', status: 'w' },
  { name: 'Nour Mahmoud', grade: 'Grade 2', parent: 'Mahmoud Ali', date: 'Aug 14', status: 'i' },
  { name: 'Layan Khaled', grade: 'Grade 6', parent: 'Khaled Omar', date: 'Aug 12', status: 's' },
  { name: 'Omar Samir', grade: 'Grade 4', parent: 'Samir Fathy', date: 'Aug 10', status: 'w' },
  { name: 'Hana Tarek', grade: 'Grade 1', parent: 'Tarek Nabil', date: 'Aug 8', status: 'd' },
]

export const fees = [
  { student: 'Omar Khalil', type: 'Tuition T1', amount: 18000, paid: 18000, balance: 0, status: 's' },
  { student: 'Laila Hassan', type: 'Tuition T1', amount: 18000, paid: 12000, balance: 6000, status: 'd' },
  { student: 'Youssef Ibrahim', type: 'Tuition T1', amount: 16000, paid: 0, balance: 16000, status: 'd' },
  { student: 'Nour El-Din', type: 'Bus Fee', amount: 20000, paid: 20000, balance: 0, status: 's' },
]

export const announcements = [
  { title: 'Welcome Back to School 2026-2027', date: 'Aug 18', priority: 'd', audience: 'All' },
  { title: 'Parent-Teacher Conferences Schedule', date: 'Aug 17', priority: 'i', audience: 'Parents' },
  { title: 'New After-School Clubs Registration', date: 'Aug 16', priority: 'i', audience: 'Students' },
  { title: 'Bus Route Changes Effective Sept 1', date: 'Aug 15', priority: 'd', audience: 'All' },
]

export const homework = [
  { title: 'Math: Fractions Worksheet', class: 'Grade 5A', due: 'Aug 22', status: 's', submitted: 18, total: 24 },
  { title: 'English: Essay on Climate', class: 'Grade 7B', due: 'Aug 23', status: 's', submitted: 22, total: 26 },
  { title: 'Science: Lab Report', class: 'Grade 9C', due: 'Aug 20', status: 'd', submitted: 25, total: 28 },
  { title: 'Arabic: Poetry Analysis', class: 'Grade 11A', due: 'Aug 25', status: 's', submitted: 12, total: 25 },
]

export const exams = [
  { name: 'Math Midterm', class: 'Grade 5A', date: 'Sep 5', duration: '90 min', status: 'u' },
  { name: 'English Final', class: 'Grade 7B', date: 'Sep 10', duration: '120 min', status: 'u' },
  { name: 'Science Quiz', class: 'Grade 9C', date: 'Aug 25', duration: '45 min', status: 'c' },
  { name: 'Arabic Oral', class: 'Grade 11A', date: 'Sep 12', duration: '30 min', status: 'u' },
]

export const grades = [
  { subject: 'Mathematics', q1: 92, q2: 88, midterm: 95, final: 92 },
  { subject: 'English', q1: 85, q2: 90, midterm: 88, final: 88 },
  { subject: 'Science', q1: 90, q2: 92, midterm: 94, final: 92 },
  { subject: 'Arabic', q1: 88, q2: 85, midterm: 90, final: 88 },
  { subject: 'Social Studies', q1: 82, q2: 84, midterm: 86, final: 84 },
]

export const timetable = [
  { day: 'Sun', periods: [{ time: '8:00-8:45', subject: 'Math', room: 'A-201' }, { time: '8:50-9:35', subject: 'English', room: 'A-201' }, { time: '9:40-10:25', subject: 'Science', room: 'Lab-1' }, { time: '10:30-11:15', subject: 'Break', room: '-' }, { time: '11:20-12:05', subject: 'Arabic', room: 'A-201' }, { time: '12:10-12:55', subject: 'Art', room: 'Art-Room' }, { time: '13:00-13:45', subject: 'PE', room: 'Gym' }] },
  { day: 'Mon', periods: [{ time: '8:00-8:45', subject: 'English', room: 'A-201' }, { time: '8:50-9:35', subject: 'Math', room: 'A-201' }, { time: '9:40-10:25', subject: 'Social', room: 'A-201' }, { time: '10:30-11:15', subject: 'Break', room: '-' }, { time: '11:20-12:05', subject: 'Science', room: 'Lab-2' }, { time: '12:10-12:55', subject: 'IT', room: 'Comp-Lab' }, { time: '13:00-13:45', subject: 'Music', room: 'Music-Room' }] },
  { day: 'Tue', periods: [{ time: '8:00-8:45', subject: 'Arabic', room: 'A-201' }, { time: '8:50-9:35', subject: 'Math', room: 'A-201' }, { time: '9:40-10:25', subject: 'English', room: 'A-201' }, { time: '10:30-11:15', subject: 'Break', room: '-' }, { time: '11:20-12:05', subject: 'PE', room: 'Gym' }, { time: '12:10-12:55', subject: 'Science', room: 'Lab-1' }, { time: '13:00-13:45', subject: 'French', room: 'A-201' }] },
  { day: 'Wed', periods: [{ time: '8:00-8:45', subject: 'Science', room: 'Lab-1' }, { time: '8:50-9:35', subject: 'Arabic', room: 'A-201' }, { time: '9:40-10:25', subject: 'Math', room: 'A-201' }, { time: '10:30-11:15', subject: 'Break', room: '-' }, { time: '11:20-12:05', subject: 'English', room: 'A-201' }, { time: '12:10-12:55', subject: 'Social', room: 'A-201' }, { time: '13:00-13:45', subject: 'Art', room: 'Art-Room' }] },
  { day: 'Thu', periods: [{ time: '8:00-8:45', subject: 'Math', room: 'A-201' }, { time: '8:50-9:35', subject: 'Science', room: 'Lab-2' }, { time: '9:40-10:25', subject: 'English', room: 'A-201' }, { time: '10:30-11:15', subject: 'Break', room: '-' }, { time: '11:20-12:05', subject: 'Arabic', room: 'A-201' }, { time: '12:10-12:55', subject: 'IT', room: 'Comp-Lab' }, { time: '13:00-13:45', subject: 'Club', room: 'Various' }] },
]

export const messages = [
  { from: 'Dr. Sarah Mitchell', to: 'Ahmed Khalil', subject: "Omar's Math Progress", date: 'Aug 18', read: false },
  { from: 'School Admin', to: 'All Parents', subject: 'Fee Payment Reminder', date: 'Aug 17', read: true },
  { from: 'Mr. James Wilson', to: 'Mona Hassan', subject: "Laila's Essay Feedback", date: 'Aug 16', read: false },
  { from: 'Nurse Office', to: 'Samar Ibrahim', subject: 'Youssef Medical Update', date: 'Aug 15', read: true },
]

export const calendarEvents = [
  { title: 'Back to School Night', date: 'Sep 2, 2026', time: '18:00 – 20:00' },
  { title: 'Parent-Teacher Conferences', date: 'Sep 15, 2026', time: '16:00 – 19:00' },
  { title: 'Science Fair 2026', date: 'Oct 15, 2026', time: '09:00 – 15:00' },
  { title: 'Fall Sports Day', date: 'Nov 8, 2026', time: '08:00 – 14:00' },
]

export const attendanceTrend = [72, 78, 65, 74, 70, 84] // % index points, for the sparkline
export const gradeDistribution = [
  { label: 'KG', value: 35, color: '#0F7A78' },
  { label: 'Elem', value: 60, color: '#C9A227' },
  { label: 'Mid', value: 85, color: '#12183B' },
  { label: 'High', value: 45, color: '#B5502F' },
  { label: 'AP', value: 20, color: '#7A81B5' },
]
