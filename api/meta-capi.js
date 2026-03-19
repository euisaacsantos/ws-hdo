import { createHash } from 'crypto';

function sha256(value) {
  if (!value) return null;
  return createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    return res.status(500).json({ error: 'Missing META env vars' });
  }

  const { event_name, event_id, event_source_url, user_data_client, custom_data } = req.body;

  const ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || '';
  const ua = req.headers['user-agent'] || '';
  const city = req.headers['x-vercel-ip-city'] || '';
  const region = req.headers['x-vercel-ip-country-region'] || '';
  const country = req.headers['x-vercel-ip-country'] || '';

  const userData = {
    client_ip_address: ip,
    client_user_agent: ua,
    ...(user_data_client?.fbp && { fbp: user_data_client.fbp }),
    ...(user_data_client?.fbc && { fbc: user_data_client.fbc }),
    ...(city && { ct: [sha256(city)] }),
    ...(region && { st: [sha256(region)] }),
    ...(country && { country: [sha256(country)] }),
  };

  const payload = {
    data: [
      {
        event_name,
        event_time: Math.floor(Date.now() / 1000),
        event_id,
        event_source_url,
        action_source: 'website',
        user_data: userData,
        ...(custom_data && { custom_data }),
      },
    ],
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );
    const result = await response.json();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: 'CAPI request failed' });
  }
}
