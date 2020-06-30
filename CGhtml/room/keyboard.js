//Parameters for Camera

var cx = 0.9744458393861116;
var cy = 1.724567651205733;
var cz = 12.994299646752506;

var roll = 0.01;
var elevation =0.01;   //pitch
var angle = 0.01;       //yaw
var Oelevation = -49;   //pitch for mouse
var Oangle =120.6;       //yaw for mouse

var keys = [];
var vx = 0.0;
var vy = 0.0;
var vz = 0.0;
var rvx = 0.0;
var rvy = 0.0;
var rvz = 0.0;


var keyFunctionDown =function(e) {
  if(!keys[e.keyCode]) {
  	keys[e.keyCode] = true;
	switch(e.keyCode) {
	  case 37:   // 37-40 方向键
//console.log("KeyUp   - Dir LEFT");
		rvy = rvy + 1.0;
		break;
	  case 39:
//console.log("KeyUp   - Dir RIGHT");
		rvy = rvy - 1.0;
		break;
	  case 38:
//console.log("KeyUp   - Dir UP");
		rvx = rvx + 1.0;
		break;
	  case 40:
//console.log("KeyUp   - Dir DOWN");
		rvx = rvx - 1.0;
		break;
	  case 81:   //E
//console.log("KeyUp   - Dir ROLL LEFT");
		rvz = rvz + 1.0;
		break;
	  case 69:    //Q
//console.log("KeyUp   - Dir ROLL RIGHT");
		rvz = rvz - 1.0;
		break;
	  case 65:      //A
//console.log("KeyUp   - Pos LEFT");
		vx = vx - 1.0;
		break;
	  case 68:      //D
//console.log("KeyUp   - Pos RIGHT");
		vx = vx + 1.0;
		break;
	  case 82:    //R
//console.log("KeyUp   - Pos UP");
		vy = vy + 1.0;
		break;
	  case 70:    //F
//console.log("KeyUp   - Pos DOWN");
		vy = vy - 1.0;
		break;
	  case 87:   //W    
//console.log("KeyUp   - Pos FORWARD");
		vz = vz - 1.0;
		break;
	  case 83:  //S
//console.log("KeyUp   - Pos BACKWARD");
		vz = vz + 1.0;
		break;
	}
	// console.log(vx + " " + vy + " " + vz + " " + rvx + " " + rvy + " " + rvz);
  }
	// console.log(e.keyCode);
}

var keyFunctionUp =function(e) {
  if(keys[e.keyCode]) {
  	keys[e.keyCode] = false;
	switch(e.keyCode) {
	  case 37:
//console.log("KeyDown  - Dir LEFT");
		rvy = rvy - 1.0;
		break;
	  case 39:
//console.log("KeyDown - Dir RIGHT");
		rvy = rvy + 1.0;
		break;
	  case 38:     //方向键上
//console.log("KeyDown - Dir UP");
		rvx = rvx - 1.0;
		break;
	  case 40:      //方向键下
//console.log("KeyDown - Dir DOWN");
		rvx = rvx + 1.0;
		break;
	  case 81:      //Q
//console.log("KeyDown - Dir ROLL LEFT");
		rvz = rvz - 1.0;
		break;
	  case 69:      //R
//console.log("KeyDown - Dir ROLL RIGHT");
		rvz = rvz + 1.0;
		break;
	  case 65:
//console.log("KeyDown - Pos LEFT");
		vx = vx + 1.0;
		break;
	  case 68:
//console.log("KeyDown - Pos RIGHT");
		vx = vx - 1.0;
		break;
	  case 82:
//console.log("KeyDown - Pos UP");
		vy = vy - 1.0;
		break;
	  case 70:
//console.log("KeyDown - Pos DOWN");
		vy = vy + 1.0;
		break;
	  case 87:
//console.log("KeyDown - Pos FORWARD");
		vz = vz + 1.0;
		break;
	  case 83:
//console.log("KeyDown - Pos BACKWARD");
		vz = vz - 1.0;
		break;
	  case 32:
//console.log("SPACE   - Ghost on/off");
		ghostVisible = !ghostVisible;
		break;
	}
//	console.log(vx + " " + vy + " " + vz + " " + rvx + " " + rvy + " " + rvz);
  }
//	console.log(e.keyCode);
}
//'window' is a JavaScript object (if "canvas", it will not work)
window.addEventListener("keyup", keyFunctionUp, false);
window.addEventListener("keydown", keyFunctionDown, false);
