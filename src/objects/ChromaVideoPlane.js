import * as THREE from 'three';
import ChromaKeyMaterial from '../utils/ChromaKeyMaterial';

export default class ChromaVideoPlane extends THREE.Mesh{
	constructor(videoURL, videoWidth, videoHeight, chromaKeyColor,scale=100,name="ChromaVideoPlane"){
		var movieMaterial = new ChromaKeyMaterial(videoURL, videoWidth, videoHeight, chromaKeyColor);
		var geometry = new THREE.PlaneGeometry(videoWidth/scale, videoHeight/scale, 1, 1);
		super(geometry,movieMaterial);
		this.movieMaterial=movieMaterial;
		this.name=name;
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