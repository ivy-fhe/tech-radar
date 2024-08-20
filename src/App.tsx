import { useState } from 'react'
import './App.css'

import { TechRadar } from './components/TechRadar'

function App() {
  const [count, setCount] = useState(0)
  window.addEventListener('keyup', (event) => {
    console.log(event.key);
  });
  return (
    
    <div className='content'>
      <TechRadar/>
    </div>
  )
}

export default App
