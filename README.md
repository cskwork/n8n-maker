# n8n 워크플로우 템플릿 마켓플레이스

> 비개발자를 위한 한국어 n8n 자동화 워크플로우 템플릿 마켓플레이스

**[사이트 바로가기 →](https://cskwork.github.io/n8n-maker/)**

## 소개

n8n 워크플로우 템플릿을 업종별로 탐색하고, 인터랙티브 다이어그램으로 확인한 후, JSON 파일을 바로 다운로드하여 n8n에 import할 수 있는 마켓플레이스입니다.

**타겟 사용자:** 금융권 사무직, 마케터, HR 담당자, IT 운영자, 소상공인

## 주요 기능

- **업종별 카탈로그** — 금융, 마케팅, HR, IT/DevOps 4개 카테고리
- **인터랙티브 다이어그램** — n8n-demo-component로 워크플로우 시각화
- **18개 실제 워크플로우** — 즉시 n8n에 import 가능한 JSON 템플릿
- **한국 서비스 연동** — 카카오톡, 네이버, 사람인, DART API 가이드 포함
- **무료 + 프리미엄** — 무료 템플릿 즉시 다운로드, 프리미엄은 문의

## 포함 템플릿

| 카테고리 | 템플릿 수 | 예시 |
|----------|-----------|------|
| 금융 | 5개 | DART 전자공시 모니터링, 주가 알림, AI 인보이스 처리 |
| 마케팅 | 5개 | 카카오톡 알림, SNS 크로스 포스팅, 경쟁사 모니터링 |
| HR | 5개 | 채용공고 자동 수집, AI 자소서 생성, 온보딩 자동화 |
| IT/DevOps | 3개 | 서버 헬스 모니터링, Slack-Notion 동기화, AI 이메일 분류 |

## 기술 스택

- **프레임워크:** [Astro](https://astro.build/) 5
- **스타일링:** [Tailwind CSS](https://tailwindcss.com/) 4
- **콘텐츠:** MDX + Content Collections (Zod 스키마 검증)
- **다이어그램:** n8n-demo-component (CDN) + 정적 폴백
- **배포:** GitHub Pages + GitHub Actions
- **SEO:** OG 메타태그, JSON-LD, sitemap.xml 자동생성

## 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

## 프로젝트 구조

```
src/
├── content/templates/    # MDX 템플릿 (18개)
├── components/           # Astro 컴포넌트
├── layouts/              # BaseLayout (OG/SEO 포함)
├── pages/
│   ├── category/[slug]   # 업종별 카테고리 페이지
│   ├── template/[...id]  # 템플릿 상세 페이지
│   ├── solutions/        # SEO 키워드 랜딩 페이지
│   └── pricing.astro     # 가격 안내
public/
└── workflows/            # n8n 워크플로우 JSON 파일
```

## 라이선스

MIT
