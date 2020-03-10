import React, { useState } from 'react';
import { BrowserQRCodeReader } from '@zxing/library';
import { Stage, Layer, Text } from 'react-konva';
import { POS1 } from 'js-aruco';
import DotCmp from './DotCmp';

const CANVAS_SIZE = 640;
const VeideoScanner = () => {
  const [results, setResults] = useState('');
  const [coordinates, setCoordinates] = useState([]);
  const codeReader = new BrowserQRCodeReader();

  const getQrCodeResult = deviceList => {
    if (deviceList.length > 0)
      codeReader
        .decodeFromInputVideoDevice(deviceList[0].deviceId, 'video')
        .then(result => {
          if (result.resultPoints.length < 4)
            result.resultPoints.push({
              x: result.resultPoints[2].x,
              y: result.resultPoints[0].y,
              estimatedModuleSize: result.resultPoints[0].estimatedModuleSize,
            });

          let modelSize = result.resultPoints[0].estimatedModuleSize * 10;
          let posit = new POS1.Posit(modelSize, CANVAS_SIZE);

          let pose = posit.pose(result.resultPoints);
          setCoordinates(pose.bestTranslation);
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
      <div>X: {Number(coordinates[0]).toFixed(2)}</div>
      <div>Y: {Number(coordinates[1]).toFixed(2)}</div>
      <div>Distance/Z: {Number(coordinates[2]).toFixed(2)}</div>
      <div className="page">
        <Stage width={CANVAS_SIZE} height={CANVAS_SIZE} key="test">
          <Layer key="test1">
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
    </div>
  );
};

export default VeideoScanner;
