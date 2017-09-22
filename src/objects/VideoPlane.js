import * as THREE from 'three';
export default class VideoPlane extends THREE.Mesh{
	constructor(videoURL,geometryWidth,geometryHeight,name="VideoPlane"){
		var video = document.createElement('video');
		video.attribute
		video.loop = true;
		video.src = videoURL;
		video.setAttribute("playsinline",true);
		video.load();
		
		var texture = new THREE.VideoTexture( video );
		texture.minFilter = THREE.LinearFilter;
		texture.magFilter = THREE.LinearFilter;
		texture.format = THREE.RGBFormat;

		var geometry = new THREE.PlaneGeometry( geometryWidth, geometryHeight, 1 );
		

		var material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide} );


		super(geometry,material);
		this.video=video;
		this.name=name;

	}

	play(){
		this.video.play();
	}

	pause(){
		this.video.pause();
	}
}