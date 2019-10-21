import React from 'react'
import { Rect } from 'react-konva'

const DotsCmp = ({ x, y, estimatedModuleSize }) => {
  return (
    <Rect
      x={x}
      y={y}
      width={estimatedModuleSize}
      height={estimatedModuleSize}
      fill="green"
      shadowBlur={5}
      onClick={() => {}}
    />
  )
}

export default DotsCmp
