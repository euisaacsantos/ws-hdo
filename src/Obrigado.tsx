import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';

const QUESTIONS = [
  {
    key: 'faixa_etaria',
    question: 'Qual é a sua faixa etária?',
    options: ['De 18 a 24 anos', 'De 25 a 34 anos', 'De 35 a 44 anos', '45 a 54 anos', '55+'],
  },
  {
    key: 'genero',
    question: 'Qual é o seu gênero?',
    options: ['Masculino', 'Feminino', 'Prefiro não responder'],
  },
  {
    key: 'trabalho',
    question: 'Qual dessas opções melhor descreve o seu trabalho hoje?',
    options: [
      'Sou autônoma(o) / profissional liberal',
      'Sou empresária(o) / dona(o) de negócio',
      'Líder / gestor(a) no corporativo',
      'Consultor(a) / Mentor(a)',
    ],
  },
  {
    key: 'renda',
    question: 'Qual é a sua faixa de renda mensal?',
    options: ['Até R$ 3.000', 'R$ 3.000 a R$ 7.000', 'R$ 7.000 a R$ 15.000', 'R$ 15.000 a R$ 20.000', 'Acima de R$ 20.000'],
  },
  {
    key: 'desafio',
    question: 'Hoje, qual dessas situações mais representa um desafio no seu trabalho?',
    options: [
      'As pessoas não aplicam o que eu oriento',
      'Falta de consistência / disciplina das pessoas',
      'Dificuldade de engajar / motivar equipe ou clientes',
      'Sinto que meu trabalho não é valorizado como deveria',
      'Dificuldade em me posicionar / ser respeitada(o)',
    ],
  },
  {
    key: 'objetivo',
    question: 'O que você mais quer desenvolver no Workshop: A Habilidade de Ouro?',
    options: [
      'Fazer as pessoas aplicarem mais o que eu oriento',
      'Gerar mais resultado nos meus clientes / equipe',
      'Ser mais valorizada(o) profissionalmente',
      'Aprender mais sobre comportamento humano',
      'Melhorar minha comunicação / influência',
    ],
  },
  {
    key: 'experiencia',
    question: 'Você já estudou comportamento humano antes?',
    options: ['Nunca', 'Já tive contato superficial', 'Já estudei um pouco', 'Já estudei bastante'],
  },
];

export default function Obrigado() {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const questionRef = useRef<HTMLDivElement>(null);

  const totalSteps = QUESTIONS.length;
  const progress = submitted ? 100 : Math.round((currentStep / totalSteps) * 100);

  useEffect(() => {
    if (questionRef.current && currentStep > 0 && currentStep < totalSteps) {
      questionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentStep, totalSteps]);

  function handleSelect(key: string, value: string) {
    setAnswers((prev) => ({ ...prev, [key]: value }));

    if (currentStep < totalSteps - 1) {
      setTimeout(() => setCurrentStep((prev) => prev + 1), 400);
    } else {
      // Last question — submit
      setTimeout(() => {
        const finalAnswers = { ...answers, [key]: value };
        const payload = JSON.stringify(finalAnswers);
        const blob = new Blob([payload], { type: 'application/json' });

        if (navigator.sendBeacon) {
          navigator.sendBeacon('/api/pesquisa', blob);
        } else {
          fetch('/api/pesquisa', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: payload,
            keepalive: true,
          }).catch(() => {});
        }

        setSubmitted(true);
      }, 400);
    }
  }

  const current = QUESTIONS[currentStep];

  return (
    <div className="min-h-screen bg-brand-navy text-white font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#19427B] to-[#061933] border-b border-white/10 py-4 px-4">
        <div className="max-w-[360px] md:max-w-[800px] mx-auto flex justify-center">
          <img src="/assets/LOGO HDO BRANCO.svg" alt="Workshop A Habilidade de Ouro" className="h-10 md:h-14 w-auto" />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white/10 h-1.5">
        <div
          className="h-full bg-gradient-to-r from-[#966E16] to-[#D6B865] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <main className="max-w-[360px] md:max-w-[800px] mx-auto px-4 py-10 md:py-16">
        {/* Confirmation */}
        <div className="text-center mb-10 md:mb-14">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#966E16] to-[#D6B865] flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-[28px] md:text-[40px] font-serif leading-tight mb-4">
            Sua inscrição para o Workshop está quase finalizada
          </h1>
          <p className="text-[16px] md:text-xl text-white/70">
            Falta poucos passos para você finalizar sua inscrição.
          </p>
        </div>

        {!submitted ? (
          <>
            <div className="border-t border-white/10 pt-8 mb-8">
              <p className="text-[18px] md:text-2xl font-serif text-brand-gold text-center">
                Responda as perguntas abaixo:
              </p>
            </div>

            {/* Question Card */}
            <div ref={questionRef} className="border border-white/10 rounded-2xl bg-white/5 p-6 md:p-8">
              <p className="text-[16px] md:text-lg text-white font-medium mb-5">
                <span className="text-brand-gold mr-2">{currentStep + 1}.</span>
                {current.question}
              </p>
              <div className="space-y-2">
                {current.options.map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => handleSelect(current.key, opt)}
                    className={`w-full text-left px-4 py-3.5 rounded-lg text-[14px] md:text-[15px] transition-all duration-200 border ${
                      answers[current.key] === opt
                        ? 'bg-gradient-to-r from-[#966E16] to-[#D6B865] text-white border-transparent scale-[1.01]'
                        : 'bg-white/5 text-white border-white/10 hover:border-brand-gold/40 hover:bg-white/10'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12 border border-white/10 rounded-2xl bg-white/5 px-6">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#966E16] to-[#D6B865] flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-[24px] md:text-[32px] font-serif mb-4">
              Recebemos suas respostas!
            </h2>
            <p className="text-white/70 text-[16px] md:text-lg mb-8 leading-relaxed">
              Agora toque no botão abaixo e entre no nosso<br className="hidden md:inline" /> grupo de alunos para receber todos os avisos<br className="hidden md:inline" /> e materiais do workshop:
            </p>
            <a
              href="https://LINK-DO-GRUPO-AQUI"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#0B6D40] to-[#0AD778] hover:from-[#095a35] hover:to-[#08c06a] text-white font-bold text-[14px] md:text-[16px] px-8 py-5 rounded-lg transition-all duration-300 transform hover:scale-105 uppercase tracking-wider"
            >
              <img src="/assets/WHATSAPP BRANCO.svg" alt="" className="h-6 w-auto" />
              Entrar no grupo de alunos
            </a>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6 text-center text-sm text-white/40">
        <p>Copyright © 2026 Carol Rache<br className="md:hidden" /> Todos os direitos reservados</p>
      </footer>
    </div>
  );
}
