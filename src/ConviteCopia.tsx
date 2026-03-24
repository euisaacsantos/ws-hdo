/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckCircle2, ChevronDown, Clock, Calendar, MonitorPlay, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneInput, { getPhoneDigits, getMinDigits } from './components/PhoneInput';

const CHECKOUT_URL = 'https://pay.hotmart.com/Y104988994A?off=tujyxow2&checkoutMode=10';

declare global {
  interface Window { fbq: (...args: unknown[]) => void; }
}

function getCookie(name: string): string {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : '';
}

function buildFbc(): string {
  const params = new URLSearchParams(window.location.search);
  const fbclid = params.get('fbclid');
  return fbclid ? 'fb.1.' + Date.now() + '.' + fbclid : '';
}

function sendCAPI(eventName: string, customData?: Record<string, unknown>) {
  const eventId = 'eid_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  const fbp = getCookie('_fbp');
  const fbc = getCookie('_fbc') || buildFbc();

  // Client-side Pixel (com event_id para dedup)
  if (window.fbq) {
    window.fbq('track', eventName, customData || {}, { eventID: eventId });
  }

  // Server-side CAPI
  fetch('/api/meta-capi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event_name: eventName,
      event_id: eventId,
      event_source_url: window.location.href,
      user_data_client: {
        ...(fbp && { fbp }),
        ...(fbc && { fbc }),
      },
      ...(customData && { custom_data: customData }),
    }),
    keepalive: true,
  }).catch(() => {});
}

export default function ConviteCopia() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [formNome, setFormNome] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('+55');
  const [formLoading, setFormLoading] = useState(false);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // PageView CAPI (disparo server-side, o client já dispara no HTML)
  useEffect(() => {
    sendCAPI('PageView');
  }, []);

  // URL params → sck no checkout Hotmart
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const parts: string[] = [];
    params.forEach((val, key) => {
      if (val) parts.push(key + ':' + val.replace(/[|:]/g, '-'));
    });
    if (parts.length) {
      const sck = encodeURIComponent(parts.join('|'));
      document.querySelectorAll<HTMLAnchorElement>('a[href*="pay.hotmart.com"]').forEach((link) => {
        const href = link.getAttribute('href')!;
        link.setAttribute('href', href + (href.indexOf('?') > -1 ? '&' : '?') + 'sck=' + sck);
      });
    }
  }, []);

  // Simple countdown logic for demonstration
  useEffect(() => {
    const targetDate = new Date('2026-03-28T00:00:00');
    
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  return (
    <div className="min-h-screen bg-brand-navy text-brand-text font-sans selection:bg-brand-gold selection:text-brand-navy">
      
      {/* Top Bar */}
      <div className="bg-white border-b border-[#081E3B]/10 py-3 md:py-3 px-4 text-xs md:text-sm tracking-widest uppercase z-50 relative">
        <div className="max-w-[360px] md:max-w-[1140px] mx-auto flex flex-col md:flex-row items-center gap-1 md:gap-6">
          <span className="text-[11px] md:text-[16px] font-bold text-[#081E3B] flex items-center gap-2">
            <img src="/assets/CALENDARIO GOLD.svg" alt="" className="h-[11px] md:h-[16px] w-auto" />
            28 e 29 de março, às 09h
          </span>
          <span className="hidden md:inline text-[#081E3B]/30">|</span>
          <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-[11px] md:text-[16px] font-bold">
            <span className="text-brand-gold">O lote de ingressos encerra em</span>
            <span className="text-[#081E3B] bg-[#081E3B]/10 px-3 py-1 rounded-md">{formatTime(timeLeft.days)}d : {formatTime(timeLeft.hours)}h : {formatTime(timeLeft.minutes)}m : {formatTime(timeLeft.seconds)}s</span>
          </div>
        </div>
      </div>


      <main className="relative z-10 [&>section+section]:mt-0">
        
        {/* 1ª DOBRA - Hero */}
        <section className="pt-[190px] md:pt-20 pb-12 md:pb-24 px-6 bg-white bg-[url('/assets/BG1%20MOBILE%202.png')] bg-cover bg-top bg-no-repeat md:bg-[url('/assets/BG1%20DESKTOP%202.png')] md:bg-cover md:bg-top md:bg-no-repeat relative">
          <img src="/assets/LOGO HDO AZUL.svg" alt="Workshop A Habilidade de Ouro" className="absolute top-6 right-4 h-9 w-auto md:hidden" />
          <div className="max-w-[360px] md:max-w-[1140px] mx-auto text-center md:text-left flex flex-col items-center md:items-start">
          <img src="/assets/LOGO HDO AZUL.svg" alt="Workshop A Habilidade de Ouro" className="mb-12 h-16 w-auto hidden md:block" />

          <h1 className="text-[26px] md:text-[40px] font-serif text-white md:text-[#081E3B] leading-[1.0] mb-5 max-w-4xl">
            O problema da sua vida profissional<span className="hidden md:inline"><br/></span> não é falta de competência.<span className="hidden md:inline"><br/></span> <span className="font-medium">É nunca ter aprendido a moldar<span className="hidden md:inline"><br/></span> o comportamento humano.</span>
          </h1>

          <p className="text-[16px] md:text-[20px] text-white md:text-[#081E3B]/70 max-w-3xl mb-4 leading-[1.3] font-light">
            Em um <strong className="font-bold text-white md:text-[#081E3B]">treinamento de dois dias</strong> você desenvolverá<br className="hidden md:inline" /> a habilidade que nenhuma faculdade te ensinou, mas<br className="hidden md:inline" /> que é determinante para o seu sucesso:<br className="hidden md:inline" /> <strong className="font-bold text-white md:text-[#081E3B]">a habilidade de destravar pessoas.</strong>
          </p>

          <div className="flex flex-nowrap justify-center md:justify-start items-center gap-2 md:gap-3 mb-6 text-[11px] md:text-base text-white/80 md:text-[#081E3B]/80 font-medium tracking-wide border border-white/20 md:border-[#CED2D8] rounded-md px-2 md:px-4 py-2 whitespace-nowrap bg-black/40 md:bg-transparent backdrop-blur-md md:backdrop-blur-none">
            <div className="flex items-center gap-1 md:gap-2">
              <img src="/assets/CALENDARIO GOLD.svg" alt="" className="h-4 md:h-5 w-auto shrink-0" />
              28 e 29 de março, às 09h
            </div>
            <span className="text-white/40 md:text-[#081E3B]/40">|</span>
            <div className="flex items-center gap-1 md:gap-2">
              <img src="/assets/PLAY GOLD.svg" alt="" className="h-4 md:h-5 w-auto shrink-0" />
              100% ao vivo
            </div>
          </div>

          <a href="#oferta" className="inline-block bg-gradient-to-r from-[#966E16] to-[#D6B865] hover:from-[#7d5c12] hover:to-[#c4a855] text-white font-bold text-[12px] md:text-[16px] px-5 md:px-10 py-4 md:py-5 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_50px_rgba(207,168,97,0.5),0_0_100px_rgba(207,168,97,0.25)] uppercase tracking-normal md:tracking-wider whitespace-nowrap">
            QUERO DOMINAR A HABILIDADE DE OURO!
          </a>
          </div>
        </section>

        {/* 2ª DOBRA - A Verdade */}
        <section className="py-12 md:py-20 px-6 bg-white md:bg-[url('/assets/BG%20BASE%20CLARA%201%20DESKTOP.png')] md:bg-cover md:bg-top md:bg-no-repeat">
          <div className="max-w-[360px] md:max-w-[1140px] mx-auto">

            {/* Bloco 1 - Abertura */}
            <div className="text-left md:text-center mb-10 md:mb-16">
              <h2 className="text-[26px] md:text-[40px] font-serif text-[#081E3B] leading-[1.1] mb-4">
                Você aprendeu que o que valia era <span className="font-medium">esforço e conhecimento.</span>
              </h2>
              <p className="text-[18px] md:text-[24px] text-brand-gold font-medium">
                Mas o mercado não recompensa isso.
              </p>
              <p className="text-[16px] md:text-[20px] text-[#081E3B]/70 mt-2">
                O mercado recompensa <strong className="font-bold text-[#081E3B]">resultado.</strong>
              </p>
            </div>

            {/* Bloco 2 - Exemplos */}
            <div className="space-y-6 mb-10 md:mb-16 md:max-w-2xl md:mx-auto">
              <div className="border-l-4 border-brand-gold pl-5 py-2">
                <p className="text-[16px] md:text-lg text-[#081E3B] leading-relaxed">
                  Um nutricionista que não gera emagrecimento <strong className="font-bold">não tem relevância</strong>, mesmo cheio de certificados.
                </p>
              </div>
              <div className="border-l-4 border-brand-gold pl-5 py-2">
                <p className="text-[16px] md:text-lg text-[#081E3B] leading-relaxed">
                  Uma prestadora de serviço que não gera resultado pro cliente <strong className="font-bold">não se sustenta</strong>, mesmo sendo tecnicamente boa.
                </p>
              </div>
            </div>

            {/* Bloco 3 - Verdade central */}
            <div className="bg-[#081E3B] rounded-2xl px-6 md:px-12 py-8 md:py-12 text-center mb-10 md:mb-16 md:max-w-2xl md:mx-auto">
              <p className="text-[16px] md:text-xl text-white/80 leading-relaxed mb-4">
                Porque no final do dia, ninguém paga pelo que você sabe.
              </p>
              <p className="text-[20px] md:text-[28px] font-serif text-white leading-[1.2]">
                As pessoas pagam pelo que você <span className="text-brand-gold font-medium">faz acontecer.</span>
              </p>
            </div>

            {/* Bloco 4 - Provocação */}
            <div className="text-left md:text-center mb-10 md:mb-12">
              <p className="text-[16px] md:text-xl text-[#081E3B]/70 leading-relaxed mb-6">
                E se você não sabe fazer o outro agir… <strong className="font-bold text-[#081E3B]">você não gera resultado.</strong>
              </p>
              <p className="text-[16px] md:text-lg text-[#081E3B]/70 leading-relaxed mb-2">
                É por isso que a habilidade mais valiosa hoje não é técnica.
              </p>
              <p className="text-[20px] md:text-[28px] font-serif text-[#081E3B] font-medium">
                É comportamental.
              </p>
            </div>

            {/* Bloco 5 - CTA */}
            <div className="bg-[#081E3B]/5 border border-[#CED2D8] rounded-2xl px-6 md:px-12 py-8 md:py-10 text-center md:max-w-2xl md:mx-auto">
              <p className="text-[22px] md:text-[32px] font-serif text-[#081E3B] mb-6 leading-[1.1]">
                Você precisa saber <span className="text-brand-gold font-medium">destravar pessoas.</span>
              </p>
              <a href="#oferta" className="inline-block bg-gradient-to-r from-[#966E16] to-[#D6B865] hover:from-[#7d5c12] hover:to-[#c4a855] text-white font-bold text-[14px] md:text-[16px] px-16 md:px-20 py-4 md:py-5 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(207,168,97,0.3)] uppercase tracking-normal md:tracking-wider whitespace-nowrap">
                QUERO APRENDER
              </a>
            </div>

          </div>
        </section>

        {/* 3ª DOBRA - Schedule */}
        <section className="py-10 md:py-16 px-6 bg-brand-navy bg-[url('/assets/BG%20BASE%20DESKTOP.webp')] bg-cover bg-top bg-no-repeat" style={{transform: 'scaleX(-1)'}}>
          <div className="max-w-[360px] md:max-w-[1140px] mx-auto" style={{transform: 'scaleX(-1)'}}>
            <h2 className="text-3xl md:text-[40px] font-serif text-center text-white mb-10">
              Em 2 dias, você vai entender por que não consegue<br /> gerar resultado e o que fazer pra mudar isso.
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Saturday */}
              <div className="bg-white/10 p-8 md:p-12 rounded-2xl border border-white/10 relative overflow-hidden group hover:border-brand-gold/30 transition-colors">
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-gold transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500"></div>

                <h3 className="text-[30px] md:text-[36px] font-serif text-brand-gold mb-2">Sábado, 28 de março</h3>
                <p className="text-[16px] md:text-sm text-white uppercase tracking-wider mb-8 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> das 9h às 12h
                </p>

                <div className="space-y-5 text-white font-light leading-relaxed text-[16px] text-left">
                  <p className="font-medium text-[18px]">Você começa entendendo uma coisa simples: você só é bem paga quando gera resultado.</p>

                  <p>E resultado não vem de técnica.<br />Vem de <strong className="font-bold">comportamento.</strong></p>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-4">
                    <ul className="space-y-4">
                      <li className="flex gap-3 items-start">
                        <span className="text-brand-gold mt-1">✦</span>
                        <span>Por que as pessoas não se movem (mesmo querendo)</span>
                      </li>
                      <li className="flex gap-3 items-start">
                        <span className="text-brand-gold mt-1">✦</span>
                        <span>O que está travando seus resultados hoje</span>
                      </li>
                      <li className="flex gap-3 items-start">
                        <span className="text-brand-gold mt-1">✦</span>
                        <span>Como o comportamento humano impacta diretamente o que você ganha</span>
                      </li>
                      <li className="flex gap-3 items-start">
                        <span className="text-brand-gold mt-1">✦</span>
                        <span>A conexão entre mente, corpo e ação</span>
                      </li>
                    </ul>
                  </div>

                  <p className="font-medium text-white">Você vai sair do sábado com <span className="text-brand-gold">clareza.</span></p>

                  <p className="italic text-white/80">Clareza do porquê você tenta, mas não consegue fazer as pessoas avançarem.</p>
                </div>
              </div>

              {/* Sunday */}
              <div className="bg-white/10 p-8 md:p-12 rounded-2xl border border-white/10 relative overflow-hidden group hover:border-brand-gold/30 transition-colors">
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-gold transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500"></div>

                <h3 className="text-[30px] md:text-[36px] font-serif text-brand-gold mb-2">Domingo, 29 de março</h3>
                <p className="text-[16px] md:text-sm text-white uppercase tracking-wider mb-8 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> das 9h às 12h
                </p>

                <div className="space-y-5 text-white font-light leading-relaxed text-[16px] text-left">
                  <p className="font-medium text-[18px]">Aqui você entende o que realmente controla comportamento.</p>

                  <p>E como usar isso <strong className="font-bold">a seu favor.</strong></p>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-4">
                    <ul className="space-y-4">
                      <li className="flex gap-3 items-start">
                        <span className="text-brand-gold mt-1">✦</span>
                        <span>O que está por trás de toda decisão humana</span>
                      </li>
                      <li className="flex gap-3 items-start">
                        <span className="text-brand-gold mt-1">✦</span>
                        <span>Como antecipar objeções antes mesmo delas aparecerem</span>
                      </li>
                      <li className="flex gap-3 items-start">
                        <span className="text-brand-gold mt-1">✦</span>
                        <span>A diferença entre tentar convencer e realmente influenciar</span>
                      </li>
                      <li className="flex gap-3 items-start">
                        <span className="text-brand-gold mt-1">✦</span>
                        <span>Como transformar isso em posicionamento e venda</span>
                      </li>
                    </ul>
                  </div>

                  <p className="font-medium text-white text-[18px]">E no final, você entende o <span className="text-brand-gold">caminho completo.</span></p>

                  <p className="italic text-white/80">Como sair de alguém que sabe… pra alguém que gera resultado, e é paga por isso.</p>
                </div>
              </div>
            </div>
            <div className="text-center mt-12">
              <a href="#oferta" className="inline-block bg-gradient-to-r from-[#966E16] to-[#D6B865] hover:from-[#7d5c12] hover:to-[#c4a855] text-white font-bold text-[14px] md:text-[16px] px-16 md:px-20 py-4 md:py-5 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(207,168,97,0.3)] uppercase tracking-normal md:tracking-wider">
                É DISSO QUE EU PRECISO!
              </a>
            </div>
          </div>
        </section>

        {/* Target Audience */}
        <section className="pt-10 pb-10 md:pt-16 md:pb-16 px-6 bg-white">
          <div className="max-w-[360px] md:max-w-[1140px] mx-auto">
          <h2 className="text-3xl md:text-[40px] font-serif text-center text-[#081E3B] mb-4 md:mb-10">
            Para quem é o <span className="italic text-brand-gold">Workshop<br className="md:hidden"/> A Habilidade de Ouro?</span>
          </h2>

          <p className="text-[16px] md:text-xl text-center text-[#081E3B]/80 mb-6 md:mb-12">Ele é especialmente para você que:</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-16">
            <div className="flex flex-col items-start gap-4 bg-[#081E3B]/5 p-6 rounded-xl border border-[#CED2D8]">
              <CheckCircle2 className="w-6 h-6 text-brand-gold shrink-0" />
              <p className="text-[16px] md:text-lg text-[#081E3B]/80 leading-[1.4] font-light">
                É <strong className="text-[#081E3B] font-bold">profissional autônomo</strong> ou <strong className="text-[#081E3B] font-bold">especialista</strong> e sente que poderia gerar muito mais resultado nos seus clientes se soubesse lidar melhor com o comportamento das pessoas
              </p>
            </div>

            <div className="flex flex-col items-start gap-4 bg-[#081E3B]/5 p-6 rounded-xl border border-[#CED2D8]">
              <CheckCircle2 className="w-6 h-6 text-brand-gold shrink-0" />
              <p className="text-[16px] md:text-lg text-[#081E3B]/80 leading-[1.4] font-light">
                É <strong className="text-[#081E3B] font-bold">líder</strong> ou <strong className="text-[#081E3B] font-bold">gestor</strong> e percebe que muitas vezes o desafio não é ter uma boa estratégia, é fazer as pessoas realmente executarem
              </p>
            </div>

            <div className="flex flex-col items-start gap-4 bg-[#081E3B]/5 p-6 rounded-xl border border-[#CED2D8]">
              <CheckCircle2 className="w-6 h-6 text-brand-gold shrink-0" />
              <p className="text-[16px] md:text-lg text-[#081E3B]/80 leading-[1.4] font-light">
                <strong className="text-[#081E3B] font-bold">Trabalha diretamente com pessoas</strong> (atendendo, liderando, orientando ou ensinando) e quer desenvolver uma habilidade que transforma conhecimento em resultado real nas pessoas.
              </p>
            </div>
          </div>

          <p className="text-[16px] md:text-xl text-center text-[#081E3B] font-light leading-relaxed max-w-3xl mx-auto">
            Se você sente que existe uma metade da sua profissão que ninguém nunca te ensinou, <strong className="font-bold">é exatamente isso que vamos explorar juntos nessa imersão!</strong>
          </p>
          <div className="flex justify-center mt-10">
            <a href="#oferta" className="inline-block bg-gradient-to-r from-[#966E16] to-[#D6B865] hover:from-[#7d5c12] hover:to-[#c4a855] text-white font-bold text-[14px] md:text-[16px] w-[360px] md:w-auto md:px-20 py-4 md:py-5 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(207,168,97,0.3)] uppercase tracking-normal md:tracking-wider text-center">
              QUERO PARTICIPAR DO WORKSHOP!
            </a>
          </div>
          </div>
        </section>

        {/* Offer */}
        <section id="oferta" className="pt-[240px] pb-10 md:py-24 px-6 bg-brand-navy bg-[url('/assets/BG%20OFERTA%20MOBILE.webp')] md:bg-[url('/assets/BG%20OFERTA%20DESKTOP.webp')] bg-cover bg-top md:bg-top bg-no-repeat">
          <div className="max-w-[360px] md:max-w-[1140px] mx-auto flex justify-center md:justify-start">
          <div className="max-w-[520px] md:ml-16 bg-brand-navy-light border border-brand-gold/30 rounded-3xl px-5 py-8 text-center shadow-[0_0_50px_rgba(207,168,97,0.1)] relative overflow-hidden">

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold to-transparent"></div>

            <h2 className="text-[28px] md:text-[32px] font-serif text-white mb-6 leading-[1.1]">
              Ao garantir sua vaga agora, você vai receber:
            </h2>

            <div className="space-y-3 text-left max-w-xl mx-auto mb-3">
              <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                <CheckCircle2 className="w-6 h-6 text-brand-gold shrink-0" />
                <span className="text-[14px] md:text-lg text-white">2 encontros ao vivo sobre como aplicar comportamento humano na sua carreira</span>
              </div>
              <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                <CheckCircle2 className="w-6 h-6 text-brand-gold shrink-0" />
                <span className="text-[14px] md:text-lg text-white">6 horas de imersão prática</span>
              </div>
              <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                <CheckCircle2 className="w-6 h-6 text-brand-gold shrink-0" />
                <span className="text-[14px] md:text-lg text-white">Acesso a 4 mentores indispensáveis, incluindo Carol Rache</span>
              </div>
              <div className="flex items-center gap-4 pb-4">
                <CheckCircle2 className="w-6 h-6 text-brand-gold shrink-0" />
                <span className="text-[14px] md:text-lg text-white">Apostila completa da Imersão, com os principais frameworks abordados durante o workshop</span>
              </div>
            </div>

            <div className="text-center mb-3">
              <p className="text-white uppercase tracking-widest text-[14px] md:text-sm font-bold mb-2">Tudo isso por:</p>
              <p className="text-[28px] md:text-[40px] font-serif text-brand-gold drop-shadow-lg">
                De graça para você!
              </p>
            </div>

            <button onClick={() => setShowModal(true)} className="block w-auto bg-gradient-to-r from-[#966E16] to-[#D6B865] hover:from-[#7d5c12] hover:to-[#c4a855] text-white font-bold text-[12px] md:text-[16px] px-4 md:px-12 py-4 md:py-5 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(207,168,97,0.3)] uppercase tracking-wider text-center mx-auto cursor-pointer">
              Garantir minha vaga agora
            </button>
          </div>
          </div>
        </section>

        {/* Recordings Objection */}
        <section className="pt-6 pb-10 md:pt-8 md:pb-16 px-6 bg-gradient-to-b from-brand-navy-light to-brand-navy">
          <div className="max-w-[360px] md:max-w-[1140px] mx-auto text-center">
          <h2 className="text-3xl md:text-[40px] font-serif text-white mb-8">
            E se eu não puder estar ao vivo?
          </h2>

          <div className="space-y-6 text-[16px] md:text-lg text-white leading-relaxed font-light text-left md:text-center">
            <p>
              Se você sente que esse conteúdo pode ser importante para o seu momento profissional, mas não tem certeza se conseguirá participar ao vivo nos dois dias, fique tranquila.
            </p>
            <p>
              Ao clicar no botão para garantir sua vaga, na próxima página você encontrará a opção de adicionar o <strong className="text-white font-medium">acesso às gravações completas da imersão.</strong>
            </p>
            <hr className="border-white/20" />
            <p>
              Esse acesso estará disponível por um valor simbólico, justamente para garantir que ninguém deixe de participar da imersão por causa de agenda.
            </p>
            <p className="italic text-white">
              Então, mesmo que você não consiga estar presente ao vivo, ainda assim poderá aproveitar todo o conteúdo desses dois dias.
            </p>
          </div>
          </div>
        </section>

        {/* Mentors */}
        <section className="py-10 md:py-16 px-6 bg-brand-navy bg-[url('/assets/BG%20BASE%20DESKTOP.webp')] bg-cover bg-top bg-no-repeat border-y border-white/5">
          <div className="max-w-[360px] md:max-w-[1140px] mx-auto">
            <h2 className="text-3xl md:text-[40px] font-serif text-center text-white mb-10">
              Conheça os seus mentores<br className="md:hidden"/> no <span className="italic text-brand-gold">Workshop:<br/> A Habilidade de Ouro</span>
            </h2>

            {/* Mentor Grid - Replicating the visual style of the reference */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Main Mentor (Carol Rache - implied from reference image structure) */}
              <div className="md:col-span-3 flex flex-col-reverse md:flex-row items-center gap-4 md:gap-12 mb-12 w-full">
                <div className="w-full md:flex-1 space-y-3 md:space-y-6">
                  <h3 className="text-[48px] font-serif text-white">Carol Rache</h3>
                  <p className="text-white leading-relaxed text-[16px] md:text-lg font-normal">
                    Já são <strong className="font-bold">mais de 10 anos como Mentora de Desenvolvimento Pessoal</strong>. Primeiro, Carol acendeu a própria luz e se curou. Depois, transbordou essa transformação para <strong className="font-bold">+ 40 mil pessoas</strong>, que tiveram suas vidas destravadas.
                  </p>
                  <p className="text-white leading-relaxed text-[16px] md:text-lg font-normal">
                    Carol ouviu o que pulsava e seguiu seu propósito: acelerar e <strong className="font-bold">descomplicar o processo de cura emocional</strong> de outras pessoas, alcançando não só realização, mas também os seguintes resultados:
                  </p>
                  <div className="flex flex-col md:flex-row md:flex-wrap gap-3">
                    <div className="flex items-center gap-3 border border-white/20 rounded-md px-4 py-4 w-full md:w-auto">
                      <img src="/assets/LOGO FORBES.svg" alt="Forbes" className="h-5 w-auto" />
                      <span className="text-[16px] text-white font-normal">Colunista Forbes</span>
                    </div>
                    <div className="flex items-center gap-3 border border-white/20 rounded-md px-4 py-4 w-full md:w-auto">
                      <img src="/assets/LOGO HARVARD.svg" alt="Harvard" className="h-8 w-auto" />
                      <span className="text-[16px] text-white font-normal md:whitespace-nowrap">Certificação em<br className="md:hidden"/> comportamento humano de Harvard</span>
                    </div>
                    <div className="flex items-center gap-3 border border-white/20 rounded-md px-4 py-4 w-full md:w-auto">
                      <img src="/assets/LOGO ACENDA.svg" alt="Acenda sua Luz" className="h-8 w-auto" />
                      <span className="text-[16px] text-white font-normal">Autora do livro<br className="md:hidden"/> "Acenda sua Luz"</span>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-[40%]">
                  <img
                    src="/assets/FOTO CAROL.webp"
                    alt="Carol Rache"
                    className="rounded-lg shadow-2xl w-full object-cover md:h-[600px]"
                  />
                </div>
              </div>

              {/* Other Mentors */}
              <div className="space-y-3 md:space-y-6">
                 <img
                    src="/assets/FOTO PATRUS.webp"
                    alt="Roberto Patrus"
                    className="rounded-lg shadow-xl w-full object-cover aspect-square md:aspect-[3/4]"
                  />
                  <h3 className="text-[40px] font-serif text-white">Roberto Patrus</h3>
                  <p className="text-white text-[16px] md:text-sm leading-relaxed">
                    <strong className="font-bold">Filósofo, psicólogo, autor renomado e referência em comportamento humano</strong> - com mestrado em Administração e doutorado em Filosofia pela Complutense de Madrid.
                  </p>
                  <p className="text-white text-[16px] md:text-sm leading-relaxed">
                    Como professor, Roberto combina <strong className="font-bold">profundidade</strong> conceitual com linguagem acessível, trazendo à tona o poder da filosofia para iluminar decisões, dilemas íntimos e desafios do cotidiano. Sua didática é marcada pela clareza, precisão e generosidade de quem entende que <strong className="font-bold">pensar bem é um ato de liberdade</strong>.
                  </p>
              </div>

              <div className="space-y-3 md:space-y-6">
                 <img
                    src="/assets/FOTO JU.png"
                    alt="Juliana Chimeli"
                    className="rounded-lg shadow-xl w-full object-cover aspect-square md:aspect-[3/4]"
                  />
                  <h3 className="text-[40px] font-serif text-white">Juliana Chimeli</h3>
                  <p className="text-white text-[16px] md:text-sm leading-relaxed">
                    Atua há mais de 15 anos no desenvolvimento humano, integrando <strong className="font-bold">ciência, escuta clínica e abordagens terapêuticas</strong>.
                  </p>
                  <p className="text-white text-[16px] md:text-sm leading-relaxed">
                    É terapeuta com formação em Ciências Médicas e especializações em <strong className="font-bold">Neurociência, Desenvolvimento Infantil e Psicologia Positiva</strong>, além de estudos em Metafísica, Biopsicologia e Leitura Corporal.
                  </p>
                  <p className="text-white text-[16px] md:text-sm leading-relaxed">
                    Coordena o <strong className="font-bold">Núcleo de Terapia Corporal</strong> e a <strong className="font-bold">Escola de Leitura Corporal</strong>, formando e acompanhando pessoas em jornadas de autoconhecimento, saúde emocional e expansão de consciência.
                  </p>
                  <p className="text-white text-[16px] md:text-sm leading-relaxed">
                    No Workshop A Habilidade de Ouro, Juliana vai te <strong className="font-bold">conduzir na leitura do comportamento humano a partir do corpo</strong>, ajudando você a acessar padrões profundos e gerar transformação real nas pessoas.
                  </p>
              </div>

              <div className="space-y-3 md:space-y-6">
                 <img
                    src="/assets/FOTO DUDA.webp"
                    alt="Eduarda Maia"
                    className="rounded-lg shadow-xl w-full object-cover aspect-square md:aspect-[3/4]"
                  />
                  <h3 className="text-[40px] font-serif text-white">Eduarda Maia</h3>
                  <p className="text-white text-[16px] md:text-sm leading-relaxed">
                    <strong className="font-bold">Atua há 5 anos ajudando profissionais a se posicionarem com clareza, estratégia e autoridade.</strong>
                  </p>
                  <p className="text-white text-[16px] md:text-sm leading-relaxed">
                    É professora nos programas de desenvolvimento pessoal e profissional da Carol Rache, onde já impactou milhares de alunas.
                  </p>
                  <p className="text-white text-[16px] md:text-sm leading-relaxed">
                    No Workshop A Habilidade de Ouro, Eduarda vai te <strong className="font-bold">conduzir na construção da sua clareza</strong>, da sua presença e da voz que você precisa assumir para destravar um novo nível profissional.
                  </p>
              </div>

            </div>
          </div>
        </section>

        {/* Support */}
        <section className="md:py-16 md:px-6 text-center">
          <div className="w-full md:max-w-[1140px] mx-auto bg-white md:rounded-xl py-6 px-6 md:py-16 md:px-12">
            <h2 className="text-2xl md:text-[40px] font-serif text-[#081E3B] mb-2 md:mb-6">
              Tem alguma dúvida?
            </h2>
            <p className="text-[#081E3B]/70 text-[14px] md:text-[16px] mb-4 md:mb-8">É só tocar no botão abaixo<br className="md:hidden" /> e falar com meu time:</p>
            <a href="https://namah.vc/suporte" target="_blank" rel="noopener noreferrer" onClick={() => sendCAPI('Contact', { content_name: 'Suporte WhatsApp' })} className="bg-gradient-to-r from-[#0B6D40] to-[#0AD778] hover:from-[#095a35] hover:to-[#08c06a] text-white font-bold text-[13px] md:text-[16px] px-5 md:px-10 py-4 md:py-5 rounded-lg transition-all duration-300 transform hover:scale-105 uppercase tracking-normal md:tracking-wider inline-flex items-center gap-1.5 md:gap-3">
              <img src="/assets/WHATSAPP BRANCO.svg" alt="" className="h-5 md:h-6 w-auto shrink-0" />
              Falar com o Suporte no WhatsApp
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-10 md:py-16 px-6 bg-brand-navy">
          <div className="max-w-[360px] md:max-w-[1140px] mx-auto">
          <h2 className="text-3xl md:text-[40px] font-serif text-center text-white mb-10">
            Perguntas Frequentes
          </h2>

          <div className="space-y-6">
            <FAQItem 
              question="Preciso participar ao vivo para aproveitar a imersão?"
              answer="O ideal é estar ao vivo porque você consegue acompanhar o raciocínio completo, fazer anotações e viver a experiência junto com o grupo. Mas, ao garantir sua vaga, na próxima página você encontrará a opção de adicionar acesso às gravações completas dos dois dias da imersão, para assistir depois com mais calma caso sua agenda não permita participar ao vivo."
            />
            <FAQItem 
              question="Para quem exatamente essa imersão foi criada?"
              answer="A imersão foi pensada para profissionais que trabalham diretamente com pessoas. Isso inclui, por exemplo: profissionais autônomos que atendem clientes ou pacientes, líderes e gestores que conduzem equipes, especialistas que orientam, ensinam ou prestam serviços. Se o seu trabalho depende da capacidade das pessoas aplicarem aquilo que você orienta, então entender comportamento humano pode mudar completamente a forma como você conduz sua profissão."
            />
            <FAQItem 
              question="Quanto tempo dura a imersão?"
              answer="A imersão acontece em dois encontros ao vivo: Sábado e domingo, das 9h às 12h (horário de Brasília). Serão duas manhãs de conteúdo aprofundado, com aproximadamente 6 horas totais de imersão."
            />
            <FAQItem 
              question="Vou receber algum material de apoio?"
              answer="Sim. Você receberá uma apostila da imersão, com os principais conceitos e estruturas abordadas durante o workshop, para que possa revisar e aplicar o conteúdo depois com mais clareza."
            />
          </div>
          </div>
        </section>

      </main>

      {/* Modal Formulario */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl px-6 py-8 md:px-8 md:py-10">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-serif text-[22px] md:text-[26px] text-[#081E3B] text-center leading-tight mb-2">
              Garanta sua vaga <span className="text-brand-gold">gratuita</span>
            </h2>
            <p className="text-sm text-[#081E3B]/60 text-center mb-6 font-sans">
              Preencha seus dados para confirmar sua inscrição
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const digits = getPhoneDigits(formPhone);
                const minDigits = getMinDigits(formPhone);
                if (digits.length < minDigits) return;
                if (!formNome.trim() || !formEmail.includes('@')) return;
                setFormLoading(true);
                const payload = JSON.stringify({
                  nome: formNome.trim(),
                  email: formEmail.trim(),
                  phone: formPhone,
                  page_url: window.location.href,
                });
                const sent = navigator.sendBeacon('/api/lead', new Blob([payload], { type: 'application/json' }));
                if (!sent) {
                  fetch('/api/lead', { method: 'POST', body: payload, headers: { 'Content-Type': 'application/json' }, keepalive: true });
                }

                sendCAPI('Lead', { content_name: 'Workshop Habilidade de Ouro - Alunas' });
                setTimeout(() => {
                  setFormLoading(false);
                  setShowModal(false);
                  navigate('/alunas/obrigado');
                }, 800);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm text-gray-600 mb-1.5 font-sans">Nome</label>
                <input
                  type="text"
                  required
                  value={formNome}
                  onChange={(e) => setFormNome(e.target.value)}
                  placeholder="Seu nome completo"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-brand-gold transition-colors placeholder:text-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1.5 font-sans">E-mail</label>
                <input
                  type="email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="voce@email.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-brand-gold transition-colors placeholder:text-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1.5 font-sans">WhatsApp</label>
                <PhoneInput value={formPhone} onChange={setFormPhone} />
              </div>
              <button
                type="submit"
                disabled={formLoading}
                className="w-full bg-gradient-to-r from-[#966E16] to-[#D6B865] hover:from-[#7d5c12] hover:to-[#c4a855] text-white px-6 py-4 md:py-5 rounded-lg font-bold text-[12px] md:text-[16px] transition-all duration-300 transform hover:scale-105 shadow-[0_0_50px_rgba(207,168,97,0.5),0_0_100px_rgba(207,168,97,0.25)] uppercase tracking-wider cursor-pointer disabled:opacity-70"
              >
                {formLoading ? 'Confirmando...' : 'Confirmar minha inscrição'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-brand-navy border-t border-white/10 py-12 px-6 text-center text-sm text-white/40">
        <div className="max-w-[360px] md:max-w-[1140px] mx-auto">
          <p>Copyright © 2026 Carol Rache<br className="md:hidden"/> Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button
        className="w-full text-left py-6 flex justify-between items-center focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-[16px] md:text-[20px] font-bold text-white group-hover:text-brand-gold transition-colors pr-8" style={{fontFamily: 'var(--font-sans)'}}>{question}</h3>
        <ChevronDown className={`w-5 h-5 text-white/50 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-white text-[16px] font-light leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

