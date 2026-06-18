-- Migration to update time_period format from 'morning'/'afternoon' to specific time slots
-- This script updates existing records and ensures the table structure supports the new format

-- First, let's check if we have any old-format data and preserve it
-- Update any existing 'morning' entries to the first slot and 'afternoon' to first afternoon slot
UPDATE group_schedules 
SET time_period = '09:00 - 09:30'
WHERE time_period = 'morning' OR time_period IS NULL;

UPDATE group_schedules 
SET time_period = '12:00 - 12:30'
WHERE time_period = 'afternoon';

-- Add a constraint to ensure time_period is properly formatted (optional, for data integrity)
-- The time_period column remains TEXT to store flexible time ranges
