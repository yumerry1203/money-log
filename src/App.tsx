import { useCallback, useEffect, useState } from 'react'
import DesignGuide from './components/DesignGuide'
import Header from './components/Header'
import TransactionModal, { type TransactionFormValues } from './components/TransactionModal'

function isDesignGuidePage() {
  return window.location.hash === '#design-guide'
}

function App() {
  const [showDesignGuide, setShowDesignGuide] = useState(isDesignGuidePage)
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false)
  const [, setRegisteredTransactions] = useState<TransactionFormValues[]>([])

  useEffect(() => {
    const updatePage = () => setShowDesignGuide(isDesignGuidePage())

    window.addEventListener('hashchange', updatePage)

    return () => window.removeEventListener('hashchange', updatePage)
  }, [])

  const openTransactionModal = useCallback(() => setIsTransactionModalOpen(true), [])
  const closeTransactionModal = useCallback(() => setIsTransactionModalOpen(false), [])
  const registerTransaction = useCallback((values: TransactionFormValues) => {
    setRegisteredTransactions((transactions) => [...transactions, values])
  }, [])

  return (
    <div className="min-h-screen bg-background p-5">
      <Header isGuidePage={showDesignGuide} onOpenTransactionModal={openTransactionModal} />
      {showDesignGuide ? <DesignGuide /> : null}
      <TransactionModal isOpen={isTransactionModalOpen} onClose={closeTransactionModal} onSubmit={registerTransaction} />
    </div>
  )
}

export default App
