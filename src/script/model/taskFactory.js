import {compounds} from './json/compounds.json';
import {encouraging_words} from './json/encouraging_words.json';
import {technologies} from './json/new_technologies.json';
import {appliances} from './json/appliances.json';
import {colors} from './json/crayola.json'

const design_elements = ["button", "header", "background", "text", "accent"];

function randRange(min,max) {
	return min + (max-min)*Math.random();
}

export function pick() {
	const choices = arguments.length==1 ? arguments[0] : arguments;
	return choices[Math.floor(choices.length*Math.random())];
}

function recase(str) {
	return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

function imagineName() {
	const comp = pick(compounds);

	return recase(pick(
		`Make ${comp.compoundWord} ${pick("more","less")} ${pick(comp.firstWord,comp.secondWord)}`,
		`${pick(design_elements)} should be ${pick("more","less")} ${pick(encouraging_words)}`,
		`Can't launch without ${pick(technologies)} support`,
		`Troubleshoot ${pick(appliances)} interface`,
		`Change ${pick(design_elements)} color from ${pick(colors).color} to ${pick(colors).color}`
		));
}

export default function newTask() {
	return {name: imagineName(),
		    effort: Math.floor(randRange(5,11)),
			value: Math.floor(randRange(5,11))
		};
}