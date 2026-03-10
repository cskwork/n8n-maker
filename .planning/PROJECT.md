# n8n 워크플로우 템플릿 마켓플레이스

## What This Is

한국 비개발자(취준생, 사무직, 소상공인, 마케터)를 위한 n8n 워크플로우 템플릿 마켓플레이스. 금융, 마케팅, HR, IT/DevOps 4개 업종의 실제 워크플로우를 인터랙티브 다이어그램으로 보여주고, 무료 템플릿은 즉시 다운로드, 프리미엄 템플릿은 문의를 통해 구매할 수 있는 SEO 최적화 정적 사이트.

## Core Value

비개발자가 복잡한 업무 자동화를 n8n 워크플로우 템플릿 하나로 즉시 실행할 수 있게 하는 것.

## Requirements

### Validated

- ✓ 업종별 워크플로우 템플릿 카탈로그 (금융, 마케팅, HR, IT/DevOps) — v1.0
- ✓ 금융 자동화 (DART 공시, 주가 모니터링, AI 인보이스, 경비 보고서) — v1.0
- ✓ 인터랙티브 워크플로우 다이어그램 (n8n-demo CDN + 정적 폴백) — v1.0
- ✓ 워크플로우 실행 흐름 시각화 (노드 타입, 연결 흐름) — v1.0
- ✓ 무료 + 프리미엄 수익 모델 (무료 다운로드 + Google Form 문의) — v1.0
- ✓ 워크플로우 JSON 다운로드 기능 — v1.0
- ✓ 각 템플릿 상세 설명 페이지 (사용 방법, 크레덴셜, 설정 가이드) — v1.0
- ✓ 반응형 디자인 (모바일/태블릿/데스크톱) — v1.0
- ✓ SEO 최적화 (OG/JSON-LD/sitemap + 업종별 키워드 랜딩) — v1.0

### Active

- [ ] 로컬 LLM (Ollama) 기반 워크플로우 카테고리
- [ ] 키워드 검색 기능
- [ ] 난이도/카테고리/무료·유료 필터링
- [ ] 실시간 결제 (Lemon Squeezy 또는 토스페이먼츠)
- [ ] 사용자 계정/인증 (Supabase Auth)
- [ ] 템플릿 50개 이상 확대
- [ ] React Flow 커스텀 노드 다이어그램 고도화

### Out of Scope

- 워크플로우 에디터 기능 — n8n 자체 에디터로 충분
- 커뮤니티/포럼 — 풀타임 관리 필요, n8n 공식 커뮤니티(55K+) 이미 존재
- 자체 n8n 호스팅/실행 환경 — 인프라 비용 + 보안 리스크
- 다국어 지원 — 한국어 시장 특화가 핵심 차별점

## Context

- **기술 스택:** Astro 5.18 + Tailwind CSS 4.2 + MDX, 3,469 LOC
- **배포:** GitHub Pages (cskwork.github.io)
- **콘텐츠:** 18개 워크플로우 템플릿 (4개 업종), 한국 서비스 API 가이드 4종
- **다이어그램:** n8n-demo-component CDN + DiagramFallback 정적 폴백
- **SEO:** 28개 페이지 전체 OG/JSON-LD 적용, sitemap.xml 자동생성, 업종별 랜딩 4페이지
- **타겟 사용자:** 한국 비개발자 — 금융권 사무직, 마케터, HR 담당자, 소상공인
- **경쟁 우위:** n8n 공식 템플릿은 영어/글로벌 중심, 한국어 특화 마켓 부재

## Constraints

- **기술 스택**: Astro + Tailwind CSS — 정적 사이트 생성, 빠른 로드
- **배포**: GitHub Pages — 무료, 정적 호스팅
- **다이어그램**: n8n-demo CDN 우선, 폴백으로 정적 SVG 다이어그램
- **언어**: 한국어 전용 (v1)
- **비용**: 무료 인프라만 사용 (GitHub Pages, 무료 CDN)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Astro 5 + Tailwind CSS 4 | 정적 사이트로 빠른 로드, 콘텐츠 중심 사이트에 최적 | ✓ Good |
| GitHub Pages 배포 | 무료, 정적 사이트와 호환, CI/CD 용이 | ✓ Good |
| 무료 + 프리미엄 (Google Form) | 진입 장벽 낮추고 고급 워크플로우로 수익화 | ✓ Good (v2에서 결제 시스템 추가 예정) |
| n8n-demo CDN + 정적 폴백 | 실제 n8n 느낌 유지, CDN 실패 시 자동 전환 | ✓ Good |
| Content Collections Zod 스키마 | 12필드 타입 안전 검증, 빌드 시 잘못된 데이터 감지 | ✓ Good |
| Tailwind CSS 4 @theme | CSS-native 접근, JS 설정 파일 불필요 | ✓ Good |
| categoryMeta 인라인 정의 | Astro 스코프 제약으로 외부 const 참조 불가 | ⚠️ Revisit (v2에서 공유 유틸로 개선) |
| details/summary FAQ | JS 없이 동작하는 네이티브 아코디언 | ✓ Good |

---
*Last updated: 2026-03-11 after v1.0 milestone*
