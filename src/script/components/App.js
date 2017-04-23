import React, { Component } from 'react';
import Calendar from './Calendar';
import Lane from './Lane';
import { observe } from '../State';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


class App extends Component {
  constructor(props) {
    super(props);
    this.unobserve = observe(this.handleChange.bind(this));
  }

  handleChange(newState) {
    if (this.state) {
      this.setState(newState);
    } else {
      this.state = newState;
    }
  }

  componentWillUnmount() {
    this.unobserve();
  }

  render() {
    const { lanes, tasks, date } = this.state;
    const lane_nodes = lanes.map((l) => {
      const lane_tasks = tasks.filter((t) => (t.status === l.id));
      return <Lane {...l} tasks={lane_tasks} key={l.id} />;
    });
    return <div>
      <Calendar days={date} />
      <div className="board">{lane_nodes}</div>
    </div>;
  }
}

export default DragDropContext(HTML5Backend)(App);