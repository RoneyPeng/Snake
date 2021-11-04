import Direction from './Direction';

const randomIntInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const pollEvent = (dirSnake) =>
	window.addEventListener('keydown', (evt) => {
		switch (evt.key) {
			case 'ArrowUp':
			case 'w':
			case 'W':
				if (dirSnake.dir !== Direction.Down) {
					dirSnake.dir = Direction.Up;
				}
				break;

			case 'ArrowDown':
			case 's':
			case 'S':
				if (dirSnake.dir !== Direction.Up) {
					dirSnake.dir = Direction.Down;
				}
				break;

			case 'ArrowLeft':
			case 'a':
			case 'A':
				if (dirSnake.dir !== Direction.Right && dirSnake.dir !== Direction.None) {
					dirSnake.dir = Direction.Left;
				}
				break;

			case 'ArrowRight':
			case 'd':
			case 'D':
				if (dirSnake.dir !== Direction.Left) {
					dirSnake.dir = Direction.Right;
				}
				break;
		}
	});

export { randomIntInRange, pollEvent };
