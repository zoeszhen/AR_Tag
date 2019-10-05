import React, { useState } from 'react'
import { BrowserQRCodeReader } from '@zxing/library'
import sample from './assets/sample_code.png'

const Scanner = () => {
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
      <h2>result: {results}</h2>
    </div>
  )
}

export default Scanner
