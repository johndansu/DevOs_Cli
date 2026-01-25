import { ImageResponse } from 'next/og'
import React from 'react'

export const runtime = 'edge'

export function GET() {
  return new ImageResponse(
    React.createElement(
      'div',
      {
        style: {
          fontSize: 24,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#00ff00',
          fontFamily: 'monospace',
        },
      },
      '$ _'
    ),
    {
      width: 32,
      height: 32,
    }
  )
}
