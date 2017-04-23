import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import Meter from './Meter';

const cardSource = {
  beginDrag(props) {
    return {taskId: props.id};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Card extends Component {
  render() {
    const { connectDragSource, isDragging, name, effort, value, age, work_done } = this.props;
    return connectDragSource(
		<li className="card">
			{name}
			<ul>
				<li>Effort: {effort}</li>
				<li>Value: {value}</li>
				<li>Age: {Math.floor(age)} days</li>
				<li><Meter name="Progress" filled={work_done} total={effort} /></li>
			</ul>
		</li>
	);
  }
}


export default DragSource("card", cardSource, collect)(Card);