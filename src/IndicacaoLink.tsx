import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function IndicacaoLink() {
  const [link, setLink] = useState('');
  const [nome, setNome] = useState('');
  const [copiado, setCopiado] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem('indicacao_data');
    if (!raw) {
      navigate('/indicacao');
      return;
    }
    const dados = JSON.parse(raw);
    setLink(dados.link);
    setNome(dados.nome?.split(' ')[0] || '');
  }, [navigate]);

  function copiarLink() {
    navigator.clipboard.writeText(link);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  function enviarWhatsApp() {
    const texto = encodeURIComponent(
      `Quero te convidar para o Workshop: A Habilidade de Ouro!\n\nSe inscreve por aqui: ${link}`
    );
    window.open(`https://api.whatsapp.com/send?text=${texto}`, '_blank');
  }

  if (!link) return null;

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-brand-gold selection:text-brand-navy">

      <section className="pt-10 md:pt-20 pb-12 md:pb-24 px-6 bg-[url('/assets/BGINDICACAO%20MOBILE.png')] bg-cover bg-top bg-no-repeat md:bg-[url('/assets/BGINDICACAO%20DESKTOP.webp')] md:bg-cover md:bg-[center_top_-40px] md:bg-no-repeat relative min-h-screen flex items-center justify-center">
        <div className="max-w-[360px] md:max-w-[700px] mx-auto text-center flex flex-col items-center">

          {/* Logo */}
          <img src="/assets/LOGO HDO AZUL.svg" alt="Workshop A Habilidade de Ouro" className="mb-8 md:mb-10 h-10 md:h-16 w-auto" />

          {/* Parabens */}
          <h1 className="text-[32px] md:text-[48px] font-serif text-[#081E3B] leading-[1.0] mb-4">
            Parabéns{nome ? `, ${nome}` : ''}!
          </h1>

          <p className="text-[16px] md:text-[20px] text-[#081E3B]/70 leading-[1.5] mb-8 md:whitespace-nowrap">
            Agora você faz parte do <strong className="font-bold text-[#081E3B]">Programa de Indicação da Formação Ilumina.</strong>
          </p>

          {/* Missao */}
          <div className="bg-[#081E3B] rounded-2xl px-6 md:px-10 py-8 md:py-10 text-center mb-8 w-full">
            <p className="text-[18px] md:text-[22px] font-bold text-white mb-5">
              A missão é simples:
            </p>
            <div className="space-y-3 text-left md:text-center">
              <p className="text-[16px] md:text-[18px] text-white leading-[1.5]">
                <span className="text-brand-gold font-bold">1.</span> Toque no botão abaixo
              </p>
              <p className="text-[16px] md:text-[18px] text-white leading-[1.5]">
                <span className="text-brand-gold font-bold">2.</span> Compartilhe seu link personalizado
              </p>
            </div>
            <p className="text-[16px] md:text-[18px] text-white leading-[1.5] mt-5">
              Cada pessoa que se tornar aluna por sua indicação vale uma <strong className="font-bold text-brand-gold">recompensa para você.</strong>
            </p>

            {/* Link */}
            <div className="w-full mt-6 pt-6 border-t border-white/15">
              <p className="text-[14px] md:text-[16px] text-white/60 mb-2 font-sans">
                Seu link de indicação:
              </p>
              <div className="flex items-center gap-2">
                <input
                  readOnly
                  value={link}
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white truncate outline-none"
                />
                <button
                  onClick={copiarLink}
                  className="shrink-0 px-5 py-3 bg-brand-gold text-white rounded-xl font-bold text-sm hover:bg-brand-gold-hover transition-colors cursor-pointer"
                >
                  {copiado ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
            </div>
          </div>

          {/* Botao WhatsApp */}
          <button
            onClick={enviarWhatsApp}
            className="w-full bg-[#25D366] hover:bg-[#1fb855] text-white font-bold text-[14px] md:text-[16px] px-8 py-4 md:py-5 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 uppercase tracking-wider cursor-pointer"
          >
            <img src="/assets/WHATSAPP BRANCO.svg" alt="" className="h-5 w-5" />
            Enviar pelo WhatsApp
          </button>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-navy border-t border-white/10 py-12 px-6 text-center text-sm text-white/40">
        <div className="max-w-[360px] md:max-w-[1140px] mx-auto">
          <p>Copyright © 2026 Carol Rache<br className="md:hidden"/> Todos os direitos reservados</p>
        </div>
      </footer>

    </div>
  );
}
