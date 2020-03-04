import React, { useState } from 'react';
import { BrowserQRCodeReader } from '@zxing/library';
import { Stage, Layer, Text } from 'react-konva';
import DotCmp from './DotCmp';

const VeideoScanner = () => {
  const [results, setResults] = useState('');
  const codeReader = new BrowserQRCodeReader();

  const getQrCodeResult = deviceList => {
    codeReader
      .decodeFromInputVideoDevice(deviceList[0].deviceId, 'video')
      .then(result => {
        console.log('result', result);
        setResults(result);
      })
      .catch(err => console.error(err));
  };

  const deviceDetector = async () => {
    return codeReader
      .listVideoInputDevices()
      .then(videoInputDevices => videoInputDevices)
      .catch(err => console.error(err));
  };

  return (
    <div>
      <div className="page">
        <Stage width={640} height={640}>
          <Layer>
            <Text text="Try click on rect1" />
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
        <video id="video"></video>
      </div>
      <div>
        <button
          onClick={async () => {
            console.log('comeher');
            const deviceLisit = await deviceDetector();
            getQrCodeResult(deviceLisit);
          }}
        >
          Start Scan
        </button>
        <button onClick={() => document.location.reload(false)}>Reset</button>
        {/* <h2>result: {results}</h2> */}
      </div>
    </div>
  );
};

export default VeideoScanner;
