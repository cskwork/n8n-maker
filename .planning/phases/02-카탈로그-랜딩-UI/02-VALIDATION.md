---
phase: 2
slug: 카탈로그-랜딩-UI
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-09
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Astro 빌드 검증 (astro build) |
| **Config file** | astro.config.mjs |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npx astro preview` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npx astro preview`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | CATA-03 | smoke | `npm run build` | N/A (빌드 검증) | ⬜ pending |
| 02-01-02 | 01 | 1 | CATA-04 | smoke | `npm run build` | N/A (빌드 검증) | ⬜ pending |
| 02-02-01 | 02 | 1 | CATA-01 | smoke | `npm run build` 후 dist/category/ 4개 폴더 확인 | N/A (빌드 검증) | ⬜ pending |
| 02-02-02 | 02 | 1 | CATA-02 | manual | 브라우저에서 카드 그리드 레이아웃 확인 | N/A | ⬜ pending |
| 02-03-01 | 03 | 2 | CATA-02 | manual | 정렬 드롭다운 동작 확인 | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements.*

기존 빌드 인프라(`npm run build`)로 모든 Phase 요구사항의 기본 검증 가능. 정적 사이트 특성상 빌드 성공이 곧 기본 검증이며, UI 정확성은 수동 확인으로 충족.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| 카드 그리드 반응형 레이아웃 (3/2/1칸) | CATA-02 | CSS 레이아웃은 렌더링 후 시각 확인 필요 | 브라우저에서 viewport 320px, 768px, 1024px에서 카드 배치 확인 |
| 카드 배지 색상 (무료: 초록, 프리미엄: 호박) | CATA-03 | 색상 시각 확인 필요 | 카드에서 무료/프리미엄 배지 색상 대비 확인 |
| 히어로 통계 수치 인라인 표시 | CATA-04 | UI 시각 확인 필요 | 인덱스 페이지에서 CTA 아래 통계 텍스트 확인 |
| 빈 카테고리 안내 메시지 | CATA-01 | 빈 상태 UI 확인 필요 | 마케팅 카테고리 페이지에서 '준비 중' 메시지 표시 확인 |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
