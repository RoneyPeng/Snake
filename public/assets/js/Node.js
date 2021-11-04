class Node {
	#canvasCtx;
	#x;
	#y;
	#width;
	#height;
	#color;
	#r;
	#d;

	constructor(canvasCtx, x, y, width, height, color = undefined) {
		this.#canvasCtx = canvasCtx;
		this.#x = x;
		this.#y = y;
		this.#width = width;
		this.#height = height;

		if (color) {
			this.#color = color;
		}

		if (width === height) {
			this.#r = width / 2;
			this.#d = width;
		}
	}

	get x() {
		return this.#x;
	}
	set x(x) {
		this.#x = x;
	}

	get y() {
		return this.#y;
	}
	set y(y) {
		this.#y = y;
	}

	get width() {
		return this.#width;
	}
	set width(width) {
		this.#width = width;
	}

	get height() {
		return this.#height;
	}
	set height(height) {
		this.#height = height;
	}

	get color() {
		return this.#color;
	}
	set color(color) {
		this.#color = color;
	}

	get canvasCtx() {
		return this.#canvasCtx;
	}
	set canvasCtx(canvasCtx) {
		this.#canvasCtx = canvasCtx;
	}

	get r() {
		return this.#r;
	}

	get d() {
		return this.#d;
	}

	clone() {
		return new Node(this.#canvasCtx, this.#x, this.#y, this.#width, this.#height, this.#color);
	}

	draw() {
		if (this.#color) {
			this.#canvasCtx.fillStyle = this.#color;
		}

		this.#canvasCtx.fillRect(this.#x, this.#y, this.#width, this.#height);
	}

	drawCircle() {
		if (!this.#r) return;

		this.#canvasCtx.beginPath();
		this.#canvasCtx.fillStyle = this.#color;
		this.#canvasCtx.arc(this.#x + this.#r, this.#y + this.#r, this.#r, 0, 2 * Math.PI);
		this.#canvasCtx.fill();
		this.#canvasCtx.closePath();
	}

	clear() {
		this.#canvasCtx.clearRect(this.#x, this.#y, this.#width, this.#height);
	}

	update(x, y) {
		this.#x = x;
		this.#y = y;
	}

	updateUseNode(node) {
		this.#x = node.x;
		this.#y = node.y;
	}

	equals(node) {
		this.#x = node.x;
		this.#y = node.y;
		this.#width = node.width;
		this.#height = node.height;
		this.#color = node.color;
	}

	isEquals(x, y, width, height) {
		return this.#x === x && this.#y === y && this.#width === width && this.#height === height;
	}

	isEqualsUseNode(node) {
		return this.#x === node.x && this.#y === node.y && this.#width === node.width && this.#height === node.height;
	}
}

export default Node;
