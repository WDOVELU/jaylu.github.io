function worldViewProjection(carx, cary, carz, cardir, camx, camy, camz) {
// Computes the world, view and projection matrices for the game.

// carx, cary and carz encodes the position of the car.

// Since the game is basically in 2D, camdir contains the rotation about the y-axis to orient the car　－y-up

// The camera is placed at position camx, camy and camz. The view matrix should be computed using the
// LookAt camera matrix procedure, with the correct up-vector.

	var world = utils.multiplyMatrices(utils.MakeTranslateMatrix(carx, cary, carz),utils.MakeRotateYMatrix(cardir));
	var u = [0,1,0];     // y-up axis
 	var vz = utils.normalizeVector3([camx-carx, camy-cary, camz-carz]);
	 var vy = utils.normalizeVector3(u);
	 var vx = utils.crossVector(vy, vz);
	
	if(vx == [0,0,0]){
		vx = [1,0,0];  //to avoid the problem of the cross product = 0
	 }else{
		vx = utils.normalizeVector3(vx);
	 }

	var view  = [vx[0], vy[0], vz[0], camx, 
	vx[1], vy[1], vz[1], camy,
	vx[2], vy[2], vz[2], camz,
	0, 0, 0, 1];     // Mc

	view=utils.invertMatrix(view);   // inverse of Mc
	return [world, view];
}

