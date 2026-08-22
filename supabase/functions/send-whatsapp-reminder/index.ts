// Supabase Edge Function: send-whatsapp-reminder
//
// Sends a WhatsApp message via Twilio's WhatsApp API. Twilio credentials
// stay server-side (set as Edge Function secrets) — the browser never sees
// them. Deploy with:
//   supabase functions deploy send-whatsapp-reminder
// After setting secrets (see supabase/functions/README.md in this folder).

import { serve } from 'https://deno.land/std@0.203.0/http/server.ts'

const TWILIO_ACCOUNT_SID = Deno.env.get('TWILIO_ACCOUNT_SID')
const TWILIO_AUTH_TOKEN = Deno.env.get('TWILIO_AUTH_TOKEN')
// e.g. 'whatsapp:+14155238886' — Twilio sandbox number, or your approved
// production WhatsApp Business number once you're past the sandbox.
const TWILIO_WHATSAPP_FROM = Deno.env.get('TWILIO_WHATSAPP_FROM')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_WHATSAPP_FROM) {
      throw new Error('Twilio secrets are not configured on this Edge Function yet.')
    }

    const { phone, message } = await req.json()
    if (!phone || !message) {
      throw new Error('Both "phone" and "message" are required.')
    }

    // Twilio expects E.164 phone numbers prefixed with "whatsapp:", e.g.
    // "whatsapp:+201000000001". Accept either a bare number or one the
    // caller already prefixed.
    const toNumber = phone.startsWith('whatsapp:') ? phone : `whatsapp:${phone}`

    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`
    const body = new URLSearchParams({
      From: TWILIO_WHATSAPP_FROM,
      To: toNumber,
      Body: message,
    })

    const resp = await fetch(twilioUrl, {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })

    const result = await resp.json()

    if (!resp.ok) {
      // Twilio's error payload includes a human-readable "message" field.
      throw new Error(result.message || 'Twilio rejected the request.')
    }

    return new Response(JSON.stringify({ success: true, sid: result.sid }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
