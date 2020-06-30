var program;
var gl;
var posAttribLoc;
var uvAttribLoc;
var texUnifromLoc;
var MUnifromLoc;
var VPUnifromLoc;


var perspectiveMatrix;
var viewMatrix;

var shaderDir;
var baseDir;

var meshRenderers=[];

//######################### Start: class MeshRenderer #########################
class MeshRenderer {
  vao = null;  //vertex array object:draw the same object multiple times
  location=[0,0,0];
  scale=1;
  rotY=0;
  rotX=0;

  textures = [];   // save the textures for this object 
  subMeshData = [];// save the different meshes from obj file or json file

  async  LoadObj(objPath) {
    var objStr = await utils.get_objstr(objPath);
    var mesh = new OBJ.Mesh(objStr);

    var mtlStr = await utils.get_objstr(objPath.replace(".obj", ".mtl"));
    var mtls = new OBJ.MaterialLibrary(mtlStr);  //if we have mtl file ,load it.

    this.vao = gl.createVertexArray();
    gl.bindVertexArray(this.vao);    //状态设置函数

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh.vertices), gl.STATIC_DRAW);
    gl.vertexAttribPointer(posAttribLoc, 3, gl.FLOAT, false, 0, 0);
//状态使用

    var uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh.textures), gl.STATIC_DRAW);
    gl.vertexAttribPointer(uvAttribLoc, 2, gl.FLOAT, false, 0, 0);

    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

    var subMeshIndices = []
    var dir = objPath.substr(0, objPath.lastIndexOf('/')) + "/";   //the path of floder including asset
    // var ddd = [mesh.indices]
    for (var i = 0; i < mesh.indicesPerMaterial.length; ++i) {
      
      let indices = mesh.indicesPerMaterial[i]    //indicesPerMaterial from webgl-obj-loader
      let materialName = mesh.materialNames[i]    //materialNames from webgl-obj-loader  example: for 2DoorUpperCabinet :wood, wood1, woodenhandle
      var texName = mtls.materials[materialName].mapDiffuse.filename
      if (texName == "") {
        texName = "white.png"
      }

      var md = new Map()    
      md.start = subMeshIndices.length;
      md.count = indices.length,
      md.texIdx = this.textures.length
      this.subMeshData.push(md)

      this.textures.push(loadTexture(dir + texName))

      subMeshIndices = subMeshIndices.concat(indices)
    }

    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(subMeshIndices), gl.STATIC_DRAW);

    //clear vao and vbo for this object's gl
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }


  async  LoadJson(josnPath) {
    var model;
    await utils.get_json(josnPath, function (jsonModel) {
      model=jsonModel;
    });

    var dir = josnPath.substr(0, josnPath.lastIndexOf('/')) + "/";
    this.vao = gl.createVertexArray();
    gl.bindVertexArray(this.vao);

    //find textures in json file.
    for(var i=0;i<model.materials.length;++i)
    {
      var texName;
      model.materials[i].properties.forEach((m) => {
        if(m.key=="$tex.file")
        {
          texName=m.value
        }
      })

      if (texName == "") {
        texName = "white.png"
      }
      this.textures.push(loadTexture(dir + texName));
    }

    var vertices = []
    var uvs = []
    var indices = []
    for (var i=0;i<model.meshes.length;++i)
    {
      let m=model.meshes[i]
      var md = new Map()          //md represent the current mesh part
      md.start = indices.length;    
      md.count = m.faces.length*3;
      md.texIdx = m.materialindex;
      this.subMeshData.push(md);
      var startIndex=vertices.length

      m.vertices.forEach((p)=>{vertices.push(p)})
      if(m.texturecoords)
      {
        m.texturecoords[0].forEach((u)=>{uvs.push(u)})
      }
      m.faces.forEach((f)=>{
        f.forEach((vi)=>{
          indices.push(vi+startIndex)
        })
      })
    }

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.vertexAttribPointer(posAttribLoc, 3, gl.FLOAT, false, 0, 0);

    var uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvs), gl.STATIC_DRAW);
    gl.vertexAttribPointer(uvAttribLoc, 2, gl.FLOAT, false, 0, 0);

    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }

  // Overloaded function
  static async LoadJson(jsonPath) {
    var mr=new MeshRenderer()
    await mr.LoadJson(jsonPath)
    return mr
  }
  static async LoadObj(objPath) {
    var mr=new MeshRenderer()
    await mr.LoadObj(objPath)
    return mr
  }

  draw() {
    gl.bindVertexArray(this.vao)
    gl.enableVertexAttribArray(posAttribLoc);
    gl.enableVertexAttribArray(uvAttribLoc);

    var T=utils.MakeTranslateMatrix(this.location[0],this.location[1],this.location[2]);
    var S=utils.MakeScaleMatrix(this.scale);
    var R=utils.multiplyMatrices(utils.MakeRotateYMatrix(this.rotY),utils.MakeRotateXMatrix(this.rotX));
    // world matrix
    var m=utils.multiplyMatrices(T,utils.multiplyMatrices(R,S))
    gl.uniformMatrix4fv(MUnifromLoc, gl.FALSE, utils.transposeMatrix(m));

    for (var i = 0; i < this.subMeshData.length; ++i) {
      var md = this.subMeshData[i]
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.textures[md.texIdx])
      gl.uniform1i(texUnifromLoc, 0)

      gl.drawElements(gl.TRIANGLES, md.count, gl.UNSIGNED_SHORT, md.start * 2)
    }

    gl.bindVertexArray(null)
    gl.disableVertexAttribArray(posAttribLoc);
    gl.disableVertexAttribArray(uvAttribLoc);

  }
}
//######################### End: class MeshRenderer #########################


//######################### Start: function loadTexture(path) #########################
function loadTexture(path) {
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  var image = new Image();
  image.src = path;
  image.onload = function () {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.generateMipmap(gl.TEXTURE_2D);
  };
  return texture;
}
//######################### End: function loadTexture(path) #########################


//######################### Start: function init() #########################
async function init() {

  var path = window.location.pathname;
  var page = path.split("/").pop();
  baseDir = window.location.href.replace(page, '');
  shaderDir = baseDir + "shaders/";

  window.addEventListener("keyup", keyFunctionUp, false);
  window.addEventListener("keydown", keyFunctionDown, false);
  

  edit_furniture()

  var canvas = document.getElementById("c");
  gl = canvas.getContext("webgl2");
  if (!gl) {
    document.write("GL context not opened");
    return;
  }

  await  utils.loadFiles([shaderDir + 'vs.glsl', shaderDir + 'fs.glsl'], function (shaderText) {
    var vertexShader = utils.createShader(gl, gl.VERTEX_SHADER, shaderText[0]);
    var fragmentShader = utils.createShader(gl, gl.FRAGMENT_SHADER, shaderText[1]);
    program = utils.createProgram(gl, vertexShader, fragmentShader);

    posAttribLoc = gl.getAttribLocation(program, "a_position")
    uvAttribLoc = gl.getAttribLocation(program, "a_uv")

    texUnifromLoc = gl.getUniformLocation(program, "u_texture")
    VPUnifromLoc = gl.getUniformLocation(program, "VP")
    MUnifromLoc = gl.getUniformLocation(program, "M")
  });

  meshRenderers.push(await MeshRenderer.LoadJson(baseDir + 'model/bed.json'));
  meshRenderers.push(await MeshRenderer.LoadObj(baseDir + 'model/tableBasse2.obj'));
  meshRenderers.push(await MeshRenderer.LoadObj(baseDir + 'model/2DoorUpperCabinet.obj'));
  meshRenderers.push(await MeshRenderer.LoadObj(baseDir + 'model/EmptyRoom.obj'));
  meshRenderers.push(await MeshRenderer.LoadJson(baseDir + 'model/sofa2.json'));
  meshRenderers.push(await MeshRenderer.LoadJson(baseDir + 'model/chair.json'));
  meshRenderers.push(await MeshRenderer.LoadJson(baseDir + 'model/closet.json'));
  
  // Debug mesh
  // for (var objnum = 0 ; objnum < meshRenderers.length; ++objnum) {
  //   console.log("obj"+objnum+" meshes:  "+"  "+meshRenderers[objnum].subMeshData.length)
  //   console.log("obj"+objnum+" textures:  "+"  "+meshRenderers[objnum].textures.length)
  // }
  // var nn = 3;
  // console.log("table:  "+"  "+meshRenderers[1].subMeshData.length)
  // console.log("table:  "+"  "+meshRenderers[1].subMeshData[nn].start+"  "+meshRenderers[1].subMeshData[nn].count +"  "+meshRenderers[1].subMeshData[nn].texIdx)
  // console.log("table: taxtures num:  "+meshRenderers[1].textures.length)
  // var nn = 0;
  // console.log("chair:  "+"  "+meshRenderers[5].subMeshData.length)
  // console.log("chair:  "+"  "+meshRenderers[5].subMeshData[nn].start+"  "+meshRenderers[5].subMeshData[nn].count +"  "+meshRenderers[5].subMeshData[nn].texIdx)
  // console.log("chair taxtures num:  "+meshRenderers[5].textures.length)
  meshRenderers[0].location=[1.2988160373169584,0.1096710482541626,-0.8585240217552389];
  meshRenderers[0].scale=1.7458098192069167;
  meshRenderers[0].rotY=182;
  meshRenderers[0].rotX=0;
  
  meshRenderers[1].location=[-2.42410628367855,0.3284189605795518,1.194134300974329];
  meshRenderers[1].scale=1.5493175715154759;
  meshRenderers[1].rotY=90;
  meshRenderers[1].rotX=0;
  
  meshRenderers[2].location=[0.35356882160708414,1,-3.5239750146170574];
  meshRenderers[2].scale=0.3380416849005314;
  meshRenderers[2].rotY=0;
  meshRenderers[2].rotX=0;
  
  meshRenderers[3].location=[0,0,0];
  meshRenderers[3].scale=2.2612711930598572;
  meshRenderers[3].rotY=0;
  meshRenderers[3].rotX=0;
  
  meshRenderers[4].location=[-4.642242514494139,0.1443919355765431,2.634768374134994];
  meshRenderers[4].scale=1.7242113198564342;
  meshRenderers[4].rotY=88.5;
  meshRenderers[4].rotX=4.5;
  
  meshRenderers[5].location=[-2.540305105045675,0.12669230752338448,3.2307993458222124];
  meshRenderers[5].scale=0.01414008502913446;
  meshRenderers[5].rotY=180;
  meshRenderers[5].rotX=-90;
  
  meshRenderers[6].location=[-3.9836673737962607,1.3439540412938966,-2.6740094256875726];
  meshRenderers[6].scale=4.067370208900927;
  meshRenderers[6].rotY=271;
  meshRenderers[6].rotX=179.5;

  
  gl.useProgram(program);
  resizeCanvasToDisplaySize(gl.canvas);
  gl.clearColor(0.85, 1.0, 0.85, 1.0);

  drawScene();

}
//######################### end: function init() #########################


//######################### Start: function drawScene() #########################

function drawScene() {
  
	perspectiveMatrix = utils.MakePerspective(60, gl.canvas.width / gl.canvas.height, 0.01, 100.0);
  

	viewMatrix = utils.multiplyMatrices(
    utils.MakeRotateZMatrix(-roll),utils.MakeView(cx, cy, cz, elevation, angle));
    
	  // Magic for moving the ship
	  dvecmat = utils.transposeMatrix(viewMatrix); dvecmat[12] = dvecmat[13] = dvecmat[14] = 0.0;
	  
		// console.log(vx + " " + vy + " " + vz + " " + rvx + " " + rvy + " " + rvz);
	
	  if((rvx != 0) || (rvy != 0) || (rvz != 0)) {
    
    xaxis = [dvecmat[0],dvecmat[4],dvecmat[8]];
	  yaxis = [dvecmat[1],dvecmat[5],dvecmat[9]];
	  zaxis = [dvecmat[2],dvecmat[6],dvecmat[10]];
	  
    qx = Quaternion.fromAxisAngle(xaxis, utils.degToRad(rvx * 1));
		qy = Quaternion.fromAxisAngle(yaxis, utils.degToRad(rvy * 1));
		qz = Quaternion.fromAxisAngle(zaxis, utils.degToRad(rvz * 1));
		
		// console.log("-------round-------");
		// console.log(vx + " " + vy + " " + vz + " " + rvx + " " + rvy + " " + rvz);
		// console.log("-------x-------");
		// console.log(xaxis);
		// console.log(qx);
		// console.log("-------y-------");
		// console.log(yaxis);
		// console.log(qy);
		// console.log("-------z-------");
		// console.log(zaxis);
		// console.log(qz);
		
		newDvecmat = utils.multiplyMatrices(utils.multiplyMatrices(utils.multiplyMatrices (
		qy.toMatrix4(), qx.toMatrix4()), qz.toMatrix4()), dvecmat);
		R11=newDvecmat[10];R12=newDvecmat[8];R13=newDvecmat[9];
		R21=newDvecmat[2]; R22=newDvecmat[0];R23=newDvecmat[1];
		R31=newDvecmat[6]; R32=newDvecmat[4];R33=newDvecmat[5];
		
		if((R31<1)&&(R31>-1)) {
		theta = -Math.asin(R31);
		phi = Math.atan2(R32/Math.cos(theta), R33/Math.cos(theta));
		psi = Math.atan2(R21/Math.cos(theta), R11/Math.cos(theta));
		
		} else {
		phi = 0;
		if(R31<=-1) {
		theta = Math.PI / 2;
		psi = phi + Math.atan2(R12, R13);
		} else {
		theta = -Math.PI / 2;
		psi = Math.atan2(-R12, -R13) - phi;
		}
		}
		elevation = theta/Math.PI*180;
		roll      = phi/Math.PI*180;
		angle     = psi/Math.PI*180;
	
		// console.log("dvecmat" + dvecmat);
		// console.log("test2： c: "+ cx + " | "+cy + " | "+ cz + " | "+ "theta: "+   theta + " | "+ "phi: "+ phi + " | "+"psi: "+ psi + " | ");
	
	  }
	  delta = utils.multiplyMatrixVector(dvecmat, [vx, vy, vz, 0.0]);
	  cx += delta[0] / 2;
	  cy += delta[1] / 2;
	  cz += delta[2] / 2;
  
  resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.clearColor(0.85, 0.85, 0.85, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);

  var projectionMatrix = utils.multiplyMatrices(utils.multiplyMatrices(utils.multiplyMatrices(perspectiveMatrix, viewMatrix), utils.MakeRotateXMatrix(-Oelevation)), utils.MakeRotateYMatrix(Oangle));


  gl.uniformMatrix4fv(VPUnifromLoc, gl.FALSE, utils.transposeMatrix(projectionMatrix));

  // console.log(selectMeshIdx);

  console.log("c:  "+"["+cx+","+cy+","+cz+","+"]"+"\n" 
  +" elevation(pitch_x): "+elevation+" angle(yaw_y): "+angle + " roll: "+roll+"\n"
  +" Oelevation(pitch_x): "+Oelevation+" Oangle(yaw_y): "+ Oangle 
  )
  meshRenderers.forEach((mr,i)=>{
    gl.uniform1i(gl.getUniformLocation(program,"selected"),i==selectMeshIdx?1:0);
    mr.draw()
  })
  window.requestAnimationFrame(drawScene);
}

//######################### End: function drawScene() #########################




resizeCanvasToDisplaySize = function(canvas) {
  const expandFullScreen = () => {
    canvas.width = 850;
    canvas.height = 478;
    // console.log(canvas.width+" "+window.innerWidth);
  };
  expandFullScreen();
  // Resize screen when the browser has triggered the resize event
  window.addEventListener('resize', expandFullScreen);
}

window.onload = init;

