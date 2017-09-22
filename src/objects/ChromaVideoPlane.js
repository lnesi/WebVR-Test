import * as THREE from 'three';
import ChromaKeyMaterial from '../utils/ChromaKeyMaterial';

export default class ChromaVideoPlane{
	constructor(videoURL, videoWidth, videoHeight, chromaKeyColor,scale=100){
		this.movieMaterial = new ChromaKeyMaterial(videoURL, videoWidth, videoHeight, chromaKeyColor);
		this.geometry = new THREE.PlaneGeometry(videoWidth/scale, videoHeight/scale, 1, 1);
		this.object3D = new THREE.Mesh(this.geometry ,this.movieMaterial );
		this.update();
	}	
	play(){
		this.movieMaterial.video.play();
	}
	
	pause(){
		this.movieMaterial.video.pause();
	}

	update(){
		this.movieMaterial.update();
		requestAnimationFrame(this.update.bind(this));
	}
}