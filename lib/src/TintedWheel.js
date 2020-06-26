import React, {useContext, useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'
import cs from 'classnames'

import {TintedWheel as ColorWheel} from 'tinted'

const WheelContext = React.createContext(null)

export function useWheel() {
  return useContext(WheelContext)
}

export function TintedWheel(props) {
  const {
    children,
    className,
    colorCount,
    customColors,
    radius,
    markerWidth,
    markerOutlineWidth,
    margin,
    defaultSlice,
    initRoot,
    mode,
    colorWheelImage,
    onColorsChanged,
    onMarkersUpdated,
    ...rest
  } = props

  const rootElRef = useRef()
  const [wheel, setWheel] = useState(null)

  useEffect(() => {
    let defaultMargin = markerWidth / 2 + markerOutlineWidth
    let finalMargin = typeof margin === 'number' ? margin : defaultMargin

    let wheel = new ColorWheel({
      container: rootElRef.current,
      radius,
      markerWidth,
      markerOutlineWidth,
      margin: finalMargin,
      defaultSlice,
      initRoot,
      initMode: mode,
      colorWheelImage,
    })

    setWheel(wheel)
  }, [])

  useEffect(() => {
    if (!wheel) return
    let data = customColors || colorCount
    wheel.bindData(data)
  }, [wheel, colorCount, customColors])

  useEffect(() => {
    if (!wheel) return
    wheel.setMode(mode)
  }, [wheel, mode])

  useEffect(() => {
    if (!wheel || !onColorsChanged) return
    wheel.dispatch.on('bindData.reactWheel', data =>
      onColorsChanged(data, wheel),
    )
    return () => {
      wheel.dispatch.on('bindData.reactWheel', null)
    }
  }, [wheel, onColorsChanged])

  useEffect(() => {
    if (!wheel || !onMarkersUpdated) return
    wheel.dispatch.on('markersUpdated.reactWheel', () =>
      onMarkersUpdated(mode, wheel),
    )
    return () => {
      wheel.dispatch.on('markersUpdated.reactWheel', null)
    }
  }, [wheel, onMarkersUpdated])

  return (
    <>
      <svg
        {...rest}
        ref={rootElRef}
        className={cs('tinted-wheel', className)}
      ></svg>
      <WheelContext.Provider value={wheel}>{children}</WheelContext.Provider>
    </>
  )
}

TintedWheel.propTypes = {
  colorCount: PropTypes.number,
  customColors: PropTypes.array,
  radius: PropTypes.number,
  markerWidth: PropTypes.number,
  markerOutlineWidth: PropTypes.number,
  margin: PropTypes.number,
  defaultSlice: PropTypes.number,
  initRoot: PropTypes.string,
  mode: PropTypes.oneOf(Object.values(ColorWheel.MODES)),
  colorWheelImage: PropTypes.string,
  onColorsChanged: PropTypes.func,
  onMarkersUpdated: PropTypes.func,
}

TintedWheel.defaultProps = {
  colorCount: 5,
  radius: 100,
  markerWidth: 25,
  markerOutlineWidth: 1,
  defaultSlice: 20,
  initRoot: 'red',
  mode: ColorWheel.MODES.ANALOGOUS,
  colorWheelImage: 'https://zposten.github.io/tinted/wheel.png',
}
