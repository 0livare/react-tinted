import React, {useEffect, useRef} from 'react'
import {TintedPalette as Palette} from 'tinted'
import cs from 'classnames'

import {useWheel} from './TintedWheel'

export function TintedPalette(props) {
  const {className, ...rest} = props
  const wheel = useWheel()

  const rootElRef = useRef()
  const paletteRef = useRef()

  useEffect(() => {
    if (!wheel) return
    let palette = new Palette({container: rootElRef.current, colorWheel: wheel})

    wheel.dispatch.on('bindData.reactPalette', data =>
      palette.render(data, wheel),
    )
    wheel.dispatch.on('markersUpdated.reactPalette', () => {
      palette.onColorValuesChanged(wheel.currentMode)
    })

    return () => {
      wheel.dispatch.on('bindData.reactPalette', null)
      wheel.dispatch.on('markersUpdated.reactPalette', null)
    }
  }, [wheel])

  useEffect(() => {
    if (wheel) return
    paletteRef.current
  })

  return (
    <div
      {...rest}
      ref={rootElRef}
      className={cs('tinted-palette', className)}
    ></div>
  )
}
