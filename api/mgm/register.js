const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

async function supabaseQuery(path, options = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': options.prefer || '',
      ...options.headers,
    },
    method: options.method || 'GET',
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const text = await res.text();
  return { status: res.status, data: text ? JSON.parse(text) : null };
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, nome } = req.body || {};
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email é obrigatório' });
  }

  const normalizedEmail = email.trim().toLowerCase();

  // Check if email already exists
  const existing = await supabaseQuery(
    `mgm_referrals_hdo?email=eq.${encodeURIComponent(normalizedEmail)}&select=code&limit=1`
  );
  if (existing.data && existing.data.length > 0) {
    return res.status(200).json({ code: existing.data[0].code, isNew: false });
  }

  // Generate unique code with retry
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = generateCode();
    const insert = await supabaseQuery('mgm_referrals_hdo', {
      method: 'POST',
      prefer: 'return=representation',
      body: { email: normalizedEmail, code, nome: nome || null },
    });

    if (insert.status >= 200 && insert.status < 300) {
      // Dispara mensagem via UniChat (não bloqueia)
      const UNICHAT_START_URL = 'https://unnichat.com.br/a/start/arwIEGQQ052zz4lfB7Cy';
      fetch(UNICHAT_START_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail, nome: nome || '', code }),
      }).catch(err => console.error('[UniChat Error]', err.message));

      return res.status(201).json({ code, isNew: true });
    }

    // Code collision → retry
    if (insert.status === 409) continue;
  }

  return res.status(500).json({ error: 'Não foi possível gerar um código único' });
};
