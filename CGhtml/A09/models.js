function buildGeometry() {
	var i;
	
	// Draws a Cone --- Already done, just for inspiration
	///// Creates vertices
	var vert1 = [[0.0, 1.0, 0.0]];
	for(i = 0; i < 36; i++) {
		vert1[i+1] = [Math.sin(i*10.0/180.0*Math.PI), -1.0, Math.cos(i*10.0/180.0*Math.PI)];
	}
	vert1[37] = [0.0, -1.0, 0.0]
	////// Creates indices
	var ind1 = [];
	//////// Upper part
	j = 0;
	for(i = 0; i < 36; i++) {
		ind1[j++] = 0;
		ind1[j++] = i + 1;
		ind1[j++] = (i + 1) % 36 + 1;
	}
	//////// Lower part
	for(i = 0; i < 36; i++) {
		ind1[j++] = 37;
		ind1[j++] = (i + 1) % 36 + 1;
		ind1[j++] = i + 1;
	}
	
	var color1 = [1.0, 0.0, 0.0];
	addMesh(vert1, ind1, color1);

	// Draws a Cylinder -- To do for the assignment.
	// var vert2 = [[-1.0,-1.0,0.0], [1.0,-1.0,0.0], [-1.0,1.0,0.0], [1.0,1.0,0.0]];
	var vert2 = [[0.0, 1.0, 0.0]];
	j = 1;
	for(i = 0; i < 36; i++) {
		vert2[j++] = [Math.sin(i*10.0/180.0*Math.PI), 1.0, Math.cos(i*10.0/180.0*Math.PI)];
	}
	for(i = 0; i < 36; i++) {
		vert2[j++] = [Math.sin(i*10.0/180.0*Math.PI), -1.0, Math.cos(i*10.0/180.0*Math.PI)];
	}
	vert2[j++] = [0.0, -1.0, 0.0];
	////// Creates indices
	var ind2 = [];	j = 0;
	////// upper surface  
	// notice  that the order of vectices should be counter clockwise
	for(i = 0; i <= 35; i++) {
		ind2[j++] = 0;   
		ind2[j++] =  i + 1; 
		ind2[j++] = (i + 1) % 36 + 1 ; 
	}
	////// middle surface
	for(i = 1; i <= 36; i++) {
		ind2[j++] =  i;   
		ind2[j++] =  i + 36 ; 
		ind2[j++] =  i%36 + 1; 
		ind2[j++] =  i + 36;   
		ind2[j++] =  i%36 + 1 + 36 ; 
		ind2[j++] =  i%36 + 1; 
	}
	////// bottom surface
	for(i = 0; i < 36; i++) {  
		ind2[j++] = 73;
		ind2[j++] = (i + 1) % 36 + 1 +36;
		ind2[j++] =  i + 1+ 36;
	}
	var color2 = [0.0, 0.0, 1.0];
	addMesh(vert2, ind2, color2);


	// Draws a Sphere --- Already done, just for inspiration
	var vert3 = [[0.0, 1.0,0.0]];
	///// Creates vertices
	k = 1;
	for(j = 1; j < 18; j++) {
		for(i = 0; i < 36; i++) {
			x = Math.sin(i*10.0/180.0*Math.PI) * Math.sin(j*10.0/180.0*Math.PI);
			y = Math.cos(j*10.0/180.0*Math.PI);
			z = Math.cos(i*10.0/180.0*Math.PI) * Math.sin(j*10.0/180.0*Math.PI);
			vert3[k++] = [x, y, z];
		}
	}
	lastver = k;
	vert3[k++] = [0.0,-1.0,0.0];

	////// Creates indices
	var ind3 = [];
	k = 0;
	///////// Lateral part
	for(i = 0; i < 36; i++) {
		for(j = 1; j < 17; j++) {
			ind3[k++] = i + (j-1) * 36 + 1;
			ind3[k++] = i + j * 36 + 1;
			ind3[k++] = (i + 1) % 36 + (j-1) * 36 + 1;

			ind3[k++] = (i + 1) % 36 + (j-1) * 36 + 1;
			ind3[k++] = i + j * 36 + 1;
			ind3[k++] = (i + 1) % 36 + j * 36 + 1;
		}
	}	
	//////// Upper Cap
	for(i = 0; i < 36; i++) {
		ind3[k++] = 0;
		ind3[k++] = i + 1;
		ind3[k++] = (i + 1) % 36 + 1;
	}
	//////// Lower Cap
	for(i = 0; i < 36; i++) {
		ind3[k++] = lastver;
		ind3[k++] = (i + 1) % 36 + 541;
		ind3[k++] = i + 541;
	}
	
	var color3 = [0.0, 1.0, 0.0];
	addMesh(vert3, ind3, color3);
		
// Draws a Torus using trigonometric functions -- To do for the assignment
// 	{\displaystyle x(u,v)=(R+r\cos {v})\cos {u}\,}
// {\displaystyle y(u,v)=(R+r\cos {v})\sin {u}\,}{\displaystyle y(u,v)=(R+r\cos {v})\sin {u}\,}
// {\displaystyle z(u,v)=r\sin {v}\,}{\displaystyle z(u,v)=r\sin {v}\,}

	var vert4 = [[0.0, 0.0,0.0]];
	R =3; //Large circle ：u  index:j
	r =1 ;//small circle v  index:i
	///// Creates vertices
	k = 1;
	for(j = 0; j < 36; j++) {
		for(i = 0; i < 36; i++) {
			x =(R +  r*Math.cos(i*10.0/180.0*Math.PI) )* Math.sin(j*10.0/180.0*Math.PI);  //y(u,v)
			y = Math.sin(i*10.0/180.0*Math.PI)*r;//z(u,v)
			z = (R +  r*Math.cos(i*10.0/180.0*Math.PI) )* Math.cos(j*10.0/180.0*Math.PI); //x(u,v)
			vert4[k++] = [x, y, z];
		}
	}
	var ind4 = []; k =0;
	for(j = 1; j <= 36; j++){
	    for(i = 1; i <= 36; i++) {
			ind4[k++] =(j-1)*36+i;
			ind4[k++] =(j%36)*36+i;
			ind4[k++] =(j-1)*36+i%36+1;
			ind4[k++] =(j-1)*36+i%36+1;
			ind4[k++] =(j%36)*36+i;
			ind4[k++] =(j%36)*36+i%36+1;
	    }
	}
	var color4 = [1.0, 1.0, 0.0];
	addMesh(vert4, ind4, color4);
}

