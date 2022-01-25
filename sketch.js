let drops = [];
let colors = ['#f42539', '#ff8119', '#ffc618', '#faea3e','#56ac51', '#48bc9f', '#39cced', '#4178f4', '#9819fa', '#fe84fe']
let pos = [];
let seg = 15;
let cSize;

function setup() {
	createCanvas(windowWidth, windowHeight);
	cSize = width / seg;
	for(let i=0; i<seg; i++){
		for(let j=0; j<seg; j++){
			if((i+j)%2 == 0){
				let x = i * cSize + cSize / 2;
				let y = j * cSize + cSize / 2;
				pos.push({x:x, y:y, col:random(colors)});
			}
		}
	}
	cSize *= 0.75;
}

function draw() {
	translate(width/2, height/2);
	scale(0.9);
	translate(-width/2, -height/2);
	background(20);
	for(let i of pos){
		noStroke();
		fill(i.col);
		circle(i.x, i.y, cSize);
	}	

	for(let i=0; i<drops.length; i++){
		drops[i].run();
	}

	for(let i=0; i<drops.length; i++){
		if(drops[i].isDead){
			drops.splice(i, 1);
		}
	}

	if(random() < 0.1){
		addDrops();
	}
}

function addDrops(){
	let n = int(random(pos.length));
	let p = pos[n];
	let theta = random(0.25, 0.75) * PI;
	let x =	p.x + cSize * 0.4 * cos(theta);
	let y = p.y + cSize * 0.4 * sin(theta);
	drops.push(new Drop(x, y, p.col));
}

class Drop{
	constructor(x, y, col){
		this.x0 = x;
		this.y0 = y;
		this.x = x;
		this.y = y;
		this.v = 0;
		this.a = 0.3;
		this.size = random(0.1, 0.3) * cSize;
		this.col = col;
		this.sw = this.size;
		this.isDead = false;
	}

	show(){
		noStroke();
		fill(this.col);
		ellipse(this.x, this.y, this.size);
		if(this.sw > 0.1){
			noFill();
			stroke(this.col);
			strokeWeight(this.sw);
			line(this.x0, this.y0, this.x, this.y);
		}
	}

	move(){
		this.y += this.v;
		this.v += this.a;
		this.sw -= this.v*0.02;
		if(this.y > height * 1.5)this.isDead = true;
	}

	run(){
		this.move();
		this.show();
	}
}