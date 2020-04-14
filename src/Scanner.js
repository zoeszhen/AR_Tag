import React, { useState } from 'react';
import { BrowserQRCodeReader } from '@zxing/library';
import sample from './assets/sample_code.png';
import { Stage, Layer, Text } from 'react-konva';
import DotCmp from './DotCmp';

const Scanner = () => {
  const [results, setResults] = useState('');

  const getQrCodeResult = (url) => {
    const codeReader = new BrowserQRCodeReader();
    codeReader
      .decodeFromImage('sample_code', url)
      .then((result) => {
        console.log('result', JSON.stringify(result.resultPoints));
        setResults(result);
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="page">
      {/* <h2>result: {results}</h2> */}
      <Stage width={1200} height={1200}>
        <Layer>
          <Text text="Try click on rect" />
          {results.resultPoints &&
            results.resultPoints.map((point, index) => (
              <DotCmp
                key={index}
                x={point.x}
                y={point.y}
                estimatedModuleSize={point.estimatedModuleSize}
              />
            ))}
        </Layer>
      </Stage>
      <img src={sample} alt="log" id="sample_code" />
      <button onClick={() => getQrCodeResult(sample)}>Start Scan</button>
    </div>
  );
};
// test

export default Scanner;
