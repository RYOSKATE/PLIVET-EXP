import * as React from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Canvas from './canvas/Canvas';
// tslint:disable-next-line:import-name
import ContainerDimensions from 'react-container-dimensions';
import ScaleMenu from './canvas/scales/ScaleMune';
// import ThemeButton from './menus/controle_buttons/ThemeButton';
import { LangProps } from './Props';
import Button from 'react-bootstrap/lib/Button';
import { deleteLog } from '../utils/log';

type Props = LangProps;

interface State {
  scale: number;
}

export default class CanvasSide extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { scale: 1.0 };
    this.onScaleChange = this.onScaleChange.bind(this);
  }
  onScaleChange = (scale: number) => {
    this.setState({ scale });
  };
  render() {
    return (
      <Row ref="canvasContainer">
        <Col
          lg={10}
          md={10}
          sm={10}
          xs={10}
          xsOffset={1}
          smOffset={1}
          mdOffset={1}
          lgOffset={1}
        >
          <ScaleMenu
            min={0.1}
            max={2.0}
            scale={this.state.scale}
            onScaleChange={this.onScaleChange}
          />
        </Col>
        <Col lg={1} md={1} sm={1} xs={1}>
          <Button onClick={() => deleteLog()}>記録終了</Button>
        </Col>
        <Col lg={12} md={12} sm={12} xs={12}>
          <ContainerDimensions>
            {({ width, height }: { width: number; height: number }) => (
              <Canvas width={width} height={height} scale={this.state.scale} />
            )}
          </ContainerDimensions>
        </Col>
      </Row>
    );
  }
}
