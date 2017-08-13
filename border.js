class Border {
	constructor(posX, posY, ctx) {
		this.posX = posX;
		this.posY = posY;
		this.speed = 1;
		this.height = this.posY;
		this.width = this.posX;
		this.ctx = ctx;
	}
	draw(){

		if(Math.random() < .25){
			this.posY = Math.random() * this.height;
			this.posX = Math.random() * this.width;
		}

		this.ctx.beginPath();
		this.ctx.moveTo(this.width,this.posY-20);
		this.ctx.lineTo(this.width,this.posY);
		this.ctx.moveTo(this.posX-20,this.height-5);
		this.ctx.lineTo(this.posX,this.height-5);
		this.ctx.strokeStyle="white";
		this.ctx.stroke();
	}
}

