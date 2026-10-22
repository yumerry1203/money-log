import { useCallback, useEffect, useState } from 'react'
import DesignGuide from './components/DesignGuide'
import Header from './components/Header'
import TransactionModal, { type TransactionFormValues } from './components/TransactionModal'

type Page = 'dashboard' | 'transactions' | 'design-guide'

function getCurrentPage(): Page {
  if (window.location.hash === '#transactions') return 'transactions'
  if (window.location.hash === '#design-guide') return 'design-guide'

  return 'dashboard'
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(getCurrentPage)
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false)
  const [, setRegisteredTransactions] = useState<TransactionFormValues[]>([])

  useEffect(() => {
    const updatePage = () => setCurrentPage(getCurrentPage())

    window.addEventListener('hashchange', updatePage)

    return () => window.removeEventListener('hashchange', updatePage)
  }, [])

  const openTransactionModal = useCallback(() => setIsTransactionModalOpen(true), [])
  const closeTransactionModal = useCallback(() => setIsTransactionModalOpen(false), [])
  const registerTransaction = useCallback((values: TransactionFormValues) => {
    setRegisteredTransactions((transactions) => [...transactions, values])
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-background p-5">
      <Header activePage={currentPage} onOpenTransactionModal={openTransactionModal} />
      {currentPage === 'design-guide' ? <DesignGuide /> : null}
      {currentPage !== 'design-guide' ? (
        <section className="mt-5 flex flex-1 items-center justify-center rounded-lg border border-border bg-background px-6 text-center">
          <p className="text-sm text-text-muted">
            {currentPage === 'dashboard' ? '대시보드 화면 작업중입니다.' : '거래 내역 화면 작업중입니다.'}
          </p>
        </section>
      ) : null}
      <TransactionModal isOpen={isTransactionModalOpen} onClose={closeTransactionModal} onSubmit={registerTransaction} />
    </div>
  )
}

export default App
