// these global variables are used to contain the current angles of the world
// HERE YOU WILL HAVE TO ADD ONE OR MORE GLOBAL VARIABLES TO CONTAIN THE ORIENTATION
// OF THE OBJECT
// this function returns the world matrix with the updated rotations.
// parameters rvx, rvy and rvz contains a value in the -1 .. +1 range that tells the angular velocity of the world.
// if rvz is negative we will have clockwise rotation(顺时针). if it's postive,  it will be rotated counter clockwisely.	

var gobal_q = new Quaternion(1, 1, 1, 1); //contain the previous rotation parameters of the object
function updateWorld(rvx, rvy, rvz) {  
	// compute the rotation matrix
	var alpha = 2/180*3.1415;     // measure in rad     >>>>  control the speed of rotation
	var deltaq = new Quaternion(Math.cos(alpha/2), Math.sin(alpha/2)*rvx,Math.sin(alpha/2)*rvy, Math.sin(alpha/2)*rvz);
	gobal_q = gobal_q.mul(deltaq);
	var out = gobal_q.toMatrix4();			  
	return out;
}
