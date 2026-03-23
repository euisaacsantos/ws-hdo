import { createClient } from '@supabase/supabase-js';

function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: 'Missing SUPABASE env vars' });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { email, nome, phone } = req.body || {};
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email é obrigatório' });
  }

  const normalizedEmail = email.trim().toLowerCase();

  // Check if email already exists
  const { data: existing } = await supabase
    .from('mgm_referrals_hdo')
    .select('code')
    .eq('email', normalizedEmail)
    .single();

  if (existing) {
    return res.status(200).json({ code: existing.code, isNew: false });
  }

  // Generate unique code with retry
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = generateCode();
    const { error } = await supabase
      .from('mgm_referrals_hdo')
      .insert({ email: normalizedEmail, code, nome: nome || null, phone: phone || null });

    if (!error) {
      // Disparar UniChat (não bloqueia)
      fetch('https://unnichat.com.br/a/start/arwIEGQQ052zz4lfB7Cy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail, nome: nome || '', phone: phone || '', code }),
      }).catch(err => console.error('[UniChat Error]', err.message));

      return res.status(201).json({ code, isNew: true });
    }

    // Code collision → retry
    if (error.code === '23505' && error.message?.includes('code')) continue;

    // Email duplicate (race condition)
    if (error.code === '23505' && error.message?.includes('email')) {
      const { data } = await supabase
        .from('mgm_referrals_hdo')
        .select('code')
        .eq('email', normalizedEmail)
        .single();
      return res.status(200).json({ code: data?.code, isNew: false });
    }

    return res.status(500).json({ error: 'Erro ao registrar' });
  }

  return res.status(500).json({ error: 'Não foi possível gerar um código único' });
}
