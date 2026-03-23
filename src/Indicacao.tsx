import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Indicacao() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [linkGerado, setLinkGerado] = useState('');
  const [loading, setLoading] = useState(false);
  const [modoRecuperar, setModoRecuperar] = useState(false);
  const [emailRecuperar, setEmailRecuperar] = useState('');
  const [linkRecuperado, setLinkRecuperado] = useState('');
  const [copiado, setCopiado] = useState(false);

  function gerarLink(nomeUsuario: string, emailUsuario: string) {
    const slug = nomeUsuario
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const hash = emailUsuario
      .split('')
      .reduce((a, c) => ((a << 5) - a + c.charCodeAt(0)) | 0, 0)
      .toString(36)
      .replace('-', '');
    return `${window.location.origin}/convite?ref=${slug}-${hash}`;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nome.trim() || !email.includes('@')) return;
    setLoading(true);

    const link = gerarLink(nome, email);

    // Salva no localStorage
    const dados = { nome, email, link, ts: Date.now() };
    localStorage.setItem('indicacao_data', JSON.stringify(dados));

    setTimeout(() => {
      setLoading(false);
      navigate('/indicacao/link');
    }, 600);
  }

  function handleRecuperar(e: React.FormEvent) {
    e.preventDefault();
    if (!emailRecuperar.includes('@')) return;

    const raw = localStorage.getItem('indicacao_data');
    if (raw) {
      const dados = JSON.parse(raw);
      if (dados.email === emailRecuperar) {
        setLinkRecuperado(dados.link);
        return;
      }
    }
    setLinkRecuperado('nao-encontrado');
  }

  function copiarLink(link: string) {
    navigator.clipboard.writeText(link);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  return (
    <div className="min-h-screen bg-brand-navy text-brand-text font-sans selection:bg-brand-gold selection:text-brand-navy">

      {/* 1a DOBRA - Hero + Formulario */}
      <section className="pt-10 md:pt-20 pb-12 md:pb-24 px-6 bg-[url('/assets/BGINDICACAO%20MOBILE.png')] bg-cover bg-top bg-no-repeat md:bg-[url('/assets/BGINDICACAO%20DESKTOP.webp')] md:bg-cover md:bg-[center_top_-40px] md:bg-no-repeat relative">
        <div className="max-w-[360px] md:max-w-[1140px] mx-auto text-center flex flex-col items-center">

          {/* Logo */}
          <img src="/assets/LOGO HDO AZUL.svg" alt="Workshop A Habilidade de Ouro" className="mb-8 md:mb-10 h-10 md:h-16 w-auto md:hidden" />
          <img src="/assets/LOGO HDO AZUL.svg" alt="Workshop A Habilidade de Ouro" className="mb-8 md:mb-10 h-16 w-auto hidden md:block" />

          {/* Titulo */}
          <p className="text-[12px] md:text-[20px] font-sans font-bold text-[#081E3B] leading-[1.4] mb-5 uppercase tracking-wider">
            Programa de Indicação<br />Formação Ilumina
          </p>

          <p className="text-[28px] md:text-[40px] font-serif text-[#081E3B] leading-[1.2] mb-5 max-w-3xl">
            Ganhe até <span className="text-brand-gold font-medium">R$ 5.000</span> indicando amigos,<br className="hidden md:inline" /> familiares ou conhecidos!
          </p>

          <p className="text-[16px] md:text-[20px] text-[#081E3B]/70 leading-[1.5] mb-8 max-w-[680px] font-light">
            Preencha seus dados, gere um <strong className="font-bold text-[#081E3B]">link de indicação exclusivo</strong> para o Workshop: A Habilidade de Ouro e <strong className="font-bold text-[#081E3B]">a cada pessoa que entrar para a Formação ao fim dele, você recebe uma bonificação.</strong>
          </p>

          {/* Formulario */}
          {!linkGerado ? (
            <div className="w-full max-w-[360px] md:max-w-[900px] bg-[#081E3B]/5 backdrop-blur-md rounded-2xl px-6 py-8 md:px-8 md:py-10 border border-[#081E3B]/10">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="nome" className="block text-sm text-[#081E3B]/60 mb-1.5 font-sans text-left">
                    Nome
                  </label>
                  <input
                    id="nome"
                    type="text"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Seu nome completo"
                    className="w-full px-4 py-3 border border-[#CED2D8] rounded-xl text-sm text-gray-800 bg-white outline-none focus:border-brand-gold transition-colors placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm text-[#081E3B]/60 mb-1.5 font-sans text-left">
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="voce@email.com"
                    className="w-full px-4 py-3 border border-[#CED2D8] rounded-xl text-sm text-gray-800 bg-white outline-none focus:border-brand-gold transition-colors placeholder:text-gray-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#966E16] to-[#D6B865] hover:from-[#7d5c12] hover:to-[#c4a855] text-white px-6 py-4 md:py-5 rounded-lg font-bold text-[12px] md:text-[16px] transition-all duration-300 transform hover:scale-105 shadow-[0_0_50px_rgba(207,168,97,0.5),0_0_100px_rgba(207,168,97,0.25)] flex items-center justify-center gap-2 uppercase tracking-normal md:tracking-wider disabled:opacity-70 cursor-pointer"
                >
                  {loading ? 'Gerando...' : 'QUERO INDICAR!'}
                </button>
              </form>

              <button
                onClick={() => setModoRecuperar(!modoRecuperar)}
                className="block mx-auto mt-5 text-sm text-brand-gold font-sans px-4 py-2 rounded-lg border border-brand-gold/30 hover:scale-105 transition-transform duration-200 cursor-pointer"
              >
                Perdeu seu link? Clique aqui e recupere ele
              </button>

              {modoRecuperar && (
                <form onSubmit={handleRecuperar} className="mt-4 space-y-3">
                  <input
                    type="email"
                    required
                    value={emailRecuperar}
                    onChange={(e) => setEmailRecuperar(e.target.value)}
                    placeholder="Digite o e-mail cadastrado"
                    className="w-full px-4 py-3 border border-[#CED2D8] rounded-xl text-sm text-gray-800 bg-white outline-none focus:border-brand-gold transition-colors placeholder:text-gray-400"
                  />
                  <button
                    type="submit"
                    className="w-full border-2 border-brand-gold text-brand-gold px-6 py-3 rounded-lg font-bold text-sm hover:bg-brand-gold hover:text-white transition-colors uppercase tracking-wider"
                  >
                    Recuperar link
                  </button>
                  {linkRecuperado && linkRecuperado !== 'nao-encontrado' && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <p className="text-xs text-green-700 mb-2 font-sans">Seu link de indicação:</p>
                      <div className="flex items-center gap-2">
                        <input
                          readOnly
                          value={linkRecuperado}
                          className="flex-1 px-3 py-2 bg-white border border-green-200 rounded-lg text-xs text-gray-800 truncate"
                        />
                        <button
                          onClick={() => copiarLink(linkRecuperado)}
                          className="shrink-0 px-3 py-2 bg-green-600 text-white rounded-lg text-xs font-bold hover:bg-green-700 transition-colors"
                        >
                          {copiado ? 'Copiado!' : 'Copiar'}
                        </button>
                      </div>
                    </div>
                  )}
                  {linkRecuperado === 'nao-encontrado' && (
                    <p className="text-xs text-red-500 text-center font-sans">
                      Nenhum cadastro encontrado com este e-mail.
                    </p>
                  )}
                </form>
              )}
            </div>
          ) : (
            /* Link gerado com sucesso */
            <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl px-6 py-8 md:px-8 md:py-10 text-center">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="font-serif text-[20px] md:text-[24px] text-gray-900 leading-tight mb-2">
                Seu link foi gerado!
              </h2>
              <p className="text-sm text-gray-500 mb-5 font-sans">
                Compartilhe com amigos, familiares e conhecidos:
              </p>
              <div className="flex items-center gap-2 mb-4">
                <input
                  readOnly
                  value={linkGerado}
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 truncate"
                />
                <button
                  onClick={() => copiarLink(linkGerado)}
                  className="shrink-0 px-5 py-3 bg-gradient-gold text-white rounded-xl font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform"
                >
                  {copiado ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 2a DOBRA - Como funciona */}
      <section className="py-12 md:py-20 px-6 bg-white">
        <div className="max-w-[360px] md:max-w-[900px] mx-auto">

          <h2 className="text-[26px] md:text-[40px] font-serif text-[#081E3B] leading-[1.1] mb-8 md:mb-12 text-center">
            Entenda como funciona o{' '}
            <span className="text-brand-gold font-medium">Programa de Indicação</span>{' '}
            da Formação Ilumina
          </h2>

          <div className="space-y-6 mb-10 md:mb-14 text-center">
            <p className="text-[16px] md:text-[18px] text-[#081E3B]/80 leading-[1.6]">
              Nos dias 28 e 29 de março, vai acontecer o <strong className="font-bold text-[#081E3B]">Workshop: A Habilidade de Ouro</strong> e, na última aula, vamos abrir as aplicações para a próxima turma da Formação Ilumina.
            </p>
            <p className="text-[16px] md:text-[18px] text-[#081E3B]/80 leading-[1.6]">
              A cada indicação sua que se tornar aluna ao final do workshop, você é recompensada financeiramente.
            </p>
            <p className="text-[18px] md:text-[22px] text-[#081E3B] font-bold leading-[1.4]">
              Funciona assim:
            </p>
          </div>

          {/* Card destaque */}
          <div className="bg-[#081E3B] rounded-2xl px-6 md:px-12 py-8 md:py-12 text-center mb-10 md:mb-14">
            <p className="text-[16px] md:text-[18px] text-white/80 leading-[1.5] mb-4">
              Cada pessoa indicada que se tornar aluna da Formação
            </p>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px flex-1 bg-white/20" />
              <span className="text-[28px] md:text-[36px] text-brand-gold font-serif">=</span>
              <div className="h-px flex-1 bg-white/20" />
            </div>
            <p className="text-[18px] md:text-[22px] text-white leading-[1.4] mb-1">
              <span className="text-brand-gold font-bold">R$ 1.000</span> de desconto para ela
            </p>
            <p className="text-[22px] md:text-[30px] text-white leading-[1.4] font-bold">
              <span className="text-brand-gold text-[24px] md:text-[32px]">R$ 1.000</span> de bônus para você!
            </p>
          </div>

          {/* Progressao */}
          <p className="text-[16px] md:text-[18px] text-[#081E3B]/80 leading-[1.6] text-center my-8 md:my-10">
            Ou seja, quanto mais pessoas você indicar se tornarem alunos, mais você ganha.
          </p>
          <div className="mb-10 md:mb-14 text-center">
            <div className="bg-[#F4F4F4] rounded-2xl px-6 md:px-12 py-6 md:py-8 space-y-4">
              <p className="text-[16px] md:text-[18px] text-[#081E3B] leading-relaxed">
                Se <strong className="font-bold">3 indicações</strong> se tornarem alunas = você recebe{' '}
                <strong className="font-bold text-brand-gold text-[18px] md:text-[22px]">R$ 3.000</strong>
              </p>
              <div className="h-px bg-[#081E3B]/10" />
              <p className="text-[18px] md:text-[24px] text-[#081E3B] leading-relaxed font-bold">
                Se <strong>5 indicações</strong> se tornarem alunas = você recebe{' '}
                <span className="text-brand-gold text-[24px] md:text-[32px]">R$ 5.000</span>
              </p>
            </div>
          </div>

          {/* Bloco "Ah Carol" */}
          <div className="bg-[#F8F5F0] rounded-2xl px-6 md:px-10 py-8 md:py-10 text-center">
            <p className="text-[18px] md:text-[22px] font-sans font-bold text-[#081E3B] leading-[1.3] mb-4">
              "Ah Carol, mas eu não tenho ninguém para indicar."
            </p>
            <p className="text-[16px] md:text-[18px] text-[#081E3B]/80 leading-[1.6] mb-4">
              <strong className="font-bold text-[#081E3B]">Se você tem alguma amiga que trabalha com pessoas</strong> (seja atendendo clientes como prestadora de serviço, liderando equipes como gestora ou dando aulas como mentora), <strong className="font-bold text-[#081E3B]">a Formação Ilumina fará sentido para ela.</strong>
            </p>
            <p className="text-[16px] md:text-[18px] text-[#081E3B]/80 leading-[1.6]">
              Não necessariamente essa pessoa precisa querer atender outras pessoas como especialista em comportamento humano. No <strong className="font-bold text-[#081E3B]">Workshop: A Habilidade de Ouro</strong>, nós vamos apresentar como a próxima turma da Formação poderá somar à carreira que ela já possui.
            </p>
          </div>

          <div className="text-center mt-8 md:mt-10">
          <a
            href="#top"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="block md:inline-block w-full md:w-auto bg-gradient-to-r from-[#966E16] to-[#D6B865] hover:from-[#7d5c12] hover:to-[#c4a855] text-white font-bold text-[12px] md:text-[16px] px-8 md:px-10 py-4 md:py-5 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_50px_rgba(207,168,97,0.5),0_0_100px_rgba(207,168,97,0.25)] uppercase tracking-normal md:tracking-wider cursor-pointer text-center"
          >
            UAU! QUERO INDICAR
          </a>
          </div>

        </div>
      </section>

      {/* Observacao importante */}
      <section className="bg-[#081E3B] px-6 py-12 md:py-16 text-center">
        <div className="max-w-[360px] md:max-w-[900px] mx-auto">
          <p className="text-[18px] md:text-[20px] font-bold text-white mb-3">
            Observação importante:
          </p>
          <p className="text-[16px] md:text-[18px] text-white/80 leading-[1.6]">
            Para indicar e confirmar que a indicada veio por meio de você, é necessário realizar seu cadastro e gerar seu link exclusivo no botão acima. Convide seus amigos ou familiares a se cadastrarem apenas por meio dele!
          </p>
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
