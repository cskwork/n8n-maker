# Phase 3: 상세 페이지 & 비즈니스 모델 - Research

**Researched:** 2026-03-09
**Domain:** Astro 5 동적 페이지, n8n-demo-component 시각화, 파일 다운로드, Google Form 연동
**Confidence:** MEDIUM

## Summary

Phase 3은 템플릿 상세 페이지(`/template/[id]`), 워크플로우 다이어그램 시각화, 무료/프리미엄 다운로드 분기, /pricing 페이지를 구현한다. 핵심 기술 도메인은 4가지: (1) Astro 5 Content Collections의 동적 라우트와 MDX 렌더링, (2) n8n-demo-component(CDN 웹 컴포넌트)를 통한 워크플로우 시각화, (3) 클라이언트 사이드 파일 다운로드, (4) Google Form 프리필 URL 연동.

가장 큰 기술적 리스크는 **n8n-demo-component**이다. 이 컴포넌트는 내부적으로 iframe을 사용하여 n8n 프리뷰 서비스(`n8n-preview-service.internal.n8n.cloud`)에 워크플로우 JSON을 `postMessage`로 전달하여 렌더링한다. 이 외부 서비스에 의존하므로 반드시 폴백(정적 노드 목록 or Mermaid 다이어그램)을 함께 구현해야 한다. npm 최신 버전은 1.0.20이며 8개월 전 마지막 업데이트.

**Primary recommendation:** n8n-demo-component CDN 임베딩을 1순위로 구현하되, 로딩 실패 시 워크플로우 JSON에서 노드/연결을 파싱하여 정적 HTML/CSS 플로우차트를 표시하는 폴백을 반드시 포함한다.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- 단일 컨텐츠 플로우 구조: Breadcrumb -> 제목+메타 -> 다이어그램 -> 설명(MDX body) -> 설정 가이드 -> CTA -> 관련 템플릿
- 상단 메타정보는 컴팩트 배지 라인: 제목 아래 한 줄에 난이도 + 설정시간 + 노드수 + 가격 배지 (TemplateCard의 배지 패턴 재사용)
- CTA 위치: 상단 고정(헤더 바로 아래) + 하단 반복(페이지 바닥)
- 하단에 '관련 템플릿' 섹션: 같은 카테고리의 다른 템플릿 2-3개를 TemplateCard 컴포넌트로 표시
- 모바일에서도 단일 플로우 유지 (md 브레이크포인트 적용)
- n8n-demo-component(CDN)를 고정 높이 컨테이너에 임베딩: 데스크톱 400-500px, 모바일 250-300px
- 컨테이너 내부 스크롤/줌으로 다이어그램 탐색
- 모바일: 수평 스크롤 + 핀치줌 지원
- 프리미엄 템플릿도 다이어그램 전체 표시 (마케팅 도구로 활용, JSON 다운로드만 잠금)
- 폴백: 로딩 중 스켈레톤 표시, n8n-demo-component 실패 시 워크플로우 JSON에서 노드 목록을 추출해 정적 SVG/HTML 노드-연결 플로우차트로 표시
- 무료 템플릿: 즉시 다운로드 -- 버튼 클릭 시 public/workflows/의 JSON 파일 직접 다운로드 (workflowJsonPath 링크)
- 프리미엄 템플릿: CTA 영역에 'XX,000원 + 구매 문의하기' 버튼 -- 가격 명시 + Google Form 연결
- Google Form URL에 템플릿 이름을 쿼리 파라미터로 자동 전달 (사용자 수동 입력 불필요)
- 별도 /pricing 페이지 생성: 프리미엄 가격 범위, 포함 사항(커스터마이징 가이드, 1:1 지원 등), Google Form 문의 링크
- 설정 가이드: MDX body 내 단계별 섹션으로 구성 (별도 컴포넌트 없이 마크다운)
- 필요 크레덴셜을 배지 목록으로 표시하고, 가이드 섹션의 해당 단계로 앵커 링크 연결

### Claude's Discretion
- 다이어그램 컨테이너의 정확한 높이값 및 border/shadow 스타일링
- 정적 SVG 폴백의 구체적 구현 방식
- 관련 템플릿 선택 알고리즘 (같은 카테고리 내 랜덤 vs 최신 vs 다른 난이도)
- /pricing 페이지의 구체적 레이아웃과 문구
- 모바일 다이어그램 핀치줌 구현 세부사항

### Deferred Ideas (OUT OF SCOPE)
None -- 논의가 Phase 3 범위 내에서 진행됨
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| DETAIL-01 | 각 템플릿의 상세 페이지에서 설명, 사용 시나리오, 필요 크레덴셜 목록을 볼 수 있다 | Astro 5 동적 라우트 + Content Collections getEntry/render 패턴, MDX body 렌더링, 크레덴셜 배지 |
| DETAIL-02 | 상세 페이지에서 n8n-demo-component로 워크플로우 다이어그램을 인터랙티브하게 볼 수 있다 | n8n-demo-component CDN 임베딩 + 폴백 구현 |
| DETAIL-03 | 무료 템플릿의 JSON을 다운로드 버튼으로 즉시 다운로드할 수 있다 | HTML anchor download 속성으로 public/workflows/ 직접 링크 |
| DETAIL-04 | 프리미엄 템플릿은 다이어그램 프리뷰만 제공하고 Google Form 문의로 연결된다 | pricing 필드 기반 조건 분기 + Google Form prefill URL |
| DETAIL-05 | 각 템플릿에 난이도(초급/중급/고급)와 예상 설정 시간이 표시된다 | Content Collections 스키마의 difficulty/estimatedMinutes 필드, TemplateCard 배지 패턴 재사용 |
| DETAIL-06 | 단계별 설정 가이드(크레덴셜 발급 ~ n8n 활성화)가 한글로 제공된다 | MDX body 내 마크다운 섹션으로 구성, 앵커 링크 |
| VISUAL-01 | n8n-demo-component(CDN)로 워크플로우 JSON을 인터랙티브 다이어그램으로 렌더링한다 | CDN 3 스크립트 로딩 + workflow 속성에 JSON 전달 |
| VISUAL-02 | 다이어그램에서 각 노드의 타입과 연결 흐름을 시각적으로 확인할 수 있다 | n8n-demo-component가 자동으로 노드 타입/연결 렌더링 |
| VISUAL-03 | 다이어그램이 모바일에서도 적절히 표시된다 (스크롤/줌) | collapseformobile 속성 + CSS 컨테이너 제어 |
| BIZ-01 | 카테고리당 2-3개 무료 템플릿이 즉시 다운로드 가능하다 | pricing === 'free' 조건 + anchor download |
| BIZ-02 | 프리미엄 템플릿은 Google Form 문의 연결로 구매 요청할 수 있다 | Google Form prefill URL + entry.XXXX 파라미터 |
| BIZ-03 | 가격 정보 또는 프리미엄 안내 페이지가 존재한다 | /pricing 정적 페이지 신규 생성 |
</phase_requirements>

## Standard Stack

### Core (이미 설치됨 - 추가 설치 불필요)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | ^5.18.0 | 정적 사이트 프레임워크 | 이미 프로젝트 기반 |
| @astrojs/mdx | ^4.3.0 | MDX 지원 | 이미 설치됨 |
| Tailwind CSS | ^4.2.0 | 스타일링 | 이미 설치됨 |

### CDN Dependencies (npm 설치 불필요, HTML script 태그로 로드)
| Library | CDN URL | Purpose | Why CDN |
|---------|---------|---------|---------|
| @webcomponents/webcomponentsjs | `https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.0.0/webcomponents-loader.js` | Web Components 폴리필 | n8n-demo 의존성 |
| lit polyfill | `https://www.unpkg.com/lit@2.0.0-rc.2/polyfill-support.js` | Lit Element 폴리필 | n8n-demo 의존성 |
| @n8n_io/n8n-demo-component | `https://cdn.jsdelivr.net/npm/@n8n_io/n8n-demo-component/n8n-demo.bundled.js` | 워크플로우 다이어그램 렌더링 | 정적 사이트에 적합한 CDN 로딩 |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| n8n-demo-component | Mermaid.js | 워크플로우 JSON -> Mermaid 변환 필요, n8n 네이티브 UI 아님, 노드 아이콘 없음 |
| n8n-demo-component | React Flow (v2) | npm 의존성 추가 필요, Astro React integration 필요, v2 범위 |
| 정적 HTML 폴백 | Canvas/SVG 라이브러리 | 과잉 엔지니어링, 단순 폴백에 라이브러리 불필요 |

**Installation:** 추가 npm 설치 없음. CDN 스크립트만 HTML에 추가.

## Architecture Patterns

### Recommended Project Structure (신규 파일)
```
src/
  pages/
    template/
      [...id].astro        # 템플릿 상세 동적 라우트 (신규)
    pricing.astro           # 프리미엄 안내 페이지 (신규)
  components/
    detail/
      WorkflowDiagram.astro # n8n-demo 임베딩 + 폴백 (신규)
      DiagramFallback.astro # 정적 노드 플로우차트 (신규)
      CtaSection.astro      # 무료/프리미엄 CTA 분기 (신규)
      RelatedTemplates.astro # 관련 템플릿 섹션 (신규)
      CredentialBadges.astro # 크레덴셜 배지 목록 (신규)
```

### Pattern 1: Astro 5 Content Collections 동적 라우트
**What:** `[...id].astro`에서 getStaticPaths로 모든 템플릿의 상세 페이지를 정적 생성
**When to use:** 각 MDX 템플릿마다 개별 상세 페이지 생성 시
**Example:**
```astro
---
// src/pages/template/[...id].astro
// Source: Astro 5 공식 문서 - Content Collections API
import { getCollection, render } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

export async function getStaticPaths() {
  const templates = await getCollection('templates');
  return templates.map((template) => ({
    params: { id: template.id },
    props: { template },
  }));
}

const { template } = Astro.props;
const { Content } = await render(template);
---
<BaseLayout title={template.data.title}>
  <Content />
</BaseLayout>
```

**CRITICAL - Astro 5 변경사항:**
- Astro 5에서 `slug` 대신 `id`를 사용한다. 파일명이 `[...slug].astro`가 아니라 `[...id].astro`이어야 한다.
- `entry.render()` 메서드가 제거되었다. `import { render } from 'astro:content'` 함수를 대신 사용한다.
- 기존 TemplateCard의 링크가 `/n8n-marketplace/template/${slug}`이고 `slug`로 `template.id`를 전달하고 있으므로 라우트 경로가 일치한다.

### Pattern 2: n8n-demo-component CDN 임베딩
**What:** 외부 CDN 스크립트를 `is:inline`으로 로드하고 워크플로우 JSON을 속성으로 전달
**When to use:** 워크플로우 다이어그램 렌더링
**Example:**
```astro
---
// WorkflowDiagram.astro
interface Props {
  workflowJsonPath: string;
  templateTitle: string;
}
const { workflowJsonPath, templateTitle } = Astro.props;
---
<!-- n8n-demo 컨테이너 -->
<div class="relative rounded-xl border border-surface-200 overflow-hidden
            bg-white shadow-sm" id="diagram-container">
  <!-- 스켈레톤 로딩 표시 -->
  <div id="diagram-skeleton"
       class="h-[400px] md:h-[450px] bg-surface-50 animate-pulse
              flex items-center justify-center">
    <p class="text-surface-400">워크플로우 다이어그램 로딩 중...</p>
  </div>

  <!-- n8n-demo 컴포넌트 (클라이언트에서 로드 후 표시) -->
  <div id="diagram-live" class="hidden h-[300px] md:h-[450px]">
    <n8n-demo
      id="n8n-workflow-demo"
      collapseformobile="false"
      clicktointeract="false"
      hidecanvaserrors="true"
      tidyup="true"
    ></n8n-demo>
  </div>

  <!-- 폴백 (n8n-demo 로딩 실패 시 표시) -->
  <div id="diagram-fallback" class="hidden">
    <slot name="fallback" />
  </div>
</div>

<!-- CDN 스크립트 로딩 -->
<script is:inline src="https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.0.0/webcomponents-loader.js"></script>
<script is:inline src="https://www.unpkg.com/lit@2.0.0-rc.2/polyfill-support.js"></script>
<script is:inline src="https://cdn.jsdelivr.net/npm/@n8n_io/n8n-demo-component/n8n-demo.bundled.js"></script>

<script define:vars={{ workflowJsonPath }}>
  // 워크플로우 JSON 로드 및 n8n-demo에 전달
  async function loadWorkflow() {
    try {
      const res = await fetch(workflowJsonPath);
      if (!res.ok) throw new Error('Fetch failed');
      const workflow = await res.json();
      const demo = document.getElementById('n8n-workflow-demo');
      if (demo) {
        demo.setAttribute('workflow', JSON.stringify(workflow));
        document.getElementById('diagram-skeleton')?.classList.add('hidden');
        document.getElementById('diagram-live')?.classList.remove('hidden');
      }
    } catch (e) {
      // 폴백 표시
      document.getElementById('diagram-skeleton')?.classList.add('hidden');
      document.getElementById('diagram-fallback')?.classList.remove('hidden');
    }
  }
  // DOM 로드 후 실행
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadWorkflow);
  } else {
    loadWorkflow();
  }
</script>
```

### Pattern 3: 정적 HTML/CSS 폴백 다이어그램
**What:** n8n-demo-component 로딩 실패 시 워크플로우 JSON의 nodes/connections를 파싱하여 정적 플로우차트 표시
**When to use:** CDN 불가 환경, 네트워크 오류, n8n 프리뷰 서비스 다운 시
**Recommendation (Claude's Discretion):** 서버 사이드에서 Astro 빌드 타임에 워크플로우 JSON을 읽어 노드 목록 HTML을 미리 생성한다. 이렇게 하면 JavaScript 없이도 노드 흐름이 표시된다.
**Example:**
```astro
---
// DiagramFallback.astro
// 빌드 타임에 워크플로우 JSON을 읽어 노드 목록 생성
import fs from 'node:fs';
import path from 'node:path';

interface Props {
  workflowJsonPath: string;
}

const { workflowJsonPath } = Astro.props;
const jsonFile = path.join(process.cwd(), 'public', workflowJsonPath);
let nodes: Array<{ name: string; type: string }> = [];
let connections: Record<string, any> = {};

try {
  const raw = fs.readFileSync(jsonFile, 'utf-8');
  const wf = JSON.parse(raw);
  nodes = (wf.nodes || []).map((n: any) => ({
    name: n.name,
    type: n.type.replace('n8n-nodes-base.', '').replace('@n8n/n8n-nodes-langchain.', 'AI:'),
  }));
  connections = wf.connections || {};
} catch {}
---
<div class="p-6 bg-surface-50 rounded-xl">
  <p class="text-sm text-surface-500 mb-4">워크플로우 미리보기 (간소화)</p>
  <div class="flex flex-wrap items-center gap-3">
    {nodes.map((node, i) => (
      <div class="flex items-center gap-2">
        <div class="px-3 py-2 bg-white border border-surface-200 rounded-lg
                    text-sm font-medium text-surface-700 shadow-sm">
          {node.name}
          <span class="block text-xs text-surface-400 mt-0.5">{node.type}</span>
        </div>
        {i < nodes.length - 1 && (
          <svg class="w-4 h-4 text-surface-300 shrink-0" viewBox="0 0 16 16" fill="currentColor">
            <path d="M6 3l5 5-5 5V3z"/>
          </svg>
        )}
      </div>
    ))}
  </div>
</div>
```

### Pattern 4: 무료/프리미엄 CTA 분기
**What:** pricing 필드에 따라 다운로드 버튼 또는 구매 문의 버튼을 표시
**When to use:** 상세 페이지 CTA 영역
**Example:**
```astro
---
interface Props {
  pricing: 'free' | 'premium';
  workflowJsonPath: string;
  title: string;
  googleFormUrl: string;  // 환경변수 또는 하드코딩
}
const { pricing, workflowJsonPath, title, googleFormUrl } = Astro.props;
const prefillUrl = `${googleFormUrl}?usp=pp_url&entry.XXXXXXXXX=${encodeURIComponent(title)}`;
---
{pricing === 'free' ? (
  <a
    href={workflowJsonPath}
    download
    class="inline-flex items-center px-6 py-3 bg-primary-500
           text-white font-semibold rounded-lg hover:bg-primary-600
           transition-colors"
  >
    JSON 다운로드 (무료)
  </a>
) : (
  <a
    href={prefillUrl}
    target="_blank"
    rel="noopener noreferrer"
    class="inline-flex items-center px-6 py-3 bg-amber-500
           text-white font-semibold rounded-lg hover:bg-amber-600
           transition-colors"
  >
    구매 문의하기
  </a>
)}
```

### Pattern 5: 관련 템플릿 필터링
**Recommendation (Claude's Discretion):** 같은 카테고리에서 현재 템플릿을 제외하고 최대 3개를 선택한다. 동일 카테고리에 템플릿이 부족하면 다른 카테고리에서 보충한다.
```typescript
// 관련 템플릿 선택 알고리즘
const related = allTemplates
  .filter(t => t.data.category === currentCategory && t.id !== currentId)
  .slice(0, 3);
```

### Anti-Patterns to Avoid
- **JSON을 inline으로 workflow 속성에 넣지 말 것:** 워크플로우 JSON이 수백 줄이므로 HTML이 비대해진다. `fetch()`로 별도 로드한다.
- **n8n-demo-component를 npm install하지 말 것:** Astro 빌드 파이프라인과 LitElement 번들이 충돌할 수 있다. CDN `is:inline` 로딩이 안전하다.
- **download 속성 없이 JSON 파일 링크하지 말 것:** `<a href="...">` 만으로는 브라우저가 JSON을 표시해버린다. `download` 속성 필수.
- **폴백 없이 n8n-demo만 의존하지 말 것:** 외부 프리뷰 서비스 의존성이므로 반드시 폴백 필요.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| 워크플로우 다이어그램 렌더링 | Canvas/SVG 커스텀 렌더러 | n8n-demo-component (CDN) | n8n 네이티브 노드 아이콘, 연결선 자동 배치, 줌/패닝 내장 |
| Web Components 폴리필 | 수동 polyfill | @webcomponents/webcomponentsjs CDN | 브라우저 호환성 자동 처리 |
| 파일 다운로드 | Blob URL + programmatic download | `<a href="..." download>` | public/ 경로의 정적 파일이므로 네이티브 HTML로 충분 |
| Google Form 연동 | 커스텀 폼/백엔드 | Google Form prefill URL | 정적 사이트에서 백엔드 불필요, URL 파라미터만으로 충분 |

**Key insight:** 이 Phase의 모든 기능은 정적 사이트 범위 내에서 해결 가능하다. 백엔드나 추가 빌드 도구 없이 CDN 스크립트 + HTML 속성 + 클라이언트 JavaScript로 구현.

## Common Pitfalls

### Pitfall 1: n8n-demo-component iframe 외부 서비스 의존
**What goes wrong:** n8n-demo-component는 내부적으로 `n8n-preview-service.internal.n8n.cloud`에 iframe을 생성하고 `postMessage`로 워크플로우 JSON을 전달한다. 이 서비스가 다운되거나 변경되면 다이어그램이 표시되지 않는다.
**Why it happens:** 웹 컴포넌트 자체는 렌더링 엔진이 아니라 n8n 인스턴스의 뷰어를 iframe으로 임베딩하는 래퍼이다.
**How to avoid:** 반드시 폴백 구현. 빌드 타임에 워크플로우 JSON을 파싱하여 정적 노드 목록을 HTML로 미리 생성해둔다.
**Warning signs:** 개발 중 다이어그램이 빈 화면이거나 무한 로딩인 경우.

### Pitfall 2: Astro 5에서 slug 대신 id 사용
**What goes wrong:** Astro 4에서는 Content Collections 엔트리에 `slug` 필드가 있었지만, Astro 5에서는 `id`로 변경되었다.
**Why it happens:** Astro 5의 Content Layer 변경으로 API가 바뀌었다.
**How to avoid:** 동적 라우트 파일명을 `[...id].astro`로 생성하고, `getStaticPaths`에서 `params: { id: template.id }`를 사용한다.
**Warning signs:** 빌드 시 `slug is not defined` 에러, 또는 404 페이지.

### Pitfall 3: Astro 5에서 render() 함수 위치 변경
**What goes wrong:** `entry.render()`가 더 이상 엔트리 메서드가 아니다.
**Why it happens:** Astro 5에서 엔트리가 직렬화 가능한 순수 객체로 변경되었다.
**How to avoid:** `import { render } from 'astro:content'`로 함수를 임포트하고 `const { Content } = await render(entry)` 형태로 사용한다.
**Warning signs:** `entry.render is not a function` 에러.

### Pitfall 4: CDN 스크립트 Astro 번들링 충돌
**What goes wrong:** `<script src="...">` 태그를 `is:inline` 없이 사용하면 Astro가 스크립트를 번들링하려 한다.
**Why it happens:** Astro는 기본적으로 모든 `<script>` 태그를 처리하고 번들링한다.
**How to avoid:** 외부 CDN 스크립트에 반드시 `is:inline` 지시어를 사용한다: `<script is:inline src="..."></script>`
**Warning signs:** 빌드 에러, 스크립트 404, 번들 크기 이상 증가.

### Pitfall 5: workflowJsonPath와 base URL 불일치
**What goes wrong:** Content Collections의 `workflowJsonPath`가 `/workflows/xxx.json`이지만 Astro config에 `base: '/n8n-marketplace'`가 설정되어 있어 실제 경로가 `/n8n-marketplace/workflows/xxx.json`이 된다.
**Why it happens:** Astro의 base 설정이 모든 경로에 prefix를 추가한다.
**How to avoid:** `import.meta.env.BASE_URL`을 사용하여 경로를 조합하거나, `<a>` 태그에서 Astro가 자동으로 base를 추가하는지 확인한다. fetch() 호출 시에는 수동으로 base URL을 추가해야 한다.
**Warning signs:** 다운로드 링크 404, fetch 실패.

### Pitfall 6: Google Form entry ID 하드코딩 미스
**What goes wrong:** Google Form의 prefill URL에 잘못된 `entry.XXXXXXXXX` ID를 사용하면 필드가 채워지지 않는다.
**Why it happens:** 각 Google Form 필드는 고유한 numeric ID를 가지며, 이를 정확히 가져와야 한다.
**How to avoid:** Google Form에서 "사전 입력된 링크 가져오기"를 통해 정확한 entry ID를 확인한다. 또는 Form 생성 후 테스트 prefill URL을 만들어 확인한다.
**Warning signs:** Google Form 열렸지만 템플릿 이름 필드가 비어있음.

## Code Examples

### Astro 5 동적 라우트 전체 구조
```astro
---
// src/pages/template/[...id].astro
// Source: Astro 5 Content Collections 공식 문서
import { getCollection, render } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import WorkflowDiagram from '../../components/detail/WorkflowDiagram.astro';
import DiagramFallback from '../../components/detail/DiagramFallback.astro';
import CtaSection from '../../components/detail/CtaSection.astro';
import RelatedTemplates from '../../components/detail/RelatedTemplates.astro';
import CredentialBadges from '../../components/detail/CredentialBadges.astro';
import TemplateCard from '../../components/catalog/TemplateCard.astro';

export async function getStaticPaths() {
  const allTemplates = await getCollection('templates');
  return allTemplates.map((template) => ({
    params: { id: template.id },
    props: {
      template,
      allTemplates,
    },
  }));
}

const { template, allTemplates } = Astro.props;
const { Content } = await render(template);
const { title, description, category, difficulty, pricing,
        estimatedMinutes, credentials, workflowJsonPath, nodeCount } = template.data;

// 카테고리/난이도 한글 매핑 (TemplateCard와 동일)
const categoryLabel: Record<string, string> = {
  finance: '금융', marketing: '마케팅', hr: 'HR', it: 'IT/DevOps',
};
const difficultyLabel: Record<string, string> = {
  beginner: '초급', intermediate: '중급', advanced: '고급',
};

// 관련 템플릿
const related = allTemplates
  .filter(t => t.data.category === category && t.id !== template.id)
  .slice(0, 3);

// base URL
const base = import.meta.env.BASE_URL;
---
```

### 무료 템플릿 다운로드 (HTML download 속성)
```html
<!-- Source: HTML5 download 속성 표준 -->
<!-- public/workflows/의 JSON 파일을 직접 다운로드 -->
<a
  href={`${base}${workflowJsonPath}`}
  download={`${template.id}.json`}
  class="inline-flex items-center gap-2 px-6 py-3
         bg-primary-500 text-white font-semibold rounded-lg
         hover:bg-primary-600 transition-colors"
>
  <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 3a1 1 0 011 1v7.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 11.586V4a1 1 0 011-1z"/>
    <path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
  </svg>
  JSON 다운로드 (무료)
</a>
```

### Google Form Prefill URL 구성
```typescript
// Google Form URL 파라미터 구성
// Source: Google Forms prefill URL 공식 문서
const GOOGLE_FORM_BASE = 'https://docs.google.com/forms/d/e/FORM_ID/viewform';
const TEMPLATE_NAME_ENTRY_ID = 'entry.XXXXXXXXX'; // Form에서 가져온 실제 ID

function buildGoogleFormUrl(templateName: string): string {
  const params = new URLSearchParams({
    'usp': 'pp_url',
    [TEMPLATE_NAME_ENTRY_ID]: templateName,
  });
  return `${GOOGLE_FORM_BASE}?${params.toString()}`;
}
```

### n8n-demo-component 속성 설정
```html
<!-- Source: n8n-demo-webcomponent 공식 API 문서 -->
<n8n-demo
  workflow='{"nodes":[],"connections":{}}'
  collapseformobile="false"
  clicktointeract="false"
  hidecanvaserrors="true"
  tidyup="true"
  theme="light"
></n8n-demo>

<!-- CSS 커스텀 속성으로 스타일링 -->
<style>
n8n-demo {
  --n8n-workflow-min-height: 400px;
  --n8n-iframe-border-radius: 12px;
}
</style>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `entry.render()` 메서드 | `render(entry)` 함수 임포트 | Astro 5.0 (2024 Q4) | MDX 렌더링 코드 변경 필요 |
| `slug` 기반 라우팅 | `id` 기반 라우팅 | Astro 5.0 (2024 Q4) | 동적 라우트 파일명/params 변경 |
| n8n-demo-component 자체 렌더링 | iframe + 외부 프리뷰 서비스 | 현재 동작 방식 | 외부 서비스 의존성 인지 필요 |
| Google Form 수동 입력 | Prefill URL 파라미터 | 안정 기능 | 사용자 편의성 향상 |

**Deprecated/outdated:**
- `entry.render()`: Astro 5에서 제거됨, `import { render } from 'astro:content'` 사용
- `entry.slug`: Astro 5에서 `entry.id`로 대체
- n8n-demo-component `frame="true"`: 코드 복사 기능이 포함된 프레임 - 이 프로젝트에서는 불필요 (다이어그램 미리보기만 필요)

## Open Questions

1. **n8n-demo-component 프리뷰 서비스 안정성**
   - What we know: `n8n-preview-service.internal.n8n.cloud` 도메인을 사용하며, 커뮤니티에서 간헐적 인증 이슈 보고
   - What's unclear: 이 서비스가 장기적으로 공개 유지될지, rate limit이 있는지
   - Recommendation: 폴백 구현을 필수로 포함하고, 개발 중 실제 렌더링 테스트를 반복하여 안정성 확인. 문제 발생 시 `src` 속성으로 자체 n8n 인스턴스 지정 가능.

2. **Google Form 실제 URL과 entry ID**
   - What we know: prefill URL 형식은 `?usp=pp_url&entry.XXXXXXXXX=value`
   - What's unclear: 사용자가 아직 Google Form을 생성하지 않았을 수 있음
   - Recommendation: 플레이스홀더 URL과 entry ID를 사용하고, 실제 Form 생성 후 교체하도록 TODO 코멘트를 남긴다. 상수로 분리하여 교체 용이하게 한다.

3. **Content Collections에 price 필드 부재**
   - What we know: 현재 스키마에 `pricing: enum(['free', 'premium'])`만 있고, 실제 가격(₩XX,000) 필드가 없다
   - What's unclear: CTA에 "₩XX,000 + 구매 문의하기" 표시를 결정했는데, 가격 데이터를 어디서 가져올지
   - Recommendation: Content Collections 스키마에 `price: z.number().optional()` 필드를 추가하거나, /pricing 페이지에 일괄 가격 테이블만 표시하고 CTA에서는 "프리미엄 + 구매 문의"로만 안내. 프리미엄 템플릿 MDX frontmatter에 price 추가가 가장 유연함.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Astro 빌드 검증 (별도 테스트 프레임워크 없음) |
| Config file | none -- 프로젝트에 테스트 프레임워크 미설치 |
| Quick run command | `npm run build` |
| Full suite command | `npm run build && npx astro preview` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| DETAIL-01 | 상세 페이지에서 설명, 크레덴셜 목록 표시 | smoke | `npm run build` (페이지 생성 확인) | -- Wave 0 |
| DETAIL-02 | n8n-demo-component 다이어그램 표시 | manual-only | 브라우저에서 시각 확인 (CDN 의존) | N/A |
| DETAIL-03 | 무료 JSON 다운로드 | manual-only | 브라우저에서 클릭 후 다운로드 확인 | N/A |
| DETAIL-04 | 프리미엄 Google Form 연결 | manual-only | 브라우저에서 링크 확인 | N/A |
| DETAIL-05 | 난이도, 설정 시간 표시 | smoke | `npm run build` (빌드 성공 = 데이터 바인딩 정상) | -- Wave 0 |
| DETAIL-06 | 설정 가이드 표시 | smoke | `npm run build` (MDX 렌더링 확인) | -- Wave 0 |
| VISUAL-01 | n8n-demo CDN 다이어그램 렌더링 | manual-only | 브라우저에서 시각 확인 | N/A |
| VISUAL-02 | 노드 타입/연결 시각 확인 | manual-only | 브라우저에서 시각 확인 | N/A |
| VISUAL-03 | 모바일 다이어그램 적절 표시 | manual-only | 브라우저 모바일 뷰포트에서 확인 | N/A |
| BIZ-01 | 무료 템플릿 다운로드 가능 | manual-only | 브라우저에서 다운로드 테스트 | N/A |
| BIZ-02 | 프리미엄 Google Form 연결 | manual-only | 링크 이동 확인 | N/A |
| BIZ-03 | /pricing 페이지 존재 | smoke | `npm run build` (페이지 생성 확인) | -- Wave 0 |

### Sampling Rate
- **Per task commit:** `npm run build` (빌드 성공 확인)
- **Per wave merge:** `npm run build && npx astro preview` (로컬 프리뷰 서버로 시각 확인)
- **Phase gate:** 빌드 성공 + 브라우저에서 3개 템플릿 상세 페이지 접근 + 다운로드 + 다이어그램 확인

### Wave 0 Gaps
- 이 프로젝트는 정적 사이트로 별도 테스트 프레임워크가 없다. `npm run build` 성공이 기본 검증.
- n8n-demo-component와 Google Form 연동은 브라우저 수동 테스트가 유일한 방법 (외부 서비스 의존).
- 자동화 테스트 추가보다 빌드 성공 + 수동 시각 검증이 현 단계에서 적절.

## Sources

### Primary (HIGH confidence)
- [n8n-demo-component 공식 문서 - API](https://n8n-io.github.io/n8n-demo-webcomponent/api/) - 전체 속성, 메서드 확인
- [n8n-demo-component 공식 문서 - Install](https://n8n-io.github.io/n8n-demo-webcomponent/install/) - CDN URL, 스크립트 태그 확인
- [n8n-demo-component 공식 문서 - CSS](https://n8n-io.github.io/n8n-demo-webcomponent/examples/customize-styles/) - CSS 커스텀 속성 확인
- [Astro 5 Content Collections 문서](https://docs.astro.build/en/guides/content-collections/) - 동적 라우트, render() 함수 변경
- [Astro 5 API Reference](https://docs.astro.build/en/reference/modules/astro-content/) - getCollection, getEntry, render 함수
- [Astro Client-Side Scripts](https://docs.astro.build/en/guides/client-side-scripts/) - is:inline 지시어, define:vars

### Secondary (MEDIUM confidence)
- [n8n Community - Demo Service](https://community.n8n.io/t/demo-service-github-project/16743) - iframe + postMessage 동작 방식, 프리뷰 서비스 URL 확인
- [n8n Community - Workflow Embedding](https://community.n8n.io/t/how-to-integrate-a-workflow-visualisation-on-my-website/43583) - 임베딩 접근 방식 논의
- [@n8n_io/n8n-demo-component npm](https://www.npmjs.com/package/@n8n_io/n8n-demo-component) - 버전 1.0.20, 8개월 전 업데이트
- [Google Forms Prefill URL](https://hooshmand.net/prepopulate-google-forms-utms/) - entry 파라미터 형식 확인

### Tertiary (LOW confidence)
- n8n-demo-component의 `src` 속성 기본값이 `n8n-preview-service.internal.n8n.cloud`인지 - 커뮤니티 언급 기반이며 공식 확인 안됨
- 프리뷰 서비스의 장기 안정성 및 rate limit - 공식 문서에 명시 없음

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Astro 5, Tailwind CSS 4 이미 프로젝트에 설치되어 있고 패턴 확인됨
- Architecture: HIGH - Astro 5 동적 라우트, Content Collections 패턴 공식 문서에서 확인
- n8n-demo-component: MEDIUM - 공식 문서 확인했으나, 프리뷰 서비스 의존성의 안정성은 불확실
- 폴백 구현: MEDIUM - 워크플로우 JSON 파싱은 확실하나, 시각적 품질은 구현에 따라 다름
- Google Form 연동: HIGH - prefill URL 형식은 안정적인 표준 기능
- Pitfalls: HIGH - Astro 5 변경사항은 공식 마이그레이션 가이드에서 확인

**Research date:** 2026-03-09
**Valid until:** 2026-04-09 (n8n-demo-component CDN 변경 가능성으로 30일)
