# Phase 4: 콘텐츠 제작 - Research

**Researched:** 2026-03-09
**Domain:** n8n 워크플로우 템플릿 제작 (JSON + MDX + 한국 API 가이드)
**Confidence:** HIGH

## Summary

Phase 4는 사이트의 핵심 가치인 "실제 동작하는 n8n 워크플로우 템플릿"을 4개 업종(금융, 한국 서비스, 마케팅, HR/IT)에 걸쳐 15-20개 제작하고, 한국 서비스 API 설정 가이드를 작성하는 콘텐츠 집중 단계이다. Phase 1-3에서 구축한 Astro + Content Collections 인프라, 카탈로그 UI, 상세 페이지 렌더링 파이프라인을 그대로 활용하여 콘텐츠만 추가하면 된다.

각 템플릿은 (1) MDX 프론트매터 메타데이터, (2) MDX 본문(설명 + 설정 가이드), (3) 유효한 n8n 워크플로우 JSON 파일의 3가지 산출물로 구성된다. 기존 3개 샘플 템플릿(ai-email-classifier, job-auto-collect, dart-disclosure-monitor)의 패턴을 정확히 따르면서, 카테고리별 무료/프리미엄 분배를 균형 있게 유지해야 한다.

**Primary recommendation:** 기존 MDX + JSON 패턴을 엄격히 따라 카테고리별 4-5개씩 템플릿을 제작하고, API 설정 가이드는 별도 MDX 페이지가 아닌 각 템플릿의 MDX 본문 내 "설정 가이드" 섹션으로 통합한다.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CONT-01 | 금융 자동화 템플릿 4-5개 (DART 공시, 주가 모니터링, 인보이스 처리 등) | 기존 DART 템플릿 패턴 + KIS API/공공데이터포털 주가 API + 인보이스 처리 패턴 리서치 완료 |
| CONT-02 | 한국 서비스 연동 템플릿 4-5개 (카카오톡, 네이버, 사람인, DART) | 카카오 나에게 보내기 API, 네이버 검색 API, 사람인 API 엔드포인트 및 인증 방식 검증 완료 |
| CONT-03 | 마케팅 자동화 템플릿 3-4개 | SNS 자동 포스팅, AI 콘텐츠 생성, 경쟁사 모니터링 패턴 리서치 완료 |
| CONT-04 | HR/IT 자동화 템플릿 3-4개 | AI 이메일 분류(기존), 채용공고 수집(기존), 서버 모니터링, 업무 보고 자동화 패턴 확인 |
| CONT-05 | 각 템플릿에 유효한 n8n 워크플로우 JSON 포함 | n8n import JSON 구조 요구사항 검증 완료 (nodes, connections, settings 필수) |
| CONT-06 | 한국 서비스 API 설정 가이드 (카카오톡, 네이버, 사람인, DART) | 각 API의 인증 방식, 엔드포인트, 제한사항 리서치 완료 |
</phase_requirements>

## Standard Stack

### Core (이미 설치됨 - Phase 1-3에서 구축)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | 5.x | 정적 사이트 프레임워크 | Content Collections으로 MDX 템플릿 관리 |
| @astrojs/mdx | 4.x | MDX 렌더링 | 마크다운 + 컴포넌트 혼용 |
| Zod | (astro 내장) | 스키마 검증 | content.config.ts에서 프론트매터 타입 검증 |
| Tailwind CSS | 4.x | 스타일링 | 반응형 UI |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| n/a (추가 설치 없음) | - | - | Phase 4는 순수 콘텐츠 제작이므로 새 패키지 불필요 |

**Installation:** 추가 설치 없음. 기존 인프라 활용.

## Architecture Patterns

### 콘텐츠 파일 구조

```
src/content/templates/
├── ai-email-classifier.mdx      # (기존) IT - 무료
├── job-auto-collect.mdx          # (기존) HR - 무료
├── dart-disclosure-monitor.mdx   # (기존) 금융 - 프리미엄
├── stock-price-monitor.mdx       # [신규] 금융 - 무료
├── invoice-auto-process.mdx      # [신규] 금융 - 프리미엄
├── financial-news-summary.mdx    # [신규] 금융 - 무료
├── expense-report-auto.mdx       # [신규] 금융 - 프리미엄
├── kakao-schedule-notify.mdx     # [신규] 한국서비스(마케팅) - 무료
├── naver-news-monitor.mdx        # [신규] 한국서비스(IT) - 무료
├── naver-blog-auto-post.mdx      # [신규] 한국서비스(마케팅) - 프리미엄
├── saramin-ai-resume.mdx         # [신규] 한국서비스(HR) - 프리미엄
├── sns-cross-posting.mdx         # [신규] 마케팅 - 무료
├── ai-content-pipeline.mdx       # [신규] 마케팅 - 프리미엄
├── competitor-monitor.mdx        # [신규] 마케팅 - 무료
├── daily-work-report.mdx         # [신규] HR - 무료
├── onboarding-automation.mdx     # [신규] HR - 프리미엄
├── server-health-monitor.mdx     # [신규] IT - 무료
└── slack-notion-task-sync.mdx    # [신규] IT - 프리미엄

public/workflows/
├── ai-email-classifier.json      # (기존)
├── job-auto-collect.json          # (기존)
├── dart-disclosure-monitor.json   # (기존)
├── stock-price-monitor.json       # [신규]
├── invoice-auto-process.json      # [신규]
├── financial-news-summary.json    # [신규]
├── expense-report-auto.json       # [신규]
├── kakao-schedule-notify.json     # [신규]
├── naver-news-monitor.json        # [신규]
├── naver-blog-auto-post.json      # [신규]
├── saramin-ai-resume.json         # [신규]
├── sns-cross-posting.json         # [신규]
├── ai-content-pipeline.json       # [신규]
├── competitor-monitor.json        # [신규]
├── daily-work-report.json         # [신규]
├── onboarding-automation.json     # [신규]
├── server-health-monitor.json     # [신규]
└── slack-notion-task-sync.json    # [신규]
```

### Pattern 1: MDX 프론트매터 스키마 (기존 패턴 준수)

**What:** 모든 템플릿 MDX는 content.config.ts Zod 스키마를 정확히 따라야 한다
**When to use:** 모든 신규 템플릿 MDX 생성 시

```typescript
// src/content.config.ts 스키마 — 이미 정의됨, 변경 금지
z.object({
  title: z.string(),
  description: z.string(),
  category: z.enum(['finance', 'marketing', 'hr', 'it']),
  useCase: z.string(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  pricing: z.enum(['free', 'premium']),
  estimatedMinutes: z.number().positive(),
  credentials: z.array(z.string()),
  tags: z.array(z.string()).default([]),
  workflowJsonPath: z.string(),
  nodeCount: z.number().optional(),
  price: z.number().optional(),           // premium일 때만
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
})
```

**핵심 주의사항:**
- `category`는 반드시 `'finance' | 'marketing' | 'hr' | 'it'` 4가지 중 하나
- 한국 서비스 템플릿은 별도 카테고리가 아닌 **기존 4개 카테고리에 분산 배치** (tags로 '한국서비스' 표시)
- `workflowJsonPath`는 `/workflows/파일명.json` 형식 (public/ 하위)
- `pricing: 'premium'`이면 반드시 `price` 필드 포함

### Pattern 2: MDX 본문 구조 (기존 패턴 분석 결과)

**What:** MDX 본문은 일관된 섹션 구조를 따라야 한다

```markdown
---
(프론트매터)
---

## 이 워크플로우는

(1-2 문단: 무엇을 하는지, 누구에게 유용한지 설명)

## 설정 가이드

### Step 1: 크레덴셜 발급
(API 키 발급 방법, 필요한 서비스 가입)

### Step 2: n8n 설정
(JSON import 후 크레덴셜 설정, 파라미터 수정)

### Step 3: 활성화
(테스트 및 활성화 방법)
```

**When to use:** 모든 신규 템플릿. 특히 한국 서비스 연동 템플릿은 "설정 가이드" 섹션이 CONT-06 API 가이드 역할을 겸한다.

### Pattern 3: n8n 워크플로우 JSON 구조 (import 호환)

**What:** n8n에 import 가능한 유효한 JSON 형식
**When to use:** 모든 workflow JSON 파일

```json
{
  "name": "워크플로우 한글 이름",
  "nodes": [
    {
      "parameters": { /* 노드 설정 */ },
      "id": "고유-id-문자열",
      "name": "한글 노드 이름",
      "type": "n8n-nodes-base.nodeType",
      "typeVersion": 4.2,
      "position": [250, 300],
      "credentials": {
        "credentialType": {
          "id": "placeholder-credential-id",
          "name": "크레덴셜 이름"
        }
      }
    }
  ],
  "connections": {
    "소스 노드 이름": {
      "main": [
        [
          { "node": "타겟 노드 이름", "type": "main", "index": 0 }
        ]
      ]
    }
  },
  "settings": {
    "executionOrder": "v1",
    "saveManualExecutions": true,
    "callerPolicy": "workflowsFromSameOwner",
    "errorWorkflow": "",
    "timezone": "Asia/Seoul",
    "saveExecutionProgress": true,
    "saveDataSuccessExecution": "all",
    "saveDataErrorExecution": "all"
  },
  "staticData": null,
  "tags": [],
  "triggerCount": 1,
  "updatedAt": "2026-03-09T00:00:00.000Z",
  "versionId": "1"
}
```

**필수 규칙:**
1. `nodes` 배열: 각 노드에 고유 `id`, `name`, `type`, `typeVersion`, `position` 필수
2. `connections`: 소스 노드의 `name`을 키로 사용 (id가 아님!)
3. `settings.timezone`: 반드시 `"Asia/Seoul"`
4. 노드 이름은 반드시 **한글** (예: "데이터 가져오기", "AI 분석")
5. 크레덴셜은 `placeholder` ID 사용 (사용자가 자기 크레덴셜로 교체)
6. position: 시작 [250, 300], 수평 간격 200px, 분기 시 수직 100px

### Anti-Patterns to Avoid

- **카테고리 불균형:** 한 카테고리에 템플릿 편중 금지. finance 4-5, marketing 3-4, hr 3-4, it 3-4 균형 유지
- **JSON과 MDX 불일치:** workflowJsonPath가 가리키는 JSON 파일이 실제로 존재하지 않으면 다운로드 실패
- **크레덴셜 하드코딩:** 실제 API 키나 토큰을 JSON에 포함하면 안됨. 반드시 `$env.변수명` 또는 `placeholder` 사용
- **과도한 노드 수:** 10-15개 이하 유지. 복잡한 로직은 Code 노드로 통합
- **connections 키 오류:** connections 객체의 키는 노드의 `name` 필드와 정확히 일치해야 함 (대소문자, 공백 포함)

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| JSON 유효성 검증 | 수동 JSON 눈대중 확인 | `npm run build`로 Astro Content Collections 빌드 검증 | Zod 스키마가 프론트매터 자동 검증, 빌드 실패로 오류 즉시 발견 |
| 워크플로우 시각화 | 별도 다이어그램 제작 | 기존 WorkflowDiagram + DiagramFallback 컴포넌트 | Phase 3에서 이미 n8n-demo CDN + 정적 폴백 구현 완료 |
| API 설정 가이드 페이지 | 별도 /guide/* 라우트 | MDX 본문 내 "설정 가이드" 섹션 | 템플릿 상세 페이지에 이미 MDX 렌더링 파이프라인 존재 |

## Common Pitfalls

### Pitfall 1: connections 키와 노드 이름 불일치
**What goes wrong:** n8n import 시 노드가 연결되지 않거나 에러 발생
**Why it happens:** connections 객체의 키는 노드의 `name` 값과 정확히 일치해야 하는데, 오타가 나거나 name 변경 후 connections 업데이트를 잊음
**How to avoid:** 각 JSON 작성 후, connections의 모든 키와 `"node": "..."` 값이 nodes 배열의 name과 정확히 일치하는지 반드시 확인
**Warning signs:** n8n import 후 노드가 떠있지만 선으로 연결되지 않음

### Pitfall 2: typeVersion 불일치
**What goes wrong:** n8n이 노드를 인식하지 못하거나 deprecated 경고
**Why it happens:** 같은 노드 타입이라도 버전에 따라 parameters 구조가 다름
**How to avoid:** 기존 3개 JSON 파일의 typeVersion을 기준으로 통일 (httpRequest: 4.2, scheduleTrigger: 1.2, code: 2, slack: 2.2, googleSheets: 4.4~4.5)
**Warning signs:** import 후 노드에 빨간 경고 표시

### Pitfall 3: 프론트매터 category 값 오류
**What goes wrong:** 빌드 실패 또는 카테고리 페이지에 미표시
**Why it happens:** category 값이 Zod enum에 없는 값 (예: 'korean' 대신 'finance' 등 사용 필요)
**How to avoid:** category는 반드시 `finance | marketing | hr | it` 중 하나. 한국 서비스 템플릿은 tags에 '한국서비스' 추가
**Warning signs:** `npm run build` 시 Zod validation error

### Pitfall 4: 무료/프리미엄 분배 불균형
**What goes wrong:** 무료 템플릿이 너무 적으면 사이트 가치 하락, 너무 많으면 수익 모델 무의미
**Why it happens:** 콘텐츠 제작에 집중하다 보면 pricing 분배를 놓침
**How to avoid:** 카테고리당 무료 2-3개, 프리미엄 1-2개 유지 (BIZ-01 요구사항)
**Warning signs:** 특정 카테고리에 무료 0개 또는 프리미엄 0개

### Pitfall 5: 한국 API 엔드포인트 오류
**What goes wrong:** 워크플로우 실행 시 API 호출 실패
**Why it happens:** 잘못된 URL, 인증 헤더 누락, 파라미터명 오타
**How to avoid:** 공식 API 문서 기반으로 검증된 엔드포인트만 사용 (아래 API 레퍼런스 섹션 참고)
**Warning signs:** HTTP 401/403/404 에러

## 한국 서비스 API 레퍼런스 (CONT-06 지원)

### DART 전자공시 API
| 항목 | 값 |
|------|-----|
| 공식 URL | https://opendart.fss.or.kr |
| 인증 | API Key (query parameter: `crtfc_key`) |
| 주요 엔드포인트 | `https://opendart.fss.or.kr/api/list.json` (공시 목록), `https://opendart.fss.or.kr/api/company.json` (기업 정보) |
| 발급 | 회원가입 후 인증키 신청 (1-2일 소요) |
| 제한 | 일 10,000회 |
| Confidence | HIGH (기존 템플릿에서 검증됨) |

### 사람인 채용공고 API
| 항목 | 값 |
|------|-----|
| 공식 URL | https://oapi.saramin.co.kr |
| 인증 | API Key (query parameter: `access-key`) |
| 주요 엔드포인트 | `https://oapi.saramin.co.kr/job-search` |
| 발급 | 이용 신청 후 승인 필요 |
| 제한 | 일 500회 |
| Confidence | HIGH (기존 템플릿에서 검증됨) |

### 네이버 검색 API (뉴스, 블로그)
| 항목 | 값 |
|------|-----|
| 공식 URL | https://developers.naver.com |
| 인증 | HTTP Header (`X-Naver-Client-Id`, `X-Naver-Client-Secret`) |
| 주요 엔드포인트 | `https://openapi.naver.com/v1/search/news.json`, `https://openapi.naver.com/v1/search/blog.json` |
| 발급 | 네이버 개발자센터 앱 등록 (즉시) |
| 제한 | 일 25,000회 |
| Confidence | HIGH (CLAUDE.md에 패턴 존재, 공식 문서 검증) |

### 카카오톡 나에게 보내기 API
| 항목 | 값 |
|------|-----|
| 공식 URL | https://developers.kakao.com |
| 인증 | OAuth 2.0 (Bearer token in Authorization header) |
| 주요 엔드포인트 | `https://kapi.kakao.com/v2/api/talk/memo/default/send` |
| 발급 | 카카오 개발자 계정 + 앱 등록 + REST API 키 |
| 제한 | "나에게 보내기"만 가능 (타인 발송은 알림톡 승인 필요), 본인 인증 필수 |
| Confidence | MEDIUM (REST API 존재 확인, 토큰 갱신 로직 주의 필요) |

### 주가 조회 (공공데이터포털)
| 항목 | 값 |
|------|-----|
| 공식 URL | https://www.data.go.kr |
| 인증 | API Key (query parameter: `serviceKey`) |
| 주요 엔드포인트 | 금융위원회 주식시세정보 API |
| 발급 | 공공데이터포털 회원가입 후 활용 신청 (자동 승인) |
| 제한 | 일 1,000회 |
| Confidence | MEDIUM (공공데이터포털 API 존재 확인, 실시간성은 제한적 — 전일 종가 기준) |

**대안:** 한국투자증권 KIS Developers API (https://apiportal.koreainvestment.com) — 실시간 시세 가능하나 증권 계좌 필요. 비개발자 타겟에는 공공데이터포털이 진입장벽 낮음.

## 카테고리별 템플릿 계획

### 금융 (finance) - 4-5개 (CONT-01)

| 템플릿명 | 난이도 | 가격 | 핵심 노드 | 상태 |
|----------|--------|------|-----------|------|
| DART 전자공시 모니터링 | intermediate | premium | scheduleTrigger + httpRequest + code + if + slack | 기존 |
| 주가 모니터링 알리미 | beginner | free | scheduleTrigger + httpRequest + code + if + slack | 신규 |
| AI 인보이스 자동 처리 | advanced | premium | emailReadImap + code + openAi + googleSheets + slack | 신규 |
| 금융 뉴스 AI 요약 | intermediate | free | scheduleTrigger + httpRequest + openAi + slack | 신규 |
| 경비 보고서 자동화 | intermediate | premium | webhook + googleSheets + code + gmail | 신규 (선택) |

### 한국 서비스 연동 (기존 카테고리에 분산) - 4-5개 (CONT-02)

| 템플릿명 | 카테고리 | 난이도 | 가격 | 핵심 노드 |
|----------|---------|--------|------|-----------|
| 카카오톡 일정 알림 | marketing | beginner | free | scheduleTrigger + googleCalendar + code + httpRequest(카카오) |
| 네이버 뉴스 모니터링 | it | beginner | free | scheduleTrigger + httpRequest(네이버) + code + slack |
| 네이버 블로그 AI 자동 포스팅 | marketing | advanced | premium | scheduleTrigger + openAi + httpRequest(네이버) |
| 사람인 AI 자기소개서 생성 | hr | advanced | premium | httpRequest(사람인) + openAi + code + googleSheets |

**참고:** 기존 DART 모니터링(finance)과 채용공고 수집(hr)도 한국 서비스 템플릿에 해당하므로, 신규 4개 + 기존 2개 = 총 6개 한국 서비스 커버.

### 마케팅 (marketing) - 3-4개 (CONT-03)

| 템플릿명 | 난이도 | 가격 | 핵심 노드 |
|----------|--------|------|-----------|
| SNS 크로스 포스팅 | beginner | free | scheduleTrigger + googleSheets + httpRequest(다중) |
| AI 콘텐츠 생성 파이프라인 | intermediate | premium | webhook + openAi + code + notion |
| 경쟁사 뉴스 모니터링 | intermediate | free | scheduleTrigger + httpRequest + openAi + slack |

**참고:** 카카오톡 일정 알림, 네이버 블로그 AI 포스팅도 marketing 카테고리에 속하므로 총 5개.

### HR/IT (hr + it) - 3-4개 (CONT-04)

| 템플릿명 | 카테고리 | 난이도 | 가격 | 핵심 노드 |
|----------|---------|--------|------|-----------|
| 일일 업무 보고 자동화 | hr | intermediate | free | scheduleTrigger + slack + openAi + notion |
| 온보딩 자동화 | hr | intermediate | premium | webhook + gmail + slack + googleSheets |
| 서버 헬스 모니터링 | it | beginner | free | scheduleTrigger + httpRequest + if + slack |
| Slack-Notion 할일 동기화 | it | intermediate | premium | webhook + slack + notion + code |

**참고:** 기존 AI 이메일 분류기(it, free), 채용공고 수집(hr, free)이 이미 존재.

### 총 분배 요약

| 카테고리 | 기존 | 신규 | 총계 | 무료 | 프리미엄 |
|---------|------|------|------|------|---------|
| finance | 1 | 3-4 | 4-5 | 2 | 2-3 |
| marketing | 0 | 3-5 | 3-5 | 2-3 | 1-2 |
| hr | 1 | 2-3 | 3-4 | 2 | 1-2 |
| it | 1 | 2-3 | 3-4 | 2 | 1-2 |
| **합계** | **3** | **12-15** | **15-18** | **8-9** | **5-9** |

## Code Examples

### 예시 1: MDX 프론트매터 (금융 무료 템플릿)

```yaml
---
title: "주가 모니터링 알리미"
description: "관심 종목의 주가를 매일 자동으로 조회하여 목표가 도달 시 Slack으로 알림을 보냅니다"
category: "finance"
useCase: "모니터링"
difficulty: "beginner"
pricing: "free"
estimatedMinutes: 15
credentials:
  - "공공데이터포털 API Key"
  - "Slack OAuth"
tags:
  - "주식"
  - "금융"
  - "모니터링"
workflowJsonPath: "/workflows/stock-price-monitor.json"
nodeCount: 5
publishedAt: 2026-03-09
---
```

### 예시 2: n8n 워크플로우 JSON 스켈레톤 (한국 API 패턴)

```json
{
  "name": "네이버 뉴스 모니터링",
  "nodes": [
    {
      "parameters": {
        "rule": {
          "interval": [{
            "field": "cronExpression",
            "expression": "0 9,13,18 * * 1-5"
          }]
        }
      },
      "id": "naver-schedule",
      "name": "업무시간 뉴스 체크",
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1.2,
      "position": [250, 300]
    },
    {
      "parameters": {
        "method": "GET",
        "url": "https://openapi.naver.com/v1/search/news.json",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            { "name": "X-Naver-Client-Id", "value": "={{ $env.NAVER_CLIENT_ID }}" },
            { "name": "X-Naver-Client-Secret", "value": "={{ $env.NAVER_CLIENT_SECRET }}" }
          ]
        },
        "sendQuery": true,
        "queryParameters": {
          "parameters": [
            { "name": "query", "value": "n8n 자동화" },
            { "name": "display", "value": "10" },
            { "name": "sort", "value": "date" }
          ]
        },
        "options": {}
      },
      "id": "naver-api",
      "name": "네이버 뉴스 검색",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [450, 300]
    }
  ],
  "connections": {
    "업무시간 뉴스 체크": {
      "main": [[{ "node": "네이버 뉴스 검색", "type": "main", "index": 0 }]]
    }
  },
  "settings": {
    "executionOrder": "v1",
    "saveManualExecutions": true,
    "callerPolicy": "workflowsFromSameOwner",
    "timezone": "Asia/Seoul",
    "saveExecutionProgress": true,
    "saveDataSuccessExecution": "all",
    "saveDataErrorExecution": "all"
  },
  "staticData": null,
  "tags": [],
  "triggerCount": 1,
  "updatedAt": "2026-03-09T00:00:00.000Z",
  "versionId": "1"
}
```

### 예시 3: 카카오톡 나에게 보내기 노드 패턴

```json
{
  "parameters": {
    "method": "POST",
    "url": "https://kapi.kakao.com/v2/api/talk/memo/default/send",
    "sendHeaders": true,
    "headerParameters": {
      "parameters": [{
        "name": "Authorization",
        "value": "Bearer {{ $env.KAKAO_ACCESS_TOKEN }}"
      }]
    },
    "sendBody": true,
    "contentType": "form-urlencoded",
    "bodyParameters": {
      "parameters": [{
        "name": "template_object",
        "value": "={{ JSON.stringify({ object_type: 'text', text: $json.message, link: { web_url: 'https://example.com' }, button_title: '자세히 보기' }) }}"
      }]
    },
    "options": {}
  },
  "id": "kakao-send",
  "name": "카카오톡 나에게 보내기",
  "type": "n8n-nodes-base.httpRequest",
  "typeVersion": 4.2,
  "position": [650, 300]
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| n8n httpRequest v3 | httpRequest v4.2 | n8n 1.0+ (2023) | body/header 파라미터 구조 변경 |
| OpenAI node (기본) | @n8n/n8n-nodes-langchain.openAi v1.3-1.4 | 2024 | LangChain 통합 노드로 전환 |
| scheduleTrigger v1.0 | scheduleTrigger v1.2 | n8n 1.x | cron expression 지원 개선 |
| googleSheets v3 | googleSheets v4.4-4.5 | 2024 | OAuth 설정/column mapping 변경 |

**주의:** 기존 3개 JSON에서 사용 중인 typeVersion을 기준점으로 삼아 신규 JSON도 동일 버전 사용.

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Astro Build (npm run build) |
| Config file | astro.config.mjs |
| Quick run command | `npm run build` |
| Full suite command | `npm run build && npm run preview` |

### Phase Requirements -> Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CONT-01 | 금융 템플릿 4-5개가 finance 카테고리에 표시 | smoke | `npm run build` (Zod 검증) + 브라우저 카테고리 페이지 확인 | 빌드 성공 시 자동 검증 |
| CONT-02 | 한국 서비스 템플릿 4-5개 상세 페이지 표시 | smoke | `npm run build` + 브라우저 확인 | 빌드 성공 시 자동 검증 |
| CONT-03 | 마케팅 템플릿 3-4개 marketing 카테고리 배치 | smoke | `npm run build` | 빌드 성공 시 자동 검증 |
| CONT-04 | HR/IT 템플릿 3-4개 각 카테고리 배치 | smoke | `npm run build` | 빌드 성공 시 자동 검증 |
| CONT-05 | 모든 JSON이 n8n import 가능 형식 | manual + smoke | JSON lint + `npm run build` (workflowJsonPath 참조 확인) | 수동 검증 필요 |
| CONT-06 | 4개 한국 API 설정 가이드 한글 제공 | manual | 각 MDX 파일의 "설정 가이드" 섹션 존재 확인 | 수동 검증 |

### Sampling Rate

- **Per task commit:** `npm run build` (Astro Content Collections Zod 검증)
- **Per wave merge:** `npm run build && npm run preview` + 브라우저 시각 검증
- **Phase gate:** 전체 빌드 성공 + 카테고리별 템플릿 수 확인 + JSON 다운로드 테스트

### Wave 0 Gaps

None -- 기존 테스트 인프라(Astro build + Content Collections Zod 검증)가 Phase 4 요구사항을 커버. 추가 테스트 프레임워크 불필요.

## Open Questions

1. **카카오톡 OAuth 토큰 갱신 복잡성**
   - What we know: 카카오 REST API는 OAuth 2.0 인증이 필요하고, access token 유효기간이 제한적
   - What's unclear: n8n 환경에서 토큰 자동 갱신 로직 없이 `$env.KAKAO_ACCESS_TOKEN`만으로 안정적으로 동작하는지
   - Recommendation: 설정 가이드에서 "토큰 갱신이 필요하며, 장기 사용 시 Refresh Token 기반 갱신 워크플로우를 별도 구성하라"고 안내. 또는 카카오 워크 대신 Slack/Telegram으로 대체 알림 제안

2. **공공데이터포털 주식 API 실시간성**
   - What we know: 금융위원회 주식시세정보 API 존재. 전일 종가 기준 데이터 제공
   - What's unclear: 장중 실시간 시세 제공 여부 (대부분 전일 데이터)
   - Recommendation: "전일 대비 등락 모니터링" 시나리오로 설계하고, 실시간 요구 시 KIS API 안내를 가이드에 포함

## Sources

### Primary (HIGH confidence)
- 기존 프로젝트 코드: `src/content.config.ts`, 기존 3개 MDX/JSON 템플릿 분석
- CLAUDE.md: 프로젝트 지침, 노드 타입 레퍼런스, 한국 서비스 통합 패턴
- n8n-워크플로우-종합-리서치.md: 업종별 워크플로우 아이디어, 한국 서비스 연동 가이드

### Secondary (MEDIUM confidence)
- [DART OpenDART 시스템](https://opendart.fss.or.kr) - API 엔드포인트 및 인증 방식
- [사람인 API](https://oapi.saramin.co.kr) - 채용공고 검색 API 가이드
- [네이버 개발자센터](https://developers.naver.com) - 오픈 API 검색 서비스
- [카카오 Developers](https://developers.kakao.com/docs/latest/ko/kakaotalk-message/rest-api) - 카카오톡 메시지 REST API
- [n8n 공식 문서 - Import/Export](https://docs.n8n.io/workflows/export-import/) - 워크플로우 JSON 형식
- [n8n 커뮤니티 템플릿](https://n8n.io/workflows/) - 금융/마케팅 워크플로우 패턴 참고
- [공공데이터포털 주식시세정보](https://www.data.go.kr/data/15094808/openapi.do) - 주가 API
- [KIS Developers](https://apiportal.koreainvestment.com/intro) - 한국투자증권 오픈API

### Tertiary (LOW confidence)
- 카카오톡 토큰 갱신 메커니즘 — 공식 문서 확인했으나 n8n 환경에서의 자동 갱신 패턴은 검증 필요

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - 기존 프로젝트 코드에서 직접 분석, 변경 사항 없음
- Architecture: HIGH - 기존 MDX + JSON 패턴 100% 재사용, 3개 샘플에서 검증된 구조
- Pitfalls: HIGH - 기존 JSON 파일 분석으로 connections/typeVersion 패턴 확인
- 한국 API 레퍼런스: MEDIUM - 공식 문서 확인했으나 일부 API의 변경 가능성 존재

**Research date:** 2026-03-09
**Valid until:** 2026-04-09 (한국 API 엔드포인트는 안정적, n8n 노드 버전은 느리게 변동)
