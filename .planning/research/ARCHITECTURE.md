# Architecture Patterns

**Domain:** n8n 워크플로우 템플릿 마켓플레이스 (정적 사이트)
**Researched:** 2026-03-09
**Overall Confidence:** HIGH

## Recommended Architecture

Astro Islands 아키텍처 기반 정적 마켓플레이스. 콘텐츠 중심 페이지는 100% 정적 HTML로 렌더링하고, 워크플로우 다이어그램과 필터링 UI만 React Island로 선택적 하이드레이션한다.

```
[빌드 시점]                              [브라우저]

src/content/                              정적 HTML 페이지
  templates/*.json  ─┐                    ├── / (랜딩)
  categories/*.yaml  ├─> Astro Build ──>  ├── /templates/ (카탈로그)
  pages/*.mdx        │   (SSG)            ├── /templates/[category]/ (카테고리)
                     │                    ├── /templates/[category]/[slug]/ (상세)
src/components/      │                    ├── /pricing/ (가격)
  react/             │                    └── /guide/ (가이드)
    WorkflowDiagram  ┘
    TemplateFilter                        React Islands (선택적 하이드레이션)
                                          ├── <WorkflowDiagram> (client:visible)
                                          └── <TemplateFilter> (client:load)
```

### Component Boundaries

| Component | Responsibility | Communicates With | 기술 |
|-----------|---------------|-------------------|------|
| **Content Layer** | 템플릿 메타데이터 + 다이어그램 데이터 관리, Zod 스키마 검증 | Astro Build | Astro Content Collections (glob/file loader) |
| **Page Generator** | 정적 HTML 페이지 생성 (카탈로그, 상세, 카테고리) | Content Layer, Layout System | Astro Pages + getStaticPaths |
| **Layout System** | 공통 레이아웃, 네비게이션, 푸터, SEO 메타태그 | Page Generator | Astro Layouts + Tailwind CSS |
| **WorkflowDiagram Island** | n8n 워크플로우 인터랙티브 시각화 (읽기 전용) | Content Layer에서 props로 변환된 데이터 수신 | React + @xyflow/react |
| **n8n-to-ReactFlow 변환기** | n8n JSON의 nodes/connections를 React Flow Node/Edge로 변환 | WorkflowDiagram에 데이터 공급 | TypeScript 유틸리티 (빌드 시점 실행) |
| **TemplateFilter Island** | 클라이언트 사이드 템플릿 검색/필터링 | 정적 JSON 인덱스 파일 | React (client:load) |
| **Asset Pipeline** | 이미지 최적화, OG 이미지 | Astro Image | astro:assets |
| **Build & Deploy** | 빌드 + GitHub Pages 자동 배포 | GitHub Actions | withastro/action v5 |

### Data Flow

```
1. 콘텐츠 작성 (빌드 전)
   ┌─────────────────────────────────────────────┐
   │ src/content/templates/*.json                 │
   │ (메타데이터 + 다이어그램용 노드/연결 데이터)   │
   └──────────────────┬──────────────────────────┘
                      ↓
   ┌─────────────────────────────────────────────┐
   │ src/content.config.ts                        │
   │ Zod 스키마 검증 → TypeScript 타입 자동 생성   │
   └──────────────────┬──────────────────────────┘
                      ↓
2. 빌드 시점 (astro build)
   ┌─────────────────────────────────────────────┐
   │ getCollection('templates')                   │
   │ → getStaticPaths()로 카테고리/상세 페이지 생성 │
   └──────────────────┬──────────────────────────┘
                      ↓
   ┌─────────────────────────────────────────────┐
   │ 각 상세 페이지에서:                           │
   │ n8nToReactFlow(diagramData) 변환 실행         │
   │ → 변환 결과를 React Island props로 직렬화     │
   └──────────────────┬──────────────────────────┘
                      ↓
   ┌─────────────────────────────────────────────┐
   │ 정적 HTML + 선택적 JS 번들 생성               │
   │ (React Flow JS는 상세 페이지에서만 로드)       │
   └──────────────────┬──────────────────────────┘
                      ↓
3. 런타임 (브라우저)
   ┌─────────────────────────────────────────────┐
   │ 정적 HTML 즉시 표시 (0 JS for most pages)    │
   │                                              │
   │ 상세 페이지 진입 시:                          │
   │   client:visible → 뷰포트 진입 시             │
   │   WorkflowDiagram 하이드레이션               │
   │   → 줌/팬/노드 호버 인터랙션                  │
   │                                              │
   │ 카탈로그 페이지:                              │
   │   client:load → TemplateFilter 즉시 활성화    │
   │   → 카테고리/난이도/가격 필터링               │
   └─────────────────────────────────────────────┘
```

## 핵심 아키텍처 결정

### 결정 1: 워크플로우 시각화 — @xyflow/react (Phase 3), n8n-demo-component 폴백 (Phase 1)

**배경:** 두 가지 옵션이 존재한다.

| 기준 | @n8n_io/n8n-demo-component | @xyflow/react |
|------|---------------------------|---------------|
| 타입 | LitElement 웹 컴포넌트 | React 라이브러리 |
| n8n 스타일 | 완벽한 n8n UI 재현 | 커스텀 노드로 구현 필요 |
| 커스터마이징 | 매우 제한적 (frame, tidyup 정도) | 무제한 (커스텀 노드/엣지/스타일) |
| 사용법 | CDN 스크립트 + `<n8n-demo workflow="...">` | React 컴포넌트, Astro Island로 통합 |
| 번들 크기 | ~50KB (CDN) | ~150KB (트리셰이킹 후) |
| Astro 호환 | HTML 어디든 삽입 가능 (하이드레이션 불필요) | React Island (client:visible) |

**전략:**
- **Phase 1 (MVP):** `n8n-demo-component`를 CDN으로 로드. 워크플로우 JSON을 그대로 전달하면 바로 시각화됨. 개발 시간 최소화.
- **Phase 3 (인터랙티브):** `@xyflow/react`로 마이그레이션. 커스텀 n8n 스타일 노드, 툴팁, 하이라이트, 브랜딩 적용.

**Phase 1 사용법 (n8n-demo-component):**
```html
<!-- CDN에서 로드 -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@n8n_io/n8n-demo-component/n8n-demo.bundled.js"></script>

<!-- 워크플로우 시각화 -->
<n8n-demo
  workflow='{"nodes":[...],"connections":{...}}'
  frame="true"
  tidyup="true"
/>
```

**Confidence:** HIGH (n8n-demo-component 공식 npm 패키지 존재 확인, @xyflow/react v12.10.1 확인)

### 결정 2: 콘텐츠 관리 — Astro Content Collections (JSON + glob loader)

**이유:**
- n8n 워크플로우가 이미 JSON 형태로 존재 (templates/complete/*.json 3개 확인)
- Astro 5.0+의 `glob()` 로더로 JSON 파일을 직접 콘텐츠 컬렉션으로 로드 가능
- Zod 스키마로 필수 메타데이터(카테고리, 가격, 난이도 등) 빌드 시 검증
- `file()` 로더 대신 `glob()` 로더 사용: 각 템플릿이 독립 파일이므로 관리 용이
- Astro 5.0+에서 설정 파일 위치는 `src/content.config.ts` (이전의 `src/content/config.ts`가 아님)

**Confidence:** HIGH (Astro 공식 문서 직접 확인)

### 결정 3: 이중 데이터 구조 (메타데이터 + 원본 JSON 분리)

**이유:**
- **메타데이터** (src/content/templates/*.json): 카탈로그 표시용. 제목, 카테고리, 난이도, 가격, 다이어그램 노드 정보(이름+타입+위치만)
- **원본 워크플로우 JSON** (src/data/workflows/*.json 또는 public/downloads/): 실제 n8n에 임포트 가능한 전체 JSON
- 메타데이터는 가볍고 모든 페이지에서 빠르게 로드 가능
- 프리미엄 워크플로우는 다이어그램만 표시하고 전체 JSON은 제공하지 않음

**Confidence:** HIGH (아키텍처 원칙, 실제 JSON 구조 확인)

### 결정 4: Props 직렬화 — 빌드 시점에 변환

**배경:** Astro에서 React Island로 전달하는 props는 직렬화 가능해야 한다. 지원 타입: plain object, number, string, Array, Map, Set, RegExp, Date, BigInt, URL, Uint8Array 등.

**전략:** n8n JSON → React Flow 변환을 Astro 페이지의 프론트매터(서버 사이드)에서 실행하고, 변환된 Node[]/Edge[] 배열을 props로 전달. 이렇게 하면:
- 클라이언트 JS 번들에 변환 로직 포함 안 됨
- 직렬화 가능한 plain object만 전달
- 빌드 시 한 번만 실행

**Confidence:** HIGH (Astro 공식 문서에서 props 직렬화 타입 확인)

## Content Collection 스키마 설계

```typescript
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const templates = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/templates' }),
  schema: z.object({
    // 기본 정보
    name: z.string(),
    slug: z.string(),
    category: z.enum(['finance', 'marketing', 'hr', 'it-devops', 'local-llm']),
    description: z.string(),
    shortDescription: z.string().max(100),

    // 분류
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    pricing: z.enum(['free', 'premium']),
    price: z.number().optional(), // 프리미엄일 때만
    tags: z.array(z.string()),

    // 기술 정보
    nodeCount: z.number(),
    estimatedTime: z.string(), // "1-2시간"
    requiredCredentials: z.array(z.string()), // ["Google Sheets OAuth2", "Slack API"]
    services: z.array(z.string()), // ["사람인", "Google Sheets", "Slack"]

    // 다이어그램 렌더링용 축약 데이터
    diagramData: z.object({
      nodes: z.array(z.object({
        name: z.string(),
        type: z.string(),
        position: z.tuple([z.number(), z.number()]),
      })),
      connections: z.record(z.any()),
    }),

    // 다운로드 (무료 템플릿만)
    workflowFile: z.string().optional(), // "downloads/채용공고-자동수집.json"

    // 메타
    updatedAt: z.string(),
    featured: z.boolean().default(false),
  }),
});

const categories = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/categories' }),
  schema: z.object({
    name: z.string(),         // "금융"
    slug: z.string(),         // "finance"
    description: z.string(),
    icon: z.string(),         // Lucide icon name
    color: z.string(),        // Tailwind color class
    order: z.number(),
  }),
});

export const collections = { templates, categories };
```

## n8n JSON -> React Flow 변환 유틸리티

```typescript
// src/lib/n8n-to-reactflow.ts
import type { Node, Edge } from '@xyflow/react';

interface N8nDiagramNode {
  name: string;
  type: string;
  position: [number, number];
}

interface N8nConnections {
  [sourceName: string]: {
    main: Array<Array<{ node: string; type: string; index: number }>>;
  };
}

// n8n 노드 타입 → 시각적 카테고리 매핑
const NODE_TYPE_MAP: Record<string, { category: string; color: string }> = {
  'scheduleTrigger': { category: 'trigger', color: '#FF6D5A' },
  'webhook':         { category: 'trigger', color: '#FF6D5A' },
  'manualTrigger':   { category: 'trigger', color: '#FF6D5A' },
  'emailReadImap':   { category: 'trigger', color: '#FF6D5A' },
  'httpRequest':     { category: 'action',  color: '#7B61FF' },
  'code':            { category: 'code',    color: '#FF9922' },
  'if':              { category: 'logic',   color: '#17BEA9' },
  'switch':          { category: 'logic',   color: '#17BEA9' },
  'googleSheets':    { category: 'action',  color: '#34A853' },
  'slack':           { category: 'action',  color: '#4A154B' },
  'gmail':           { category: 'action',  color: '#EA4335' },
  'telegram':        { category: 'action',  color: '#0088CC' },
  'notion':          { category: 'action',  color: '#000000' },
  'openAi':          { category: 'ai',      color: '#10A37F' },
  'agent':           { category: 'ai',      color: '#10A37F' },
};

function getNodeMeta(n8nType: string) {
  const shortType = n8nType.split('.').pop() || n8nType;
  return NODE_TYPE_MAP[shortType] || { category: 'action', color: '#525252' };
}

export function n8nToReactFlow(
  nodes: N8nDiagramNode[],
  connections: N8nConnections
): { nodes: Node[]; edges: Edge[] } {
  const rfNodes: Node[] = nodes.map((node) => {
    const meta = getNodeMeta(node.type);
    return {
      id: node.name,
      type: 'n8nNode',
      position: { x: node.position[0], y: node.position[1] },
      data: {
        label: node.name,
        nodeType: node.type.split('.').pop() || node.type,
        category: meta.category,
        color: meta.color,
      },
      draggable: false,
      selectable: true,
      connectable: false,
    };
  });

  const rfEdges: Edge[] = [];
  for (const [sourceName, conn] of Object.entries(connections)) {
    if (!conn.main) continue;
    conn.main.forEach((outputs, outputIndex) => {
      outputs.forEach((target) => {
        rfEdges.push({
          id: `${sourceName}-${target.node}-${outputIndex}`,
          source: sourceName,
          target: target.node,
          type: 'smoothstep',
          animated: true,
          style: { strokeWidth: 2 },
        });
      });
    });
  }

  return { nodes: rfNodes, edges: rfEdges };
}
```

## 페이지 구조 & 라우팅

| URL 경로 | 파일 | 데이터 소스 | 역할 |
|----------|------|------------|------|
| `/` | `src/pages/index.astro` | featured 템플릿 + 카테고리 목록 | 랜딩 페이지 |
| `/templates/` | `src/pages/templates/index.astro` | 전체 템플릿 컬렉션 | 카탈로그 (필터 Island) |
| `/templates/[category]/` | `src/pages/templates/[category]/index.astro` | 카테고리별 필터링 | 카테고리 목록 |
| `/templates/[category]/[slug]/` | `src/pages/templates/[category]/[slug].astro` | 개별 템플릿 | 상세 (다이어그램 Island) |
| `/pricing/` | `src/pages/pricing.astro` | 정적 | 가격/모델 설명 |
| `/guide/` | `src/pages/guide/index.astro` | 정적/MDX | n8n 시작 가이드 |

### getStaticPaths 패턴

```astro
---
// src/pages/templates/[category]/[slug].astro
import { getCollection } from 'astro:content';
import TemplateLayout from '../../../layouts/TemplateLayout.astro';
import WorkflowDiagram from '../../../components/react/WorkflowDiagram';
import { n8nToReactFlow } from '../../../lib/n8n-to-reactflow';

export async function getStaticPaths() {
  const templates = await getCollection('templates');
  return templates.map((t) => ({
    params: { category: t.data.category, slug: t.data.slug },
    props: { template: t },
  }));
}

const { template } = Astro.props;

// 빌드 시점에 변환 (클라이언트 JS에 포함되지 않음)
const { nodes, edges } = n8nToReactFlow(
  template.data.diagramData.nodes,
  template.data.diagramData.connections
);
---

<TemplateLayout title={template.data.name} description={template.data.description}>
  <!-- 정적 HTML 영역 -->
  <section class="template-info">
    <h1>{template.data.name}</h1>
    <p>{template.data.description}</p>
    <!-- 뱃지, 서비스 목록, 크레덴셜 안내 등 -->
  </section>

  <!-- React Island: 뷰포트 진입 시 하이드레이션 -->
  <section class="workflow-diagram">
    <WorkflowDiagram
      client:visible
      nodes={nodes}
      edges={edges}
      title={template.data.name}
    />
  </section>

  <!-- 정적 HTML: 다운로드/문의 -->
  <section class="download">
    {template.data.pricing === 'free' ? (
      <a href={`/${template.data.workflowFile}`} download>무료 다운로드</a>
    ) : (
      <a href="mailto:contact@example.com">프리미엄 구매 문의</a>
    )}
  </section>
</TemplateLayout>
```

## Anti-Patterns to Avoid

### Anti-Pattern 1: 전체 워크플로우 JSON을 페이지에 인라인

**What:** 프리미엄 워크플로우 JSON 전체를 HTML에 직접 포함
**Why bad:** 프리미엄 콘텐츠가 소스 코드에 노출되어 무료로 추출 가능. 페이지 크기 불필요하게 증가 (워크플로우 JSON은 10-50KB).
**Instead:** 다이어그램 렌더링용 축약 데이터(노드 이름+타입+위치)만 전달. 프리미엄 워크플로우의 전체 JSON은 리포지토리에 포함하지 않고, 구매 확인 후 이메일 등으로 별도 전달.

### Anti-Pattern 2: SPA 클라이언트 라우팅

**What:** React Router 등으로 페이지 전환을 클라이언트에서 처리
**Why bad:** SEO 파괴 (검색엔진 크롤러가 JS 실행 못 함), 초기 로드 JS 증가, Astro의 핵심 장점(정적 HTML + 0 JS) 상실
**Instead:** Astro의 파일 기반 라우팅으로 각 페이지를 독립 HTML로 생성. 선택적으로 Astro View Transitions API로 부드러운 네비게이션 효과 추가.

### Anti-Pattern 3: 하나의 거대한 React Island

**What:** 카탈로그 전체 (카드 그리드 + 필터 + 페이지네이션)를 하나의 React 컴포넌트로 구현
**Why bad:** JavaScript 번들 크기 급증, 정적 렌더링의 SEO/성능 이점 상실, 초기 로드 지연
**Instead:** 카드 그리드는 정적 Astro 컴포넌트로, 필터 UI만 React Island로 분리. 필터 변경 시 CSS `display:none/block`으로 카드 표시/숨김 (data 속성 활용), 또는 Astro의 정적 페이지네이션 사용.

### Anti-Pattern 4: client:load 남용

**What:** 모든 React 컴포넌트에 `client:load` 사용
**Why bad:** 페이지 로딩 시 모든 JS 즉시 실행. FCP/LCP 저하.
**Instead:** 다이어그램은 `client:visible` (뷰포트 진입 시), 필터는 `client:load` (필수 인터랙션), 기타 UI는 `client:idle` (브라우저 유휴 시).

### Anti-Pattern 5: 빌드 시 n8n 인스턴스 API 의존

**What:** 빌드할 때마다 n8n 인스턴스에서 워크플로우를 동적으로 가져옴
**Why bad:** n8n 인스턴스 다운 시 빌드 실패, GitHub Actions에서 n8n 접근 불가, 빌드 시간 증가
**Instead:** 워크플로우 JSON을 리포지토리에 커밋. 새 워크플로우 추가는 로컬에서 n8n MCP 도구로 JSON 생성 후 커밋.

## 디렉토리 구조

```
n8n-maker/
├── astro.config.mjs              # site, base, integrations 설정
├── tailwind.config.mjs           # Tailwind 설정
├── tsconfig.json
├── package.json
│
├── src/
│   ├── content.config.ts         # 콘텐츠 컬렉션 스키마 (Astro 5.0+ 위치)
│   │
│   ├── content/                  # 콘텐츠 컬렉션 소스
│   │   ├── templates/            # 템플릿 메타데이터 (JSON)
│   │   │   ├── finance/
│   │   │   │   ├── 보고서-자동생성.json
│   │   │   │   └── DART-기업분석.json
│   │   │   ├── marketing/
│   │   │   │   └── 인스타-자동포스팅.json
│   │   │   ├── hr/
│   │   │   │   └── 채용공고-자동수집.json
│   │   │   ├── it-devops/
│   │   │   │   └── 서버-모니터링.json
│   │   │   └── local-llm/
│   │   │       └── AI-이메일-분류기.json
│   │   └── categories/           # 카테고리 정의 (YAML)
│   │       ├── finance.yaml
│   │       ├── marketing.yaml
│   │       ├── hr.yaml
│   │       ├── it-devops.yaml
│   │       └── local-llm.yaml
│   │
│   ├── pages/
│   │   ├── index.astro           # 랜딩 페이지
│   │   ├── pricing.astro         # 가격/모델 설명
│   │   ├── templates/
│   │   │   ├── index.astro       # 전체 카탈로그 (필터 Island 포함)
│   │   │   └── [category]/
│   │   │       ├── index.astro   # 카테고리별 목록
│   │   │       └── [slug].astro  # 템플릿 상세 (다이어그램 Island 포함)
│   │   └── guide/
│   │       ├── index.astro       # n8n 시작 가이드
│   │       └── [slug].astro      # 개별 가이드 (MDX)
│   │
│   ├── components/
│   │   ├── astro/                # 정적 Astro 컴포넌트 (0 JS)
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   ├── TemplateCard.astro
│   │   │   ├── TemplateGrid.astro
│   │   │   ├── CategoryNav.astro
│   │   │   ├── PricingTable.astro
│   │   │   ├── DifficultyBadge.astro
│   │   │   ├── TierBadge.astro
│   │   │   └── SEOHead.astro
│   │   └── react/                # React Islands (선택적 JS)
│   │       ├── WorkflowDiagram.tsx    # @xyflow/react 래퍼
│   │       ├── WorkflowNode.tsx       # 커스텀 n8n 스타일 노드
│   │       ├── TemplateFilter.tsx     # 검색/필터 UI
│   │       └── CopyButton.tsx         # JSON 복사 버튼
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro      # 공통 (Header + Footer + SEO)
│   │   ├── TemplateLayout.astro  # 상세 페이지 레이아웃
│   │   └── GuideLayout.astro     # 가이드 레이아웃
│   │
│   ├── lib/
│   │   ├── n8n-to-reactflow.ts   # n8n JSON → React Flow Node/Edge 변환
│   │   ├── template-utils.ts     # 템플릿 필터링/정렬 유틸리티
│   │   └── seo.ts                # SEO 메타태그/JSON-LD 생성
│   │
│   └── styles/
│       ├── global.css            # Tailwind @import + 전역 스타일
│       └── workflow.css          # 다이어그램 전용 스타일 (노드 색상 등)
│
├── public/
│   ├── downloads/                # 무료 워크플로우 JSON (다운로드용)
│   │   ├── 채용공고-자동수집.json
│   │   ├── 아침-브리핑-봇.json
│   │   └── AI-이메일-분류기.json
│   ├── og/                       # OG 이미지
│   ├── fonts/                    # Pretendard 웹폰트
│   └── images/                   # 기타 이미지
│
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Pages 자동 배포
│
├── templates/                    # (기존) 원본 n8n 워크플로우 JSON (개발 참조용)
│   └── complete/
│       ├── 채용공고-자동수집.json
│       ├── AI-이메일-분류기.json
│       └── 아침-브리핑-봇.json
│
└── CLAUDE.md                     # 프로젝트 지침
```

## GitHub Pages 배포 설정

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://<username>.github.io',
  base: '/n8n-maker',  // 리포지토리 이름과 일치
  integrations: [react(), tailwind()],
  output: 'static',    // 기본값, 명시적 지정
});
```

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
      - uses: actions/checkout@v5
      - uses: withastro/action@v5
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
    steps:
      - uses: actions/deploy-pages@v4
```

**주의사항:**
- 내부 링크에 `base` 경로 포함 필수: `<a href="/n8n-maker/templates/">` (Astro의 `import.meta.env.BASE_URL` 활용)
- package-lock.json (또는 lockfile)을 반드시 커밋
- GitHub 리포지토리 Settings > Pages > Source를 "GitHub Actions"로 설정

## 프리미엄 콘텐츠 보호 전략 (v1)

v1은 결제 시스템 없이 문의 기반이므로:

| 구분 | 다이어그램 | 상세 설명 | JSON 다운로드 |
|------|----------|---------|-------------|
| 무료 | 전체 노드 표시 | 완전 공개 (사용법, 크레덴셜 가이드) | public/downloads/에서 직접 다운로드 |
| 프리미엄 | 전체 노드 표시 (구조만, 파라미터 숨김) | 개요만 공개, 세부 설정은 "구매 후 제공" | 비활성화, 문의 버튼 표시 |

**프리미엄 JSON 보호:** 프리미엄 템플릿의 원본 JSON은 리포지토리에 포함하지 않음. 메타데이터의 `diagramData`에는 노드 이름/타입/위치만 포함하여 다이어그램 렌더링은 가능하되, 실제 파라미터(API 키 참조, 코드 로직 등)는 노출하지 않음.

## Scalability Considerations

| 관심사 | 10개 템플릿 | 100개 템플릿 | 500+ 템플릿 |
|--------|-------------|--------------|-------------|
| 빌드 시간 | < 10초 | < 30초 (Astro 5 Content Layer 5x 빠름) | 1-3분 |
| React Flow 번들 | ~150KB (한 번만 로드) | 동일 | 동일 |
| 검색/필터 | data 속성 기반 CSS 토글 | JSON 인덱스 + Fuse.js (~20KB) | Pagefind (빌드 시 인덱싱) |
| 페이지 수 | ~20 | ~200 | ~1000 (GitHub Pages 한도 내) |
| 이미지 | 수동 관리 | Astro Image 최적화 필수 | 외부 CDN 고려 |
| GitHub Pages | 충분 | 충분 | 1GB 한도 주의, Cloudflare Pages 고려 |

## Suggested Build Order (의존성 기반)

각 Phase가 이전 Phase에 의존하는 구조:

```
Phase 1: 기반 구조 + MVP
  ├── Astro 프로젝트 초기화 (astro.config.mjs, tailwind, react 통합)
  ├── Content Collection 스키마 정의 (content.config.ts)
  ├── 기존 3개 템플릿을 메타데이터 JSON으로 변환
  ├── 기본 레이아웃 (BaseLayout, Header, Footer)
  ├── 랜딩 페이지 + 카탈로그 페이지
  └── n8n-demo-component로 워크플로우 시각화 (CDN, 빠른 구현)
       ↓ (기본 구조 완성 필요)
Phase 2: 콘텐츠 & 라우팅 완성
  ├── 카테고리 YAML + 카테고리 페이지 ([category]/index.astro)
  ├── 템플릿 상세 페이지 ([category]/[slug].astro)
  ├── 무료/프리미엄 구분 UI
  ├── JSON 다운로드 기능 (무료)
  └── 가격 페이지
       ↓ (페이지 구조 완성 필요)
Phase 3: 인터랙티브 Islands 업그레이드
  ├── @xyflow/react로 마이그레이션 (커스텀 노드 + n8n 스타일)
  ├── n8n-to-reactflow 변환 유틸리티
  ├── WorkflowNode 커스텀 컴포넌트 (트리거/액션/로직/AI 노드 타입별)
  ├── TemplateFilter Island (카테고리/난이도/가격 필터링)
  └── CopyButton Island (워크플로우 JSON 클립보드 복사)
       ↓ (핵심 기능 완성 후)
Phase 4: SEO & 마케팅 & 가이드
  ├── SEO 메타태그 최적화 (업종별 한국어 키워드)
  ├── JSON-LD 구조화된 데이터
  ├── OG 이미지 생성
  ├── n8n 시작 가이드 콘텐츠 (MDX)
  └── 추가 템플릿 콘텐츠 작성
       ↓ (전체 완성 후)
Phase 5: 배포 & 최적화
  ├── GitHub Actions 워크플로우 설정
  ├── 성능 최적화 (이미지, 폰트, 번들)
  ├── 최종 테스트
  └── 프로덕션 배포
```

**Phase 순서 근거:**
- Phase 1이 먼저인 이유: Content Collection과 레이아웃이 모든 후속 작업의 기반
- Phase 2가 Phase 3보다 먼저인 이유: 페이지 구조가 있어야 Island를 삽입할 위치가 존재
- Phase 3이 Phase 4보다 먼저인 이유: 핵심 차별화 요소(인터랙티브 다이어그램)가 SEO보다 우선
- n8n-demo-component를 Phase 1에서 사용하는 이유: MVP를 빠르게 시각적으로 완성하고, Phase 3에서 더 나은 UX로 업그레이드

## Sources

- [Astro Content Collections 공식 문서](https://docs.astro.build/en/guides/content-collections/) - HIGH confidence
- [Astro Content Loader API Reference](https://docs.astro.build/en/reference/content-loader-reference/) - HIGH confidence
- [Astro Islands Architecture 공식 문서](https://docs.astro.build/en/concepts/islands/) - HIGH confidence
- [Astro Framework Components (Props 직렬화)](https://docs.astro.build/en/guides/framework-components/) - HIGH confidence
- [Astro GitHub Pages 배포 가이드](https://docs.astro.build/en/guides/deploy/github/) - HIGH confidence
- [withastro/action GitHub Action](https://github.com/withastro/action) - HIGH confidence
- [@xyflow/react v12.10.1 npm](https://www.npmjs.com/package/@xyflow/react) - HIGH confidence
- [React Flow Custom Nodes 문서](https://reactflow.dev/learn/customization/custom-nodes) - HIGH confidence
- [@n8n_io/n8n-demo-component v1.0.20 npm](https://www.npmjs.com/package/@n8n_io/n8n-demo-component) - HIGH confidence
- [n8n-demo-component 사용 가이드](https://n8n-io.github.io/n8n-demo-webcomponent/) - MEDIUM confidence
- [n8n 커뮤니티: 워크플로우 시각화 임베딩](https://community.n8n.io/t/how-does-the-n8n-website-render-and-display-workflows-beginner-question/145068) - MEDIUM confidence
- [Astro Content Collections 2026 가이드](https://inhaq.com/blog/getting-started-with-astro-content-collections.html) - MEDIUM confidence
- [n8n to React Flow 변환 예시 (커뮤니티)](https://github.com/reddisanjeevkumar/English-Workflow-to-n8n-JSON-Visual-Editor) - LOW confidence
