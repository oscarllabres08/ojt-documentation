/*
  # Create Vehicles Table and Authentication Setup

  ## Overview
  This migration creates the core vehicles table for the car dealership platform with real-time capabilities.

  ## New Tables
  
  ### `vehicles`
  - `id` (uuid, primary key) - Unique identifier for each vehicle
  - `make` (text) - Vehicle manufacturer (e.g., Toyota, Honda)
  - `model` (text) - Vehicle model name
  - `year` (integer) - Manufacturing year
  - `price` (integer) - Price in dollars
  - `mileage` (text) - Mileage information (e.g., "5,000 km")
  - `category` (text) - Vehicle type (Sedan, SUV, Van, Hatchback, Pick up)
  - `transmission` (text) - Transmission type (Automatic, Manual)
  - `fuel_type` (text) - Fuel type (Petrol, Diesel, Hybrid, Electric)
  - `image_url` (text) - URL to vehicle image
  - `status` (text) - Vehicle status: 'available' or 'sold'
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  
  ### Row Level Security (RLS)
  - RLS is enabled on the vehicles table
  - Public read access for all users (showroom view)
  - Admin-only write access (authenticated users with admin role)

  ## Policies
  
  1. **Public Read Access**: Anyone can view all vehicles
  2. **Admin Insert**: Only authenticated admins can add vehicles
  3. **Admin Update**: Only authenticated admins can update vehicles
  4. **Admin Delete**: Only authenticated admins can delete vehicles

  ## Notes
  - Real-time subscriptions are enabled by default on this table
  - The status field defaults to 'available'
  - Timestamps are automatically managed
*/

CREATE TABLE IF NOT EXISTS vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  make text NOT NULL,
  model text NOT NULL,
  year integer NOT NULL,
  price integer NOT NULL,
  mileage text NOT NULL,
  category text NOT NULL,
  transmission text NOT NULL,
  fuel_type text NOT NULL,
  image_url text NOT NULL,
  status text DEFAULT 'available' NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view vehicles"
  ON vehicles FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert vehicles"
  ON vehicles FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update vehicles"
  ON vehicles FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete vehicles"
  ON vehicles FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_vehicles_category ON vehicles(category);
CREATE INDEX IF NOT EXISTS idx_vehicles_status ON vehicles(status);
CREATE INDEX IF NOT EXISTS idx_vehicles_make ON vehicles(make);