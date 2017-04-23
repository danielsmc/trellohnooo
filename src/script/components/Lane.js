import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import classNames from 'classnames';
import Card from './Card';
import {moveCard, canMove} from './../State';

const laneTarget = {
  drop(props,monitor) {
  	moveCard(monitor.getItem().taskId,props.id);
  },
  canDrop(props,monitor) {
  	return canMove(monitor.getItem().taskId,props.id);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class Lane extends Component {
	render() {
		const {name,tasks,connectDropTarget, isOver} = this.props;
		const cards = tasks.map((t) => <Card {...t} key={t.id} />);
		const classes = classNames({lane: true, 'lane-hover':isOver});
		return connectDropTarget(
			<div className={classes}>{name}
				<ul>{cards}</ul>
			</div>
		);
	}
};

export default DropTarget("card", laneTarget, collect)(Lane)