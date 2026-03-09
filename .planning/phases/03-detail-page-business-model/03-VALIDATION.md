---
phase: 3
slug: detail-page-business-model
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-09
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Astro 빌드 검증 (별도 테스트 프레임워크 없음) |
| **Config file** | none — 프로젝트에 테스트 프레임워크 미설치 |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npx astro preview` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npx astro preview`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 1 | DETAIL-01 | smoke | `npm run build` | ❌ W0 | ⬜ pending |
| 03-01-02 | 01 | 1 | DETAIL-05 | smoke | `npm run build` | ❌ W0 | ⬜ pending |
| 03-01-03 | 01 | 1 | DETAIL-06 | smoke | `npm run build` | ❌ W0 | ⬜ pending |
| 03-02-01 | 02 | 1 | DETAIL-02, VISUAL-01, VISUAL-02 | manual-only | 브라우저 시각 확인 | N/A | ⬜ pending |
| 03-02-02 | 02 | 1 | VISUAL-03 | manual-only | 모바일 뷰포트 확인 | N/A | ⬜ pending |
| 03-03-01 | 03 | 2 | DETAIL-03, BIZ-01 | manual-only | 브라우저 다운로드 테스트 | N/A | ⬜ pending |
| 03-03-02 | 03 | 2 | DETAIL-04, BIZ-02 | manual-only | 링크 이동 확인 | N/A | ⬜ pending |
| 03-04-01 | 04 | 2 | BIZ-03 | smoke | `npm run build` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `npm run build` — 빌드 성공 확인이 기본 검증 역할
- [ ] 별도 테스트 프레임워크 불필요 — 정적 사이트 빌드 기반 검증

*Existing infrastructure covers all phase requirements via build validation.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| n8n-demo-component 다이어그램 렌더링 | DETAIL-02, VISUAL-01, VISUAL-02 | CDN 외부 서비스 의존, 시각적 확인 필요 | 브라우저에서 상세 페이지 접근 → 다이어그램 표시 확인 → 노드 타입/연결 확인 |
| 모바일 다이어그램 표시 | VISUAL-03 | 반응형 레이아웃 시각 확인 | 브라우저 DevTools 모바일 뷰포트(375px) → 다이어그램 스크롤/줌 확인 |
| 무료 JSON 다운로드 | DETAIL-03, BIZ-01 | 브라우저 다운로드 동작 확인 필요 | 무료 템플릿 상세 페이지 → 다운로드 버튼 클릭 → .json 파일 다운로드 확인 |
| 프리미엄 Google Form 연결 | DETAIL-04, BIZ-02 | 외부 서비스 링크 확인 | 프리미엄 템플릿 → 구매 문의 버튼 → Google Form 열림 + 템플릿 이름 prefill 확인 |
| 폴백 다이어그램 표시 | DETAIL-02 | n8n-demo 실패 시나리오 시뮬레이션 | 네트워크 차단 후 상세 페이지 접근 → 정적 노드 목록 표시 확인 |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
