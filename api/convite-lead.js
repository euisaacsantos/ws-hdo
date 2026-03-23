const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;
const UNICHAT_START_URL = 'https://unnichat.com.br/a/start/T6NMAoiGkUyhN3tj50Er';

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { nome, email, phone, ref_code, utm_source, utm_medium, utm_term } = req.body || {};

    if (!email) return res.status(400).json({ error: 'Email é obrigatório' });

    // 1. Salvar no Supabase
    let supabaseResult = { success: false };
    if (SUPABASE_URL && SUPABASE_KEY) {
        try {
            const resp = await fetch(`${SUPABASE_URL}/rest/v1/hdo_convite_leads`, {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=minimal',
                },
                body: JSON.stringify({
                    nome: nome || null,
                    email: email.trim().toLowerCase(),
                    phone: phone || null,
                    ref_code: ref_code || null,
                    utm_source: utm_source || null,
                    utm_medium: utm_medium || null,
                    utm_term: utm_term || null,
                }),
            });
            supabaseResult = { success: resp.status >= 200 && resp.status < 300, status: resp.status };
            console.log('[Convite Lead] Supabase:', resp.status, email);
        } catch (err) {
            console.error('[Convite Lead Supabase Error]', err.message);
            supabaseResult = { success: false, error: err.message };
        }
    }

    // 2. Disparar UniChat (não bloqueia)
    fetch(UNICHAT_START_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nome || '', email: email.trim().toLowerCase(), phone: phone || '' }),
    }).catch(err => console.error('[UniChat Convite Error]', err.message));

    return res.status(200).json({ success: true, supabase: supabaseResult });
};
