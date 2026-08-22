-- =====================================================================
-- SJAS Digital — Supabase schema
-- Run this in Supabase Dashboard → SQL Editor (a fresh project's public
-- schema). Table/column names match the shapes returned by mockData.js,
-- so once these tables have rows, src/services/dataService.js starts
-- reading real data with no component changes required.
-- =====================================================================

-- Extensions -----------------------------------------------------------
create extension if not exists "pgcrypto"; -- for gen_random_uuid()

-- ENUM-like check constraints instead of native enums, so status codes
-- stay easy to extend from the dashboard without a migration.

-- Profiles ---------------------------------------------------------------
-- One row per authenticated user; role drives which portal they see.
-- Linked to Supabase Auth via the same id as auth.users.
create table if not exists profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  full_name     text not null,
  role          text not null check (role in ('admin','teacher','student','parent')),
  email         text,
  phone         text,
  created_at    timestamptz not null default now()
);

-- Teachers -----------------------------------------------------------
create table if not exists teachers (
  id            uuid primary key default gen_random_uuid(),
  profile_id    uuid references profiles(id) on delete set null,
  name          text not null,
  subject       text not null,
  email         text,
  created_at    timestamptz not null default now()
);

-- Classes --------------------------------------------------------------
create table if not exists classes (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,           -- e.g. "Grade 5 - Section A"
  grade         text not null,           -- e.g. "Grade 5A"
  room          text,
  teacher_id    uuid references teachers(id) on delete set null,
  created_at    timestamptz not null default now()
);

-- Students ---------------------------------------------------------------
create table if not exists students (
  id            text primary key,        -- e.g. "STU-001"
  profile_id    uuid references profiles(id) on delete set null,
  name          text not null,
  grade         text not null,
  gender        text check (gender in ('male','female')),
  class_id      uuid references classes(id) on delete set null,
  parent_id     uuid references profiles(id) on delete set null,
  parent_name   text,                    -- denormalized for quick display
  attendance    numeric(5,2) default 0,  -- rolling % cache
  gpa           numeric(3,2) default 0,  -- rolling GPA cache
  created_at    timestamptz not null default now()
);

-- Attendance (daily records; `students.attendance` is the rolling cache) -
create table if not exists attendance_records (
  id            uuid primary key default gen_random_uuid(),
  student_id    text references students(id) on delete cascade,
  class_id      uuid references classes(id) on delete cascade,
  date          date not null,
  status        text not null check (status in ('present','absent','late')),
  note          text,
  marked_by     uuid references teachers(id),
  created_at    timestamptz not null default now(),
  unique (student_id, date)
);

-- Grades -----------------------------------------------------------------
create table if not exists grades (
  id            uuid primary key default gen_random_uuid(),
  student_id    text references students(id) on delete cascade,
  subject       text not null,
  q1            numeric(5,2),
  q2            numeric(5,2),
  midterm       numeric(5,2),
  project       numeric(5,2),
  final         numeric(5,2),
  term          text default 'T1',
  updated_at    timestamptz not null default now(),
  unique (student_id, subject, term)
);

-- Fees ---------------------------------------------------------------------
create table if not exists fees (
  id            uuid primary key default gen_random_uuid(),
  student_id    text references students(id) on delete cascade,
  fee_type      text not null,           -- e.g. "Tuition T1", "Bus Fee"
  amount        numeric(12,2) not null,
  paid          numeric(12,2) not null default 0,
  balance       numeric(12,2) generated always as (amount - paid) stored,
  status        text generated always as (
                   case when amount - paid <= 0 then 'paid' else 'unpaid' end
                 ) stored,
  due_date      date,
  created_at    timestamptz not null default now()
);

-- Homework -----------------------------------------------------------------
create table if not exists homework (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  class_id      uuid references classes(id) on delete cascade,
  teacher_id    uuid references teachers(id) on delete set null,
  due_date      date not null,
  status        text not null default 'scheduled' check (status in ('scheduled','due','submitted')),
  submitted_count int default 0,
  total_count     int default 0,
  created_at    timestamptz not null default now()
);

-- Exams ----------------------------------------------------------------
create table if not exists exams (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  class_id      uuid references classes(id) on delete cascade,
  exam_date     date not null,
  duration_minutes int,
  status        text not null default 'upcoming' check (status in ('upcoming','completed')),
  created_at    timestamptz not null default now()
);

-- Admissions applications ---------------------------------------------
create table if not exists admissions (
  id            uuid primary key default gen_random_uuid(),
  student_name  text not null,
  student_dob   date,
  grade         text not null,
  parent_name   text not null,
  parent_email  text not null,
  parent_phone  text,
  status        text not null default 'submitted' check (status in ('submitted','interview','waitlisted','declined','enrolled')),
  applied_on    date not null default current_date,
  created_at    timestamptz not null default now()
);

-- Announcements ----------------------------------------------------------
create table if not exists announcements (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  body          text,
  audience      text not null default 'All',   -- 'All' | 'Parents' | 'Students' | 'Teachers'
  priority      text not null default 'info' check (priority in ('info','urgent')),
  published_at  date not null default current_date,
  created_at    timestamptz not null default now()
);

-- Messages (inbox) -------------------------------------------------------
create table if not exists messages (
  id            uuid primary key default gen_random_uuid(),
  from_profile  uuid references profiles(id),
  to_profile    uuid references profiles(id),
  subject       text not null,
  body          text,
  read          boolean not null default false,
  sent_at       timestamptz not null default now()
);

-- Calendar events ----------------------------------------------------------
create table if not exists calendar_events (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  event_date    date not null,
  start_time    time,
  end_time      time,
  location      text,
  created_at    timestamptz not null default now()
);

-- Timetable ------------------------------------------------------------
create table if not exists timetable_periods (
  id            uuid primary key default gen_random_uuid(),
  class_id      uuid references classes(id) on delete cascade,
  day_of_week   text not null check (day_of_week in ('Sun','Mon','Tue','Wed','Thu')),
  start_time    time not null,
  end_time      time not null,
  subject       text not null,
  room          text
);

-- Indexes ------------------------------------------------------------------
create index if not exists idx_students_class on students(class_id);
create index if not exists idx_grades_student on grades(student_id);
create index if not exists idx_fees_student on fees(student_id);
create index if not exists idx_attendance_student_date on attendance_records(student_id, date);
create index if not exists idx_homework_class on homework(class_id);
create index if not exists idx_timetable_class on timetable_periods(class_id);

-- =====================================================================
-- Row Level Security — enable and start locked down. Add policies per
-- role once you wire up Supabase Auth (see src/context/AuthContext.jsx).
-- Example policies are provided commented-out below as a starting point.
-- =====================================================================
alter table profiles enable row level security;
alter table students enable row level security;
alter table grades enable row level security;
alter table fees enable row level security;
alter table attendance_records enable row level security;
alter table messages enable row level security;

-- Example: a student/parent can only read their own student row.
-- create policy "students read own record"
--   on students for select
--   using (
--     auth.uid() = profile_id
--     or auth.uid() = parent_id
--     or exists (select 1 from profiles p where p.id = auth.uid() and p.role in ('admin','teacher'))
--   );

-- Example: only admins can insert/update fee records.
-- create policy "admin manage fees"
--   on fees for all
--   using (exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin'));
