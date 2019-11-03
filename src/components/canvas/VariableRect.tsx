import React from 'react';
import { Group } from 'react-konva';
import { CanvasRow, CanvasCell } from './CanvasDrawer';
import TextWithRect from './TextWithRect';

interface Props {
  canvasRow: CanvasRow;
}

interface State {}

export default class VariableRect extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const canvasRow = this.props.canvasRow;
    const list = canvasRow.map(
      (cell: CanvasCell, index: number, array: CanvasCell[]) => {
        const { width, isVisible, key } = cell;
        const x = cell.x();
        const y = cell.y();
        const text = cell.getText();
        const canToggleFold = cell.canToggleFold();
        console.log(`key:${key},text:${text}`);
        return (
          <TextWithRect
            key={key}
            x={x}
            y={y}
            text={text}
            width={width}
            align={canToggleFold ? 'center' : undefined}
            onClick={canToggleFold ? () => cell.toggleFold() : undefined}
            isVisible={isVisible}
            colors={cell.getColors()}
            isValueCell={index === array.length - 2}
          />
        );
      }
    );
    return <Group>{list}</Group>;
  }
}
