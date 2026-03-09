# 프로젝트 리서치 요약

**프로젝트:** n8n 워크플로우 템플릿 마켓플레이스
**도메인:** 한국 비개발자 대상 n8n 워크플로우 템플릿 카탈로그 (정적 사이트)
**조사일:** 2026-03-09
**전체 신뢰도:** HIGH

## Executive Summary

이 프로젝트는 한국 비개발자(취준생, 사무직, 소상공인, 마케터)를 위한 n8n 워크플로우 템플릿 마켓플레이스다. 글로벌 경쟁사(n8n.io 공식 8,500+개, n8nmarket.com, haveworkflow.com)는 모두 영어/글로벌 중심이며, 한국 서비스 연동(카카오/네이버/사람인/DART)이나 업종 특화 콘텐츠가 전무하다. 핵심 전략은 정면 승부 회피 -- "한국어 전용 + 업종 특화(금융/마케팅/HR/IT) + 로컬 LLM(Ollama) + 상세 한글 설정 가이드"라는 니치를 독점하는 것이다.

권장 접근법은 Astro 5(Islands Architecture) + Tailwind CSS 4 + React Flow(@xyflow/react)를 기반으로 한 정적 사이트다. Content Collections로 템플릿 메타데이터를 Zod 스키마로 관리하고, GitHub Pages로 무료 배포한다. 핵심 차별화 요소인 인터랙티브 워크플로우 다이어그램은 Phase 1에서 n8n-demo-component(CDN, 빠른 구현)로 시작하고, Phase 3에서 React Flow(커스텀 노드, 브랜딩)로 업그레이드하는 점진적 전략이 합리적이다. 콘텐츠는 정적 HTML로 렌더링하고, 다이어그램과 필터 UI만 React Island로 선택적 하이드레이션하여 성능을 극대화한다.

주요 리스크는 세 가지다. 첫째, n8n 워크플로우 JSON의 버전 호환성 문제 -- n8n이 빈번하게 breaking change를 내놓아 템플릿이 사용자 인스턴스에서 작동하지 않을 수 있다(커뮤니티 보고 약 40% import 문제). 둘째, 한국 서비스 API의 숨겨진 제약 -- 카카오톡 메시지 API의 일일 호출 제한, 알림톡 템플릿 사전 승인 등 "기술적으로 가능"과 "비개발자가 실제로 할 수 있는 것" 사이의 괴리. 셋째, 로컬 LLM의 하드웨어 장벽 -- 타겟 사용자 PC 대부분이 내장 그래픽 + 8-16GB RAM이라 Ollama 실행이 사실상 불가능할 수 있다. 이 세 가지 모두 "정직한 사전 고지 + 대안 경로 제시"로 완화해야 한다.

## 주요 발견사항

### 권장 스택

Astro 5.x(5.18.0 stable)를 코어 프레임워크로, 콘텐츠 중심 정적 사이트에 최적화된 선택이다. Astro 6 베타는 불안정하고 정적 사이트에 불필요한 기능(Cloudflare Workers)만 추가하므로 배제한다. Tailwind CSS 4.x는 CSS-first 설정으로 별도 config 불필요하고 빌드 성능이 5x 향상되었다. 기존 `@astrojs/tailwind`는 deprecated이며 `@tailwindcss/vite` 플러그인을 사용해야 한다.

**핵심 기술:**
- **Astro 5.x (5.18.0)**: 정적 사이트 생성 -- Content Collections + Islands Architecture로 콘텐츠 관리와 선택적 하이드레이션을 동시 해결
- **@xyflow/react 12.x (12.10.1)**: 워크플로우 다이어그램 시각화 -- n8n 자체가 React Flow 기반이므로 동일 라이브러리로 스타일 재현 가능
- **Tailwind CSS 4.x (4.2.1)**: 유틸리티 CSS -- @theme 디렉티브로 n8n 브랜드 색상 관리, CSS-first 설정
- **Astro Content Collections + Zod**: 템플릿 카탈로그 관리 -- glob() 로더로 JSON 파일 자동 수집, Zod 스키마로 빌드 시 검증
- **GitHub Pages + withastro/action v5**: 무료 배포 -- Astro 공식 GitHub Action으로 빌드/배포 자동화
- **n8n-demo-component (CDN)**: MVP 워크플로우 시각화 -- CDN 한 줄로 n8n 완벽 스타일 재현, Phase 3에서 React Flow로 교체

**v2 예정 기술:**
- **Lemon Squeezy** (5% + $0.50): Lemon.js 2.3KB 오버레이 체크아웃이 정적 사이트에 최적. Stripe 인수 후 안정성 재평가 필요

### 기능 우선순위

**반드시 있어야 하는 기능 (Table Stakes):**
- 업종별 카테고리 분류 (금융/마케팅/HR/IT-DevOps/Local-LLM 5개)
- 템플릿 상세 페이지 (설명, 난이도, 필요 크레덴셜, 설정 가이드)
- 워크플로우 JSON 다운로드 (무료 템플릿)
- 워크플로우 시각적 프리뷰 (n8n-demo-component)
- 검색/필터링 (키워드, 카테고리, 난이도, 무료/유료)
- 한글 UI/콘텐츠 전체
- 반응형 디자인
- SEO 최적화 (구글 + 네이버 듀얼)
- 빠른 로딩 속도 (Astro SSG 기본 제공)

**차별화 기능 (Differentiator):**
- 인터랙티브 워크플로우 다이어그램 (React Flow 커스텀 노드, 노드 클릭 시 상세 정보)
- 한국 서비스 연동 템플릿 (카카오톡/네이버/사람인/DART) -- 글로벌 마켓에 절대 없음
- 금융 자동화 특화 카테고리 (DART 재무제표, 주가 모니터링, 인보이스 처리)
- 로컬 LLM(Ollama) 전용 카테고리 -- 프라이버시 보장, 클라우드 비용 제로
- 단계별 설정 가이드 + 한국어 에러 해결 가이드
- 워크플로우 복잡도 시각화 (노드 수, 연동 서비스 수, 예상 설정 시간 배지)
- 데이터 흐름 애니메이션 (React Flow 커스텀 엣지)

**v2 이후로 미룰 기능:**
- 결제 시스템 (Lemon Squeezy / 토스페이먼츠)
- 사용자 계정/인증 (Supabase Auth)
- 커뮤니티/포럼 (카카오 오픈채팅/디스코드로 대체)
- 영어 지원
- 마켓플레이스 양면 시장 (크리에이터 판매)
- 실시간 검색 (Algolia) -- 100개 이상 시 재검토

### 아키텍처 접근법

Astro Islands 아키텍처 기반 정적 마켓플레이스. 콘텐츠 페이지는 100% 정적 HTML, 다이어그램과 필터만 React Island로 선택적 하이드레이션. 이중 데이터 구조(메타데이터 JSON + 원본 워크플로우 JSON 분리)로 프리미엄 콘텐츠를 보호하고 페이지 로드를 경량화한다. n8n JSON에서 React Flow로의 변환은 빌드 시점에 서버에서 실행하여 클라이언트 번들에 변환 로직을 포함하지 않는다.

**주요 컴포넌트:**
1. **Content Layer** -- Astro Content Collections + Zod 스키마로 템플릿 메타데이터 관리 및 빌드 시 검증
2. **Page Generator** -- getStaticPaths()로 카테고리별/상세 정적 HTML 페이지 자동 생성
3. **WorkflowDiagram Island** -- React + @xyflow/react, client:visible로 뷰포트 진입 시만 하이드레이션
4. **TemplateFilter Island** -- React, client:load로 검색/필터 즉시 활성화
5. **n8n-to-ReactFlow 변환기** -- TypeScript 유틸리티, 빌드 시점 실행 (클라이언트 JS에 미포함)
6. **Build & Deploy** -- GitHub Actions + withastro/action v5로 자동 배포

**주요 아키텍처 결정:**
- Phase 1에서 n8n-demo-component(CDN, LitElement 웹 컴포넌트)로 시작 -> Phase 3에서 @xyflow/react로 마이그레이션
- 콘텐츠 설정 파일 위치: `src/content.config.ts` (Astro 5.0+ 변경 사항)
- 프리미엄 JSON은 리포지토리에 미포함, 메타데이터의 diagramData에 노드명/타입/위치만 포함

**회피할 안티패턴:**
- 전체 워크플로우 JSON을 페이지에 인라인 (프리미엄 콘텐츠 노출)
- SPA 클라이언트 라우팅 (SEO 파괴)
- 하나의 거대한 React Island (번들 크기 폭발)
- client:load 남용 (FCP/LCP 저하)
- 빌드 시 n8n 인스턴스 API 의존 (빌드 실패 위험)

### 치명적 함정

1. **n8n JSON 버전 호환성 지뢰밭** -- n8n v2.0에서 Start 노드 삭제, typeVersion 변경 등 breaking change 빈번. 커뮤니티 보고 약 40% import 문제. **예방:** 호환 버전 범위 명시, 최신 typeVersion 사용, deprecated 노드 금지, CI에서 호환성 자동 검증
2. **크레덴셜 정보 노출** -- 워크플로우 JSON에 API 키, 개인 이메일 등 하드코딩 가능. **예방:** 빌드 시 JSON sanitization 자동 스캔, 플레이스홀더 표준화(`YOUR_API_KEY`), 크레덴셜 이름 규칙 강제
3. **정적 사이트의 마켓플레이스 기능 한계** -- GitHub Pages에서 검색/결제/인증 서버 로직 불가. 1GB 사이트, 100GB/월 대역폭 소프트 리밋. **예방:** Pagefind/Fuse.js 클라이언트 검색, 태그 기반 정적 필터 페이지, v2 결제를 고려한 데이터 구조 선설계
4. **한국 서비스 API 숨겨진 제약** -- 카카오톡 발신-수신 쌍당 20건/일, 알림톡 사전 승인 필수, 네이버 일부 API 사업자 인증, 홈택스 공식 API 거의 불가. **예방:** 사전 준비 사항 필수 명시, API 접근 난이도 별도 표기, 대안(텔레그램/Gmail) 항상 병기
5. **로컬 LLM 하드웨어 장벽** -- 7-8B 모델에 최소 8-12GB VRAM 필요, Ollama 모델이 AI Agent 노드와 비호환(Basic LLM Chain만 가능). **예방:** 하드웨어 사양 표기, 경량 모델(phi-3 mini 3.8B) 우선 추천, 클라우드 AI 대안 항상 병기

## 로드맵 시사점

리서치를 종합하면, 5개 Phase 구조가 적절하다. 의존성 기반으로 Phase 1이 모든 후속 작업의 기반이 되고, 콘텐츠 완성(Phase 2) 이후에 인터랙티브 기능(Phase 3)을, 핵심 기능 완성 후 SEO/마케팅(Phase 4), 마지막으로 배포 최적화(Phase 5)를 진행한다.

### Phase 1: 기반 구조 + MVP 카탈로그
**근거:** Content Collection 스키마와 레이아웃이 모든 후속 페이지/기능의 기반. Astro 프로젝트 초기화 없이 아무것도 할 수 없음.
**산출물:** Astro 프로젝트 구조, Content Collection 스키마(content.config.ts), 기본 레이아웃(Header/Footer), 랜딩 페이지, 카탈로그 목록 페이지, n8n-demo-component CDN 워크플로우 시각화
**대상 기능:** 카테고리 분류, 한글 UI, 반응형 디자인, 워크플로우 시각적 프리뷰
**회피할 함정:** JSON 호환성(#1) -- 스키마에 n8n 버전 범위 필드 포함, 크레덴셜 노출(#4) -- sanitization 규칙 수립, SEO 기초(#8) -- `<html lang="ko">` + 네이버 서치어드바이저 등록, base path 설정 -- `import.meta.env.BASE_URL` 활용

### Phase 2: 콘텐츠 & 상세 페이지 완성
**근거:** Phase 1의 페이지 구조 위에 카테고리 라우팅과 상세 페이지를 구축. 핵심 콘텐츠(템플릿 15-20개)를 이 단계에서 제작해야 Phase 3에서 인터랙티브 기능을 테스트할 대상이 존재.
**산출물:** 카테고리별 라우팅(`[category]/[slug]`), 템플릿 상세 페이지, 무료/프리미엄 구분 UI, JSON 다운로드 기능, 가격 페이지, 초기 콘텐츠 15-20개 (한국 서비스 5개 + 금융 3-5개 + Ollama 3개 + 기타)
**사용 스택:** Astro getStaticPaths, Content Collections, Tailwind CSS
**회피할 함정:** 문서화 품질(#9) -- 문서 체크리스트 표준화, 수익 모델 모호(#10) -- 무료(초급, 5노드 이하)/프리미엄(복합 서비스+AI) 기준 명확화, 서브워크플로우 번들링(#2) -- Self-contained 단일 JSON 설계 원칙

### Phase 3: 인터랙티브 Islands 업그레이드
**근거:** Phase 2에서 페이지 구조가 완성되어야 Island를 삽입할 위치가 존재. 핵심 차별화 요소(인터랙티브 다이어그램)를 이 단계에서 구현.
**산출물:** @xyflow/react 커스텀 n8n 스타일 다이어그램, n8n-to-reactflow 변환 유틸리티, WorkflowNode 커스텀 컴포넌트(트리거/액션/로직/AI 노드 타입별), TemplateFilter Island (검색/필터), CopyButton Island
**사용 스택:** @xyflow/react 12.x, React 19, dagre (레이아웃 엔진)
**회피할 함정:** 다이어그램 성능(#5) -- React.memo + client:visible + 노드 스타일 단순화(box-shadow 대신 border), Islands 남용(#11) -- 다이어그램 없는 페이지에서 React 미로드, 목록에서는 정적 SVG -> 상세에서만 React Flow

### Phase 4: SEO & 콘텐츠 확대 & 가이드
**근거:** 핵심 기능이 모두 완성된 후 검색 유입 최적화와 콘텐츠 확대에 집중. SEO는 콘텐츠가 충분해야 효과적.
**산출물:** SEO 메타태그 최적화(구글 + 네이버 듀얼), JSON-LD 구조화 데이터(SoftwareApplication 스키마), OG 이미지, n8n 시작 가이드(MDX), 한국어 에러 해결 가이드 Top 20, 커스터마이징 가이드, 템플릿 30-50개 확대
**회피할 함정:** 한국어 SEO 두 마리 토끼(#8) -- 네이버 블로그 연동 + 정기 콘텐츠 업데이트 + 한국어 키워드 리서치("n8n 자동화", "업무 자동화 도구"), 한국 API 제약(#6) -- 사전 준비 가이드 + 스크린샷 포함 API 키 발급 방법

### Phase 5: 배포 최적화 & 런칭
**근거:** 전체 기능 완성 후 성능 최적화와 프로덕션 배포. GitHub Actions CI/CD 설정은 마지막에 확정.
**산출물:** GitHub Actions 배포 워크플로우(deploy.yml), 성능 최적화(이미지/Pretendard 폰트/번들), JSON sanitization CI 파이프라인, Lighthouse 성능 테스트, 프로덕션 배포
**회피할 함정:** 정적 사이트 한계(#3) -- GitHub Pages 1GB/100GB 대역폭 한도 모니터링, package-lock.json 반드시 커밋

### Phase 순서 근거

- **Phase 1 > 2**: Content Collection 스키마와 레이아웃이 없으면 페이지 생성 자체가 불가능
- **Phase 2 > 3**: 상세 페이지 구조가 있어야 React Island를 삽입할 위치가 존재하고, 콘텐츠가 있어야 인터랙티브 기능 테스트 가능
- **Phase 3 > 4**: 인터랙티브 다이어그램(핵심 차별화)이 SEO보다 제품 가치에 직접적 기여
- **n8n-demo-component(Phase 1) > React Flow(Phase 3)**: MVP를 빠르게 시각적으로 완성하고, 이후 커스텀 UX로 업그레이드하는 점진적 전략
- **SEO(Phase 4)가 후순위인 이유**: 콘텐츠가 20개 이상 있어야 SEO 최적화가 유의미하며, 빈 사이트의 SEO는 무의미

### 리서치 플래그

**심층 리서치가 필요한 Phase:**
- **Phase 2:** 한국 서비스 API 연동 템플릿 제작 시 각 API의 실제 호출 제한, 인증 절차, 비개발자 접근성 검증 필요. n8n-demo-component의 Astro 정적 빌드 환경에서의 실제 렌더링 품질 프로토타입 검증
- **Phase 3:** React Flow 커스텀 노드 구현, n8n JSON -> React Flow 변환 유틸리티의 엣지 케이스(분기 노드, 루프, IF/Switch 다중 출력) 검증 필요
- **Phase 4:** 네이버 SEO 최적화 전략 -- 네이버 서치어드바이저 설정, 네이버 블로그 연동, 한국어 키워드 리서치 구체화 필요

**표준 패턴으로 충분한 Phase (리서치 생략 가능):**
- **Phase 1:** Astro 5 프로젝트 초기화, Content Collections, Tailwind CSS 4 설정 -- 공식 문서가 매우 상세
- **Phase 5:** GitHub Pages 배포 + GitHub Actions -- Astro 공식 가이드 그대로 따르면 됨

## 신뢰도 평가

| 영역 | 신뢰도 | 비고 |
|------|--------|------|
| Stack | HIGH | Astro 5.18.0, @xyflow/react 12.10.1, Tailwind 4.2.1 모두 npm에서 버전 직접 확인. 공식 문서 기반 설정 코드 포함 |
| Features | MEDIUM-HIGH | n8n 공식 템플릿(8,500+), 경쟁사 3곳 분석, 한국 API 공식 문서 확인. 경쟁사 기능 비교는 웹 기반으로 일부 부정확 가능 |
| Architecture | HIGH | Astro 공식 문서(Content Collections, Islands, Props 직렬화, GitHub Pages 배포)에서 직접 확인. React Flow 공식 Performance 가이드 기반 |
| Pitfalls | HIGH | n8n 공식 v2.0 breaking changes 문서, React Flow Performance 가이드, GitHub Pages 한도, 카카오 Quota 문서, Ollama GPU 공식 문서 등 1차 소스 기반 |

**전체 신뢰도:** HIGH

### 해결이 필요한 갭

- **n8n-demo-component 실제 동작 검증**: npm 패키지(v1.0.20) 존재 확인했지만, Astro 정적 빌드 환경에서 CDN 로드 방식의 실제 렌더링 품질과 커스터마이징 한계를 Phase 1 시작 시 프로토타입으로 검증 필요
- **프리미엄 콘텐츠 보호의 실효성**: 정적 사이트에서 프리미엄 JSON을 리포지토리 외부에 보관하는 구체적 운영 방안 (이메일 전송? Google Drive 링크?) 미확정. Phase 2에서 결정 필요
- **Lemon Squeezy 안정성 (v2)**: Stripe 인수 후 일부 불안정 보고. v2 시점에서 Lemon Squeezy vs 토스페이먼츠 vs Polar 재평가 필요
- **네이버 SEO 구체 전략**: 네이버 서치어드바이저 등록, 네이버 블로그 연동의 구체적 기술 구현 방안은 Phase 4 계획 시 심층 리서치 필요
- **Ollama + n8n AI Agent 노드 비호환**: Ollama 모델이 AI Agent 노드와 호환되지 않는다는 보고 -- Basic LLM Chain만 가능. 이 제약이 로컬 LLM 템플릿 설계에 미치는 영향을 Phase 2 콘텐츠 제작 시 검증 필요
- **클라이언트 검색 기술 선택**: Pagefind vs Fuse.js -- 초기 템플릿 20-50개 수준에서는 Fuse.js가 간단하지만, 100개 이상 시 Pagefind(WASM 기반, 빌드 시 인덱싱)가 더 적합. Phase 3 TemplateFilter 구현 시 결정

## 출처

### 1차 소스 (HIGH 신뢰도)
- [Astro 공식 문서 - Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Astro 공식 문서 - Islands Architecture](https://docs.astro.build/en/concepts/islands/)
- [Astro 공식 문서 - GitHub Pages 배포](https://docs.astro.build/en/guides/deploy/github/)
- [Astro 공식 문서 - Framework Components (Props 직렬화)](https://docs.astro.build/en/guides/framework-components/)
- [@xyflow/react 12.10.1 npm](https://www.npmjs.com/package/@xyflow/react)
- [React Flow Custom Nodes](https://reactflow.dev/learn/customization/custom-nodes)
- [React Flow Performance Guide](https://reactflow.dev/learn/advanced-use/performance)
- [@n8n_io/n8n-demo-component v1.0.20 npm](https://www.npmjs.com/package/@n8n_io/n8n-demo-component)
- [n8n v2.0 Breaking Changes](https://docs.n8n.io/2-0-breaking-changes/)
- [n8n Workflow Export/Import](https://docs.n8n.io/workflows/export-import/)
- [n8n Ollama Integration](https://n8n.io/integrations/ollama-model/)
- [n8n Self-hosted AI Starter Kit](https://github.com/n8n-io/self-hosted-ai-starter-kit)
- [DART Open API](https://opendart.fss.or.kr/intro/main.do)
- [카카오 Developers Quota](https://developers.kakao.com/docs/latest/en/getting-started/quota)
- [사람인 채용공고 API](https://oapi.saramin.co.kr/guide/job-search)
- [GitHub Pages Limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
- [Ollama GPU 공식 문서](https://docs.ollama.com/gpu)
- [Astro npm (5.18.0)](https://www.npmjs.com/package/astro)
- [Tailwind CSS npm (4.2.1)](https://www.npmjs.com/package/tailwindcss)

### 2차 소스 (MEDIUM 신뢰도)
- [n8n 한글 가이드북 (wikidocs)](https://wikidocs.net/book/18092)
- [카카오톡 API n8n 가이드](https://wikidocs.net/290905)
- [n8n-demo-component 사용 가이드](https://n8n-io.github.io/n8n-demo-webcomponent/)
- [Pagefind + Astro 통합](https://syntackle.com/blog/pagefind-search-in-astro-site/)
- [Astro Client-side Search 비교](https://evilmartians.com/chronicles/how-to-add-fast-client-side-search-to-astro-static-sites)
- [SEO Korea Guide 2026 (Linkorea)](https://linkoreamarketing.com/seo-korea-guide-2026/)
- [Naver SEO Guide 2025 (InterAd)](https://www.interad.com/en/insights/naver-seo-guide)
- [Top 9 RPA Use Cases in Finance 2026](https://research.aimultiple.com/rpa-finance/)
- [마켓플레이스 UX Best Practices (Qubstudio)](https://qubstudio.com/blog/marketplace-ui-ux-design-best-practices-and-features/)
- [n8n 서브워크플로우 번들링 토론](https://community.n8n.io/t/template-bundles-exporting-and-importing-workflows-subworkflows/137936)
- [Ollama VRAM Requirements Guide](https://localllm.in/blog/ollama-vram-requirements-for-local-llms)

### 3차 소스 (LOW 신뢰도)
- [n8n to React Flow 변환 예시 (GitHub)](https://github.com/reddisanjeevkumar/English-Workflow-to-n8n-JSON-Visual-Editor)
- [10 Monetizable n8n Templates (Medium)](https://medium.com/@Modexa/10-monetizable-n8n-templates-you-can-sell-748ae4b8f122)

---
*리서치 완료: 2026-03-09*
*로드맵 준비: 완료*
