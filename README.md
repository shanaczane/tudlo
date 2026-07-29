# Tudlo

Offline-first PWA that helps Filipino public school teachers track their
exact curriculum position per class and recover with a catch-up plan after
disruptions. Built for SDG 4 (Quality Education).

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

**Note:** this build runs on local mock data and `localStorage`, not a live
database. `supabase/schema.sql` and `src/lib/supabase/` exist but are not
yet wired to any queries.

## AI usage disclosure

Claude (Anthropic's Claude Code) was used as a pair-programming/development
assistant to implement UI, state, and configuration under our direction and
review. The product concept, problem, and scope were defined by our team;
no part of this submission is a pre-built third-party app.

## Third-party credits

- Map tiles © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors
- UN SDG badge colors are the official UN SDG palette
- Open-source libraries (Next.js, React, Tailwind CSS, Leaflet/react-leaflet, Serwist, Supabase JS) per `package.json`, MIT-licensed
