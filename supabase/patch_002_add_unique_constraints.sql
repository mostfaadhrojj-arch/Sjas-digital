-- Run this BEFORE patch_003_seed_demo_data.sql. It adds the unique
-- constraints those inserts rely on for "on conflict" to work — without
-- these, re-running the seed script would duplicate every row, since the
-- only existing uniqueness is each table's auto-generated id.
-- Safe to run more than once (each block checks before adding).

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'fees_student_type_unique') then
    alter table fees add constraint fees_student_type_unique unique (student_id, fee_type);
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'homework_title_class_unique') then
    alter table homework add constraint homework_title_class_unique unique (title, class_id);
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'exams_name_class_unique') then
    alter table exams add constraint exams_name_class_unique unique (name, class_id);
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'announcements_title_date_unique') then
    alter table announcements add constraint announcements_title_date_unique unique (title, published_at);
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'calendar_events_title_date_unique') then
    alter table calendar_events add constraint calendar_events_title_date_unique unique (title, event_date);
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'timetable_slot_unique') then
    alter table timetable_periods add constraint timetable_slot_unique unique (class_id, day_of_week, start_time);
  end if;
end $$;
