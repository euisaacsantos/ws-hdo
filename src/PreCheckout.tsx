import React, { useState, useEffect } from 'react';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import PhoneInput, { getPhoneDigits, getMinDigits } from './components/PhoneInput';

const HOTMART_BASE_URL = 'https://pay.hotmart.com/Y104988994A?off=tujyxow2&checkoutMode=10';
const LEAD_TTL_MS = 3 * 24 * 60 * 60 * 1000;

// ── Helpers ──

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

function getLeadData(): { name: string; email: string; phone: string } | null {
  try {
    const raw = localStorage.getItem('checkout_lead_data');
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (Date.now() - data.ts > LEAD_TTL_MS) {
      localStorage.removeItem('checkout_lead_data');
      return null;
    }
    return { name: data.name, email: data.email, phone: data.phone };
  } catch {
    return null;
  }
}

function saveLeadData(name: string, email: string, phone: string) {
  localStorage.setItem('checkout_lead_data', JSON.stringify({ name, email, phone, ts: Date.now() }));
}

function sendToAPI(data: { name: string; email: string; phone: string }, source: 'form' | 'localStorage') {
  const utms = getUtmParams();
  fetch('/api/cpl-checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, source, ...utms }),
    keepalive: true,
  }).catch(() => {});
}

function trackEvent(eventName: string) {
  if (window.fbq) {
    window.fbq('track', eventName);
  }
}

function buildHotmartUrl(data: { name: string; email: string; phone: string }): string {
  const url = new URL(HOTMART_BASE_URL);
  url.searchParams.set('email', data.email);
  url.searchParams.set('name', data.name);

  const phoneDigits = getPhoneDigits(data.phone);
  if (data.phone.startsWith('+55') && phoneDigits.length >= 12) {
    const national = phoneDigits.slice(2);
    url.searchParams.set('phoneac', national.slice(0, 2));
    url.searchParams.set('phonenumber', national.slice(2));
  } else {
    url.searchParams.set('phonenumber', phoneDigits);
  }

  const utms = getUtmParams();
  const sckParts = [utms.utm_source, utms.utm_medium, utms.utm_campaign, utms.utm_content, utms.utm_term]
    .filter(Boolean)
    .join('|');
  if (sckParts) {
    url.searchParams.set('sck', sckParts);
  }

  return url.toString();
}

// ── Component ──

export default function PreCheckout() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+55');
  const [loading, setLoading] = useState(false);
  const [autoRedirecting, setAutoRedirecting] = useState(false);

  useEffect(() => {
    const lead = getLeadData();
    if (lead) {
      setAutoRedirecting(true);
      sendToAPI(lead, 'localStorage');
      trackEvent('AddToCart');
      window.location.href = buildHotmartUrl(lead);
    }
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) return;
    if (!email.includes('@')) return;
    const digits = getPhoneDigits(phone);
    const minDigits = getMinDigits(phone);
    if (digits.length < minDigits) return;

    setLoading(true);
    const data = { name: name.trim(), email, phone };
    sendToAPI(data, 'form');
    trackEvent('AddToCart');
    saveLeadData(data.name, data.email, data.phone);
    window.location.href = buildHotmartUrl(data);
  }

  if (autoRedirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-white text-lg animate-pulse">Redirecionando para pagamento...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-4 py-8">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/BG1 MOBILE.webp')" }}
      />
      <div
        className="absolute inset-0 hidden md:block bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/BG1 DESKTOP.webp')" }}
      />
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

      {/* Logo */}
      <img
        src="/assets/LOGO HDO BRANCO.svg"
        alt="Logo"
        className="relative z-10 h-10 md:h-14 w-auto mb-8"
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white backdrop-blur-xl rounded-3xl shadow-2xl px-6 py-8 md:px-8 md:py-10">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#966E16]/10 to-[#D6B865]/10 flex items-center justify-center mb-4">
            <svg width="0" height="0" className="absolute">
              <defs>
                <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#966E16" />
                  <stop offset="100%" stopColor="#D6B865" />
                </linearGradient>
              </defs>
            </svg>
            <ShoppingCart className="w-5 h-5" style={{ stroke: 'url(#gold-gradient)' }} />
          </div>
          <h1 className="font-serif text-[22px] lg:text-[26px] text-gray-900 text-center leading-tight">
            Preencha seus dados para<br /><span className="bg-gradient-to-r from-[#966E16] to-[#D6B865] bg-clip-text text-transparent">garantir sua vaga</span>
          </h1>
          <p className="text-sm text-gray-500 mt-2 font-sans">
            Voce sera redirecionada para a pagina de pagamento segura.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm text-gray-600 mb-1.5 font-sans">
              Seu nome
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Como prefere ser chamada"
              className="w-full px-4 py-3 border border-gray-400 rounded-xl text-sm text-gray-800 outline-none focus:border-brand-gold transition-colors placeholder:text-gray-400"
            />
          </div>

          <div>
            <label htmlFor="checkout-email" className="block text-sm text-gray-600 mb-1.5 font-sans">
              Seu melhor e-mail
            </label>
            <input
              id="checkout-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@email.com"
              className="w-full px-4 py-3 border border-gray-400 rounded-xl text-sm text-gray-800 outline-none focus:border-brand-gold transition-colors placeholder:text-gray-400"
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
            className="w-full bg-gradient-to-r from-[#966E16] to-[#D6B865] hover:from-[#7d5c12] hover:to-[#c4a855] text-white px-6 py-4 rounded-xl font-bold text-base hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 shadow-xl shadow-brand-gold/25 animate-pulse-gold flex items-center justify-center gap-2 uppercase tracking-wider disabled:opacity-70"
          >
            {loading ? 'Redirecionando...' : 'Ir para pagamento'}
            {!loading && <ArrowRight className="w-5 h-5" />}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-4 font-sans">
          Seus dados estao seguros e nao serao compartilhados.
        </p>
      </div>
    </div>
  );
}
