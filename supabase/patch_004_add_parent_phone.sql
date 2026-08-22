-- Run in Supabase SQL Editor, after patch_003_seed_demo_data.sql.
-- Adds the parent phone number needed to send WhatsApp reminders.
alter table students
  add column if not exists parent_phone text;

-- Optional: set real phone numbers for the 5 seeded demo students.
-- Use international format with country code, e.g. Egypt: +201xxxxxxxxx
-- (leave these as-is / edit with real numbers via Table Editor instead —
-- this UPDATE is only here as a convenience if you'd rather do it in SQL).
-- update students set parent_phone = '+201000000001' where id = 'STU-001';
-- update students set parent_phone = '+201000000002' where id = 'STU-002';
-- update students set parent_phone = '+201000000003' where id = 'STU-003';
-- update students set parent_phone = '+201000000004' where id = 'STU-004';
-- update students set parent_phone = '+201000000005' where id = 'STU-005';
