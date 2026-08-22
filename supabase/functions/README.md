# WhatsApp reminders — setup

This Edge Function sends a WhatsApp message via Twilio when the admin
clicks "Send Reminder" on an unpaid fee row (Admin → Fees).

## 1. Get a Twilio account + WhatsApp Sandbox

1. Sign up at https://www.twilio.com (free trial includes credit).
2. In the Twilio Console, go to **Messaging → Try it out → Send a WhatsApp message**.
3. This gives you a **Sandbox number** (usually `+1 415 523 8886`) and a
   join code like `join some-word`.
4. From your own WhatsApp, send that join code to the sandbox number once
   — this links your number for testing. Each parent you want to test
   with needs to do this too, until you move to a production number.
5. From the Console, copy your **Account SID** and **Auth Token**
   (Account SID is not secret; **Auth Token is secret — never share it
   or commit it to a public repo**).

## 2. Install the Supabase CLI (one-time)

```bash
npm install -g supabase
supabase login
```

## 3. Link this project to your Supabase project

From the `sjas-digital` folder:

```bash
supabase link --project-ref YOUR_PROJECT_REF
```

`YOUR_PROJECT_REF` is the same ID you saw in your Supabase dashboard URL
(e.g. `joznoynaomjmgpdlxbtv`).

## 4. Set the secrets (server-side only — never in `.env`, never committed)

```bash
supabase secrets set TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
supabase secrets set TWILIO_AUTH_TOKEN=your_auth_token_here
supabase secrets set TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
```

## 5. Deploy the function

```bash
supabase functions deploy send-whatsapp-reminder
```

## 6. Test it

Once deployed, go to Admin → Fees in the app and click "Send Reminder"
on any unpaid row for a student whose `parent_phone` is set (see
`patch_004_add_parent_phone.sql`) and who has joined your sandbox.

## Moving to production later

When you're ready to message parents without the "join code" step,
apply for a WhatsApp Business Account number (through Twilio, inside
the same Console) — Meta reviews it and approves message templates.
No code changes are needed here; you just update the
`TWILIO_WHATSAPP_FROM` secret to your approved number.
