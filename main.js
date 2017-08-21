var main = function(){
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;

	var vissibility = 1;
	var parts = [];
	var canvases = new Array();
	var contexts = new Array();
	var particleNum = 200;
	var cntr = 0;
	var mouse = {x:0,y:0};
	var interaction = false;
	var counter = 0;
	var previous = 0;
	var rand = Math.floor(Math.random()* particleNum);

	var init = function(width, height){
		var rowList = document.getElementsByClassName("row");
		var projects = document.getElementsByClassName("projects");
		
		for (let value of rowList) {
		  value.style.height = height/3+"px";
		}
		for (let value of projects) {
			(width<770)?vissibility=0:vissibility=1;
			value.style.opacity = vissibility;
		}
	}

	window.onresize = function(e){
		var ww = window.innerWidth;
		var wh = window.innerHeight;
		windowWidth = ww;
		windowHeight = wh;
		init(ww, wh);
	};

	init(windowWidth, windowHeight);

	var setup = function(){

		var holdersList = document.getElementsByClassName('col-md-4');
			holders = Array.prototype.slice.call(holdersList,0); 

		if(holders.length){
			holders.forEach(function(holder, index){

				canvas = document.createElement('canvas');
				canvas.width = windowWidth/3;
				canvas.height = windowHeight/3;

				canvases[index] = canvas;

				ctx = canvases[index].getContext('2d');
				ctx.id = "ctx_"+index;
				contexts[index] = ctx;

				holder.appendChild(canvases[index]);
				parts[index] = [];

				for(var i=0;i<particleNum;i++){
					parts[index][i] = new Particle(Math.random()*canvas.width, Math.random()*canvas.height, canvas.width, canvas.height);
				}
				
			});
		}

	}

	setup();

	function loop(){
		clear();
		draw();
		requestAnimationFrame(loop);
	}

	function draw(){
		holders.forEach(function(holder, index){
			for(var i=0;i<particleNum;i++){

				parts[index][i].update();
				// interAction(parts[index][i]);

				var x = parts[index][i].posX;
				var y = parts[index][i].posY;

				var x2 = parts[index][rand].posX;
				var y2 = parts[index][rand].posY;				

				var x3 = mouse.x;
				var y3 = mouse.y;

				var dist = (x2 - x)*(x2 - x) + (y2 - y)*(y2 - y);
				var dist2 = (x3 - x)*(x3 - x) + (y3 - y)*(y3 - y);

				dist = Math.sqrt(dist);
				dist2 = Math.sqrt(dist2);

				ctx = contexts[index];

				if(dist<=canvas.width/5){
					ctx.beginPath();
					ctx.moveTo(x,y);
					ctx.lineTo(x2,y2);
					ctx.lineWidth = Math.random();
					ctx.strokeStyle = "white";
					ctx.stroke();
				}

				if(dist2<=100){
					ctx.beginPath();
					ctx.moveTo(x,y);
					ctx.lineTo(x3,y3);
					ctx.lineWidth = .5;
					ctx.strokeStyle = "white";
					ctx.stroke();
				}

				ctx.beginPath();
				ctx.arc(parts[index][i].posX+parts[index][i].radius,parts[index][i].posY+parts[index][i].radius/2,parts[index][i].radius,0,2*Math.PI);
				ctx.fillStyle = parts[index][i].colorFinal;
				ctx.fill();
			}
		});
	}

	window.onmousemove = function(e, param){
		mouse = {x:e.clientX, y:e.clientY};
		interaction = !interaction;
		return mouse;
	};


	function interAction(particle){
		if(interaction){
			particle.interaction = false;
			particle.targetX = mouse.x;
			particle.targetY = mouse.y;
		}
	}


	function clear(){
		holders.forEach(function(holder, index){
			ctx = contexts[index];
			ctx.clearRect(0, 0, windowWidth/3, windowHeight/3);
		});
	}

	loop();

}

