import { SummaryCard } from './common'

const TransactionPage = () => {
  return (
    <div className="grid w-full max-w-7xl gap-2 py-[3.2rem]">
      <h1 className="mt-[0.4rem] p-2 text-3xl font-bold text-text">거래 내역
        <div className="mt-[0.4rem] text-xl">수입과 지출 내역을 조회화고 관리하세요.</div>
      </h1>

      <section aria-label="거래 요약" className="grid gap-2 md:grid-cols-3">
        <SummaryCard data={{ description: '지난달보다 +0%', title: '총 수입', value: '3,000,000원' }} variant="income" />
        <SummaryCard data={{ description: '지난달보다 -12%', title: '총 지출', value: '1,250,000원' }} variant="expense" />
        <SummaryCard variant="expense" />
      </section>
    </div>
  )
}

export default TransactionPage
