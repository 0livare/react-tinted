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

    wheel.dispatch.on('bind-data.reactPalette', data =>
      palette.render(data, wheel),
    )
    wheel.dispatch.on('markers-updated.reactPalette', () => {
      palette.onColorValuesChanged(wheel.currentMode)
    })

    return () => {
      wheel.dispatch.on('bind-data.reactPalette', null)
      wheel.dispatch.on('markers-updated.reactPalette', null)
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
