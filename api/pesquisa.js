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
    faixa_etaria,
    genero,
    trabalho,
    renda,
    desafio,
    objetivo,
    experiencia,
    email,
    phone,
  } = req.body;

  const { error } = await supabase.from('asl0226_hdo_pesquisa').insert({
    evento: 'AHDO-0326',
    faixa_etaria: faixa_etaria || null,
    genero: genero || null,
    trabalho: trabalho || null,
    renda: renda || null,
    desafio: desafio || null,
    objetivo: objetivo || null,
    experiencia: experiencia || null,
    email: email || null,
    phone: phone || null,
  });

  if (error) {
    console.error('Supabase insert error:', error);
    return res.status(500).json({ error: 'Database insert failed' });
  }

  return res.status(200).json({ success: true });
}
