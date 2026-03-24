import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: 'Missing SUPABASE env vars' });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const {
    email,
    phone,
    name,
    source,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    utm_term,
    fbclid,
    gclid,
    page_url,
  } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const { error } = await supabase.from('asl0226_checkout').insert({
    evento: 'AHDO-0326',
    email,
    phone: phone || null,
    name: name || null,
    source: source || null,
    utm_source: utm_source || null,
    utm_medium: utm_medium || null,
    utm_campaign: utm_campaign || null,
    utm_content: utm_content || null,
    utm_term: utm_term || null,
    fbclid: fbclid || null,
    gclid: gclid || null,
    page_url: page_url || null,
  });

  if (error) {
    console.error('Supabase insert error:', error);
    return res.status(500).json({ error: 'Database insert failed' });
  }

  return res.status(200).json({ success: true });
}
