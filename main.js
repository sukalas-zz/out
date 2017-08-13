var main = function(){
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;

	var vissibility = 1;

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
		canvas = document.createElement('canvas');
		ctx = canvas.getContext('2d');

		canvas.width = windowWidth/3;
		canvas.height = windowHeight/3;
		canvas.id = 'canvas';

		canvas2 = canvas.cloneNode(true);
		canvas3 = canvas.cloneNode(true);
		
		ctx2 = canvas2.getContext('2d');		
		ctx3 = canvas3.getContext('2d');

		document.getElementById("bio").appendChild(canvas);
		document.getElementById("xp").appendChild(canvas2);
		document.getElementById("contact").appendChild(canvas3);

		line = new Border(canvas.width, canvas.height, ctx);
		line2 = new Border(canvas2.width, canvas2.height, ctx2);
		line3 = new Border(canvas2.width, canvas2.height, ctx3);
	}

	setup();

	function loop(){
		clear();
		line.draw();
		line2.draw();
		line3.draw();
		requestAnimationFrame(loop, 1);
	}

	function clear(){
		ctx.clearRect(0, 0, windowWidth/3, windowHeight/3);
		ctx2.clearRect(0, 0, windowWidth/3, windowHeight/3);
		ctx3.clearRect(0, 0, windowWidth/3, windowHeight/3);
	}

	loop();

}

