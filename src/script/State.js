import newTask, {pick} from './model/taskFactory';

let staaaaate = {
	lanes: [
		{id: "todo", name: "To Do"},
		{id: "doing", name: "In Progress"},
		{id: "done", name: "Done"},
	],
	tasks: [
		// {id: 1, name: "Frobulate the containment grid", status: "todo"}
	],
	date: 0,
	task_creation_rate: 5,
	work_capacity: 24
};
let observer = null;

function calc(st) {
	st.tasks.forEach((t) => (t.age=st.date-t.created_at))
	return st;
}

function emitChange() {
  observer(calc(staaaaate));
}

export function observe(o) {
  if (observer) {
    throw new Error('Multiple observers not implemented.');
  }

  observer = o;
  emitChange();

  return () => {
    observer = null;
  };
};

export function moveCard(card_id,status) {
	staaaaate.tasks[card_id].status = status;
	emitChange();
}

const seconds_per_day = 5;
const ticks_per_second = 10;


function tickTrial(r) { // r is per day
	return Math.random() <= r/(seconds_per_day*ticks_per_second);
}



window.setInterval(function doTick() {
	if (tickTrial(staaaaate.task_creation_rate)) {
		let task = newTask();
		Object.assign(task, {
			id: staaaaate.tasks.length,
			status: "todo",
			created_at: staaaaate.date
		})
		staaaaate.tasks.push(task);
	};

	// if (tickTrial(10) && staaaaate.tasks.length) {
	// 	moveCard(pick(staaaaate.tasks).id,
	// 			 pick(staaaaate.lanes).id);
	// }

	staaaaate.date += 1/(seconds_per_day*ticks_per_second);
	emitChange();
},1000/ticks_per_second);