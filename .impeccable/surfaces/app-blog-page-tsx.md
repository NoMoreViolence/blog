---
version: 1
slug: "app-blog-page-tsx"
primary_target: "app/blog/page.tsx"
related_targets: ["app/page.tsx","app/blog/[slug]/page.tsx","app/layout.tsx"]
---

## Scope

블로그 전체 프레임 교체(redesign). 대상: `/`(소개), `/blog`(기록 목록, 주 표면), `/blog/[slug]`(본문), 404·에러. Visitor mode: **Read**.

## Audience, job, constraints

- 1차 독자 = 1년 뒤의 나, 2차 = 같은 길 가는 1인 메이커. 가장 잦은 일: **시간 순으로 훑기**.
- 유지: NoMoreViolence 워드마크, Pretendard(본문·제목), 푸터 연락처 3종(메일·LinkedIn·GitHub), URL 구조(`/`, `/blog`, `/blog/<slug>`, `?tag=`), 글 내용·문체, 홈 소개 문구.
- 데이터는 전부 실측: 번호=시간순 인덱스, 글자=본문 글자 수(마크다운 기호·URL 제외), 누적=시간순 누적합, 무기록=글 없는 달 수.

## Direction contract

THESIS: 이 블로그는 한 사람의 기록 통장이다. 글 한 편은 기계가 찍은 한 줄이라 지울 수 없고, 시간 순으로 쌓인다. 흰 바탕에 제목·날짜·요약을 최신순으로 늘어놓는 개인 개발 블로그 기본형(overreacted 계열)을 거부한다.

OWN-WORLD: 통장 속지의 연녹회색 위변조 방지 틴트 바탕, 딥그린 비닐 커버와 금박 책등, 남흑색 인자 잉크, 누적 열에만 쓰는 청색 잉크, 인감 빨강. 숫자·날짜·장부 라벨은 고정폭 도트 인자(GalmuriMono11)로, 면의 연도는 둥근 점 5×7 도트 매트릭스로 찍는다. 제목과 본문은 Pretendard. 행 구분은 가는 괘선뿐이고 박스나 카드는 없다. 지문 인쇄 무늬는 프레임(책등·면 머리)에만 깔고 본문 칼럼 뒤에는 깔지 않는다. 다크 모드는 커버 면(딥그린 바탕, 금박·연한 잉크).

STORY: 방문자는 첫 화면에서 이것이 한 사람이 날짜 순으로 쌓아 온 기록이라는 걸 안다. 연도 면을 넘기며 과거 기록을 찾고, 글이 없던 공백 기간까지 한 줄로 본다. 행을 눌러 본문을 읽고, 끝에서 이전·다음 기록으로 이어 읽는다.

FIRST VIEWPORT: `/blog` 데스크톱 기준. 왼쪽에 딥그린 책등(세로 금박 NoMoreViolence). 위쪽에 예금주 칸(기록주 NoMoreViolence · 작성 이지훈 · 개설일 2024.07.26)과 nav(소개·기록), 이지훈 인감. 그 아래 큰 도트 연도 2026과 "제 2 면 · 3건", 태그 필터 한 줄. 장부 표(번호|일자|적요|태그|글자|누적)에는 무기록 19개월 행, 004, 005가 오고, 재방문이면 정리 경계선, 그다음 오버프린트된 006이 온다. 그 아래에서 2024 면이 시작한다. 주 행동은 행 전체가 본문 링크.

FORM: 사용자 문화권 후보 7개 중 5번째(통장 장부). seed:e8d8a0410f6069a9. Signature interaction: 재방문하면 지난 방문 이후 새 행 위로 붉은 '여기까지 정리됨' 경계선이 좌→우로 인자된다(clip-path, 240ms ease-out, 1회). Motion grammar: 그 외엔 정지 상태. 호버는 행 바탕 틴트(150ms ease)뿐, 누름은 틴트를 한 단계 더.

Raises: 상태는 색이 아니라 표식(정리 경계선) · 공백도 기록(무기록 행) · 장부 열 격자 하나가 홈·목록·본문 머리·푸터를 정렬 · 본문 끝 이전·다음 기록 참조 · 면마다 이기는 건 연도 숫자 하나 · 최신 행은 오버프린트.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- 번역판(다국어) 구조는 미정. 장부 라벨은 한국어 고정.
