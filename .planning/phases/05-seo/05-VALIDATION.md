---
phase: 5
slug: seo
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-11
---

# Phase 5 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Astro 빌드 검증 (빌드 성공 = 페이지 정상 생성) |
| **Config file** | astro.config.mjs |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npx serve dist` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build` + dist 디렉토리 내 파일 존재 검증
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 05-01-01 | 01 | 1 | SEO-01 | smoke | `npm run build && grep -r "og:title" dist/` | ❌ W0 | ⬜ pending |
| 05-01-02 | 01 | 1 | SEO-01 | smoke | `npm run build && grep -r "og:description" dist/` | ❌ W0 | ⬜ pending |
| 05-02-01 | 02 | 1 | SEO-02 | smoke | `npm run build && test -f dist/sitemap-index.xml && test -f dist/robots.txt` | ❌ W0 | ⬜ pending |
| 05-03-01 | 03 | 1 | SEO-03 | smoke | `npm run build && test -d dist/solutions/finance && test -d dist/solutions/marketing` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `public/robots.txt` — SEO-02 커버
- [ ] `public/og-image.png` — SEO-01 커버 (OG 이미지 플레이스홀더)
- [ ] `src/pages/solutions/` 디렉토리 — SEO-03 커버

*기존 테스트 인프라 없음 — Astro 빌드 성공이 주요 검증 수단*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| GitHub Pages 배포 확인 | SEO-03 | 외부 서비스 배포 | GitHub Actions 로그 확인 + 공개 URL 접근 테스트 |
| 네이버 서치어드바이저 인증 | SEO-01 | 외부 서비스 인증 | 배포 후 naver-site-verification 메타 태그 확인 |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
