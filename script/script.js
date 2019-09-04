var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 1300;
canvas.height = 650;

var familias = [];
var data = [];
var bug = 0;
var pause = false;

//Local
//var geracao = localStorage.getItem('geracao');
if (geracao == null) {var geracao = 1}

//loading
//var load = JSON.parse(localStorage.getItem("save"));
//Object.assign(data, load);

var character = new Principal();
data.push(character);

canvas.addEventListener("mousemove", function(e){

	if (e.clientX > 0 &&
		e.clientY > 0 &&
		e.clientX < canvas.width &&
		e.clientY < canvas.height) {
		character.x = e.offsetX;
		character.y = e.offsetY;
	}
});

cria(40);

function loop() {
if (data.length <= 1) {geracao++;/*localStorage.setItem('geracao', geracao);*/window.location.reload();}
	render();
	update();
	clean();
	window.requestAnimationFrame(loop);
}

function update() {
colide();
//gravidade();
for (i in data) {
	data[i].update();
	
	if (familias.indexOf(data[i].family) == -1 ) {
		familias.push(data[i].family);
	}
	//save
	//localStorage.setItem("save", JSON.stringify(data));
}

if (bug >= 600) {virus();bug=0;} else {bug++;} //libera o virus num certo periodo
}


function render() {
ctx.clearRect(0,0,canvas.width,canvas.height); //limpa Tela
/*
for (i in data) {
	ctx.fillStyle = data[i].color;
	ctx.fillRect(data[i].x, data[i].y, data[i].width, data[i].height);
} */

ctx.fillStyle = "White";
ctx.fillText("F:"+data.length,2,16);			
ctx.fillText("Fm:"+familias.length,2,32);	
ctx.fillText("G:"+geracao,2,48);	
}


function gravidade(){
for (i in data) {
	if (data[i].y + data[i].height < canvas.height) {data[i].y += 3;}
}
}


function colide() {
for (i in data) {
	for (o in data) {
		if (i != o) {
			if (data[i].x + data[i].radius > data[o].x &&
				data[i].y + data[i].radius > data[o].y &&
				data[i].x < data[o].x + data[o].radius &&
				data[i].y < data[o].y + data[o].radius
				) {

				if (data[i].g == "m" && data[o].g == "f" && data[i].family != data[o].family){ 
					if (data.length <= 199 && data[i].h != "v" && data[o].h != "v") {
							
						if (data[i].p >= 100) {
							nascer(data[i].x, data[i].y, data[o].family, data[i].family);data[i].p=0;
						}
						if (data[o].p >= 100) {
							nascer(data[o].x, data[o].y, data[i].family, data[o].family);data[o].p=0;
						}
					} 
				}

				if (data[i].g == "x") {
					data[o].life = 0;
					character.radius++;
					//alert(o); //bug aqui 	
				}

				if (data[i].h == "v") {data[o].h = "v"; data[o].color = "rgba(255, 255, 255, 1)";} // transmite contaminação do virus
			}
		}
	}
}
}

function cria(qnt) {
for (let i = 0; i < qnt; i++) {
	if (rand(0,1) == 0) {gender = "m"} else {gender = "f"}//         W   H   R   F
	part = new Objeto(rand(0, canvas.width), rand(0, canvas.height), 20, 20, 12, i, i, gender, randCor());
	data.push(part); 
}
}

function nascer(x,y,p,m) {
if (rand(0,1) == 0) {gender = "m"} else {gender = "f"}
part = new Objeto(x, y, 20, 20, 12, p, m, gender, randCor())
data.push(part); 
}

function clean() {
for (i in data) {
	if (data[i].life <= 0) {
		familias.splice(familias.indexOf(data[i].family), 1);
		data.splice(data.indexOf(data[i]), 1);
	}
}
}

function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randCor() {
	var c1 = rand(0, 255); //Red
var c2 = rand(0, 255); // Green
var c3 = rand(0, 255); // Blue
var c4 = Math.random() * 1; //alfa
return "rgb("+c1+","+c2+","+c3+")";
}

function virus() {
	data[rand(0,data.length - 1)].h = "v";
}

function menu(e) {
	if (e == 13) {
		if (pause) {pause = false;} else {pause = true;}
	}

	if (pause) {
		if (paused) {
 		paused = false;
 		loop();
 	} else {
 		paused = true;
 		saida("PAUSED", canvas.width / 2 - 90, canvas.height / 2, "60px ArialBlack", "blue")
 	}

		

	menu(null);
	}
}


loop();	