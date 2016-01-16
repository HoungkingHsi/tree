/**
 * @author oosmoxiecode
 *
 * A custom depth shader
 */

THREE.CustomDepthShader = {

	uniforms: {

		"mNear": { type: "f", value: 10.0 },
		"mFar" : { type: "f", value: 2000.0 },
		"opacity" : { type: "f", value: 1.0 },
		"lightColor" : { type: "c", value: new THREE.Color( 0xf8c887 ) },
		"objectColor" : { type: "c", value: new THREE.Color( 0x11131a ) },

	},

	vertexShader: [

		"void main() {",

			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform float mNear;",
		"uniform float mFar;",
		"uniform float opacity;",

		"uniform vec3 lightColor;",
		"uniform vec3 objectColor;",

		"void main() {",

			"float depth = gl_FragCoord.z / gl_FragCoord.w;",
			"float color = 1.0 - smoothstep( mNear, mFar, depth );",
			"float invColor = 1.0 - color;",

			"vec3 outColor = lightColor;",

			"if (invColor < 0.7) {",
				"outColor = objectColor;",
			"}",

			"gl_FragColor = vec4( outColor, opacity );",
			//"gl_FragColor = vec4( 1.0, 0.0, 0.0, opacity );",

		"}"

	].join("\n")

};