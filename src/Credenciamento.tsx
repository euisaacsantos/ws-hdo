import React, { useState, useEffect } from 'react';
import { Lock, Unlock } from 'lucide-react';
import PhoneInput, { getPhoneDigits, getMinDigits } from './components/PhoneInput';

const REDIRECT_URL = 'https://LINK-DO-EVENTO-AO-VIVO';
const AC_FORM_URL = 'https://SEU-ACTIVEHOSTED.activehosted.com/proc.php?jsonp=true';
const LEAD_TTL_MS = 3 * 24 * 60 * 60 * 1000;

// ── Helpers ──

function getLeadData(): { email: string; phone: string } | null {
  try {
    const raw = localStorage.getItem('lead_data');
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (Date.now() - data.ts > LEAD_TTL_MS) {
      localStorage.removeItem('lead_data');
      return null;
    }
    return { email: data.email, phone: data.phone };
  } catch {
    return null;
  }
}

function saveLeadData(email: string, phone: string) {
  localStorage.setItem('lead_data', JSON.stringify({ email, phone, ts: Date.now() }));
}

function getUtmParams(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'];
  const result: Record<string, string> = {};
  keys.forEach((k) => {
    const v = params.get(k);
    if (v) result[k] = v;
  });
  return result;
}

function sendToAC(email: string, phone: string) {
  const utms = getUtmParams();
  const form = new URLSearchParams();
  form.append('email', email);
  form.append('phone', phone);
  if (utms.utm_source) form.append('field[2]', utms.utm_source);
  if (utms.utm_medium) form.append('field[3]', utms.utm_medium);
  if (utms.utm_campaign) form.append('field[4]', utms.utm_campaign);
  if (utms.utm_term) form.append('field[5]', utms.utm_term);
  if (utms.utm_content) form.append('field[6]', utms.utm_content);

  fetch(AC_FORM_URL, {
    method: 'POST',
    mode: 'no-cors',
    body: form,
  }).catch(() => {});
}

function sendToAPI(email: string, phone: string) {
  const utms = getUtmParams();
  const payload = JSON.stringify({ email, phone, ...utms });
  const blob = new Blob([payload], { type: 'application/json' });

  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/credenciamento', blob);
  } else {
    fetch('/api/credenciamento', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  }
}

function trackEvent(eventName: string) {
  if (window.fbq) {
    window.fbq('track', eventName);
  }
}

// ── Component ──

export default function Credenciamento() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+55');
  const [loading, setLoading] = useState(false);
  const [autoRedirecting, setAutoRedirecting] = useState(false);

  useEffect(() => {
    const lead = getLeadData();
    if (lead) {
      setAutoRedirecting(true);
      sendToAPI(lead.email, lead.phone);
      sendToAC(lead.email, lead.phone);
      trackEvent('Lead');
      window.location.href = REDIRECT_URL;
    }
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const digits = getPhoneDigits(phone);
    const minDigits = getMinDigits(phone);
    if (digits.length < minDigits) return;
    if (!email.includes('@')) return;

    setLoading(true);
    sendToAPI(email, phone);
    sendToAC(email, phone);
    trackEvent('Lead');
    saveLeadData(email, phone);
    window.location.href = REDIRECT_URL;
  }

  if (autoRedirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-white text-lg animate-pulse">Redirecionando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-4 py-8">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/BG1 MOBILE.png')" }}
      />
      <div
        className="absolute inset-0 hidden md:block bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/BG1 DESKTOP.png')" }}
      />
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

      {/* Logo */}
      <img
        src="/assets/LOGO HDO BRANCO.svg"
        alt="Logo"
        className="relative z-10 h-10 md:h-14 w-auto mb-8"
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl px-6 py-8 md:px-8 md:py-10">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center mb-4">
            <Lock className="w-5 h-5 text-brand-gold" />
          </div>
          <h1 className="font-serif text-[22px] lg:text-[26px] text-gray-900 text-center leading-tight">
            Preencha abaixo para<br />entrar no <span className="text-brand-gold">evento ao vivo</span>
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-600 mb-1.5 font-sans">
              Seu melhor e-mail
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@email.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-brand-gold transition-colors placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1.5 font-sans">
              Seu WhatsApp
            </label>
            <PhoneInput value={phone} onChange={setPhone} />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-gold text-white px-6 py-4 rounded-xl font-bold text-base hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 shadow-xl shadow-brand-gold/25 animate-pulse-gold flex items-center justify-center gap-2 uppercase tracking-wider disabled:opacity-70"
          >
            <Unlock className="w-5 h-5" />
            {loading ? 'Entrando...' : 'Desbloquear aula ao vivo'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-4 font-sans">
          Seus dados estao seguros e nao serao compartilhados.
        </p>
      </div>
    </div>
  );
}
