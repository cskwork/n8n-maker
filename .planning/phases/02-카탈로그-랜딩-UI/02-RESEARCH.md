# Phase 2: 카탈로그 & 랜딩 UI - Research

**Researched:** 2026-03-09
**Domain:** Astro 5 동적 라우팅 + Content Collections 기반 카탈로그 UI
**Confidence:** HIGH

## Summary

Phase 2는 기존 Phase 1 코드베이스(Astro 5 + Tailwind CSS 4 + Content Collections) 위에 카테고리 페이지와 랜딩 페이지 개선을 구현하는 단계이다. 핵심 작업은 (1) `pages/category/[slug].astro` 동적 라우트 생성, (2) 재사용 가능한 TemplateCard 컴포넌트 추출, (3) index.astro 랜딩 페이지 히어로 섹션 통계 추가 및 인기 템플릿 로직 변경이다.

기술적으로 Astro의 `getStaticPaths()` + `getCollection()` 필터링 조합은 잘 문서화된 패턴이며, 현재 코드베이스에서 이미 사용 중인 Content Collections 스키마와 Tailwind 컬러 시스템을 그대로 활용한다. `base: '/n8n-marketplace'` 경로 설정이 모든 href에 반영되어야 하며, 이미 Header/MobileMenu에서 이 패턴이 적용되어 있다.

**Primary recommendation:** `getStaticPaths()`로 4개 카테고리 slug에 대한 정적 페이지를 생성하고, TemplateCard를 독립 컴포넌트로 추출하여 index.astro와 category/[slug].astro에서 공유한다.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- 히어로 섹션에 통계 수치를 CTA 버튼 아래 가로 인라인으로 추가 ('20+ 템플릿 · 4개 업종 · 즉시 다운로드')
- 섹션 배치 순서: 히어로 -> 카테고리 -> 인기 템플릿 -> CTA (현재 구조 유지)
- 인기 템플릿 섹션에 4개 표시 (카테고리당 1개씩 균형적으로)
- category/[slug].astro 동적 라우팅 페이지 생성
- 상단 헤더: 카테고리명 + 설명 한 줄 + 템플릿 N개 카운트
- 템플릿 카드 그리드: 데스크톱 3칸, 태블릿 2칸, 모바일 1칸
- 간단한 정렬 드롭다운 제공 (난이도순/최신순/가격순)
- 빈 카테고리: '준비 중입니다' 안내 메시지 + 다른 카테고리 링크 제공
- 정보 배치: 제목 -> 설명(2줄 클램프) -> 배지들(카테고리/난이도/가격)
- 하단에 보조 정보: 노드 수 + 예상 설정 시간 ('6개 노드 · 25분')
- 무료/프리미엄 구분: 색상 배지 (무료: 초록 배경, 프리미엄: 호박 배경) -- 현재 패턴 유지
- 카드 클릭 시 template/[slug] 상세 페이지로 이동 (Phase 3에서 구현될 페이지)
- 랜딩 페이지 카테고리 카드: 모바일에서 2x2 그리드로 컴팩트하게 표시
- 카테고리 페이지 템플릿 카드: 모바일에서 1칸 세로 스택
- 카테고리 간 이동: 기존 MobileMenu(햄버거 메뉴) 활용
- 모바일 카드 탭 피드백: 탭 시 살짝 누르는 효과(scale down) 추가

### Claude's Discretion
- 카드 호버 애니메이션 세부 구현
- 정렬 드롭다운 UI 디자인
- 빈 카테고리 안내 메시지 문구
- 히어로 통계 수치의 구체적 스타일링
- Breadcrumb 표시 로직 (Phase 1에서 컴포넌트 이미 존재)

### Deferred Ideas (OUT OF SCOPE)
None -- 논의가 Phase 2 범위 내에서 진행됨
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CATA-01 | 사용자가 4개 업종 카테고리(금융, 마케팅, HR, IT/DevOps)로 템플릿을 브라우징할 수 있다 | `category/[slug].astro` 동적 라우트 + `getCollection` 카테고리 필터링으로 구현 |
| CATA-02 | 각 카테고리 페이지에서 템플릿 목록을 카드형 레이아웃으로 볼 수 있다 | TemplateCard 컴포넌트 + 반응형 그리드 (3/2/1칸) + 정렬 드롭다운 |
| CATA-03 | 템플릿 카드에 이름, 카테고리, 난이도, 무료/프리미엄 배지가 표시된다 | TemplateCard 컴포넌트에 배지 시스템 통합, 기존 index.astro 패턴 확장 |
| CATA-04 | 랜딩 페이지에서 주요 템플릿과 카테고리를 한눈에 볼 수 있다 | index.astro 히어로 통계 추가 + 인기 템플릿 4개(카테고리별 1개) 로직 변경 |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | ^5.18.0 | 정적 사이트 프레임워크 | 이미 Phase 1에서 설치/설정 완료 |
| Tailwind CSS | ^4.2.0 | 유틸리티 CSS 스타일링 | 이미 설치, @theme 컬러 시스템 구축 완료 |
| @astrojs/mdx | ^4.3.0 | MDX 콘텐츠 렌더링 | 이미 설치, Content Collections에서 사용 |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| astro:content | built-in | getCollection, render API | 템플릿 데이터 조회 및 필터링 |
| Zod | built-in | 스키마 유효성 검증 | content.config.ts에서 이미 사용 중 |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| 클라이언트 정렬 (JS) | SSG 정렬 (빌드 타임) | 빌드 타임 정렬은 3가지 정렬 기준별 별도 URL 필요 -- 클라이언트 JS가 UX 더 좋음 |

**Installation:**
```bash
# 추가 설치 없음 -- Phase 1에서 모두 설치 완료
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   ├── layout/           # 기존 Header, Footer, MobileMenu, Breadcrumb
│   └── catalog/          # Phase 2 신규
│       ├── TemplateCard.astro    # 재사용 템플릿 카드 컴포넌트
│       ├── SortDropdown.astro    # 정렬 드롭다운 (클라이언트 JS)
│       └── EmptyCategory.astro   # 빈 카테고리 안내
├── pages/
│   ├── index.astro               # 랜딩 페이지 (수정)
│   └── category/
│       └── [slug].astro          # 카테고리 동적 라우트 (신규)
├── content/
│   └── templates/*.mdx           # 기존 템플릿 콘텐츠
└── styles/
    └── global.css                # 기존 Tailwind + @theme 설정
```

### Pattern 1: 카테고리 동적 라우트 (getStaticPaths)
**What:** 4개 카테고리 slug에 대해 정적 페이지 생성
**When to use:** category/[slug].astro에서 빌드 타임에 모든 카테고리 페이지 생성
**Example:**
```typescript
// Source: https://docs.astro.build/en/guides/content-collections/
// src/pages/category/[slug].astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import TemplateCard from '../../components/catalog/TemplateCard.astro';

export async function getStaticPaths() {
  const categories = [
    { slug: 'finance', name: '금융', description: 'DART 공시, 주가 알림, 재무 보고서 자동화' },
    { slug: 'marketing', name: '마케팅', description: 'SNS 자동 포스팅, 리드 수집, 캠페인 관리' },
    { slug: 'hr', name: 'HR', description: '채용공고 수집, 지원자 관리, 온보딩 자동화' },
    { slug: 'it', name: 'IT/DevOps', description: '서버 모니터링, 배포 자동화, 알림 통합' },
  ];

  const allTemplates = await getCollection('templates');

  return categories.map((cat) => {
    const filtered = allTemplates.filter((t) => t.data.category === cat.slug);
    return {
      params: { slug: cat.slug },
      props: { category: cat, templates: filtered },
    };
  });
}

const { category, templates } = Astro.props;
---
```

### Pattern 2: 재사용 가능한 TemplateCard 컴포넌트
**What:** index.astro와 category/[slug].astro에서 공유하는 카드 UI
**When to use:** 템플릿을 카드 형태로 표시하는 모든 곳
**Example:**
```typescript
// src/components/catalog/TemplateCard.astro
---
interface Props {
  title: string;
  description: string;
  category: string;
  difficulty: string;
  pricing: string;
  nodeCount?: number;
  estimatedMinutes: number;
  slug: string;  // 콘텐츠 entry의 id -> template/[slug] 링크용
}

const { title, description, category, difficulty, pricing, nodeCount, estimatedMinutes, slug } = Astro.props;

const categoryLabel: Record<string, string> = {
  finance: '금융', marketing: '마케팅', hr: 'HR', it: 'IT/DevOps',
};
const difficultyLabel: Record<string, string> = {
  beginner: '초급', intermediate: '중급', advanced: '고급',
};
---

<a
  href={`/n8n-marketplace/template/${slug}`}
  class="block p-6 bg-white rounded-xl border border-surface-200
         hover:shadow-lg hover:border-primary-300 transition-all
         active:scale-[0.98] active:transition-transform"
>
  <h3 class="font-bold text-surface-900 mb-2">{title}</h3>
  <p class="text-sm text-surface-500 mb-4 line-clamp-2">{description}</p>
  <div class="flex flex-wrap gap-2 mb-3">
    <span class="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full font-medium">
      {categoryLabel[category] || category}
    </span>
    <span class="text-xs bg-surface-100 text-surface-600 px-2 py-1 rounded-full">
      {difficultyLabel[difficulty] || difficulty}
    </span>
    <span class={`text-xs px-2 py-1 rounded-full ${
      pricing === 'free' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
    }`}>
      {pricing === 'free' ? '무료' : '프리미엄'}
    </span>
  </div>
  <p class="text-xs text-surface-400">
    {nodeCount && `${nodeCount}개 노드`}{nodeCount && ' · '}{estimatedMinutes}분
  </p>
</a>
```

### Pattern 3: 클라이언트 사이드 정렬
**What:** 정적 페이지에서 JavaScript로 카드 재정렬
**When to use:** 카테고리 페이지 정렬 드롭다운
**Example:**
```html
<!-- 카드들에 data-* 속성 부여 -->
<div id="template-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {templates.map((t) => (
    <div
      data-difficulty={t.data.difficulty === 'beginner' ? 1 : t.data.difficulty === 'intermediate' ? 2 : 3}
      data-date={t.data.publishedAt.toISOString()}
      data-pricing={t.data.pricing === 'free' ? 0 : 1}
    >
      <TemplateCard ... />
    </div>
  ))}
</div>

<script>
  // select 변경 시 DOM 재정렬
  const select = document.getElementById('sort-select');
  const grid = document.getElementById('template-grid');
  if (select && grid) {
    select.addEventListener('change', (e) => {
      const sortBy = (e.target as HTMLSelectElement).value;
      const cards = [...grid.children] as HTMLElement[];
      cards.sort((a, b) => {
        if (sortBy === 'difficulty') return Number(a.dataset.difficulty) - Number(b.dataset.difficulty);
        if (sortBy === 'date') return new Date(b.dataset.date!).getTime() - new Date(a.dataset.date!).getTime();
        if (sortBy === 'pricing') return Number(a.dataset.pricing) - Number(b.dataset.pricing);
        return 0;
      });
      cards.forEach((card) => grid.appendChild(card));
    });
  }
</script>
```

### Pattern 4: 인기 템플릿 카테고리별 균형 선택
**What:** 각 카테고리에서 첫 번째 템플릿을 선택하여 4개 표시
**When to use:** index.astro 인기 템플릿 섹션
**Example:**
```typescript
const allTemplates = await getCollection('templates');
const categoryOrder = ['finance', 'marketing', 'hr', 'it'];
const featuredTemplates = categoryOrder
  .map((cat) => allTemplates.find((t) => t.data.category === cat))
  .filter(Boolean);
```

### Anti-Patterns to Avoid
- **매핑 데이터 중복 정의:** `categoryLabel`, `difficultyLabel`이 index.astro에 이미 있음 -- TemplateCard로 옮기고 한 곳에서만 관리
- **base path 하드코딩 누락:** `/n8n-marketplace/` prefix를 href에 빠뜨리면 GitHub Pages에서 404 발생
- **클라이언트 JS 과다:** Astro의 강점은 제로 JS -- 정렬 외에는 빌드 타임 처리 유지

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| 동적 라우팅 | 수동 파일 복사/카테고리별 .astro | Astro `[slug].astro` + `getStaticPaths` | 빌드 타임 자동 생성, 타입 안전 |
| 텍스트 말줄임 | CSS 직접 작성 (overflow + webkit) | Tailwind `line-clamp-2` | v4에서 빌트인, 크로스 브라우저 |
| 반응형 그리드 | 미디어 쿼리 직접 작성 | Tailwind `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` | 일관된 브레이크포인트 시스템 |
| 카드 hover/tap 효과 | JS 터치 이벤트 핸들러 | CSS `hover:shadow-lg active:scale-[0.98]` | CSS만으로 충분, JS 불필요 |

**Key insight:** Phase 2는 새로운 라이브러리 추가 없이 기존 스택의 빌트인 기능만으로 모든 요구사항을 충족할 수 있다.

## Common Pitfalls

### Pitfall 1: base path 누락
**What goes wrong:** 링크가 `/category/finance`로 되어 GitHub Pages 배포 시 404 발생
**Why it happens:** 로컬 개발(`astro dev`)에서는 base path 없이도 동작하기 때문
**How to avoid:** 모든 href에 `/n8n-marketplace/` prefix 포함. Header와 MobileMenu의 기존 패턴 참조
**Warning signs:** 빌드 후 링크 클릭 시 404

### Pitfall 2: getStaticPaths 반환값 타입 오류
**What goes wrong:** params의 slug가 string이 아닌 타입으로 전달됨
**Why it happens:** Content Collections의 entry.id를 그대로 params에 사용하면 확장자 포함 가능
**How to avoid:** 카테고리 slug는 하드코딩된 4개 문자열 사용 (`finance`, `marketing`, `hr`, `it`)
**Warning signs:** 빌드 시 타입 에러 또는 예상과 다른 URL 생성

### Pitfall 3: 빈 카테고리 처리 누락
**What goes wrong:** 템플릿이 없는 카테고리에서 빈 그리드만 표시됨
**Why it happens:** 현재 3개 템플릿만 존재 (finance:1, hr:1, it:1, marketing:0)
**How to avoid:** templates.length === 0일 때 EmptyCategory 컴포넌트 표시
**Warning signs:** 마케팅 카테고리 페이지가 헤더만 있고 비어보임

### Pitfall 4: 인기 템플릿 카테고리 누락
**What goes wrong:** 마케팅 카테고리에 템플릿이 없어 featuredTemplates가 3개만 표시
**Why it happens:** `categoryOrder.map(...).find(...)` 에서 마케팅이 undefined 반환
**How to avoid:** `.filter(Boolean)`으로 undefined 제거, 또는 다른 카테고리에서 추가 선택
**Warning signs:** 인기 템플릿 섹션이 4개가 아닌 3개 표시

### Pitfall 5: 카테고리/난이도 매핑 중복
**What goes wrong:** index.astro와 TemplateCard에서 같은 매핑을 각각 관리하여 불일치 발생
**Why it happens:** 코드를 복사-붙여넣기하면서 한쪽만 수정
**How to avoid:** TemplateCard 컴포넌트 내부에 매핑을 두고, index.astro에서는 제거
**Warning signs:** 카테고리별로 다른 라벨이 표시됨

## Code Examples

### 카테고리 페이지 전체 구조
```astro
// Source: Astro 공식 문서 getStaticPaths + getCollection 패턴
// src/pages/category/[slug].astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import TemplateCard from '../../components/catalog/TemplateCard.astro';
import SortDropdown from '../../components/catalog/SortDropdown.astro';
import EmptyCategory from '../../components/catalog/EmptyCategory.astro';

const categoryMeta: Record<string, { name: string; description: string }> = {
  finance: { name: '금융', description: 'DART 공시, 주가 알림, 재무 보고서 자동화' },
  marketing: { name: '마케팅', description: 'SNS 자동 포스팅, 리드 수집, 캠페인 관리' },
  hr: { name: 'HR', description: '채용공고 수집, 지원자 관리, 온보딩 자동화' },
  it: { name: 'IT/DevOps', description: '서버 모니터링, 배포 자동화, 알림 통합' },
};

export async function getStaticPaths() {
  const allTemplates = await getCollection('templates');
  return Object.entries(categoryMeta).map(([slug, meta]) => ({
    params: { slug },
    props: {
      category: { slug, ...meta },
      templates: allTemplates.filter((t) => t.data.category === slug),
    },
  }));
}

const { category, templates } = Astro.props;
---

<BaseLayout
  title={category.name}
  breadcrumbs={[{ label: category.name, href: `/n8n-marketplace/category/${category.slug}` }]}
>
  <!-- 카테고리 헤더 -->
  <section class="py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-2xl md:text-3xl font-bold text-surface-900 mb-2">{category.name}</h1>
      <p class="text-surface-500 mb-1">{category.description}</p>
      <p class="text-sm text-surface-400">템플릿 {templates.length}개</p>
    </div>
  </section>

  <!-- 정렬 + 그리드 -->
  {templates.length > 0 ? (
    <section class="pb-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SortDropdown />
        <div id="template-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {templates.map((t) => (
            <div
              data-difficulty={t.data.difficulty === 'beginner' ? 1 : t.data.difficulty === 'intermediate' ? 2 : 3}
              data-date={t.data.publishedAt.toISOString()}
              data-pricing={t.data.pricing === 'free' ? 0 : 1}
            >
              <TemplateCard
                title={t.data.title}
                description={t.data.description}
                category={t.data.category}
                difficulty={t.data.difficulty}
                pricing={t.data.pricing}
                nodeCount={t.data.nodeCount}
                estimatedMinutes={t.data.estimatedMinutes}
                slug={t.id}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  ) : (
    <EmptyCategory currentSlug={category.slug} />
  )}
</BaseLayout>
```

### 히어로 통계 인라인 추가
```astro
<!-- index.astro 히어로 섹션 수정 -->
<a href="#categories" class="inline-flex items-center px-6 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors text-lg">
  템플릿 둘러보기
</a>
<p class="mt-4 text-sm text-surface-400">
  {allTemplates.length}+ 템플릿 · 4개 업종 · 즉시 다운로드
</p>
```

### 모바일 2x2 카테고리 그리드
```html
<!-- 기존: grid-cols-1 md:grid-cols-2 lg:grid-cols-4 -->
<!-- 변경: grid-cols-2 lg:grid-cols-4 (모바일에서 2x2) -->
<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
  <!-- 카테고리 카드들 -->
</div>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Astro Content Collections v1 (src/content/config.ts) | v2 (src/content.config.ts + glob loader) | Astro 5.0 | 현재 프로젝트에서 이미 v2 사용 |
| line-clamp 플러그인 필요 | Tailwind v4 빌트인 `line-clamp-*` | Tailwind 3.3+ | 플러그인 설치 불필요 |
| getEntry() 기반 렌더링 | render() 함수 분리 (Astro 5) | Astro 5.0 | `import { render } from 'astro:content'` |

**Deprecated/outdated:**
- `@tailwindcss/line-clamp` 플러그인: Tailwind v3.3부터 코어에 포함, v4에서는 당연히 불필요
- Astro Content Collections v1 `defineCollection` in `src/content/config.ts`: v2에서는 `src/content.config.ts` 사용 (이미 적용됨)

## Open Questions

1. **template/[slug] 페이지가 아직 없음**
   - What we know: Phase 3에서 생성 예정. 카드 클릭 시 해당 경로로 이동
   - What's unclear: 없음 -- Phase 3 범위로 명확히 분리됨
   - Recommendation: 카드 href를 `/n8n-marketplace/template/${slug}`로 설정. 클릭 시 404이지만 Phase 3에서 해결됨

2. **마케팅 카테고리 템플릿 부재**
   - What we know: 현재 3개 템플릿 중 마케팅 카테고리 없음
   - What's unclear: Phase 2 완료 시점까지 마케팅 템플릿이 추가될지
   - Recommendation: EmptyCategory 컴포넌트로 처리. 인기 템플릿은 있는 카테고리만 표시

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Astro 빌드 검증 (astro build) |
| Config file | astro.config.mjs |
| Quick run command | `npm run build` |
| Full suite command | `npm run build && npx astro preview` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CATA-01 | 4개 카테고리 페이지가 빌드되어 접근 가능 | smoke | `npm run build` 후 dist/category/ 디렉토리에 4개 폴더 존재 확인 | N/A (빌드 검증) |
| CATA-02 | 카테고리 페이지에 카드 그리드 렌더링 | manual | 브라우저에서 각 카테고리 페이지 접근, 카드 레이아웃 확인 | N/A |
| CATA-03 | 카드에 이름/카테고리/난이도/가격 배지 표시 | manual | 브라우저에서 카드 내용 확인 | N/A |
| CATA-04 | 랜딩 페이지 히어로 통계 + 인기 템플릿 4개 | manual | 브라우저에서 index 페이지 확인 | N/A |

### Sampling Rate
- **Per task commit:** `npm run build` (빌드 성공 여부)
- **Per wave merge:** `npm run build` + dist 디렉토리 구조 확인
- **Phase gate:** `npm run build` 성공 + 브라우저 수동 검증

### Wave 0 Gaps
None -- 기존 빌드 인프라(`npm run build`)로 모든 Phase 요구사항을 검증 가능. 정적 사이트 특성상 빌드 성공이 곧 기본 검증이며, UI 정확성은 수동 확인으로 충족.

## Sources

### Primary (HIGH confidence)
- [Astro Content Collections 공식 문서](https://docs.astro.build/en/guides/content-collections/) - getCollection 필터링, render() API
- [Astro Routing Reference](https://docs.astro.build/en/reference/routing-reference/) - getStaticPaths 시그니처, params/props
- [Astro Content API Reference](https://docs.astro.build/en/reference/modules/astro-content/) - getCollection 타입, render 함수
- [Tailwind CSS Grid 공식 문서](https://tailwindcss.com/docs/grid-template-columns) - 반응형 그리드 유틸리티

### Secondary (MEDIUM confidence)
- [Astro Routing Guide](https://docs.astro.build/en/guides/routing/) - base path 동작 확인

### Tertiary (LOW confidence)
None

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Phase 1에서 이미 설치/검증된 스택, 추가 라이브러리 없음
- Architecture: HIGH - Astro 공식 문서에서 직접 확인한 getStaticPaths + getCollection 패턴
- Pitfalls: HIGH - 기존 코드베이스 분석에서 직접 확인 (base path 패턴, 템플릿 현황 등)

**Research date:** 2026-03-09
**Valid until:** 2026-04-09 (안정적인 스택, 30일)
