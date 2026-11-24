import type { ReactNode } from 'react'

type SummaryCardVariant = 'income' | 'expense'

type SummaryCardData = {
  description: string
  title: string
  value: string
}

type SummaryCardProps = {
  data?: SummaryCardData
  icon?: ReactNode
  variant?: SummaryCardVariant
}

const GraphIcon = () => {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 48 48">
      <path d="M7 40V28h7v12H7Zm14 0V18h7v22h-7Zm14 0V7h7v33h-7Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
    </svg>
  )
}

const variantClassNames: Record<SummaryCardVariant, { icon: string; label: string }> = {
  income: {
    icon: 'bg-income-light text-income-text',
    label: 'text-income-text',
  },
  expense: {
    icon: 'bg-secondary-light text-danger',
    label: 'text-danger',
  },
}

const SummaryCard = ({ data, icon, variant = 'income' }: SummaryCardProps) => {
  if (!data) {
    return (
      <article className="flex min-h-16 items-center justify-center rounded-lg border border-border bg-background p-2 text-center">
        <p className="text-sm text-text-muted">아직 데이터가 없어요</p>
      </article>
    )
  }

  const styles = variantClassNames[variant]

  return (
    <article className="flex min-h-16 items-center rounded-lg border border-border bg-background p-2">
      <div className="flex min-w-0 items-center gap-1">
        <div className={`flex size-4 shrink-0 items-center justify-center rounded-full ${styles.icon}`}>{variant === 'income' ? '↑' : '↓'}</div>
        <p className={`truncate text-lg font-semibold ${styles.label}`}>{data.title}</p>
      </div>

      <div className="ml-auto flex items-end gap-2">
        <div className="text-right">
          <p className="text-3xl font-bold text-text">{data.value}</p>
          <p className="mt-[0.4rem] text-sm text-text-muted">{data.description}</p>
        </div>
        <div className={`flex size-5 shrink-0 items-center justify-center rounded-md ${styles.icon}`}>{icon ?? <GraphIcon />}</div>
      </div>
    </article>
  )
}

export default SummaryCard
export type { SummaryCardData, SummaryCardProps, SummaryCardVariant }
