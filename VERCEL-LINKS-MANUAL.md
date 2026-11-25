# Manual: Deploy on Vercel and add Facebook and WhatsApp links

**Important:** the links are saved inside the website files, not in the Vercel dashboard.
To add or change a link after deploying, edit one file and deploy again.

The only file you need to edit is `src/config/clinic.js`.

---

## Part 1: Deploy the first time

Open a terminal in the project folder and run:

```sh
npx vercel
```

1. Say yes if asked to install the Vercel tool, then log in.
2. Accept the suggested settings. If asked, they should be:
   - Framework: **Vite**
   - Build Command: **npm run build**
   - Output Directory: **dist**
3. This creates a preview. To publish the live website, run:

```sh
npx vercel --prod
```

Copy the live address it shows.

---

## Part 2: Add the Facebook link

1. Open your clinic's Facebook **page** and copy its address from the browser.
2. Open `src/config/clinic.js` and find:

```js
  social: {
    instagram: "", // https://www.instagram.com/your_profile
    facebook: "", // https://www.facebook.com/your_page
  },
```

3. Paste the address between the quotes after `facebook:`

```js
    facebook: "https://www.facebook.com/YourClinicPage",
```

Rules:
- The link must start with `https://`, otherwise the button stays hidden.
- Keep the quotes and the comma.

Result: a **Follow us on Facebook** button and a footer icon appear.

### Add the Instagram link

1. Open your clinic's Instagram profile and copy its address.
2. In the same `social:` block, paste it after `instagram:`

```js
    instagram: "https://www.instagram.com/your_clinic",
```

Use the full address starting with `https://`, not just `@your_clinic`.

Result: a **Follow us on Instagram** button and a footer icon appear.

### Show Instagram posts (optional)

Posts do not load automatically from Instagram. To feature some:

1. Create the folder `public/images` and put your pictures in it, for example `post1.jpg`.
2. In `clinic.js`, find `export const instagramPosts = [];` and replace it with:

```js
export const instagramPosts = [
  { image: "/images/post1.jpg", url: "https://www.instagram.com/p/POST_ID/", caption: "Short description" },
];
```

3. Add one line inside the brackets for each post. Four posts fill one row on a computer.

Only use pictures of patients if you have their written permission.

---

## Part 3: Add or change the WhatsApp number

You enter a **number**, not a link. The website builds the WhatsApp links itself.

In the same file, find:

```js
  phone: "7988351175",
  phoneCountryCode: "91",
  whatsapp: "917988351175",
```

| Line | What to type |
|---|---|
| `whatsapp` | Country code and number, digits only. No `+`, spaces or dashes. |
| `phone` | The number for calls, without the country code. |
| `phoneCountryCode` | `91` for India. |

Example for the number +91 98765 43210:

```js
  phone: "9876543210",
  phoneCountryCode: "91",
  whatsapp: "919876543210",
```

This updates every WhatsApp button, including the floating button, service enquiries and the booking form.

A WhatsApp group or channel link cannot be used here.

---

## Part 4: Add your website address

After the first live deploy, in the same file:

```js
  siteUrl: "https://your-project.vercel.app",
```

Use your own domain instead if you have one. Do not add `/` at the end.
This lets Google read your sitemap.

---

## Part 5: Publish the change

1. Save the file.
2. Check it on your computer:

```sh
npm run dev
```

3. Publish:

```sh
npx vercel --prod
```

### If you connected Vercel to GitHub instead

Vercel deploys automatically when you push a change. You can also edit
`src/config/clinic.js` on the GitHub website (pencil icon, then **Commit changes**).

Before the first upload to GitHub, create a file named `.gitignore` in the project folder containing:

```
node_modules
dist
dist-ssr
_backup-original
```

---

## Part 6: Check the live website

- [ ] The Facebook button opens the correct page.
- [ ] The floating WhatsApp button opens a chat with the correct number.
- [ ] Send one test booking from the form and confirm the clinic receives it.
- [ ] Opening `your-address/services` directly shows the services page.

## If something is wrong

| Problem | Fix |
|---|---|
| Facebook button is missing | Check the link starts with `https://`, then deploy again. |
| WhatsApp says the number is invalid | Use digits only, with the country code. |
| Old link still shows | Run `npx vercel --prod` again and press Ctrl+F5. |
| Build failed | A quote or comma is probably missing in `clinic.js`. |
