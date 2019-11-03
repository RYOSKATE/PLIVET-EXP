import * as React from 'react';
import { Layer, Arrow, Rect, Text } from 'react-konva';
import StackRect from './StackRect';
import {
  CanvasDrawer,
  CanvasStack,
  CanvasArrow,
  CanvasCell
} from './CanvasDrawer';
import TextWithRect from './TextWithRect';
import { slot } from '../emitter';
import hexToRgba from '../Color';
interface Props {
  canvasDrawer: CanvasDrawer;
  canvasWidth: number;
}

interface State {
  canvasStacks: CanvasStack[];
  canvasArrows: CanvasArrow[];
}
let arrowRGB = '#03AF7A';
export default class CanvasContent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { canvasStacks: [], canvasArrows: [] };
    slot('redraw', () => {
      this.updatePos();
    });
  }

  makeStacks(canvasStacks: CanvasStack[]) {
    const list = canvasStacks.map(canvasStack => (
      <StackRect key={canvasStack.key} canvasStack={canvasStack} />
    ));
    return list;
  }

  makeArrows(canvasArrows: CanvasArrow[]) {
    const list = canvasArrows.map(canvasArrow => {
      const { from, mid, to, key, color } = canvasArrow;
      const rgbaColor = hexToRgba(color);
      return (
        <Arrow
          key={key}
          points={[from.x, from.y, mid.x, mid.y, to.x, to.y]}
          tension={0.25} // 0だと折れ線
          stroke={rgbaColor}
          // stroke={colors[index % colors.length]} // |(storoke)部分
          // strokeWidth={4}
          fill={rgbaColor} // △(pointer)部分
          pointerLength={10}
          pointerWidth={10}
          opacity={1.0}
        />
      );
    });
    return list;
  }

  makeRemarks() {
    const rectWidth = 180;
    const xOrigin = this.props.canvasWidth - rectWidth;

    return (
      <>
        <Rect
          x={xOrigin}
          y={2}
          width={rectWidth}
          height={CanvasCell.FONT_SIZE * 2.4}
          stroke={`black`}
        />
        <Text
          x={xOrigin + 1}
          y={5}
          fontFamily="Consolas, 'Courier New', monospace"
          text="赤字"
          align={'center'}
          width={50}
          verticalAlign="middle"
          fontSize={CanvasCell.FONT_SIZE}
          fill={TextWithRect.ACCENT_COLOR}
        />
        <Text
          x={xOrigin + 50}
          y={5}
          fontFamily="Consolas, 'Courier New', monospace"
          text=": 新規/変更"
          fontSize={CanvasCell.FONT_SIZE}
        />
        <Arrow
          points={[
            xOrigin + 5,
            1.5 * CanvasCell.HEIGHT,
            xOrigin + 25,
            1.2 * CanvasCell.HEIGHT,
            xOrigin + 45,
            1.5 * CanvasCell.HEIGHT
          ]}
          tension={0.25} // 0だと折れ線
          stroke={arrowRGB}
          fill={arrowRGB} // △(pointer)部分
          pointerLength={10}
          pointerWidth={10}
          opacity={1.0}
        />
        <Text
          x={xOrigin + 50}
          y={CanvasCell.HEIGHT}
          fontFamily="Consolas, 'Courier New', monospace"
          text=": ポインタ参照"
          fontSize={CanvasCell.FONT_SIZE}
        />
      </>
    );
  }

  updatePos() {
    this.props.canvasDrawer.updatePos();
    this.forceUpdate();
  }

  render() {
    const canvasStacks = this.props.canvasDrawer.getCanvasStacks();
    const canvasArrows = this.props.canvasDrawer.getCanvasArrows();
    const stacks = this.makeStacks(canvasStacks);
    const arrows = this.makeArrows(canvasArrows);
    const remarks = this.makeRemarks();
    return (
      <React.Fragment>
        <Layer>{stacks}</Layer>
        <Layer>{arrows}</Layer>
        <Layer>{remarks}</Layer>
      </React.Fragment>
    );
  }
}
