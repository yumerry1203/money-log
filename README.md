# MoneyLog

개인 수입과 지출 관리 서비스를 위한 디자인 시스템과 공통 폼 컴포넌트 기반을 구축하는 프론트엔드 프로젝트다.

## Overview

MoneyLog는 날짜별 수입과 지출을 기록하고, 거래 내역과 소비 패턴을 확인하는 개인 지출 관리 서비스를 목표로 한다.


- 형태: Web
- 대상 사용자: 개인 수입과 지출을 기록하고 조회하려는 사용자
- 현재 구현 범위: Header, 디자인 토큰, 공통 폼 컴포넌트, 디자인 가이드 화면


## Tech Stack

| 구분 | 기술 | 사용 방식 |
| --- | --- | --- |
| Frontend | React 19 | 함수형 컴포넌트와 `useState`, `useEffect`, `useId`를 사용해 화면과 입력 요소를 구성한다. |
| Language | TypeScript | 컴포넌트 props와 Select 옵션 타입을 정의해 재사용 가능한 UI를 작성한다. |
| Styling | Tailwind CSS 4 | `@theme`에 MoneyLog 색상 토큰을 정의하고, 컴포넌트 클래스에서 토큰 기반 유틸리티를 사용한다. |
| Build | Vite 8 | 개발 서버, 프로덕션 빌드, React 플러그인 연결에 사용한다. |
| Lint | Oxlint | React Hooks와 컴포넌트 export 관련 규칙을 검사한다. |

## Key Features

### 디자인 토큰

`src/index.css`의 Tailwind `@theme`에서 브랜드, 지출, 수입, 상태, 배경, 텍스트, 테두리 색상을 관리한다.

- `primary`: 주요 동작과 활성 상태
- `secondary`: 지출 관련 UI
- `income`, `income-text`: 수입 관련 UI와 수입 텍스트
- `danger`: 오류 메시지와 지출 버튼 텍스트
- `surface`, `text`, `text-muted`, `border`: 카드, 텍스트, 경계의 공통 표현

색상값을 컴포넌트마다 직접 작성하지 않고 `bg-primary`, `text-income-text`, `border-border`처럼 의미 기반 클래스로 사용한다.

### 공통 폼 컴포넌트

`src/components/common`에 다음 컴포넌트를 구성했다.

- `Button`: `primary`, `secondary`, `income`, `ghost` variant와 비활성 상태를 제공한다.
- `Input`, `Textarea`: `error`, `helperText`, `disabled` props로 오류, 보조 문구, 비활성 상태를 표현한다.
- `Select`: 옵션 배열과 placeholder를 받아 기본 Select UI를 구성한다.
- `Checkbox`, `Radio`: 선택과 비활성 상태를 제공한다.
- `DatePicker`: native `input[type="date"]` 기반의 날짜 입력을 제공한다.

입력 컴포넌트는 `useId`로 label과 입력 요소를 연결하고, 오류 상태에서는 `aria-invalid`, `aria-describedby`를 설정한다.

### 디자인 가이드 화면

Header 우측의 `디자인 가이드` 버튼으로 `#design-guide` 화면에 이동할 수 있다.

가이드 화면에서는 Button, Input, Textarea, Select, Checkbox, Radio, DatePicker의 기본, 입력됨, 오류, 비활성 상태를 한 번에 확인한다. 빈 입력 요소를 클릭해 focus 상태를, 버튼에 마우스를 올려 hover 상태를 확인할 수 있다.

### Header

로고, 대시보드, 거래 내역, 지출 등록 메뉴, 현재 날짜, 디자인 가이드 이동 버튼을 포함한 Header를 구성했다. 날짜는 브라우저의 현재 날짜를 한국어 요일 형식으로 표시한다.

## Architecture / Project Structure

```text
src/
├── assets/
│   └── money-log-logo.png       # 서비스 로고
├── components/
│   ├── common/                  # 재사용 가능한 폼 UI
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Select.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Radio.tsx
│   │   ├── DatePicker.tsx
│   │   └── index.ts             # 공통 export
│   ├── DesignGuide.tsx          # 컴포넌트 상태 확인 화면
│   └── Header.tsx               # 상단 네비게이션
├── App.tsx                      # 해시 기반 화면 분기
├── index.css                    # Tailwind import 및 디자인 토큰
└── main.tsx                     # React 진입점
```

## Technical Decisions

### 디자인 토큰 기반 스타일링

색상은 `@theme`에 정의하고 공통 컴포넌트에서 토큰 기반 클래스로 사용한다. 따라서 버튼과 입력 요소의 상태 색상을 같은 기준으로 적용할 수 있다.

### 공통 컴포넌트와 상태 props

반복되는 입력 UI를 공통 컴포넌트로 분리했다. `error`, `disabled`, `helperText`, `variant` 같은 props로 상태를 전달하고, 각 컴포넌트 내부에서 상태에 맞는 스타일과 안내 문구를 처리한다.

### 해시 기반 가이드 화면 전환

현재 구현된 화면 전환은 `#design-guide` 해시를 기준으로 한다. `App`에서 `hashchange` 이벤트를 구독해 디자인 가이드 화면 표시 여부를 관리한다. React Router는 현재 설치하거나 사용하지 않았다.

### Native 폼 요소 사용

Select와 DatePicker는 브라우저의 native 요소를 기반으로 구현했다. DatePicker는 브라우저 기본 날짜 선택 도구를 사용한다.

## What I Worked On

Git 기록에서 `yumerry1203` 작성자로 확인되는 작업은 다음과 같다.

- MoneyLog 프로젝트 초기 설정과 Tailwind CSS 연결
- MoneyLog 로고와 Header 구현
- MoneyLog 개발 작업 규칙 추가
- 디자인 토큰 정의
- 공통 폼 컴포넌트와 디자인 가이드 화면 구현

## Roadmap

기획 문서에 정의된 다음 단계는 아직 구현되지 않았다.

1. `Transaction` 타입과 Mock 데이터를 기반으로 한 거래 목록 및 대시보드 구현
2. 검색, 거래 유형, 카테고리, 기간, 정렬 필터 구현
3. 거래 등록, 수정, 삭제 흐름 구현
4. 실제 API 및 저장소 연결
5. 카테고리별 소비 비율, 월별 수입과 지출, 날씨 데이터 기반 통계 확장

## Getting Started

### Requirements

- Node.js
- npm

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

현재 저장소에서는 별도 환경 변수 파일이나 API Key를 사용하지 않는다.

## Links

- GitHub: [yumerry1203/money-log](https://github.com/yumerry1203/money-log)
