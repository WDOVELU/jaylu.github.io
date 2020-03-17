function move() {
	// Rotate 45 degrees around an arbitrary axis passing through (1,0,-1). The x-axis can be aligned to the arbitrary axis after a rotation of 30 degrees around the z-axis, and then -60 degrees around the y-axis.
	var R1 =
	utils.multiplyMatrices(
		 utils.multiplyMatrices(
		 	utils.multiplyMatrices(
		 		utils.MakeTranslateMatrix(1,0,-1),
		 		utils.MakeRotateYMatrix(-60)),
		    utils.multiplyMatrices(
		 		utils.MakeRotateZMatrix(30),
		 		utils.MakeRotateXMatrix(45))),
		 utils.multiplyMatrices(
		 	utils.multiplyMatrices(
		 		utils.MakeRotateZMatrix(-30),
		 		utils.MakeRotateYMatrix(60)),
		 	utils.invertMatrix(utils.MakeTranslateMatrix(1,0,-1))));	
				
	// Half the size of an object, using as fixed point (5,0,-2)
	var S1 = 	utils.multiplyMatrices(
	utils.multiplyMatrices(
		utils.MakeTranslateMatrix(5,0,-2),
		utils.MakeScaleMatrix(0.5)),
		utils.invertMatrix(utils.MakeTranslateMatrix(5,0,-2)));


	// Mirror the starship along a plane passing through (1,1,1), and obtained rotating 15 degree around the x axis the xz plane

		var S2_0 = utils.multiplyMatrices(
			utils.MakeTranslateMatrix(0,1,1),
			utils.MakeRotateXMatrix(15));
		var S2_1=	utils.identityMatrix();
		S2_1[5]= -1;
		var S2 = 	utils.multiplyMatrices(
		utils.multiplyMatrices(
		utils.multiplyMatrices(S2_0,S2_1),
			utils.MakeRotateXMatrix(-15) ),
		utils.MakeTranslateMatrix(0,-1,-1));


		// var S2=utils.identityMatrix();
	// Apply the inverse of the following sequence of transforms: Translation of (0, 0, 5) then rotation of 30 degree around the Y axis, and finally a uniform scaling of a factor of 3.
	var I1 =  utils.multiplyMatrices(
	utils.multiplyMatrices(
	utils.invertMatrix(utils.MakeTranslateMatrix(0,0,5)),
	utils.MakeRotateYMatrix(-30)),
	utils.MakeScaleMatrix(1/3));

	return [R1, S1, S2, I1];
}

