import React from 'react'
import PropTypes from 'prop-types'
import {TintedWheel as ColorWheel} from 'tinted'

export function TintedWheel(props) {
  return (
    <div>
      Wheel
      {props.children}
    </div>
  )
}

TintedWheel.propTypes = {}

TintedWheel.defaultProps = {}
