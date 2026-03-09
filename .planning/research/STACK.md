# 기술 스택

**프로젝트:** n8n 워크플로우 템플릿 마켓플레이스
**조사일:** 2026-03-09
**전체 신뢰도:** HIGH

## 권장 스택

### 코어 프레임워크

| 기술 | 버전 | 용도 | 선택 이유 |
|------|------|------|-----------|
| Astro | 5.x (stable: 5.18.0) | 정적 사이트 생성 프레임워크 | 콘텐츠 중심 사이트에 최적. Content Collections로 템플릿 카탈로그 관리. Islands Architecture로 인터랙티브 다이어그램을 필요한 곳만 하이드레이션. GitHub Pages 정적 배포에 완벽 호환 |
| Tailwind CSS | 4.x (stable: 4.2.1) | 유틸리티 퍼스트 CSS 프레임워크 | v4는 CSS-first 설정으로 tailwind.config.js 불필요. @theme 디렉티브로 디자인 토큰 관리. 빌드 5x, 증분 빌드 100x 성능 향상 |
| React | 19.x | 인터랙티브 컴포넌트 (다이어그램) | React Flow가 React 의존. Astro Islands로 다이어그램 컴포넌트만 클라이언트 하이드레이션 |
| TypeScript | 5.x | 타입 안전성 | Astro Content Collections의 Zod 스키마와 연동되어 템플릿 데이터 타입 자동 추론 |

**Astro 5 vs Astro 6 결정:**

Astro 6 베타가 2026년 1월 출시되었으나, **Astro 5.x를 사용한다.** 이유:
- Astro 6은 아직 베타 상태 (2026-03-09 기준)
- Node 22+ 요구, Zod 4 업그레이드 등 브레이킹 체인지 다수
- Astro 6의 핵심 기능 (Cloudflare Workers, Live Collections)은 정적 GitHub Pages 배포에 불필요
- Astro 5.x가 완전 안정적이고, Content Collections/Islands 기능 완비

**신뢰도:** HIGH — Astro 5.18.0은 npm에서 확인된 최신 stable 버전

### 인터랙티브 다이어그램

| 기술 | 버전 | 용도 | 선택 이유 |
|------|------|------|-----------|
| @xyflow/react (React Flow) | 12.x (latest: 12.10.1) | n8n 워크플로우 다이어그램 시각화 | n8n 자체가 React Flow 기반. 커스텀 노드 타입으로 n8n 노드 스타일 재현 가능. SSR/SSG 지원. 읽기 전용 모드 구현 용이 |

**React Flow가 유일한 선택인 이유:**

| 대안 | 미채택 이유 |
|------|-------------|
| n8n Embed (iframe) | 유료 라이선스(Enterprise) 필요. 정적 사이트에서 n8n 인스턴스 연결 불가. Out of scope |
| D3.js | 로우레벨 — 노드/엣지 인터랙션을 전부 직접 구현해야 함. 개발 시간 5-10x |
| Mermaid.js | 정적 다이어그램만 가능. 커스텀 노드 스타일링 제한. n8n 느낌 불가 |
| Elk.js / Dagre | 레이아웃 엔진만 제공, 렌더링 별도 필요. React Flow + dagre 조합이 최적 |

**n8n JSON → React Flow 변환 전략:**

n8n 워크플로우 JSON의 `nodes` 배열과 `connections` 객체를 React Flow의 `Node[]`와 `Edge[]`로 변환하는 유틸리티 함수 작성. n8n 노드의 `position`, `type`, `name`을 React Flow 노드에 매핑. 읽기 전용 뷰어로 구현:

```typescript
// React Flow 읽기 전용 설정
<ReactFlow
  nodes={nodes}
  edges={edges}
  nodesDraggable={false}
  nodesConnectable={false}
  panOnDrag={true}        // 팬은 허용 (탐색 용도)
  zoomOnScroll={true}     // 줌은 허용
  elementsSelectable={false}
  nodeTypes={customN8nNodeTypes}  // n8n 스타일 커스텀 노드
  fitView
/>
```

**신뢰도:** HIGH — React Flow는 n8n이 실제 사용하는 라이브러리이고, @xyflow/react 12.10.1이 npm 확인 최신 버전

### 콘텐츠 관리

| 기술 | 버전 | 용도 | 선택 이유 |
|------|------|------|-----------|
| Astro Content Collections | Astro 5 내장 | 템플릿 카탈로그 관리 | Zod 스키마로 템플릿 메타데이터 검증. glob() 로더로 Markdown 파일 자동 수집. TypeScript 타입 자동 추론 |
| Zod | 3.x (Astro 5 내장) | 스키마 검증 | Content Collections의 핵심 의존성. 템플릿 프론트매터 타입 강제 |

**Content Collections 아키텍처:**

```
src/content/
├── config.ts              # defineCollection + Zod 스키마
├── templates/
│   ├── finance/           # 금융 워크플로우
│   │   ├── report-auto.md
│   │   └── data-monitor.md
│   ├── marketing/         # 마케팅 워크플로우
│   ├── hr/                # HR 워크플로우
│   └── devops/            # IT/DevOps 워크플로우
└── categories/
    └── categories.json    # 카테고리 메타데이터
```

**Zod 스키마 예시:**

```typescript
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const templates = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/templates' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['finance', 'marketing', 'hr', 'devops']),
    subcategory: z.string(),
    tier: z.enum(['free', 'premium']),
    price: z.number().optional(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    nodeCount: z.number(),
    estimatedTime: z.string(),
    tags: z.array(z.string()),
    requiredCredentials: z.array(z.string()).default([]),
    n8nVersion: z.string().default('1.0+'),
    ollamaRequired: z.boolean().default(false),
    workflowJson: z.string(),  // JSON 파일 경로
    thumbnail: z.string().optional(),
    publishedDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
  }),
});

export const collections = { templates };
```

**신뢰도:** HIGH — Astro 공식 문서에서 직접 확인한 API

### SEO

| 기술 | 버전 | 용도 | 선택 이유 |
|------|------|------|-----------|
| @astrojs/sitemap | 3.7.0 | 사이트맵 자동 생성 | Astro 공식 플러그인. Google Search Console 제출용 |
| astro-seo | latest | 메타태그/Open Graph 관리 | `<SEO />` 컴포넌트로 페이지별 title, description, OG 태그 일괄 관리 |
| JSON-LD (수동 구현) | — | 구조화된 데이터 | Product/SoftwareApplication 스키마로 검색 리치 결과. Astro 컴포넌트로 구현 |

**SEO 구성 요소:**

```typescript
// JSON-LD 구조화 데이터 (워크플로우 템플릿용)
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "채용공고 자동 수집 워크플로우",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "n8n",
  "offers": {
    "@type": "Offer",
    "price": "0",      // 또는 유료 가격
    "priceCurrency": "KRW"
  }
}
```

**신뢰도:** HIGH — @astrojs/sitemap 3.7.0은 npm 확인 완료

### 결제/수익화

| 기술 | 버전 | 용도 | 선택 이유 |
|------|------|------|-----------|
| Lemon Squeezy | — | 프리미엄 템플릿 결제 (v2 예정) | Merchant of Record로 글로벌 세금 자동 처리. Lemon.js (2.3KB)로 정적 사이트 오버레이 체크아웃. 5% + $0.50 거래 수수료 |

**v1 vs v2 결제 전략:**

| 버전 | 결제 방식 | 구현 |
|------|-----------|------|
| **v1** | 무료 템플릿 전체 공개 + 프리미엄 라벨링 + 문의 기반 | `tier: 'premium'` 프론트매터로 구분. JSON 다운로드 버튼 숨김 → "구매 문의" 링크 |
| **v2** | Lemon Squeezy 결제 연동 | Lemon.js CDN 로드 → checkout overlay → 구매 완료 시 JSON 다운로드 링크 이메일 전송 |

**Lemon Squeezy vs Gumroad vs Polar 비교:**

| 기준 | Lemon Squeezy | Gumroad | Polar |
|------|---------------|---------|-------|
| 수수료 | 5% + $0.50 | 10% + $0.50 | 4% + $0.40 |
| MoR (세금 처리) | O | O (2025~) | O |
| 정적 사이트 연동 | Lemon.js 2.3KB | 외부 링크 위주 | SDK/API 중심 |
| 한국어 지원 | 제한적 | 제한적 | 없음 |
| 안정성 (2026) | Stripe 인수 후 일부 불안정 보고 | 안정 | 베타 단계 |

**Lemon Squeezy 선택 이유:** Polar이 수수료는 저렴하지만 아직 베타. Gumroad은 수수료 2x. Lemon Squeezy의 Lemon.js 오버레이가 정적 사이트에 가장 자연스러운 UX 제공. 다만 v1에서는 결제 미구현이므로, v2 계획만 수립.

**신뢰도:** MEDIUM — Lemon Squeezy의 Stripe 인수 후 안정성 변동 가능. v2 시점에 재평가 필요

### 배포 & 인프라

| 기술 | 버전 | 용도 | 선택 이유 |
|------|------|------|-----------|
| GitHub Pages | — | 정적 사이트 호스팅 | 무료. Astro 공식 GitHub Action 제공. CI/CD 자동화 |
| withastro/action | v3 | GitHub Actions 빌드/배포 | Astro 공식 액션. 패키지 매니저 자동 감지 (npm/yarn/pnpm). 빌드 → 배포 자동화 |

**GitHub Actions 워크플로우:**

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: withastro/action@v3

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

**신뢰도:** HIGH — Astro 공식 문서에서 확인된 배포 구성

### 지원 라이브러리

| 라이브러리 | 버전 | 용도 | 사용 시점 |
|-----------|------|------|-----------|
| @astrojs/react | latest | Astro에서 React 컴포넌트 사용 | React Flow 다이어그램 Islands 렌더링 |
| @tailwindcss/vite | latest | Tailwind CSS v4 Vite 플러그인 | Astro + Tailwind v4 연동 (구 @astrojs/tailwind 대체) |
| dagre | 1.x | 방향 그래프 레이아웃 엔진 | n8n 워크플로우 노드 자동 레이아웃 계산 (React Flow과 조합) |
| sharp | latest | 이미지 최적화 | Astro 이미지 최적화 (자동 설치) |

## 미채택 대안

| 카테고리 | 권장 | 대안 | 미채택 이유 |
|----------|------|------|-------------|
| 프레임워크 | Astro 5 | Next.js 15 | 콘텐츠 사이트에 과도. 정적 내보내기 가능하나 React 전체 번들 전송. 빌드 복잡도 높음 |
| 프레임워크 | Astro 5 | Astro 6 (beta) | 베타 불안정. Node 22+ 강제. 정적 사이트에 불필요한 기능 (Cloudflare Workers) |
| CSS | Tailwind 4 | Tailwind 3 | v4가 성능 대폭 향상. CSS-first 설정 간소화. 신규 프로젝트는 v4 시작이 합리적 |
| CSS | Tailwind 4 | Vanilla CSS / CSS Modules | 유틸리티 클래스로 빠른 프로토타이핑. 일관된 디자인 시스템 |
| 다이어그램 | React Flow | Mermaid | 정적 다이어그램만 가능. 인터랙티브 팬/줌 불가. 커스텀 노드 스타일 불가 |
| 다이어그램 | React Flow | D3.js | 로우레벨. 노드/엣지 인터랙션 직접 구현 필요. 개발 시간 과다 |
| 다이어그램 | React Flow | Cytoscape.js | 그래프 분석용. 워크플로우 다이어그램 UX에 부적합 |
| 결제 | Lemon Squeezy | Stripe Direct | MoR 아님 → 세금 처리 직접 해야 함. 정적 사이트에 서버사이드 필요 |
| 결제 | Lemon Squeezy | Polar | 2025 말 기준 아직 베타. 개발자 도구 중심이라 일반 디지털 상품에 부적합 |
| 결제 | Lemon Squeezy | Gumroad | 수수료 10% (2x). 임베드 UX가 Lemon.js보다 제한적 |
| 배포 | GitHub Pages | Vercel | 무료이지만 기능 과잉. GitHub Pages로 충분. 별도 서비스 의존성 추가 불필요 |
| 배포 | GitHub Pages | Netlify | 무료 플랜 제약. GitHub Pages + Astro Action 조합이 더 단순 |

## 설치

```bash
# 프로젝트 생성
npm create astro@latest n8n-marketplace -- --template minimal

# 코어 의존성
npm install astro-seo

# React 통합 (인터랙티브 다이어그램용)
npx astro add react

# Tailwind CSS v4 (Vite 플러그인 방식)
npm install tailwindcss @tailwindcss/vite

# React Flow (워크플로우 다이어그램)
npm install @xyflow/react

# 그래프 레이아웃
npm install dagre @types/dagre

# SEO
npx astro add sitemap

# 개발 의존성
npm install -D typescript @types/react @types/react-dom
```

**Astro 설정 파일:**

```typescript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://username.github.io',
  base: '/n8n-maker',
  integrations: [
    react(),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

**Tailwind CSS 설정 (CSS-first, v4):**

```css
/* src/styles/global.css */
@import "tailwindcss";

@theme {
  --color-primary: #ff6d5a;     /* n8n 브랜드 오렌지 */
  --color-primary-dark: #e55a47;
  --color-secondary: #1a1a2e;   /* 다크 네이비 */
  --color-accent: #00d4aa;      /* 민트 그린 */
  --color-surface: #f8f9fa;
  --color-surface-dark: #e9ecef;
  --font-sans: 'Pretendard', 'Apple SD Gothic Neo', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

## 버전 호환성 매트릭스

| 패키지 | 최소 버전 | 권장 버전 | Node.js | 비고 |
|--------|----------|----------|---------|------|
| astro | 5.2.0 | 5.18.x | 18+ | v5.2+에서 Tailwind v4 지원 |
| tailwindcss | 4.0.0 | 4.2.x | — | Vite 플러그인 방식 필수 |
| @xyflow/react | 12.0.0 | 12.10.x | — | React 17+ 필요 |
| react | 18.0.0 | 19.x | — | React Flow 12 호환 |
| @astrojs/react | 4.0.0 | latest | — | React 19 지원 |

## 출처

- Astro 5.18.0 stable: [npm astro](https://www.npmjs.com/package/astro)
- Astro 6 Beta (2026-01): [Astro Blog](https://astro.build/blog/astro-6-beta/)
- Tailwind CSS v4.2.1: [npm tailwindcss](https://www.npmjs.com/package/tailwindcss)
- Tailwind v4 + Astro 설정: [Tailwind CSS Docs](https://tailwindcss.com/docs/installation/framework-guides/astro)
- @xyflow/react 12.10.1: [npm @xyflow/react](https://www.npmjs.com/package/@xyflow/react)
- React Flow SSR/SSG 지원: [React Flow 12 Release](https://xyflow.com/blog/react-flow-12-release)
- Astro Content Collections: [Astro Docs](https://docs.astro.build/en/guides/content-collections/)
- @astrojs/sitemap 3.7.0: [npm @astrojs/sitemap](https://www.npmjs.com/package/@astrojs/sitemap)
- astro-seo: [npm astro-seo](https://www.npmjs.com/package/astro-seo)
- Lemon Squeezy 체크아웃 오버레이: [Lemon Squeezy Docs](https://docs.lemonsqueezy.com/help/checkout/checkout-overlay)
- Lemon Squeezy vs Gumroad: [Ruul Blog](https://ruul.io/blog/lemonsqueezy-vs-gumroad)
- Polar.sh: [Polar Docs](https://polar.sh/docs/introduction)
- GitHub Pages 배포: [Astro Deploy Docs](https://docs.astro.build/en/guides/deploy/github/)
- Astro Islands Architecture: [Astro Docs](https://docs.astro.build/en/concepts/islands/)
