import {compounds} from './json/compounds.json';
import {encouraging_words} from './json/encouraging_words.json';
import {technologies} from './json/new_technologies.json';
import {appliances} from './json/appliances.json';
import {colors} from './json/crayola.json';
import tolkienCharacterNames from './json/tolkienCharacterNames.json';
import {deities} from './json/lovecraft.json';

const tolk = tolkienCharacterNames.names.filter((n) => (n.indexOf(" ")==-1))

const design_elements = ["button", "header", "background", "text", "accent"];

const verbs = ["integrate","migrate to","upgrade","troubleshoot","refactor"]

function randRange(min,max) {
	return min + (max-min)*Math.random();
}

export function pick() {
	const choices = arguments.length==1 ? arguments[0] : arguments;
	return choices[Math.floor(choices.length*Math.random())];
}

function recase(str) {
	return str[0].toUpperCase() + str.slice(1);
}

function imagineName(endTimes) {
	const comp = pick(compounds);

	return recase(pick(
		`Make ${comp.compoundWord} ${pick("more","less")} ${pick(comp.firstWord,comp.secondWord)}`,
		`${pick(design_elements)} should be ${pick("more","less")} ${pick(encouraging_words)}`,
		`Can't launch without ${pick(technologies)} support`,
		`${pick(verbs)} ${pick(appliances)} interface`,
		`Change ${pick(design_elements)} color from ${pick(colors).color} to ${pick(colors).color}`,
		`${pick(verbs)} ${pick(endTimes?deities:tolk)} ${pick("framework","API")}`
		));
}

export default function newTask(endTimes) {
	return {name: imagineName(endTimes),
		    effort: Math.floor(randRange(5,21)),
			value: Math.floor(randRange(5,21))
		};
}