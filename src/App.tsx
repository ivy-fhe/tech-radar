import './App.css'

import { TechRadar } from './components/TechRadar'

function App() {
  localStorage.clear();
  return (
    <div className='content'>
      <TechRadar/>
    </div>
  )
}

export default App
