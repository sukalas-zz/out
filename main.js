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
				interAction(parts[index][i]);

				if(parts[index][i].targetX !== 0 && parts[index][i].targetX == previous){
					if(counter>=100){
						// alert("inactive!")
						console.log(counter)
						parts[index][i].interaction = false;	
						counter = 0;
					}
				counter++;
				}

				ctx = contexts[index];
				ctx.beginPath();
				ctx.arc(parts[index][i].posX+parts[index][i].radius,parts[index][i].posY+parts[index][i].radius/2,parts[index][i].radius,0,2*Math.PI);
				ctx.fillStyle = parts[index][i].colorFinal;
				ctx.fill();

				previous = parts[index][i].targetX;
			}
		});
	}

	window.onmousemove = function(e, param){
		mouse = {x:e.clientX, y:e.clientY};
		interaction = !interaction;
		return mouse;
	};

	window.omnouseout = function(e, param){
		interaction = !interaction;
	};

	function interAction(particle){
		if(interaction){
			particle.interaction = true;
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

