function anim() {
	var len = 12;
	var time = 3;
	return [
// segment 1
 [time, 	
	 [len*0.3,0,0],   Quaternion.fromAxisAngle([1,0,0],utils.degToRad(0)),
 	 [len*0.5,0,0],   Quaternion.fromAxisAngle([1,0,0],utils.degToRad(-90)),
 	 [len*0.9 ,0,0],   Quaternion.fromAxisAngle([0,1,0],utils.degToRad(90)),
	 [len ,0,-len*0.3],   Quaternion.fromAxisAngle([0,1,0],utils.degToRad(90))
 ],

// segment 2	  
 [time, 
	[len ,0,-len*0.3],   Quaternion.fromAxisAngle([0,1,0],utils.degToRad(90)),
 	[len,0,-len*0.7],   
	  Quaternion.fromAxisAngle([0,0,1],utils.degToRad(-45)).mul(
		  Quaternion.fromAxisAngle([0,1,0],utils.degToRad(90))),
	[len,0,-len],   
	  Quaternion.fromAxisAngle([1,0,0],utils.degToRad(90)).mul(
		  Quaternion.fromAxisAngle([0,0,1],utils.degToRad(-90)).mul(
				Quaternion.fromAxisAngle([0,1,0],utils.degToRad(90))
				)
			), 
	[len,len*0.3,-len],   
	  Quaternion.fromAxisAngle([1,0,0],utils.degToRad(90)).mul(
		Quaternion.fromAxisAngle([0,0,1],utils.degToRad(-90)).mul(
			Quaternion.fromAxisAngle([0,1,0],utils.degToRad(90))
			)
		)		

	],

// segment 3
 [time,  
	[len,len*0.3,-len],   
	  Quaternion.fromAxisAngle([1,0,0],utils.degToRad(90)).mul(
		Quaternion.fromAxisAngle([0,0,1],utils.degToRad(-90)).mul(
			Quaternion.fromAxisAngle([0,1,0],utils.degToRad(90))
			)
		),
	
	[len,len*0.7,-len],
	  Quaternion.fromAxisAngle([1,0,0],utils.degToRad(90)).mul(
		Quaternion.fromAxisAngle([0,0,1],utils.degToRad(-90)).mul(
			Quaternion.fromAxisAngle([0,1,0],utils.degToRad(90))
			)
		),

	[len,len,-len],   Quaternion.fromAxisAngle([0,1,0],utils.degToRad(180)),
    [len*0.7,len,-len],   Quaternion.fromAxisAngle([0,1,0],utils.degToRad(180))],

// segment 4 
 [time, 
	[len*0.7,len,-len],   Quaternion.fromAxisAngle([0,1,0],utils.degToRad(180)),
	 [len*0.3,len,-len],   Quaternion.fromAxisAngle([1,0,0],utils.degToRad(90)).mul(Quaternion.fromAxisAngle([0,1,0],utils.degToRad(180))),
 	 [len*0.1,len,-len],   Quaternion.fromAxisAngle([0,1,0],utils.degToRad(270)),
	  [0,len,-len*0.7],   Quaternion.fromAxisAngle([0,1,0],utils.degToRad(270))],

// segment 5	  
 [time, 
	 [0,len,-len*0.7],   Quaternion.fromAxisAngle([0,1,0],utils.degToRad(270)),
	 [0,len,-len*0.7],   Quaternion.fromAxisAngle([0,1,0],utils.degToRad(270)),
 	 [0,len,0],   Quaternion.fromAxisAngle([1,0,0],utils.degToRad(90)).mul(Quaternion.fromAxisAngle([0,1,0],utils.degToRad(270))),
	 [0,len*0.7,0],   Quaternion.fromAxisAngle([1,0,0],utils.degToRad(90)).mul(Quaternion.fromAxisAngle([0,1,0],utils.degToRad(270)))],

// segment 6
 [time, 
	[0,len*0.7,0],   Quaternion.fromAxisAngle([1,0,0],utils.degToRad(90)).mul(Quaternion.fromAxisAngle([0,1,0],utils.degToRad(270))),
	[0,len*0.3,0],   
	Quaternion.fromAxisAngle([0,1,0],utils.degToRad(60)).mul(
		Quaternion.fromAxisAngle([1,0,0],utils.degToRad(90)).mul(
		Quaternion.fromAxisAngle([0,1,0],utils.degToRad(270))
	)),
	[0,0,0],   Quaternion.fromAxisAngle([1,0,0],utils.degToRad(0)),
 	[len*0.3,0,0],   Quaternion.fromAxisAngle([1,0,0],utils.degToRad(0))]
];
}

