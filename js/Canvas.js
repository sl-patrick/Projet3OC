export class Canvas {
	constructor(canvas, width, height, color, lineWidth, clearButton, validButton) {
		this.canvas = document.querySelector(canvas);
		this.context = this.canvas.getContext("2d");
		this.clearButton = document.querySelector(clearButton);
		this.validButton = document.querySelector(validButton);
		this.domRect = null;
		this.canvas.width = width;
		this.canvas.height = height;
		this.context.color = color;
		this.context.lineWidth = lineWidth;
		this.draw = false;
		this.x = null;
		this.y = null;
		this.clearButton.addEventListener("click", () => { this.clearCanvas() });
		this.validButton.addEventListener("click", () => { this.validCanvas() });
		//MouseEvent
		this.canvas.addEventListener("mousedown", (event) => { this.launch(event) });
		this.canvas.addEventListener("mousemove", (event) => { this.move(event) });
		this.canvas.addEventListener("mouseup", (event) => { this.end(event) });
		//TouchEvent
		this.canvas.addEventListener("touchstart", (event) => { this.launch(event) });
		this.canvas.addEventListener("touchmove", (event) => { this.move(event) });
		this.canvas.addEventListener("touchend", (event) => { this.end(event) });
	}
	//Méthode qui récupère l'emplacement du canvas par rapport au viewport et qui initialise un nouveau chemin.
	launch(event) {
		this.domRect = this.canvas.getBoundingClientRect();
		event.preventDefault();
		if (event.type === "mousedown") {
			this.x = event.clientX - this.domRect.left;
			this.y = event.clientY - this.domRect.top;
		} else if (event.type === "touchstart") {
			this.x = event.touches[0].clientX - this.domRect.left;
			this.y = event.touches[0].clientY - this.domRect.top;
		}
		this.draw = true;
		this.context.beginPath();
	}
	move(event) {
		event.preventDefault();
		if (this.draw === true && event.type === "mousemove") {
			this.drawing(event.clientX - this.domRect.left, event.clientY - this.domRect.top);
			this.x = event.clientX - this.domRect.left;
			this.y = event.clientY - this.domRect.top;
		} else if (this.draw === true && event.type === "touchmove") {
			this.drawing(event.touches[0].clientX - this.domRect.left, event.touches[0].clientY - this.domRect.top);
			this.x = event.touches[0].clientX - this.domRect.left;
			this.y = event.touches[0].clientY - this.domRect.top;
		}
	}
	//Méthode qui relie le dernier point une fois l'événement mouseup ou touchend est capté.
	end(event) {
		event.preventDefault();
		if (this.draw === true && event.type === "mouseup") {
			this.x = event.clientX - this.domRect.left;
			this.y = event.clientY - this.domRect.top;
		}
		this.draw = false;
		this.context.closePath();
	}
	//Méthode qui récupère les coordonnées des points lors du déplacement pendant la signature.
	drawing(x, y) {
		if (this.draw === true) {
			this.context.moveTo(this.x, this.y); //déplacer.
			this.context.lineTo(x, y);
			this.context.stroke();
		}
	}
	//méthode qui valide la signature du canvas et qui vérifie qu'il a bien été signé.
	validCanvas() {
		let newCanvas = document.createElement("canvas");
		this.canvas.appendChild(newCanvas);
		newCanvas.width = this.canvas.width;
		newCanvas.height = this.canvas.height;
		if (newCanvas.toDataURL() === this.canvas.toDataURL()) {
			document.querySelector(".errorcanvas").innerHTML = "Veuillez signer";
			return false;
		} else {
			let canvasURL = this.canvas.toDataURL();
			sessionStorage.setItem("signature", canvasURL);
			return true;
		}
	}
	// méthode qui éfface le contenu du canvas.
	clearCanvas() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}