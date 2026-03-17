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
      <div className="bg-black/40 border-b border-white/10 py-3 px-4 text-center text-xs md:text-sm tracking-widest uppercase flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 z-50 relative">
        <span className="opacity-80">28 e 29 de março, às 09h</span>
        <span className="hidden md:inline opacity-40">|</span>
        <span className="text-brand-gold font-medium">
          O lote de ingressos encerra em {formatTime(timeLeft.days)}d {formatTime(timeLeft.hours)}h {formatTime(timeLeft.minutes)}m {formatTime(timeLeft.seconds)}s
        </span>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[100px] translate-y-1/3"></div>
      </div>

      <main className="relative z-10">
        
        {/* 1ª DOBRA - Hero */}
        <section className="pt-20 pb-32 px-6 max-w-5xl mx-auto text-center flex flex-col items-center">
          <div className="mb-12 inline-block border border-white/20 px-6 py-2 rounded-full backdrop-blur-sm bg-white/5 uppercase tracking-[0.2em] text-xs font-semibold text-white/80">
            Workshop A Habilidade de Ouro
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.1] mb-8 max-w-4xl">
            O problema da sua vida profissional já não é mais <span className="italic text-brand-gold">falta de competência.</span><br/>
            É nunca ter aprendido a moldar o comportamento humano.
          </h1>
          
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mb-12 leading-relaxed font-light">
            Participe de um treinamento de 2 dias para desenvolver a habilidade que a faculdade nunca te ensinou, mas é a que determina o quanto sua técnica realmente gera resultado: <strong className="text-white font-medium">a habilidade de guiar pessoas.</strong>
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm md:text-base text-white/80 font-medium tracking-wide">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brand-gold" />
              28 e 29 de março
            </div>
            <div className="flex items-center gap-2">
              <MonitorPlay className="w-5 h-5 text-brand-gold" />
              Ao vivo
            </div>
            <div className="flex items-center gap-2">
              <MonitorPlay className="w-5 h-5 text-brand-gold" />
              100% online
            </div>
          </div>

          <button className="bg-brand-gold hover:bg-brand-gold-hover text-brand-navy font-bold text-lg md:text-xl px-10 py-5 rounded-sm transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(207,168,97,0.3)] uppercase tracking-wider">
            Quero garantir minha vaga
          </button>
        </section>

        {/* 2ª DOBRA - Mentors */}
        <section className="py-24 px-6 bg-brand-navy-light/30 border-y border-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif text-center text-white mb-16">
              Conheça os seus mentores no<br/>
              <span className="italic text-brand-gold">Workshop: A Habilidade de Ouro</span>
            </h2>

            {/* Mentor Grid - Replicating the visual style of the reference */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              
              {/* Main Mentor (Carol Rache - implied from reference image structure) */}
              <div className="md:col-span-3 flex flex-col md:flex-row items-center gap-12 mb-12">
                <div className="w-full md:w-1/2">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" 
                    alt="Carol Rache" 
                    className="rounded-lg shadow-2xl w-full object-cover aspect-[4/3] md:aspect-auto md:h-[500px] grayscale hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="w-full md:w-1/2 space-y-6">
                  <h3 className="text-4xl font-serif text-white">Carol Rache</h3>
                  <p className="text-white/70 leading-relaxed text-lg">
                    Mentora de Desenvolvimento Pessoal. Transbordou transformação para milhares de pessoas, que tiveram suas vidas destravadas.
                  </p>
                  <p className="text-white/70 leading-relaxed text-lg">
                    Acelerou e descomplicou o processo de cura emocional de outras pessoas, alcançando não só realização, mas também resultados extraordinários.
                  </p>
                </div>
              </div>

              {/* Other Mentors */}
              <div className="space-y-6">
                 <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600" 
                    alt="Mentor 1" 
                    className="rounded-lg shadow-xl w-full object-cover aspect-[3/4] grayscale hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <h3 className="text-2xl font-serif text-white">Roberto Patrus</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Filósofo, psicólogo, autor renomado e referência em comportamento humano. Combina profundidade conceitual com linguagem acessível.
                  </p>
              </div>

              <div className="space-y-6">
                 <img 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600" 
                    alt="Mentor 2" 
                    className="rounded-lg shadow-xl w-full object-cover aspect-[3/4] grayscale hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <h3 className="text-2xl font-serif text-white">Paty Perdigão</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Especialista em desenvolvimento humano, dedicou mais de 15 anos à área de Pessoas & Cultura em cargos de liderança.
                  </p>
              </div>

              <div className="space-y-6">
                 <img 
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600" 
                    alt="Eduarda Maia" 
                    className="rounded-lg shadow-xl w-full object-cover aspect-[3/4] grayscale hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <h3 className="text-2xl font-serif text-white">Eduarda Maia</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Atua há 5 anos ajudando profissionais a se posicionarem com clareza, estratégia e autoridade. É professora nos programas de desenvolvimento pessoal e profissional da Carol Rache, onde já impactou milhares de alunas.
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    No Workshop A Habilidade de Ouro, Eduarda vai te conduzir na construção da sua clareza, da sua presença e da voz que você precisa assumir para destravar um novo nível profissional.
                  </p>
              </div>

            </div>
          </div>
        </section>

        {/* 3ª DOBRA - The Gap */}
        <section className="py-24 px-6 max-w-4xl mx-auto text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-10 text-center">
            O que essas pessoas vão te ensinar nos dias 28 e 29 de março:
          </h2>
          
          <div className="space-y-8 text-lg text-white/70 leading-relaxed font-light">
            <p>
              Durante dois encontros ao vivo, das 9h às 12h (horário de Brasília), nós vamos mergulhar exatamente na habilidade que a maioria dos profissionais nunca aprendeu, mas que determina o quanto sua técnica realmente gera resultados.
            </p>
            <p className="text-xl text-white font-medium border-l-2 border-brand-gold pl-6 py-2">
              Porque existe um detalhe que quase ninguém percebe durante a formação profissional: você aprende o que fazer. Mas nunca aprende <span className="text-brand-gold italic">como fazer as pessoas realmente aplicarem</span> aquilo que você propõe.
            </p>
            <p>
              E é exatamente essa lacuna que vamos começar a preencher juntos.
            </p>
            <p>
              Ao longo desse final de semana, você vai começar a entender por que alguns profissionais extremamente competentes continuam lutando para crescer… enquanto outros conseguem gerar mais resultado, mais reconhecimento e mais valor com o mesmo conhecimento técnico.
            </p>
          </div>
        </section>

        {/* 4ª DOBRA - Schedule */}
        <section className="py-24 px-6 bg-white/5">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif text-center text-white mb-16">
              Cronograma oficial
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Saturday */}
              <div className="bg-brand-navy-light/50 p-8 md:p-12 rounded-2xl border border-white/10 relative overflow-hidden group hover:border-brand-gold/30 transition-colors">
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-gold transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500"></div>
                
                <h3 className="text-2xl font-serif text-brand-gold mb-2">Sábado, 28 de março</h3>
                <p className="text-sm text-white/50 uppercase tracking-wider mb-8 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> das 9h às 12h
                </p>

                <div className="space-y-6 text-white/70 font-light leading-relaxed">
                  <p>No primeiro encontro, nós vamos começar investigando aquilo que quase nunca é discutido na formação profissional: o comportamento humano como o verdadeiro motor dos resultados.</p>
                  
                  <p>Você vai perceber que o resultado do seu trabalho não depende apenas da qualidade daquilo que você entrega. Ele também depende do que as pessoas fazem com aquilo que você entrega.</p>
                  
                  <ul className="space-y-4 my-8">
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

                  <p className="font-medium text-white">Durante a manhã de sábado, você vai começar a enxergar com muita clareza:</p>
                  
                  <ul className="space-y-2 pl-4 border-l border-white/20">
                    <li>por que conhecimento técnico, sozinho, raramente é suficiente para gerar transformação real nas pessoas</li>
                    <li>por que alguns profissionais conseguem fazer clientes, pacientes ou equipes realmente avançarem</li>
                    <li>e por que outros continuam entregando muito… mas vendo pouco resultado acontecer</li>
                  </ul>

                  <p className="italic text-white/90 mt-6">Esse primeiro encontro vai abrir uma lente completamente nova sobre como seres humanos realmente funcionam.</p>
                </div>
              </div>

              {/* Sunday */}
              <div className="bg-brand-navy-light/50 p-8 md:p-12 rounded-2xl border border-white/10 relative overflow-hidden group hover:border-brand-gold/30 transition-colors">
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-gold transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500"></div>
                
                <h3 className="text-2xl font-serif text-brand-gold mb-2">Domingo, 29 de março</h3>
                <p className="text-sm text-white/50 uppercase tracking-wider mb-8 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> das 9h às 12h
                </p>

                <div className="space-y-6 text-white/70 font-light leading-relaxed">
                  <p>Se o sábado é o momento em que você entende o que estava faltando, o domingo será onde começamos a construir essa habilidade na prática.</p>
                  
                  <p>Porque entender comportamento humano não é apenas uma teoria interessante. É uma competência que muda completamente a forma como as pessoas respondem a você.</p>
                  
                  <p className="font-medium text-white mt-8">No domingo você vai começar a enxergar com muito mais clareza:</p>
                  
                  <ul className="space-y-4 my-6 pl-4 border-l border-white/20">
                    <li>como identificar o que realmente move o comportamento das pessoas</li>
                    <li>por que algumas orientações geram adesão… enquanto outras são ignoradas</li>
                    <li>como fazer clientes, pacientes ou equipes realmente aplicarem aquilo que você propõe</li>
                    <li>e como transformar conhecimento técnico em resultado concreto nas pessoas</li>
                  </ul>

                  <p>Quando essa habilidade começa a aparecer, algo muito interessante acontece. Sua técnica deixa de ser apenas orientação. <strong className="text-white font-medium">Ela passa a gerar transformação.</strong></p>
                  
                  <p>As pessoas passam a ter mais resultado com o seu trabalho. E quando as pessoas têm mais resultado com você, três coisas acontecem naturalmente:</p>
                  
                  <div className="flex flex-col gap-2 text-brand-gold font-medium">
                    <span>1. Elas permanecem mais tempo.</span>
                    <span>2. Elas indicam você para outras pessoas.</span>
                    <span>3. E o valor do seu trabalho cresce.</span>
                  </div>

                  <p className="italic text-white/90 mt-6">É por isso que entender comportamento humano se tornou uma das habilidades mais valiosas da atualidade. Não porque ela substitui a sua técnica. Mas porque ela faz a sua técnica finalmente funcionar no mundo real.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5ª DOBRA - Target Audience */}
        <section className="py-24 px-6 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif text-center text-white mb-16">
            Para quem é o <span className="italic text-brand-gold">Workshop A Habilidade de Ouro?</span>
          </h2>
          
          <p className="text-xl text-center text-white/80 mb-12">Ele é especialmente para você que:</p>

          <div className="space-y-6 mb-16">
            <div className="flex items-start gap-4 bg-white/5 p-6 rounded-xl border border-white/10">
              <CheckCircle2 className="w-6 h-6 text-brand-gold shrink-0 mt-1" />
              <p className="text-lg text-white/80 leading-relaxed">
                <strong className="text-white font-medium">É profissional autônomo ou especialista</strong> e sente que poderia gerar muito mais resultado nos seus clientes se soubesse lidar melhor com o comportamento das pessoas
              </p>
            </div>
            
            <div className="flex items-start gap-4 bg-white/5 p-6 rounded-xl border border-white/10">
              <CheckCircle2 className="w-6 h-6 text-brand-gold shrink-0 mt-1" />
              <p className="text-lg text-white/80 leading-relaxed">
                <strong className="text-white font-medium">É líder ou gestor</strong> e percebe que muitas vezes o desafio não é ter uma boa estratégia, é fazer as pessoas realmente executarem
              </p>
            </div>
            
            <div className="flex items-start gap-4 bg-white/5 p-6 rounded-xl border border-white/10">
              <CheckCircle2 className="w-6 h-6 text-brand-gold shrink-0 mt-1" />
              <p className="text-lg text-white/80 leading-relaxed">
                <strong className="text-white font-medium">Trabalha diretamente com pessoas</strong> (atendendo, liderando, orientando ou ensinando) e quer desenvolver uma habilidade que transforma conhecimento em resultado real nas pessoas.
              </p>
            </div>
          </div>

          <p className="text-xl text-center text-white font-medium italic border-y border-white/10 py-8">
            Se você sente que existe uma metade da sua profissão que ninguém nunca te ensinou, é exatamente isso que vamos explorar juntos nessa imersão!
          </p>
        </section>

        {/* 6ª DOBRA - Offer */}
        <section className="py-24 px-6 bg-gradient-to-b from-transparent to-brand-navy-light/50">
          <div className="max-w-3xl mx-auto bg-brand-navy-light border border-brand-gold/30 rounded-3xl p-8 md:p-16 text-center shadow-[0_0_50px_rgba(207,168,97,0.1)] relative overflow-hidden">
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent"></div>
            
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-12">
              Ao garantir sua vaga agora, você vai receber:
            </h2>

            <div className="space-y-6 text-left max-w-xl mx-auto mb-16">
              <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                <CheckCircle2 className="w-6 h-6 text-brand-gold shrink-0" />
                <span className="text-lg text-white/90">2 encontros ao vivo sobre como aplicar comportamento humano na sua carreira</span>
              </div>
              <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                <CheckCircle2 className="w-6 h-6 text-brand-gold shrink-0" />
                <span className="text-lg text-white/90">6 horas de imersão prática</span>
              </div>
              <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                <CheckCircle2 className="w-6 h-6 text-brand-gold shrink-0" />
                <span className="text-lg text-white/90">Acesso a 4 mentores indispensáveis, incluindo Carol Rache</span>
              </div>
              <div className="flex items-center gap-4 pb-4">
                <CheckCircle2 className="w-6 h-6 text-brand-gold shrink-0" />
                <span className="text-lg text-white/90">Apostila completa da Imersão, com os principais frameworks abordados durante o workshop</span>
              </div>
            </div>

            <p className="text-white/60 uppercase tracking-widest text-sm mb-4">Tudo isso por apenas:</p>
            <div className="text-6xl md:text-8xl font-serif text-brand-gold mb-12 drop-shadow-lg">
              R$ 97
            </div>

            <button className="w-full md:w-auto bg-brand-gold hover:bg-brand-gold-hover text-brand-navy font-bold text-lg md:text-xl px-12 py-6 rounded-sm transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(207,168,97,0.3)] uppercase tracking-wider">
              Garantir minha vaga agora
            </button>
          </div>
        </section>

        {/* 7ª DOBRA - Recordings Objection */}
        <section className="py-24 px-6 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-serif text-white mb-8">
            “E se eu não puder estar ao vivo?”
          </h2>
          
          <div className="space-y-6 text-lg text-white/70 leading-relaxed font-light">
            <p>
              Se você sente que esse conteúdo pode ser importante para o seu momento profissional, mas não tem certeza se conseguirá participar ao vivo nos dois dias, fique tranquila.
            </p>
            <p>
              Ao clicar no botão para garantir sua vaga, na próxima página você encontrará a opção de adicionar o <strong className="text-white font-medium">acesso às gravações completas da imersão.</strong>
            </p>
            <p>
              Esse acesso estará disponível por um valor simbólico, justamente para garantir que ninguém deixe de participar da imersão por causa de agenda.
            </p>
            <p className="italic text-white/90">
              Então, mesmo que você não consiga estar presente ao vivo, ainda assim poderá aproveitar todo o conteúdo desses dois dias.
            </p>
          </div>
        </section>

        {/* 8ª DOBRA - Support */}
        <section className="py-16 px-6 bg-white/5 text-center">
          <h2 className="text-2xl font-serif text-white mb-6">
            Tem alguma dúvida?
          </h2>
          <p className="text-white/70 mb-8">É só tocar no botão abaixo e falar com meu time:</p>
          <button className="border border-white/30 hover:border-white hover:bg-white/10 text-white font-medium px-8 py-3 rounded-full transition-all duration-300">
            Falar com o Suporte no WhatsApp
          </button>
        </section>

        {/* 9ª DOBRA - FAQ */}
        <section className="py-24 px-6 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-center text-white mb-16">
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
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>Copyright © 2026 Namah – Todos os direitos reservados</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos de uso</a>
          </div>
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
        <h3 className="text-lg font-medium text-white/90 group-hover:text-brand-gold transition-colors pr-8">{question}</h3>
        <ChevronDown className={`w-5 h-5 text-white/50 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-white/60 font-light leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

