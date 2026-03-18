/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckCircle2, ChevronDown, Clock, Calendar, MonitorPlay } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

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
      <div className="bg-gradient-to-r from-[#19427B] to-[#061933] border-b border-white/10 py-3 md:py-3 px-4 text-xs md:text-sm tracking-widest uppercase z-50 relative">
        <div className="max-w-[360px] md:max-w-[1140px] mx-auto flex flex-col md:flex-row items-center gap-1 md:gap-6">
          <span className="text-[11px] md:text-[16px] font-bold text-white flex items-center gap-2">
            <img src="/assets/CALENDARIO BRANCO.svg" alt="" className="h-[11px] md:h-[16px] w-auto" />
            28 e 29 de março, às 09h
          </span>
          <span className="hidden md:inline text-white">|</span>
          <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-[11px] md:text-[16px] font-bold">
            <span className="text-brand-gold">O lote de ingressos encerra em</span>
            <span className="text-white bg-white/10 px-3 py-1 rounded-md">{formatTime(timeLeft.days)}d : {formatTime(timeLeft.hours)}h : {formatTime(timeLeft.minutes)}m : {formatTime(timeLeft.seconds)}s</span>
          </div>
        </div>
      </div>


      <main className="relative z-10 [&>section+section]:mt-0">
        
        {/* 1ª DOBRA - Hero */}
        <section className="pt-[245px] md:pt-20 pb-12 md:pb-24 px-6 bg-[url('/assets/BG1%20MOBILE.png?v=3')] bg-cover bg-[center_top_-30px] bg-no-repeat md:bg-[url('/assets/BG1%20DESKTOP.png')] md:bg-cover md:bg-[center_top_-80px] md:bg-no-repeat relative">
          <img src="/assets/LOGO HDO AZUL.svg" alt="Workshop A Habilidade de Ouro" className="absolute top-[45px] left-4 h-11 w-auto md:hidden" />
          <div className="max-w-[360px] md:max-w-[1140px] mx-auto text-center md:text-left flex flex-col items-center md:items-start">
          <img src="/assets/LOGO HDO AZUL.svg" alt="Workshop A Habilidade de Ouro" className="mb-12 h-16 w-auto hidden md:block" />

          <h1 className="text-[30px] md:text-[40px] font-serif text-[#081E3B] leading-[1.0] mb-5 max-w-4xl">
            O problema da sua vida profissional<span className="hidden md:inline"><br/></span> já não é mais <span className="italic text-brand-gold">falta de competência.</span><span className="hidden md:inline"><br/></span> <span className="font-medium">É nunca<br className="md:hidden" /> ter aprendido a moldar<span className="hidden md:inline"><br/></span> o comportamento humano.</span>
          </h1>

          <p className="text-[18px] md:text-[20px] text-[#081E3B]/70 max-w-3xl mb-4 leading-[1.3] font-normal">
            Participe de um <strong className="font-bold text-[#081E3B]">treinamento de 2 dias</strong> para desenvolver<br className="hidden md:inline" /> a habilidade que a faculdade nunca te ensinou, mas<br className="hidden md:inline" /> é a que determina o quanto sua técnica realmente<br className="hidden md:inline" /> gera resultado: <strong className="font-bold text-[#081E3B]">a habilidade de guiar pessoas.</strong>
          </p>

          <div className="flex flex-nowrap justify-center md:justify-start items-center gap-3 mb-6 text-xs md:text-base text-[#081E3B]/80 font-medium tracking-wide border border-[#CED2D8] rounded-md px-4 py-2">
            <div className="flex items-center gap-2">
              <img src="/assets/CALENDARIO GOLD.svg" alt="" className="h-5 w-auto" />
              28 e 29 de março, às 09h
            </div>
            <span className="text-[#081E3B]/40">|</span>
            <div className="flex items-center gap-2">
              <img src="/assets/PLAY GOLD.svg" alt="" className="h-5 w-auto" />
              100% ao vivo
            </div>
          </div>

          <button className="bg-gradient-to-r from-[#966E16] to-[#D6B865] hover:from-[#7d5c12] hover:to-[#c4a855] text-white font-bold text-[16px] px-10 py-5 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(207,168,97,0.3)] uppercase tracking-wider">
            QUERO DOMINAR A HABILIDADE DE OURO!
          </button>
          </div>
        </section>

        {/* 2ª DOBRA - Mentors */}
        <section className="py-10 md:py-16 px-6 bg-[url('/assets/BG%20BASE%20DESKTOP.png')] bg-cover bg-center bg-no-repeat border-y border-white/5">
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
                    src="/assets/FOTO CAROL.png"
                    alt="Carol Rache"
                    className="rounded-lg shadow-2xl w-full object-cover md:h-[600px]"
                  />
                </div>
              </div>

              {/* Other Mentors */}
              <div className="space-y-3 md:space-y-6">
                 <img
                    src="/assets/FOTO PATRUS.png"
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
                    src="/assets/FOTO PATY.png"
                    alt="Paty Perdigão"
                    className="rounded-lg shadow-xl w-full object-cover aspect-square md:aspect-[3/4]"
                  />
                  <h3 className="text-[40px] font-serif text-white">Paty Perdigão</h3>
                  <p className="text-white text-[16px] md:text-sm leading-relaxed">
                    Fundadora da Mentorise, mentora e especialista em desenvolvimento humano, Paty Perdigão dedicou mais de 15 anos à área de Pessoas & Cultura em cargos de liderança, antes de dar um passo corajoso rumo ao seu propósito: <strong className="font-bold">ajudar mulheres a destravarem seus talentos e construírem carreiras com sentido e prosperidade</strong>.
                  </p>
                  <p className="text-white text-[16px] md:text-sm leading-relaxed">
                    É uma das mentoras do Transcenda e da Formação Acenda sua Luz, ao lado de Carol Rache, acompanhando de perto a jornada de transformação de centenas de mulheres.
                  </p>
              </div>

              <div className="space-y-3 md:space-y-6">
                 <img
                    src="/assets/FOTO DUDA.png"
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
                    E agora, vai caminhar ao lado da Carol na Formação Ilumina.
                  </p>
                  <p className="text-white text-[16px] md:text-sm leading-relaxed">
                    Eduarda vai te <strong className="font-bold">conduzir na construção da sua clareza</strong>, da sua presença e da voz que você precisa assumir como Mentora.
                  </p>
              </div>

            </div>
          </div>
        </section>

        {/* 3ª DOBRA - The Gap */}
        <section className="py-10 md:py-16 px-6 bg-white">
          <div className="max-w-[360px] md:max-w-[1140px] mx-auto text-left md:text-center">
          <h2 className="text-3xl md:text-[40px] font-serif text-[#081E3B] mb-10 text-center">
            O que essas pessoas vão<br className="md:hidden"/> te ensinar nos dias<br className="md:hidden"/> 28 e 29 de março:
          </h2>

          <div className="space-y-8 text-[16px] md:text-lg text-[#081E3B] leading-relaxed font-light">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <div className="flex items-center justify-center gap-3 border border-brand-gold/30 rounded-lg px-5 py-4 bg-[#081E3B]/5 w-full md:w-auto">
                  <img src="/assets/CALENDARIO GOLD.svg" alt="" className="h-6 w-auto" />
                  <div>
                    <p className="text-[#081E3B] font-bold text-[16px] md:text-lg">2 encontros ao vivo</p>
                    <p className="text-[#081E3B]/60 text-[14px] md:text-sm">28 e 29 de março</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3 border border-brand-gold/30 rounded-lg px-5 py-4 bg-[#081E3B]/5 w-full md:w-auto">
                  <Clock className="w-6 h-6 text-brand-gold" />
                  <div>
                    <p className="text-[#081E3B] font-bold text-[16px] md:text-lg">Das 9h às 12h</p>
                    <p className="text-[#081E3B]/60 text-[14px] md:text-sm">Horário de Brasília</p>
                  </div>
                </div>
              </div>
            </div>
            <p>
              Nós vamos mergulhar exatamente na habilidade que a maioria dos profissionais nunca aprendeu, mas que determina o quanto sua técnica realmente gera resultados.
            </p>
            <p className="text-[16px] md:text-xl text-[#081E3B] font-medium border-y border-brand-gold py-6 w-fit mx-auto">
              Porque existe um detalhe que quase ninguém percebe durante a formação profissional: você aprende o que fazer.<br className="md:hidden"/> Mas nunca aprende <span className="text-brand-gold italic">como fazer as pessoas realmente aplicarem aquilo que você propõe.</span>
            </p>
            <div className="border border-[#CED2D8] rounded-md px-4 py-4 w-fit mx-auto">
              <p>E é exatamente essa lacuna que vamos começar a preencher juntos.</p>
            </div>
            <p>
              Ao longo desse final de semana, você vai começar a entender por que alguns profissionais extremamente competentes continuam lutando para crescer… enquanto outros conseguem <strong className="font-bold">gerar mais resultado, mais reconhecimento e mais valor</strong> com o mesmo conhecimento técnico.
            </p>
          </div>
          <div className="flex justify-center mt-10">
          <button className="bg-gradient-to-r from-[#966E16] to-[#D6B865] hover:from-[#7d5c12] hover:to-[#c4a855] text-white font-bold text-[16px] px-10 py-5 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(207,168,97,0.3)] uppercase tracking-wider">
            É DISSO QUE EU PRECISO!
          </button>
          </div>
          </div>
        </section>

        {/* 4ª DOBRA - Schedule */}
        <section className="py-10 md:py-16 px-6 bg-[url('/assets/BG%20BASE%20DESKTOP.png')] bg-cover bg-center bg-no-repeat" style={{transform: 'scaleX(-1)'}}>
          <div className="max-w-[360px] md:max-w-[1140px] mx-auto" style={{transform: 'scaleX(-1)'}}>
            <h2 className="text-3xl md:text-[40px] font-serif text-center text-white mb-10">
              Cronograma oficial
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Saturday */}
              <div className="bg-white/10 p-8 md:p-12 rounded-2xl border border-white/10 relative overflow-hidden group hover:border-brand-gold/30 transition-colors">
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-gold transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500"></div>
                
                <h3 className="text-[30px] md:text-[36px] font-serif text-brand-gold mb-2">Sábado, 28 de março</h3>
                <p className="text-[16px] md:text-sm text-white uppercase tracking-wider mb-8 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> das 9h às 12h
                </p>

                <div className="space-y-6 text-white font-light leading-relaxed text-[16px] text-left">
                  <p>No primeiro encontro, nós vamos começar investigando aquilo que quase nunca é discutido na formação profissional: o comportamento humano como o verdadeiro motor dos resultados.</p>
                  
                  <p>Você vai perceber que o resultado do seu trabalho não depende apenas da qualidade daquilo que você entrega. Ele também depende do que as pessoas fazem com aquilo que você entrega.</p>
                  
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-4">
                    <ul className="space-y-4">
                      <li className="flex gap-3 items-start">
                        <span className="text-brand-gold mt-1">✦</span>
                        <span>Um nutricionista pode montar o melhor plano alimentar do mundo, mas se o paciente não segue, não existe resultado.</span>
                      </li>
                      <li className="flex gap-3 items-start">
                        <span className="text-brand-gold mt-1">✦</span>
                        <span>Um líder pode ter a melhor estratégia, mas se a equipe não executa, não existe crescimento.</span>
                      </li>
                      <li className="flex gap-3 items-start">
                        <span className="text-brand-gold mt-1">✦</span>
                        <span>Um consultor pode trazer a solução perfeita, mas se o cliente não aplica, nada muda.</span>
                      </li>
                    </ul>
                  </div>

                  <p className="font-medium text-white">Durante a manhã de sábado, você vai começar a enxergar com muita clareza:</p>
                  
                  <ul className="space-y-2 pl-4 border-l border-white">
                    <li>por que conhecimento técnico, sozinho, raramente é suficiente para gerar transformação real nas pessoas</li>
                    <li>por que alguns profissionais conseguem fazer clientes, pacientes ou equipes realmente avançarem</li>
                    <li>e por que outros continuam entregando muito… mas vendo pouco resultado acontecer</li>
                  </ul>

                  <p className="italic text-white mt-6">Esse primeiro encontro vai abrir uma lente completamente nova sobre como seres humanos realmente funcionam.</p>
                </div>
              </div>

              {/* Sunday */}
              <div className="bg-white/10 p-8 md:p-12 rounded-2xl border border-white/10 relative overflow-hidden group hover:border-brand-gold/30 transition-colors">
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-gold transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500"></div>
                
                <h3 className="text-[30px] md:text-[36px] font-serif text-brand-gold mb-2">Domingo, 29 de março</h3>
                <p className="text-[16px] md:text-sm text-white uppercase tracking-wider mb-8 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> das 9h às 12h
                </p>

                <div className="space-y-6 text-white font-light leading-relaxed text-[16px] text-left">
                  <p>Se o sábado é o momento em que você entende o que estava faltando, o domingo será onde começamos a construir essa habilidade na prática.</p>
                  
                  <p>Porque entender comportamento humano não é apenas uma teoria interessante. É uma competência que muda completamente a forma como as pessoas respondem a você.</p>
                  
                  <p className="font-medium text-white mt-8">No domingo você vai começar a enxergar com muito mais clareza:</p>
                  
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-4">
                    <ul className="space-y-4">
                      <li className="flex gap-3 items-start">
                        <span className="text-brand-gold mt-1">✦</span>
                        <span>Como identificar o que realmente move o comportamento das pessoas</span>
                      </li>
                      <li className="flex gap-3 items-start">
                        <span className="text-brand-gold mt-1">✦</span>
                        <span>Por que algumas orientações geram adesão… enquanto outras são ignoradas</span>
                      </li>
                      <li className="flex gap-3 items-start">
                        <span className="text-brand-gold mt-1">✦</span>
                        <span>Como fazer clientes, pacientes ou equipes realmente aplicarem aquilo que você propõe</span>
                      </li>
                      <li className="flex gap-3 items-start">
                        <span className="text-brand-gold mt-1">✦</span>
                        <span>E como transformar conhecimento técnico em resultado concreto nas pessoas</span>
                      </li>
                    </ul>
                  </div>

                  <p>Quando essa habilidade começa a aparecer, algo muito interessante acontece. Sua técnica deixa de ser apenas orientação. <strong className="text-white font-medium">Ela passa a gerar transformação.</strong></p>
                  
                  <p>As pessoas passam a ter mais resultado com o seu trabalho. E quando as pessoas têm mais resultado com você, três coisas acontecem naturalmente:</p>
                  
                  <div className="flex flex-col gap-2 text-brand-gold font-medium">
                    <span>1. Elas permanecem mais tempo.</span>
                    <span>2. Elas indicam você para outras pessoas.</span>
                    <span>3. E o valor do seu trabalho cresce.</span>
                  </div>

                  <p className="italic text-white mt-6">É por isso que entender comportamento humano se tornou uma das habilidades mais valiosas da atualidade. Não porque ela substitui a sua técnica. Mas porque ela faz a sua técnica finalmente funcionar no mundo real.</p>
                </div>
              </div>
            </div>
            <div className="text-center mt-12">
              <button className="bg-gradient-to-r from-[#966E16] to-[#D6B865] hover:from-[#7d5c12] hover:to-[#c4a855] text-white font-bold text-[16px] px-10 py-5 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(207,168,97,0.3)] uppercase tracking-wider">
                QUERO PARTICIPAR DO WORKSHOP!
              </button>
            </div>
          </div>
        </section>

        {/* 5ª DOBRA - Target Audience */}
        <section className="pt-10 pb-10 md:pt-16 md:pb-16 px-6 bg-white">
          <div className="max-w-[360px] md:max-w-[1140px] mx-auto">
          <h2 className="text-3xl md:text-[40px] font-serif text-center text-[#081E3B] mb-4 md:mb-10">
            Para quem é o <span className="italic text-brand-gold">Workshop<br className="md:hidden"/> A Habilidade de Ouro?</span>
          </h2>

          <p className="text-[16px] md:text-xl text-center text-[#081E3B]/80 mb-6 md:mb-12">Ele é especialmente para você que:</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-16">
            <div className="flex flex-col items-start gap-4 bg-[#081E3B]/5 p-6 rounded-xl border border-[#CED2D8]">
              <CheckCircle2 className="w-6 h-6 text-brand-gold shrink-0" />
              <p className="text-[16px] md:text-lg text-[#081E3B]/80 leading-[1.4]">
                <strong className="text-[#081E3B] font-medium">É profissional autônomo ou especialista</strong> e sente que poderia gerar muito mais resultado nos seus clientes se soubesse lidar melhor com o comportamento das pessoas
              </p>
            </div>

            <div className="flex flex-col items-start gap-4 bg-[#081E3B]/5 p-6 rounded-xl border border-[#CED2D8]">
              <CheckCircle2 className="w-6 h-6 text-brand-gold shrink-0" />
              <p className="text-[16px] md:text-lg text-[#081E3B]/80 leading-[1.4]">
                <strong className="text-[#081E3B] font-medium">É líder ou gestor</strong> e percebe que muitas vezes o desafio não é ter uma boa estratégia, é fazer as pessoas realmente executarem
              </p>
            </div>

            <div className="flex flex-col items-start gap-4 bg-[#081E3B]/5 p-6 rounded-xl border border-[#CED2D8]">
              <CheckCircle2 className="w-6 h-6 text-brand-gold shrink-0" />
              <p className="text-[16px] md:text-lg text-[#081E3B]/80 leading-[1.4]">
                <strong className="text-[#081E3B] font-medium">Trabalha diretamente com pessoas</strong> (atendendo, liderando, orientando ou ensinando) e quer desenvolver uma habilidade que transforma conhecimento em resultado real nas pessoas.
              </p>
            </div>
          </div>

          <p className="text-[16px] md:text-xl text-center text-[#081E3B] font-medium italic border-y border-brand-gold py-8 w-fit mx-auto">
            Se você sente que existe uma metade da sua profissão que ninguém nunca te ensinou,<br/> é exatamente isso que vamos explorar juntos nessa imersão!
          </p>
          </div>
        </section>

        {/* 6ª DOBRA - Offer */}
        <section className="pt-[280px] pb-10 md:py-24 px-6 bg-brand-navy bg-[url('/assets/BG%20OFERTA%20MOBILE.png')] md:bg-[url('/assets/BG%20OFERTA%20DESKTOP.png')] bg-cover bg-top md:bg-[center_bottom_-50px] bg-no-repeat">
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

            <div className="flex items-center justify-center gap-4 mb-3">
              <p className="text-white uppercase tracking-widest text-[14px] md:text-sm text-center font-bold">Tudo isso<br/>por apenas:</p>
              <div className="text-7xl md:text-8xl font-serif text-brand-gold drop-shadow-lg flex items-center">
                <span className="text-4xl md:text-4xl mr-1">R$</span>97
              </div>
            </div>

            <button className="w-full md:w-auto bg-gradient-to-r from-[#966E16] to-[#D6B865] hover:from-[#7d5c12] hover:to-[#c4a855] text-white font-bold text-[14px] md:text-[16px] px-6 md:px-12 py-4 md:py-6 rounded-lg whitespace-nowrap transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(207,168,97,0.3)] uppercase tracking-wider">
              Garantir minha vaga agora
            </button>
          </div>
          </div>
        </section>

        {/* 7ª DOBRA - Recordings Objection */}
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

        {/* 8ª DOBRA - Support */}
        <section className="py-10 md:py-16 px-6 bg-white/5 text-center">
          <h2 className="text-3xl md:text-[40px] font-serif text-white mb-6">
            Tem alguma dúvida?
          </h2>
          <p className="text-white text-[16px] mb-8">É só tocar no botão abaixo<br className="md:hidden"/> e falar com meu time:</p>
          <button className="bg-gradient-to-r from-[#0B6D40] to-[#0AD778] hover:from-[#095a35] hover:to-[#08c06a] text-white font-bold text-[14px] md:text-[16px] px-6 md:px-10 py-5 rounded-lg transition-all duration-300 transform hover:scale-105 uppercase tracking-wider flex items-center gap-3 mx-auto whitespace-nowrap">
            <img src="/assets/WHATSAPP BRANCO.svg" alt="" className="h-6 w-auto" />
            Falar com o Suporte no WhatsApp
          </button>
        </section>

        {/* 9ª DOBRA - FAQ */}
        <section className="py-10 md:py-16 px-6 max-w-[360px] md:max-w-[1140px] mx-auto">
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
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6 text-center text-sm text-white/40">
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

