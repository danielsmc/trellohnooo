import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

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
    const { connectDragSource, isDragging, name, effort, value, age } = this.props;
    return connectDragSource(
		<li className="card">
			{name}
			<ul>
				<li>Effort: {effort}</li>
				<li>Value: {value}</li>
				<li>Age: {Math.floor(age)} days</li>
			</ul>
		</li>
	);
  }
}


export default DragSource("card", cardSource, collect)(Card);