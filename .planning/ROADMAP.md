# Roadmap: n8n 워크플로우 템플릿 마켓플레이스

## Overview

비개발자를 위한 n8n 워크플로우 템플릿 마켓플레이스를 Astro 정적 사이트로 구축한다. 프로젝트 기반(Astro + Content Collections) 위에 카탈로그 UI, 상세 페이지(인터랙티브 다이어그램 + 무료/프리미엄 모델), 실제 템플릿 콘텐츠, SEO 최적화를 순차 적용하여 GitHub Pages에 배포한다.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: 프로젝트 기반 구축** - Astro 5 + Tailwind CSS 4 프로젝트 셋업, Content Collections 스키마, 반응형 레이아웃
- [ ] **Phase 2: 카탈로그 & 랜딩 UI** - 업종별 카테고리 브라우징, 카드 레이아웃, 랜딩 페이지
- [ ] **Phase 3: 상세 페이지 & 비즈니스 모델** - 템플릿 상세 페이지, 인터랙티브 다이어그램, 무료/프리미엄 구분, 다운로드/문의 흐름
- [ ] **Phase 4: 콘텐츠 제작** - 업종별 워크플로우 템플릿 15-20개, 한국 서비스 API 설정 가이드
- [ ] **Phase 5: SEO & 런칭** - 메타 태그, sitemap, 키워드 랜딩 페이지, GitHub Pages 배포

## Phase Details

### Phase 1: 프로젝트 기반 구축
**Goal**: Astro 프로젝트가 빌드되고, 템플릿 데이터를 타입 안전하게 관리하며, 모든 디바이스에서 정상 표시되는 기반을 확보한다
**Depends on**: Nothing (first phase)
**Requirements**: INFRA-01, INFRA-02, INFRA-03
**Success Criteria** (what must be TRUE):
  1. `npm run build`가 에러 없이 완료되고, 빌드 결과물이 정적 HTML로 생성된다
  2. Content Collections에 샘플 템플릿 데이터를 추가하면 Zod 스키마로 빌드 시 검증된다
  3. Header/Footer가 포함된 레이아웃이 모바일(375px), 태블릿(768px), 데스크톱(1280px)에서 깨지지 않는다
**Plans**: 2 plans

Plans:
- [ ] 01-01-PLAN.md — Astro 5 + Tailwind CSS 4 프로젝트 초기화, Content Collections 스키마 + 샘플 MDX 템플릿
- [ ] 01-02-PLAN.md — BaseLayout + Header/Footer 반응형 레이아웃, 인덱스 페이지

### Phase 2: 카탈로그 & 랜딩 UI
**Goal**: 사용자가 랜딩 페이지에서 마켓플레이스 전체를 한눈에 파악하고, 업종별 카테고리로 템플릿을 탐색할 수 있다
**Depends on**: Phase 1
**Requirements**: CATA-01, CATA-02, CATA-03, CATA-04
**Success Criteria** (what must be TRUE):
  1. 랜딩 페이지에서 4개 업종 카테고리(금융, 마케팅, HR, IT/DevOps)와 주요 템플릿이 표시된다
  2. 각 카테고리를 클릭하면 해당 카테고리의 템플릿 목록이 카드형 레이아웃으로 나타난다
  3. 템플릿 카드에 이름, 카테고리, 난이도, 무료/프리미엄 배지가 한눈에 보인다
  4. 카드를 클릭하면 해당 템플릿 상세 페이지로 이동한다
**Plans**: TBD

Plans:
- [ ] 02-01: TBD
- [ ] 02-02: TBD
- [ ] 02-03: TBD

### Phase 3: 상세 페이지 & 비즈니스 모델
**Goal**: 사용자가 각 템플릿의 상세 정보를 인터랙티브 다이어그램과 함께 확인하고, 무료 템플릿은 즉시 다운로드, 프리미엄 템플릿은 문의를 통해 구매할 수 있다
**Depends on**: Phase 2
**Requirements**: DETAIL-01, DETAIL-02, DETAIL-03, DETAIL-04, DETAIL-05, DETAIL-06, VISUAL-01, VISUAL-02, VISUAL-03, BIZ-01, BIZ-02, BIZ-03
**Success Criteria** (what must be TRUE):
  1. 템플릿 상세 페이지에서 설명, 사용 시나리오, 필요 크레덴셜, 난이도, 예상 설정 시간이 표시된다
  2. n8n-demo-component로 워크플로우 다이어그램이 인터랙티브하게 렌더링되고, 각 노드의 타입과 연결 흐름이 시각적으로 확인된다
  3. 다이어그램이 모바일에서도 스크롤/줌으로 적절히 표시된다
  4. 무료 템플릿에서 JSON 다운로드 버튼을 클릭하면 파일이 즉시 다운로드된다
  5. 프리미엄 템플릿은 다이어그램 프리뷰만 보이고, 구매 버튼이 Google Form 문의 페이지로 연결된다
**Plans**: TBD

Plans:
- [ ] 03-01: TBD
- [ ] 03-02: TBD
- [ ] 03-03: TBD
- [ ] 03-04: TBD

### Phase 4: 콘텐츠 제작
**Goal**: 4개 업종에 걸쳐 실제 동작하는 n8n 워크플로우 템플릿 15-20개와 한국 서비스 API 설정 가이드가 완비된다
**Depends on**: Phase 3
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, CONT-06
**Success Criteria** (what must be TRUE):
  1. 금융 자동화 템플릿 4-5개(DART 공시, 주가 모니터링, 인보이스 처리 등)가 상세 페이지에 표시된다
  2. 한국 서비스 연동 템플릿 4-5개(카카오톡, 네이버, 사람인, DART)가 상세 페이지에 표시된다
  3. 마케팅(3-4개) + HR/IT(3-4개) 자동화 템플릿이 각 카테고리에 배치되어 있다
  4. 모든 템플릿에 유효한 n8n 워크플로우 JSON이 포함되어 있고, 다운로드 시 n8n에 import 가능한 형식이다
  5. 카카오톡, 네이버, 사람인, DART API 설정 가이드가 한글로 제공된다
**Plans**: TBD

Plans:
- [ ] 04-01: TBD
- [ ] 04-02: TBD
- [ ] 04-03: TBD
- [ ] 04-04: TBD

### Phase 5: SEO & 런칭
**Goal**: 검색 엔진(구글 + 네이버)에서 업종별 키워드로 유입되고, GitHub Pages에 프로덕션 배포가 완료된다
**Depends on**: Phase 4
**Requirements**: SEO-01, SEO-02, SEO-03
**Success Criteria** (what must be TRUE):
  1. 모든 페이지에 적절한 title, description, OG 메타 태그가 설정되어 있다
  2. sitemap.xml과 robots.txt가 빌드 시 자동 생성된다
  3. "금융 자동화", "채용공고 자동 수집" 등 업종별 키워드 랜딩 페이지가 존재하고 접근 가능하다
  4. GitHub Pages에 프로덕션 빌드가 배포되어 공개 URL로 접근 가능하다
**Plans**: TBD

Plans:
- [ ] 05-01: TBD
- [ ] 05-02: TBD
- [ ] 05-03: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. 프로젝트 기반 구축 | 0/2 | Planning complete | - |
| 2. 카탈로그 & 랜딩 UI | 0/3 | Not started | - |
| 3. 상세 페이지 & 비즈니스 모델 | 0/4 | Not started | - |
| 4. 콘텐츠 제작 | 0/4 | Not started | - |
| 5. SEO & 런칭 | 0/3 | Not started | - |
