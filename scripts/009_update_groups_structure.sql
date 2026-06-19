-- Update groups structure to support age and multiple teachers

-- Add age column to groups table
ALTER TABLE public.groups
ADD COLUMN IF NOT EXISTS age text;

-- Create junction table for multiple teachers per group
CREATE TABLE IF NOT EXISTS public.group_teachers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
  teacher_id uuid NOT NULL REFERENCES public.team_members(id) ON DELETE CASCADE,
  order_index integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(group_id, teacher_id)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_group_teachers_group ON public.group_teachers(group_id);
CREATE INDEX IF NOT EXISTS idx_group_teachers_teacher ON public.group_teachers(teacher_id);

-- Update group_schedules to have proper time ranges
ALTER TABLE public.group_schedules
ADD COLUMN IF NOT EXISTS start_time time,
ADD COLUMN IF NOT EXISTS end_time time;

-- Drop time_period if it exists (only if table has that column)
ALTER TABLE public.group_schedules
DROP COLUMN IF EXISTS time_period;

-- Enable RLS for group_teachers
ALTER TABLE public.group_teachers ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to ensure idempotency
DROP POLICY IF EXISTS "Group teachers are publicly visible" ON public.group_teachers;
DROP POLICY IF EXISTS "Admins can manage group teachers" ON public.group_teachers;
DROP POLICY IF EXISTS "Admins can insert group teachers" ON public.group_teachers;
DROP POLICY IF EXISTS "Admins can update group teachers" ON public.group_teachers;
DROP POLICY IF EXISTS "Admins can delete group teachers" ON public.group_teachers;

-- Public read access
CREATE POLICY "Group teachers are publicly visible"
  ON public.group_teachers FOR SELECT
  USING (true);

-- Admin insert access
CREATE POLICY "Admins can insert group teachers"
  ON public.group_teachers FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));

-- Admin update access
CREATE POLICY "Admins can update group teachers"
  ON public.group_teachers FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));

-- Admin delete access
CREATE POLICY "Admins can delete group teachers"
  ON public.group_teachers FOR DELETE
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));

-- Create index for group_schedules by time
CREATE INDEX IF NOT EXISTS idx_group_schedules_time ON public.group_schedules(day_of_week, start_time);
