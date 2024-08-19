import { useState } from 'react'
import './App.css'

import { TechRadar } from './components/TechRadar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='content'>
      <TechRadar/>
    </div>
  )
}

export default App
