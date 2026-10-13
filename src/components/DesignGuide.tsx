import type { ReactNode } from 'react'
import { Button, Checkbox, DatePicker, Input, Radio, Select, Textarea } from './common'

type GuideSectionProps = {
  children: ReactNode
  description: string
  title: string
}

type ExampleProps = {
  children: ReactNode
  title: string
}

const categories = [
  { label: '식비', value: 'food' },
  { label: '카페', value: 'cafe' },
  { label: '교통', value: 'transport' },
]

function GuideSection({ children, description, title }: GuideSectionProps) {
  return (
    <section className="w-full bg-background p-5">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-text">{title}</h2>
        <p className="mt-1 text-sm text-text-muted">{description}</p>
      </div>
      {children}
    </section>
  )
}

function Example({ children, title }: ExampleProps) {
  return (
    <div className="grid content-start gap-3 rounded-lg bg-surface p-4">
      <p className="text-sm font-semibold text-text">{title}</p>
      {children}
    </div>
  )
}

function DesignGuide() {
  return (
    <div className="grid w-full max-w-7xl gap-5 py-8">
      <h1 className="p-5 mt-1 text-3xl font-bold text-text">공통 컴포넌트 가이드</h1>

      <GuideSection description="브랜드, 지출, 수입, 보조 버튼의 기본·hover·비활성 상태를 확인한다." title="버튼">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Example title="브랜드">
            <Button>등록하기</Button>
            <Button disabled>등록하기</Button>
          </Example>
          <Example title="지출">
            <Button variant="secondary">지출하기</Button>
            <Button disabled variant="secondary">
              지출하기
            </Button>
          </Example>
          <Example title="수입">
            <Button variant="income">수입하기</Button>
            <Button disabled variant="income">
              수입하기
            </Button>
          </Example>
          <Example title="보조">
            <Button variant="ghost">취소하기</Button>
            <Button disabled variant="ghost">
              취소하기
            </Button>
          </Example>
        </div>
      </GuideSection>

      <GuideSection description="기본, 입력됨, 오류, 비활성 상태를 제공한다. 빈 입력 필드를 클릭하면 focus 상태를 확인할 수 있다." title="입력 필드">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Example title="기본 / 포커스">
            <Input label="금액" placeholder="금액을 입력하세요." />
          </Example>
          <Example title="입력됨">
            <Input defaultValue="48,000원" label="금액" />
          </Example>
          <Example title="오류">
            <Input defaultValue="abc" error="숫자만 입력해주세요." label="금액" />
          </Example>
          <Example title="비활성">
            <Input defaultValue="48,000원" disabled label="금액" />
          </Example>
        </div>
      </GuideSection>

      <GuideSection description="여러 줄의 보조 내용을 입력할 때 사용한다. 빈 텍스트 영역을 클릭하면 focus 상태를 확인할 수 있다." title="텍스트 영역">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Example title="기본 / 포커스">
            <Textarea label="메모" placeholder="메모를 입력하세요. (선택)" />
          </Example>
          <Example title="입력됨">
            <Textarea defaultValue="점심 식사와 카페 지출입니다." label="메모" />
          </Example>
          <Example title="오류">
            <Textarea error="메모는 500자 이내로 입력해주세요." label="메모" />
          </Example>
          <Example title="비활성">
            <Textarea defaultValue="점심 식사와 카페 지출입니다." disabled label="메모" />
          </Example>
        </div>
      </GuideSection>

      <GuideSection description="카테고리처럼 정해진 항목 중 하나를 선택할 때 사용한다." title="Select Box">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <Example title="기본 / 포커스">
            <Select label="카테고리" options={categories} placeholder="카테고리를 선택하세요." />
          </Example>
          <Example title="선택됨">
            <Select defaultValue="food" label="카테고리" options={categories} />
          </Example>
          <Example title="비활성">
            <Select disabled label="카테고리" options={categories} placeholder="카테고리를 선택하세요." />
          </Example>
        </div>
      </GuideSection>

      <GuideSection description="Checkbox는 여러 항목을 선택할 때, Radio는 하나의 항목만 선택할 때 사용한다." title="선택 컴포넌트">
        <div className="grid gap-4 md:grid-cols-2">
          <Example title="Checkbox">
            <Checkbox label="다음에도 이 내용으로 계속 등록하기" />
            <Checkbox defaultChecked label="다음에도 이 내용으로 계속 등록하기" />
            <Checkbox disabled label="다음에도 이 내용으로 계속 등록하기" />
          </Example>
          <Example title="Radio Box">
            <Radio label="지출" name="transaction-type" value="expense" />
            <Radio defaultChecked label="지출" name="transaction-type-selected" value="expense" />
            <Radio disabled label="지출" name="transaction-type-disabled" value="expense" />
          </Example>
        </div>
      </GuideSection>

      <GuideSection description="거래 날짜를 입력할 때 사용한다. 빈 날짜 필드를 클릭하면 브라우저 기본 달력과 focus 상태를 확인할 수 있다." title="Datepicker">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Example title="기본 / 포커스">
            <DatePicker label="거래 날짜" />
          </Example>
          <Example title="선택됨">
            <DatePicker defaultValue="2026-10-13" label="거래 날짜" />
          </Example>
          <Example title="오류">
            <DatePicker error="거래 날짜를 선택해주세요." label="거래 날짜" />
          </Example>
          <Example title="비활성">
            <DatePicker defaultValue="2026-10-13" disabled label="거래 날짜" />
          </Example>
        </div>
      </GuideSection>
    </div>
  )
}

export default DesignGuide
