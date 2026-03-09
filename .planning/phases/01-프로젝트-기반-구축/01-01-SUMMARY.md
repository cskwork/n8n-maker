---
phase: 01-프로젝트-기반-구축
plan: 01
subsystem: infra
tags: [astro, tailwindcss, mdx, content-collections, zod, github-pages, pretendard]

requires:
  - phase: none
    provides: "첫 번째 플랜 - 의존성 없음"
provides:
  - "빌드 가능한 Astro 5 + Tailwind CSS 4 프로젝트"
  - "Content Collections Zod 스키마 (templates 컬렉션)"
  - "샘플 MDX 템플릿 3개 (HR/금융/IT)"
  - "n8n 워크플로우 JSON 3개 (public/workflows/)"
  - "GitHub Pages 배포 워크플로우"
affects: [01-02-PLAN, phase-2, phase-3, phase-4]

tech-stack:
  added: [astro@5.18, tailwindcss@4.2, "@tailwindcss/vite@4.2", "@astrojs/mdx@4.3"]
  patterns: ["CSS-native Tailwind @theme", "Content Layer glob 로더 + Zod 스키마", "astro:content getCollection API"]

key-files:
  created:
    - package.json
    - astro.config.mjs
    - tsconfig.json
    - src/styles/global.css
    - src/content.config.ts
    - src/content/templates/job-auto-collect.mdx
    - src/content/templates/dart-disclosure-monitor.mdx
    - src/content/templates/ai-email-classifier.mdx
    - public/workflows/job-auto-collect.json
    - public/workflows/dart-disclosure-monitor.json
    - public/workflows/ai-email-classifier.json
    - .github/workflows/deploy.yml
    - .gitignore
  modified:
    - src/pages/index.astro

key-decisions:
  - "Tailwind CSS 4 @theme로 n8n 브랜드 컬러(오렌지 #f97316 기반) + surface 뉴트럴 + Pretendard 폰트 설정"
  - "Content Collections glob 로더 + 12필드 Zod 스키마로 템플릿 메타데이터 타입 안전 관리"
  - "기존 templates/complete/ JSON을 public/workflows/로 복사 + DART 워크플로우 신규 생성"

patterns-established:
  - "@theme 블록으로 커스텀 컬러/폰트 정의 (tailwind.config.js 사용 금지)"
  - "src/content.config.ts에서 glob 로더 + Zod 스키마 (src/content/config.ts 사용 금지)"
  - "MDX frontmatter에 category/difficulty/pricing enum + credentials 배열 + tags 배열"
  - "워크플로우 JSON은 public/workflows/에 저장 (정적 에셋 직접 다운로드)"

requirements-completed: [INFRA-01, INFRA-02]

duration: 4min
completed: 2026-03-09
---

# Phase 1 Plan 01: 프로젝트 초기화 + Content Collections Summary

**Astro 5 + Tailwind CSS 4 정적 빌드 기반 확보, Content Collections Zod 스키마로 3개 샘플 MDX 템플릿 타입 안전 관리**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-09T08:35:59Z
- **Completed:** 2026-03-09T08:40:16Z
- **Tasks:** 2
- **Files modified:** 14

## Accomplishments
- Astro 5.18 + Tailwind CSS 4.2 + MDX 통합 프로젝트가 에러 없이 빌드됨
- Content Collections 12필드 Zod 스키마가 빌드 시 frontmatter를 자동 검증 (잘못된 값 입력 시 빌드 실패 확인)
- 3개 샘플 MDX 템플릿 (HR/금융/IT)과 대응하는 n8n 워크플로우 JSON 3개 생성
- Pretendard Variable 폰트 CDN + n8n 브랜드 오렌지 컬러 시스템 설정

## Task Commits

Each task was committed atomically:

1. **Task 1: Astro 5 프로젝트 초기화 + Tailwind CSS 4 + MDX 통합** - `567f915` (feat)
2. **Task 2: Content Collections 스키마 + 샘플 MDX 템플릿 3개 + 워크플로우 JSON** - `0c3c2a3` (feat)

## Files Created/Modified
- `package.json` - Astro 5 + Tailwind CSS 4 + MDX 의존성 정의
- `astro.config.mjs` - MDX 통합, Tailwind Vite 플러그인, GitHub Pages site/base 설정
- `tsconfig.json` - Astro strictest 기반 TypeScript 설정
- `src/styles/global.css` - Tailwind v4 @theme (브랜드 컬러, Pretendard 폰트, 다크모드 대비 변수)
- `src/content.config.ts` - Content Collections Zod 스키마 (12필드, glob 로더)
- `src/content/templates/job-auto-collect.mdx` - 채용공고 자동 수집 (HR/수집/초급/무료)
- `src/content/templates/dart-disclosure-monitor.mdx` - DART 전자공시 모니터링 (금융/모니터링/중급/프리미엄)
- `src/content/templates/ai-email-classifier.mdx` - AI 이메일 분류기 (IT/분류/중급/무료)
- `public/workflows/job-auto-collect.json` - 사람인 API 기반 채용공고 수집 워크플로우
- `public/workflows/dart-disclosure-monitor.json` - DART API 전자공시 모니터링 워크플로우 (신규)
- `public/workflows/ai-email-classifier.json` - Gmail + OpenAI 이메일 분류 워크플로우
- `src/pages/index.astro` - Content Collections 쿼리로 템플릿 목록 표시
- `.github/workflows/deploy.yml` - GitHub Pages 자동 배포 (withastro/action)
- `.gitignore` - Astro 표준 무시 패턴

## Decisions Made
- Tailwind CSS 4 @theme 블록으로 모든 커스텀 테마 설정 (JS 설정 파일 없음)
- Pretendard Variable dynamic-subset CDN 사용 (npm 패키지 대신 CDN으로 간단 설정)
- DART 워크플로우 JSON은 기존 템플릿 없어서 신규 생성 (6노드: 스케줄 트리거 + API 호출 + 파싱 + 조건부 + 메시지 생성 + Slack 알림)
- GitHub Actions에서 withastro/action@v3 사용 (v5는 아직 불안정할 수 있으므로 안정 버전 사용)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Astro 빌드 기반 완료, Plan 02의 BaseLayout + Header/Footer 반응형 레이아웃 작업 즉시 가능
- Content Collections 스키마 확정, 후속 Phase에서 추가 MDX 템플릿 작성 가능
- public/workflows/ 디렉토리에 다운로드 가능한 JSON 파일 3개 준비됨

---
*Phase: 01-프로젝트-기반-구축*
*Completed: 2026-03-09*
