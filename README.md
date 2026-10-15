# Creed 360 — Website & Admin Dashboard

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4

## Run it

```bash
npm install
cp .env.example .env.local   # then set ADMIN_PASSWORD and ADMIN_SECRET
npm run dev                  # http://localhost:3000
```

Admin dashboard: **http://localhost:3000/admin** (sign in with `ADMIN_PASSWORD`).

## Pages

| Route | What it is |
|---|---|
| `/` | Home — every section from the website copy (hero → footer) |
| `/properties` | Listings with search, type filter, "verified only" and sort |
| `/properties/[id]` | Property detail with photos and its 6-step verification record |
| `/services` | The six services, How We Verify, surveying, FAQ |
| `/palmora-roots` | Palmora Roots estate and its three packages |
| `/book-verification` | Book a Verification / Talk to an Advisor form (accepts documents) |
| `/admin` | Overview: counts, latest requests, listings awaiting verification |
| `/admin/properties` | Upload, edit, publish/hide, feature and delete listings |
| `/admin/verifications` | Client requests: work through the 6 steps, record findings, set status |

## Folder map

```
src/
  app/
    (site)/            public pages — share the Navbar + Footer layout
    admin/login/       login page
    admin/(dashboard)/ protected admin pages (layout checks the session)
    actions/           Server Actions: public.ts (booking form), admin.ts (everything admin)
    api/uploads/       serves uploaded photos; client documents are admin-only
  components/          Navbar, Footer, sections, PropertyCard, BookingForm, admin/*
  lib/
    site.ts            ALL website copy — edit text here
    types.ts           data shapes + the six verification steps
    db.ts              JSON-file storage + file uploads
    auth.ts            single-password admin session
data/                  properties.json, verifications.json
storage/uploads/       uploaded files
```

## How verification works

- **Listings** carry a checklist of the six "How We Verify" steps (Property, Location,
  Documentation, Survey, Advisory, Decision). The public **VERIFIED** badge only shows when the
  status is *Verified* — and the admin won't allow that until all six steps are ticked.
- **Client requests** from `/book-verification` get a reference (e.g. `C360-VR-0001`). In the
  admin you tick steps as they're done, write findings, and move the status
  New → In progress → Awaiting client → Completed.

## Before going live

1. Delete the three **sample listings** in `/admin/properties`.
2. Set a strong `ADMIN_PASSWORD` and a long random `ADMIN_SECRET`.
3. **Hosting:** data is stored in JSON files on disk. That works on a VPS / Render / Railway
   with a persistent disk, but **not on Vercel** (read-only file system). To deploy on Vercel,
   replace the functions in `src/lib/db.ts` with a database (e.g. Supabase) — no other file
   needs to change.
