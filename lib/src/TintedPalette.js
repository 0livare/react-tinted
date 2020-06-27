import React, {useEffect, useRef} from 'react'
import {TintedPalette as Palette} from 'tinted'
import cs from 'classnames'
import chroma from 'chroma-js'

import {useWheel} from './TintedWheel'

export function TintedPalette(props) {
  const {className, ...rest} = props
  const wheel = useWheel()

  const rootElRef = useRef()
  const paletteRef = useRef()
  const [hexColors, setHexColors] = useState([])

  useEffect(() => {
    if (!wheel) return
    let palette = new Palette({container: rootElRef.current, colorWheel: wheel})

    wheel.dispatch.on('bind-data.reactPalette', data => {
      palette.render(data, wheel)
    })

    wheel.dispatch.on('markers-updated.reactPalette', () => {
      palette.onColorValuesChanged(wheel.currentMode)
    })

    wheel.dispatch.on('update-end.reactPalette', () => {
      let colorData = wheel._getVisibleMarkers().data()
      let hexColors = colorData.map(d => chroma(d.color).hex())
      setHexColors(hexColors)
    })

    return () => {
      wheel.dispatch.on('bind-data.reactPalette', null)
      wheel.dispatch.on('markers-updated.reactPalette', null)
      wheel.dispatch.on('update-end.reactPalette', null)
    }
  }, [wheel])

  useEffect(() => {
    if (wheel) return
    paletteRef.current
  })

  // Throw an error if multiple child elements are passed
  React.Children.only(children)

  return (
    <div
      {...rest}
      ref={rootElRef}
      className={cs('tinted-palette', className)}
    ></div>
  )
}

// Stolen from tinted/src/util.js
function markerDistance(i) {
  return Math.ceil(i / 2) * Math.pow(-1, i + 1)
}
