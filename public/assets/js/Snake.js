import Direction from './Direction';
import { WIDTH_CANVAS, HEIGHT_CANVAS } from './main'

class Snake {
	#color;
	#nodes = [];

	constructor(node) {
		this.#color = node.color;
		this.#nodes.push(node);

		const { x, d } = node;
		const nodeOne = node.clone();
		const nodeTwo = node.clone();

		nodeOne.x = x - d;
		nodeTwo.x = x - 2 * d;

		this.#nodes.push(nodeOne);
		this.#nodes.push(nodeTwo);
	}

	get color() {
		return this.#color;
	}
	set color(color) {
		this.#color = color;
	}

	get nodes() {
		return this.#nodes;
	}
	set nodes(nodes) {
		this.#nodes = nodes;
	}

	draw() {
		this.#nodes.forEach((node, idx) => {
			if (!idx) {
				this.nodes[0].drawCircle();
				this.nodes[0].color = '#00b600'
			} else {
				node.drawCircle();
			}
		});
	}

	move(dirSnake) {
		if (dirSnake.dir === Direction.None) return;

		const { x, y, d } = this.#nodes[0];
		const sizeSnake = this.#nodes.length;
		const tempNode = this.getTailNode();

		for (let i = sizeSnake - 1; i >= 1; i--) {
			this.#nodes[i].updateUseNode(this.#nodes[i - 1]);
		}

		switch (dirSnake.dir) {
			case Direction.Up:
				this.#nodes[0].update(x, y - d);
				break;

			case Direction.Down:
				this.#nodes[0].update(x, y + d);
				break;

			case Direction.Left:
				this.#nodes[0].update(x - d, y);
				break;

			case Direction.Right:
				this.#nodes[0].update(x + d, y);
				break;
		}
		tempNode.clear();
	}

	getTailNode() {
		return this.#nodes[this.#nodes.length - 1].clone();
	}

	eat(food) {
		if (this.#nodes[0].isEqualsUseNode(food)) {
			this.#nodes.push(this.getTailNode());
			return true;
		}
		return false;
	}

	isDie(dirSnake) {
		if (this.#nodes[0].x <= 0 && dirSnake.dir == Direction.Left) {
			return true
		}

		if (this.#nodes[0].x >= WIDTH_CANVAS - this.#nodes[0].d && dirSnake.dir == Direction.Right) {
			return true
		}

		if (this.#nodes[0].y <= 0 && dirSnake.dir == Direction.Up) {
			return true
		}

		if (this.#nodes[0].y >= HEIGHT_CANVAS - this.#nodes[0].d && dirSnake.dir == Direction.Down) {
			return true
		}

	}

	suicide() {
		const snakeSize = this.#nodes.length
		for (let i = 1; i < snakeSize; i++) {
			if (this.#nodes[i].isEqualsUseNode(this.#nodes[0])) {
				return true
			}
		}
		return false
	}
}

export default Snake;
