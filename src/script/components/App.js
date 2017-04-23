import React, { Component } from 'react';
import Alert from './Alert';
import Calendar from './Calendar';
import Meter from './Meter';
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
    const { lanes, tasks, date, success, alert } = this.state;
    const lane_nodes = lanes.map((l) => {
      let lane_tasks = tasks.filter((t) => (t.status === l.id));
      lane_tasks.reverse();
      return <Lane {...l} tasks={lane_tasks} key={l.id} />;
    });
    return <div>
      <Calendar days={date} />
      <Meter name="Success" filled={success} total='1' />
      <div className="board">{lane_nodes}</div>
      <Alert text={alert} />
    </div>;
  }
}

export default DragDropContext(HTML5Backend)(App);