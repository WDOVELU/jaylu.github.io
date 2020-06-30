var selectMeshIdx=-1;
var rotating = false;
var editing = false;
var lastX = 0.0;
var lastY = 0.0;
var keyPressed = new Map();
var editing_unlock_button = false;
var editing_op_button = -1;

function onRadioButtonChange(value){
    editing_op_button = value;
}

function onCheckBoxChange(value_lock){
    console.log("Checkbox value_lock changed to "+value_lock);   //true or flase
    editing_unlock_button = value_lock;
}

function onDropdownChange(value){
    selectMeshIdx = value;
    console.log("selectMeshIdx: "+selectMeshIdx);
}

function onViewChange(value){
  selectView = value;
  console.log("selectView: "+selectView);
  if(selectView == 11 ){
     cx = 0.9744458393861116;
     cy = 1.724567651205733;
     cz = 12.994299646752506;
     roll = elevation =angle = 0.01;
     Oelevation = -49;   //pitch for mouse
     Oangle =120.6;       //yaw for mouse
  }
  if(selectView == 12 ){
    cx = 0;
    cy = -0.5;
    cz = 11;
    roll = elevation =angle = 0.01;
    Oelevation = -90.0;
    Oangle = 0.0;
 }
 if(selectView == 13 ){
  cx = 0;
  cy = 3.0;
  cz = 2.0;
  roll = elevation =angle = 0.01;
  Oelevation = 0.0;
  Oangle = 0.0;
}

}



function edit_furniture() {
    window.onmousemove = function (event) {
      var dx = event.x - lastX;
      var dy = event.y - lastY;
  
      if (rotating && !editing_unlock_button ) {
        Oelevation -= dy * 0.2;
        if (Oelevation > 90) {
          Oelevation = 90;
        }
        if (Oelevation < -90) {
          Oelevation = -90;
        }
        Oangle += dx * 0.2;
      }
  
      // var cc= editing || editing_unlock_button;
      // console.log("cc:"+cc);

      if(selectMeshIdx>=0 && selectMeshIdx<meshRenderers.length
        && (editing || editing_unlock_button ))
      {
        let mr=meshRenderers[selectMeshIdx]
  
        var Rx = utils.MakeRotateXMatrix(Oelevation);
        var Ry = utils.MakeRotateYMatrix(Oangle);
        var invV = utils.multiplyMatrices(Ry, Rx);
  
        var up = utils.multiplyMatrixVector(invV, [0, 1, 0, 0]);  //Displacement in normal screen space
        var right = utils.multiplyMatrixVector(invV, [1, 0, 0, 0]);
        
        // translation
        if(keyPressed["z"] || (editing_op_button == 8 && rotating) )
        {
           cx = 0;
           cy = -0.5;
           cz = 11;
           roll = elevation =angle = 0.01;
           Oelevation = -90.0;
           Oangle = 0.0;
           
           mr.location[0]+=(-up[0]*dy+right[0]*dx)*0.02;
           mr.location[1]+=(-up[1]*dy+right[1]*dx)*0.02;
           mr.location[2]+=(-up[2]*dy+right[2]*dx)*0.02;

          // console.log("mr.location"+ mr.location)
          // console.log("up"+ up)
          // console.log("right"+ right)
        }

        //scaling 
        if(keyPressed["x"] || (editing_op_button == 9 && rotating) )
        {
          mr.scale*=Math.pow(1.01,-dy);
        }

        //rotating furniture
        if(keyPressed["c"] || (editing_op_button == 10 && rotating) )
        {
          mr.rotY+=dx*0.5;
          mr.rotX+=dy*0.5;
        }
      }
  
      lastX = event.x;
      lastY = event.y;
    };
  
    window.onmousedown = function (event) {
      if (event.button == 0) {
        rotating = true;
      }
      if(event.button==1)   //Middle Button or check the unlock button
      {
        editing=true;
      }
    };
  
    window.onmouseup = function (event) {
      if (event.button == 0) {
        rotating = false;
      }
      if(event.button == 1 )   //Middle Button
      {
        editing=false;
      }
    };
  
  
    window.onkeydown = function (event) {
      keyPressed[event.key.toLowerCase()] = true;
      if(!isNaN(parseInt(event.key)))
      {
        selectMeshIdx = parseInt(event.key);
      }
  
      if(event.key.toLowerCase()=="p")
      {
        var info="";
        meshRenderers.forEach((mr,i)=>{
          info+="meshRenderers["+i+"].location=["+mr.location+"];\n";
          info+="meshRenderers["+i+"].scale="+mr.scale+";\n";
          info+="meshRenderers["+i+"].rotY="+mr.rotY+";\n";
          info+="meshRenderers["+i+"].rotX="+mr.rotX+";\n";
          info+="\n";
        });
        console.log(info)
      }
    };
  
    window.onkeyup = function (event) {
      keyPressed[event.key.toLowerCase()] = false;
    };
  }

