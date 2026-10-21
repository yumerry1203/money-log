# MoneyLog Agent Workflow

MoneyLog은 기능 구현부터 화면 검증까지 다음 순서로 작업한다.

1. `developer`가 기능을 구현하고 빌드와 린트를 검증한다.
2. `reviewer`가 읽기 전용으로 변경 코드를 리뷰한다.
3. `api-spec-verifier`가 API, 타입, 기획 명세의 정합성을 검증한다.
4. `device-or-e2e-tester`가 실제 화면과 사용자 흐름을 검증한다.

각 에이전트는 아래 역할 파일을 기준으로 동작한다.

```text
agents/
├── developer.md
├── reviewer.md
├── api-spec-verifier.md
└── device-or-e2e-tester.md
```

현재 MoneyLog에는 실제 API, 거래 데이터, 거래 등록 화면이 구현되어 있지 않다. 해당 범위를 검증할 근거가 없으면 추측하지 않고 `NEEDS_SPEC` 또는 `NOT_IMPLEMENTED`로 보고한다.
