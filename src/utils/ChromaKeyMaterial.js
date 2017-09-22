// Based on https://github.com/makc/makc.github.io/blob/master/three.js/chromakey/index.html
// https://makc3d.wordpress.com/2014/04/01/transparent-video-texture-in-three-js/
import * as THREE from 'three';

var ChromaKeyMaterial = function (url, width, height, keyColor) {
	console.log(url)
	THREE.ShaderMaterial.call(this);

	var video = document.createElement('video');
	video.attribute
	video.loop = true;
	video.src = url;
	video.setAttribute("playsinline",true);
	video.load();
	

	this.video=video;
	var videoImage = document.createElement('canvas');
	if (window["URL"]) document.body.appendChild(videoImage);
	videoImage.width = width;
	videoImage.height = height;
	
	var keyColorObject = new THREE.Color(keyColor);

	var videoImageContext = videoImage.getContext('2d');
	// background color if no video present
	videoImageContext.fillStyle = '#' + keyColorObject.getHexString();
	videoImageContext.fillRect(0, 0, videoImage.width, videoImage.height);

	var videoTexture = new THREE.Texture(videoImage);
	videoTexture.minFilter = THREE.LinearFilter;
	videoTexture.magFilter = THREE.LinearFilter;

	this.update = function () {
		
		if (video.readyState === video.HAVE_ENOUGH_DATA) {
			videoImageContext.drawImage(video, 0, 0);
			if (videoTexture) {
				videoTexture.needsUpdate = true;
			}
		}
	}

	this.setValues({

		uniforms: {
			texture: {
				type: "t",
				value: videoTexture
			},
			color: {
				type: "c",
				value: keyColorObject
			}
		},
		vertexShader: "varying vec2 vUv;	void main()	{		vUv = uv;		vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );		gl_Position = projectionMatrix * mvPosition;	}",
		fragmentShader: "uniform sampler2D texture; 	uniform vec3 color; 	varying vec2 vUv;	void main()	{		vec3 tColor = texture2D( texture, vUv ).rgb;		float a = (length(tColor - color) - 0.5) * 7.0;				gl_FragColor = vec4(tColor, a);	}",

		transparent: true
	});
}

ChromaKeyMaterial.prototype = Object.create(THREE.ShaderMaterial.prototype);

export default ChromaKeyMaterial