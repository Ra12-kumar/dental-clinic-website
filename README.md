# Dr. Kalvinder Dental Care

Responsive React (Vite) website for a dental clinic in Hisar, Haryana.

## Run locally

```sh
npm install
npm run dev       # development server
npm run build     # production build in dist/ (pages are prerendered)
npm run preview   # preview the production build
```

## Editing clinic details

Almost everything is in `src/config/clinic.js`:

| Setting | What it controls |
|---|---|
| `siteUrl` | Canonical URLs, social previews, `sitemap.xml`. **Set before going live.** |
| `phone`, `whatsapp`, `email` | All call, WhatsApp and email links |
| `address`, `postalCode`, `mapEmbedUrl` | Contact details, Google Map, structured data |
| `hours` | Clinic timings |
| `qualifications`, `registration`, `specialists` | Doctor profiles |
| `social` | Instagram and Facebook follow buttons (https links only) |
| `prices` | Fee table and service pages |
| `testimonials`, `beforeAfter`, `facilities` | Those sections |
| `clinicPhotos` | Replaces stock imagery in the hero, about section and gallery |
| `instagramPosts` | Instagram gallery (added manually; there is no automatic feed) |

Put real photos in `public/images/` and refer to them as `/images/name.jpg`. Compress them first (about 1600px wide).

Services are listed in `src/data/services.js`; articles and FAQs in `src/data/content.js`.

## Booking

The form validates input and opens WhatsApp with a prefilled message. The patient must press send. Nothing is stored and no appointment is confirmed automatically.

## Deploying

Upload `dist/`. Configure the host to:

- serve `folder/index.html` for clean URLs such as `/services` (most static hosts do),
- use `404.html` for unknown paths.

After deploying, check that "view source" on `/services` shows the services page title, then submit `sitemap.xml` in Google Search Console and set up a Google Business Profile.

## Before publishing

- Have the dentist review all treatment and article text.
- Publish testimonials and patient photos only with written consent, and check current Dental Council of India rules on dental advertising first.
- Stock photos (Unsplash) are illustrative and labelled as such. Replace them with real clinic photos.

## Backup

`_backup-original/` holds the site as it was before the redesign. Delete it once you are happy.
