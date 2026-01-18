# nomoreviolence-blog

Jihoon LEE의 개인 블로그. Next.js 16 App Router 기반.

## 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4
- **Package Manager**: pnpm (10.27.0)
- **Font**: Pretendard (로컬 폰트)

## 프로젝트 구조

```text
app/                    # Next.js App Router 페이지
├── layout.tsx          # 루트 레이아웃
├── page.tsx            # 홈페이지
├── not-found.tsx       # 404 페이지
└── blog/
    ├── page.tsx        # 블로그 목록
    ├── PostList.tsx    # 포스트 리스트 컴포넌트
    └── [slug]/         # 개별 블로그 포스트
        ├── page.tsx
        ├── layout.tsx
        └── PostTag.tsx

components/             # 공유 컴포넌트
├── Link.tsx
├── HomeLink.tsx
└── ErrorFallback.tsx

public/                 # 정적 파일 및 블로그 포스트 (MDX)
├── _fonts/             # 로컬 폰트 파일
└── [slug]/index.mdx    # 각 블로그 포스트
```

## 주요 명령어

```bash
pnpm dev        # 개발 서버 실행
pnpm build      # 프로덕션 빌드
pnpm start      # 프로덕션 서버 실행
pnpm lint       # ESLint 검사
pnpm ts-check   # TypeScript 타입 검사
```

## 코드 스타일

- ESLint: `eslint-config-next` + `eslint-config-prettier`
- Prettier: 세미콜론 사용, double quote, trailing comma

## 블로그 포스트 작성

블로그 포스트는 `public/[slug]/index.mdx` 경로에 MDX 파일로 작성.
frontmatter에 title, date, spoiler, tags 등 메타데이터 포함.

## 경로 별칭

- `@/*` → 프로젝트 루트 (`./`)
