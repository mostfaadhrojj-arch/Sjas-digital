// Every screen calls functions from THIS file, never mockData or supabase
// directly. Each function already has real Supabase query code written —
// it's just short-circuited to mock data until `isSupabaseConfigured` is
// true (i.e. until you add .env credentials and create the tables in
// supabase/schema.sql). Delete the short-circuit once your tables have
// real rows, or leave it as a graceful fallback for local/demo mode.
import { supabase, isSupabaseConfigured } from './supabaseClient'
import * as mock from '../data/mockData'

async function fetchTable(table, mockValue, { orderBy } = {}) {
  if (!isSupabaseConfigured) return mockValue
  let query = supabase.from(table).select('*')
  if (orderBy) query = query.order(orderBy)
  const { data, error } = await query
  if (error) {
    console.error(`[dataService] ${table} fetch failed, falling back to mock data:`, error.message)
    return mockValue
  }
  return data?.length ? data : mockValue
}

export const getStudents = () => fetchTable('students', mock.students, { orderBy: 'name' })

// teachers/classes need counts (classes-per-teacher, students-per-class) that
// the schema computes via relations rather than storing as columns — so
// these two use a small join/aggregate instead of the generic fetchTable.
export async function getTeachers() {
  if (!isSupabaseConfigured) return mock.teachers
  const { data: teachers, error } = await supabase.from('teachers').select('*').order('name')
  if (error || !teachers?.length) return mock.teachers
  const [{ data: classes }, { data: students }] = await Promise.all([
    supabase.from('classes').select('id, teacher_id'),
    supabase.from('students').select('class_id'),
  ])
  return teachers.map((tRow) => {
    const myClassIds = new Set((classes || []).filter((c) => c.teacher_id === tRow.id).map((c) => c.id))
    const studentCount = (students || []).filter((s) => myClassIds.has(s.class_id)).length
    return { name: tRow.name, subject: tRow.subject, email: tRow.email, classes: myClassIds.size, students: studentCount }
  })
}

export async function getClasses() {
  if (!isSupabaseConfigured) return mock.classes
  const { data: classes, error } = await supabase.from('classes').select('*')
  if (error || !classes?.length) return mock.classes
  const [{ data: teachers }, { data: students }] = await Promise.all([
    supabase.from('teachers').select('id, name'),
    supabase.from('students').select('class_id'),
  ])
  const teacherById = Object.fromEntries((teachers || []).map((tRow) => [tRow.id, tRow.name]))
  return classes.map((c) => ({
    id: c.id,
    name: c.name,
    room: c.room,
    teacher: teacherById[c.teacher_id] || '—',
    students: (students || []).filter((s) => s.class_id === c.id).length,
  }))
}
export const getAdmissionsQueue = () => fetchTable('admissions', mock.admissionsQueue, { orderBy: 'date' })
// Real rows store student_id (text FK) and fee_type; the UI expects a
// friendly student name plus (for the WhatsApp reminder feature) the
// parent's phone number, neither of which live directly on the fees row.
export async function getFees() {
  if (!isSupabaseConfigured) return mock.fees
  const { data: rows, error } = await supabase.from('fees').select('*')
  if (error || !rows?.length) return mock.fees
  const { data: students } = await supabase.from('students').select('id, name, parent_phone')
  const studentById = Object.fromEntries((students || []).map((s) => [s.id, s]))
  return rows.map((r) => {
    const s = studentById[r.student_id] || {}
    return {
      student: s.name || r.student_id,
      parent_phone: s.parent_phone || null,
      type: r.fee_type,
      amount: r.amount,
      paid: r.paid,
      balance: r.balance,
      status: r.status,
    }
  })
}
export const getAnnouncements = () => fetchTable('announcements', mock.announcements, { orderBy: 'date' })
// Real rows store class_id (uuid) and due_date/submitted_count/total_count;
// normalize to the same shape mockData uses (class, due, submitted, total)
// so every homework card works the same regardless of data source.
export async function getHomework() {
  if (!isSupabaseConfigured) return mock.homework
  const { data: rows, error } = await supabase.from('homework').select('*').order('due_date')
  if (error || !rows?.length) return mock.homework
  const { data: classes } = await supabase.from('classes').select('id, name')
  const classById = Object.fromEntries((classes || []).map((c) => [c.id, c.name]))
  return rows.map((r) => ({
    title: r.title,
    class: classById[r.class_id] || '—',
    due: r.due_date,
    status: r.status,
    submitted: r.submitted_count,
    total: r.total_count,
  }))
}
export const getExams = () => fetchTable('exams', mock.exams, { orderBy: 'date' })
export const getGrades = (studentId) =>
  isSupabaseConfigured
    ? fetchTable('grades', mock.grades).then((rows) => (studentId ? rows.filter((r) => r.student_id === studentId) : rows))
    : Promise.resolve(mock.grades)
// The real table stores one flat row per period; the UI wants periods
// grouped by day (matching mockData's shape), so reshape here.
export async function getTimetable() {
  if (!isSupabaseConfigured) return mock.timetable
  const { data: rows, error } = await supabase.from('timetable_periods').select('*')
  if (error || !rows?.length) return mock.timetable
  const dayOrder = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu']
  const grouped = dayOrder
    .map((day) => ({
      day,
      periods: rows
        .filter((r) => r.day_of_week === day)
        .sort((a, b) => a.start_time.localeCompare(b.start_time))
        .map((r) => ({ time: `${r.start_time.slice(0, 5)}-${r.end_time.slice(0, 5)}`, subject: r.subject, room: r.room })),
    }))
    .filter((d) => d.periods.length)
  return grouped.length ? grouped : mock.timetable
}
export const getMessages = () => fetchTable('messages', mock.messages, { orderBy: 'date' })
export const getCalendarEvents = () => fetchTable('calendar_events', mock.calendarEvents, { orderBy: 'date' })

// Static/derived dashboard figures that don't (yet) need their own table.
// Calls the send-whatsapp-reminder Edge Function (see
// supabase/functions/send-whatsapp-reminder). Requires Twilio secrets to
// be set on the Supabase project — see supabase/functions/README.md.
export async function sendWhatsAppReminder(phone, message) {
  if (!isSupabaseConfigured) {
    console.info('[dataService] Supabase not configured — WhatsApp message not sent:', { phone, message })
    return { error: { message: 'Supabase not configured yet.' } }
  }
  if (!phone) {
    return { error: { message: 'This student has no parent phone number on file.' } }
  }
  const { data, error } = await supabase.functions.invoke('send-whatsapp-reminder', {
    body: { phone, message },
  })
  if (error) return { error }
  if (data && data.success === false) return { error: { message: data.error } }
  return { data }
}

export const getAttendanceTrend = () => Promise.resolve(mock.attendanceTrend)
export const getGradeDistribution = () => Promise.resolve(mock.gradeDistribution)

// Used by the Admin > Students "+ Add" form. `row` already uses real
// column names (id, name, grade, gender, parent_name, attendance, gpa).
export async function createStudent(row) {
  if (!isSupabaseConfigured) {
    console.info('[dataService] Supabase not configured — student not persisted:', row)
    return { data: row, error: null }
  }
  return supabase.from('students').insert(row).select().single()
}

// Used by the Admin > Teachers "+ Add" form.
export async function createTeacher(row) {
  if (!isSupabaseConfigured) {
    console.info('[dataService] Supabase not configured — teacher not persisted:', row)
    return { data: row, error: null }
  }
  return supabase.from('teachers').insert(row).select().single()
}

// Used by the Admin > Announcements "+ New" form.
export async function createAnnouncement(row) {
  if (!isSupabaseConfigured) {
    console.info('[dataService] Supabase not configured — announcement not persisted:', row)
    return { data: row, error: null }
  }
  return supabase.from('announcements').insert(row).select().single()
}

// Used by the Teacher > Homework "+ Create" form.
export async function createHomework(row) {
  if (!isSupabaseConfigured) {
    console.info('[dataService] Supabase not configured — homework not persisted:', row)
    return { data: row, error: null }
  }
  return supabase.from('homework').insert(row).select().single()
}

// `payload` comes from the form in camelCase; the admissions table uses
// snake_case column names, so we map it here — this is the ONLY place
// that needs to know both shapes.
export async function submitAdmissionApplication(payload) {
  if (!isSupabaseConfigured) {
    console.info('[dataService] Supabase not configured — application not persisted:', payload)
    return { data: payload, error: null }
  }
  const row = {
    student_name: payload.studentName,
    student_dob: payload.dob || null,
    grade: payload.grade,
    parent_name: payload.parentName,
    parent_email: payload.parentEmail,
    parent_phone: payload.parentPhone,
  }
  return supabase.from('admissions').insert(row).select().single()
}
