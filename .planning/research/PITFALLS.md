# 도메인 함정(Pitfalls)

**도메인:** n8n 워크플로우 템플릿 마켓플레이스 (Astro + GitHub Pages, 한국 비개발자 대상)
**조사일:** 2026-03-09

---

## 치명적 함정 (Critical Pitfalls)

프로젝트를 재작업하거나 심각한 문제를 유발하는 실수들.

---

### Pitfall 1: n8n 워크플로우 JSON 버전 호환성 지뢰밭

**무엇이 잘못되는가:**
n8n 워크플로우 JSON에는 각 노드마다 `typeVersion` 필드가 있다. n8n은 빈번하게 메이저 업데이트(1.x → 2.0)를 하며, 노드 타입이 삭제/이름변경되고 파라미터 구조가 바뀐다. 템플릿을 특정 n8n 버전 기준으로 작성하면, 사용자의 n8n 인스턴스 버전과 맞지 않아 import 실패 또는 실행 오류가 발생한다.

**구체적 사례:**
- n8n v2.0에서 `Start` 노드 완전 삭제 → `Manual Trigger` 또는 `Execute Workflow Trigger`로 교체 필요
- `ExecuteCommand`, `LocalFileTrigger` 노드가 기본 비활성화
- Python Code 노드의 Pyodide 기반 구현이 제거되고 `pythonNative` 파라미터로 변경
- Code 노드에서 환경변수 접근(`process.env`)이 기본 차단
- OAuth 콜백 인증 방식 변경
- 커뮤니티 보고에 따르면, 공유된 워크플로우의 약 40%가 크레덴셜 미스매치 또는 버전 비호환으로 import 문제 발생

**왜 발생하는가:**
- n8n이 빠르게 발전하는 오픈소스라서 breaking change가 빈번
- 노드의 `typeVersion`이 워크플로우 JSON에 하드코딩됨
- 사용자마다 n8n 버전이 다름 (Cloud vs Self-hosted, 업데이트 시점 차이)

**결과:**
- "구매한 템플릿이 안 돌아간다" → 환불 요청, 신뢰도 하락
- 지속적인 템플릿 유지보수 부담
- 고객 지원 비용 증가

**예방 전략:**
1. 각 템플릿에 **호환 n8n 버전 범위** 명시 (예: "v1.80+ ~ v2.x 호환")
2. 가장 널리 사용되는 안정 버전(현재 v2.x) 기준으로 작성
3. 최신 `typeVersion` 사용 (사용자가 새 워크플로우 생성 시 n8n이 최신 버전을 로드하므로)
4. **deprecated 노드 사용 금지** — Start 노드, Pyodide Python 등 제거된 것들 절대 사용 안 함
5. 노드별 `typeVersion` 체크 스크립트 작성하여 빌드 시 자동 검증
6. 주요 n8n 릴리스마다 전체 템플릿 호환성 테스트 CI 구축

**감지 신호:**
- n8n 릴리스 노트에 "breaking change" 키워드 등장
- 커뮤니티에서 특정 노드 import 오류 보고 증가
- 템플릿 다운로드 후 문의 급증

**해당 Phase:** Phase 1 (템플릿 JSON 구조 설계 시점), Phase 3+ (유지보수 CI)

**신뢰도:** HIGH — n8n 공식 문서(v2.0 breaking changes)와 커뮤니티 보고에서 직접 확인

---

### Pitfall 2: 서브워크플로우 번들링 불가 — 복잡한 템플릿의 배포 벽

**무엇이 잘못되는가:**
n8n은 워크플로우를 개별 JSON으로 export한다. 그러나 고급 워크플로우는 서브워크플로우(Execute Workflow 노드)를 사용하는 경우가 많다. 메인 워크플로우만 제공하면 서브워크플로우 참조가 깨진다.

**왜 발생하는가:**
- n8n은 네이티브로 "워크플로우 번들" export를 지원하지 않음
- 서브워크플로우 참조는 워크플로우 ID(숫자)로 되어 있어, 다른 인스턴스에서 ID가 달라짐
- 커뮤니티에서 zip 기반 번들링 해결책이 나왔지만 공식 기능이 아님

**결과:**
- 복잡한 프리미엄 워크플로우를 판매할 수 없거나, 설치 과정이 너무 복잡해짐
- "10-15 노드 이내" 원칙을 지키려면 서브워크플로우가 필수인데, 배포가 어려움
- 고급 워크플로우일수록 가치가 높은데, 정작 가장 배포하기 어려움

**예방 전략:**
1. **프리미엄 워크플로우는 Self-contained(자기완결형)으로 설계** — 가능하면 서브워크플로우 없이 단일 JSON
2. 서브워크플로우가 필수인 경우, **설치 스크립트 + 메타데이터 파일** 제공 (Jim Le의 zip 번들 접근법 참고)
3. 각 서브워크플로우의 import 순서와 ID 매핑 가이드를 상세 문서로 제공
4. 장기적으로 n8n API를 활용한 **원클릭 설치 도구** 개발 고려

**감지 신호:**
- 워크플로우 설계 시 Execute Workflow 노드 사용 빈도 증가
- 설치 가이드가 3페이지 이상으로 길어질 때

**해당 Phase:** Phase 2 (프리미엄 템플릿 설계), Phase 4 (고급 워크플로우)

**신뢰도:** HIGH — n8n 커뮤니티 포럼에서 직접 확인된 문제

---

### Pitfall 3: 정적 사이트에서 마켓플레이스 핵심 기능 구현의 한계

**무엇이 잘못되는가:**
Astro + GitHub Pages는 순수 정적 사이트다. 마켓플레이스에 기대되는 핵심 기능들 — 검색, 필터링, 결제, 장바구니, 사용자 인증 — 은 모두 서버 사이드 로직이 필요하다. 이를 무시하고 "나중에 추가하지" 하면 아키텍처 재작업이 불가피하다.

**구체적 제약:**
- **GitHub Pages**: 최대 사이트 크기 1GB, 월 대역폭 100GB 소프트 리밋, 빌드 시간당 10회 제한
- **서버 사이드 코드 불가**: .htaccess, Nginx 설정, 서버 리다이렉트 불가능
- **SPA 라우팅 미지원**: GitHub Pages는 SPA 라우팅을 네이티브 지원하지 않음 (404.html 우회 필요)
- **동적 콘텐츠 불가**: 검색 결과 페이지네이션, 실시간 필터링 등 서버 의존 기능 불가

**왜 발생하는가:**
- "무료 인프라"라는 제약 조건과 "마켓플레이스"라는 프로덕트 유형의 본질적 충돌
- v1에서 결제/인증을 제외한 것은 올바른 판단이나, 검색/필터는 v1에서도 필수

**결과:**
- 검색/필터 없이 출시하면 사용자가 원하는 템플릿을 찾지 못함
- v2에서 결제 추가 시 아키텍처 전면 재설계 위험
- 대역폭 100GB 초과 시 GitHub이 사이트를 제한할 수 있음

**예방 전략:**
1. **클라이언트 사이드 검색 도입** — Pagefind(Rust/WASM 기반, 빌드 시 인덱스 생성, 초기 로드 없이 검색 가능) 또는 Fuse.js(경량 fuzzy search)
   - Pagefind 추천: 정적 사이트에 최적화, 인덱스 lazy-loading, 한국어 지원
   - Fuse.js는 소규모(100개 이하 템플릿)에서만 적합, 규모 커지면 성능 저하
2. **태그/카테고리 기반 정적 필터 페이지** — Astro 빌드 시 업종별/난이도별/가격별 사전 생성
3. **v2 결제 연동을 고려한 데이터 구조 선설계** — 템플릿 메타데이터에 가격, 라이선스 타입 등 필드를 처음부터 포함
4. **외부 서비스로 동적 기능 위임** — 결제(Gumroad, Lemon Squeezy), 폼(Google Forms), 댓글(utterances)

**감지 신호:**
- 템플릿 수 50개 이상인데 사용자가 특정 템플릿을 찾기 어렵다고 피드백
- GitHub Pages에서 대역폭 경고 이메일 수신
- 빌드 시간이 10분 이상으로 증가

**해당 Phase:** Phase 1 (아키텍처 설계), Phase 2 (검색/필터 구현)

**신뢰도:** HIGH — GitHub Pages 공식 문서, Pagefind/Fuse.js 기술 문서에서 확인

---

### Pitfall 4: 크레덴셜 정보 노출 — 템플릿 JSON의 보안 시한폭탄

**무엇이 잘못되는가:**
n8n 워크플로우 JSON을 export하면 크레덴셜 이름, ID, 타입이 포함된다. 더 위험한 것은 HTTP Request 노드에 cURL에서 복사한 API 키, 인증 토큰이 하드코딩되어 있을 수 있다는 점이다.

**구체적 위험:**
- 워크플로우 JSON 파일에 크레덴셜 **이름과 타입**이 포함됨 (ID는 숫자지만, 이름이 `john@gmail.com SMTP` 같은 식이면 개인정보 노출)
- HTTP Request 노드의 헤더에 `Authorization: Bearer sk-...` 같은 API 키가 직접 삽입될 수 있음
- Code 노드 내부에 하드코딩된 비밀 값 가능성

**왜 발생하는가:**
- 워크플로우 개발자가 테스트 과정에서 실제 API 키를 직접 넣는 습관
- n8n의 export가 크레덴셜 값 자체는 제외하지만, 메타데이터(이름, 타입)와 HTTP 노드 본문은 그대로 export
- 템플릿 수가 많아지면 일일이 수동 검토가 어려움

**결과:**
- API 키 유출 → 비용 청구, 보안 사고
- 개인정보 노출 → 법적 문제 (특히 한국 개인정보보호법)
- 마켓플레이스 신뢰도 치명적 타격

**예방 전략:**
1. **템플릿 제작 파이프라인에 자동 검증 스크립트** — JSON에서 API 키 패턴(`sk-`, `Bearer `, 이메일 주소 등) 자동 탐지
2. **크레덴셜 이름 규칙 강제** — `Gmail SMTP`, `OpenAI API` 같은 일반적 이름만 사용
3. **플레이스홀더 표준화** — `YOUR_API_KEY`, `YOUR_WEBHOOK_URL` 같은 명확한 플레이스홀더
4. **Sticky Note 노드로 설정 안내** — 각 크레덴셜 설정 단계를 워크플로우 내부에 문서화
5. **빌드 시 JSON sanitization 자동화** — CI에서 모든 템플릿 JSON을 스캔

**감지 신호:**
- 템플릿 JSON에 `@` 기호가 포함된 크레덴셜 이름
- HTTP Request 노드의 헤더/바디에 `sk-`, `Bearer`, `token=` 같은 패턴
- Code 노드에 하드코딩된 URL에 API 키 쿼리 파라미터

**해당 Phase:** Phase 1 (템플릿 제작 가이드라인), 전 Phase (CI 검증)

**신뢰도:** HIGH — n8n 공식 문서(Sharing) 및 보안 가이드에서 직접 경고

---

## 중요 함정 (Moderate Pitfalls)

프로젝트 진행을 지연시키거나 사용자 경험을 크게 저하시키는 실수들.

---

### Pitfall 5: 인터랙티브 다이어그램 렌더링 성능 함정

**무엇이 잘못되는가:**
n8n 워크플로우를 React Flow로 시각화할 때, 노드 수가 많아지면 불필요한 re-render로 인한 프레임 드롭이 발생한다. 특히 모바일에서 심각해진다.

**구체적 성능 함정:**
- 노드 이동 시 빈번한 state 업데이트 → 전체 트리 re-render
- `nodes` 또는 `edges` 배열을 컴포넌트에서 직접 접근하면 모든 변경에 re-render 발생
- 복잡한 CSS(그림자, 그라디언트, 애니메이션)가 노드 수에 비례해 성능 저하
- n8n 스타일의 커스텀 노드 컴포넌트가 매 렌더마다 새로 생성되는 문제

**왜 발생하는가:**
- React Flow의 기본 사용법만으로는 대규모 그래프에 부적합
- n8n 노드 디자인을 충실히 재현하려다 CSS 복잡도 증가
- "예쁘게 만들기"에 집중하다 성능 최적화를 후순위로 미룸

**예방 전략:**
1. **React.memo로 커스텀 노드/엣지 컴포넌트 래핑** — 또는 부모 컴포넌트 밖에서 선언
2. **useCallback/useMemo 적극 활용** — 이벤트 핸들러, 옵션 객체 등 안정적 참조 유지
3. **viewport 기반 가상화** — 화면에 보이는 노드만 렌더링
4. **노드 스타일 단순화** — box-shadow 대신 border, 애니메이션 최소화
5. **selector 패턴 사용** — 전체 nodes/edges 배열 대신 필요한 데이터만 구독
6. **대안 검토**: 정적 사이트이므로 React Flow 대신 **SVG 정적 렌더링** (빌드 시 n8n JSON → SVG 변환)이 더 적합할 수 있음. 인터랙션이 "클릭하면 노드 설명 보기" 수준이면 React Flow는 과도한 솔루션

**감지 신호:**
- 모바일에서 다이어그램 영역 스크롤 시 끊김
- 노드 15개 이상 워크플로우에서 FPS 저하
- Lighthouse Performance 점수 급락

**해당 Phase:** Phase 2 (다이어그램 컴포넌트 개발)

**신뢰도:** HIGH — React Flow 공식 문서(Performance 가이드)에서 직접 확인

---

### Pitfall 6: 한국 서비스 API의 숨겨진 제약 — 카카오톡, 네이버 연동의 현실

**무엇이 잘못되는가:**
한국 서비스 연동 워크플로우를 "쉽게 할 수 있다"고 홍보했는데, 실제로 사용자가 따라 해보면 API 신청 거절, 일일 호출 제한, 필수 인증 절차 등에 막혀 좌절한다.

**구체적 제약:**
- **카카오톡 메시지 API**: 일일 30,000건이지만, **발신자 1인당 100건, 수신자 1인당 100건, 발신-수신 쌍당 20건** 제한. 알림톡은 **템플릿 사전 승인** 필수 (승인에 수일 소요)
- **카카오 API 전체**: 월 3,000,000건 무료 쿼터 (초과 시 유료 전환 필요)
- **네이버 블로그 API**: 네이버 개발자센터 앱 등록 필수, 일부 API는 사업자 인증 필요
- **네이버 스마트스토어 API**: 판매자 계정 + 스토어 개설 필수, 일반 사용자 접근 불가
- **사람인 API**: 상대적으로 접근 쉬우나 API 키 발급 과정 존재
- **홈택스**: 공식 API 매우 제한적, 실질적 자동화 거의 불가능

**왜 발생하는가:**
- 한국 서비스들은 오픈 API 생태계가 글로벌 서비스 대비 폐쇄적
- API 문서가 영문으로도 제공되지만 최신 반영이 느리거나 누락 있음
- "기술적으로 가능하다"와 "비개발자가 실제로 할 수 있다"는 전혀 다른 문제

**결과:**
- "카카오톡 자동 알림" 템플릿을 구매했는데, 알림톡 템플릿 승인 과정에서 포기
- 사용자가 필요한 API 키를 발급받지 못해 워크플로우 사용 불가
- "쓸 수 없는 템플릿을 샀다"는 악평

**예방 전략:**
1. **각 템플릿에 "사전 준비 사항" 섹션 필수** — API 키 발급 방법, 예상 소요 시간, 필요 자격(사업자 등록 등) 명시
2. **난이도에 "API 접근 난이도" 별도 표기** — 기술적 난이도와 행정적 난이도 분리
3. **한국 서비스 제약 사항을 정직하게 공개** — 홈택스 연동은 "실질적 불가", 카카오톡은 "제한적" 등
4. **API 신청이 필요 없는 대안 제시** — 카카오톡 대신 텔레그램, 네이버 메일 대신 Gmail IMAP
5. **스크린샷 포함 한국어 API 키 발급 가이드** 별도 제작

**감지 신호:**
- 특정 한국 서비스 연동 템플릿에 대한 문의가 유독 많음
- "API 키를 어떻게 발급받나요?" 질문 반복
- 사용자 리뷰에서 "설정이 너무 복잡하다" 피드백

**해당 Phase:** Phase 2 (템플릿 상세 페이지), Phase 3 (한국 서비스 연동 카테고리)

**신뢰도:** HIGH — 카카오 공식 Quota 문서에서 직접 확인, 프로젝트 기존 리서치 문서와 일치

---

### Pitfall 7: 로컬 LLM(Ollama) 워크플로우의 하드웨어 장벽 과소평가

**무엇이 잘못되는가:**
"무료 AI"라는 매력적인 홍보로 로컬 LLM 워크플로우를 판매하지만, 실제 사용자의 PC에서 실행이 불가능하거나 극도로 느린 경우가 대부분이다.

**구체적 하드웨어 요구:**
- **VRAM이 핵심 병목** — VRAM은 "소프트 리밋"이 아니라 "하드 바운더리". 모델이 VRAM에 안 들어가면 5-20배 느려짐
- 7-8B 모델(Llama 3.1 8B 등): 최소 8-12GB VRAM 필요 → NVIDIA RTX 3060 12GB 이상
- 13-32B 모델: 16-24GB VRAM 필요 → RTX 4090 급
- **CPU 폴백**: GPU 없으면 CPU에서 실행 가능하지만, 응답 시간이 수십 초~수 분
- **AMD GPU**: Linux에서만 ROCm 지원, Windows는 불안정
- **저장 공간**: NVMe SSD 필수, HDD에서 실행 시 극도로 느림
- **KV 캐시 메모리**: 8B 모델 + 32K 컨텍스트 = KV 캐시만 약 4.5GB 추가

**n8n과의 호환 이슈:**
- Ollama 모델 노드는 **AI Agent 노드와 호환되지 않음** — Basic LLM Chain 노드만 가능
- n8n이 스트리밍을 네이티브 지원하지 않아 Response 노드에서 응답이 한번에 옴
- Docker 환경에서 `host.docker.internal` 설정이 Linux에서 자동 적용 안 됨
- 워크플로우가 간헐적으로 멈추는 현상 보고 (n8n 리로드로 해결)

**왜 발생하는가:**
- "Ollama = 무료 AI"라는 마케팅에 하드웨어 요구사항이 가려짐
- 타겟 사용자(비개발자)의 PC가 대부분 내장 그래픽 또는 저사양 GPU
- 한국 일반 사무직 PC: Intel 내장 그래픽 + 8-16GB RAM이 대부분

**예방 전략:**
1. **하드웨어 요구사항 명시 필수** — 각 로컬 LLM 템플릿에 최소/권장 사양 표기
2. **"PC 사양 확인기" 가이드** 제공 — 사용자가 자기 PC에서 실행 가능한지 사전 체크
3. **경량 모델 우선 추천** — phi-3 mini (3.8B), gemma-2 2B 등 4GB VRAM으로 가능한 모델
4. **클라우드 AI 대안 항상 병기** — "Ollama 불가 시 OpenAI API 사용 ($5/월)" 가이드
5. **"로컬 LLM 전용" 카테고리를 별도로** — 일반 워크플로우와 분리하여 기대값 관리
6. **AI Agent 노드 제한 사항 명시** — Ollama는 Agent 사용 불가, Chain만 가능하다고 문서화

**감지 신호:**
- "Ollama가 너무 느려요" 또는 "설치했는데 안 돼요" 문의
- 로컬 LLM 템플릿의 만족도가 클라우드 AI 템플릿 대비 현저히 낮음
- GPU 관련 에러 메시지 공유

**해당 Phase:** Phase 3 (로컬 LLM 카테고리), Phase 4 (고급 AI 워크플로우)

**신뢰도:** HIGH — Ollama 공식 GPU 문서, VRAM 가이드, n8n Ollama 노드 문서에서 직접 확인

---

### Pitfall 8: 한국어 기술 콘텐츠 SEO — 네이버와 구글, 두 마리 토끼의 함정

**무엇이 잘못되는가:**
Google SEO만 최적화하면 한국 사용자의 약 50%를 놓친다. 반대로 네이버만 최적화하면 글로벌 트래픽을 포기한다. 더 큰 문제는 네이버 SEO가 Google SEO와 근본적으로 다르다는 점이다.

**구체적 차이:**
- **네이버는 hreflang 미지원** — 대신 HTML meta language 태그와 한국어 전용 sitemap 사용
- **네이버는 자체 블로그/카페 콘텐츠를 우선 노출** — 외부 웹사이트는 상대적으로 불리
- **네이버는 신선도(recency) 중시** — 비활성 블로그/사이트는 빠르게 노출 하락
- **한국어 키워드는 영어 직역이 아님** — "워크플로우 자동화"와 "업무 자동화"는 검색량이 전혀 다름
- **모바일 우선 인덱싱** — 한국 사용자 대다수가 모바일에서 검색

**왜 발생하는가:**
- 개발자가 Google SEO에만 익숙하고 네이버 SEO를 모름
- 기술 콘텐츠 작성 시 영어 용어를 그대로 사용하여 검색 매칭 실패
- 정적 사이트 배포 후 콘텐츠 업데이트가 뜸해지면 네이버에서 순위 하락

**예방 전략:**
1. **듀얼 SEO 전략** — Google(sitemap.xml + 구조화 데이터) + 네이버(네이버 서치어드바이저 등록 + 한국어 sitemap)
2. **한국어 키워드 리서치** — 네이버 키워드 도구로 실제 한국 사용자 검색어 파악 ("n8n 자동화", "업무 자동화 도구", "노코드 자동화" 등)
3. **네이버 블로그 연동 전략** — 메인 사이트 외 네이버 블로그에 요약본/가이드 게시하여 네이버 검색 노출 확보
4. **정기 콘텐츠 업데이트 일정** 수립 — 최소 주 1회 새 콘텐츠 또는 기존 콘텐츠 업데이트
5. **meta language 태그 정확히 설정** — `<html lang="ko">` 필수
6. **모바일 반응형 완벽 지원** — 네이버 모바일 우선 인덱싱 대응

**감지 신호:**
- Google 유입은 있는데 네이버 유입이 거의 없음 (또는 반대)
- 네이버 서치어드바이저에서 크롤링 오류 발생
- 한국어 키워드 검색 시 경쟁 사이트가 상위에 노출

**해당 Phase:** Phase 1 (사이트 기초 설정), Phase 2 (콘텐츠 SEO), 전 Phase (지속적)

**신뢰도:** HIGH — Naver SEO 전문 가이드(Linkorea, InterAd), 한국 SEO 통계에서 확인

---

## 경미한 함정 (Minor Pitfalls)

간과하기 쉽지만 누적되면 사용자 경험을 해치는 실수들.

---

### Pitfall 9: 템플릿 문서화 품질 — "JSON만 주면 되겠지"의 오류

**무엇이 잘못되는가:**
워크플로우 JSON만 제공하고 충분한 문서화를 하지 않아, 비개발자 사용자가 import 후 설정을 완료하지 못한다.

**필수 문서화 항목 (누락 시 사용 불가):**
- 필요한 크레덴셜 목록 및 발급 방법 (스크린샷 포함)
- 환경변수 설정 가이드 (API URL, 키 등)
- 커스터마이징 포인트 (어떤 노드의 어떤 값을 바꿔야 하는지)
- 예상 실행 흐름과 데이터 흐름 설명
- 트러블슈팅 가이드 (자주 발생하는 오류와 해결 방법)

**예방 전략:**
1. **템플릿 문서화 체크리스트** 표준화 — 모든 템플릿이 동일한 문서 구조 따르기
2. **n8n Sticky Note 활용** — 워크플로우 내부에 설정 안내 삽입
3. **비개발자 베타 테스터** — 실제 타겟 사용자에게 문서만 보고 설치하게 하여 문서 품질 검증
4. **영상 가이드 병행** — 복잡한 크레덴셜 설정은 스크린 캡처 영상으로 보충

**해당 Phase:** Phase 2 (상세 페이지), 전 Phase (모든 템플릿)

**신뢰도:** MEDIUM — 커뮤니티 사례와 n8n 공식 best practice에서 추론

---

### Pitfall 10: 무료/프리미엄 모델의 가치 경계 모호

**무엇이 잘못되는가:**
무료 템플릿과 프리미엄 템플릿의 차이가 불명확하면, 유료 구매 동기가 없거나 반대로 무료 콘텐츠가 너무 빈약해 사이트 유입 자체가 줄어든다.

**예방 전략:**
1. **명확한 기준 수립**: 무료 = 초급 단일 서비스 연동 (5노드 이하), 프리미엄 = 복합 서비스 + AI + 에러핸들링 포함
2. **프리미엄 미리보기**: 워크플로우 다이어그램과 설명은 무료로 보여주고, JSON 다운로드만 유료
3. **무료 콘텐츠 품질 유지**: 무료 템플릿도 실용적으로 — "미끼용 쓸모없는 무료"가 아니라 "실제로 유용한 무료"

**해당 Phase:** Phase 1 (수익 모델 설계), Phase 2 (프리미엄 콘텐츠)

**신뢰도:** MEDIUM — SaaS/디지털 마켓플레이스 일반 패턴에서 추론

---

### Pitfall 11: Astro Islands 남용으로 번들 크기 폭발

**무엇이 잘못되는가:**
Astro의 Islands 아키텍처를 사용하여 React Flow 다이어그램을 각 템플릿 페이지마다 로드하면, JavaScript 번들이 커져서 정적 사이트의 핵심 장점(빠른 로드)을 잃는다.

**예방 전략:**
1. **다이어그램은 `client:visible`로 lazy-load** — 뷰포트에 진입할 때만 React Flow 로드
2. **React Flow 번들 코드 스플리팅** — 다이어그램 없는 목록 페이지에서는 React 자체를 로드하지 않기
3. **정적 SVG 프리뷰 → 클릭 시 인터랙티브** — 목록에서는 정적 이미지, 상세에서만 React Flow
4. **번들 사이즈 모니터링** — 빌드 시 JS 번들 크기 임계값 설정

**해당 Phase:** Phase 2 (다이어그램 구현)

**신뢰도:** MEDIUM — Astro 공식 문서 Islands 패턴에서 추론

---

## Phase별 함정 요약

| Phase 주제 | 예상 함정 | 대응 전략 |
|------------|----------|----------|
| **Phase 1: 사이트 기초 + 데이터 구조** | JSON 호환성(#1), 크레덴셜 노출(#4), 정적 사이트 한계(#3), SEO 기초(#8) | 버전 관리 체계, sanitization 스크립트, Pagefind 선택, 듀얼 SEO 설정 |
| **Phase 2: 템플릿 카탈로그 + 상세 페이지** | 다이어그램 성능(#5), 문서화 품질(#9), Islands 남용(#11), 수익 모델(#10) | React.memo 최적화, 문서 체크리스트, lazy-load 패턴 |
| **Phase 3: 한국 서비스 + 로컬 LLM** | API 제약(#6), 하드웨어 장벽(#7) | 사전 준비 가이드, 하드웨어 사양 체크기, 대안 경로 제시 |
| **Phase 4: 프리미엄 + 고급 워크플로우** | 서브워크플로우 번들링(#2), 복잡성 증가 | Self-contained 설계, 설치 스크립트 |
| **지속적 (전 Phase)** | n8n 버전 업데이트(#1), SEO 유지(#8), 보안 검증(#4) | CI 자동 검증, 콘텐츠 업데이트 일정, JSON 스캔 파이프라인 |

---

## 출처

### n8n 관련
- [n8n v2.0 Breaking Changes](https://docs.n8n.io/2-0-breaking-changes/) — HIGH 신뢰도
- [n8n Export/Import Guide](https://docs.n8n.io/workflows/export-import/) — HIGH 신뢰도
- [n8n Node Versioning](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-versioning/) — HIGH 신뢰도
- [n8n Sharing Best Practices](https://docs.n8n.io/workflows/sharing/) — HIGH 신뢰도
- [n8n Workflow Template Troubleshooting](https://latenode.com/blog/low-code-no-code-platforms/n8n-setup-workflows-self-hosting-templates/n8n-export-import-workflows-complete-json-guide-troubleshooting-common-failures-2025) — MEDIUM 신뢰도
- [n8n 서브워크플로우 번들링 토론](https://community.n8n.io/t/template-bundles-exporting-and-importing-workflows-subworkflows/137936) — MEDIUM 신뢰도
- [n8n v2.0 Migration Tool](https://docs.n8n.io/migration-tool-v2/) — HIGH 신뢰도

### React Flow
- [React Flow Performance Guide](https://reactflow.dev/learn/advanced-use/performance) — HIGH 신뢰도

### GitHub Pages
- [GitHub Pages Limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) — HIGH 신뢰도
- [GitHub Pages SPA Routing Discussion](https://github.com/orgs/community/discussions/64096) — HIGH 신뢰도

### 검색 솔루션
- [Pagefind + Astro 통합 가이드](https://syntackle.com/blog/pagefind-search-in-astro-site/) — MEDIUM 신뢰도
- [Astro Client-side Search 비교](https://evilmartians.com/chronicles/how-to-add-fast-client-side-search-to-astro-static-sites) — MEDIUM 신뢰도

### 한국 SEO
- [SEO Korea Guide 2026 (Linkorea)](https://linkoreamarketing.com/seo-korea-guide-2026/) — MEDIUM 신뢰도
- [Naver SEO Guide 2025 (InterAd)](https://www.interad.com/en/insights/naver-seo-guide) — MEDIUM 신뢰도

### 카카오/네이버 API
- [Kakao Developers Quota](https://developers.kakao.com/docs/latest/en/getting-started/quota) — HIGH 신뢰도

### Ollama / 로컬 LLM
- [Ollama VRAM Requirements Guide](https://localllm.in/blog/ollama-vram-requirements-for-local-llms) — MEDIUM 신뢰도
- [Ollama Hardware Guide](https://www.arsturn.com/blog/ollama-hardware-guide-what-you-need-to-run-llms-locally) — MEDIUM 신뢰도
- [Ollama Hardware Support (공식)](https://docs.ollama.com/gpu) — HIGH 신뢰도
- [n8n Ollama Chat Model Node Docs](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmollama/) — HIGH 신뢰도
