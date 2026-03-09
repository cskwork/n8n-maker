# Phase 3: 상세 페이지 & 비즈니스 모델 - Context

**Gathered:** 2026-03-09
**Status:** Ready for planning

<domain>
## Phase Boundary

각 템플릿의 상세 정보를 인터랙티브 다이어그램과 함께 보여주고, 무료 템플릿은 즉시 JSON 다운로드, 프리미엄 템플릿은 Google Form 문의를 통해 구매할 수 있는 상세 페이지와 비즈니스 모델을 구현한다. 검색/필터링, 결제 시스템, 사용자 계정은 이 Phase 범위 밖.

</domain>

<decisions>
## Implementation Decisions

### 상세 페이지 레이아웃
- 단일 컨텐츠 플로우 구조: Breadcrumb → 제목+메타 → 다이어그램 → 설명(MDX body) → 설정 가이드 → CTA → 관련 템플릿
- 상단 메타정보는 컴팩트 배지 라인: 제목 아래 한 줄에 난이도 · 설정시간 · 노드수 · 가격 배지 (TemplateCard의 배지 패턴 재사용)
- CTA 위치: 상단 고정(헤더 바로 아래) + 하단 반복(페이지 바닥)
- 하단에 '관련 템플릿' 섹션: 같은 카테고리의 다른 템플릿 2-3개를 TemplateCard 컴포넌트로 표시
- 모바일에서도 단일 플로우 유지 (md 브레이크포인트 적용)

### 다이어그램 표시
- n8n-demo-component(CDN)를 고정 높이 컨테이너에 임베딩: 데스크톱 400-500px, 모바일 250-300px
- 컨테이너 내부 스크롤/줌으로 다이어그램 탐색
- 모바일: 수평 스크롤 + 핀치줌 지원
- 프리미엄 템플릿도 다이어그램 전체 표시 (마케팅 도구로 활용, JSON 다운로드만 잠금)
- 폴백: 로딩 중 스켈레톤 표시, n8n-demo-component 실패 시 워크플로우 JSON에서 노드 목록을 추출해 정적 SVG/HTML 노드-연결 플로우차트로 표시

### 무료/프리미엄 구매 동선
- 무료 템플릿: 즉시 다운로드 — 버튼 클릭 시 public/workflows/의 JSON 파일 직접 다운로드 (workflowJsonPath 링크)
- 프리미엄 템플릿: CTA 영역에 '₩XX,000 · 구매 문의하기' 버튼 — 가격 명시 + Google Form 연결
- Google Form URL에 템플릿 이름을 쿼리 파라미터로 자동 전달 (사용자 수동 입력 불필요)
- 별도 /pricing 페이지 생성: 프리미엄 가격 범위, 포함 사항(커스터마이징 가이드, 1:1 지원 등), Google Form 문의 링크

### 설정 가이드 구조
- MDX body 내 단계별 섹션으로 구성 (별도 컴포넌트 없이 마크다운)
- 구조: ## 설정 가이드 → Step 1: 크레덴셜 발급 → Step 2: n8n 설정 → Step 3: 활성화
- 필요 크레덴셜을 배지 목록으로 표시하고, 가이드 섹션의 해당 단계로 앵커 링크 연결
- 끝단계: JSON 다운로드 → n8n 에디터에서 Import Workflow → 크레덴셜 설정 → 활성화 순서로 간결하게 안내

### Claude's Discretion
- 다이어그램 컨테이너의 정확한 높이값 및 border/shadow 스타일링
- 정적 SVG 폴백의 구체적 구현 방식
- 관련 템플릿 선택 알고리즘 (같은 카테고리 내 랜덤 vs 최신 vs 다른 난이도)
- /pricing 페이지의 구체적 레이아웃과 문구
- 모바일 다이어그램 핀치줌 구현 세부사항

</decisions>

<specifics>
## Specific Ideas

- 단일 컨텐츠 플로우는 모바일 퍼스트 접근 — 위에서 아래로 자연스러운 읽기 흐름
- TemplateCard 배지 패턴(primary/surface/green/amber)을 상세 페이지 메타에서도 동일하게 사용하여 시각적 일관성 유지
- 프리미엄 다이어그램을 완전히 보여주는 것은 "이 워크플로우가 이렇게 복잡한데 이 가격이면 괜찮다"는 가치 전달 전략
- Google Form 쿼리 파라미터로 템플릿명 자동 전달하여 사용자 편의성 극대화

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/catalog/TemplateCard.astro`: 관련 템플릿 섹션에서 재사용 가능, 배지 패턴(카테고리/난이도/가격) 동일 적용
- `src/components/layout/Breadcrumb.astro`: 상세 페이지 상단 홈 > 카테고리 > 템플릿명 표시
- `src/layouts/BaseLayout.astro`: 상세 페이지도 동일 레이아웃 래핑
- `public/workflows/*.json`: 3개 워크플로우 JSON 존재, 무료 템플릿 즉시 다운로드 가능

### Established Patterns
- Content Collections 스키마: title, description, category, useCase, difficulty, pricing, estimatedMinutes, credentials, workflowJsonPath, nodeCount 필드 존재
- MDX body에 템플릿 설명 텍스트 포함 (렌더링만 하면 됨)
- 카테고리/난이도 한글 매핑이 TemplateCard에 단일 소스로 관리
- Tailwind CSS 4 n8n 브랜드 컬러(primary), surface 컬러 시스템
- md(768px) 브레이크포인트에서 모바일/데스크톱 전환

### Integration Points
- `pages/template/[slug].astro` 신규 생성 필요 (TemplateCard가 이미 이 경로로 링크)
- `pages/pricing.astro` 신규 생성 필요
- `getCollection('templates')` API로 관련 템플릿 필터링
- n8n-demo-component CDN 스크립트 임베딩 (클라이언트 사이드 렌더링)

</code_context>

<deferred>
## Deferred Ideas

None — 논의가 Phase 3 범위 내에서 진행됨

</deferred>

---

*Phase: 03-detail-page-business-model*
*Context gathered: 2026-03-09*
