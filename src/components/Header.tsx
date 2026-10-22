import logo from '../assets/money-log-wordmark-3d.png'

const weekDays = ['일', '월', '화', '수', '목', '금', '토']

function formatToday() {
  const today = new Date()

  return `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일 (${weekDays[today.getDay()]})`
}

function HomeIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24">
      <path
        d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path d="M9 21v-7h6v7" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

function ListIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24">
      <path d="M9 6h11M9 12h11M9 18h11" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      <path d="M4 6h.01M4 12h.01M4 18h.01" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  )
}

type HeaderProps = {
  isGuidePage: boolean
  onOpenTransactionModal: () => void
}

function Header({ isGuidePage, onOpenTransactionModal }: HeaderProps) {
  return (
    <header className="flex min-h-13 items-center gap-6 rounded-lg border border-border bg-background px-6 py-2.5 text-text shadow-sm">
      <a aria-label="Money Log 홈" className="shrink-0" href="#dashboard">
        <img alt="Money Log" className="w-36" src={logo} />
      </a>

      <nav aria-label="주요 메뉴" className="flex items-center gap-1">
        <a
          aria-current="page"
          className="flex items-center gap-2 rounded-md bg-primary-light px-4 py-2 text-sm font-semibold"
          href="#dashboard"
        >
          <HomeIcon />
          대시보드
        </a>
        <a className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold hover:bg-surface" href="#transactions">
          <ListIcon />
          거래 내역
        </a>
        <button
          className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          onClick={onOpenTransactionModal}
          type="button"
        >
          <PlusIcon />
          지출 등록
        </button>
      </nav>

      <div className="ml-auto flex shrink-0 items-center gap-3">
        <time className="text-sm text-text-muted">{formatToday()}</time>
        <a
          aria-current={isGuidePage ? 'page' : undefined}
          className={`rounded-md border px-3 py-1.5 text-xs font-semibold ${isGuidePage ? 'border-primary bg-primary-light text-primary' : 'border-border text-text hover:bg-surface'}`}
          href="#design-guide"
        >
          디자인 가이드
        </a>
      </div>
    </header>
  )
}

export default Header
