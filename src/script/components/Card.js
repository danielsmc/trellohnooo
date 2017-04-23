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
    const { connectDragSource, isDragging, id, name, effort, value, age, work_done } = this.props;
    return connectDragSource(
		<div className="card">
      <div className="card-title">Card {id} <span className="card-age">{Math.floor(age)} days old</span></div>
			<div className="card-effort"><strong>{effort}</strong> effort</div>
      <div className="card-value"><strong>{value}</strong> pts</div>
			<p className="card-task">{name}</p>
			<Meter filled={work_done} total={effort} />
		</div>
	);
  }
}


export default DragSource("card", cardSource, collect)(Card);
