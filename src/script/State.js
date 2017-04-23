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
	task_creation_rate: 1,
	work_capacity: 100
};
let observer = null;

function sum(xs) {
	return xs.reduce((prev, curr) => prev + curr,0);
}

function successMetric(st) {
	const grace = 10;
	const tasks = st.tasks;

	const total = sum(tasks.map((t) => t.value));
	const done = sum(tasks.map((t) => (t.status=="done"?t.value:0)));

	return (done+grace)/total;
}

function calc(st) {
	st.tasks.forEach((t) => (t.age=st.date-t.created_at))
	st.success = successMetric(st);
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

export function canMove(card_id,status) {
	const c = staaaaate.tasks[card_id];
	if (status=="done") {
		return (c.work_done>=c.effort);
	}
	return true;
}

const seconds_per_day = 5;
const ticks_per_second = 10;
const days_per_tick = 1/(seconds_per_day*ticks_per_second);


function tickTrial(r) { // r is per day
	return Math.random() <= r*days_per_tick;
}



window.setInterval(function doTick() {
	if (tickTrial(staaaaate.task_creation_rate)) {
		let task = newTask();
		Object.assign(task, {
			id: staaaaate.tasks.length,
			status: "todo",
			created_at: staaaaate.date,
			work_done: 0
		})
		staaaaate.tasks.push(task);
	};

	const work_demand = sum(staaaaate.tasks.map((t)=> (t.status=="doing"?t.effort:0)));

	const oversub = staaaaate.work_capacity/Math.max(work_demand,staaaaate.work_capacity)

	staaaaate.tasks.forEach((t) => {
		if (t.status == "doing") {
			t.work_done += days_per_tick * oversub;
			t.work_done = Math.min(t.work_done,t.effort);
		}
	})

	staaaaate.date += days_per_tick;
	emitChange();
},1000/ticks_per_second);