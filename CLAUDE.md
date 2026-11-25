# nomoreviolence-blog

Jihoon LEE's personal blog. Built with Next.js 16 App Router.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4
- **Package Manager**: pnpm (10.34.9)
- **Fonts**: Pretendard (reading/headings), GalmuriMono11 subset (ledger dot-print face, `scripts/subset-dot-font.sh`)

## Project Structure

```text
app/                      # Next.js App Router pages
├── layout.tsx            # Root layout: spine, masthead, footer
├── globals.css           # @theme tokens (light sheet / dark cover), ledger utilities
├── page.tsx              # Home (intro + recent ledger rows)
├── not-found.tsx         # 404
├── error.tsx             # Error boundary
└── blog/
    ├── page.tsx          # Ledger (post list by year)
    ├── Ledger.tsx        # Client: tag filter + since-last-visit bookmark
    └── [slug]/           # Individual post
        ├── page.tsx
        ├── markdown.css  # Reading column styles
        └── PostTag.tsx

components/               # Shared components
├── Masthead.tsx, MastheadNav.tsx, Spine.tsx, SiteFooter.tsx
├── Seal.tsx, DotNumerals.tsx, HomeLink.tsx, Link.tsx
└── ledger/               # LedgerRow, LedgerParts (head, gap row, sheet head), Bookmark

lib/
├── posts.ts              # Post loading + ledger data (numbering, char counts, gaps)
└── format.ts             # Ledger number/date formatting

public/                   # Static files and blog posts (MDX)
├── _fonts/               # Local font files (+ OFL license for Galmuri)
└── [slug]/index.mdx      # Each blog post (folders without index.mdx are ignored)
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

## Styling (Tailwind CSS 4)

Use theme tokens defined in `@theme` block (`app/globals.css`). Do not use arbitrary values like `text-[13px]` or `bg-[--var]`.

When you need a new value, add it to `@theme` first, then use the token. See `app/globals.css` for existing tokens and [Tailwind CSS v4 docs](https://tailwindcss.com/docs/theme) for token naming conventions

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
