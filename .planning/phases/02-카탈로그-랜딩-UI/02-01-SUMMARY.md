---
phase: 02-카탈로그-랜딩-UI
plan: 01
subsystem: ui
tags: [astro, tailwind, content-collections, dynamic-routing, catalog]

# Dependency graph
requires:
  - phase: 01-프로젝트-기반-구축
    provides: BaseLayout, Breadcrumb, Content Collections 스키마, Tailwind 컬러 시스템
provides:
  - TemplateCard 재사용 카드 컴포넌트
  - SortDropdown 클라이언트 정렬 컴포넌트
  - EmptyCategory 빈 카테고리 안내 컴포넌트
  - category/[slug].astro 4개 카테고리 정적 페이지
affects: [02-02-랜딩-개선, 03-템플릿-상세]

# Tech tracking
tech-stack:
  added: []
  patterns: [getStaticPaths 동적 라우트, 클라이언트 DOM 재정렬, data-* 속성 정렬 키]

key-files:
  created:
    - src/components/catalog/TemplateCard.astro
    - src/components/catalog/SortDropdown.astro
    - src/components/catalog/EmptyCategory.astro
    - src/pages/category/[slug].astro
  modified: []

key-decisions:
  - "categoryMeta를 getStaticPaths 내부에 정의 (Astro 스코프 제약으로 외부 const 참조 불가)"
  - "categoryLabel/difficultyLabel 매핑을 TemplateCard 내부 단일 소스로 관리"
  - "EmptyCategory에 SVG 문서 아이콘 + 안내 문구 + 다른 카테고리 링크 제공"

patterns-established:
  - "catalog 컴포넌트 패턴: TemplateCard Props 인터페이스 (title, description, category, difficulty, pricing, nodeCount?, estimatedMinutes, slug)"
  - "정렬 패턴: data-difficulty/data-date/data-pricing 속성 + id=template-grid + id=sort-select"
  - "카테고리 라우트 패턴: getStaticPaths 내부 categoryMeta + getCollection 필터링"

requirements-completed: [CATA-01, CATA-02, CATA-03]

# Metrics
duration: 3min
completed: 2026-03-09
---

# Phase 2 Plan 01: 카탈로그 컴포넌트 + 카테고리 라우트 Summary

**getStaticPaths 기반 4개 카테고리 정적 페이지 + 재사용 카탈로그 컴포넌트 3종 (TemplateCard, SortDropdown, EmptyCategory)**

## Performance

- **Duration:** 3min
- **Started:** 2026-03-09T11:12:56Z
- **Completed:** 2026-03-09T11:16:03Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- TemplateCard 재사용 컴포넌트: 배지(카테고리/난이도/가격) + 보조정보(노드수/시간) + 상세 링크
- SortDropdown 클라이언트 정렬: 난이도순/최신순/가격순 DOM 재정렬
- EmptyCategory 빈 카테고리 안내: SVG 아이콘 + 메시지 + 다른 카테고리 링크
- 4개 카테고리(finance/marketing/hr/it) 정적 페이지 빌드 성공

## Task Commits

각 태스크 원자적 커밋:

1. **Task 1: TemplateCard + EmptyCategory + SortDropdown 카탈로그 컴포넌트 생성** - `94c0d26` (feat)
2. **Task 2: category/[slug].astro 카테고리 동적 라우트 페이지 생성** - `5b9fc48` (feat)

## Files Created/Modified
- `src/components/catalog/TemplateCard.astro` - 재사용 가능한 템플릿 카드 컴포넌트 (배지 + 보조정보 + 링크)
- `src/components/catalog/SortDropdown.astro` - 클라이언트 사이드 정렬 드롭다운 (난이도/최신/가격순)
- `src/components/catalog/EmptyCategory.astro` - 빈 카테고리 안내 메시지 + 다른 카테고리 링크
- `src/pages/category/[slug].astro` - 카테고리 동적 라우트 (getStaticPaths + getCollection 필터링)

## Decisions Made
- categoryMeta를 getStaticPaths 내부에 정의: Astro의 getStaticPaths가 모듈 레벨 const에 접근 불가하여 함수 내부로 이동
- categoryLabel/difficultyLabel 매핑을 TemplateCard 컴포넌트에 단일 소스로 배치 (index.astro 중복 제거는 Plan 02에서 처리)
- EmptyCategory에 문서 SVG 아이콘 + "준비 중입니다" 안내 + 3개 다른 카테고리 링크 제공

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] categoryMeta getStaticPaths 스코프 오류 수정**
- **Found during:** Task 2 (카테고리 라우트 페이지)
- **Issue:** categoryMeta를 컴포넌트 스크립트 최상위에 정의했으나, Astro의 getStaticPaths는 별도 모듈 컨텍스트에서 실행되어 "categoryMeta is not defined" 오류 발생
- **Fix:** categoryMeta 정의를 getStaticPaths 함수 내부로 이동
- **Files modified:** src/pages/category/[slug].astro
- **Verification:** npm run build 성공, 4개 카테고리 페이지 정상 생성
- **Committed in:** 5b9fc48 (Task 2 커밋에 포함)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Astro 스코프 제약에 따른 필수 수정. 범위 변경 없음.

## Issues Encountered
없음 (스코프 오류는 Deviation으로 문서화)

## User Setup Required
없음 - 외부 서비스 설정 불필요

## Next Phase Readiness
- TemplateCard 컴포넌트가 준비되어 Plan 02 (랜딩 개선)에서 index.astro 인기 템플릿 섹션에 재사용 가능
- 카테고리 페이지에서 카드 클릭 시 /n8n-marketplace/template/{slug}로 이동 (Phase 3에서 상세 페이지 구현 예정)
- 정렬 드롭다운 클라이언트 JS는 빌드 후 정상 동작 확인됨

---
*Phase: 02-카탈로그-랜딩-UI*
*Completed: 2026-03-09*
