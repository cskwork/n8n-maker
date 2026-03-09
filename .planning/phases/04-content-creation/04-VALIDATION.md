---
phase: 04
slug: content-creation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-09
---

# Phase 04 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Astro Build (Content Collections Zod 검증) |
| **Config file** | astro.config.mjs |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npm run preview` |
| **Estimated runtime** | ~3 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npm run preview`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 04-01-01 | 01 | 1 | CONT-01 | smoke | `npm run build` (Zod 검증) | ✅ | ⬜ pending |
| 04-02-01 | 02 | 1 | CONT-02 | smoke | `npm run build` (Zod 검증) | ✅ | ⬜ pending |
| 04-03-01 | 03 | 2 | CONT-03, CONT-04 | smoke | `npm run build` (Zod 검증) | ✅ | ⬜ pending |
| 04-04-01 | 04 | 2 | CONT-05, CONT-06 | manual+smoke | `npm run build` + JSON lint | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements.*

기존 Astro Content Collections Zod 스키마가 MDX 프론트매터를 자동 검증하며, `npm run build` 시 모든 콘텐츠 오류를 감지한다.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| n8n JSON import 호환성 | CONT-05 | n8n 런타임 검증 필요 | JSON 파일 다운로드 → n8n 인스턴스에서 Import workflow → 정상 로드 확인 |
| 한국 API 설정 가이드 품질 | CONT-06 | 문서 내용 정확성 확인 | 각 MDX의 "설정 가이드" 섹션 읽고 API 키 발급 URL/인증 방식 정확성 확인 |
| 카테고리별 템플릿 수 | CONT-01~04 | 브라우저 시각 검증 | 각 카테고리 페이지에서 템플릿 카드 수 확인 |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
