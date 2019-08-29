Objeto = function(x, y, w, h, r, p, m, g, color) {
	this.pai = p;
	this.mae = m;
	this.family = this.pai + this.mae;
	this.g = g; //gender m/f
	this.p = 0; //pregnancy
	this.h = "g"; //health, g=good / v=virus
	this.x = x;
	this.y = y;
	this.radius = r;
	this.width = w;
	this.height = h;
	this.color = color;
	this.life = 1000;
	this.vx = 0.1; //max 3
	this.vy = 0.1; //max 3
	this.delay = 90;
	this.dir = 0;

	this.update = () => {
		this.movimento();
		this.draw();

		if (this.vx < 3.0) {this.vx += 0.001}
		if (this.vy < 3.0) {this.vy += 0.001}

		if (this.g == "m") {this.color = "Blue";} else {this.color = "red";}
		if (this.life < 100) {this.color = "grey";}
		if (this.life > 800) {this.color = "green";}
		if (this.p >= 100) {this.color = randCor();} //#DF01A5
		if (this.p >= 150) {this.p = 0} //reseta o periodo fertil
		if (this.h == "v") {this.color = "white";}
		if (this.h == "v") {this.life -= 5;this.vx = 3.5;this.vy = 3.5;} //Diminui o tempo de vida caso infectado
	}

	this.movimento =  () => {
		if (this.delay <= 0) {
			this.dir = Math.floor(Math.random() * (8 - 0 + 1));
			this.delay = 10;
		} else {this.delay--;}

		switch(this.dir) {
			case 0:
				this.life-=1; // Diminui a vida toda vez que parado
				if (this.g == "f"){this.p++}; //incrementa o periodo fertil
				break;
			case 1:
				if (this.x + this.radius < canvas.width){this.x+=this.vx;}
				break;
			case 2:
				if (this.y + this.radius < canvas.height) {this.y+=this.vy;}
				break;
			case 3:
				if (this.x - this.radius > 0) {this.x-=this.vx;}
				break;
			case 4:
				if (this.y - this.radius > 0) {this.y-=this.vy;}
				break;
			case 5:
				if (this.x + this.radius < canvas.width){this.x+=this.vx;this.y-=this.vy;}
				break;
			case 6:
				if (this.y + this.radius < canvas.height) {this.x+=this.vx;this.y+=this.vy;}
				break;
			case 7:
				if (this.x - this.radius > 0) {this.x-=this.vx;this.y+=this.vy;}
				break;
			case 8:
				if (this.y - this.radius > 0) {this.x-=this.vx;this.y-=this.vy;}
				break;
		}
	}

	this.draw = () => {

		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();


		ctx.font = "18px Arial";
		ctx.fillStyle = "white";
		ctx.fillText(this.g.toUpperCase(), this.x - 5, this.y + 5); //g.toUpperCase()
	}

}

Principal = function () {
	this.width = 0;
	this.height = 0;
	this.radius = 10;
	this.color = "yellow";
	this.g = "x";
	this.x = 100;
	this.y = 100;
	this.life = 1;
	this.h = "g";

	this.update = () => {
		this.draw();
	}

	this.draw = () => {

		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();


		ctx.font = "18px Arial";
		ctx.fillStyle = "Black";
		ctx.fillText(this.g.toUpperCase(), this.x - 5, this.y + 5); //g.toUpperCase()
	}
}