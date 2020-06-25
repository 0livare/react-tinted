import React, {useContext, useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'

import {TintedWheel as ColorWheel} from 'tinted'

const WheelContext = React.createContext({
  wheel: null,
  data: 5,
})

export function useWheel() {
  return useContext(WheelContext)
}

export function TintedWheel(props) {
  const {
    children,
    data,
    radius,
    markerWidth,
    markerOutlineWidth,
    margin,
    defaultSlice,
    initRoot,
    mode,
    colorWheelImage,
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
    wheel.bindData(data)
  }, [])

  useEffect(() => {
    if (!wheel) return
    wheel.setMode(mode)
  }, [mode])

  return (
    <>
      <div {...rest} ref={rootElRef}></div>
      <WheelContext.Provider value={{wheel, data}}>
        {children}
      </WheelContext.Provider>
    </>
  )
}

TintedWheel.propTypes = {
  data: PropTypes.any,
  radius: PropTypes.number,
  markerWidth: PropTypes.number,
  markerOutlineWidth: PropTypes.number,
  margin: PropTypes.number,
  defaultSlice: PropTypes.number,
  initRoot: PropTypes.string,
  mode: PropTypes.oneOf(Object.values(ColorWheel.MODES)),
  colorWheelImage: PropTypes.string,
}

TintedWheel.defaultProps = {
  data: 5,
  radius: 100,
  markerWidth: 25,
  markerOutlineWidth: 1,
  defaultSlice: 20,
  initRoot: 'red',
  mode: ColorWheel.MODES.ANALOGOUS,
  colorWheelImage: 'https://zposten.github.io/tinted/demo/wheel.png',
}
