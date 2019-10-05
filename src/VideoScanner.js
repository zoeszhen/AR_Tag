import React, { useState } from 'react'
import { BrowserQRCodeReader } from '@zxing/library'
import sample from './assets/sample_code.png'

const VeideoScanner = () => {
  const [results, setResults] = useState('')

  const getQrCodeResult = url => {
    const codeReader = new BrowserQRCodeReader()
    codeReader
      .decodeFromImage('sample_code', url)
      .then(result => setResults(result.text))
      .catch(err => console.error(err))
  }
  return (
    <div>
      <h1>Static QR code scaning</h1>
      <img src={sample} alt="log" id="sample_code" />
      <button onClick={() => getQrCodeResult(sample)}>Start Scan</button>
      <div>result: {results}</div>
    </div>
  )
}

export default VeideoScanner
