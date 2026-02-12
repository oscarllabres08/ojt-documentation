# Complete Setup Guide - OJT Documentation Platform

This guide will walk you through setting up the OJT Documentation Platform on Supabase, GitHub, and Vercel.

---

## 📋 Prerequisites

- A GitHub account (free)
- A Supabase account (free tier available)
- A Vercel account (free tier available)
- Node.js 18+ installed on your computer
- Git installed on your computer

---

## Step 1: Set Up Supabase Database

### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign In"**
3. Click **"New Project"**
4. Fill in the project details:
   - **Name**: `ojt-documentation` (or your preferred name)
   - **Database Password**: Create a strong password (save it securely)
   - **Region**: Choose the closest region to you
   - **Pricing Plan**: Select **Free** (sufficient for this project)
5. Click **"Create new project"**
6. Wait 2-3 minutes for the project to be provisioned

### 1.2 Run Database Migration

1. In your Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Open the file: `supabase/migrations/20251201001222_create_ojt_documentations_table.sql`
4. Copy the entire contents of the file
5. Paste it into the SQL Editor
6. Click **"Run"** (or press `Ctrl+Enter`)
7. You should see: **"Success. No rows returned"**

### 1.3 Enable Realtime

**Note**: In newer Supabase versions, Realtime is often enabled by default. If not, use one of these methods:

**Method 1: Via SQL Editor (Easiest)**
1. Go to **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Run this SQL:
   ```sql
   -- Enable Realtime for ojt_documentations table
   ALTER PUBLICATION supabase_realtime ADD TABLE ojt_documentations;
   ```
4. Click **"Run"**

**Method 2: Via Tables Page**
1. Go to **Database** → **Tables** (left sidebar)
2. Find and click on the `ojt_documentations` table
3. Look for Realtime settings in the table details
4. Enable if there's a toggle

**Method 3: Via Publications**
1. Go to **Database** → **Publications** (left sidebar)
2. Find `supabase_realtime` publication
3. Click on it and add `ojt_documentations` table

This enables live updates when data changes in your app.

### 1.4 Create Storage Bucket

1. Go to **Storage** (left sidebar)
2. Click **"New bucket"**
3. Configure the bucket:
   - **Name**: `ojt-images`
   - **Public bucket**: Toggle **ON** (make it public)
4. Click **"Create bucket"**

### 1.5 Set Up Storage Policies

1. Still in **Storage**, click on the `ojt-images` bucket
2. Go to the **"Policies"** tab
3. Click **"New Policy"** → **"For full customization"**
4. Create 4 policies:

   **Policy 1: Allow authenticated users to read**
   - Policy name: `Allow authenticated users to read`
   - Allowed operation: `SELECT`
   - Policy definition:
     ```sql
     (bucket_id = 'ojt-images'::text) AND (auth.role() = 'authenticated'::text)
     ```

   **Policy 2: Allow authenticated users to upload**
   - Policy name: `Allow authenticated users to upload`
   - Allowed operation: `INSERT`
   - Policy definition:
     ```sql
     (bucket_id = 'ojt-images'::text) AND (auth.role() = 'authenticated'::text)
     ```

   **Policy 3: Allow authenticated users to update**
   - Policy name: `Allow authenticated users to update`
   - Allowed operation: `UPDATE`
   - Policy definition:
     ```sql
     (bucket_id = 'ojt-images'::text) AND (auth.role() = 'authenticated'::text)
     ```

   **Policy 4: Allow authenticated users to delete**
   - Policy name: `Allow authenticated users to delete`
   - Allowed operation: `DELETE`
   - Policy definition:
     ```sql
     (bucket_id = 'ojt-images'::text) AND (auth.role() = 'authenticated'::text)
     ```

### 1.6 Get Your Supabase Credentials

1. Go to **Settings** → **API** (left sidebar)
2. You'll see two important values:
   - **Project URL**: Copy this (looks like `https://xxxxx.supabase.co`)
   - **anon public key**: Copy this (long string starting with `eyJ...`)
3. Save these for later - you'll need them for Vercel

### 1.7 Configure Authentication Settings (Optional but Recommended)

1. Go to **Authentication** → **Settings** (left sidebar)
2. Under **"Email Auth"**:
   - **Enable email confirmations**: Toggle **OFF** (for easier testing)
   - Or keep it **ON** if you want email verification
3. Under **"Auth Providers"**:
   - Make sure **Email** is enabled

---

## Step 2: Set Up GitHub Repository

### 2.1 Create a New Repository

1. Go to [github.com](https://github.com)
2. Click the **"+"** icon (top right) → **"New repository"**
3. Fill in the details:
   - **Repository name**: `ojt-documentation` (or your preferred name)
   - **Description**: "OJT Documentation Platform"
   - **Visibility**: Choose **Public** (free) or **Private**
   - **DO NOT** initialize with README, .gitignore, or license
4. Click **"Create repository"**

### 2.2 Push Your Code to GitHub

1. Open your terminal/command prompt
2. Navigate to your project folder:
   ```bash
   cd "C:\Users\Oscar Jomer\Documents\OJT\OJT Documentation"
   ```

3. Initialize Git (if not already done):
   ```bash
   git init
   ```

4. Add all files:
   ```bash
   git add .
   ```

5. Create your first commit:
   ```bash
   git commit -m "Initial commit: OJT Documentation Platform"
   ```

6. Add your GitHub repository as remote:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/ojt-documentation.git
   ```
   (Replace `YOUR_USERNAME` with your actual GitHub username)

7. Push to GitHub:
   ```bash
   git branch -M main
   git push -u origin main
   ```

8. If prompted, enter your GitHub username and password (or use a Personal Access Token)

### 2.3 Create .env.example File (Optional but Recommended)

Create a file named `.env.example` in your project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

Then add `.env` to `.gitignore` (if not already there) to prevent committing secrets.

---

## Step 3: Deploy to Vercel

### 3.1 Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"** (recommended for easy integration)
4. Authorize Vercel to access your GitHub account

### 3.2 Import Your Project

1. In Vercel dashboard, click **"Add New..."** → **"Project"**
2. You'll see a list of your GitHub repositories
3. Find and click **"Import"** next to your `ojt-documentation` repository
4. Vercel will auto-detect it's a Vite project

### 3.3 Configure Project Settings

1. **Project Name**: Keep default or change it
2. **Framework Preset**: Should be **"Vite"** (auto-detected)
3. **Root Directory**: Leave as `./` (unless your project is in a subfolder)
4. **Build Command**: Should be `npm run build` (auto-filled)
5. **Output Directory**: Should be `dist` (auto-filled)
6. **Install Command**: Should be `npm install` (auto-filled)

### 3.4 Add Environment Variables

**IMPORTANT**: Before deploying, add your Supabase credentials:

1. In the **"Environment Variables"** section, click **"Add"**
2. Add the first variable:
   - **Name**: `VITE_SUPABASE_URL`
   - **Value**: Paste your Supabase Project URL
   - **Environment**: Select all (Production, Preview, Development)
   - Click **"Add"**

3. Add the second variable:
   - **Name**: `VITE_SUPABASE_ANON_KEY`
   - **Value**: Paste your Supabase anon public key
   - **Environment**: Select all (Production, Preview, Development)
   - Click **"Add"**

4. Verify both variables are listed

### 3.5 Deploy

1. Click **"Deploy"** button (bottom of the page)
2. Wait 2-3 minutes for the build to complete
3. You'll see a success message with your deployment URL
4. Your app is now live! 🎉

### 3.6 Access Your Deployed App

1. Click on your project in the Vercel dashboard
2. You'll see your deployment URL (e.g., `ojt-documentation.vercel.app`)
3. Click the URL to open your live application
4. You can also set up a custom domain later if needed

---

## Step 4: Test Your Deployment

### 4.1 Test Registration

1. Open your deployed app URL
2. Click **"Login / Register"**
3. Click **"Sign Up"** (or the registration link)
4. Try registering with:
   - Username: `testuser`
   - Password: `test123456`
5. You should see a success message

### 4.2 Test Login

1. After registration, try logging in with the same credentials
2. You should be redirected to the dashboard

### 4.3 Test Documentation Creation

1. In the dashboard, click **"Add Documentation"**
2. Fill in the form:
   - Title: `Day 1`
   - Date: Select today's date
   - Description: `Test documentation entry`
   - Upload 1-2 test images
3. Click **"Add Documentation"**
4. You should see your entry appear in the dashboard

---

## 🔧 Troubleshooting

### Issue: "Failed to fetch" or Connection Errors

**Solution**: 
- Check that your environment variables are set correctly in Vercel
- Verify your Supabase URL and key are correct
- Make sure there are no extra spaces in the environment variables

### Issue: Images Not Uploading

**Solution**:
- Verify the `ojt-images` bucket exists in Supabase Storage
- Check that storage policies are set up correctly
- Ensure the bucket is set to **Public**

### Issue: Authentication Not Working

**Solution**:
- Check Supabase Authentication settings
- Verify email confirmations are disabled (if you want instant login)
- Check browser console for specific error messages

### Issue: Database Errors

**Solution**:
- Verify the migration SQL was run successfully
- Check that Realtime is enabled for `ojt_documentations` table
- Verify RLS policies are set up correctly

### Issue: Build Fails on Vercel

**Solution**:
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version (should be 18+)

---

## 📝 Next Steps

1. **Custom Domain** (Optional):
   - In Vercel, go to your project → **Settings** → **Domains**
   - Add your custom domain

2. **Monitor Usage**:
   - Check Supabase dashboard for database and storage usage
   - Monitor Vercel bandwidth usage

3. **Update Content**:
   - Make changes to your code
   - Push to GitHub
   - Vercel will automatically redeploy

4. **Backup**:
   - Regularly backup your Supabase database
   - Export data if needed

---

## 🎉 You're All Set!

Your OJT Documentation Platform is now:
- ✅ Database configured (Supabase)
- ✅ Code hosted (GitHub)
- ✅ Live and accessible (Vercel)

Users can now register, log in, and document their OJT journey!

---

## Quick Reference

### Supabase Dashboard
- URL: [app.supabase.com](https://app.supabase.com)
- Find: Project settings, Database, Storage, API keys

### Vercel Dashboard
- URL: [vercel.com/dashboard](https://vercel.com/dashboard)
- Find: Deployments, Environment variables, Domain settings

### GitHub Repository
- URL: `https://github.com/YOUR_USERNAME/ojt-documentation`
- Find: Code, Commits, Issues, Settings

---

**Need Help?** Check the main README.md file for more details about the project structure and features.
