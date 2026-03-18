# Guia Técnico de Estilo — Landing Pages

Referência construída a partir da página "Workshop A Habilidade de Ouro". Seguir estes padrões em todas as próximas páginas.

---

## 1. Layout e Grid

### Largura dos containers
- **Desktop:** `max-w-[1140px] mx-auto`
- **Mobile:** `max-w-[360px] mx-auto`
- Seções com fundo colorido ou imagem: fundo ocupa 100% da largura, conteúdo dentro do container

### Padding das dobras
- **Desktop:** `py-16` (64px)
- **Mobile:** `py-10` (40px)
- Hero: padding top maior para acomodar imagem de fundo

### Espaçamento entre head e conteúdo
- Padrão: `mb-10` (40px) no desktop, `mb-4` a `mb-6` no mobile
- Subhead para conteúdo: `mb-4` (16px)

---

## 2. Tipografia

### Fontes
- **Títulos (h1, h2, h3):** font-serif (Quincy CF / Playfair Display)
- **Textos, botões, badges:** font-sans (Gotham / Montserrat)
- **Line-height global:** 1.4 (definido no body via CSS)

### Tamanhos — Desktop

| Elemento | Tamanho | Peso | Leading |
|---|---|---|---|
| Head (h1) | 40px | serif regular | 1.0 |
| Head (h2) de seção | 40px | serif regular | — |
| Head de oferta | 32px | serif regular | 1.1 |
| Subhead | 20px | font-normal (book) | 1.3 |
| Nome destaque (mentor principal) | 48px | serif regular | — |
| Nome mentores secundários | 40px | serif regular | — |
| Subtítulos cronograma | 36px | serif regular | — |
| Texto corpo | 16px–18px (text-lg) | font-normal ou font-light | 1.4 |
| Texto corpo menor (bios) | 14px (text-sm) | font-normal | relaxed |
| Badges/etiquetas | 16px | font-normal | — |
| Botões CTA | 16px | font-bold | — |
| Cabeçalho top bar | 16px | font-bold | — |

### Tamanhos — Mobile

| Elemento | Tamanho | Observação |
|---|---|---|
| Head (h1) | 30px | leading 1.0 |
| Head (h2) de seção | text-3xl (~30px) | — |
| Head de oferta | 28px | leading 1.1 |
| Subhead | 18px | leading 1.3 |
| Texto corpo | 16px | Em todas as seções |
| Texto oferta (lista) | 14px | Mais compacto |
| Botões CTA | 14px–16px | whitespace-nowrap quando necessário |
| Cabeçalho top bar | 11px | — |
| Subtítulos cronograma | 30px | — |

### Destaques de texto
- Palavras-chave dentro de parágrafos: `font-bold` (strong)
- Frases de impacto: texto em itálico + cor accent (dourado)
- Não usar font-semibold; apenas `font-normal` (book) e `font-bold`

### Quebras de linha
- Usar `<br/>` para controlar diagramação no desktop
- Usar `<br className="md:hidden"/>` para quebras exclusivas do mobile
- Usar `<span className="hidden md:inline"><br/></span>` para quebras exclusivas do desktop

---

## 3. Componentes Visuais

### Botões CTA
- Gradiente horizontal (da esquerda para direita)
- Texto branco, font-bold, uppercase, tracking-wider
- Padding: `px-10 py-5` (desktop), `px-6 py-4` (mobile quando necessário)
- Borda: `rounded-lg`
- Hover: `hover:scale-105` + gradiente mais escuro
- Sombra: `shadow-[0_0_30px_rgba(cor,0.3)]`
- Largura: auto (desktop), pode ser `w-full` em contextos mobile

### Badges / Retângulos informativos
- Borda fina: `border` com cor contextual + `rounded-md`
- Padding: `px-4 py-2` (compacto) ou `px-4 py-4` (padrão)
- Ícone SVG à esquerda + texto ao lado
- No mobile: `w-full` empilhados verticalmente
- No desktop: `w-auto` lado a lado (`flex-wrap`)

### Boxes de destaque (listas)
- Fundo sutil: `bg-white/5`
- Borda: `border border-white/10`
- Borda arredondada: `rounded-xl`
- Padding: `p-6`
- Bullet points: ícone dourado `✦` + texto

### Cards de cronograma
- Fundo: `bg-white/10`
- Borda: `border border-white/10 rounded-2xl`
- Padding: `p-8` (mobile), `p-12` (desktop)
- Hover: `hover:border-brand-gold/30`
- Linha vertical animada: `w-1 h-full` com `scale-y-0 group-hover:scale-y-100`

### Linhas divisórias
- Fina (1px): `border-y` ou `<hr>`
- Cor contextual: dourada (`border-brand-gold`) ou branca (`border-white/20`)
- Para acompanhar largura do texto: adicionar `w-fit mx-auto`

### Contador/Timer
- Fundo: `bg-white/10`
- Padding: `px-3 py-1`
- Borda: `rounded-md`
- Separadores: `:` entre valores

### Linha decorativa no topo de cards
- `h-[1px]` com `bg-gradient-to-r from-transparent via-[cor] to-transparent`

---

## 4. Seções com fundo invertido (claro)

Quando o fundo é branco:
- Textos: cor escura (#081E3B ou contextual)
- Textos secundários: cor escura com opacidade (ex: `text-[#081E3B]/70`)
- Bordas de badges: `border-[#CED2D8]`
- Fundo de cards: `bg-[#081E3B]/5`
- Destaques bold: mesma cor escura sem opacidade

---

## 5. Biografias de Mentores

### Layout mentor principal
- Desktop: texto à esquerda, foto à direita (`flex-row`)
- Mobile: foto em cima, texto embaixo (`flex-col-reverse`)
- Gap: `gap-4` (mobile), `gap-12` (desktop)
- Foto: `object-cover`, `md:h-[600px]`, `rounded-lg shadow-2xl`

### Layout mentores secundários
- Grid de 3 colunas no desktop, 1 coluna no mobile
- Foto: `aspect-square` (mobile), `aspect-[3/4]` (desktop), `rounded-lg shadow-xl`
- Nome: 40px, font-serif
- Bio: 16px (mobile), text-sm (desktop)
- Espaçamento interno: `space-y-3` (mobile), `space-y-6` (desktop)

### Credenciais (badges)
- Layout: empilhados no mobile (`flex-col`), lado a lado no desktop (`flex-row flex-wrap`)
- Cada badge: `w-full` (mobile), `w-auto` (desktop)
- Ícone/logo + texto ao lado

---

## 6. Seção de Oferta

- Bloco com fundo escuro, borda dourada, `rounded-3xl`
- Largura reduzida: `max-w-[520px]`
- Desktop: deslocado com `ml-16`, imagem de fundo à esquerda
- Mobile: centralizado, imagem de fundo no topo com `pt-[280px]`
- Preço grande: `text-7xl` (mobile), `text-8xl` (desktop), font-serif
- Símbolo monetário menor: `text-4xl`
- "Tudo isso por apenas" ao lado do preço em flex horizontal

---

## 7. FAQ

- Perguntas: font-sans (Gotham), 16px (mobile), 20px (desktop), font-bold
- Respostas: font-sans, 16px, font-light, leading-relaxed
- Ícone chevron: animação de rotação 180° ao abrir
- Divisor: `border-b border-white/10`
- Transição: `max-h` com `transition-all duration-300`

---

## 8. Cabeçalho (Top Bar)

- Gradiente horizontal no fundo
- Desktop: conteúdo em uma linha (`flex-row`), textos 16px bold
- Mobile: conteúdo empilhado (`flex-col`), textos 11px bold
- Ícone SVG ao lado da data, proporcional ao texto
- Contador em retângulo com fundo sutil

---

## 9. Rodapé

- Borda superior: `border-t border-white/10`
- Texto centralizado, `text-sm`, opacidade reduzida
- Quebra de linha responsiva no nome

---

## 10. Imagens de Fundo

- Usar imagens diferentes para mobile e desktop
- Mobile: `bg-[url('...')]` sem prefixo
- Desktop: `md:bg-[url('...')]` com prefixo md
- Posicionamento: `bg-cover bg-center` ou `bg-top` conforme necessário
- Para espelhar fundo sem espelhar conteúdo: `style={{transform: 'scaleX(-1)'}}` na section e inverter no container interno
