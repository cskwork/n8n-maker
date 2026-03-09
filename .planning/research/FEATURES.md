# Feature Landscape

**Domain:** n8n 워크플로우 템플릿 마켓플레이스 (한국 비개발자 대상)
**Researched:** 2026-03-09
**Overall Confidence:** MEDIUM-HIGH

---

## Executive Summary

n8n 공식 템플릿 라이브러리(8,500+개)는 영어/글로벌 중심으로 한국 시장 특화 부재가 명확한 공백. 경쟁사(n8nmarket.com, haveworkflow.com, managen8n.com)는 글로벌 시장 타겟이며 업종별 특화가 약하고, 인터랙티브 프리뷰나 상세 한글 문서화가 없음. 금융 자동화(DART 전자공시, 세금계산서, 재무제표), 한국 서비스 연동(카카오/네이버/사람인), 로컬 LLM(Ollama) 프라이버시 워크플로우는 기존 마켓플레이스에서 거의 다루지 않는 영역으로 차별화 기회가 큼.

핵심 전략: **"한국 비개발자를 위한 업종 특화 n8n 템플릿"** -- 글로벌 경쟁사와 정면 승부하지 않고, 한국 시장 + 업종 특화 + 상세 한글 가이드라는 니치를 점유.

---

## Table Stakes

사용자가 당연히 기대하는 기능. 없으면 즉시 이탈.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **업종별 카테고리 분류** | n8n.io도 카테고리 분류 제공 (마케팅 2,650개, 세일즈 1,184개 등). 마켓플레이스 기본 | Low | 금융, 마케팅, HR, IT/DevOps 4개 카테고리 + 하위 분류 |
| **템플릿 상세 페이지** | 무엇을 하는지, 어떻게 설정하는지 알아야 구매 결정 | Med | 설명, 필요 크레덴셜, 난이도, 소요시간, 사전 조건 포함 |
| **워크플로우 JSON 다운로드** | n8n 템플릿의 핵심 가치 = JSON 파일 제공 | Low | 무료/유료 구분하여 다운로드 |
| **워크플로우 시각적 프리뷰** | n8n.io 공식 사이트도 워크플로우 다이어그램 표시 | Med | n8n-demo-webcomponent 활용이 최적 |
| **검색/필터링** | 8,500+개 n8n 공식 템플릿에서도 검색 지원. 기본 기대 | Med | 키워드, 카테고리, 난이도, 무료/유료 필터 |
| **난이도 표시** | n8n 공식 템플릿에서도 사용하는 패턴 (Easy/Medium/Advanced) | Low | 초급/중급/고급 3단계 + 설정 예상 시간 |
| **필요 서비스/크레덴셜 목록** | 어떤 API 키/계정이 필요한지 사전 확인 필수 | Low | 아이콘 + 텍스트로 필요 서비스 나열 |
| **반응형 디자인** | 모바일에서 검색 후 데스크톱에서 설치하는 패턴 | Med | Astro + Tailwind CSS. 카드형 레이아웃 |
| **무료 템플릿 제공** | 신뢰 구축 필수. 유료만 있으면 진입 장벽 | Low | 카테고리당 2-3개 무료 + 나머지 프리미엄 |
| **한글 UI/콘텐츠** | 타겟 사용자가 한국 비개발자. 경쟁사 전부 영어 | Low | 모든 인터페이스 + 설명 + 가이드 한국어 |
| **SEO 최적화** | 검색 유입이 주요 트래픽 소스. 비개발자는 검색으로 유입 | Med | 업종별 키워드 랜딩 ("금융 자동화", "채용공고 자동 수집" 등) |
| **빠른 로딩 속도** | 마켓플레이스 UX 연구: 100ms 지연도 전환율에 영향 | Low | Astro SSG + GitHub Pages. 기본 제공 |

### Table Stakes 근거

- n8n.io 공식 사이트: 카테고리, 검색, 시각적 프리뷰, 난이도, 크레덴셜 목록 제공 (Confidence: HIGH)
- n8nmarket.com, haveworkflow.com: 카테고리, 검색, 가격표시, 설명 페이지 제공 (Confidence: MEDIUM)
- 마켓플레이스 UX 연구: 88% 사용자가 나쁜 UX 경험 시 재방문하지 않으며, 최적화된 UX는 전환율 4배 향상 (Confidence: HIGH)

---

## Differentiators

경쟁 우위를 만드는 기능. 기대하지 않지만 발견 시 가치를 느낌.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **인터랙티브 워크플로우 다이어그램** | 구매 전 워크플로우의 노드 구성과 데이터 흐름을 직접 탐색 가능. 경쟁사 중 이 수준의 프리뷰를 제공하는 곳 없음 | High | n8n 공식 `@n8n_io/n8n-demo-component` npm 패키지 존재. workflow JSON 속성으로 렌더링. 프레임/스타일 커스터마이즈/인터랙티비티 on/off 가능. 대안으로 React Flow |
| **한국 서비스 연동 템플릿 전문** | 카카오톡 알림, 네이버 뉴스/블로그/커머스, 사람인 채용공고, DART 전자공시 등 한국 전용 API 템플릿. 글로벌 마켓플레이스에 절대 없는 콘텐츠 | Med | HTTP Request 노드 기반. 한국 API OAuth2/API Key 설정 가이드 필수 동반 |
| **금융 자동화 특화 카테고리** | DART 재무제표 수집, 주가/환율 모니터링, 세금계산서 자동화, 인보이스 처리 등. 금융권 사무직 직접 타겟. 글로벌 RPA 시장에서도 금융이 Top 수요 | High | DART Open API(무료), 한국투자증권 API 등 활용. 금융 데이터 정확성 검증 필요 |
| **로컬 LLM(Ollama) 전용 카테고리** | 클라우드 API 비용 없이, 데이터 프라이버시 100% 보장. 법률/의료/금융 민감 데이터 처리에 핵심 가치 | Med-High | n8n LangChain 노드 + Ollama Chat Model 조합. 문서 요약, 분류, NER, 데이터 추출 |
| **단계별 설정 가이드 (튜토리얼)** | 비개발자가 크레덴셜 발급부터 n8n 활성화까지 따라할 수 있는 상세 가이드. 기존 경쟁사는 JSON만 제공하고 설정 안내 미흡 | Med | 스크린샷 + 단계별 설명. 각 한국 서비스별 API 키 발급 방법 포함 |
| **업종별 번들 패키지** | "금융 자동화 스타터 팩" (5개 워크플로우 묶음) 등 세트 판매. 개별 구매보다 가치 높게 인식 | Low | 마케팅/가격 전략. v2에서 결제 시스템 연동 시 활성화 |
| **워크플로우 복잡도 시각화** | 노드 수, 연동 서비스 수, 예상 설정 시간을 시각적 배지로 표현. 구매 결정 도움 | Low | 프론트매터 데이터 기반 UI 배지. 구현 단순 |
| **커스터마이징 가이드** | "이 노드를 변경하면 카카오톡 대신 슬랙으로 알림 가능" 등 변형 방법 안내. 하나의 템플릿에서 여러 변형 가능 | Med | 각 템플릿별 커스터마이징 포인트 문서화 |
| **한국어 에러 해결 가이드** | n8n 에러 메시지를 한글로 번역/해설. 비개발자가 가장 많이 막히는 지점 | Med | 자주 발생하는 에러 Top 20 + 원인 + 해결책 |
| **데이터 흐름 애니메이션** | 노드 간 데이터 이동을 시각적 애니메이션으로 표현. 워크플로우 이해도 대폭 향상 | Med | React Flow 커스텀 엣지 애니메이션 또는 n8n-demo-component 확장 |

### Differentiator 근거

**인터랙티브 다이어그램:**
- n8n 공식 `n8n-demo-webcomponent` (npm: `@n8n_io/n8n-demo-component`) 존재. `<n8n-demo workflow='...'></n8n-demo>` HTML 요소로 렌더링. `frame`, `tidyup`, `disableinteractivity` 속성 지원. CSS 커스텀 프로퍼티로 스타일링 (Confidence: HIGH)
- React Flow (reactflow.dev)는 n8n 자체 에디터의 기반 라이브러리. 독립 구현으로 커스텀 노드 타입 가능 (Confidence: HIGH)
- 경쟁사(n8nmarket.com, haveworkflow.com, managen8n.com) 중 인터랙티브 프리뷰 제공하는 곳 없음 -- 정적 설명 텍스트만 제공 (Confidence: MEDIUM)

**한국 서비스 연동:**
- 카카오톡 "나에게 보내기" API: HTTP Request로 구현, 템플릿 메시지 전송 가능 (양방향 대화 불가) (Confidence: HIGH)
- 네이버 Open API (뉴스 검색, 블로그, 카페): HTTP Request + OAuth2 연동 확인됨. n8n 한글 가이드북에 가이드 존재 (Confidence: HIGH)
- 사람인 API: 공식 채용공고 검색 API 무료 제공, 직종/지역/경력 필터링 가능 (Confidence: HIGH)
- DART Open API: 기업정보, 재무제표, 공시자료 조회 무료 API. OpenDartReader, dart-fss 등 Python 라이브러리 다수 존재 (Confidence: HIGH)

**로컬 LLM(Ollama):**
- n8n 공식 LangChain 노드에서 `lmChatOllama` 모델 타입 지원 확인 (Confidence: HIGH)
- 실제 워크플로우 템플릿 존재: Gemma 3로 문서/이미지/스프레드시트 요약, 법률 문서 100% 로컬 처리, NER 케이스 스터디 (Confidence: HIGH)
- n8n Self-hosted AI Starter Kit (공식 GitHub 리포) 제공 -- Docker 기반 Ollama + n8n 통합 (Confidence: HIGH)
- 금융/의료/법률 분야에서 데이터 프라이버시가 핵심 구매 동기 (Confidence: HIGH)

**금융 자동화:**
- 글로벌 금융 RPA 시장 Top 유스케이스: AP/AR 처리, 인보이스 처리(70% 시간 절감), 은행 조정(95% 중복 결제 방지), 재무 보고, 세금 준수 (Confidence: HIGH)
- 한국 DART API: 기업정보, 재무제표 자동 수집 무료. REST API + JSON 응답으로 n8n HTTP Request 노드에서 직접 호출 가능 (Confidence: HIGH)
- 2026년 법인세율 전 구간 1%p 인상 등 세법 변경으로 자동화 수요 증가 예상 (Confidence: MEDIUM)

---

## Anti-Features

의도적으로 만들지 않을 것. 만들면 오히려 해가 됨.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **워크플로우 에디터 기능** | n8n 자체 에디터가 이미 존재하고 매우 성숙함 (400+ 통합, 70+ AI 노드). 에디터 재구현은 불필요한 복잡성이며 절대 따라잡을 수 없음 | 인터랙티브 프리뷰(읽기 전용)만 제공하고, 편집은 n8n에서 하도록 안내 |
| **실시간 결제 시스템 (v1)** | v1은 검증 단계. 결제 시스템 구축은 복잡하고(PG사 연동, 세금계산서 발행, 환불 로직 등) 시간 소모적. 정적 사이트에서 백엔드 없이 불가 | 문의/연락처 기반 (Google Form 또는 Notion Form). v2에서 토스페이먼츠 또는 Lemon Squeezy 연동 |
| **사용자 계정/인증 (v1)** | 정적 사이트(Astro + GitHub Pages)에서 인증 구현은 오버엔지니어링. 서버리스 함수 필요 | 이메일 뉴스레터 구독으로 관계 구축. v2에서 Supabase Auth 검토 |
| **커뮤니티/포럼 기능** | 커뮤니티 관리는 풀타임 리소스 필요. n8n 공식 커뮤니티(55,000+ 멤버)가 이미 존재하고 활발 | 카카오 오픈채팅 또는 디스코드 외부 링크로 대체 |
| **다국어 지원 (v1)** | 한국어 시장 특화가 핵심 차별점. 영어 지원은 리소스 분산이며 글로벌 경쟁사와 정면 승부해야 함 | v1은 한국어 전용. v2에서 영어 검토 |
| **자체 n8n 호스팅/실행 환경** | 사용자의 n8n 인스턴스에서 실행하는 것이 핵심 가치. 중앙 실행 환경은 인프라 비용 폭발 + 보안 리스크 + n8n 라이선스 이슈 | JSON 다운로드 -> 사용자 n8n에서 Import -> 활성화 가이드 제공 |
| **모든 업종 커버** | 4개 타겟 업종(금융/마케팅/HR/IT)에 집중해야 깊이 있는 콘텐츠 가능. 확산하면 어떤 업종도 제대로 다루지 못함 | 금융 > 마케팅 > HR > IT/DevOps 순으로 깊이 있게 |
| **실시간 검색 (Algolia 등)** | 초기 템플릿 30-50개 수준에서 Algolia 같은 서비스는 과잉. 월 비용 발생 | 클라이언트사이드 JavaScript 필터링 (Fuse.js 등). 100개 이상 시 재검토 |
| **워크플로우 실시간 모니터링** | n8n 자체 실행 로그/모니터링이 내장됨. 외부 모니터링은 n8n API 연동 + 인증 복잡성 | n8n 내장 모니터링 활용법 가이드 페이지 제공 |

---

## Feature Deep Dive: 핵심 카테고리별 템플릿 전략

### 1. 금융 자동화 템플릿 (최고 차별화 영역)

글로벌 RPA 시장에서 금융이 최대 수요 영역이나, 한국 금융 서비스 특화 n8n 템플릿은 전무.

| Sub-Category | 템플릿 예시 | Demand | Complexity | Korean API |
|-------------|------------|--------|------------|------------|
| **DART 전자공시 수집** | 매일 아침 DART 신규 공시 자동 수집 -> Notion/Sheets 저장 -> 카카오톡 알림 | High | Med | DART Open API (무료, REST) |
| **재무제표 자동 비교** | 분기별 재무제표 자동 수집 -> 전기 대비 변동 분석 -> 슬랙 리포트 | High | High | DART Open API |
| **주가/환율 모니터링** | 실시간 주가/환율 변동 감지 -> 임계값 초과 시 알림 | High | Med | 한국투자증권 API, 네이버 금융 크롤링 |
| **인보이스 자동 처리** | 이메일 수신 인보이스 -> AI 데이터 추출 -> Sheets 기록 | High | High | Gmail + OpenAI 또는 Ollama |
| **결제 정산 자동화** | 토스페이먼츠/카카오페이 결제 데이터 -> 일별/월별 정산 보고서 | Med | Med | 토스페이먼츠 Webhook API |
| **기업 리서치 자동화** | 기업명 입력 -> DART 공시 + 네이버 뉴스 -> 종합 리포트 | Med | Med | DART + 네이버 Open API |

**금융 자동화 수요 근거:**
- 글로벌: 인보이스 처리 70% 시간 절감 (Thermo Fisher 사례, 824,000 문서/년), 은행 조정 95% 중복 결제 방지 (Muthoot Finance, 1,898 계좌), 금융 보고 TAT 70% 단축 (Fortune 500) (Confidence: HIGH)
- 한국: DART Open API 무료 제공, 기업정보/재무제표/공시 자동 수집 기술적 검증 완료. OpenDartReader, dart-fss Python 라이브러리 활성 (Confidence: HIGH)

### 2. 로컬 LLM (Ollama) 워크플로우

클라우드 API 비용 제로 + 데이터가 외부로 나가지 않는 프라이버시 보장.

| Use Case | 템플릿 예시 | Privacy Value | Complexity |
|----------|------------|---------------|------------|
| **문서 요약** | PDF/워드 문서 -> Ollama(Gemma 3/LLaMA) 요약 -> Notion 저장 (100% 로컬) | Critical | Med |
| **이메일 분류** | Gmail 수신 -> Ollama 분류/우선순위 -> 라벨 적용 -> 중요 메일 알림 | High | Med |
| **데이터 추출 (NER)** | 계약서/이력서 -> Ollama NER -> 구조화된 JSON 데이터 추출 | Critical | High |
| **이미지 분석** | 제품 사진/영수증 -> Ollama Vision 모델 -> 데이터 추출 | High | Med |
| **RAG 챗봇** | 사내 문서 기반 QA 챗봇 (로컬 벡터DB + Ollama) | Critical | High |
| **번역/교정** | 한영 번역, 문서 교정 (로컬에서 처리) | Med | Low |
| **코드 리뷰** | Git PR 변경사항 -> Ollama 리뷰 -> 슬랙 알림 | Med | Med |

**Ollama 워크플로우 근거:**
- n8n 공식: `@n8n/n8n-nodes-langchain.lmChatOllama` 노드 타입 지원 (Confidence: HIGH)
- 실제 템플릿: "Summarize documents, images & spreadsheets with Gemma 3 on Ollama", "Process legal documents with Ollama AI (100% local)" 등 n8n.io에 등록 (Confidence: HIGH)
- NER 케이스 스터디: 14B 파라미터 모델로 Named Entity Recognition 자동화 성공 사례 (Confidence: MEDIUM)
- n8n Self-hosted AI Starter Kit: Docker 기반 Ollama + n8n + Qdrant 통합 스택 공식 제공 (Confidence: HIGH)

### 3. 한국 서비스 연동 템플릿

글로벌 마켓플레이스에 절대 없는 콘텐츠. 한국 시장 독점 가능.

| Service | 템플릿 예시 | Implementation | Complexity |
|---------|------------|----------------|------------|
| **카카오톡 알림** | 워크플로우 결과 -> 카카오톡 "나에게 보내기" | HTTP Request + OAuth2 | Med |
| **네이버 뉴스 검색** | 키워드 기반 뉴스 수집 -> AI 요약 -> 슬랙/카톡 알림 | HTTP Request + Naver Open API | Med |
| **네이버 블로그/카페** | 블로그 포스팅 자동화, 카페 글 수집/분석 | HTTP Request + OAuth2 | Med-High |
| **사람인 채용공고** | 키워드/직종별 채용공고 자동 수집 -> Notion DB 업데이트 -> 알림 | HTTP Request + 사람인 API | Med |
| **DART 기업 조회** | 기업코드 입력 -> 기업 정보 + 최근 공시 자동 조회 | HTTP Request + DART API | Med |
| **스마트스토어 주문** | 네이버 스마트스토어 주문 -> Sheets 기록 -> 발송 알림 | HTTP Request + Commerce API | High |
| **토스페이먼츠 정산** | 결제 Webhook -> 정산 데이터 정리 -> 슬랙 알림 | Webhook + HTTP Request | Med |

**한국 서비스 연동 근거:**
- 카카오톡 API: 나에게 보내기, 템플릿 메시지(리스트/피드/커머스) 가능. 양방향 대화는 불가. n8n 한글 가이드북 가이드 존재 (Confidence: HIGH)
- 네이버 Open API: 뉴스, 블로그, 카페, 쇼핑 검색 API 무료. X-Naver-Client-Id/Secret 헤더 인증 (Confidence: HIGH)
- 사람인 API: oapi.saramin.co.kr, 무료 API 키 발급, 채용공고 검색/필터 지원 (Confidence: HIGH)
- DART API: opendart.fss.or.kr, 무료 API 키, 기업정보/재무제표/공시 조회 (Confidence: HIGH)
- 토스페이먼츠: Webhook 이벤트(결제 완료, 가상계좌 입금 등) 지원 (Confidence: HIGH)

### 4. 마케팅 자동화 (한국 시장 특화)

글로벌에서 가장 큰 카테고리(2,650개 템플릿)이나, 한국 플랫폼 특화가 부재.

| 템플릿 | 설명 | Services | Complexity |
|--------|------|----------|------------|
| **인스타그램 콘텐츠 자동 생성** | 네이버 뉴스 크롤링 -> AI 카피 -> 이미지 생성 -> 인스타 포스팅 | 네이버 API + AI + Instagram API | High |
| **블로그 SEO 콘텐츠** | 키워드 리서치 -> AI 블로그 글 작성 -> 워드프레스/네이버 블로그 발행 | AI + Blog API | Med |
| **소셜 미디어 일괄 포스팅** | 하나의 콘텐츠 -> 인스타/페이스북/X/링크드인 동시 포스팅 | Multi-platform API | Med |
| **경쟁사 가격 모니터링** | 쿠팡/네이버쇼핑 가격 변동 -> 알림 -> Sheets 기록 | 크롤링 + Sheets | Med |
| **고객 리뷰 수집/분석** | 네이버/쿠팡 리뷰 -> AI 감성 분석 -> 대시보드 | 크롤링 + AI | High |

### 5. HR/취준생 자동화

한국 취업 시장 특화. 사람인/원티드 + DART 기업 리서치 조합.

| 템플릿 | 설명 | Services | Complexity |
|--------|------|----------|------------|
| **채용공고 자동 수집** | 사람인/원티드 채용공고 -> 필터링 -> Notion 정리 -> 알림 | 사람인 API + Notion | Med |
| **면접 일정 자동 관리** | 이메일에서 면접 일정 AI 추출 -> Google Calendar 등록 -> 리마인더 | Gmail + AI + Calendar | Med |
| **기업 리서치 자동화** | 기업명 -> DART 공시 + 네이버 뉴스 + 잡플래닛 -> 종합 리포트 | DART + 네이버 API + 크롤링 | High |
| **이력서 맞춤 생성** | 채용공고 분석 -> AI로 맞춤 이력서 섹션 생성 | AI + Notion | Med |
| **아침 브리핑** | 매일 아침 날씨 + 일정 + 뉴스 요약 -> 카카오톡/슬랙 알림 | 날씨 API + Calendar + 카카오 | Low |

---

## Feature Dependencies

```
[프로젝트 기반]
  Astro + Tailwind CSS
  └──> [Content Collections 스키마] ──> 모든 콘텐츠 페이지의 기반

[카탈로그 기능 체인]
  [한글 UI/콘텐츠]
    └──> [카테고리 분류] ──> [검색/필터링]
    └──> [템플릿 상세 페이지]
           ├──> [워크플로우 JSON 다운로드] (무료 템플릿)
           ├──> [워크플로우 시각적 프리뷰]
           │       └──> [인터랙티브 다이어그램] (n8n-demo-component)
           │               └──> [데이터 흐름 애니메이션] (선택)
           ├──> [난이도/복잡도 표시]
           ├──> [필요 서비스/크레덴셜 목록]
           └──> [단계별 설정 가이드]
                   └──> [커스터마이징 가이드] (확장)
                   └──> [한국어 에러 해결 가이드] (확장)

[SEO 최적화] ──> 모든 페이지에 적용 (sitemap, meta, OG, JSON-LD)

[콘텐츠 의존성]
  [한국 서비스 연동 템플릿]
    ├──> 카카오톡 API 설정 가이드 (필수 동반)
    ├──> 네이버 Open API 설정 가이드 (필수 동반)
    ├──> 사람인 API 설정 가이드 (필수 동반)
    └──> DART API 설정 가이드 (필수 동반)

  [금융 자동화 템플릿]
    └──> [DART API 연동 가이드] (필수 의존)
    └──> [Ollama 문서 처리] (부분 의존: AI 분석 포함 시)

  [로컬 LLM 카테고리]
    └──> [Ollama 설치/설정 가이드] (필수 의존)
    └──> [n8n + Ollama 연동 가이드] (필수 의존)
    └──> [Docker 기본 가이드] (선택 의존)

[비즈니스 모델]
  [무료 템플릿] ──> [프리미엄 업그레이드 유도] ──> [문의 폼] (v1)
  [무료 템플릿] ──> [프리미엄 업그레이드 유도] ──> [결제 시스템] (v2)
```

---

## MVP Recommendation

### Phase 1: Core Platform (기반 구축)

**반드시 포함:**
1. **카테고리 분류 + 클라이언트 필터링** (Table Stakes) - 4개 업종 카테고리 + 태그 + Fuse.js 검색
2. **템플릿 상세 페이지** (Table Stakes) - 설명, 난이도, 필요 서비스, 노드 목록, 설정 가이드
3. **워크플로우 JSON 다운로드** (Table Stakes) - 무료 템플릿 즉시 다운로드
4. **n8n-demo-webcomponent 프리뷰** (Table Stakes + Differentiator) - JSON 기반 인터랙티브 워크플로우 시각화
5. **SEO 최적화** (Table Stakes) - 업종별 랜딩 페이지 + JSON-LD + OG
6. **한글 UI** (Table Stakes) - 전체 인터페이스 한국어
7. **반응형 디자인** (Table Stakes) - Tailwind CSS 카드형 레이아웃

**초기 콘텐츠 (최소 15-20개 템플릿):**
8. **한국 서비스 연동 템플릿 5개** - 카카오톡 알림, 네이버 뉴스, 사람인 채용공고, DART 공시, 아침 브리핑
9. **금융 자동화 템플릿 3-5개** - DART 재무제표, 주가 모니터링, 결제 정산, 인보이스 처리
10. **Ollama 워크플로우 3개** - 문서 요약, 이메일 분류, 데이터 추출
11. **각 템플릿별 설정 가이드** - 크레덴셜 발급부터 활성화까지

### Phase 2: Differentiation (차별화 확대)

- **인터랙티브 다이어그램 고도화** - 노드 클릭 시 상세 정보 팝업, 데이터 흐름 애니메이션
- **Ollama 전용 카테고리 확장** - RAG 챗봇, 이미지 분석, NER 추가
- **업종별 번들 패키지** 기획 - "금융 자동화 스타터 팩" 등
- **한국어 에러 해결 가이드** - Top 20 에러 + 원인 + 해결법
- **커스터마이징 가이드** - 각 템플릿 변형 방법
- 템플릿 30개 -> 50개 확대

### Defer: v2 이후

- **결제 시스템** (토스페이먼츠 또는 Lemon Squeezy) - 수요 검증 후
- **사용자 계정/인증** (Supabase Auth) - 결제 시스템과 함께
- **커뮤니티 기능** (리뷰, 별점, 사용자 템플릿 제출) - 사용자 기반 확보 후
- **영어 지원** - 한국 시장 검증 후
- **마켓플레이스 양면 시장** (크리에이터가 템플릿 판매) - 생태계 성숙 후

**Defer 근거:** v1은 정적 사이트(Astro + GitHub Pages)로 제품-시장 적합성 검증 단계. 무료 인프라에서 수요를 확인한 후 v2에서 동적 기능(결제, 계정, 커뮤니티) 추가.

---

## Competitive Landscape

| Feature | n8n.io Official | n8nmarket.com | haveworkflow.com | **우리 (계획)** |
|---------|-----------------|---------------|------------------|----------------|
| 템플릿 수 | 8,500+ | ~50 | ~30 | 20-50 (초기) |
| 한국어 | X | X | X | **O (전용)** |
| 한국 서비스 연동 | X | X | X | **O (핵심 차별점)** |
| 금융 특화 | ~250개 (영어, 일반) | 일부 | X | **O (DART/한국 금융)** |
| Ollama 전용 카테고리 | 2-3개 (분산) | X | X | **O (전용 카테고리)** |
| 인터랙티브 프리뷰 | 정적 이미지 | X | X | **O (n8n-demo-component)** |
| 설정 가이드 depth | 간단 (영어) | 간단 (영어) | 간단 (영어) | **상세 한글 튜토리얼** |
| 가격 모델 | 무료 (커뮤니티) | 유료 | 유료 | **Freemium (무료+프리미엄)** |
| 업종별 분류 | 일반 카테고리 | 일반 | 일반 | **업종 특화 (4개)** |
| 에러 해결 가이드 | 영어 docs | X | X | **한글 에러 해설** |
| 타겟 시장 | 글로벌 | 글로벌 | 글로벌 | **한국 비개발자** |

**핵심 경쟁 우위 요약:**
1. 한국어 전용 (유일)
2. 한국 서비스 API 연동 (유일)
3. 금융 자동화 + DART (유일)
4. 인터랙티브 워크플로우 프리뷰 (유일)
5. 비개발자 대상 상세 설정 가이드 (차별적 깊이)

---

## Sources

### n8n Official & Ecosystem
- [n8n.io Workflow Templates (8,515)](https://n8n.io/workflows/) - HIGH confidence
- [n8n Templates Documentation](https://docs.n8n.io/workflows/templates/) - HIGH confidence
- [n8n-demo-webcomponent](https://n8n-io.github.io/n8n-demo-webcomponent/) - HIGH confidence
- [n8n-demo npm package](https://www.npmjs.com/package/@n8n_io/n8n-demo-component) - HIGH confidence
- [n8n Ollama Integration](https://n8n.io/integrations/ollama-model/) - HIGH confidence
- [n8n Self-hosted AI Starter Kit](https://github.com/n8n-io/self-hosted-ai-starter-kit) - HIGH confidence
- [n8n Guide 2026](https://hatchworks.com/blog/ai-agents/n8n-guide/) - MEDIUM confidence

### Competing Marketplaces
- [n8nmarket.com](https://n8nmarket.com/) - MEDIUM confidence
- [haveworkflow.com](https://haveworkflow.com/) - MEDIUM confidence
- [ManageN8N Marketplace](https://www.managen8n.com/features/marketplace) - MEDIUM confidence
- [n8n Community: Workflow Selling Discussion](https://community.n8n.io/t/where-can-i-sell-my-n8n-workflow-i-am-looking-for-marketplaces-not-the-creator-hub/212963) - MEDIUM confidence
- [10 Monetizable n8n Templates](https://medium.com/@Modexa/10-monetizable-n8n-templates-you-can-sell-748ae4b8f122) - LOW confidence

### Finance Automation
- [Top 9 RPA Use Cases in Finance 2026](https://research.aimultiple.com/rpa-finance/) - HIGH confidence
- [Finance Process Automation 2026](https://www.phacetlabs.com/blog/finance-process-automation-2026) - MEDIUM confidence
- [9 Finance Automation Use Cases 2026](https://www.rpatech.ai/blogs/finance-automation/) - MEDIUM confidence
- [DART Open API](https://opendart.fss.or.kr/intro/main.do) - HIGH confidence
- [OpenDartReader GitHub](https://github.com/FinanceData/OpenDartReader) - HIGH confidence
- [Beyond RPA: AI Agents Transform Finance 2026](https://www.phacetlabs.com/blog/beyond-rpa-ai-agents-finance-automation-2026) - MEDIUM confidence

### Local LLM / Ollama
- [n8n Blog: How to Run a Local LLM (2025)](https://blog.n8n.io/local-llm/) - HIGH confidence
- [Summarize Documents with Gemma 3 on Ollama](https://n8n.io/workflows/5858-summarize-documents-images-and-spreadsheets-with-gemma-3-on-ollama/) - HIGH confidence
- [Process Legal Documents with Ollama AI (100% local)](https://n8n.io/workflows/4869-process-legal-documents-with-ollama-ai-and-generate-html-reports-100percent-local/) - HIGH confidence
- [Local LLM-Based NER Case Study](https://drezil.de/Writing/ner4all-case-study.html) - MEDIUM confidence
- [Powerful Local AI Automations with n8n, MCP and Ollama](https://www.kdnuggets.com/powerful-local-ai-automations-with-n8n-mcp-and-ollama) - MEDIUM confidence
- [Self-hosted AI Workflows with Docker, n8n, Ollama](https://ngrok.com/blog/self-hosted-local-ai-workflows-with-docker-n8n-ollama-and-ngrok-2025) - MEDIUM confidence

### Korean Services
- [카카오톡 API n8n 가이드](https://wikidocs.net/290905) - HIGH confidence
- [사람인 채용 공고 API](https://oapi.saramin.co.kr/guide/job-search) - HIGH confidence
- [n8n 한글 가이드북](https://wikidocs.net/book/18092) - HIGH confidence
- [나노바나나 x n8n 한국 이커머스 사례](https://irumhahn.com/nanobanana-n8n/) - MEDIUM confidence
- [한컴테크 n8n 서비스 자동화 전략](https://tech.hancom.com/workflow-n8n-service/) - MEDIUM confidence

### Visualization
- [React Flow](https://reactflow.dev/) - HIGH confidence
- [n8n-demo-webcomponent Docs](https://n8n-io.github.io/n8n-demo-webcomponent/api/) - HIGH confidence
- [Visualize n8n Workflows with Mermaid.js](https://n8n.io/workflows/2378-visualize-your-n8n-workflows-with-mermaidjs/) - MEDIUM confidence

### Marketplace UX
- [Marketplace UI/UX Best Practices (Qubstudio)](https://qubstudio.com/blog/marketplace-ui-ux-design-best-practices-and-features/) - MEDIUM confidence
- [Good Marketplace UX Design Guide (Rigby)](https://www.rigbyjs.com/blog/marketplace-ux) - MEDIUM confidence
- [Marketplace UX Design (Purrweb)](https://www.purrweb.com/blog/marketplace-ux-ui-design/) - MEDIUM confidence
