#version 300 es
precision highp float;
in vec3 pos;
in vec3 norms;
in vec2 uvFS;

uniform sampler2D u_texture;
uniform int selected;
uniform vec3 eyePos;

uniform vec3 LAPos;
uniform float LADecay;
uniform float LATarget;
uniform vec4 LAlightColor;

uniform vec4 ambientLightColor;
uniform vec4 diffuseColor;
uniform vec4 specularColor;
uniform float SpecShine;
uniform vec4 ambientMatColor;

out vec4 color;

void main() {
  color = texture(u_texture, uvFS);
  if(selected==1)
  {
    color.rgb=mix(color.rgb,vec3(1,0,0),0.5);
  }
  
  vec4 diffColor = diffuseColor ;
	vec4 ambColor = ambientMatColor;
	vec3 normalVec = normalize(norms) ;
	vec3 eyedirVec = normalize(eyePos - pos);
		
	//lights
	vec3 lightDirA = normalize(LAPos - pos);
	vec4 lightColorA = LAlightColor * pow(LATarget / length(LAPos - pos), LADecay);
	
  // Ambient
	vec4 ambientLight = ambientLightColor;

	vec4 out_color;

//1. Lambert diffuse 
	vec4 dLAcontr = clamp(dot(lightDirA, normalVec),0.0,1.0) * lightColorA;    
	vec4 diffuse = diffColor * dLAcontr ;

//2. Phong specular
	vec3 r =  2.0*dot(normalVec, lightDirA) * normalVec - lightDirA;
	vec4 sLAcontr = pow(clamp(dot(eyedirVec, r),0.0,1.0), SpecShine) * lightColorA;
	vec4 specular = specularColor * sLAcontr;
  
  // out_color = clamp(color +specular+ diffuse, 0.0, 1.0);
  out_color = clamp(color + ambientLight * ambColor + diffuse + specular, 0.0, 1.0);

  color = vec4(out_color.rgb, 1.0);
}

