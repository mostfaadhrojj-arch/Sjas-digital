-- =====================================================================
-- SJAS Digital — seed real data (from the same demo dataset)
-- Run in Supabase SQL Editor in this order:
--   1. schema.sql
--   2. patch_001_admissions_dob.sql
--   3. patch_002_add_unique_constraints.sql
--   4. patch_003_seed_demo_data.sql  (this file)
-- Safe to re-run: every insert upserts on a fixed id or a real unique
-- constraint (added by patch_002), so running it twice updates rows
-- instead of duplicating them.
--
-- Fixed UUIDs are used for teachers/classes (instead of random ones)
-- purely so this script can reference them directly without needing
-- subqueries — feel free to replace them with real values later.
--
-- Known scope limits (by design, for this first pass):
--  • Only Omar Khalil (STU-001) gets seeded grades. The Student portal's
--    grades page doesn't yet filter by the logged-in student (there's no
--    real login yet — see "نفعّل تسجيل الدخول الحقيقي" from earlier), so
--    seeding more than one student's grades would show them all mixed
--    together on that page. This gets fixed when real auth is wired up.
--  • timetable_periods is seeded only for Grade 5 - Section A, since the
--    timetable view isn't filtered per class yet either.
--  • messages and attendance_records are NOT seeded here: messages needs
--    real user profiles (auth) to link from/to correctly, and the
--    teacher Attendance page isn't wired to the database yet — both are
--    good candidates for a later pass.
-- =====================================================================

-- Teachers ---------------------------------------------------------------
insert into teachers (id, name, subject, email) values
  ('11111111-1111-1111-1111-111111111101', 'Dr. Sarah Mitchell', 'Mathematics', 'mitchell@sjas.edu.eg'),
  ('11111111-1111-1111-1111-111111111102', 'Mr. James Wilson',   'English',     'wilson@sjas.edu.eg'),
  ('11111111-1111-1111-1111-111111111103', 'Ms. Amina Farouk',   'Science',     'farouk@sjas.edu.eg'),
  ('11111111-1111-1111-1111-111111111104', 'Mr. Tarek El-Sayed', 'Arabic',      'el-sayed@sjas.edu.eg'),
  ('11111111-1111-1111-1111-111111111105', 'Ms. Rania Hossam',   'Art',         'hossam@sjas.edu.eg')
on conflict (id) do update set name = excluded.name, subject = excluded.subject, email = excluded.email;

-- Classes ------------------------------------------------------------------
insert into classes (id, name, grade, room, teacher_id) values
  ('22222222-2222-2222-2222-222222222201', 'Grade 5 - Section A',  'Grade 5A',  'A-201', '11111111-1111-1111-1111-111111111101'),
  ('22222222-2222-2222-2222-222222222202', 'Grade 7 - Section B',  'Grade 7B',  'B-105', '11111111-1111-1111-1111-111111111102'),
  ('22222222-2222-2222-2222-222222222203', 'Grade 3 - Section A',  'Grade 3A',  'A-103', '11111111-1111-1111-1111-111111111103'),
  ('22222222-2222-2222-2222-222222222204', 'Grade 9 - Section C',  'Grade 9C',  'C-301', '11111111-1111-1111-1111-111111111104'),
  ('22222222-2222-2222-2222-222222222205', 'Grade 11 - Section A', 'Grade 11A', 'C-205', '11111111-1111-1111-1111-111111111101')
on conflict (id) do update set name = excluded.name, grade = excluded.grade, room = excluded.room, teacher_id = excluded.teacher_id;

-- Students -----------------------------------------------------------------
insert into students (id, name, grade, gender, class_id, parent_name, attendance, gpa) values
  ('STU-001', 'Omar Khalil',     'Grade 5A',  'male',   '22222222-2222-2222-2222-222222222201', 'Ahmed Khalil', 96, 3.8),
  ('STU-002', 'Laila Hassan',    'Grade 7B',  'female', '22222222-2222-2222-2222-222222222202', 'Mona Hassan',  98, 3.9),
  ('STU-003', 'Youssef Ibrahim', 'Grade 3A',  'male',   '22222222-2222-2222-2222-222222222203', 'Samar Ibrahim',94, 3.5),
  ('STU-004', 'Nour El-Din',     'Grade 9C',  'female', '22222222-2222-2222-2222-222222222204', 'Hany El-Din',  92, 3.2),
  ('STU-005', 'Mariam Said',     'Grade 11A', 'female', '22222222-2222-2222-2222-222222222205', 'Fatma Said',   99, 4.0)
on conflict (id) do update set name = excluded.name, grade = excluded.grade, gender = excluded.gender,
  class_id = excluded.class_id, parent_name = excluded.parent_name, attendance = excluded.attendance, gpa = excluded.gpa;

-- Fees -----------------------------------------------------------------------
-- (balance/status are generated columns — never insert them directly)
insert into fees (student_id, fee_type, amount, paid) values
  ('STU-001', 'Tuition T1', 18000, 18000),
  ('STU-002', 'Tuition T1', 18000, 12000),
  ('STU-003', 'Tuition T1', 16000, 0),
  ('STU-004', 'Bus Fee',    20000, 20000)
on conflict (student_id, fee_type) do update set amount = excluded.amount, paid = excluded.paid;

-- Grades — Omar Khalil (STU-001) only, see note above -----------------------
insert into grades (student_id, subject, q1, q2, midterm, project, final, term) values
  ('STU-001', 'Mathematics',     92, 88, 95, 95, 92, 'T1'),
  ('STU-001', 'English',         85, 90, 88, 92, 88, 'T1'),
  ('STU-001', 'Science',         90, 92, 94, 98, 92, 'T1'),
  ('STU-001', 'Arabic',          88, 85, 90, 90, 88, 'T1'),
  ('STU-001', 'Social Studies',  82, 84, 86, 86, 84, 'T1')
on conflict (student_id, subject, term) do update set
  q1 = excluded.q1, q2 = excluded.q2, midterm = excluded.midterm, project = excluded.project, final = excluded.final;

-- Homework -------------------------------------------------------------------
insert into homework (title, class_id, teacher_id, due_date, status, submitted_count, total_count) values
  ('Math: Fractions Worksheet',  '22222222-2222-2222-2222-222222222201', '11111111-1111-1111-1111-111111111101', '2026-08-22', 'submitted', 18, 24),
  ('English: Essay on Climate',  '22222222-2222-2222-2222-222222222202', '11111111-1111-1111-1111-111111111102', '2026-08-23', 'submitted', 22, 26),
  ('Science: Lab Report',        '22222222-2222-2222-2222-222222222204', '11111111-1111-1111-1111-111111111103', '2026-08-20', 'due',       25, 28),
  ('Arabic: Poetry Analysis',    '22222222-2222-2222-2222-222222222205', '11111111-1111-1111-1111-111111111104', '2026-08-25', 'submitted', 12, 25)
on conflict (title, class_id) do update set due_date = excluded.due_date, status = excluded.status,
  submitted_count = excluded.submitted_count, total_count = excluded.total_count, teacher_id = excluded.teacher_id;

-- Exams (not yet displayed in the UI, but kept for future use) ---------------
insert into exams (name, class_id, exam_date, duration_minutes, status) values
  ('Math Midterm',   '22222222-2222-2222-2222-222222222201', '2026-09-05', 90,  'upcoming'),
  ('English Final',  '22222222-2222-2222-2222-222222222202', '2026-09-10', 120, 'upcoming'),
  ('Science Quiz',   '22222222-2222-2222-2222-222222222204', '2026-08-25', 45,  'completed'),
  ('Arabic Oral',    '22222222-2222-2222-2222-222222222205', '2026-09-12', 30,  'upcoming')
on conflict (name, class_id) do update set exam_date = excluded.exam_date, duration_minutes = excluded.duration_minutes, status = excluded.status;

-- Announcements ----------------------------------------------------------
insert into announcements (title, audience, priority, published_at) values
  ('Welcome Back to School 2026-2027',       'All',      'urgent', '2026-08-18'),
  ('Parent-Teacher Conferences Schedule',    'Parents',  'info',   '2026-08-17'),
  ('New After-School Clubs Registration',    'Students', 'info',   '2026-08-16'),
  ('Bus Route Changes Effective Sept 1',     'All',      'urgent', '2026-08-15')
on conflict (title, published_at) do update set audience = excluded.audience, priority = excluded.priority;

-- Calendar events ------------------------------------------------------------
insert into calendar_events (title, event_date, start_time, end_time, location) values
  ('Back to School Night',            '2026-09-02', '18:00', '20:00', 'Auditorium'),
  ('Parent-Teacher Conferences',      '2026-09-15', '16:00', '19:00', null),
  ('Science Fair 2026',               '2026-10-15', '09:00', '15:00', 'Science Building'),
  ('Fall Sports Day',                 '2026-11-08', '08:00', '14:00', null)
on conflict (title, event_date) do update set start_time = excluded.start_time, end_time = excluded.end_time, location = excluded.location;

-- Timetable — Grade 5 - Section A only, see note above -----------------------
insert into timetable_periods (class_id, day_of_week, start_time, end_time, subject, room) values
  ('22222222-2222-2222-2222-222222222201', 'Sun', '08:00', '08:45', 'Math',    'A-201'),
  ('22222222-2222-2222-2222-222222222201', 'Sun', '08:50', '09:35', 'English', 'A-201'),
  ('22222222-2222-2222-2222-222222222201', 'Sun', '09:40', '10:25', 'Science', 'Lab-1'),
  ('22222222-2222-2222-2222-222222222201', 'Sun', '10:30', '11:15', 'Break',   '-'),
  ('22222222-2222-2222-2222-222222222201', 'Sun', '11:20', '12:05', 'Arabic',  'A-201'),
  ('22222222-2222-2222-2222-222222222201', 'Sun', '12:10', '12:55', 'Art',     'Art-Room'),
  ('22222222-2222-2222-2222-222222222201', 'Sun', '13:00', '13:45', 'PE',      'Gym'),

  ('22222222-2222-2222-2222-222222222201', 'Mon', '08:00', '08:45', 'English', 'A-201'),
  ('22222222-2222-2222-2222-222222222201', 'Mon', '08:50', '09:35', 'Math',    'A-201'),
  ('22222222-2222-2222-2222-222222222201', 'Mon', '09:40', '10:25', 'Social',  'A-201'),
  ('22222222-2222-2222-2222-222222222201', 'Mon', '10:30', '11:15', 'Break',   '-'),
  ('22222222-2222-2222-2222-222222222201', 'Mon', '11:20', '12:05', 'Science', 'Lab-2'),
  ('22222222-2222-2222-2222-222222222201', 'Mon', '12:10', '12:55', 'IT',      'Comp-Lab'),
  ('22222222-2222-2222-2222-222222222201', 'Mon', '13:00', '13:45', 'Music',   'Music-Room'),

  ('22222222-2222-2222-2222-222222222201', 'Tue', '08:00', '08:45', 'Arabic',  'A-201'),
  ('22222222-2222-2222-2222-222222222201', 'Tue', '08:50', '09:35', 'Math',    'A-201'),
  ('22222222-2222-2222-2222-222222222201', 'Tue', '09:40', '10:25', 'English', 'A-201'),
  ('22222222-2222-2222-2222-222222222201', 'Tue', '10:30', '11:15', 'Break',   '-'),
  ('22222222-2222-2222-2222-222222222201', 'Tue', '11:20', '12:05', 'PE',      'Gym'),
  ('22222222-2222-2222-2222-222222222201', 'Tue', '12:10', '12:55', 'Science', 'Lab-1'),
  ('22222222-2222-2222-2222-222222222201', 'Tue', '13:00', '13:45', 'French',  'A-201'),

  ('22222222-2222-2222-2222-222222222201', 'Wed', '08:00', '08:45', 'Science', 'Lab-1'),
  ('22222222-2222-2222-2222-222222222201', 'Wed', '08:50', '09:35', 'Arabic',  'A-201'),
  ('22222222-2222-2222-2222-222222222201', 'Wed', '09:40', '10:25', 'Math',    'A-201'),
  ('22222222-2222-2222-2222-222222222201', 'Wed', '10:30', '11:15', 'Break',   '-'),
  ('22222222-2222-2222-2222-222222222201', 'Wed', '11:20', '12:05', 'English', 'A-201'),
  ('22222222-2222-2222-2222-222222222201', 'Wed', '12:10', '12:55', 'Social',  'A-201'),
  ('22222222-2222-2222-2222-222222222201', 'Wed', '13:00', '13:45', 'Art',     'Art-Room'),

  ('22222222-2222-2222-2222-222222222201', 'Thu', '08:00', '08:45', 'Math',    'A-201'),
  ('22222222-2222-2222-2222-222222222201', 'Thu', '08:50', '09:35', 'Science', 'Lab-2'),
  ('22222222-2222-2222-2222-222222222201', 'Thu', '09:40', '10:25', 'English', 'A-201'),
  ('22222222-2222-2222-2222-222222222201', 'Thu', '10:30', '11:15', 'Break',   '-'),
  ('22222222-2222-2222-2222-222222222201', 'Thu', '11:20', '12:05', 'Arabic',  'A-201'),
  ('22222222-2222-2222-2222-222222222201', 'Thu', '12:10', '12:55', 'IT',      'Comp-Lab'),
  ('22222222-2222-2222-2222-222222222201', 'Thu', '13:00', '13:45', 'Club',    'Various')
on conflict (class_id, day_of_week, start_time) do update set end_time = excluded.end_time, subject = excluded.subject, room = excluded.room;
