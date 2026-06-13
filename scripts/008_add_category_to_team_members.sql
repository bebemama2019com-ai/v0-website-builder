-- Add category field to team_members table
-- Categories: pedagogical, medical, other, security

ALTER TABLE public.team_members
ADD COLUMN category TEXT DEFAULT 'other' NOT NULL;

-- Add index for faster filtering by category
CREATE INDEX IF NOT EXISTS team_members_category_idx ON public.team_members(category);

-- Update existing team members with appropriate categories based on their role
UPDATE public.team_members 
SET category = 'pedagogical'
WHERE role ILIKE '%Директор%' OR role ILIKE '%Учител%';

UPDATE public.team_members
SET category = 'medical'
WHERE role ILIKE '%Медицински%';

UPDATE public.team_members
SET category = 'security'
WHERE role ILIKE '%Охрана%' OR name ILIKE '%ГАРД%';

UPDATE public.team_members
SET category = 'other'
WHERE category = 'other';
