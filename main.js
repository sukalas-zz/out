var main = function(){
	var windowHeight = window.innerHeight;
	var windowWidth = window.innerWidth;
	var vissibility = 1;

	var init = function(width,height){
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
		var wh = window.innerHeight;
		var ww = window.innerWidth;
		init(ww, wh);
	};

	init(windowWidth, windowHeight);
}

