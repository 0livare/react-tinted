import React, {useState} from 'react'
import {TintedWheel, TintedPalette, colorModes} from 'react-tinted'

import './App.scss'

function App() {
  const [mode, setMode] = useState(colorModes.ANALOGOUS)

  return (
    <div className='my-color-wheel tinted--dark'>
      <TintedWheel
        colorCount={5}
        mode={mode}
        onColorsChanged={colors => {
          console.log('colors', colors)
        }}
      >
        <TintedPalette>
          <button>Add</button>
        </TintedPalette>
      </TintedWheel>

      <select
        value={mode}
        onChange={e => setMode(e.target.value)}
        className='my-mode-picker'
      >
        {Object.values(colorModes).map(mode => (
          <option key={mode} value={mode}>
            {mode}
          </option>
        ))}
      </select>
    </div>
  )
}

export default App
