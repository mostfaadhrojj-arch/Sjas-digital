-- Run this once in Supabase SQL Editor if you already ran the original
-- schema.sql (the admissions table was missing a column for the
-- application form's Date of Birth field).
alter table admissions
  add column if not exists student_dob date;
