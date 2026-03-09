# Phase 1: 프로젝트 기반 구축 - Research

**Researched:** 2026-03-09
**Domain:** Astro 5 + Tailwind CSS 4 정적 사이트 기반 구축, Content Collections, 반응형 레이아웃
**Confidence:** HIGH

## Summary

Phase 1은 Astro 5 정적 사이트 프로젝트를 초기화하고, Tailwind CSS 4로 스타일링 기반을 잡고, Content Collections로 워크플로우 템플릿 메타데이터 스키마를 정의하며, 반응형 Header/Footer 레이아웃을 구축하는 단계다. 모든 기술 스택이 성숙하고 공식 문서가 충분하며, 특별한 위험 요소 없이 진행 가능하다.

Astro는 현재 v5.18.0이 최신 안정 버전이며(v6 Beta 존재하나 사용하지 않음), Tailwind CSS는 v4.2.0이 최신이다. Astro 5의 Content Layer API는 `src/content.config.ts`에서 `glob()` 로더 + Zod 스키마로 타입 안전한 콘텐츠 관리를 제공한다. Tailwind CSS 4는 `tailwind.config.js` 대신 CSS-native `@theme` 지시어로 테마를 설정하는 새로운 방식을 사용한다.

**Primary recommendation:** `npm create astro@latest` + `@tailwindcss/vite` + `@astrojs/mdx`로 프로젝트를 초기화하고, Content Collections glob 로더 + Zod 스키마로 템플릿 데이터를 관리하며, Tailwind CSS 4의 `@theme` 지시어로 n8n 브랜드 컬러와 Pretendard 폰트를 설정한다.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- 업종(금융/마케팅/HR/IT) + 용도(보고서/수집/알림 등) 2단계 분류 체계
- 난이도는 3단계: 초급/중급/고급
- 가격 모델은 free/premium enum 두 값으로 관리
- 한국 서비스 연동 템플릿은 별도 컬렉션이 아닌 같은 templates 컬렉션에서 태그로 구분
- 예상 설정 시간은 분 단위 숫자(estimatedMinutes)로 관리
- 필요 크레덴셜은 문자열 배열로 관리 (credentials: ['Gmail OAuth', 'Slack API'])
- 콘텐츠 파일 포맷: YAML frontmatter + MDX
- Header: 왼쪽 로고 + 중앙 카테고리 4개(금융/마케팅/HR/IT) 링크 + 오른쪽 CTA 버튼
- Footer: 미니말 — 저작권 + 문의 이메일/링크 + 간단한 소개 문구
- 모바일: 햄버거 메뉴로 전환 (전체 화면 또는 사이드바)
- Breadcrumb: 카테고리/상세 페이지에서만 표시 (홈 > 금융 > DART 공시 모니터링)
- 클린 프로페셔널 톤 — 깨끗하고 전문적, 넓은 여백, 명확한 위계
- n8n 브랜드 컬러(오렌지/레드 계열) 기반 primary 색상
- v1은 라이트 모드만 지원 (디자인 변수는 미리 세팅, v2에서 다크모드 추가)
- Pretendard 웹폰트 사용 (한국어 웹 표준, CDN 제공)
- 파일 기반 라우팅: pages/index.astro, pages/category/[slug].astro, pages/template/[slug].astro
- 컴포넌트: 기능별 그룹핑 — components/layout/, components/ui/, components/template/
- 콘텐츠: src/content/templates/ (Astro Content Collections 표준)
- 워크플로우 JSON: public/workflows/ (정적 에셋, 직접 다운로드 가능)

### Claude's Discretion
- Tailwind CSS 4 구체적 설정 (테마 확장, 커스텀 유틸리티)
- Astro 빌드 설정 세부사항
- Zod 스키마 구체적 필드 타입 설계
- 컴포넌트 내부 구현 방식
- GitHub Pages 배포 설정 방식

### Deferred Ideas (OUT OF SCOPE)
None — 논의가 Phase 1 범위 내에서 진행됨
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| INFRA-01 | Astro 5 + Tailwind CSS 4 프로젝트 구조가 빌드되고 GitHub Pages에 배포된다 | Astro 5.18.0 + Tailwind 4.2.0 설치 가이드, astro.config.mjs 설정, GitHub Actions 배포 워크플로우 |
| INFRA-02 | Content Collections 스키마로 템플릿 메타데이터를 타입 안전하게 관리한다 | Content Layer API (src/content.config.ts) + glob 로더 + Zod 스키마 패턴, MDX 통합 |
| INFRA-03 | 반응형 레이아웃이 모바일/태블릿/데스크톱에서 정상 동작한다 | Tailwind 반응형 유틸리티, 햄버거 메뉴 구현 패턴, Pretendard 폰트 CDN 설정 |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| astro | 5.18.x | 정적 사이트 생성 프레임워크 | Content Layer API, 파일 기반 라우팅, 정적 빌드 최적화 |
| tailwindcss | 4.2.x | 유틸리티 CSS 프레임워크 | CSS-native 설정, Vite 플러그인 통합, 반응형 디자인 |
| @tailwindcss/vite | 4.2.x | Tailwind CSS Vite 플러그인 | Astro의 Vite 기반 빌드와 네이티브 통합 |
| @astrojs/mdx | latest | MDX 통합 | Content Collections에서 MDX 파일 지원 |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| astro/zod | (Astro 내장) | 스키마 검증 | Content Collections 스키마 정의 시 — 별도 설치 불요 |
| Pretendard | 1.3.9 | 한국어 웹폰트 | CDN 링크로 로드, npm 설치 불요 |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| @tailwindcss/vite | @astrojs/tailwind (deprecated) | @astrojs/tailwind는 Tailwind v3용, v4에서는 @tailwindcss/vite 사용 필수 |
| MDX | 순수 Markdown | MDX가 컴포넌트 삽입 가능하여 향후 Phase에서 유연성 제공 |
| Pretendard CDN | @fontsource/pretendard (npm) | CDN이 설정 간단, dynamic subset으로 성능 우수 |

**Installation:**
```bash
# 프로젝트 생성
npm create astro@latest n8n-marketplace -- --template minimal

# 의존성 설치
npm install tailwindcss @tailwindcss/vite
npx astro add mdx
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── content/
│   └── templates/           # 워크플로우 템플릿 MDX 파일
│       ├── dart-disclosure-monitor.mdx
│       └── job-auto-collect.mdx
├── content.config.ts        # Content Collections 스키마 정의 (src/ 루트)
├── components/
│   ├── layout/              # Header, Footer, Navigation, Breadcrumb
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── MobileMenu.astro
│   │   └── Breadcrumb.astro
│   ├── ui/                  # Button, Badge, Card 등 범용 UI
│   └── template/            # 템플릿 전용 컴포넌트 (Phase 2+)
├── layouts/
│   └── BaseLayout.astro     # 공통 레이아웃 (Head, Header, Footer)
├── pages/
│   ├── index.astro          # 랜딩 페이지
│   ├── category/
│   │   └── [slug].astro     # 카테고리 페이지 (Phase 2)
│   └── template/
│       └── [slug].astro     # 템플릿 상세 페이지 (Phase 3)
└── styles/
    └── global.css           # Tailwind 임포트 + @theme 설정
public/
├── workflows/               # n8n 워크플로우 JSON (직접 다운로드)
└── CNAME                    # 커스텀 도메인 (있을 경우)
```

### Pattern 1: Content Collections 스키마 정의
**What:** `src/content.config.ts`에서 Zod 스키마로 템플릿 메타데이터를 검증
**When to use:** 모든 MDX 템플릿 파일의 frontmatter 검증
**Example:**
```typescript
// src/content.config.ts
// Source: https://docs.astro.build/en/guides/content-collections/
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const templates = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/templates" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['finance', 'marketing', 'hr', 'it']),
    useCase: z.string(),  // 용도: 보고서, 수집, 알림 등
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    pricing: z.enum(['free', 'premium']),
    estimatedMinutes: z.number().positive(),
    credentials: z.array(z.string()),
    tags: z.array(z.string()).default([]),
    workflowJsonPath: z.string(),  // public/workflows/ 내 JSON 파일 경로
    nodeCount: z.number().optional(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
  }),
});

export const collections = { templates };
```

### Pattern 2: Tailwind CSS 4 테마 설정 (@theme 지시어)
**What:** CSS 파일 내에서 n8n 브랜드 컬러, Pretendard 폰트, 반응형 변수를 설정
**When to use:** 프로젝트 초기 한 번 설정
**Example:**
```css
/* src/styles/global.css */
/* Source: https://tailwindcss.com/docs/theme */
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css");
@import "tailwindcss";

@theme {
  /* n8n 브랜드 컬러 기반 */
  --color-primary-50: #fff7ed;
  --color-primary-100: #ffedd5;
  --color-primary-200: #fed7aa;
  --color-primary-300: #fdba74;
  --color-primary-400: #fb923c;
  --color-primary-500: #f97316;   /* n8n 오렌지 메인 */
  --color-primary-600: #ea580c;
  --color-primary-700: #c2410c;
  --color-primary-800: #9a3412;
  --color-primary-900: #7c2d12;
  --color-primary-950: #431407;

  /* 뉴트럴/그레이 */
  --color-surface-50: #fafafa;
  --color-surface-100: #f5f5f5;
  --color-surface-200: #e5e5e5;
  --color-surface-700: #404040;
  --color-surface-800: #262626;
  --color-surface-900: #171717;

  /* 폰트 */
  --font-sans: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;

  /* 다크 모드 대비 CSS 변수 (v2 확장용) */
  --color-bg: var(--color-surface-50);
  --color-text: var(--color-surface-900);
  --color-text-secondary: var(--color-surface-700);
}
```

### Pattern 3: BaseLayout with Head, Header, Footer
**What:** 모든 페이지에서 공유하는 레이아웃 컴포넌트
**When to use:** 모든 페이지
**Example:**
```astro
---
// src/layouts/BaseLayout.astro
import Header from '../components/layout/Header.astro';
import Footer from '../components/layout/Footer.astro';
import '../styles/global.css';

interface Props {
  title: string;
  description?: string;
}

const { title, description = 'n8n 워크플로우 템플릿 마켓플레이스' } = Astro.props;
---
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <title>{title} | n8n 마켓플레이스</title>
  </head>
  <body class="min-h-screen flex flex-col bg-(--color-bg) text-(--color-text) font-sans">
    <Header />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

### Pattern 4: 햄버거 메뉴 (모바일 반응형)
**What:** 모바일에서 네비게이션을 토글하는 인라인 스크립트 패턴
**When to use:** Header 컴포넌트에서 768px 이하 뷰포트
**Example:**
```astro
---
// src/components/layout/Header.astro
const categories = [
  { name: '금융', slug: 'finance' },
  { name: '마케팅', slug: 'marketing' },
  { name: 'HR', slug: 'hr' },
  { name: 'IT/DevOps', slug: 'it' },
];
---
<header class="sticky top-0 z-50 bg-white border-b border-surface-200">
  <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
    <!-- 로고 -->
    <a href="/" class="font-bold text-xl text-primary-600">n8n Market</a>

    <!-- 데스크톱 메뉴 -->
    <ul class="hidden md:flex items-center gap-6">
      {categories.map(cat => (
        <li><a href={`/category/${cat.slug}`} class="text-surface-700 hover:text-primary-600 transition-colors">{cat.name}</a></li>
      ))}
    </ul>

    <!-- CTA 버튼 -->
    <a href="#" class="hidden md:inline-flex px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium">
      시작하기
    </a>

    <!-- 햄버거 버튼 -->
    <button id="menu-toggle" class="md:hidden p-2" aria-label="메뉴 열기">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </nav>

  <!-- 모바일 메뉴 -->
  <div id="mobile-menu" class="hidden md:hidden">
    <ul class="px-4 pb-4 space-y-2">
      {categories.map(cat => (
        <li><a href={`/category/${cat.slug}`} class="block py-2 text-surface-700">{cat.name}</a></li>
      ))}
      <li><a href="#" class="block py-2 px-4 bg-primary-500 text-white rounded-lg text-center">시작하기</a></li>
    </ul>
  </div>
</header>

<script>
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  toggle?.addEventListener('click', () => {
    menu?.classList.toggle('hidden');
  });
</script>
```

### Anti-Patterns to Avoid
- **`src/content/config.ts` 사용:** Astro 5에서는 `src/content.config.ts`(src 루트)가 올바른 위치. `src/content/config.ts`는 레거시 경로다.
- **`@astrojs/tailwind` 사용:** Tailwind v4에서는 deprecated. `@tailwindcss/vite`를 직접 사용한다.
- **`tailwind.config.js` 생성:** Tailwind v4는 CSS-native 설정 사용. JS 설정 파일 불요.
- **slug 대신 id 미사용:** Astro 5에서 Content Collections는 `slug` 대신 `id`를 사용. `[...slug].astro` 아닌 `[...id].astro` 패턴 사용.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| 반응형 breakpoint | 미디어 쿼리 수동 작성 | Tailwind `sm:`, `md:`, `lg:` 접두사 | 일관성, 유지보수, Tailwind 기본 breakpoint(sm:640, md:768, lg:1024, xl:1280)가 표준 |
| 콘텐츠 타입 검증 | 수동 frontmatter 파싱/검증 | Astro Content Collections + Zod | 빌드 타임 자동 검증, TypeScript 타입 추론, 에러 메시지 |
| CSS 리셋/노멀라이즈 | reset.css 수동 추가 | Tailwind Preflight (자동 포함) | `@import "tailwindcss"` 시 자동 적용 |
| 폰트 로딩 최적화 | @font-face 수동 작성 | Pretendard dynamic-subset CDN | 자동 서브셋팅, WOFF2, preload 최적화 내장 |
| 정적 빌드 배포 | 수동 빌드/업로드 | withastro/action@v5 GitHub Action | 자동 빌드 + 배포, 설정 최소 |

**Key insight:** Phase 1의 모든 "기반 구축" 작업은 프레임워크/도구가 이미 최적의 솔루션을 제공한다. 커스텀 빌드 파이프라인이나 콘텐츠 검증 로직을 직접 작성하지 말 것.

## Common Pitfalls

### Pitfall 1: Content Collections 설정 파일 위치 오류
**What goes wrong:** `src/content/config.ts`에 설정 파일을 놓으면 Astro 5에서 인식하지 못함
**Why it happens:** Astro 4 → 5 마이그레이션 시 설정 파일 위치가 변경됨
**How to avoid:** 반드시 `src/content.config.ts` (src 디렉토리 루트)에 위치시킬 것
**Warning signs:** 빌드 시 스키마 검증이 동작하지 않거나, 컬렉션을 찾을 수 없다는 에러

### Pitfall 2: Tailwind v4에서 JS 설정 파일 사용 시도
**What goes wrong:** `tailwind.config.js`를 생성하고 테마를 설정하면 적용되지 않음
**Why it happens:** Tailwind v4는 CSS-native 설정(`@theme`)으로 완전 전환됨
**How to avoid:** 모든 테마 설정을 `global.css`의 `@theme` 블록에서 정의
**Warning signs:** 커스텀 색상/폰트가 유틸리티 클래스로 사용 불가

### Pitfall 3: Pretendard 폰트 로딩 순서 문제
**What goes wrong:** CSS에서 `@import url(...)` 이 `@import "tailwindcss"` 뒤에 오면 폰트가 적용되지 않을 수 있음
**Why it happens:** Tailwind v4의 `@theme`에서 폰트를 참조할 때, 폰트 CSS가 먼저 로드되어야 함
**How to avoid:** `@import url("pretendard...")` → `@import "tailwindcss"` → `@theme { ... }` 순서 유지
**Warning signs:** 개발 서버에서 폰트가 깜빡이거나 기본 sans-serif로 폴백

### Pitfall 4: MDX 파일의 Content Collections 통합
**What goes wrong:** MDX 파일이 원시 텍스트로만 로드되거나 `render()` 실패
**Why it happens:** `@astrojs/mdx` 통합이 누락되었거나, glob 패턴이 `.mdx`를 포함하지 않음
**How to avoid:** 1) `npx astro add mdx` 실행, 2) glob 패턴에 `"**/*.mdx"` 명시, 3) `render()` 함수는 `astro:content`에서 임포트
**Warning signs:** MDX 컴포넌트가 렌더링되지 않고 소스 텍스트가 그대로 표시

### Pitfall 5: GitHub Pages base path 설정 누락
**What goes wrong:** 배포 후 CSS/JS/이미지 등 정적 에셋이 404
**Why it happens:** `username.github.io/repo-name` 형태일 때 `base` 설정이 빠지면 루트 경로로 에셋을 요청
**How to avoid:** `astro.config.mjs`에서 `base: '/repo-name'` 설정 (단, `username.github.io` 리포에서는 불요)
**Warning signs:** 로컬에서는 정상이나 배포 후 스타일/이미지가 깨짐

### Pitfall 6: Astro 5의 id vs slug 혼동
**What goes wrong:** 동적 라우트 `[...slug].astro`에서 Content Collections 데이터가 매칭되지 않음
**Why it happens:** Astro 5에서 Content Collections는 `slug` 속성이 아닌 `id`를 사용
**How to avoid:** `getStaticPaths()`에서 `post.id`를 params로 전달, 파일명은 `[id].astro`
**Warning signs:** 404 에러, "slug is not a property" TypeScript 에러

## Code Examples

### astro.config.mjs 전체 설정
```typescript
// Source: https://tailwindcss.com/docs/installation/framework-guides/astro
// Source: https://docs.astro.build/en/guides/deploy/github/
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://username.github.io',
  base: '/n8n-marketplace',  // 리포지토리 이름에 맞게 변경
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### Content Collections 쿼리
```typescript
// Source: https://docs.astro.build/en/guides/content-collections/
// src/pages/index.astro 또는 category 페이지에서
import { getCollection } from 'astro:content';

// 전체 템플릿 가져오기
const allTemplates = await getCollection('templates');

// 카테고리별 필터링
const financeTemplates = await getCollection('templates', ({ data }) => {
  return data.category === 'finance';
});

// 무료 템플릿만
const freeTemplates = await getCollection('templates', ({ data }) => {
  return data.pricing === 'free';
});
```

### 동적 라우트 (카테고리 페이지)
```typescript
// Source: https://docs.astro.build/en/guides/content-collections/
// src/pages/category/[slug].astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

export async function getStaticPaths() {
  const categories = ['finance', 'marketing', 'hr', 'it'];
  return categories.map(slug => ({ params: { slug } }));
}

const { slug } = Astro.params;
const templates = await getCollection('templates', ({ data }) => {
  return data.category === slug;
});
---
<BaseLayout title={slug}>
  <!-- 카테고리별 템플릿 목록 (Phase 2에서 구현) -->
</BaseLayout>
```

### 샘플 MDX 템플릿 파일
```mdx
---
# src/content/templates/job-auto-collect.mdx
title: "채용공고 자동 수집"
description: "사람인에서 키워드 기반 채용공고를 매일 자동 수집하여 노션에 저장합니다"
category: "hr"
useCase: "수집"
difficulty: "beginner"
pricing: "free"
estimatedMinutes: 15
credentials:
  - "사람인 API Key"
  - "Notion API Key"
tags:
  - "사람인"
  - "채용"
  - "한국서비스"
workflowJsonPath: "/workflows/job-auto-collect.json"
nodeCount: 5
publishedAt: 2026-03-09
---

## 이 워크플로우는

매일 오전 10시에 사람인 API를 통해 원하는 키워드의 채용공고를 검색하고,
새로운 공고를 노션 데이터베이스에 자동으로 저장합니다.
```

### GitHub Actions 배포 워크플로우
```yaml
# .github/workflows/deploy.yml
# Source: https://docs.astro.build/en/guides/deploy/github/
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v5
      - name: Install, build, and upload
        uses: withastro/action@v5

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `src/content/config.ts` | `src/content.config.ts` | Astro 5.0 (2024-12) | 설정 파일 위치 변경, 레거시 경로 deprecated |
| `type: 'content'` 컬렉션 정의 | `loader: glob()` 로더 기반 | Astro 5.0 (2024-12) | Content Layer API로 통합, 5x 빠른 Markdown 빌드 |
| `entry.slug` | `entry.id` | Astro 5.0 (2024-12) | 동적 라우트 파라미터 이름 변경 |
| `tailwind.config.js` | `@theme` CSS 지시어 | Tailwind CSS 4.0 (2025-01) | JS 설정 파일 불요, CSS-native 설정 |
| `@astrojs/tailwind` 통합 | `@tailwindcss/vite` 플러그인 | Tailwind CSS 4.0 (2025-01) | Astro 공식 통합 deprecated, Vite 플러그인 직접 사용 |
| Pretendard static subset | Pretendard Variable dynamic-subset | 2024+ | 가변 폰트 + 동적 서브셋으로 로딩 성능 개선 |

**Deprecated/outdated:**
- `@astrojs/tailwind`: Tailwind v3 전용. v4에서는 `@tailwindcss/vite` 사용
- `tailwind.config.js`: Tailwind v4에서 CSS `@theme`로 대체
- `src/content/config.ts`: Astro 5에서 `src/content.config.ts`로 이동
- `entry.slug`: Astro 5에서 `entry.id`로 변경

## Open Questions

1. **GitHub Pages 리포지토리 이름 확정**
   - What we know: `site`와 `base` 설정에 리포지토리 이름이 필요
   - What's unclear: 최종 리포지토리 이름 및 `username.github.io/repo-name` vs 커스텀 도메인 여부
   - Recommendation: 일단 `/n8n-marketplace`로 설정하고, 배포 시점(Phase 5)에서 확정

2. **n8n 브랜드 컬러 정확한 HEX/OKLCH 값**
   - What we know: n8n은 오렌지/레드 계열 브랜드 컬러 사용
   - What's unclear: 공식 브랜드 가이드라인의 정확한 색상 값
   - Recommendation: Tailwind orange 계열(#f97316)을 primary로 사용, 필요 시 조정

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | 없음 — Astro 빌드 검증 + 수동 반응형 확인 |
| Config file | 없음 — Wave 0에서 설정 불요 (빌드 성공이 곧 검증) |
| Quick run command | `npm run build` |
| Full suite command | `npm run build && npx astro preview` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| INFRA-01 | Astro 빌드 성공 + 정적 HTML 생성 | smoke | `npm run build` | -- Wave 0 |
| INFRA-02 | Content Collections Zod 스키마 검증 | smoke | `npm run build` (잘못된 frontmatter 시 빌드 실패) | -- Wave 0 |
| INFRA-03 | 반응형 레이아웃 정상 동작 | manual-only | 브라우저 DevTools로 375px/768px/1280px 확인 | N/A (수동) |

### Sampling Rate
- **Per task commit:** `npm run build`
- **Per wave merge:** `npm run build && npx astro preview`
- **Phase gate:** 빌드 성공 + 3개 뷰포트 수동 확인

### Wave 0 Gaps
None -- Astro 프로젝트 `npm run build`가 Content Collections 스키마 검증을 포함하므로 별도 테스트 프레임워크 불요. 반응형 레이아웃은 수동 확인만 가능 (Phase 1 범위에서 E2E 테스트는 과잉).

## Sources

### Primary (HIGH confidence)
- [Astro Content Collections 공식 문서](https://docs.astro.build/en/guides/content-collections/) - Content Layer API, glob 로더, Zod 스키마, render() 함수
- [Tailwind CSS v4 Astro 설치 가이드](https://tailwindcss.com/docs/installation/framework-guides/astro) - @tailwindcss/vite 설치, astro.config.mjs 설정
- [Tailwind CSS v4 Theme 문서](https://tailwindcss.com/docs/theme) - @theme 지시어, 커스텀 색상/폰트/breakpoint
- [Astro GitHub Pages 배포 가이드](https://docs.astro.build/en/guides/deploy/github/) - site/base 설정, GitHub Actions 워크플로우
- [Astro MDX 통합 가이드](https://docs.astro.build/en/guides/integrations-guide/mdx/) - 설치, 설정, Content Collections 연동
- [Pretendard GitHub](https://github.com/orioncactus/pretendard) - CDN URL, dynamic-subset, Variable 폰트

### Secondary (MEDIUM confidence)
- [Astro npm 페이지](https://www.npmjs.com/package/astro) - 최신 버전 v5.18.0 확인
- [Tailwind CSS GitHub Releases](https://github.com/tailwindlabs/tailwindcss/releases) - 최신 버전 v4.2.0 확인
- [Astro-Navbar 컴포넌트](https://github.com/surjithctly/astro-navbar) - 반응형 네비게이션 참고 패턴

### Tertiary (LOW confidence)
- 해당 없음 — 모든 주요 발견사항이 공식 문서에서 검증됨

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Astro 5, Tailwind CSS 4 모두 공식 문서에서 설치/설정 가이드 확인. 버전 확인 완료.
- Architecture: HIGH - Astro 공식 프로젝트 구조 + Content Collections API가 잘 문서화됨
- Pitfalls: HIGH - Astro 4→5, Tailwind 3→4 마이그레이션 가이드에서 주요 변경사항 확인

**Research date:** 2026-03-09
**Valid until:** 2026-04-09 (Astro/Tailwind 안정 버전, 30일 유효)
