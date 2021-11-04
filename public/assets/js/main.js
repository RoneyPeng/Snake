import Colors, { randomColor } from './Colors';
import Direction from './Direction';
import Node from './Node';
import Snake from './Snake';
import Food from './Food';
import { pollEvent, randomIntInRange } from './utils';
import swal from 'sweetalert';

const rootElement = document.querySelector('#root');
const intro = document.querySelector('.intro');
const scoreHTML = document.querySelector('.score');
const highscore = document.querySelector('.high-score');
const canvasElement = document.createElement('canvas');
const canvasCtx = canvasElement.getContext('2d');

const scoreBoard = document.createElement('p')
const highScoreBoard = document.createElement('p')


export const WIDTH_CANVAS = 800;
export const HEIGHT_CANVAS = 500;

const COLUMN = 40;
const ROW = 25;

const WIDTH_CELL = WIDTH_CANVAS / COLUMN;
const HEIGHT_CELL = HEIGHT_CANVAS / ROW;

const beautifulBg = () => {
	Object.assign(rootElement.style, {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	});

	canvasElement.width = WIDTH_CANVAS;
	canvasElement.height = HEIGHT_CANVAS;
	rootElement.appendChild(canvasElement);
	scoreHTML.appendChild(scoreBoard);
	highscore.appendChild(highScoreBoard);

};

const drawMap = (canvasCtx, color = undefined) => {
	if (color) {
		canvasCtx.strokeStyle = color;
	}

	for (let i = 0; i <= ROW; i++) {
		canvasCtx.beginPath();
		canvasCtx.moveTo(0, HEIGHT_CELL * i);
		canvasCtx.lineTo(WIDTH_CANVAS, HEIGHT_CELL * i);
		canvasCtx.stroke();
		canvasCtx.closePath();
	}

	for (let i = 0; i <= COLUMN; i++) {
		canvasCtx.beginPath();
		canvasCtx.moveTo(WIDTH_CELL * i, 0);
		canvasCtx.lineTo(WIDTH_CELL * i, HEIGHT_CANVAS);
		canvasCtx.stroke();
		canvasCtx.closePath();
	}
};

const gameStart = () => {
	let score = 0;
	let isLoop;
	const dirSnake = { dir: Direction.None };

	const xSnake = randomIntInRange(2, COLUMN - 1) * WIDTH_CELL;
	const ySnake = randomIntInRange(0, ROW - 1) * HEIGHT_CELL;
	const snakeNode = new Node(canvasCtx, xSnake, ySnake, WIDTH_CELL, HEIGHT_CELL,'#027102');
	const snake = new Snake(snakeNode);

	let xFood = randomIntInRange(2, COLUMN - 1) * WIDTH_CELL;
	let yFood = randomIntInRange(0, ROW - 1) * HEIGHT_CELL;
	let foodNode = new Node(canvasCtx, xFood, yFood, WIDTH_CELL, HEIGHT_CELL, randomColor());
	let food = new Food(foodNode);

	beautifulBg();
	snake.draw();
	// drawMap(canvasCtx);
	
	pollEvent(dirSnake);

	function speed(score) {
		let speed;

		if (score <= 2) speed = 200
		else if (score <= 4) speed = 150
		else if (score <= 6) speed = 100
		else speed = 50

		return speed
	}
	while (food.isError(snake)) {
		xFood = randomIntInRange(2, COLUMN - 1) * WIDTH_CELL;
		yFood = randomIntInRange(0, ROW - 1) * HEIGHT_CELL;
		food = new Food(canvasCtx, xFood, yFood, WIDTH_CELL, HEIGHT_CELL, randomColor());
	}
	let highScore = 0;

	(function animate() {
		setTimeout(() => {
			isLoop = requestAnimationFrame(animate);
			
			if (snake.eat(food)) {
				score++;
				
				xFood = randomIntInRange(2, COLUMN - 1) * WIDTH_CELL;
				yFood = randomIntInRange(0, ROW - 1) * HEIGHT_CELL;
				foodNode = new Node(canvasCtx, xFood, yFood, WIDTH_CELL, HEIGHT_CELL,randomColor());
				food = new Food(foodNode);
				food.drawCircle();
			}
			// canvasCtx.fillText('Score: ' + score, , 40)
			let point = score * (250 - speed(score))
			
			if (snake.isDie(dirSnake) || snake.suicide()) {
				cancelAnimationFrame(isLoop);
				swal({
					title: "GAME OVER!",
					icon: "error",
					button: "Try again",
				  });
				if(highScore !== null){
					if (point > localStorage.getItem("highscore")) {
						localStorage.setItem("highscore", score * (250 - speed(score)));      
					}
				}
				else{
					localStorage.setItem("highscore", score * (250 - speed(score)));
				}
				return gameStart()
			}
			
			snake.move(dirSnake);
			snake.draw();
		}, speed(score));
		scoreBoard.innerHTML = score * (250 - speed(score))
		highScoreBoard.innerHTML = localStorage.getItem("highscore")
		console.log(localStorage.getItem("highscore"));
	})();
	food.drawCircle()
};

gameStart()