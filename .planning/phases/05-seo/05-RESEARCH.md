# Phase 5: SEO & 런칭 - Research

**Researched:** 2026-03-11
**Domain:** SEO 메타 태그, sitemap/robots.txt, 구조화 데이터, 키워드 랜딩 페이지, GitHub Pages 배포
**Confidence:** HIGH

## Summary

Phase 5는 세 가지 핵심 영역으로 구성된다: (1) 모든 페이지의 SEO 메타 태그(title, description, OG, 네이버 인증) 설정, (2) sitemap.xml과 robots.txt 자동 생성, (3) 업종별 키워드 랜딩 페이지 4개 제작. 추가로 GitHub Pages 배포 설정 업데이트와 JSON-LD 구조화 데이터 적용이 포함된다.

Astro 생태계에 `@astrojs/sitemap` 공식 통합(v3.7.1)이 존재하여 sitemap 생성은 설정 한 줄로 해결된다. robots.txt는 정적 파일 또는 Astro endpoint로 간단히 생성 가능하다. OG 태그는 기존 `BaseLayout.astro`의 `<head>` 영역을 확장하면 되고, JSON-LD는 `<script type="application/ld+json">` 패턴으로 구현한다. GitHub Actions 워크플로우는 이미 존재하지만 `site` URL 업데이트가 필요하다.

**Primary recommendation:** `@astrojs/sitemap` 공식 통합 설치 + `BaseLayout.astro` OG/JSON-LD 확장 + `src/pages/solutions/` 키워드 랜딩 페이지 4개 정적 생성 + `astro.config.mjs` site URL 수정

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- 업종별 키워드 랜딩 페이지 4개: 금융 자동화, 마케팅 자동화, HR 자동화, IT 자동화
- URL 구조: `/solutions/{slug}` (기존 `/category/{slug}`와 분리)
- 콘텐츠 구성: 문제-해결형 -- '이런 업무 고민이 있나요?' -> 'n8n으로 이렇게 해결합니다' -> 관련 템플릿 목록
- CTA: '템플릿 보러가기' 버튼으로 해당 카테고리 페이지(`/category/{slug}`)로 이동
- title 패턴: `키워드 | n8n 마켓플레이스` (키워드 우선)
- description: MDX의 description 필드를 메타 description으로 자동 활용
- OG 이미지: 정적 공통 이미지 1장 (1200x630 PNG, 브랜드 로고 + '업무 자동화 템플릿' 타이틀)
- 네이버 대응: naver-site-verification 메타 태그 플레이스홀더 추가
- GitHub Pages URL: `https://cskwork.github.io/n8n-marketplace`
- astro.config.mjs의 `site`를 `https://cskwork.github.io`로 업데이트
- JSON-LD: 템플릿 상세 페이지에만 SoftwareApplication 스키마 적용
- og:locale ko_KR 설정
- 페이지별 한국어 키워드 매핑

### Claude's Discretion
- sitemap.xml, robots.txt 생성 방식
- OG 이미지 디자인 세부사항
- GitHub Actions 워크플로우 상세 구성
- JSON-LD 스키마 필드 상세 구성
- 키워드 랜딩 페이지의 세부 문구/레이아웃

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SEO-01 | 각 페이지에 적절한 메타 태그(title, description, OG)가 설정된다 | BaseLayout.astro 확장으로 OG 메타 태그 추가. 기존 title/description prop 활용. og:image, og:type, og:url, og:locale 추가 |
| SEO-02 | sitemap.xml과 robots.txt가 자동 생성된다 | @astrojs/sitemap v3.7.1 공식 통합 사용. robots.txt는 public/ 정적 파일로 생성 |
| SEO-03 | 업종별 키워드 랜딩 페이지가 존재한다 | src/pages/solutions/ 디렉토리에 4개 정적 페이지 생성. 문제-해결형 구성으로 검색 유입 최적화 |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @astrojs/sitemap | ^3.7.1 | sitemap.xml 자동 생성 | Astro 공식 통합. 빌드 시 모든 페이지 URL 자동 수집 + sitemap-index.xml 생성 |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| (없음 - 추가 의존성 불필요) | - | - | - |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| @astrojs/sitemap | 수동 sitemap.xml | 유지보수 부담. 새 페이지 추가 시 수동 업데이트 필요 |
| 정적 robots.txt | astro-robots-txt 패키지 | 규칙이 단순하므로 의존성 추가 불필요. public/robots.txt면 충분 |
| 수동 OG 태그 | astro-seo 패키지 | 태그 수가 적어 직접 작성이 더 가볍고 제어 용이 |
| 수동 JSON-LD | astro-seo-schema 패키지 | 스키마 1종(SoftwareApplication)만 사용하므로 직접 구현이 적절 |

**Installation:**
```bash
npx astro add sitemap
```

또는 수동 설치:
```bash
npm install @astrojs/sitemap
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── layouts/
│   └── BaseLayout.astro          # OG 태그, JSON-LD, naver-verification 추가
├── pages/
│   ├── solutions/                # [NEW] 키워드 랜딩 페이지
│   │   ├── finance.astro         # 금융 자동화
│   │   ├── marketing.astro       # 마케팅 자동화
│   │   ├── hr.astro              # HR 자동화
│   │   └── it.astro              # IT 자동화
│   ├── category/[slug].astro     # 기존 (변경 없음)
│   ├── template/[...id].astro    # JSON-LD 추가
│   ├── index.astro               # 메타 태그 보강
│   └── pricing.astro             # 메타 태그 보강
├── components/
│   └── seo/                      # [NEW] SEO 관련 컴포넌트
│       └── JsonLd.astro          # JSON-LD 구조화 데이터 컴포넌트
public/
├── robots.txt                    # [NEW] 정적 robots.txt
└── og-image.png                  # [NEW] 공통 OG 이미지 (1200x630)
```

### Pattern 1: BaseLayout OG 태그 확장
**What:** 기존 BaseLayout에 OG 메타 태그 + 네이버 인증 메타 태그 추가
**When to use:** 모든 페이지에 공통 적용
**Example:**
```astro
---
// BaseLayout.astro - Props 확장
interface Props {
  title: string;
  description?: string;
  ogImage?: string;
  ogType?: string;
  breadcrumbs?: Array<{ label: string; href: string }>;
  jsonLd?: Record<string, unknown>;
}

const {
  title,
  description = 'n8n 워크플로우 템플릿 마켓플레이스 - 비개발자를 위한 업무 자동화',
  ogImage = '/n8n-marketplace/og-image.png',
  ogType = 'website',
  breadcrumbs,
  jsonLd,
} = Astro.props;

const canonicalURL = new URL(Astro.url.pathname, Astro.site);
const ogImageURL = new URL(ogImage, Astro.site);
const pageTitle = `${title} | n8n 마켓플레이스`;
---

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content={description} />
  <title>{pageTitle}</title>

  <!-- Canonical -->
  <link rel="canonical" href={canonicalURL} />

  <!-- Open Graph -->
  <meta property="og:type" content={ogType} />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={ogImageURL} />
  <meta property="og:url" content={canonicalURL} />
  <meta property="og:locale" content="ko_KR" />
  <meta property="og:site_name" content="n8n 마켓플레이스" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={pageTitle} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImageURL} />

  <!-- 네이버 서치어드바이저 인증 -->
  <!-- TODO: 배포 후 네이버 서치어드바이저에서 발급받은 인증 코드로 교체하세요 -->
  <meta name="naver-site-verification" content="NAVER_VERIFICATION_CODE_HERE" />

  <!-- JSON-LD 구조화 데이터 -->
  {jsonLd && (
    <script type="application/ld+json" set:html={JSON.stringify(jsonLd)} />
  )}
</head>
```

### Pattern 2: 템플릿 상세 페이지 JSON-LD
**What:** 템플릿 상세 페이지에 SoftwareApplication 스키마 적용
**When to use:** template/[...id].astro에서만
**Example:**
```astro
---
// template/[...id].astro 내부
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": title,
  "description": description,
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": pricing === 'free' ? 0 : (price || 19000),
    "priceCurrency": "KRW",
  },
};
---

<BaseLayout
  title={title}
  description={description}
  ogType="article"
  jsonLd={jsonLd}
>
```

### Pattern 3: 키워드 랜딩 페이지 구조
**What:** 문제-해결형 SEO 랜딩 페이지
**When to use:** /solutions/{slug} 4개 페이지
**Example:**
```astro
---
// solutions/finance.astro
import BaseLayout from '../../layouts/BaseLayout.astro';
import TemplateCard from '../../components/catalog/TemplateCard.astro';
import { getCollection } from 'astro:content';

const allTemplates = await getCollection('templates');
const financeTemplates = allTemplates.filter(t => t.data.category === 'finance');

const painPoints = [
  { icon: '...', title: '매일 수동으로 주가 확인', description: '관심 종목이 많아질수록...' },
  { icon: '...', title: 'DART 공시 놓침', description: '실시간 공시를 일일이...' },
  // ...
];

const solutions = [
  { title: '주가 자동 모니터링', description: 'n8n이 매일 아침...' },
  { title: 'DART 공시 자동 알림', description: '새 공시 등록 시...' },
  // ...
];
---

<BaseLayout
  title="금융 자동화 - n8n으로 금융 업무 자동화하기"
  description="주가 모니터링, DART 공시 알림, 인보이스 처리 등 금융 업무를 n8n 워크플로우로 자동화하세요"
>
  <!-- 1. 히어로: 공감형 문구 -->
  <!-- 2. 고민 섹션: 문제 나열 -->
  <!-- 3. 해결 섹션: n8n으로 이렇게 해결 -->
  <!-- 4. 관련 템플릿 목록 (TemplateCard 재사용) -->
  <!-- 5. CTA: '템플릿 보러가기' -> /category/finance -->
</BaseLayout>
```

### Pattern 4: astro.config.mjs sitemap 통합
**What:** @astrojs/sitemap 설정 추가 + site URL 수정
**When to use:** 빌드 설정
**Example:**
```javascript
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://cskwork.github.io',
  base: '/n8n-marketplace',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### Anti-Patterns to Avoid
- **OG 이미지 경로에 base 누락:** Astro에서 `base`가 설정된 경우 OG 이미지 URL에도 `/n8n-marketplace/og-image.png` 포함 필요. `Astro.site`와 `Astro.url`을 사용하면 자동 처리됨
- **JSON-LD에 문자열 보간 직접 사용:** XSS 위험. 반드시 `JSON.stringify()` + `set:html` 패턴 사용
- **sitemap에 site 미설정:** `@astrojs/sitemap`은 `astro.config.mjs`의 `site` 값이 필수. 없으면 빌드 에러
- **robots.txt에 sitemap URL 오타:** `Sitemap: https://cskwork.github.io/n8n-marketplace/sitemap-index.xml` 정확히 기재

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| sitemap.xml 생성 | 수동 XML 작성 | @astrojs/sitemap | 새 페이지 추가 시 자동 반영. sitemap-index.xml + 청크 분할 지원 |
| OG 이미지 동적 생성 | satori/sharp 파이프라인 | 정적 이미지 1장 | 20개 미만 템플릿 규모에서 동적 생성은 오버엔지니어링 |
| URL 정규화 | 수동 URL 조립 | Astro.site + Astro.url | base path 자동 처리. 오타 방지 |

**Key insight:** 이 프로젝트는 정적 사이트(18개 템플릿)이므로 대부분의 SEO 작업을 Astro 빌트인 기능으로 처리 가능. 복잡한 SEO 라이브러리 도입은 불필요.

## Common Pitfalls

### Pitfall 1: base 경로와 OG URL 불일치
**What goes wrong:** OG 이미지나 canonical URL에 `/n8n-marketplace` base 경로가 누락되어 소셜 미리보기 이미지가 깨짐
**Why it happens:** `Astro.url.pathname`은 base를 포함하지만, 수동으로 URL을 조립하면 누락하기 쉬움
**How to avoid:** 항상 `new URL(path, Astro.site)` 패턴 사용. 절대로 문자열 연결로 URL 조립하지 않기
**Warning signs:** 소셜 미디어 공유 시 이미지 미표시, Google Search Console에서 canonical 경고

### Pitfall 2: sitemap에 site 속성 미설정
**What goes wrong:** `@astrojs/sitemap` 빌드 시 에러 발생
**Why it happens:** `astro.config.mjs`에 `site` 값이 `'https://username.github.io'`로 되어 있거나 누락
**How to avoid:** site를 `'https://cskwork.github.io'`로 정확히 설정
**Warning signs:** `astro build` 시 sitemap 관련 에러 메시지

### Pitfall 3: GitHub Actions lockfile 미커밋
**What goes wrong:** `withastro/action`이 패키지 매니저를 감지하지 못해 빌드 실패
**Why it happens:** lockfile이 `.gitignore`에 포함되거나 커밋되지 않음
**How to avoid:** `package-lock.json`이 git에 추적되는지 확인 (현재 프로젝트: 이미 추적 중 - OK)
**Warning signs:** GitHub Actions 로그에서 "No lockfile found" 에러

### Pitfall 4: 네이버 서치어드바이저 인증 지연
**What goes wrong:** 사이트 등록 후 검색 노출까지 2-4주 소요
**Why it happens:** 네이버 크롤러의 인덱싱 주기
**How to avoid:** 배포 즉시 서치어드바이저 등록 진행. 인증 코드 플레이스홀더를 미리 준비해 배포 직후 교체
**Warning signs:** 등록 후에도 네이버 검색에 미노출 (정상 - 시간 필요)

### Pitfall 5: JSON-LD SoftwareApplication에 offers 누락
**What goes wrong:** Google 리치 결과에서 소프트웨어 앱 카드가 표시되지 않음
**Why it happens:** Google은 SoftwareApplication에 `offers.price` 필수
**How to avoid:** 무료 템플릿은 `"price": 0`, 프리미엄은 실제 가격 설정. `priceCurrency: "KRW"` 포함
**Warning signs:** Google Rich Results Test에서 경고 표시

## Code Examples

### robots.txt (public/robots.txt)
```
# Source: Astro 정적 파일 패턴
User-agent: *
Allow: /

Sitemap: https://cskwork.github.io/n8n-marketplace/sitemap-index.xml
```

### 키워드 매핑 테이블
```typescript
// 페이지별 한국어 키워드 매핑
const seoKeywords: Record<string, { title: string; description: string }> = {
  // 홈
  'index': {
    title: 'n8n 템플릿 마켓플레이스',
    description: 'n8n 워크플로우 템플릿 마켓플레이스 - 비개발자를 위한 업무 자동화 템플릿을 다운로드하세요',
  },
  // 카테고리
  'finance': {
    title: '금융 자동화 n8n 템플릿',
    description: 'DART 공시, 주가 알림, 인보이스 자동화 등 금융 업무 자동화 n8n 워크플로우 템플릿',
  },
  'marketing': {
    title: '마케팅 자동화 n8n 템플릿',
    description: 'SNS 자동 포스팅, 리드 수집, 콘텐츠 제작 등 마케팅 업무 자동화 n8n 워크플로우 템플릿',
  },
  'hr': {
    title: 'HR 자동화 n8n 템플릿',
    description: '채용공고 자동 수집, 온보딩, 지원자 관리 등 HR 업무 자동화 n8n 워크플로우 템플릿',
  },
  'it': {
    title: 'IT 자동화 n8n 템플릿',
    description: '서버 모니터링, 배포 자동화, 알림 통합 등 IT/DevOps 업무 자동화 n8n 워크플로우 템플릿',
  },
  // Solutions (SEO 랜딩)
  'solutions-finance': {
    title: '금융 자동화 - n8n으로 금융 업무 자동화하기',
    description: '주가 모니터링, DART 공시 알림, 인보이스 처리 등 금융 업무를 n8n으로 자동화하세요. 무료 템플릿 제공.',
  },
  'solutions-marketing': {
    title: '마케팅 자동화 - n8n으로 마케팅 업무 자동화하기',
    description: 'SNS 자동 포스팅, 경쟁사 모니터링, 콘텐츠 파이프라인 등 마케팅 업무를 n8n으로 자동화하세요.',
  },
  'solutions-hr': {
    title: 'HR 자동화 - n8n으로 채용/인사 업무 자동화하기',
    description: '채용공고 자동 수집, AI 자소서, 온보딩 자동화 등 HR 업무를 n8n으로 자동화하세요.',
  },
  'solutions-it': {
    title: 'IT 자동화 - n8n으로 IT/DevOps 업무 자동화하기',
    description: '서버 헬스 모니터링, Slack-Notion 연동, 일일 보고서 등 IT 업무를 n8n으로 자동화하세요.',
  },
  // 가격
  'pricing': {
    title: '가격 안내 - n8n 프리미엄 워크플로우 템플릿',
    description: 'n8n 프리미엄 워크플로우 템플릿 가격 안내. 무료 vs 프리미엄 비교, 포함 사항 확인.',
  },
};
```

### SoftwareApplication JSON-LD 전체 예시
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "주가 모니터링 알리미",
  "description": "공공데이터포털 주식시세정보 API로 관심 종목의 전일 종가를 매일 조회하고, 목표가 도달 시 Slack으로 즉시 알림을 보냅니다",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "inLanguage": "ko",
  "offers": {
    "@type": "Offer",
    "price": 0,
    "priceCurrency": "KRW"
  }
}
```

### OG 이미지 사양
```
파일: public/og-image.png
크기: 1200 x 630 px
내용: n8n 브랜드 컬러 배경 + 로고 + "업무 자동화 템플릿" 타이틀
포맷: PNG
용도: 모든 페이지 공통 OG 이미지
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| 수동 sitemap.xml | @astrojs/sitemap 자동 생성 | Astro 2.x+ | 빌드 시 자동 업데이트, 유지보수 제로 |
| meta keywords 태그 | Google이 무시 (2009~) | 2009 | keywords 메타 태그 불필요. title + description만 중요 |
| 단일 sitemap.xml | sitemap-index.xml + 분할 | 최근 표준 | 대규모 사이트 대응. 소규모도 index 패턴 사용 |
| withastro/action@v3 | withastro/action@v5 | 2025 | 최신 버전 권장. 기존 v3도 동작하지만 v5로 업그레이드 권장 |

**Deprecated/outdated:**
- `meta keywords` 태그: Google이 2009년부터 무시. 추가할 필요 없음
- withastro/action@v3: 동작하지만 v5가 최신. 업그레이드 권장 (현재 deploy.yml이 v3 사용 중)

## Open Questions

1. **OG 이미지 실제 생성 방법**
   - What we know: 1200x630 PNG, 브랜드 컬러 + 로고 + 타이틀 필요
   - What's unclear: 이미지 디자인 도구/방법 (Figma, 수동, 코드 생성 등)
   - Recommendation: 단순 디자인이므로 SVG를 HTML로 렌더링하거나, 플레이스홀더 이미지를 생성하고 추후 디자인 교체 가능하도록 `public/og-image.png` 경로만 확보. 코드 노드에서 Canvas API 등으로 간단히 생성 가능

2. **withastro/action 버전 업그레이드 범위**
   - What we know: 현재 v3 사용 중, v5가 최신
   - What's unclear: v3 -> v5 마이그레이션에 breaking changes 있는지
   - Recommendation: 워크플로우 구조가 동일하므로 v5로 업그레이드해도 안전. actions/checkout도 v4 -> v5 가능하지만 v4도 정상 동작

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Astro 빌드 검증 (빌드 성공 = 페이지 정상 생성) |
| Config file | astro.config.mjs |
| Quick run command | `npm run build` |
| Full suite command | `npm run build && npx serve dist` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SEO-01 | 모든 페이지에 OG 메타 태그 존재 | smoke | `npm run build && grep -r "og:title" dist/` | Wave 0 필요 |
| SEO-02 | sitemap.xml, robots.txt 생성 | smoke | `npm run build && test -f dist/sitemap-index.xml && test -f dist/robots.txt` | Wave 0 필요 |
| SEO-03 | 업종별 키워드 랜딩 페이지 접근 가능 | smoke | `npm run build && test -d dist/solutions/finance && test -d dist/solutions/marketing` | Wave 0 필요 |

### Sampling Rate
- **Per task commit:** `npm run build` (빌드 성공 여부)
- **Per wave merge:** `npm run build` + dist 디렉토리 내 파일 존재 검증
- **Phase gate:** 빌드 성공 + sitemap/robots.txt/OG 태그/solutions 페이지 전체 검증

### Wave 0 Gaps
- [ ] `public/robots.txt` -- SEO-02 커버
- [ ] `public/og-image.png` -- SEO-01 커버 (OG 이미지 파일)
- [ ] `src/pages/solutions/` 디렉토리 -- SEO-03 커버

*(기존 테스트 인프라 없음 -- Astro 빌드 성공이 주요 검증 수단)*

## Sources

### Primary (HIGH confidence)
- [Astro 공식 sitemap 문서](https://docs.astro.build/en/guides/integrations-guide/sitemap/) -- @astrojs/sitemap v3.7.1 설정, filter/changefreq/lastmod 옵션 확인
- [Astro GitHub Pages 배포 가이드](https://docs.astro.build/en/guides/deploy/github/) -- site/base 설정, withastro/action 워크플로우 구성 확인
- [Google SoftwareApplication 구조화 데이터](https://developers.google.com/search/docs/appearance/structured-data/software-app) -- JSON-LD 필수/권장 속성, offers.price 필수 확인

### Secondary (MEDIUM confidence)
- [Astro JSON-LD 구현 가이드](https://johndalesandro.com/blog/astro-add-json-ld-structured-data-to-your-website-for-rich-search-results/) -- set:html + JSON.stringify 패턴 확인
- [Astro SEO 종합 가이드](https://eastondev.com/blog/en/posts/dev/20251202-astro-seo-complete-guide/) -- OG 태그 베스트 프랙티스 확인
- [네이버 서치어드바이저 등록 가이드](https://www.designkits.co.kr/blog/know-how/Naver-registration/) -- naver-site-verification 메타 태그 형식 확인

### Tertiary (LOW confidence)
- 없음

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- @astrojs/sitemap은 Astro 공식 통합, 공식 문서에서 직접 확인
- Architecture: HIGH -- 기존 프로젝트 구조(BaseLayout, pages/)를 직접 분석한 결과에 기반
- Pitfalls: HIGH -- Astro base path 이슈, GitHub Actions lockfile 요구사항 등 공식 문서에서 확인
- SEO 메타 태그: HIGH -- OG 프로토콜 + Google 구조화 데이터 공식 문서 기반
- 네이버 SEO: MEDIUM -- 네이버 서치어드바이저 가이드 참조, 실제 인덱싱 타이밍은 변동 가능

**Research date:** 2026-03-11
**Valid until:** 2026-04-11 (Astro 통합/SEO 표준은 안정적이므로 30일 유효)
