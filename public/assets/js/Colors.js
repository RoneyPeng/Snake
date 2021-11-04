import { randomIntInRange } from './utils';

const Colors = {
	Black: '#000',
	Red: '#f00',
	Purple: '#ad00e5',
	Blue: '#00f',
	Yellow: '#ff0',
	Orange: '#ffa500',
	Snake: '#69ead9',
	Pink: '#ff00c8'
};

const randomColor = (currentColor = undefined) => {
	let idx = randomIntInRange(0, Object.keys(Colors).length - 1);

	if (!currentColor) return Colors[Object.keys(Colors)[idx]];

	while (currentColor === Colors[Object.keys(Colors)[idx]]) {
		idx = randomIntInRange(0, Object.keys(Colors).length - 1);
	}

	return Colors[Object.keys(Colors)[idx]];
};

export { randomColor };
export default Colors;
