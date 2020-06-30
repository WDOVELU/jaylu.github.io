#version 300 es

precision mediump float;

in vec2 uvFS;
uniform sampler2D u_texture;
uniform int selected;

out vec4 outColor;

void main() {

  outColor = texture(u_texture, uvFS);
  if(selected==1)
  {
    outColor.rgb=mix(outColor.rgb,vec3(1,0,0),0.5);
  }
  //outColor.xy=uvFS-floor(uvFS);
  //outColor.z=0.0;
}