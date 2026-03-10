---
phase: 05-seo
plan: 01
subsystem: seo
tags: [og-meta, sitemap, json-ld, twitter-card, robots-txt, astro-sitemap]

# Dependency graph
requires:
  - phase: 01-project-foundation
    provides: BaseLayout 공통 레이아웃, astro.config.mjs 설정
  - phase: 03-detail-page-business-model
    provides: 템플릿 상세 페이지 (template/[...id].astro)
provides:
  - OG 메타 태그 (og:title, og:description, og:image, og:url, og:locale) 전체 페이지 적용
  - Twitter Card 메타 태그 전체 페이지 적용
  - canonical URL 전체 페이지 적용
  - 네이버 사이트 인증 메타 태그 플레이스홀더
  - sitemap-index.xml 자동 생성 (@astrojs/sitemap)
  - robots.txt (sitemap URL 포함)
  - SoftwareApplication JSON-LD 구조화 데이터 (템플릿 상세 페이지)
  - BaseLayout jsonLd prop 인터페이스
affects: [05-02-seo]

# Tech tracking
tech-stack:
  added: ["@astrojs/sitemap"]
  patterns: ["BaseLayout OG/Twitter Card/JSON-LD prop 패턴", "canonical URL 자동 생성 패턴"]

key-files:
  created:
    - public/robots.txt
    - public/og-image.png
  modified:
    - src/layouts/BaseLayout.astro
    - astro.config.mjs
    - .github/workflows/deploy.yml
    - src/pages/template/[...id].astro
    - package.json

key-decisions:
  - "site URL을 cskwork.github.io로 설정 (사용자 결정 반영)"
  - "BaseLayout Props에 ogImage, ogType, jsonLd 추가로 페이지별 커스텀 가능"
  - "og-image.png는 1200x630 n8n 오렌지 단색 플레이스홀더로 생성 (추후 디자인 교체 가능)"
  - "네이버 인증 코드를 NAVER_VERIFICATION_CODE_HERE 플레이스홀더로 설정"
  - "GitHub Actions withastro/action v3에서 v5로 업그레이드"

patterns-established:
  - "BaseLayout OG prop 패턴: ogImage, ogType, jsonLd를 Props로 받아 head에 자동 삽입"
  - "JSON-LD 전달 패턴: 페이지별 jsonLd 객체를 BaseLayout prop으로 전달"
  - "canonical URL 패턴: new URL(Astro.url.pathname, Astro.site)로 자동 생성"

requirements-completed: [SEO-01, SEO-02]

# Metrics
duration: 4min
completed: 2026-03-11
---

# Phase 5 Plan 1: SEO 기반 인프라 Summary

**BaseLayout OG/Twitter Card/canonical 메타 태그 + @astrojs/sitemap 자동 생성 + SoftwareApplication JSON-LD 구조화 데이터**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-10T22:15:21Z
- **Completed:** 2026-03-10T22:19:08Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments
- BaseLayout에 OG/Twitter Card/canonical/naver-verification/JSON-LD 메타 태그 지원 추가
- @astrojs/sitemap 통합으로 sitemap-index.xml 자동 생성 설정 완료
- 전체 18개 템플릿 상세 페이지에 SoftwareApplication JSON-LD 구조화 데이터 적용 (무료 price:0, 프리미엄 실제 가격)
- robots.txt 생성 및 sitemap URL 연동
- GitHub Actions withastro/action v5 업그레이드

## Task Commits

Each task was committed atomically:

1. **Task 1: BaseLayout OG 확장 + sitemap/robots.txt + astro.config 업데이트** - `e334dd2` (feat)
2. **Task 2: 템플릿 상세 페이지 JSON-LD 구조화 데이터** - `cd20b2f` (feat)

## Files Created/Modified
- `src/layouts/BaseLayout.astro` - OG/Twitter Card/canonical/naver-verification/JSON-LD 메타 태그 추가, Props 인터페이스 확장
- `astro.config.mjs` - site URL 변경(cskwork.github.io), @astrojs/sitemap 통합 추가
- `public/robots.txt` - 크롤러 허용 규칙 + sitemap URL 포함
- `public/og-image.png` - 1200x630 n8n 오렌지 단색 OG 이미지 플레이스홀더
- `.github/workflows/deploy.yml` - withastro/action v3 -> v5 업그레이드
- `src/pages/template/[...id].astro` - SoftwareApplication JSON-LD 구조화 데이터 추가
- `package.json` - @astrojs/sitemap 의존성 추가

## Decisions Made
- site URL을 `cskwork.github.io`로 설정 (사용자 결정 반영)
- BaseLayout Props에 `ogImage`, `ogType`, `jsonLd` 추가로 페이지별 커스텀 가능하도록 설계
- og-image.png는 1200x630 n8n 오렌지(#f97316) 단색 플레이스홀더로 생성 (추후 디자인 교체 가능)
- 네이버 인증 코드를 `NAVER_VERIFICATION_CODE_HERE` 플레이스홀더로 설정
- GitHub Actions withastro/action v3에서 v5로 업그레이드

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required

- **네이버 웹마스터 도구**: `NAVER_VERIFICATION_CODE_HERE`를 실제 네이버 사이트 인증 코드로 교체 필요
- **OG 이미지**: `public/og-image.png`를 브랜드 디자인 이미지로 교체 권장

## Next Phase Readiness
- SEO 기반 인프라 완료, Plan 05-02 (고급 SEO 최적화) 진행 가능
- 모든 페이지에 OG/Twitter Card/canonical 메타 태그 적용됨
- sitemap-index.xml 자동 생성 확인됨
- JSON-LD 구조화 데이터가 검색 엔진 리치 스니펫 노출 기반 마련

## Self-Check: PASSED

- All 7 files verified to exist on disk
- Commit e334dd2 (Task 1) verified in git log
- Commit cd20b2f (Task 2) verified in git log
- Build succeeds without errors
- sitemap-index.xml generated in dist/
- 18/18 template pages contain JSON-LD

---
*Phase: 05-seo*
*Completed: 2026-03-11*
