function draw() {
	line(-0.5, -0.3,0.5, -0.3);
	line(0.5, -0.3,0.5,  0.0);
	line(0.5,  0.0,0.3,  0.1);
	line(0.3,  0.1,0.3,  0.3);
	line(0.3,  0.3, -0.2,  0.3);
	line(-0.2,  0.3,-0.2,  0.1);
	line(-0.2,  0.1,-0.5,  0.0);
	line(-0.5,  0.0,-0.5, -0.3);
}
function draw2(x0,y0,radius,prop,rotation) {
	var n = 128;
	var xx0 = radius * Math.cos(0*2*Math.PI/n+rotation)+x0;
	var yy0 = radius * Math.sin(0*2*Math.PI/n+rotation)+y0;
	for(i = 1; i <= (prop * n); i++) {
		x = radius * Math.cos(i*2*Math.PI/n+rotation)+x0;
		y = radius * Math.sin(i*2*Math.PI/n+rotation)+y0;
		line(xx0,yy0,x,y);// vU = vU.concat([xx0,yy0,x,y])
		xx0=x; yy0=y;
	}
}
function drawyinyang() {
	draw2(0,0,0.8,1,0);
	draw2(0,0.4,0.1,1,0);
	draw2(0,-0.4,0.1,1,0);
	var rotation = 0.5*Math.PI;
	draw2(0,0.4,0.4,0.5,rotation);
	var rotation = 1.5*Math.PI;
	draw2(0,-0.4,0.4,0.5,rotation);
}




