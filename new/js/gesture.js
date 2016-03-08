$(function(){
	
});

var ham = new Hammer(navigator,{direction: Hammer.DIRECTION_VERTICAL});
ham.on('swipe',function(evt){
	alert("Tres bien");
});
