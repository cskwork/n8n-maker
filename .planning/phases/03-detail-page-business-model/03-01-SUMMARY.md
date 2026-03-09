---
phase: 03-detail-page-business-model
plan: 01
subsystem: ui
tags: [astro, mdx, content-collections, detail-page, cta, dynamic-route]

# Dependency graph
requires:
  - phase: 01-project-foundation
    provides: Content Collections 스키마 + MDX 템플릿 + BaseLayout
  - phase: 02-catalog-landing-ui
    provides: TemplateCard 컴포넌트 + 카테고리 페이지 + Breadcrumb
provides:
  - 템플릿 상세 페이지 동적 라우트 ([...id].astro)
  - 무료/프리미엄 분기 CTA 컴포넌트 (CtaSection)
  - 크레덴셜 배지 컴포넌트 (CredentialBadges)
  - 관련 템플릿 컴포넌트 (RelatedTemplates)
  - Content Collections price 필드
affects: [03-02, 03-03, 04-deployment]

# Tech tracking
tech-stack:
  added: []
  patterns: [Tailwind arbitrary selector MDX 스타일링, Google Form prefill URL 패턴]

key-files:
  created:
    - src/pages/template/[...id].astro
    - src/components/detail/CtaSection.astro
    - src/components/detail/CredentialBadges.astro
    - src/components/detail/RelatedTemplates.astro
  modified:
    - src/content.config.ts
    - src/content/templates/dart-disclosure-monitor.mdx

key-decisions:
  - "Tailwind Typography 미설치 — arbitrary selector([&_h2] 등)로 MDX 스타일링 직접 처리"
  - "Google Form URL/entry ID를 상수 플레이스홀더로 분리 (TODO 코멘트로 교체 안내)"
  - "categoryLabel/difficultyLabel 매핑을 상세 페이지 내부에 별도 정의 (Astro 컴포넌트 export 제약)"

patterns-established:
  - "상세 페이지 단일 플로우: Breadcrumb > 제목+배지 > CTA > 다이어그램 > MDX > 크레덴셜 > CTA > 관련"
  - "무료=download 속성 링크, 프리미엄=Google Form prefill URL"
  - "CtaSection 컴포넌트 상하단 재사용 패턴"

requirements-completed: [DETAIL-01, DETAIL-03, DETAIL-04, DETAIL-05, DETAIL-06, BIZ-01, BIZ-02]

# Metrics
duration: 3min
completed: 2026-03-09
---

# Phase 3 Plan 01: 상세 페이지 핵심 구조 Summary

**템플릿 상세 동적 라우트 + 무료 다운로드/프리미엄 Google Form CTA + MDX body 렌더링 + 크레덴셜 배지 + 관련 템플릿**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-09T12:24:48Z
- **Completed:** 2026-03-09T12:27:37Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- Content Collections 스키마에 price 필드 추가, DART 템플릿에 설정 가이드 MDX body 보강
- 무료/프리미엄 분기 CTA, 크레덴셜 배지, 관련 템플릿 3개 컴포넌트 생성
- [...id].astro 동적 라우트로 3개 템플릿 상세 페이지 정적 생성 완료
- TemplateCard에서 클릭 시 상세 페이지로 연결되는 핵심 사용자 여정 완성

## Task Commits

Each task was committed atomically:

1. **Task 1: Content Collections 스키마 업데이트 + 상세 컴포넌트 생성** - `a6b6c76` (feat)
2. **Task 2: 템플릿 상세 페이지 동적 라우트 생성** - `477db1e` (feat)

## Files Created/Modified
- `src/content.config.ts` - price: z.number().optional() 필드 추가
- `src/content/templates/dart-disclosure-monitor.mdx` - price: 29000 + 설정 가이드 Step 1~3 추가
- `src/components/detail/CtaSection.astro` - 무료 다운로드/프리미엄 구매문의 분기 CTA
- `src/components/detail/CredentialBadges.astro` - 자물쇠 아이콘 + 크레덴셜 배지 목록
- `src/components/detail/RelatedTemplates.astro` - 같은 카테고리 최대 3개 TemplateCard
- `src/pages/template/[...id].astro` - 상세 페이지 동적 라우트 (Breadcrumb + 메타배지 + CTA + MDX + 크레덴셜 + 관련)

## Decisions Made
- Tailwind Typography 플러그인 미설치 상태에서 `[&_h2]:text-xl` 등 arbitrary selector로 MDX 스타일링 직접 처리
- Google Form URL과 entry ID를 상수 플레이스홀더로 분리하여 추후 교체 용이하게 구성
- categoryLabel/difficultyLabel 한글 매핑을 상세 페이지 내부에 별도 정의 (Astro 컴포넌트 간 export 제약)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- 상세 페이지 기본 구조 완성, Plan 02(가격 페이지)와 Plan 03(워크플로우 다이어그램)에서 확장 가능
- 다이어그램 영역은 플레이스홀더로 배치 완료 — Plan 03에서 WorkflowDiagram 컴포넌트로 교체 예정
- Google Form ID 실제 값 교체 필요 (배포 전 설정)

## Self-Check: PASSED

- All 7 files verified (FOUND)
- Both commits verified: a6b6c76, 477db1e
- Build output confirms 3 template detail pages generated

---
*Phase: 03-detail-page-business-model*
*Completed: 2026-03-09*
