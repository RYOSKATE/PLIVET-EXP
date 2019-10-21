import * as React from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Badge from 'react-bootstrap/lib/Badge';
import CtrlButtons from './controle_buttons/CtrlButtons';
import { LangProps, Mode, ModeProps } from '../Props';
import { slot } from '../emitter';
import { DEBUG_STATE } from '../../server';

type Props = LangProps &
  ModeProps & {
    setMode: (mode: Mode) => void;
  };

interface State {
  debugStatus: string;
  debugState: DEBUG_STATE;
}

export default class Menu extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { debugStatus: '', debugState: 'Stop' };
    slot('changeState', (debugState: DEBUG_STATE, step: number) => {
      let debugStatus = '';
      if (debugState === 'Debugging') {
        debugStatus = `Step ${step}`;
      } else {
        debugStatus = debugState;
      }
      this.setState({ debugStatus, debugState });
    });
  }
  render() {
    return (
      <Row>
        <Col lg={12} md={12} sm={12} xs={12} style={{ zIndex: 1000 }}>
          <Row>
            <Col lg={2} md={2} sm={2} xs={2}>
              <Badge>{this.props.mode}</Badge>
            </Col>
            <Col lg={2} md={2} sm={2} xs={2}>
              <Button onClick={() => this.props.setMode('DEMO')}>DEMO</Button>
            </Col>
            <Col lg={2} md={2} sm={2} xs={2}>
              <Button onClick={() => this.props.setMode('EX1')}>実験1</Button>
            </Col>
            <Col lg={2} md={2} sm={2} xs={2}>
              <Button onClick={() => this.props.setMode('EX2')}>実験2</Button>
            </Col>
            <Col lg={2} md={2} sm={2} xs={2}>
              <Button onClick={() => this.props.setMode('EX3')}>実験3</Button>
            </Col>
            <Col lg={2} md={2} sm={2} xs={2}>
              <Button onClick={() => this.props.setMode('EX4')}>実験4</Button>
            </Col>
          </Row>
        </Col>
        <Col lg={12} md={12} sm={12} xs={12}>
          <CtrlButtons
            lang={this.props.lang}
            debugState={this.state.debugState}
          />
        </Col>
        <Col lg={12} md={12} sm={12} xs={12}>
          DebugStatus: {this.state.debugStatus}
        </Col>
      </Row>
    );
  }
}
