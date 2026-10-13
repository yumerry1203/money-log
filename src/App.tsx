import { useEffect, useState } from 'react'
import DesignGuide from './components/DesignGuide'
import Header from './components/Header'

function isDesignGuidePage() {
  return window.location.hash === '#design-guide'
}

function App() {
  const [showDesignGuide, setShowDesignGuide] = useState(isDesignGuidePage)

  useEffect(() => {
    const updatePage = () => setShowDesignGuide(isDesignGuidePage())

    window.addEventListener('hashchange', updatePage)

    return () => window.removeEventListener('hashchange', updatePage)
  }, [])

  return (
    <div className="min-h-screen bg-background p-5">
      <Header isGuidePage={showDesignGuide} />
      {showDesignGuide ? <DesignGuide /> : null}
    </div>
  )
}

export default App
