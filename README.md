# PID Tools - Processamento de Imagens Digitais

Ferramenta web moderna para processamento digital de imagens com interface minimalista e intuitiva.

## 🚀 Tecnologias

- **React 18** com **TypeScript**
- **Vite** - Build tool rápido e moderno
- **Material-UI (MUI)** - Componentes de UI
- **Zustand** - Gerenciamento de estado
- **React Router** - Navegação entre páginas
- **Material Icons** - Ícones

## 📁 Estrutura do Projeto

```
src/
├── assets/             # Logos e ícones globais
├── components/         # Componentes reutilizáveis (Atomic Design)
│   ├── atoms/          # Componentes básicos (Slider, Input, Badge)
│   ├── molecules/      # Componentes compostos (SidebarItem, ThemeToggler)
│   ├── organisms/      # Componentes complexos (Sidebar, ImageCanvas)
│   └── templates/      # Layouts (MainLayout)
├── hooks/              # Custom hooks (useImageFilter)
├── pages/              # Páginas de cada filtro
├── store/              # Zustand store (gerenciamento de estado)
├── styles/             # Configuração de tema (MUI)
└── utils/              # Utilitários de processamento de imagem
```

## 🎨 Filtros Disponíveis

1. **Marr-Hildreth** - Detecção de bordas com LoG
   - Parâmetros: Sigma, Threshold

2. **Canny** - Detector de bordas multi-estágio
   - Parâmetros: Sigma, Low Threshold, High Threshold

3. **Filtros Box** - Suavização com kernels
   - Opções: 2x2, 3x3, 5x5, 7x7

4. **Cadeia de Freeman** - Codificação de contornos
   - Parâmetros: Threshold

5. **Watershed** - Segmentação baseada em marcadores
   - Parâmetros: Sigma

6. **Otsu** - Limiarização automática
   - Sem parâmetros (automático)

7. **Contagem** - Contagem de objetos
   - Processamento automático

8. **Segmentação** - Separação de regiões
   - Processamento automático

## 🎨 Design System

### Cores

**Light Mode:**
- Background: `#F8F9FA`
- Paper: `#FFFFFF`
- Primary: `#3B4AD3`

**Dark Mode:**
- Background: `#0F172A`
- Paper: `#1E293B`
- Primary: `#6366F1`

### Tipografia
- Fonte principal: **Urbanist**
- Fonte alternativa: **Inter**
- Border radius: `8px`

## 🛠️ Desenvolvimento

### Instalar dependências
```bash
npm install
```

### Executar em modo de desenvolvimento
```bash
npm run dev
```

### Build para produção
```bash
npm run build
```

### Preview do build
```bash
npm run preview
```

## 📦 Gerenciamento de Estado

O projeto usa **Zustand** para gerenciar:
- Tema atual (light/dark)
- Imagem original carregada
- Imagem processada
- Estado de carregamento

```typescript
// Exemplo de uso
import { useAppStore } from './store/useAppStore';

const { themeMode, toggleTheme, imageData } = useAppStore();
```

## 🎯 Padrões de Código

- **Componentes:** PascalCase (ex: `ImageCanvas`, `ParameterPanel`)
- **Funções/Hooks:** camelCase (ex: `useImageFilter`, `applyFilter`)
- **Constantes:** UPPER_SNAKE_CASE (ex: `SIDEBAR_WIDTH`)

## 🔄 Integração com Backend

O hook `useImageFilter` está preparado para integração com API backend:

```typescript
// src/hooks/useImageFilter.ts
const response = await fetch('/api/filters/' + filterType, {
  method: 'POST',
  body: JSON.stringify({ image: originalImage, ...params }),
});
```

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais - Universidade Estadual do Oeste do Paraná (UNIOESTE).
