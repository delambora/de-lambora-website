# De Lambora — full website code

This is a real, working online store: product pages, accounts (sign up / sign in),
a cart, an address form, and real payments through Razorpay. Nothing here needs
you to write code — but three accounts need to be created and a handful of keys
pasted in. Follow this in order; it takes about 20–30 minutes the first time.

## What this is built with
- **Next.js** — the website itself (pages, cart, checkout)
- **Supabase** — free database + account system (this is where products and orders live)
- **Razorpay** — payment processing (UPI, cards, netbanking)
- **Vercel** — free hosting to put the site live on the internet

---

## 1. Create your Supabase project (database + accounts)

1. Go to supabase.com → sign up → "New project".
2. Pick any project name (e.g. "de-lambora") and a strong database password (save it somewhere).
3. Once the project is ready, go to **SQL Editor** → **New query**.
4. Open the file `supabase/schema.sql` from this project, copy everything, paste it into the SQL editor, and click **Run**.
   This creates your products/orders tables and adds 4 sample products so the site isn't empty.
5. Go to **Project Settings → API**. You'll need three values from this page in step 4 below:
   - `Project URL`
   - `anon public` key
   - `service_role` key (keep this one secret — never share it)
6. Go to **Authentication → Providers** and confirm "Email" is enabled (it is by default).
7. Go to **Authentication → URL Configuration** and, once you have your live website address (step 6 below), add it there so login redirects work correctly.

**To add your real products later:** Supabase → Table Editor → `products` → insert a row, or edit the sample ones. `colors` and `sizes` are JSON — copy the format already in the sample rows.

## 2. Create your Razorpay account (payments)

1. Go to razorpay.com → sign up as a business.
2. You'll need basic business details and a bank account to receive payouts — Razorpay will guide you through their verification (KYC). This can take a day or two to fully approve; you can test everything before that finishes using their **Test mode**.
3. Once in the dashboard, toggle to **Test mode** first (top right), go to **Settings → API Keys → Generate Test Key**. Copy the `Key Id` and `Key Secret`.
4. When you're ready to accept real payments, repeat this in **Live mode** after KYC is approved, and swap the test keys for live ones.

## 3. Fill in your keys

1. In this project, duplicate the file `.env.local.example` and rename the copy to `.env.local`.
2. Fill in every value:

```
NEXT_PUBLIC_SUPABASE_URL=          <- Project URL from Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=     <- anon public key from Supabase
SUPABASE_SERVICE_ROLE_KEY=         <- service_role key from Supabase

NEXT_PUBLIC_RAZORPAY_KEY_ID=       <- same as RAZORPAY_KEY_ID below
RAZORPAY_KEY_ID=                   <- Key Id from Razorpay
RAZORPAY_KEY_SECRET=               <- Key Secret from Razorpay
```

## 4. Run it locally to check it works (optional but recommended)

If someone on your team can open a terminal:
```
npm install
npm run dev
```
Then open `http://localhost:3000`. Try: browse a product → add to bag → create an account → checkout with a Razorpay **test card** (Razorpay's docs list test card numbers while you're in Test mode, so no real money moves).

## 5. Put it live on the internet (Vercel)

1. Create a free account at vercel.com (sign in with GitHub is easiest).
2. Put this project's code in a GitHub repository (drag-and-drop upload works fine on GitHub's website — you don't need git commands).
3. In Vercel: **Add New → Project → Import** your repository.
4. Before clicking Deploy, open **Environment Variables** and paste in the same 6 values from your `.env.local` file.
5. Click **Deploy**. In about a minute you'll get a live address like `de-lambora.vercel.app`.
6. Later, connect your own domain (e.g. delambora.com) under **Project → Settings → Domains** — Vercel walks you through pointing your domain's DNS at it.

## Going live for real payments

- Switch Razorpay to **Live mode** once KYC is approved, and update the 3 Razorpay keys in Vercel's Environment Variables with your live keys.
- Add your live site URL to Supabase's **Authentication → URL Configuration** so sign-up/login redirects work correctly.

## What's included vs. what you'll want to add next

**Included:** product browsing, product detail with color/size, cart, accounts (sign up/in/out), address form, real Razorpay payment, order history under Account.

**Not included yet (natural next steps):**
- An admin screen for adding products — for now, add them directly in Supabase's Table Editor.
- Order status emails (e.g. "Your order shipped") — Supabase and Razorpay both support this via webhooks/email providers, happy to add when you're ready.
- Real product photography in place of the line-art placeholders — swap `image_bg` for real image URLs once you have photos (ask me and I'll wire up image support).
