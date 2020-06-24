
function view(cx, cy, cz, alpha, beta, rho) {
	// Create a view matrix for a camera in position cx, cy and cz, looking in the direction specified by
	// alpha, beta and rho, as outlined in the course slides.
	var out = utils.multiplyMatrices(
	utils.multiplyMatrices(
		utils.multiplyMatrices(utils.MakeRotateZMatrix(-rho)
		  ,utils.MakeRotateXMatrix(-beta)
		),utils.MakeRotateYMatrix(-alpha)
		),
		utils.MakeTranslateMatrix(-cx,-cy,-cz));
			   

	return out;
}

