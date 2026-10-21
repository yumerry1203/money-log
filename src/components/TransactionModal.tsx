import { useEffect, useRef, useState } from 'react'
import { Button, Checkbox, DatePicker, Input, Radio, Select, Textarea } from './common'

type TransactionType = 'expense' | 'income'

export type TransactionFormValues = {
  amount: string
  category: string
  date: string
  memo: string
  repeat: boolean
  title: string
  type: TransactionType
}

type TransactionModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (values: TransactionFormValues) => void
}

type FormErrors = Partial<Record<keyof TransactionFormValues, string>>

const expenseCategories = [
  { label: '식비', value: 'food' },
  { label: '카페', value: 'cafe' },
  { label: '교통', value: 'transport' },
  { label: '쇼핑', value: 'shopping' },
  { label: '주거비', value: 'housing' },
  { label: '문화·여가', value: 'leisure' },
  { label: '의료비', value: 'medical' },
]

const incomeCategories = [
  { label: '급여', value: 'salary' },
  { label: '부수입', value: 'side-income' },
  { label: '용돈', value: 'allowance' },
  { label: '기타', value: 'other-income' },
]

function createInitialValues(): TransactionFormValues {
  const today = new Date()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return {
    amount: '',
    category: '',
    date: `${today.getFullYear()}-${month}-${day}`,
    memo: '',
    repeat: false,
    title: '',
    type: 'expense',
  }
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24">
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  )
}

function TransactionModal({ isOpen, onClose, onSubmit }: TransactionModalProps) {
  const [values, setValues] = useState<TransactionFormValues>(createInitialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLFormElement>(null)
  const triggerElementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    triggerElementRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const frameId = window.requestAnimationFrame(() => closeButtonRef.current?.focus())

    return () => {
      window.cancelAnimationFrame(frameId)
      triggerElementRef.current?.focus()
      triggerElementRef.current = null
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  const categories = values.type === 'expense' ? expenseCategories : incomeCategories
  const typeLabel = values.type === 'expense' ? '지출' : '수입'

  const updateValue = <Key extends keyof TransactionFormValues>(key: Key, value: TransactionFormValues[Key]) => {
    setValues((currentValues) => ({ ...currentValues, [key]: value }))
    setErrors((currentErrors) => ({ ...currentErrors, [key]: undefined }))
  }

  const changeType = (type: TransactionType) => {
    setValues((currentValues) => ({ ...currentValues, category: '', type }))
    setErrors((currentErrors) => ({ ...currentErrors, category: undefined, type: undefined }))
  }

  const handleClose = () => {
    setValues(createInitialValues())
    setErrors({})
    onClose()
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors: FormErrors = {}

    if (!values.date) {
      nextErrors.date = '거래 날짜를 선택해주세요.'
    }
    if (!values.category) {
      nextErrors.category = '카테고리를 선택해주세요.'
    }
    if (!values.amount.trim()) {
      nextErrors.amount = '금액을 입력해주세요.'
    } else if (!/^\d+$/.test(values.amount.trim()) || Number(values.amount) <= 0) {
      nextErrors.amount = '0보다 큰 숫자만 입력해주세요.'
    }
    if (!values.title.trim()) {
      nextErrors.title = '거래처 또는 제목을 입력해주세요.'
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    onSubmit({ ...values, amount: values.amount.trim(), title: values.title.trim() })
    handleClose()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      handleClose()
      return
    }

    if (event.key !== 'Tab') {
      return
    }

    const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])',
    )

    if (!focusableElements || focusableElements.length === 0) {
      return
    }

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault()
      lastElement.focus()
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault()
      firstElement.focus()
    }
  }

  return (
    <div
      aria-labelledby="transaction-modal-title"
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-center bg-text/35 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose()
        }
      }}
      role="dialog"
    >
      <form
        className="max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-y-auto rounded-xl border border-border bg-background p-6 shadow-xl"
        onKeyDown={handleKeyDown}
        onSubmit={handleSubmit}
        ref={dialogRef}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-text" id="transaction-modal-title">
              거래 등록
            </h2>
            <p className="mt-1 text-sm text-text-muted">새로운 거래 내역을 추가한다.</p>
          </div>
          <button
            aria-label="거래 등록 모달 닫기"
            className="inline-flex size-10 items-center justify-center rounded-md text-text hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            onClick={handleClose}
            ref={closeButtonRef}
            type="button"
          >
            <CloseIcon />
          </button>
        </div>

        <fieldset className="mt-6">
          <legend className="text-sm font-medium text-text">거래 유형</legend>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <Radio checked={values.type === 'expense'} label="지출" name="transaction-type" onChange={() => changeType('expense')} value="expense" />
            <Radio checked={values.type === 'income'} label="수입" name="transaction-type" onChange={() => changeType('income')} value="income" />
          </div>
        </fieldset>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <DatePicker error={errors.date} label="거래 날짜" onChange={(event) => updateValue('date', event.target.value)} value={values.date} />
          <Select
            error={errors.category}
            label="카테고리"
            onChange={(event) => updateValue('category', event.target.value)}
            options={categories}
            placeholder={`${typeLabel} 카테고리를 선택하세요.`}
            value={values.category}
          />
          <Input
            error={errors.amount}
            inputMode="numeric"
            label="금액"
            onChange={(event) => updateValue('amount', event.target.value)}
            placeholder="금액을 입력하세요."
            value={values.amount}
          />
          <Input
            error={errors.title}
            label="거래처 / 제목"
            onChange={(event) => updateValue('title', event.target.value)}
            placeholder="거래처나 제목을 입력하세요."
            value={values.title}
          />
        </div>

        <div className="mt-5">
          <Textarea label="메모" onChange={(event) => updateValue('memo', event.target.value)} placeholder="메모를 입력하세요. (선택)" value={values.memo} />
        </div>

        <div className="mt-5">
          <Checkbox checked={values.repeat} label="다음에도 이 내용으로 계속 등록하기" onChange={(event) => updateValue('repeat', event.target.checked)} />
        </div>

        <div className="mt-6 flex justify-end gap-3 border-t border-border pt-5">
          <Button onClick={handleClose} variant="ghost">
            취소
          </Button>
          <Button type="submit">등록하기</Button>
        </div>
      </form>
    </div>
  )
}

export default TransactionModal
