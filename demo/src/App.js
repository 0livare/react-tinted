import React, {useState} from 'react'
import {TintedWheel} from 'react-tinted'

import './App.scss'
import {TintedPalette, colorModes} from 'react-tinted'

function App() {
  const [mode, setMode] = useState(colorModes.ANALOGOUS)

  return (
    <div className='my-color-wheel tinted--dark'>
      <TintedWheel colorCount={5} mode={mode}>
        <TintedPalette />
      </TintedWheel>

      <select
        onChange={e => setMode(e.target.value)}
        className='my-mode-picker'
      >
        {Object.values(colorModes).map(mode => (
          <option value={mode}>{mode}</option>
        ))}
      </select>
    </div>
  )
}

export default App
