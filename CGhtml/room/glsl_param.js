
function unifPar(pHTML, pGLSL, type) {
	this.pHTML = pHTML;
	this.pGLSL = pGLSL;
	this.type = type;
}

function noAutoSet(gl) {
}

function val(gl) {
	gl.uniform1f(program[this.pGLSL+"Uniform"], document.getElementById(this.pHTML).value);
    console.log(this.pHTML+": " + document.getElementById(this.pHTML).value);
    
}

function valD10(gl) {
    gl.uniform1f(program[this.pGLSL+"Uniform"], document.getElementById(this.pHTML).value / 10);
    console.log(this.pHTML+": " + document.getElementById(this.pHTML).value);
     
}

function valCol(gl) {
    col = document.getElementById(this.pHTML).value.substring(1,7);
    console.log(this.pHTML+": " + document.getElementById(this.pHTML).value);
    
    R = parseInt(col.substring(0,2) ,16) / 255;
    G = parseInt(col.substring(2,4) ,16) / 255;
    B = parseInt(col.substring(4,6) ,16) / 255;
	gl.uniform4f(program[this.pGLSL+"Uniform"], R, G, B, 1);
}

function valVec3(gl) {
	gl.uniform3f(program[this.pGLSL+"Uniform"],
				 document.getElementById(this.pHTML+"X").value / 10,
				 document.getElementById(this.pHTML+"Y").value / 10,
                 document.getElementById(this.pHTML+"Z").value / 10);
    console.log(this.pHTML+"Z: "+ document.getElementById(this.pHTML+"X").value);
    console.log(this.pHTML+"Z: "+ document.getElementById(this.pHTML+"Y").value);                 
    console.log(this.pHTML+"Z: "+ document.getElementById(this.pHTML+"Z").value);
}


unifParArray =[
	new unifPar("LAPos","LAPos", valVec3),
	new unifPar("LADecay","LADecay", val),
	new unifPar("LATarget","LATarget", valD10),
	new unifPar("LAlightColor","LAlightColor", valCol),
	new unifPar("ambientLightColor","ambientLightColor", valCol),
	new unifPar("diffuseColor","diffuseColor", valCol),
	new unifPar("specularColor","specularColor", valCol),
	new unifPar("SpecShine","SpecShine", val),
	new unifPar("ambientMatColor","ambientMatColor", valCol),
    new unifPar("","eyePos", noAutoSet)
];

