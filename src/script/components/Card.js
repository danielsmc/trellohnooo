import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import classNames from 'classnames';
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
    const { connectDragSource, isDragging, id, name, effort, value, age, work_done,status } = this.props;
    const classes = classNames({card: true, 'card-beingdragged':isDragging});
    const newsound = (work_done==0 && status=="todo")?<audio src="audio/new-card.wav" autoPlay="true" />:null;
    const readysound = (work_done==effort && status=="doing")?<audio src="audio/ready.wav" autoPlay="true" />:null;
    return connectDragSource(
		<div className={classes}>
      <div className="card-title">Card {id} <span className="card-age">{Math.floor(age)} days old</span></div>
			<div className="card-effort"><strong>{effort}</strong> effort</div>
      <div className="card-value"><strong>{value}</strong> pts</div>
			<p className="card-task">{name}</p>
			<Meter filled={work_done} total={effort} />
      {newsound}{readysound}
		</div>
	);
  }
}


export default DragSource("card", cardSource, collect)(Card);
