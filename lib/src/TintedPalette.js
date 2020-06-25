import {useEffect} from 'react'
import {TintedPalette as Palette} from 'tinted'

import {useWheel} from './TintedWheel'

export function TintedPalette(props) {
  const {wheel, data} = useWheel()

  useEffect(() => {
    if (!wheel) return
    new Palette(wheel)
    wheel.bindData(data)
  }, [!!wheel])

  return null
}
