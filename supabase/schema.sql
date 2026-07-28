-- Tudlo schema
-- Paste this into the Supabase SQL editor. Not intended to be run as a migration file.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- schools
-- ---------------------------------------------------------------------------
create table if not exists schools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  code text not null unique,
  division text,
  created_at timestamptz not null default now()
);

create index if not exists schools_division_idx on schools (division);

alter table schools enable row level security;

create policy "Authenticated users can read schools"
  on schools for select
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- teachers
-- ---------------------------------------------------------------------------
create table if not exists teachers (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools (id) on delete cascade,
  name text not null,
  auth_user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create index if not exists teachers_school_id_idx on teachers (school_id);
create unique index if not exists teachers_auth_user_id_idx on teachers (auth_user_id);

alter table teachers enable row level security;

create policy "Teachers can read their own row"
  on teachers for select
  to authenticated
  using (auth_user_id = auth.uid());

create policy "Teachers can update their own row"
  on teachers for update
  to authenticated
  using (auth_user_id = auth.uid())
  with check (auth_user_id = auth.uid());

create policy "Teachers can insert their own row"
  on teachers for insert
  to authenticated
  with check (auth_user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- classes
-- ---------------------------------------------------------------------------
create table if not exists classes (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references teachers (id) on delete cascade,
  school_id uuid not null references schools (id) on delete cascade,
  grade_level text not null,
  section text not null,
  subject text not null,
  created_at timestamptz not null default now()
);

create index if not exists classes_teacher_id_idx on classes (teacher_id);
create index if not exists classes_school_id_idx on classes (school_id);

alter table classes enable row level security;

create policy "Teachers can manage their own classes"
  on classes for all
  to authenticated
  using (
    teacher_id in (select id from teachers where auth_user_id = auth.uid())
  )
  with check (
    teacher_id in (select id from teachers where auth_user_id = auth.uid())
  );

-- ---------------------------------------------------------------------------
-- curriculum_positions
-- one current (is_current = true) position per class; older marks are kept
-- as history with is_current = false.
-- ---------------------------------------------------------------------------
create table if not exists curriculum_positions (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references classes (id) on delete cascade,
  quarter text not null,
  lesson_index int not null,
  lesson_title text not null,
  is_current boolean not null default true,
  marked_at timestamptz not null default now()
);

create index if not exists curriculum_positions_class_id_idx on curriculum_positions (class_id);
create unique index if not exists curriculum_positions_current_idx
  on curriculum_positions (class_id)
  where is_current;

alter table curriculum_positions enable row level security;

create policy "Teachers can manage curriculum positions for their classes"
  on curriculum_positions for all
  to authenticated
  using (
    class_id in (
      select c.id from classes c
      join teachers t on t.id = c.teacher_id
      where t.auth_user_id = auth.uid()
    )
  )
  with check (
    class_id in (
      select c.id from classes c
      join teachers t on t.id = c.teacher_id
      where t.auth_user_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- disruptions
-- ---------------------------------------------------------------------------
create table if not exists disruptions (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools (id) on delete cascade,
  type text not null,
  started_at timestamptz not null default now(),
  resolved_at timestamptz,
  source text
);

create index if not exists disruptions_school_id_idx on disruptions (school_id);
create index if not exists disruptions_started_at_idx on disruptions (started_at);

alter table disruptions enable row level security;

create policy "Teachers can manage disruptions for their school"
  on disruptions for all
  to authenticated
  using (
    school_id in (select school_id from teachers where auth_user_id = auth.uid())
  )
  with check (
    school_id in (select school_id from teachers where auth_user_id = auth.uid())
  );

-- ---------------------------------------------------------------------------
-- catchup_plans
-- ---------------------------------------------------------------------------
create table if not exists catchup_plans (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references classes (id) on delete cascade,
  disruption_id uuid references disruptions (id) on delete set null,
  plan jsonb not null,
  generated_at timestamptz not null default now()
);

create index if not exists catchup_plans_class_id_idx on catchup_plans (class_id);
create index if not exists catchup_plans_disruption_id_idx on catchup_plans (disruption_id);

alter table catchup_plans enable row level security;

create policy "Teachers can manage catch-up plans for their classes"
  on catchup_plans for all
  to authenticated
  using (
    class_id in (
      select c.id from classes c
      join teachers t on t.id = c.teacher_id
      where t.auth_user_id = auth.uid()
    )
  )
  with check (
    class_id in (
      select c.id from classes c
      join teachers t on t.id = c.teacher_id
      where t.auth_user_id = auth.uid()
    )
  );
