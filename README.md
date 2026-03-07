# Traders Fastping - 소개 페이지

87개 해외 암호화폐 거래소를 한국어로 이용할 수 있게 해주는 크롬 확장 프로그램 소개 사이트입니다.

## 🚀 배포 방법 (Vercel - 추천)

### 1. GitHub에 올리기

```bash
cd traders-fastping-web
git init
git add .
git commit -m "v7.2.0 - 87개 거래소 지원 랜딩페이지"
git remote add origin https://github.com/YOUR_USERNAME/traders-fastping-web.git
git push -u origin main
```

### 2. Vercel 연결

1. [vercel.com](https://vercel.com) 접속 → GitHub 로그인
2. "Add New Project" → `traders-fastping-web` 레포 선택
3. Framework: **Vite** 자동 감지됨
4. "Deploy" 클릭 → 약 30초 후 배포 완료

배포 주소: `https://traders-fastping-web.vercel.app`

### 3. 커스텀 도메인 연결 (선택)

Vercel 프로젝트 Settings → Domains에서 도메인 추가:
- 예: `tradersfastping.com` 또는 `fastping.kr`

## 🔄 Claude가 직접 업데이트하는 방법

### 방법 A: GitHub API (claude.ai 대화에서)

1. GitHub → Settings → Developer Settings → Personal Access Tokens → Fine-grained tokens
2. 토큰 생성 (repo 권한만)
3. Claude 대화에서 토큰 제공 → Claude가 GitHub API로 코드 push → Vercel 자동 배포

### 방법 B: Claude Code (터미널에서)

```bash
# Claude Code 설치
npm install -g @anthropic-ai/claude-code

# 프로젝트 폴더에서 실행
cd traders-fastping-web
claude

# Claude에게 수정 요청
> src/App.jsx에서 거래소 수를 90개로 업데이트해줘
```

Claude Code가 직접 파일 수정 → git commit → git push까지 자동 처리합니다.

## 📁 프로젝트 구조

```
traders-fastping-web/
├── index.html          # 진입점
├── package.json        # 의존성
├── vite.config.js      # Vite 설정
├── public/
│   └── favicon.svg     # 파비콘
└── src/
    ├── main.jsx        # React 마운트
    └── App.jsx         # 메인 랜딩페이지 (여기만 수정하면 됨)
```

## 🛠 로컬 개발

```bash
npm install
npm run dev     # http://localhost:5173 에서 확인
npm run build   # dist/ 폴더에 빌드
```
