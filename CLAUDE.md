# nomoreviolence-blog

Jihoon LEE's personal blog. Built with Next.js 16 App Router.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4
- **Package Manager**: pnpm (10.27.0)
- **Font**: Pretendard (local font)

## Project Structure

```text
app/                    # Next.js App Router pages
├── layout.tsx          # Root layout
├── page.tsx            # Homepage
├── not-found.tsx       # 404 page
└── blog/
    ├── page.tsx        # Blog list
    ├── PostList.tsx    # Post list component
    └── [slug]/         # Individual blog post
        ├── page.tsx
        ├── layout.tsx
        └── PostTag.tsx

components/             # Shared components
├── Link.tsx
├── HomeLink.tsx
└── ErrorFallback.tsx

public/                 # Static files and blog posts (MDX)
├── _fonts/             # Local font files
└── [slug]/index.mdx    # Each blog post
```

## Commands

```bash
pnpm dev        # Run development server
pnpm build      # Production build
pnpm start      # Run production server
pnpm lint       # ESLint check
pnpm ts-check   # TypeScript type check
```

## Code Style

- ESLint: `eslint-config-next` + `eslint-config-prettier`
- Prettier: semicolons, double quotes, trailing commas
- Tailwind: Use theme tokens instead of arbitrary values (e.g., `text-caption` not `text-[13px]`). Add new tokens to `@theme` in `globals.css`

## Commit Messages

- Always check previous commit format with `git log --oneline -5` before suggesting commit messages

## Commit Separation

- Separate config/documentation changes from code changes into different commits
- Split commits by feature to make reviews easier
- Do not commit local development config files (e.g., `__ENABLE_LOCAL_API_DEV__`), but do not `git checkout` to revert them either — the user may be in local development

## Workflow

- Do not run `pnpm build` or `pnpm dev` after code changes — the user will verify

## Writing Blog Posts

Blog posts are MDX files at `public/[slug]/index.mdx`.
Include title, date, spoiler, tags in frontmatter.

## Path Aliases

- `@/*` → Project root (`./`)

## Session Management

Check if `.claude/sessions/.current-session` exists at conversation start.

When session is active:

- Automatically record progress after completing work
- Update goal status (`[ ]` → `[~]` → `[x]`)
- Record issues in Notes section
- Update naturally without notifying user each time

Session skills: `/session-start`, `/session-end`, `/session-current`, `/session-list`, `/session-help`
