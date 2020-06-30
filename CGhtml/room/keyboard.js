//Parameters for Camera

var cx = -0.525772281081319;
var cy = 1.724524017978642;
var cz = 11.74456143851955;

var elevation = 0.01;
var angle = 0.01;
var roll = 0.01;
var Oelevation = -44.59999999999991;   //pitch for mouse
var Oangle =225.59999999999962;       //yaw for mouse

// c:  [-0.525772281081319,1.724524017978642,11.74456143851955,]
//  elevation(pitch_x): 0.01 angle(yaw_y): 0.01 roll: 0.01
//  Oelevation(pitch_x): -44.59999999999991 Oangle(yaw_y): 225.59999999999962



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
	  case 74:   // 37-40 方向键
//console.log("KeyUp   - Dir LEFT");
		rvy = rvy + 1.0;
		break;
	  case 76:
//console.log("KeyUp   - Dir RIGHT");
		rvy = rvy - 1.0;
		break;
	  case 73:
//console.log("KeyUp   - Dir UP");
		rvx = rvx + 1.0;
		break;
	  case 75:
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
		vx = vx - 0.5;
		break;
	  case 68:      //D
//console.log("KeyUp   - Pos RIGHT");
		vx = vx + 0.5;
		break;
	  case 82:    //R
//console.log("KeyUp   - Pos UP");
		vy = vy + 0.5;
		break;
	  case 70:    //F
//console.log("KeyUp   - Pos DOWN");
		vy = vy - 0.5;
		break;
	  case 87:   //W    
//console.log("KeyUp   - Pos FORWARD");
		vz = vz - 0.5;
		break;
	  case 83:  //S
//console.log("KeyUp   - Pos BACKWARD");
		vz = vz + 0.5;
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
	  case 74:     //j
//console.log("KeyDown  - Dir LEFT");
		rvy = rvy - 1.0;
		break;
	  case 76:
//console.log("KeyDown - Dir RIGHT");
		rvy = rvy + 1.0;
		break;
	  case 73:     //i
//console.log("KeyDown - Dir UP");
		rvx = rvx - 1.0;
		break;
	  case 75:      //方向键下
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
		vx = vx + 0.5;
		break;
	  case 68:
//console.log("KeyDown - Pos RIGHT");
		vx = vx - 0.5;
		break;
	  case 82:
//console.log("KeyDown - Pos UP");
		vy = vy - 0.5;
		break;
	  case 70:
//console.log("KeyDown - Pos DOWN");
		vy = vy + 0.5;
		break;
	  case 87:
//console.log("KeyDown - Pos FORWARD");
		vz = vz + 0.5;
		break;
	  case 83:
//console.log("KeyDown - Pos BACKWARD");
		vz = vz - 0.5;
		break;
		
	}
//	console.log(vx + " " + vy + " " + vz + " " + rvx + " " + rvy + " " + rvz);
  }
//	console.log(e.keyCode);




}
//'window' is a JavaScript object (if "canvas", it will not work)

window.addEventListener("keyup", keyFunctionUp, false);
window.addEventListener("keydown", keyFunctionDown, false);

