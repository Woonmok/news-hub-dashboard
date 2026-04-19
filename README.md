# Wave Tree News Hub

Wave Tree News Hub는 RSS 피드를 기반으로 여러 뉴스 소스를 한 화면에서 보고, 카테고리와 뉴스 소스별로 필터링하는 React 기반 뉴스 대시보드입니다.

## Stack

- Vite
- React
- TypeScript
- fast-xml-parser (RSS 파싱)
- CSS Grid & Flexbox

## Key Features

### 대시보드 섹션
- 메인 히어로 패널: 최신 Top Focus 기사와 활동 지표
- RSS 필터 패널: 카테고리별, 소스별 선택 가능한 토글 필터
- 주요 뉴스 카드: 실시간 RSS 기반 4개 헤드라인
- 지역별 시장 온도: 서울, 도쿄, 뉴욕 시장 인사이트
- 섹터 트렌드 신호: 반도체, 에너지, 플랫폼, 바이오 지표
- 에디터 배포 큐: 예정된 콘텐츠 일정

### RSS 통합
- **다중 피드 소스**: Hacker News, BBC Tech, BBC Business, TechCrunch
- **CORS 프록시**: allorigins.win 기반 브라우저 환경 호환성
- **카테고리 필터**: Tech, Business 등 동적 필터링
- **새로고침 버튼**: 수동 피드 동기화

## API Endpoints

RSS 소스는 `src/services/rssService.ts`에서 정의:
- Hacker News: `https://news.ycombinator.com/rss`
- BBC Tech: `https://feeds.bbc.co.uk/news/technology/rss.xml`
- BBC Business: `https://feeds.bbc.co.uk/news/business/rss.xml`
- TechCrunch: `https://techcrunch.com/feed/`

## Architecture

```
src/
├── App.tsx              # 메인 대시보드 컴포넌트
├── App.css              # 대시보드 스타일 (필터 UI 포함)
├── index.css            # 글로벌 스타일
├── hooks/
│   └── useRssNews.ts    # RSS 피드 상태 관리 훅
├── services/
│   └── rssService.ts    # RSS 파싱 및 데이터 페칭 로직
└── types/
    └── index.ts         # TypeScript 타입 정의
```

## Scripts

- `npm run dev` - 개발 서버 시작
- `npm run dev:stable` - 고정 포트(5173) 개발 서버 시작
- `npm run dev:restart` - 5173 포트 점유 프로세스 정리 후 개발 서버 재시작
- `npm run build` - 프로덕션 빌드
- `npm run preview` - 빌드된 앱 미리보기
- `npm run preview:stable` - 고정 포트(4173) 미리보기 서버 시작

## Installation

```bash
npm install
npm run dev:stable
```

브라우저에서 `http://localhost:5173` 접속

다른 기기에서 접속할 때는 맥미니의 LAN IP를 사용:

```bash
http://192.168.100.2:5173
```

## VS Code Task (권장)

- `Run Dev Server (5173)`: 고정 포트 개발 서버를 백그라운드로 실행
- `Restart Dev Server (5173)`: 포트 충돌 포함 복구 실행
- `Run Preview Server (4173)`: 빌드 결과를 고정 포트로 확인

실행 방법:
1. `Cmd + Shift + P`
2. `Tasks: Run Task`
3. `Run Dev Server (5173)` 선택

## Troubleshooting

열리다가 다시 안 열리는 경우 대부분은 서버 프로세스 종료입니다.

```bash
npm run dev:stable
curl -I http://localhost:5173
```

- `HTTP/1.1 200 OK`가 나오면 서버는 정상입니다.
- 브라우저는 `Shift + Command + R`로 강력 새로고침하세요.
- 포트 충돌/실행 실패면 `npm run dev:restart`를 사용하세요.

## GitHub Pages Deployment

이 프로젝트는 GitHub Pages 정적 배포를 지원합니다.

1. GitHub에서 비어 있는 새 저장소 생성
2. 로컬에서 Git 저장소 초기화 후 `main` 브랜치로 첫 push
3. GitHub 저장소의 `Settings > Pages`에서 `Build and deployment`를 `GitHub Actions`로 설정
4. 이후 `main` 브랜치에 push하면 자동 배포

첫 초기화 예시:

```bash
git init
git checkout -b main
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/<github-user>/<repository-name>.git
git push -u origin main
```

배포 URL 예시:

```bash
https://<github-user>.github.io/<repository-name>/
```

현재 설정은 Vite 빌드 시 상대 경로를 사용하므로 project site 형태의 GitHub Pages에 맞춰져 있습니다.

## Post-deploy Checkpoints

배포 후 아래 순서로 확인:

1. GitHub Actions에서 `Deploy to GitHub Pages` 워크플로우가 초록색으로 완료되었는지 확인
2. 배포 URL 첫 화면에서 레이아웃이 깨지지 않는지 확인
3. 뉴스 카드, 필터 버튼, 기사 모달이 동작하는지 확인
4. RSS 연결이 불안정할 때 예비 카드와 상태 문구가 표시되는지 확인
5. 아이맥, 맥미니, 모바일 등 다른 기기에서도 동일 URL로 열리는지 확인

## Notes

- RSS 피드는 CORS 프록시를 통해 로드되므로 프로덕션 배포 시 전용 백엔드 프록시 사용 권장
- 필터 상태는 메모리에만 저장 (새로고침 시 초기화)
- 추가 RSS 소스는 `RSS_SOURCES` 배열에 추가하여 확장 가능
