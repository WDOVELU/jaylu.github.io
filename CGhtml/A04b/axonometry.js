function axonometry() {

	var parallel_m = [1.0/50,		0.0,		0.0,		0.0,
		0.0,		(16/9)/50,		0.0,		0.0,
		0.0,		0.0,		-2.0/(101-1), -(101+1)/(101-1),
		0.0,		0.0,		0.0,		1.0];
	// Make an isometric view, w = 50, a = 16/9, n = 1, f = 101.
	var A1 =  utils.multiplyMatrices(
			   utils.multiplyMatrices(parallel_m
				 ,utils.MakeRotateXMatrix(35.26)
			   ),utils.MakeRotateYMatrix(45)
			   );

	// Make a dimetric view, w = 50, a = 16/9, n = 1, f = 101, rotated 20 around the x-axis
	var A2 =  utils.multiplyMatrices(
		utils.multiplyMatrices(parallel_m
		  ,utils.MakeRotateXMatrix(20)
		),utils.MakeRotateYMatrix(45)
		);
			   
	// Make a trimetric view, w = 50, a = 16/9, n = 1, f = 101, rotated -30 around the x-axis and 30 around the y-axis
	var A3 =  utils.multiplyMatrices(
		utils.multiplyMatrices(parallel_m
		  ,utils.MakeRotateXMatrix(-30)
		),utils.MakeRotateYMatrix(30)
		);
			   
	// Make an cavalier projection view, w = 50, a = 16/9, n = 1, f = 101, at 45 degrees
	var cavalier = utils.identityMatrix();
	cavalier[2]=-Math.cos(utils.degToRad(45));
	cavalier[6]=-Math.sin(utils.degToRad(45));
	var O1 =utils.multiplyMatrices(parallel_m
		  ,cavalier
		);

	// Make a cabinet projection view, w = 50, a = 16/9, n = 1, f = 101, at 60 degrees
	var cabinet = utils.identityMatrix();
	cabinet[2]=-0.5*Math.cos(utils.degToRad(60));
	cabinet[6]=-0.5*Math.sin(utils.degToRad(60));
	var O2 =utils.multiplyMatrices(parallel_m
		,cabinet
	  );

	return [A1, A2, A3, O1, O2];
}