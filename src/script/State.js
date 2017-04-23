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
	// task_creation_rate: 2,
	work_capacity: 40,
	// alert: "woooow"
};
let observer = null;

function sum(xs) {
	return xs.reduce((prev, curr) => prev + curr,0);
}

function successMetric(st) {
	const grace = 500;
	const tasks = st.tasks;

	const total = sum(tasks.map((t) => t.value));
	const done = sum(tasks.map((t) => (t.value*(t.status=="rejected"?0:(t.work_done/t.effort)))));

	return 1-(total-done)/grace;
}

function calc(st) {
	st.tasks.forEach((t) => (t.age=st.date-t.created_at))
	st.success = successMetric(st);
	return st;
}

function emitChange() {
  observer(calc(staaaaate));
}

function setAlert(obj) {
	obj.headline = obj.headline || "Alert";
	staaaaate.alert = obj;
}

export function clearAlert() {
	staaaaate.alert = false;
	emitChange();
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
	const c = staaaaate.tasks[card_id];
	const age = staaaaate.date-c.created_at;
	if (status=="done") {
		for (let i=0;i<age;i++) {
			if (Math.random()<0.01) {
				setAlert({text: "Sorry, the requirements changed and we didn't need to do that after all. Did you not see the email?"});
				status = "rejected";
				break;
			}
		}
	}
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
const days_per_ms = 1/(seconds_per_day*1000);


function tickTrial(r,time) { // r is per day
	return Math.random() <= r*time; //this is not strictly accurate
}

let lastTick = 0;

function doTick(thisTick) {
	const tickLen = days_per_ms*(thisTick-lastTick);
	lastTick = thisTick;

	staaaaate.date += tickLen;

	const task_creation_rate = 1 + 0.25 * staaaaate.date
	if (tickTrial(task_creation_rate,tickLen)) {
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
			t.work_done += tickLen * oversub;
			t.work_done = Math.min(t.work_done,t.effort);
		}
	})

	if (successMetric(staaaaate) < 0) {
		setAlert({text:"You are fired.", special: "dog"});
	} else {
		requestAnimationFrame(doTick);
	}

	emitChange();
};

requestAnimationFrame(doTick);
