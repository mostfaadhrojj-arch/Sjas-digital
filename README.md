# SJAS Digital — St. John American School Platform

A React + Vite + Tailwind rebuild of the school management demo, split into
a clean, scalable architecture with a bilingual (English / Arabic, full RTL)
interface and a Supabase-ready data layer.

## Getting started

```bash
npm install
npm run dev
```

The app runs entirely on mock data out of the box — no Supabase account
needed to explore every portal.

## Folder structure

```
src/
  components/     Shared UI: Navbar, Sidebar, PortalLayout, ui.jsx (Card,
                  Badge, Table, StatCard…), charts.jsx (SVG sparkline/bar),
                  TimetableView.jsx (shared by teacher + student portals)
  portals/        One folder per audience: public, admin, teacher,
                  student, parent. Each has a <Role>Portal.jsx shell
                  (sidebar + <Outlet/>) and one file per page.
  context/        LanguageContext (EN/AR + RTL), AuthContext (active role)
  data/           translations.js (all copy), mockData.js (all demo rows)
  services/       supabaseClient.js (singleton client),
                  dataService.js (the ONLY place that talks to Supabase
                  or mock data — every screen calls functions from here)
  hooks/          useAsyncData.js — shared fetch/loading/error hook
supabase/
  schema.sql      Full table definitions + RLS starter policies
```

## Design system

The visual direction is "Academic Ledger": deep navy (`#12183B`) and brass
gold (`#C9A227`) on a warm parchment background, a serif display face
(Fraunces / Noto Serif Arabic) paired with Inter / Noto Sans Arabic for
body text, and thin gold accent rules on stat cards — a nod to school
transcripts and ledgers rather than a generic SaaS dashboard look. All
tokens live in `tailwind.config.js` under `theme.extend.colors` /
`fontFamily`, so a rebrand is a one-file change.

## Bilingual / RTL

`useLanguage()` (from `LanguageContext`) exposes `t(key)`, `lang`, `isRTL`,
and `toggleLang()`. Every string in the app is looked up by key from
`src/data/translations.js` — add a key once in both `en` and `ar` and every
component that calls `t('yourKey')` picks it up automatically. Toggling
language also flips `<html dir>` between `ltr`/`rtl`, which combined with
Tailwind's logical-property utilities (`ps-`, `pe-`, `border-s`, `text-start`
used throughout `ui.jsx`) keeps every layout mirroring correctly without
per-component RTL overrides.

## Connecting Supabase

1. Create a Supabase project.
2. In the SQL Editor, run `supabase/schema.sql` — it creates every table
   referenced by `dataService.js`, plus indexes and starter Row Level
   Security policies (commented out; uncomment and adjust once Auth is wired
   up).
3. Copy `.env.example` to `.env` and fill in your project URL and anon key:
   ```
   VITE_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
   VITE_SUPABASE_ANON_KEY=YOUR-ANON-PUBLIC-KEY
   ```
4. Restart `npm run dev`. `src/services/supabaseClient.js` will detect the
   env vars and `dataService.js` will start querying Supabase directly —
   falling back to mock data automatically if a table is empty or a query
   errors, so you can migrate table-by-table without breaking the app.
5. Wire up real authentication by replacing the `signIn`/`signOut` stubs in
   `src/context/AuthContext.jsx` with `supabase.auth.signInWithPassword`
   flows, and deriving `role` from each user's `profiles.role` column
   instead of the demo's manual role switcher in the navbar.

## Adding a new page

1. Add any new copy to both `en` and `ar` in `src/data/translations.js`.
2. Add a `get...()` function to `src/services/dataService.js` if the page
   needs data (mirror an existing one — it already has the Supabase query
   written).
3. Create the page component under the right `src/portals/<role>/` folder,
   using `useAsyncData` + the shared `ui.jsx` primitives.
4. Register the route in `src/App.jsx` and add a sidebar entry in the
   role's `<Role>Portal.jsx`.
