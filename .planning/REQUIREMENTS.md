# Requirements: n8n 워크플로우 템플릿 마켓플레이스

**Defined:** 2026-03-09
**Core Value:** 비개발자가 복잡한 업무 자동화를 n8n 워크플로우 템플릿 하나로 즉시 실행할 수 있게 하는 것

## v1 Requirements

### 프로젝트 기반 (INFRA)

- [x] **INFRA-01**: Astro 5 + Tailwind CSS 4 프로젝트 구조가 빌드되고 GitHub Pages에 배포된다
- [x] **INFRA-02**: Content Collections 스키마로 템플릿 메타데이터를 타입 안전하게 관리한다
- [x] **INFRA-03**: 반응형 레이아웃이 모바일/태블릿/데스크톱에서 정상 동작한다

### 카탈로그 UI (CATA)

- [x] **CATA-01**: 사용자가 4개 업종 카테고리(금융, 마케팅, HR, IT/DevOps)로 템플릿을 브라우징할 수 있다
- [x] **CATA-02**: 각 카테고리 페이지에서 템플릿 목록을 카드형 레이아웃으로 볼 수 있다
- [x] **CATA-03**: 템플릿 카드에 이름, 카테고리, 난이도, 무료/프리미엄 배지가 표시된다
- [x] **CATA-04**: 랜딩 페이지에서 주요 템플릿과 카테고리를 한눈에 볼 수 있다

### 템플릿 상세 (DETAIL)

- [x] **DETAIL-01**: 각 템플릿의 상세 페이지에서 설명, 사용 시나리오, 필요 크레덴셜 목록을 볼 수 있다
- [x] **DETAIL-02**: 상세 페이지에서 n8n-demo-component로 워크플로우 다이어그램을 인터랙티브하게 볼 수 있다
- [x] **DETAIL-03**: 무료 템플릿의 JSON을 다운로드 버튼으로 즉시 다운로드할 수 있다
- [x] **DETAIL-04**: 프리미엄 템플릿은 다이어그램 프리뷰만 제공하고 Google Form 문의로 연결된다
- [x] **DETAIL-05**: 각 템플릿에 난이도(초급/중급/고급)와 예상 설정 시간이 표시된다
- [x] **DETAIL-06**: 단계별 설정 가이드(크레덴셜 발급 ~ n8n 활성화)가 한글로 제공된다

### 워크플로우 시각화 (VISUAL)

- [x] **VISUAL-01**: n8n-demo-component(CDN)로 워크플로우 JSON을 인터랙티브 다이어그램으로 렌더링한다
- [x] **VISUAL-02**: 다이어그램에서 각 노드의 타입과 연결 흐름을 시각적으로 확인할 수 있다
- [x] **VISUAL-03**: 다이어그램이 모바일에서도 적절히 표시된다 (스크롤/줌)

### SEO 최적화 (SEO)

- [x] **SEO-01**: 각 페이지에 적절한 메타 태그(title, description, OG)가 설정된다
- [x] **SEO-02**: sitemap.xml과 robots.txt가 자동 생성된다
- [x] **SEO-03**: 업종별 키워드 랜딩 페이지가 존재한다 ("금융 자동화", "채용공고 자동 수집" 등)

### 콘텐츠 (CONT)

- [x] **CONT-01**: 금융 자동화 템플릿 4-5개가 포함된다 (DART 공시, 주가 모니터링, 인보이스 처리 등)
- [x] **CONT-02**: 한국 서비스 연동 템플릿 4-5개가 포함된다 (카카오톡, 네이버, 사람인, DART)
- [x] **CONT-03**: 마케팅 자동화 템플릿 3-4개가 포함된다
- [x] **CONT-04**: HR/IT 자동화 템플릿 3-4개가 포함된다
- [x] **CONT-05**: 각 템플릿에 유효한 n8n 워크플로우 JSON이 포함된다
- [x] **CONT-06**: 한국 서비스 API 설정 가이드가 포함된다 (카카오톡, 네이버, 사람인, DART)

### 비즈니스 모델 (BIZ)

- [x] **BIZ-01**: 카테고리당 2-3개 무료 템플릿이 즉시 다운로드 가능하다
- [x] **BIZ-02**: 프리미엄 템플릿은 Google Form 문의 연결로 구매 요청할 수 있다
- [x] **BIZ-03**: 가격 정보 또는 프리미엄 안내 페이지가 존재한다

## v2 Requirements

### 검색/필터링

- **SRCH-01**: 키워드 검색으로 템플릿을 찾을 수 있다
- **SRCH-02**: 난이도, 카테고리, 무료/유료 필터를 적용할 수 있다

### 로컬 LLM (Ollama)

- **LLM-01**: Ollama 기반 로컬 LLM 전용 카테고리가 존재한다
- **LLM-02**: 문서 요약, 이메일 분류, 데이터 추출 Ollama 워크플로우가 포함된다
- **LLM-03**: Ollama 설치/설정 + n8n 연동 상세 가이드가 제공된다

### 결제/계정

- **PAY-01**: Lemon Squeezy 또는 토스페이먼츠로 프리미엄 즉시 결제가 가능하다
- **PAY-02**: 사용자 계정으로 구매 이력을 관리할 수 있다

### 콘텐츠 확장

- **CEXT-01**: 템플릿 50개 이상으로 확대
- **CEXT-02**: 업종별 번들 패키지 판매
- **CEXT-03**: 한국어 에러 해결 가이드 Top 20
- **CEXT-04**: 커스터마이징 가이드 (템플릿 변형 방법)

### 인터랙티브 업그레이드

- **IXUP-01**: React Flow 커스텀 노드로 다이어그램 고도화
- **IXUP-02**: 데이터 흐름 애니메이션 표시

## Out of Scope

| Feature | Reason |
|---------|--------|
| 워크플로우 에디터 기능 | n8n 자체 에디터가 이미 성숙 (400+ 통합, 70+ AI 노드) |
| 자체 n8n 호스팅/실행 환경 | 인프라 비용 폭발 + 보안 리스크 + n8n 라이선스 이슈 |
| 실시간 결제 시스템 (v1) | 정적 사이트에서 백엔드 없이 불가, v2에서 외부 서비스 연동 |
| 사용자 계정/인증 (v1) | 정적 사이트에서 오버엔지니어링, v2에서 Supabase Auth |
| 커뮤니티/포럼 | 풀타임 관리 필요, n8n 공식 커뮤니티(55K+) 이미 존재 |
| 다국어 지원 (v1) | 한국어 시장 특화가 핵심 차별점, 영어는 v2 |
| 실시간 검색 (Algolia) | 초기 20개 수준에서 과잉, 100개 이상 시 재검토 |
| 모든 업종 커버 | 4개 업종 집중이 깊이 있는 콘텐츠의 핵심 |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| INFRA-01 | Phase 1: 프로젝트 기반 구축 | Complete |
| INFRA-02 | Phase 1: 프로젝트 기반 구축 | Complete |
| INFRA-03 | Phase 1: 프로젝트 기반 구축 | Complete |
| CATA-01 | Phase 2: 카탈로그 & 랜딩 UI | Complete |
| CATA-02 | Phase 2: 카탈로그 & 랜딩 UI | Complete |
| CATA-03 | Phase 2: 카탈로그 & 랜딩 UI | Complete |
| CATA-04 | Phase 2: 카탈로그 & 랜딩 UI | Complete |
| DETAIL-01 | Phase 3: 상세 페이지 & 비즈니스 모델 | Complete |
| DETAIL-02 | Phase 3: 상세 페이지 & 비즈니스 모델 | Complete |
| DETAIL-03 | Phase 3: 상세 페이지 & 비즈니스 모델 | Complete |
| DETAIL-04 | Phase 3: 상세 페이지 & 비즈니스 모델 | Complete |
| DETAIL-05 | Phase 3: 상세 페이지 & 비즈니스 모델 | Complete |
| DETAIL-06 | Phase 3: 상세 페이지 & 비즈니스 모델 | Complete |
| VISUAL-01 | Phase 3: 상세 페이지 & 비즈니스 모델 | Complete |
| VISUAL-02 | Phase 3: 상세 페이지 & 비즈니스 모델 | Complete |
| VISUAL-03 | Phase 3: 상세 페이지 & 비즈니스 모델 | Complete |
| BIZ-01 | Phase 3: 상세 페이지 & 비즈니스 모델 | Complete |
| BIZ-02 | Phase 3: 상세 페이지 & 비즈니스 모델 | Complete |
| BIZ-03 | Phase 3: 상세 페이지 & 비즈니스 모델 | Complete |
| CONT-01 | Phase 4: 콘텐츠 제작 | Complete |
| CONT-02 | Phase 4: 콘텐츠 제작 | Complete |
| CONT-03 | Phase 4: 콘텐츠 제작 | Complete |
| CONT-04 | Phase 4: 콘텐츠 제작 | Complete |
| CONT-05 | Phase 4: 콘텐츠 제작 | Complete |
| CONT-06 | Phase 4: 콘텐츠 제작 | Complete |
| SEO-01 | Phase 5: SEO & 런칭 | Complete |
| SEO-02 | Phase 5: SEO & 런칭 | Complete |
| SEO-03 | Phase 5: SEO & 런칭 | Complete |

**Coverage:**
- v1 requirements: 28 total
- Mapped to phases: 28
- Unmapped: 0

---
*Requirements defined: 2026-03-09*
*Last updated: 2026-03-09 after roadmap creation*
