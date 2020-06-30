#version 300 es
#define POSITION_LOCATION 0
#define NORMAL_LOCATION 1
#define UV_LOCATION 2
// in vec3 a_position;
// in vec3 a_norms;
// in vec2 a_uv;


layout(location = POSITION_LOCATION) in vec3 a_position;
layout(location = NORMAL_LOCATION) in vec3 a_norms;
layout(location = UV_LOCATION) in vec2 a_uv;

uniform mat4 M; 
uniform mat4 VP; 

out vec3 pos;
out vec3 norms;
out vec2 uvFS;

void main() {


	pos = (M * vec4(a_position, 1.0)).xyz;
	norms = a_norms;
	uvFS =  a_uv;
	
	gl_Position =  VP * (M * vec4(a_position,1.0));

//  norms = a_norms;
//  uvFS = a_uv;
//  gl_Position = VP * (M * vec4(a_position,1.0));
//  pos = gl_Position;

}