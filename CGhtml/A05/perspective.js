function perspective(w, h, fov) {
	// Build a perspective projection matrix, for a viewport whose size is determined by parameters w (width) and h (height), and whose fov-y is passed in parameter fov. Near plane is n=0.1, and far plane f=100.
	var a=w/h;
	var t =1/Math.tan(utils.degToRad(fov/2)) ;

	var out = [t/a,		0.0,		0.0,		0.0,
			   0.0,	      t,		0.0,		0.0,
			   0.0,		0.0,		-100.1/99.9,		-20/99.9,
			   0.0,		0.0,		-1.0,		0.0];

	return out;
}

