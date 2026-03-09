# n8n 워크플로우 템플릿 마켓플레이스

## What This Is

n8n 자동화 워크플로우 템플릿을 판매하는 마켓플레이스 웹사이트. 금융, 마케팅, HR, IT/DevOps 업종의 비개발자(취준생, 사무직, 소상공인, 마케터)를 대상으로, 실제 n8n 워크플로우 다이어그램을 인터랙티브하게 보여주고 템플릿 JSON을 구매/다운로드할 수 있는 플랫폼. 로컬 LLM(Ollama) 기반 워크플로우도 별도 카테고리로 제공.

## Core Value

비개발자가 복잡한 업무 자동화를 n8n 워크플로우 템플릿 하나로 즉시 실행할 수 있게 하는 것.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] 업종별 워크플로우 템플릿 카탈로그 (금융, 마케팅, HR, IT/DevOps)
- [ ] 금융 자동화 샘플: 보고서/리포트, 데이터 수집/모니터링, 문서/계약 처리, 리스크/컴플라이언스
- [ ] 인터랙티브 워크플로우 다이어그램 (n8n embed 또는 React Flow 폴백)
- [ ] 워크플로우 실행 흐름 시각화 (노드 연결, 데이터 흐름 표시)
- [ ] 무료 + 프리미엄 수익 모델 (기본 무료, 고급 유료)
- [ ] 워크플로우 JSON 다운로드/구매 기능
- [ ] 로컬 LLM (Ollama) 기반 워크플로우 카테고리
- [ ] 각 템플릿의 상세 설명 페이지 (사용 방법, 필요 크레덴셜, 커스터마이징 가이드)
- [ ] 반응형 디자인 (모바일/데스크톱)
- [ ] SEO 최적화 (업종별 키워드)

### Out of Scope

- 실시간 결제 시스템 — v1에서는 문의/연락처 기반, 결제는 v2
- 사용자 계정/인증 — v1은 정적 사이트, 계정 시스템은 v2
- 워크플로우 에디터 기능 — n8n 자체 에디터로 충분
- 커뮤니티/포럼 — v1 범위 초과
- 다국어 지원 — 한국어 우선, 영어는 v2

## Context

- **프로젝트 위치:** n8n-maker 디렉토리 내, 2026 Zion Spring Retreat 프로젝트의 일부
- **기존 리서치:** `n8n-워크플로우-종합-리서치.md` 파일에 n8n 노드 타입, API 레퍼런스, 한국 서비스 연동 패턴 등 상세 문서 존재
- **타겟 사용자:** 한국 비개발자 — 금융권 사무직, 마케터, HR 담당자, 소상공인
- **경쟁 분석:** n8n.io 공식 템플릿은 영어/글로벌 중심, 한국 시장 특화 부재
- **로컬 LLM 트렌드:** 2026년 기준 Ollama가 로컬 LLM의 표준으로 자리잡음, n8n LangChain 노드와 연동 가능

## Constraints

- **기술 스택**: Astro + Tailwind CSS — 정적 사이트 생성, 빠른 로드
- **배포**: GitHub Pages — 무료, 정적 호스팅
- **다이어그램**: n8n embed 가능 시 우선 사용, 불가 시 React Flow / 인터랙티브 SVG
- **언어**: 한국어 전용 (v1)
- **비용**: 무료 인프라만 사용 (GitHub Pages, 무료 CDN)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Astro + Tailwind | 정적 사이트로 빠른 로드, 콘텐츠 중심 사이트에 최적 | — Pending |
| GitHub Pages 배포 | 무료, 정적 사이트와 호환, CI/CD 용이 | — Pending |
| 무료 + 프리미엄 모델 | 진입 장벽 낮추고 고급 워크플로우로 수익화 | — Pending |
| Ollama 중심 로컬 LLM | 2026년 로컬 LLM 표준, n8n LangChain 노드 호환 | — Pending |
| n8n embed 우선 → React Flow 폴백 | 실제 n8n 느낌 유지, 불가 시 인터랙티브 대안 | — Pending |

---
*Last updated: 2026-03-09 after initialization*
