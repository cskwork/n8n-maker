---
phase: 1
slug: 프로젝트-기반-구축
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-09
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | 없음 — Astro 빌드 검증 (빌드 성공 = 스키마 검증 통과) |
| **Config file** | 없음 — 별도 테스트 프레임워크 불요 |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npx astro preview` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npx astro preview`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 1 | INFRA-01 | smoke | `npm run build` | ❌ W0 | ⬜ pending |
| 01-02-01 | 02 | 1 | INFRA-02 | smoke | `npm run build` (Zod 스키마 검증) | ❌ W0 | ⬜ pending |
| 01-03-01 | 03 | 2 | INFRA-03 | manual | 브라우저 DevTools 375/768/1280px | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Astro 프로젝트 초기화 (`npm create astro@latest`)
- [ ] Tailwind CSS 4 + @tailwindcss/vite 설치
- [ ] @astrojs/mdx 통합 설치
- [ ] `npm run build` 동작 확인

*Note: 별도 테스트 프레임워크 불요 — Astro 빌드가 Content Collections 스키마 검증을 포함*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| 반응형 레이아웃 (375/768/1280px) | INFRA-03 | 시각적 레이아웃 정상 여부는 자동 테스트로 검증 불가 | 1. `npx astro preview` 실행 2. Chrome DevTools 디바이스 모드 3. 375px/768px/1280px에서 Header/Footer 레이아웃 확인 4. 모바일 햄버거 메뉴 동작 확인 |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
