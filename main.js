var main = function(){
	var windowHeight = window.innerHeight;


	var init = function(param){
		var rowList = document.getElementsByClassName("row");
		for (let value of rowList) {
		  value.style.height = param/3+"px";
		}
	}

	window.onresize = function(e) {
		var wh = window.innerHeight
		init(wh);
	};

	init(windowHeight);
}

