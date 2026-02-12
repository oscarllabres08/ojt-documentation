/*
  # Create OJT Documentations Table

  ## Overview
  This migration creates the core OJT documentation table for interns to track their daily activities.

  ## New Tables
  
  ### `ojt_documentations`
  - `id` (uuid, primary key) - Unique identifier for each documentation entry
  - `user_id` (uuid, foreign key) - Reference to auth.users
  - `title` (text) - Title of the documentation (e.g., "Day 1", "Day 2")
  - `date` (date) - Date of the documentation
  - `description` (text) - What the intern did on that day
  - `image_urls` (text[]) - Array of image URLs (up to 5 images)
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  
  ### Row Level Security (RLS)
  - RLS is enabled on the ojt_documentations table
  - Users can only view their own documentations
  - Users can only insert/update/delete their own documentations

  ## Policies
  
  1. **Users can view their own documentations**: Users can only SELECT their own entries
  2. **Users can insert their own documentations**: Users can only INSERT entries with their own user_id
  3. **Users can update their own documentations**: Users can only UPDATE their own entries
  4. **Users can delete their own documentations**: Users can only DELETE their own entries

  ## Notes
  - Real-time subscriptions are enabled by default on this table
  - The image_urls field stores an array of up to 5 image URLs
  - Timestamps are automatically managed
*/

CREATE TABLE IF NOT EXISTS ojt_documentations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  date date NOT NULL,
  description text NOT NULL,
  image_urls text[] DEFAULT '{}' NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE ojt_documentations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own documentations"
  ON ojt_documentations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own documentations"
  ON ojt_documentations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own documentations"
  ON ojt_documentations FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own documentations"
  ON ojt_documentations FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_ojt_documentations_user_id ON ojt_documentations(user_id);
CREATE INDEX IF NOT EXISTS idx_ojt_documentations_date ON ojt_documentations(date);
CREATE INDEX IF NOT EXISTS idx_ojt_documentations_created_at ON ojt_documentations(created_at);
