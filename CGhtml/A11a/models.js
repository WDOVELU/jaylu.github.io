function Vector(x, y, z) {
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
  }
Vector.prototype = {
	subtract: function(v) {
		if (v instanceof Vector) return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
		else return new Vector(this.x - v, this.y - v, this.z - v);
	  },
	dot: function(v) {
	  return this.x * v.x + this.y * v.y + this.z * v.z;
	},
	cross: function(v) {
	  return new Vector(
		this.y * v.z - this.z * v.y,
		this.z * v.x - this.x * v.z,
		this.x * v.y - this.y * v.x
	  );
	},
	divide: function(v) {
		if (v instanceof Vector) return new Vector(this.x / v.x, this.y / v.y, this.z / v.z);
		else return new Vector(this.x / v, this.y / v, this.z / v);
	},
	length: function() {
	  return Math.sqrt(this.dot(this));
	},
	unit: function() {
	  return this.divide(this.length());
	},
	toAngles: function() {
	  return {
		theta: Math.atan2(this.z, this.x),
		phi: Math.asin(this.y / this.length())
	  };
	},
	angleTo: function(a) {
	  return Math.acos(this.dot(a) / (this.length() * a.length()));
	},
	toArray: function() {
	  return [this.x, this.y, this.z];
	},
	init: function(x, y, z) {
	  this.x = x; this.y = y; this.z = z;
	  return this;
	}
  };


//checked the glsl shader code in app.js, here we are using phone sharding (per vertex)

function buildGeometry() {
	var i;
	
	// Draws a pyramid --- Already done, just for inspiration
	var vert1 = [[0.0,1.0,0.0],[ 1.0,-1.0,-1.0],[-1.0,-1.0,-1.0],
				 [0.0,1.0,0.0],[ 1.0,-1.0, 1.0],[ 1.0,-1.0,-1.0], 
				 [0.0,1.0,0.0],[-1.0,-1.0, 1.0],[ 1.0,-1.0, 1.0], 
				 [0.0,1.0,0.0],[-1.0,-1.0,-1.0],[-1.0,-1.0, 1.0], 
				 [-1.0,-1.0,-1.0],[1.0,-1.0,-1.0], [1.0,-1.0,1.0], [-1.0,-1.0,1.0],
				];
	var norm1 = [[0.0, 0.4472,-0.8944], [0.0, 0.4472,-0.8944], [0.0, 0.4472,-0.8944],
				 [ 0.8944, 0.4472,0.0], [ 0.8944, 0.4472,0.0], [ 0.8944, 0.4472,0.0],
				 [ 0.0, 0.4472,0.8944], [ 0.0, 0.4472,0.8944], [ 0.0, 0.4472,0.8944],
				 [-0.8944, 0.4472,0.0], [-0.8944, 0.4472,0.0], [-0.8944, 0.4472,0.0],
				 [ 0.0,-1.0,0.0],[ 0.0,-1.0,0.0],[ 0.0,-1.0,0.0],[ 0.0,-1.0,0.0]
				 ];
	var ind1 = [0, 1, 2,  3, 4, 5,  6, 7, 8,  9, 10, 11,  12, 13, 14,  12, 14, 15];
	var color1 = [0.0, 0.0, 1.0];
	addMesh(vert1, norm1, ind1, color1);
	
	// Draws a cube -- To do for the assignment.
	var vert2 = [
		[-1.0,-1.0,-1.0],  [1.0,-1.0,-1.0],[1.0,-1.0,1.0], [-1.0,-1.0,1.0],
		[-1.0,-1.0,-1.0],  [-1.0,1.0,-1.0],[1.0,1.0,-1.0], [1.0,-1.0,-1.0],
		[-1.0,-1.0,-1.0],[-1.0,-1.0,1.0],  [-1.0,1.0,1.0], [-1.0,1.0,-1.0],
		[1.0,1.0,1.0],   [1.0,1.0,-1.0],[-1.0,1.0,-1.0],[-1.0,1.0,1.0],
		[1.0,1.0,1.0],  [1.0,-1.0,1.0],[1.0,-1.0,-1.0], [1.0,1.0,-1.0], 
		[1.0,1.0,1.0], [-1.0,1.0,1.0], [-1.0,-1.0,1.0],[1.0,-1.0,1.0]
	];
	
	
	var norm2 = [
		[ 0.0, -1.0,0.0], [ 0.0, -1.0,0.0],[ 0.0, -1.0,0.0], [ 0.0, -1.0,0.0],
		[ 0.0, 0.0,-1.0], [ 0.0, 0.0,-1.0],[ 0.0, 0.0,-1.0], [ 0.0, 0.0,-1.0],
		[ -1.0, 0.0,0.0],[ -1.0, 0.0,0.0],[ -1.0, 0.0,0.0], [ -1.0, 0.0,0.0],
		[ 0.0, 1.0,0.0],[ 0.0, 1.0,0.0],[ 0.0, 1.0,0.0], [ 0.0, 1.0,0.0],
		[ 1.0, 0.0,0.0],[ 1.0, 0.0,0.0],[1.0, 0.0,0.0], [ 1.0, 0.0,0.0],
		[ 0.0, 0.0,1.0],[ 0.0, 0.0,1.0],[ 0.0, 0.0,1.0], [ 0.0, 0.0,1.0]
	];	
	
	var ind2 = [0, 1, 2,  0, 2, 3,
						4,5,6,4,6,7,
						8,9,10,8,10,11,
					12,13,14,12,14,15,
					16,17,18,16,18,19,
					20,21,22,20,22,23];

	var color2 = [0.0, 1.0, 1.0];
	addMesh(vert2, norm2, ind2, color2);






	
	// Draws a Cylinder --- Already done, just for inspiration
	///// Creates vertices
	var vert3 = [[0.0, 1.0, 0.0]];
	var norm3 = [[0.0, 1.0, 0.0]];
	for(i = 0; i < 36; i++) {
		vert3[i+1] = [Math.sin(i*10.0/180.0*Math.PI), 1.0, Math.cos(i*10.0/180.0*Math.PI)];
		norm3[i+1] = [0.0, 1.0, 0.0];
		
		vert3[i+37] = [Math.sin(i*10.0/180.0*Math.PI), 1.0, Math.cos(i*10.0/180.0*Math.PI)];
		norm3[i+37] = [Math.sin(i*10.0/180.0*Math.PI), 0.0, Math.cos(i*10.0/180.0*Math.PI)];
		
		vert3[i+73] = [Math.sin(i*10.0/180.0*Math.PI),-1.0, Math.cos(i*10.0/180.0*Math.PI)];
		norm3[i+73] = [Math.sin(i*10.0/180.0*Math.PI), 0.0, Math.cos(i*10.0/180.0*Math.PI)];
		
		vert3[i+109] = [Math.sin(i*10.0/180.0*Math.PI),-1.0, Math.cos(i*10.0/180.0*Math.PI)];
		norm3[i+109] = [0.0, -1.0, 0.0];
	}
	vert3[145] = [0.0, -1.0, 0.0];
	norm3[145] = [0.0, -1.0, 0.0];
	////// Creates indices
	var ind3 = [];
	//////// Upper part
	j = 0;
	for(i = 0; i < 36; i++) {
		ind3[j++] = 0;
		ind3[j++] = i + 1;
		ind3[j++] = (i + 1) % 36 + 1;
	}
	//////// Lower part
	for(i = 0; i < 36; i++) {
		ind3[j++] = 145;
		ind3[j++] = (i + 1) % 36 + 109;
		ind3[j++] = i + 109;
	}
	//////// Mid part
	for(i = 0; i < 36; i++) {
		ind3[j++] = i + 73;
		ind3[j++] = (i + 1) % 36 + 37;
		ind3[j++] = i + 37;

		ind3[j++] = (i + 1) % 36 + 37;
		ind3[j++] = i + 73;
		ind3[j++] = (i + 1) % 36 + 73;
	}
	var color3 = [1.0, 0.0, 1.0];
	addMesh(vert3, norm3, ind3, color3);

	
	// Draws a Cone -- To do for the assignment.
	// var vert4 = [[-1.0,-1.0,0.0], [1.0,-1.0,0.0], [1.0,1.0,0.0], [-1.0,1.0,0.0]];
	// var norm4 = [[ 0.0, 0.0,1.0], [0.0, 0.0,1.0], [0.0,0.0,1.0], [ 0.0,0.0,1.0]];
	// var ind4 = [0, 1, 2,  0, 2, 3];

	var tip =  new Vector(0.0,1.0,0.0);
	var O =  new Vector(0.0,-1.0,0.0);
	var vert4 = [];
	var norm4 = [];
	
	for(i = 0; i < 36; i++) {
		
		var point =  new Vector(Math.sin(i*10.0/180.0*Math.PI), -1.0, Math.cos(i*10.0/180.0*Math.PI));
		var point_to_tip = new Vector();
		var O_to_tip = new Vector();
		var point_to_O = new Vector();
		point_to_tip  = tip.subtract(point);
		O_to_tip = tip.subtract(O);
		point_to_O = O.subtract(point);
        var normvec = point_to_O.cross(O_to_tip).cross(point_to_tip).unit();
		
		vert4[i] = tip.toArray();
		norm4[i] = normvec.toArray();
		
		vert4[i+36] = point.toArray();
		norm4[i+36] = normvec.toArray();
		
		vert4[i+72] = point.toArray();
		norm4[i+72] = [ 0.0, -1.0,0.0];
	}
	vert4[108] = O.toArray();
	norm4[108] =[ 0.0, -1.0,0.0];
	////// Creates indices
	var ind4 = [];
	//////// Upper part
	j = 0;
	for(i = 0; i < 36; i++) {
		ind4[j++] = i;
		ind4[j++] = i + 36;
		ind4[j++] = (i + 1) % 36 +36;
	}
	//////// Lower part
	for(i = 0; i < 36; i++) {
		ind4[j++] = i + 72;
		ind4[j++] = 108;
		ind4[j++] = (i + 1) % 36 + 72 ;
	}
	var color4 = [1.0, 1.0, 0.0];
	addMesh(vert4, norm4, ind4, color4);



	// Draws a Sphere --- Already done, just for inspiration
	var vert5 = [[0.0, 1.0,0.0]];
	var norm5 = [[0.0, 1.0,0.0]];
	///// Creates vertices
	k = 1;
	for(j = 1; j < 18; j++) {
		for(i = 0; i < 36; i++) {
			x = Math.sin(i*10.0/180.0*Math.PI) * Math.sin(j*10.0/180.0*Math.PI);
			y = Math.cos(j*10.0/180.0*Math.PI);
			z = Math.cos(i*10.0/180.0*Math.PI) * Math.sin(j*10.0/180.0*Math.PI);
			norm5[k] = [x, y, z];
			vert5[k++] = [x, y, z];
		}
	}
	lastVert = k;
	norm5[k] = [0.0,-1.0,0.0];
	vert5[k++] = [0.0,-1.0,0.0];
	
	////// Creates indices
	var ind5 = [];
	k = 0;
	///////// Lateral part
	for(i = 0; i < 36; i++) {
		for(j = 1; j < 17; j++) {
			ind5[k++] = i + (j-1) * 36 + 1;
			ind5[k++] = i + j * 36 + 1;
			ind5[k++] = (i + 1) % 36 + (j-1) * 36 + 1;

			ind5[k++] = (i + 1) % 36 + (j-1) * 36 + 1;
			ind5[k++] = i + j * 36 + 1;
			ind5[k++] = (i + 1) % 36 + j * 36 + 1;
		}
	}	
	//////// Upper Cap
	for(i = 0; i < 36; i++) {
		ind5[k++] = 0;
		ind5[k++] = i + 1;
		ind5[k++] = (i + 1) % 36 + 1;
	}
	//////// Lower Cap
	for(i = 0; i < 36; i++) {
		ind5[k++] = lastVert;
		ind5[k++] = (i + 1) % 36 + 541;
		ind5[k++] = i + 541;
	}
	var color5 = [0.8, 0.8, 1.0];
	addMesh(vert5, norm5, ind5, color5);

	// Draws a Torus -- To do for the assignment
// 	{\displaystyle x(u,v)=(R+r\cos {v})\cos {u}\,}
// {\displaystyle y(u,v)=(R+r\cos {v})\sin {u}\,}{\displaystyle y(u,v)=(R+r\cos {v})\sin {u}\,}
// {\displaystyle z(u,v)=r\sin {v}\,}{\displaystyle z(u,v)=r\sin {v}\,}

	var vert6 = [[0.0, 0.0,0.0]];
	var norm6 = [[0.0, 0.0,0.0]];
	R =3; //large circle : u  index:j
	r =1 ;//small circle : v  index:i
	///// Creates vertices
	k = 1;
	for(j = 0; j < 36; j++) {
		for(i = 0; i < 36; i++) {
			//z(u,v)//y(u,v)//x(u,v)
			var point =new Vector((R +  r*Math.cos(i*10.0/180.0*Math.PI) )* Math.sin(j*10.0/180.0*Math.PI),
			Math.sin(i*10.0/180.0*Math.PI)*r, 
			(R +  r*Math.cos(i*10.0/180.0*Math.PI) )* Math.cos(j*10.0/180.0*Math.PI)   
			);
			vert6[k] = point.toArray();
	
			// x =(R +  r*Math.cos(i*10.0/180.0*Math.PI) )* Math.sin(j*10.0/180.0*Math.PI);  //y(u,v)
			// y = Math.sin(i*10.0/180.0*Math.PI)*r;//z(u,v)
			// z = (R +  r*Math.cos(i*10.0/180.0*Math.PI) )* Math.cos(j*10.0/180.0*Math.PI); //x(u,v)
			

			var center =new Vector(R* Math.sin(j*10.0/180.0*Math.PI),0.0,R* Math.cos(j*10.0/180.0*Math.PI));
			norm6[k++] = point.subtract(center).toArray();
		}
	}
	
	var ind6 = []; k =0;
	for(j = 1; j <= 36; j++){
		for(i = 1; i <= 36; i++) {
			ind6[k++] =(j-1)*36+i;
			ind6[k++] =(j%36)*36+i;
			ind6[k++] =(j-1)*36+i%36+1;
			ind6[k++] =(j-1)*36+i%36+1;
			ind6[k++] =(j%36)*36+i;
			ind6[k++] =(j%36)*36+i%36+1;
		}
	}
	
	var color6 = [1.0, 0.0, 0.0];
	addMesh(vert6, norm6, ind6, color6);


}


