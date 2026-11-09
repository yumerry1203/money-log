# Money Log — 개인 지출 관리 시스템 🐷

![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript_6-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)


## Overview

MoneyLog는 날짜별 수입과 지출을 기록하고, 거래 내역과 소비 패턴을 확인하는 개인 지출 관리 서비스 입니다.


- 형태: Web
- 대상 사용자: 개인 수입과 지출을 기록하고 조회하려는 사용자
- 현재 구현 범위: Header, 디자인 토큰, 공통 폼 컴포넌트, 디자인 가이드 화면

[Money Log 바로가기](https://yumerry1203.github.io/money-log/)  

## Tech Stack

| 구분 | 기술 | 사용 방식 |
| --- | --- | --- |
| Frontend | React 19 | 함수형 컴포넌트와 `useState`, `useEffect`, `useId`를 사용해 화면과 입력 요소를 구성한다. |
| Language | TypeScript | 컴포넌트 props와 Select 옵션 타입을 정의해 재사용 가능한 UI를 작성한다. |
| Styling | Tailwind CSS 4 | `@theme`에 MoneyLog 색상 토큰을 정의하고, 컴포넌트 클래스에서 토큰 기반 유틸리티를 사용한다. |
| Build | Vite 8 | 개발 서버, 프로덕션 빌드, React 플러그인 연결에 사용한다. |
| Lint | Oxlint | React Hooks와 컴포넌트 export 관련 규칙을 검사한다. |

## 주요 기능

- 거래 등록, 수정, 삭제
- 날짜별 소비 내역 관리
- 카테고리별 지출 비율 확인
- 날씨 정보 연동

### 디자인 토큰

`src/index.css`의 Tailwind `@theme`에서 브랜드, 지출, 수입, 상태, 배경, 텍스트, 테두리 색상을 관리

- `primary`: 주요 동작과 활성 상태
- `secondary`: 지출 관련 UI
- `income`, `income-text`: 수입 관련 UI와 수입 텍스트
- `danger`: 오류 메시지와 지출 버튼 텍스트
- `surface`, `text`, `text-muted`, `border`: 카드, 텍스트, 경계의 공통 표현


### 공통 폼 컴포넌트

`src/components/common`에 다음 컴포넌트를 구성했다.

- `Button`: `primary`, `secondary`, `income`, `ghost` variant와 비활성 상태를 제공
- `Input`, `Textarea`: `error`, `helperText`, `disabled` props로 오류, 보조 문구, 비활성 상태를 표현
- `Select`: 옵션 배열과 placeholder를 받아 기본 Select UI를 구성
- `Checkbox`, `Radio`: 선택과 비활성 상태를 제공
- `DatePicker`: native `input[type="date"]` 기반의 날짜 입력을 제공


## 프로젝트 구조

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


## 프로젝트 진행 상황과 단계별 로드맵

기획 문서와 현재 Git 기록을 기준으로 정리한 단계별 진행 상황

- ✅ **1단계, 프로젝트 기반과 디자인 시스템**: React, TypeScript, Vite, Tailwind CSS, Header, 디자인 토큰, 공통 폼 컴포넌트, 디자인 가이드 화면을 구현
- 🔴 **2단계, Mock 데이터 기반 거래 화면**: `Transaction` 타입, Mock 데이터, 대시보드, 거래 목록 구현
- 🔴 **3단계, 필터와 거래 등록 흐름**: 검색, 필터, 거래 등록 모달, 수정과 삭제 기능 구현
- 🔴 **4단계, API와 저장소 연결**: 거래 조회와 등록, 수정, 삭제 요청을 연결하고 Loading과 Error 상태 처리
- 🔴 **5단계, TanStack Query 서버 상태 관리**: Query, Mutation, 캐시 갱신 적용
- 🔴 **6단계, 소비 데이터 분석과 확장**: 카테고리 통계, 월별 데이터, 날씨와 장소 기반 기능 확장
