class Particle {
	constructor(posX, posY, width, height) {
		this.radius = Math.round(Math.random()*1.5);
		this.posX = posX;
		this.posY = posY;
		this.speed = 1;
		this.randomFactor = Math.random();
		this.height = height;
		this.width = width;
		this.rad = 0;
		this.pulseSpeed = 0.027;
		this.dir = 1;
		this.color = {r:255,g:255,b:255,a:.35};
		this.targetX = 0;
		this.targetY = 0;
		this.sphareInflu = 200;
		this.interaction = false;
	}

	update(){
		if(this.interaction){
			var distanceX = (this.posX - this.targetX);
			var distanceY = (this.posY - this.targetY);

			if(distanceX/2<0 && distanceX/2 >= -this.sphareInflu/2){
				// this.color = {r:0,g:255,b:0,a:1};
				this.posX += .15;
			}else{
				this.posX -= .15;
			}	
			if(distanceY/2<0 && distanceY/2 >= -this.sphareInflu/2){
				// this.color = {r:0,g:255,b:0,a:1};
				this.posY += .15;
			}else{
				this.posY -= .15;
			}
			this.interaction = false;
		}
		else{

			var radians = 0.01;

			this.rad += radians;
			this.posX += Math.cos(this.rad+this.radius)*this.dir;
			this.posY += Math.sin(this.rad+this.radius)*this.dir;

			if(Math.random()<0.005){
				this.dir *= -1;
				this.color.r = 255;
				this.color.g = 100;
			}

			if(Math.random()<0.005){
				this.color.r = 0;
				this.color.b = 255;
				radians -= 5;
			}
			if(Math.random()<0.0025){
				this.dir *= -1;
				this.color.g = 50;
				this.color.b = 0;
			}

			this.color.a += this.pulseSpeed * this.dir;

			if(this.color.a>=1.2 || this.color.a<=.15){
				this.pulseSpeed *= -1;
			}

			if(this.posX>=this.width ||this.posX<=0 || this.posY>=this.height ||this.posY<=0){
				this.speed *= -1;
			}
			
			// console.log(this.targetX)

			this.colorFinal = "rgba("+this.color.r+","+this.color.g+","+this.color.b+","+this.color.a+")";

			this.interaction = false;

			return this.colorFinal; 

		}
		
	}
}

