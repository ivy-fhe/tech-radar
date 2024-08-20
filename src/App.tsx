import { useState } from 'react'
import './App.css'

import { TechRadar } from './components/TechRadar'

function App() {
  const [count, setCount] = useState(0)
  window.addEventListener('keyup', (event) => {
    let elements = document.getElementsByClassName('expanded');
    for(let i = 0; i < elements.length; i++){
      if(elements[i]){
        elements[i].classList.remove('expanded');
        elements[i].classList.add('collapsed');
      }
      
    }
  });
  return (
    
    <div className='content'>
      <TechRadar/>
    </div>
  )
}

export default App
