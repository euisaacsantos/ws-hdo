import { createClient } from '@supabase/supabase-js';

const UNICHAT_START_URL = 'https://unnichat.com.br/a/start/T6NMAoiGkUyhN3tj50Er';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: 'Missing SUPABASE env vars' });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { nome, email, phone, page_url } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Email é obrigatório' });
  }

  const { error } = await supabase.from('asl0226_hdo_leads').insert({
    evento: 'AHDO-0326',
    nome: nome || null,
    email,
    phone: phone || null,
    page_url: page_url || null,
  });

  if (error) {
    console.error('Supabase insert error:', error);
  }

  // Disparar UniChat (não bloqueia)
  fetch(UNICHAT_START_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome: nome || '', email: email.trim().toLowerCase(), phone: phone || '' }),
  }).catch(err => console.error('[UniChat Lead Error]', err.message));

  return res.status(200).json({ success: true });
}
