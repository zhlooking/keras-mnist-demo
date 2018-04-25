import React from 'react';
import KerasJS from 'keras-js';
import { getCoordinates, reduceData } from './utils';
import './css/keras.scss';

export default class Keras extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      result: '',
      modelLoadingProgress: 0,
    };

    this.model = new KerasJS.Model({
      filepath: 'mnist_cnn.bin',
      gpu: true,
      transferLayerOutputs: true,
    });

    this.model.ready().then(() => {
      this.setState({ loading: false });
    });

    this.model.events.on('loadingProgress', this.onLoadingProgress);
  }

  onLoadingProgress = (modelLoadingProgress) => {
    this.setState({ modelLoadingProgress });
  }

  onMouseDown = (evt) => {
    evt.preventDefault();

    this.drawLine(...getCoordinates(evt));
    this.listenMouseMove = true;
  }

  onMouseMove = (evt) => {
    evt.preventDefault();

    if (!this.listenMouseMove) {
      return;
    }

    this.drawLine(...getCoordinates(evt));
  }

  drawEnd = () => {
    if (!this.listenMouseMove) {
      return;
    }

    this.listenMouseMove = false;
    delete this.previousX;
    delete this.previousY;
    this.predict();
  }

  drawLine(x, y) {
    const ctx = this.canvasRef.getContext('2d');
    ctx.lineWidth = 20;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#393E46';
    ctx.beginPath();

    const { previousX, previousY } = this;
    if (previousX !== undefined) {
      ctx.moveTo(previousX, previousY);
    } else {
      ctx.moveTo(x, y);
    }
    ctx.lineTo(x, y);
    ctx.stroke();
    this.previousX = x;
    this.previousY = y;
  }

  predict() {
    const ctx = this.canvasRef.getContext('2d');
    const data = reduceData(ctx.getImageData(0, 0, 280, 280).data);
    const inputData = {
      input: new Float32Array(data),
    };

    this.model.predict(inputData).then((outputData) => {
      const max = outputData.output.reduce((a, b) => Math.max(a, b), 0);
      const result = outputData.output.indexOf(max);
      this.setState({ result });
    });
  }

  clear() {
    const ctx = this.canvasRef.getContext('2d');
    ctx.clearRect(0, 0, 280, 280);
    this.setState({ result: '' });
  }

  handleClear = () => {
    this.clear();
  }

  _renderCanvas() {
    const { loading, modelLoadingProgress } = this.state;
    if (loading) {
      return <div className="mask">{`加载模型中：${modelLoadingProgress}`}</div>;
    }
    return (
      <canvas
        id="demo-canvas"
        width="280"
        height="280"
        ref={(ref) => { this.canvasRef = ref; }}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.drawEnd}
        onMouseLeave={this.drawEnd}
        onTouchStart={this.onMouseDown}
        onTouchMove={this.onMouseMove}
        onTouchEnd={this.drawEnd}
      />
    );
  }

  render() {
    const { result } = this.state;

    return (
      <div id="keras-page">
        <div className="action-wrapper">
          <div className="canvas-wrapper">
            {this._renderCanvas()}
          </div>
          <div className="button-wrapper">
            <button onClick={this.handleClear}>清除</button>
          </div>
          <p style={{ fontSize: '30px', color: 'red' }}>{result}</p>
        </div>
      </div>
    );
  }
}
