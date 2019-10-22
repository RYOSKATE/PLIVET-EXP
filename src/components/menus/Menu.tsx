import * as React from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import CtrlButtons from './controle_buttons/CtrlButtons';
import { LangProps, Mode, ModeProps } from '../Props';
import { slot } from '../emitter';
import { DEBUG_STATE } from '../../server';
import { saveLog, flushLogToSave, addLog } from '../../utils/log';

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
  renderBtns() {
    const list = [];
    const modes: Mode[] = ['DEMO', 'EX1', 'EX2', 'EX3', 'EX4'];
    for (const mode of modes) {
      list.push(
        <Col lg={2} md={2} sm={2} xs={2} key={mode}>
          <Button
            bsStyle={this.props.mode === mode ? 'primary' : 'default'}
            onClick={() => {
              this.props.setMode(mode);
              flushLogToSave();
              addLog(mode);
            }}
          >
            {mode}
          </Button>
        </Col>
      );
    }
    return list;
  }
  render() {
    return (
      <Row>
        <Col lg={12} md={12} sm={12} xs={12} style={{ zIndex: 1000 }}>
          <Row>
            {this.renderBtns()}
            <Col lg={2} md={2} sm={2} xs={2}>
              <Button onClick={() => saveLog()}>終了</Button>
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
