# Phase 5: SEO & 런칭 - Context

**Gathered:** 2026-03-09
**Status:** Ready for planning

<domain>
## Phase Boundary

검색 엔진(구글 + 네이버)에서 업종별 키워드로 유입되고, GitHub Pages에 프로덕션 배포가 완료된다. 메타 태그(title, description, OG), sitemap.xml, robots.txt, 업종별 키워드 랜딩 페이지, 구조화 데이터, GitHub Actions CI/CD를 구현한다.

</domain>

<decisions>
## Implementation Decisions

### 업종별 키워드 랜딩 페이지
- 업종별 4개 페이지 생성: 금융 자동화, 마케팅 자동화, HR 자동화, IT 자동화
- URL 구조: `/solutions/{slug}` (기존 `/category/{slug}`와 분리)
- 콘텐츠 구성: 문제-해결형 — '이런 업무 고민이 있나요?' → 'n8n으로 이렇게 해결합니다' → 관련 템플릿 목록
- CTA: '템플릿 보러가기' 버튼으로 해당 카테고리 페이지(`/category/{slug}`)로 이동. SEO 페이지는 유입용, 카테고리는 탐색용으로 역할 분리

### 메타 태그 & OG 이미지
- title 패턴: `키워드 | n8n 마켓플레이스` (키워드 우선으로 검색 노출 최적화)
- description: 기존 MDX의 description 필드를 메타 description으로 자동 활용 (추가 필드 불필요)
- OG 이미지: 정적 공통 이미지 1장 (1200x630 PNG, 브랜드 로고 + '업무 자동화 템플릿' 타이틀). 전 페이지 공통 사용
- 네이버 대응: naver-site-verification 메타 태그 플레이스홀더 추가 (배포 후 발급받아 교체)

### GitHub Pages 배포
- URL: `https://cskwork.github.io/n8n-marketplace` (현재 설정 유지)
- astro.config.mjs의 `site`를 `https://cskwork.github.io`로 업데이트
- GitHub Actions 워크플로우 생성: main push → 자동 빌드 → gh-pages 브랜치 배포
- 커스텀 도메인은 v2 범위

### 네이버 SEO 특화
- 기본 메타 + 구조화 데이터 적용
- JSON-LD 구조화 데이터: 템플릿 상세 페이지에만 Product/SoftwareApplication 스키마 적용 (리치 스니펫 가능)
- og:locale ko_KR 설정
- 네이버 서치어드바이저 인증 키: 플레이스홀더(TODO)로 두고 배포 후 수동 교체
- 페이지별 한국어 키워드 매핑: 홈('n8n 템플릿 마켓플레이스'), 카테고리('금융 자동화 n8n'), 상세('주가 모니터링 자동화') 등

### Claude's Discretion
- sitemap.xml, robots.txt 생성 방식 (Astro 공식 통합 사용 권장)
- OG 이미지 디자인 세부사항
- GitHub Actions 워크플로우 상세 구성
- JSON-LD 스키마 필드 상세 구성
- 키워드 랜딩 페이지의 세부 문구/레이아웃

</decisions>

<specifics>
## Specific Ideas

- 키워드 랜딩 페이지는 비개발자가 공감할 수 있는 문제-해결 구성 ('매일 수작업으로 보고서 만드느라 힘드셨나요?')
- 기존 카테고리 페이지와 역할이 다름: SEO 랜딩은 검색 유입용, 카테고리는 사이트 내 탐색용
- GitHub 사용자명: cskwork (site URL 확정)

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `BaseLayout.astro`: 기존 `<meta description>` prop 존재 — OG 태그 추가 확장 가능
- `TemplateCard.astro`: 키워드 랜딩 페이지에서 재사용 가능
- `astro.config.mjs`: `site`/`base` 이미 설정됨 — sitemap 통합 바로 추가 가능
- MDX Content Collections: description 필드 이미 존재 — 메타 태그 자동 매핑 가능

### Established Patterns
- 동적 라우트: `[slug].astro` (카테고리), `[...id].astro` (템플릿 상세) 패턴 확립
- categoryMeta: getStaticPaths 내부 정의 패턴 (Astro 스코프 제약)
- Google Form URL 플레이스홀더 패턴 (TODO 코멘트로 교체 안내)

### Integration Points
- `src/pages/solutions/` 디렉토리에 키워드 랜딩 페이지 추가
- `BaseLayout.astro`에 OG 태그, JSON-LD, naver-verification 메타 태그 추가
- `.github/workflows/` 디렉토리에 GitHub Actions 워크플로우 추가
- `astro.config.mjs`에 sitemap 통합 추가

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 05-seo*
*Context gathered: 2026-03-09*
