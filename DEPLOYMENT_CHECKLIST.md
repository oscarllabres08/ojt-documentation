# Deployment Checklist

Quick checklist for deploying the OJT Documentation Platform.

## ✅ Supabase Setup

- [ ] Created Supabase project
- [ ] Ran database migration SQL
- [ ] Enabled Realtime for `ojt_documentations` table
- [ ] Created `ojt-images` storage bucket (public)
- [ ] Set up 4 storage policies (SELECT, INSERT, UPDATE, DELETE)
- [ ] Copied Project URL and anon key

## ✅ GitHub Setup

- [ ] Created GitHub repository
- [ ] Initialized Git in project folder
- [ ] Committed all files
- [ ] Pushed code to GitHub
- [ ] Created `.env.example` file (optional)

## ✅ Vercel Setup

- [ ] Created Vercel account (via GitHub)
- [ ] Imported GitHub repository
- [ ] Added environment variable: `VITE_SUPABASE_URL`
- [ ] Added environment variable: `VITE_SUPABASE_ANON_KEY`
- [ ] Deployed project
- [ ] Tested deployed app

## ✅ Testing

- [ ] Registration works
- [ ] Login works
- [ ] Can create documentation entry
- [ ] Can upload images
- [ ] Can edit documentation
- [ ] Can delete documentation
- [ ] Images display correctly

## 📝 Environment Variables Needed

```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

**Full instructions**: See [SETUP_GUIDE.md](./SETUP_GUIDE.md)
