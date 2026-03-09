# Phase 2: 카탈로그 & 랜딩 UI - Context

**Gathered:** 2026-03-09
**Status:** Ready for planning

<domain>
## Phase Boundary

사용자가 랜딩 페이지에서 마켓플레이스 전체를 한눈에 파악하고, 업종별 카테고리(금융/마케팅/HR/IT·DevOps)로 템플릿을 탐색할 수 있다. 카테고리 페이지에서 카드형 레이아웃으로 템플릿 목록을 보고, 카드를 클릭하면 상세 페이지로 이동한다. 상세 페이지 구현은 Phase 3 범위.

</domain>

<decisions>
## Implementation Decisions

### 랜딩 페이지 구성
- 히어로 섹션에 통계 수치를 CTA 버튼 아래 가로 인라인으로 추가 ('20+ 템플릿 · 4개 업종 · 즉시 다운로드')
- 섹션 배치 순서: 히어로 → 카테고리 → 인기 템플릿 → CTA (현재 구조 유지)
- 인기 템플릿 섹션에 4개 표시 (카테고리당 1개씩 균형적으로)

### 카테고리 페이지 레이아웃
- category/[slug].astro 동적 라우팅 페이지 생성
- 상단 헤더: 카테고리명 + 설명 한 줄 + 템플릿 N개 카운트
- 템플릿 카드 그리드: 데스크톱 3칸, 태블릿 2칸, 모바일 1칸
- 간단한 정렬 드롭다운 제공 (난이도순/최신순/가격순)
- 빈 카테고리: '준비 중입니다' 안내 메시지 + 다른 카테고리 링크 제공

### 템플릿 카드 디자인
- 정보 배치: 제목 → 설명(2줄 클램프) → 배지들(카테고리/난이도/가격)
- 하단에 보조 정보: 노드 수 + 예상 설정 시간 ('6개 노드 · 25분')
- 무료/프리미엄 구분: 색상 배지 (무료: 초록 배경, 프리미엄: 호박 배경) — 현재 패턴 유지
- 카드 클릭 시 template/[slug] 상세 페이지로 이동 (Phase 3에서 구현될 페이지)

### 모바일 탐색 경험
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

</decisions>

<specifics>
## Specific Ideas

- 현재 index.astro의 카테고리 카드에 커스텀 SVG 아이콘이 이미 적용됨 — 이 패턴 유지
- 인기 템플릿 4개는 각 카테고리를 대표하는 것을 자동 선택 (카테고리별 첫 번째)
- 카드 디자인은 현재 인덱스 페이지의 샘플 템플릿 카드를 기반으로 확장
- 클린 프로페셔널 톤 유지 — n8n 공식 사이트의 깔끔한 느낌

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/layout/Header.astro`: 카테고리 4개 링크 이미 포함
- `src/components/layout/Footer.astro`: 공통 푸터
- `src/components/layout/MobileMenu.astro`: 모바일 내비게이션 메뉴
- `src/components/layout/Breadcrumb.astro`: 카테고리/상세 페이지용 브레드크럼
- `src/layouts/BaseLayout.astro`: 모든 페이지 공통 레이아웃
- `src/pages/index.astro`: 현재 랜딩 페이지 (히어로 + 카테고리 + 샘플 + CTA)

### Established Patterns
- Content Collections: `src/content/templates/*.mdx` — title, description, category, useCase, difficulty, pricing, estimatedMinutes, credentials, tags, workflowJsonPath, nodeCount, publishedAt
- Tailwind CSS 4: n8n 브랜드 컬러(primary), surface 컬러 시스템
- 반응형 브레이크포인트: md(768px)에서 모바일/데스크톱 전환
- 카테고리 slug 매핑: finance, marketing, hr, it
- 카테고리 한글 매핑, 난이도 한글 매핑이 index.astro에 이미 정의

### Integration Points
- `pages/category/[slug].astro` 신규 생성 필요
- `pages/template/[slug].astro` — Phase 3에서 생성, 카드 링크 대상
- `getCollection('templates')` API로 카테고리별 필터링
- Header의 카테고리 링크가 `/n8n-marketplace/category/{slug}` 경로 사용

</code_context>

<deferred>
## Deferred Ideas

None — 논의가 Phase 2 범위 내에서 진행됨

</deferred>

---

*Phase: 02-카탈로그-랜딩-UI*
*Context gathered: 2026-03-09*
