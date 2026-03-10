# Project Retrospective

*A living document updated after each milestone. Lessons feed forward into future planning.*

## Milestone: v1.0 — MVP

**Shipped:** 2026-03-11
**Phases:** 5 | **Plans:** 13 | **Timeline:** 2 days

### What Was Built
- Astro 5 + Tailwind CSS 4 정적 사이트 기반 (Content Collections Zod 스키마)
- 4개 업종 카탈로그 UI (카드 레이아웃, 랜딩 페이지, 카테고리 브라우징)
- 템플릿 상세 페이지 (n8n-demo 인터랙티브 다이어그램 + 정적 폴백)
- 무료/프리미엄 비즈니스 모델 (JSON 다운로드 + Google Form 문의)
- 18개 실제 n8n 워크플로우 템플릿 + 한국 서비스 API 가이드 4종
- SEO 전면 적용 (OG/JSON-LD/sitemap + 업종별 키워드 랜딩 4페이지)

### What Worked
- GSD 워크플로우를 통한 체계적 계획 → 실행 → 검증 사이클이 효과적
- 웨이브 기반 병렬 실행으로 독립 플랜 동시 처리 가능
- Content Collections 스키마 덕분에 Phase 4 콘텐츠 대량 제작 시 타입 안전성 보장
- 각 Phase의 Verification이 품질 게이트 역할 수행

### What Was Inefficient
- categoryMeta/categoryLabel 매핑이 여러 파일에 중복 정의 (Astro 컴포넌트 export 제약)
- Google Form URL과 네이버 인증 코드가 플레이스홀더 상태로 남아 있음
- OG 이미지가 단색 플레이스홀더 — 실제 브랜드 이미지 교체 필요

### Patterns Established
- Tailwind CSS 4 @theme 블록으로 커스텀 컬러/폰트 (JS 설정 파일 없음)
- MDX frontmatter 12필드 Zod 스키마로 템플릿 메타데이터 관리
- 워크플로우 JSON은 public/workflows/에 정적 에셋으로 저장
- n8n-demo CDN 5초 타임아웃 → DiagramFallback 자동 전환 패턴
- 한국 서비스 템플릿에 MDX 본문 내 API 설정 가이드 인라인 패턴

### Key Lessons
1. 정적 사이트(Astro)에서 인터랙티브 컴포넌트 통합 시 CDN + 폴백 전략이 필수
2. 콘텐츠 제작 Phase가 가장 많은 플랜(4개)을 소비 — 초기 계획 시 콘텐츠 작업량 과소평가하지 말 것
3. SEO 인프라는 Phase 1에서 함께 구축했으면 더 효율적 (나중에 28개 페이지 일괄 수정)

### Cost Observations
- Model mix: executor=inherit(opus), verifier=sonnet
- 총 실행 시간: ~52분 (13 plans × ~4min avg)
- Notable: 플랜당 평균 4분, Phase 2-3이 가장 빠름 (2.7-3min/plan)

---

## Cross-Milestone Trends

### Process Evolution

| Milestone | Timeline | Phases | Key Change |
|-----------|----------|--------|------------|
| v1.0 | 2 days | 5 | 첫 마일스톤 — GSD 워크플로우 도입 |

### Cumulative Quality

| Milestone | Templates | Pages | SEO Coverage |
|-----------|-----------|-------|-------------|
| v1.0 | 18 | 28 | 100% (OG/JSON-LD/sitemap) |

### Top Lessons (Verified Across Milestones)

1. (첫 마일스톤 — 추후 검증 필요)
