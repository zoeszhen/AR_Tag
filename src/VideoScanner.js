import React, { useState } from 'react'
import { BrowserQRCodeReader } from '@zxing/library'

const VeideoScanner = () => {
  const [results, setResults] = useState('')
  const codeReader = new BrowserQRCodeReader()

  const getQrCodeResult = deviceList => {
    console.log('deviceList', deviceList)
    codeReader
      .decodeFromInputVideoDevice(deviceList[0].deviceId, 'video')
      .then(result => setResults(result.text))
      .catch(err => console.error(err))
  }

  const deviceDetector = async () => {
    return codeReader
      .listVideoInputDevices()
      .then(videoInputDevices => videoInputDevices)
      .catch(err => console.error(err))
  }

  return (
    <div>
      <h1>Scan QR code from Video</h1>
      <video id="video"></video>
      <button
        onClick={async () => {
          const deviceLisit = await deviceDetector()
          getQrCodeResult(deviceLisit)
        }}
      >
        Start Scan
      </button>
      <button onClick={() => document.location.reload(false)}>Reset</button>

      <h2>result: {results}</h2>
    </div>
  )
}

export default VeideoScanner
