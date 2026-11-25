---
name: nomoreviolence
description: 한 사람이 날짜 순으로 쌓아 온 기록 통장. 통장 장부(passbook ledger) 세계.
colors:
  sheet: "#e4ece7"
  sheet-deep: "#d6e2da"
  rule: "#c3d3c9"
  ink: "#1b2330"
  ink-soft: "#505b66"
  ink-blue: "#2b4c9b"
  seal: "#b9322a"
  cover: "#0f3b2e"
  cover-deep: "#0a2c22"
  foil: "#c9a95a"
  numeral: "#0f3b2e"
typography:
  headline:
    fontFamily: "Pretendard Variable, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Pretendard Variable, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.333
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Pretendard Variable, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 2
    fontFeature: "\"ss06\""
  label:
    fontFamily: "Pretendard Variable, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
  ledger:
    fontFamily: "GalmuriMono11, Pretendard Variable, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.33
    letterSpacing: "0em"
    fontFeature: "\"tnum\""
  ledger-date:
    fontFamily: "GalmuriMono11, Pretendard Variable, monospace"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0em"
    fontFeature: "\"tnum\""
rounded:
  none: "0px"
  focus: "2px"
spacing:
  grid-gap: "1rem"
  grid-gap-wide: "1.5rem"
  row-y: "1.25rem"
  row-bleed: "0.75rem"
  gutter: "1.25rem"
  gutter-sm: "2.5rem"
  gutter-lg: "4rem"
  sheet-gap: "3.5rem"
components:
  ledger-row:
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "1.25rem 0.75rem"
  ledger-row-hover:
    backgroundColor: "{colors.sheet-deep}"
  ledger-row-active:
    backgroundColor: "{colors.rule}"
  ledger-gap-row:
    textColor: "{colors.ink-soft}"
    typography: "{typography.ledger}"
    padding: "1.25rem 0"
  ledger-head:
    textColor: "{colors.ink-soft}"
    typography: "{typography.ledger}"
    padding: "0.5rem 0"
  tag-filter:
    textColor: "{colors.ink-soft}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.25rem 0.625rem"
  tag-filter-current:
    textColor: "{colors.ink}"
  masthead-nav:
    textColor: "{colors.ink-soft}"
    padding: "0 0 0.125rem"
  masthead-nav-current:
    textColor: "{colors.ink}"
  bookmark:
    textColor: "{colors.seal}"
    backgroundColor: "{colors.sheet}"
    typography: "{typography.ledger}"
  spine:
    backgroundColor: "{colors.cover}"
    textColor: "{colors.foil}"
    width: "6rem"
  button-retry:
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.5rem 1rem"
  button-retry-hover:
    backgroundColor: "{colors.sheet-deep}"
  code-slip:
    backgroundColor: "{colors.sheet-deep}"
    rounded: "{rounded.none}"
    padding: "1rem 1.25rem"
---

# Design System: nomoreviolence

## Overview

**Creative North Star: "기록 통장"**

이 블로그는 한 사람의 통장이다. 글 한 편은 기계가 찍은 한 줄이고, 지울 수 없으며, 시간 순으로 쌓인다. 속지는 연녹회색 위변조 방지 틴트 종이, 인자 잉크는 남흑색, 왼쪽에는 딥그린 비닐 커버의 책등이 금박을 달고 붙어 있다. 숫자·날짜·장부 라벨은 고정폭 도트 프린터 서체로 찍히고, 제목과 본문은 Pretendard로 읽힌다.

밀도는 장부답게 낮지 않되 조용하다. 한 면(연도)에서 이기는 것은 큰 도트 연도 숫자 하나뿐이고, 나머지는 괘선과 열 정렬로 질서를 만든다. 박스·카드·그림자 없이, 장부 열 격자 하나가 홈·목록·본문 머리·푸터를 모두 정렬한다. 상태는 색이 아니라 표식으로 보인다(정리 경계선, 오버프린트, 무기록 행).

다크 스킴은 속지를 어둡게 칠한 것이 아니라 통장의 커버 면이다. 딥그린 바탕에 금박과 연한 잉크. 컴포넌트는 스킴을 분기하지 않고, CSS 변수 값만 바뀐다. 거부하는 것: 흰 바탕에 제목·날짜·요약을 최신순으로 늘어놓는 개인 개발 블로그 기본형(overreacted 계열).

**Key Characteristics:**
- 속지(밝음) / 커버(어두움) 두 면, 변수 값 교체만으로 전환
- 도트 인자 서체는 기계가 찍은 데이터와 고정 라벨 전용
- 장부 열 격자(번호|일자|적요|태그|글자|누적) 하나가 모든 표면을 정렬
- 행 구분은 가는 괘선, 블록 마감은 이중선, 공백·구획은 점선
- 지문 인쇄 무늬는 프레임(책등·면 머리)에만
- 움직임은 정리 경계선 인자 한 번뿐

## Colors

연녹회색 종이 위에 남흑색 잉크, 그리고 쓰임이 정해진 세 가지 잉크(청색·인감 빨강·금박)로 이루어진 은행 인쇄물 팔레트.

### Primary
- **남흑 인자 잉크 (ink)**: 제목, 본문, 날짜, 현재 nav·필터 테두리, 이중 마감선. 화면 글자의 기본.
  다크: 연한 잉크(#e5ece7).

### Secondary
- **청색 잉크 (ink-blue)**: 누적 열 숫자, 본문 안 링크, 포커스 링, 선택 영역, 캐럿. 장부에서 "합계"와 "이동"을 뜻하는 잉크.
  다크: #a8bff1.
- **인감 빨강 (seal)**: 인감(이지훈)과 '여기까지 정리됨' 경계선, 오류 제목. 도장과 정정 표시에만 쓴다.
  다크: #f08a7e.

### Tertiary
- **딥그린 비닐 (cover / cover-deep)**: 책등 바탕과 그 위 지문 무늬. cover-deep은 커버 그늘 단계로 예약되어 있다.
  다크: #071b15 / #04120e.
- **금박 (foil)**: 책등의 세로 워드마크, No.1, 책등 연도.
  다크: #d6b867.
- **면 연도 잉크 (numeral)**: 큰 도트 연도. 밝은 면에서는 커버와 같은 딥그린, 다크에서는 금박(#d6b867)으로 바뀐다.

### Neutral
- **속지 틴트 (sheet)**: 페이지 바탕, 경계선 라벨 뒤 바탕.
  다크: #0d271f.
- **짙은 틴트 (sheet-deep)**: 행 호버, 인라인 코드·코드 슬립 바탕.
  다크: #133429.
- **괘선 (rule)**: 행 사이 가는 선, 밑줄 기본색, 행 누름 바탕, 강조된 코드 줄.
  다크: #244a3d.
- **흐린 잉크 (ink-soft)**: 장부 라벨, 번호, 태그, 요약, 점선 괘.
  다크: #a3b4aa.

### Named Rules
**The Variable-Swap Rule.** 다크 스킴은 `@media (prefers-color-scheme: dark)` 아래 `:root`의 CSS 변수 값만 바꾼다. 컴포넌트에 `dark:` 색 분기를 쓰지 않는다(인감의 `mix-blend-multiply` 해제만 예외).

**The Assigned Ink Rule.** 청색은 누적·링크·포커스, 빨강은 인감·정리 표식·오류, 금박은 커버에만. 강조가 필요하다고 이 잉크들을 다른 곳에 빌려 쓰지 않는다.

**The Theme-Color Echo Rule.** `app/layout.tsx`의 `viewport.themeColor`는 sheet의 두 스킴 값(#e4ece7 / #0d271f)을 그대로 복제한다. meta 태그는 CSS 변수를 못 읽으므로, sheet를 바꾸면 여기도 같이 바꾼다.

## Typography

**Body Font:** Pretendard Variable (with system-ui, sans-serif), `--font-sans`, `ss06` 기본 적용
**Ledger Font:** GalmuriMono11 서브셋 (with Pretendard, monospace), `--font-ledger` / `font-ledger`
**Display:** 글꼴이 아니라 `DotNumerals` SVG. 5×7 둥근 핀 도트 매트릭스.

**Character:** 사람이 쓴 글은 Pretendard로 부드럽게, 기계가 찍은 데이터는 비트맵 도트로 딱딱하게. 두 목소리가 한 행 안에서 열을 나눠 갖는다.

### Hierarchy
- **Display / 면 연도** (DotNumerals, 높이 3rem → md 5rem): 각 면 머리의 연도 하나. 페이지에서 가장 큰 요소이고 유일하게 큰 요소.
- **Headline** (900, 2.25rem → md 3rem, tracking-tight): 글 본문 h1. 홈 소개 h1은 800, 1.875rem → md 2.25rem.
- **Title** (700, 1.25rem → md 1.5rem, tracking-tight, balance): 장부 행 제목, 본문 h2(1.875rem)·h3(1.5rem)·h4(1.25rem).
- **Body** (400, 1.125rem / 2rem, pretty): 본문·소개. 측정폭 42rem(max-w-2xl).
- **Label** (400, 0.875rem, ink-soft): 예금주 칸 라벨, 태그, 필터, 푸터 연락처.
- **Ledger** (GalmuriMono11 400, 0.75rem, tabular): 번호·글자·누적·개설일·캡션·무기록·경계선 문구. 일자 열만 1.5rem, line-height 1.

### Named Rules
**The Machine-Print Rule.** 도트 서체는 기계가 찍은 데이터(번호, 날짜, 수량)와 고정 장부 라벨에만 쓴다. 사람이 쓴 문장, 제목, 요약, 버튼 문구에는 쓰지 않는다.

**The Subset Rule.** 도트 서체는 ASCII·`·`·`—`·`…`와 고정 한글 라벨만 담은 서브셋이다. 도트로 찍는 새 한글 라벨을 추가하면 그 글자를 `scripts/subset-dot-font.sh`의 `LEDGER_HANGUL`에 넣고 폰트를 다시 생성한다. 안 그러면 Pretendard로 폴백되어 한 줄에서 서체가 섞인다.

**The Hard Pixel Rule.** `.font-ledger`는 안티앨리어싱을 끄고(`-webkit-font-smoothing: none`), tabular-nums와 자간 0을 고정한다. 도트 서체에 tracking·weight 유틸을 얹지 않는다.

## Layout

- **프레임:** lg(64rem) 이상에서 `spine-grid`가 6rem 책등과 본문 트랙으로 나뉜다. 그 아래에서는 책등이 0.75rem 높이 커버 띠로 접힌다. 책등은 sticky, 화면 높이.
- **컨테이너:** max-w-5xl(64rem), 좌우 거터 1.25rem → sm 2.5rem → lg 4rem. 본문 측정폭은 max-w-2xl.
- **장부 격자 (`ledger-grid`):** 모바일은 3열(`auto 1fr auto`)에 `no date cum / body / tags chars` 세 줄로 쌓인다. md(48rem) 이상은 6트랙 `2.5rem 5rem minmax(0,1fr) 9rem 4rem 5rem`, 열 간격 1.5rem. 목록 행, 열 머리, 본문 러닝 헤드, 푸터가 모두 이 격자에 걸린다. 본문 글 칼럼(`ledger-column`)은 md에서 3번째 트랙(적요)부터 시작한다.
- **리듬:** 행 상하 1.25rem, 면 사이 2.5rem → md 3.5rem, 본문 문단 간 1.75rem, 소제목 위 3–4rem.
- **한국어 줄바꿈:** body에 `word-break: keep-all`, `overflow-wrap: anywhere`. 제목은 `text-balance`, 문단은 `text-pretty`.

### Named Rules
**The One Grid Rule.** 새 표면에 정렬이 필요하면 `ledger-grid`의 area 유틸(`area-no` … `area-cum`, `area-tail`)에 올린다. 별도 열 체계를 만들지 않는다.

**The Tokens-Only Rule.** Tailwind 클래스는 `@theme` 토큰이나 표준 스케일만 쓴다. `text-[13px]`, `bg-[--var]` 같은 임의 값은 금지. 새 값이 필요하면 `@theme`이나 `@utility`에 먼저 추가하고 그 이름을 쓴다.

## Elevation & Depth

그림자 없음. 깊이는 종이 위 잉크의 층으로만 표현한다: 바탕(sheet) → 짙은 틴트(sheet-deep, 호버·코드) → 괘선 톤(rule, 누름). 유일한 `text-shadow`는 최신 행의 오버프린트(`1px 0 0 currentColor`)로, 그림자가 아니라 도트 헤드가 두 번 친 굵기다. 인감은 밝은 면에서 `mix-blend-multiply`로 종이에 스며든다.

### Named Rules
**The Ink-Not-Light Rule.** 들어올리는 그림자, 블러, 글래스를 쓰지 않는다. 상태 변화는 틴트 한 단계로 한다.

## Shapes

직각. 모서리 반경은 0이고, 예외는 포커스 링의 2px뿐. 선의 문법이 모양을 대신한다:
- **가는 괘선** (1px rule): 행 사이.
- **실선 열 머리** (1px ink, 위아래): 장부 열 캡션 띠.
- **이중 마감선** (4px double ink): 예금주 칸 아래, 푸터 위, 본문 끝 이전·다음 기록 위. 블록이 닫히는 곳.
- **점선 괘** (`rule-dotted`, 6px 간격 원점): 무기록 행, 본문 `hr`, 인용 왼쪽 세로 점선.
- **지문 무늬** (`bg-guilloche`, `bg-guilloche-cover`): 면 머리 띠와 책등에만.
- **원**: 인감과 도트 핀. 다른 둥근 형태는 없다.

## Components

### 장부 행 (Ledger Row)
행 전체가 본문 링크인 한 줄 인자. 번호(도트, ink-soft) · 일자(도트 1.5rem) · 적요(Pretendard 제목 + 요약) · 태그(label) · 글자(도트) · 누적(도트, 청색). 좌우로 0.75rem 바깥으로 번져 호버 틴트가 열 정렬을 깨지 않는다.
- **Hover:** 바탕 sheet-deep, `transition-colors` 150ms.
- **Active:** 바탕 rule(한 단계 더).
- **Newest:** 일자와 제목에 오버프린트.
- **앵커:** `no-006` 형식 id, `scroll-mt-24`.

### 무기록 행 (Gap Row)
글이 없는 달도 한 줄을 차지한다. 양쪽 점선 괘 사이에 `2024.09 — 2026.03 · 무기록 19개월`을 도트로 찍는다. 링크 아님.

### 면 머리 (Sheet Head)
큰 DotNumerals 연도(numeral 잉크)와 오른쪽 아래 도트 캡션(`제 2 면 · 3건`). 그 아래 장부 열 머리(md 이상에서만 보임, 시각 전용).

### 정리 경계선 (Bookmark) — 시그니처
재방문 시 지난 방문 이후 처음 인자된 행의 윗 괘선 위에 붉은 1px 선과 `여기까지 정리됨` 도트 라벨. 마지막으로 본 최신 날짜는 `localStorage`(`nmv:ledger-printed-through`)에 남고, 저장소가 막혀 있으면 경계선은 안 나타난다.
- **Motion:** 좌→우 인자, `clip-path: inset(0 100% 0 0)` → `inset(0)`, 240ms `cubic-bezier(0.23, 1, 0.32, 1)`, 120ms 지연, 1회. `prefers-reduced-motion`에서는 200ms 페이드.

### 태그 필터 (Tag Filter)
`?tag=` 링크의 한 줄 목록. 각 항목은 label 글자 + 도트 개수.
- **기본:** 테두리 투명, ink-soft. **Hover:** ink.
- **Current:** 1px ink 테두리, ink. 직각.

### 내비게이션 (Masthead Nav)
소개·기록 두 항목, 1rem 500. 기본 ink-soft, hover ink, 현재 항목은 2px ink 밑줄.

### 예금주 칸 (Masthead)
`dl`로 찍힌 통장 첫 장: 기록주(NoMoreViolence 워드마크, 900) · 작성(이지훈) · 개설일(도트 날짜). 오른쪽에 −8° 기울어진 인감. 아래를 이중선으로 닫는다. 바탕은 `bg-guilloche` 띠.

### 책등 (Spine)
lg 이상, 6rem, 커버 지문 무늬 위 금박: 위 `No.1`, 가운데 세로 워드마크, 아래 첫 해 도트 연도. 장식 전용(`aria-hidden`), 워드마크 링크는 예금주 칸이 맡는다.

### 본문 (Reading Column)
본문 위에 그 글이 찍힌 장부 줄을 러닝 헤드로 다시 찍고(`장부에서 보기`로 목록 앵커 복귀), 끝에서 이중선 아래 이전·다음 기록을 장부 행과 같은 호버/누름으로 잇는다. 없는 쪽은 `다음 기록 없음`을 도트로 찍는다. 본문 링크는 청색 잉크에 45% 밑줄, hover에서 밑줄 진하게. 코드 블록은 sheet-deep 슬립(모바일은 상하 괘선만 두고 화면 끝까지, sm 이상 사방 괘선).

### 링크 (Text Links)
목록 밖 링크는 ink 글자 + rule 색 밑줄(1–2px, offset 4–6px), hover에서 밑줄이 ink로. 색만 바뀌고 움직이지 않는다.

### 버튼 (Retry)
시스템에 버튼은 오류 화면의 `다시 시도` 하나. 1px ink 테두리, 직각, 0.5rem 1rem, hover sheet-deep.

## Do's and Don'ts

### Do:
- **Do** 새 목록·요약 표면도 `ledger-grid`와 area 유틸로 정렬한다.
- **Do** 숫자·날짜·수량은 도트 서체(0.75rem, tabular)로, 사람이 쓴 문장은 Pretendard로 찍는다.
- **Do** 상태는 표식으로 표현한다: 정리 경계선, 오버프린트, 이중 마감선, 무기록 행.
- **Do** 호버는 행 바탕 틴트(sheet-deep, 150ms), 누름은 한 단계 더(rule). 텍스트 링크는 색·밑줄색만 바꾼다.
- **Do** 데이터는 실측만 찍는다: 번호=시간순 인덱스, 글자=본문 글자 수(마크다운 기호·URL 제외), 누적=시간순 누적합, 무기록=글 없는 달 수.
- **Do** 다크 값은 `:root` 변수 교체로만 넣고, sheet 값이 바뀌면 `viewport.themeColor`도 같이 바꾼다.
- **Do** 도트로 찍는 새 한글 라벨은 `scripts/subset-dot-font.sh`에 추가하고 폰트를 재생성한다.

### Don't:
- **Don't** 카드, 둥근 모서리, 그림자, 채워진 컨테이너로 글을 감싼다. 행은 괘선으로만 나뉜다.
- **Don't** 지문 무늬(`bg-guilloche*`)를 본문 칼럼이나 글 뒤에 깐다. 프레임(책등·면 머리) 전용이다.
- **Don't** 면 하나에 연도 숫자 말고 다른 큰 요소를 세운다.
- **Don't** 청색·인감 빨강·금박을 배정된 역할 밖에서 강조색으로 쓴다.
- **Don't** 정리 경계선 외의 움직임을 더한다: 등장 애니메이션, 스크롤 연출, 눌림 축소, 호버 이동 모두 없다.
- **Don't** 도트 서체로 제목·문장·버튼 문구를 찍거나, 서브셋에 없는 한글을 도트로 찍는다.
- **Don't** `text-[13px]` 같은 임의 값 클래스를 쓴다.

## Open Items

리뷰에서 남은 천장(ceiling) 메모. 규칙이 아니다.
- 기존 drift: `app/error.tsx`의 `다시 시도` 버튼에 `active:scale-97`(움직임), 워드마크 `HomeLink`의 hover가 틴트가 아니라 불투명도 변화. 둘 다 위 모션 문법에서 벗어나 있으며 시스템 규칙이 아니다.

## Decided Against

사용자가 하지 않기로 정한 것(2026-11-26). 다시 제안하지 않는다.
- 인감·책등 금박의 래스터 질감(잉크 번짐, 박 눌림): 이미지 생성 불필요. 평면 벡터 그대로 둔다.
- 마지막 글부터 오늘까지의 열린 공백을 무기록 행으로 표시: 하지 않는다. 무기록 행은 두 글 사이의 공백만 찍는다.
