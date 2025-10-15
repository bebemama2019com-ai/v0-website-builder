-- Add quarter field to documents table for quarterly budget documents
alter table public.documents add column if not exists quarter text;

-- Add comment to explain the quarter field
comment on column public.documents.quarter is 'Quarter for budget documents: Q1, Q2, Q3, Q4';

-- Create index for quarter
create index if not exists documents_quarter_idx on public.documents(quarter);
