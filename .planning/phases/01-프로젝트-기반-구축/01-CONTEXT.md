# Phase 1: 프로젝트 기반 구축 - Context

**Gathered:** 2026-03-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Astro 5 + Tailwind CSS 4 프로젝트를 셋업하고, Content Collections로 워크플로우 템플릿 메타데이터를 타입 안전하게 관리하며, 모바일/태블릿/데스크톱에서 정상 동작하는 반응형 레이아웃(Header/Footer)을 구축한다. 카탈로그 UI, 상세 페이지, 콘텐츠 제작은 후속 Phase에서 진행.

</domain>

<decisions>
## Implementation Decisions

### Content Collections 스키마
- 업종(금융/마케팅/HR/IT) + 용도(보고서/수집/알림 등) 2단계 분류 체계
- 난이도는 3단계: 초급/중급/고급
- 가격 모델은 free/premium enum 두 값으로 관리
- 한국 서비스 연동 템플릿은 별도 컬렉션이 아닌 같은 templates 컬렉션에서 태그로 구분
- 예상 설정 시간은 분 단위 숫자(estimatedMinutes)로 관리
- 필요 크레덴셜은 문자열 배열로 관리 (credentials: ['Gmail OAuth', 'Slack API'])
- 콘텐츠 파일 포맷: YAML frontmatter + MDX

### 레이아웃 & 네비게이션
- Header: 왼쪽 로고 + 중앙 카테고리 4개(금융/마케팅/HR/IT) 링크 + 오른쪽 CTA 버튼
- Footer: 미니말 — 저작권 + 문의 이메일/링크 + 간단한 소개 문구
- 모바일: 햄버거 메뉴로 전환 (전체 화면 또는 사이드바)
- Breadcrumb: 카테고리/상세 페이지에서만 표시 (홈 > 금융 > DART 공시 모니터링)

### 디자인 톤 & 컬러 시스템
- 클린 프로페셔널 톤 — 깨끗하고 전문적, 넓은 여백, 명확한 위계
- n8n 브랜드 컬러(오렌지/레드 계열) 기반 primary 색상
- v1은 라이트 모드만 지원 (디자인 변수는 미리 세팅, v2에서 다크모드 추가)
- Pretendard 웹폰트 사용 (한국어 웹 표준, CDN 제공)

### 프로젝트 디렉토리 구조
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

</decisions>

<specifics>
## Specific Ideas

- n8n 공식 사이트의 깔끔한 느낌을 한국화한 디자인
- Pretendard 폰트로 한국어 가독성 확보
- 워크플로우 JSON은 public/workflows/에서 직접 URL로 다운로드 가능해야 함

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- templates/complete/ 디렉토리에 3개의 n8n 워크플로우 JSON 예제 존재 (AI-이메일-분류기, 아침-브리핑-봇, 채용공고-자동수집)
- CLAUDE.md에 상세한 n8n 노드 타입, API 레퍼런스, 한국 서비스 연동 패턴 문서화

### Established Patterns
- 아직 코드 없음 — Phase 1에서 모든 패턴을 새로 수립

### Integration Points
- 기존 templates/complete/*.json → public/workflows/로 이동 또는 복사 필요
- n8n-워크플로우-종합-리서치.md의 노드 타입/스키마 정보를 Content Collections 설계 시 참고

</code_context>

<deferred>
## Deferred Ideas

None — 논의가 Phase 1 범위 내에서 진행됨

</deferred>

---

*Phase: 01-프로젝트-기반-구축*
*Context gathered: 2026-03-09*
