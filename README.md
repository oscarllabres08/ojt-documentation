# OJT Documentation Platform

A modern web application for interns to document their On-the-Job Training (OJT) journey. Built with React, TypeScript, Vite, and Supabase.

## Features

- 🔐 **User Authentication**: Register and login for interns
- 📝 **Daily Documentation**: Add documentation entries with title (Day number), date, and description
- 📸 **Image Upload**: Upload up to 5 images per documentation entry
- 📊 **Dashboard**: View all your documentation entries in a beautiful dashboard
- ✏️ **Edit & Delete**: Update or remove your documentation entries
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Authentication, Database, Storage)
- **Icons**: Lucide React

## Prerequisites

- Node.js 18+ and npm
- A Supabase account and project

## Quick Start

For detailed step-by-step setup instructions, see **[SETUP_GUIDE.md](./SETUP_GUIDE.md)**

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd ojt-documentation
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com) (Free tier is sufficient)

2. **Run Database Migration**:
   - Go to **SQL Editor** in your Supabase dashboard
   - Click **New query**
   - Copy and paste the contents of `supabase/migrations/20251201001222_create_ojt_documentations_table.sql`
   - Click **Run** to execute the migration

3. **Enable Realtime for the Table** (Important for live updates):
   - Go to **Database** → **Replication** in your Supabase dashboard
   - Find the `ojt_documentations` table
   - Toggle **Enable Realtime** to ON
   - This allows the app to automatically update when documentations are added/edited/deleted

4. **Create a Storage Bucket**:
   - Go to **Storage** in your Supabase dashboard
   - Click **New bucket**
   - Name it: `ojt-images`
   - Make it **Public** (or configure RLS policies as needed)
   - Set up the following policies:
     - **SELECT**: Allow authenticated users to read
     - **INSERT**: Allow authenticated users to upload
     - **UPDATE**: Allow authenticated users to update
     - **DELETE**: Allow authenticated users to delete

5. **Note about Users**:
   - Users are automatically created when they register via Supabase Auth
   - No separate users table is needed - Supabase handles this automatically
   - User authentication is included in the free tier

4. Get your Supabase credentials:
   - Go to **Settings** → **API**
   - Copy your **Project URL** and **anon/public key**

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Deployment to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your environment variables in Vercel project settings:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy!

## Project Structure

```
src/
├── components/          # React components
│   ├── DocumentationCard.tsx
│   ├── DocumentationFormModal.tsx
│   ├── Header.tsx
│   ├── LoginModal.tsx
│   └── RegistrationModal.tsx
├── contexts/           # React contexts
│   └── AuthContext.tsx
├── hooks/              # Custom hooks
│   └── useDocumentations.ts
├── lib/                # Utilities and config
│   └── supabase.ts
├── pages/              # Page components
│   ├── Home.tsx
│   └── UserDashboard.tsx
└── App.tsx            # Main app component
```

## Database Schema

### `ojt_documentations` table

- `id` (uuid, primary key)
- `user_id` (uuid, foreign key to auth.users)
- `title` (text) - e.g., "Day 1", "Day 2"
- `date` (date)
- `description` (text) - What the intern did
- `image_urls` (text[]) - Array of image URLs (up to 5)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

## Usage

1. **Register/Login**: Click "Login / Register" on the homepage
2. **Add Documentation**: Click "Add Documentation" button in your dashboard
3. **Fill Form**: Enter title (Day number), date, description, and upload images (up to 5)
4. **View Entries**: All your documentation entries are displayed in your dashboard
5. **Edit/Delete**: Use the edit and delete buttons on each card

## License

MIT
