window.onload = function() {
	   
    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }
	
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	
	context.beginPath();
	context.moveTo(20,0);
	context.lineTo(40,15);
	context.lineTo(20, 30);
	context.lineTo(0,15);
	
	// Define the style of the canvas shape
	context.lineWidth = 1;
	context.fillStyle = "rgba(255, 255, 255, .2)";
	context.strokeStyle = "rgba(100, 125, 200, .8)";
	
	// Close the path
	context.closePath();
	
	// Fill the path with a colored outline
	context.fill();
	context.stroke();
	
    canvas.addEventListener('mousemove', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        alert(mousePos.x);
      }, false);
	
};