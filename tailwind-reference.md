# Tailwind CSS - Referência Completa

## Layout
- `container` - Cria um container com largura máxima responsiva e centralizado
- `flex` - Define display: flex (para layouts flexíveis)
- `grid` - Define display: grid (para layouts em grade)
- `block` - Define display: block (elemento ocupa linha inteira)
- `inline` - Define display: inline (elemento fica na mesma linha)
- `hidden` - Esconde o elemento (display: none)

## Flexbox
- `flex-row` - Itens em linha horizontal (padrão)
- `flex-col` - Itens em coluna vertical
- `justify-start` - Alinha itens no início do eixo principal
- `justify-center` - Centraliza itens no eixo principal
- `justify-between` - Distribui itens com espaço entre eles
- `justify-end` - Alinha itens no final do eixo principal
- `items-start` - Alinha itens no topo do eixo transversal
- `items-center` - Centraliza itens no eixo transversal
- `items-end` - Alinha itens no final do eixo transversal
- `gap-1` - Espaço de 0.25rem (4px) entre itens
- `gap-2` - Espaço de 0.5rem (8px) entre itens
- `gap-4` - Espaço de 1rem (16px) entre itens
- `gap-8` - Espaço de 2rem (32px) entre itens

## Spacing (Margin/Padding)
- `m-4` - Margin de 1rem (16px) em todos os lados
- `mt-4` - Margin-top de 1rem (16px) apenas no topo
- `mb-4` - Margin-bottom de 1rem (16px) apenas embaixo
- `mx-4` - Margin horizontal (esquerda e direita) de 1rem
- `my-4` - Margin vertical (topo e embaixo) de 1rem
- `p-4` - Padding de 1rem (16px) em todos os lados
- `pt-4` - Padding-top de 1rem apenas no topo
- `pb-4` - Padding-bottom de 1rem apenas embaixo
- `px-4` - Padding horizontal (esquerda e direita) de 1rem
- `py-4` - Padding vertical (topo e embaixo) de 1rem
- Valores: 0=0px, 1=4px, 2=8px, 3=12px, 4=16px, 5=20px, 6=24px, 8=32px, 10=40px, 12=48px, 16=64px, 20=80px, 24=96px, 32=128px

## Tamanhos
- `w-full` - Largura de 100% do container pai
- `w-1/2` - Largura de 50% do container pai
- `w-screen` - Largura de 100vw (largura total da tela)
- `h-full` - Altura de 100% do container pai
- `h-screen` - Altura de 100vh (altura total da tela)
- `h-64` - Altura fixa de 16rem (256px)
- `max-w-sm` - Largura máxima de 24rem (384px)
- `max-w-md` - Largura máxima de 28rem (448px)
- `max-w-lg` - Largura máxima de 32rem (512px)
- `max-w-xl` - Largura máxima de 36rem (576px)
- `max-w-7xl` - Largura máxima de 80rem (1280px)
- `min-h-screen` - Altura mínima de 100vh (garante pelo menos altura da tela)

## Tipografia
- `text-xs` - Tamanho de fonte 0.75rem (12px)
- `text-sm` - Tamanho de fonte 0.875rem (14px)
- `text-base` - Tamanho de fonte 1rem (16px) - padrão
- `text-lg` - Tamanho de fonte 1.125rem (18px)
- `text-xl` - Tamanho de fonte 1.25rem (20px)
- `text-2xl` - Tamanho de fonte 1.5rem (24px)
- `text-3xl` - Tamanho de fonte 1.875rem (30px)
- `font-light` - Peso da fonte 300 (leve)
- `font-normal` - Peso da fonte 400 (normal)
- `font-medium` - Peso da fonte 500 (médio)
- `font-semibold` - Peso da fonte 600 (semi-negrito)
- `font-bold` - Peso da fonte 700 (negrito)
- `text-left` - Alinha texto à esquerda
- `text-center` - Centraliza texto
- `text-right` - Alinha texto à direita
- `text-gray-900` - Cor do texto cinza muito escuro
- `text-blue-500` - Cor do texto azul médio
- `text-white` - Cor do texto branco

## Cores (Background)
- `bg-white` - Fundo branco (#ffffff)
- `bg-black` - Fundo preto (#000000)
- `bg-transparent` - Fundo transparente
- `bg-gray-50` - Fundo cinza muito claro
- `bg-gray-100` - Fundo cinza claro
- `bg-gray-900` - Fundo cinza muito escuro
- `bg-blue-500` - Fundo azul médio
- `bg-red-500` - Fundo vermelho médio
- `bg-green-500` - Fundo verde médio

## Bordas
- `border` - Adiciona borda de 1px em todos os lados
- `border-2` - Adiciona borda de 2px em todos os lados
- `border-4` - Adiciona borda de 4px em todos os lados
- `border-gray-300` - Define cor da borda como cinza claro
- `border-blue-500` - Define cor da borda como azul médio
- `rounded` - Bordas arredondadas de 0.25rem (4px)
- `rounded-md` - Bordas arredondadas de 0.375rem (6px)
- `rounded-lg` - Bordas arredondadas de 0.5rem (8px)
- `rounded-full` - Bordas totalmente arredondadas (círculo/pílula)

## Sombras
- `shadow-sm` - Sombra pequena e sutil
- `shadow` - Sombra padrão média
- `shadow-md` - Sombra média-grande
- `shadow-lg` - Sombra grande
- `shadow-xl` - Sombra extra grande

## Hover/Focus (Estados Interativos)
- `hover:bg-blue-600` - Muda fundo para azul escuro quando mouse passa por cima
- `hover:text-white` - Muda cor do texto para branco no hover
- `focus:outline-none` - Remove contorno padrão quando elemento está focado
- `focus:ring-2` - Adiciona anel de foco de 2px quando elemento está focado
- `focus:ring-blue-500` - Define cor do anel de foco como azul

## Transições (Animações)
- `transition` - Habilita transições suaves para mudanças de propriedades
- `duration-200` - Duração da transição de 200ms
- `duration-300` - Duração da transição de 300ms
- `ease-in` - Transição começa devagar e acelera
- `ease-out` - Transição começa rápido e desacelera
- `ease-in-out` - Transição começa e termina devagar

## Responsivo (Breakpoints)
- `sm:` - Aplica estilo em telas >= 640px (celulares grandes)
- `md:` - Aplica estilo em telas >= 768px (tablets)
- `lg:` - Aplica estilo em telas >= 1024px (laptops)
- `xl:` - Aplica estilo em telas >= 1280px (desktops)
- Exemplo: `md:flex-row` - Usa flex-row apenas em telas médias ou maiores

## Exemplos Comuns

### Botão
```
className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
```

### Card
```
className="p-6 bg-white rounded-lg shadow-md border border-gray-200"
```

### Input
```
className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
```

### Container Centralizado
```
className="container mx-auto px-4 max-w-7xl"
```
