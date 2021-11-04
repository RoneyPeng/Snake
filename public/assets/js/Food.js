import Node from './Node';

class Food extends Node {
	constructor(node) {
		super(node.canvasCtx, node.x, node.y, node.width, node.height, node.color);
	}

	isError(snake) {
		const snakeSize = snake.nodes.length;
		for (let i = 0; i < snakeSize; i++) {
			if (snake.nodes[i].isEquals(super.x, super.y, super.width, super.height)) {
				return true;
			}
		}

		return false;
	}
}

export default Food;
