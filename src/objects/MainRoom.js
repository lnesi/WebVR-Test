import * as THREE from 'three';
import ColladaLoader from "../Loaders/ColladaLoader";
import Reticulum from '../utils/Reticulum';
import ChromaVideoPlane from '../objects/ChromaVideoPlane';

export default class MainRoom{
	constructor(scene){
		this.scene=scene;
		var loader=new THREE.ObjectLoader();
		
		loader.load(
			// resource URL
			'assets/model.json',
			// Function when resource is loaded
			function ( object ,p1,p2) {
			
				this.scene.add(object);
				this.addObjects();
			}.bind(this),
			// Function called when download progresses
			function ( xhr ) {
				console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
			},
			// Function called when download errors
			function ( xhr ) {
				console.log( 'An error happened' );
			}
		);



	}

	addObjects(){
		this.videoplaneTwoLogo=new ChromaVideoPlane('assets/logo.mp4', 1920, 1080, 0x00000);
		this.videoplaneTwoLogo.object3D.scale.x=0.5;
		this.videoplaneTwoLogo.object3D.scale.y=0.5;
		this.videoplaneTwoLogo.object3D.position.z=-11.5;
		this.videoplaneTwoLogo.object3D.position.y=3;
		this.videoplaneTwoLogo.object3D.position.x=5;
		this.scene.add( this.videoplaneTwoLogo.object3D );


	

		Reticulum.add( this.videoplaneTwoLogo.object3D, {
			clickCancelFuse: false, // Overrides global setting for fuse's clickCancelFuse
			reticleHoverColor: 0x00fff6, // Overrides global reticle hover color
			fuseVisible: true, // Overrides global fuse visibility
			fuseDuration: 1.5, // Overrides global fuse duration
			fuseColor: 0xcc0000, // Overrides global fuse color
			onGazeOver: function(){
				console.log("onGazeOver")
				// do something when user targets object
				//this.material.emissive.setHex( 0xffcc00 );
			},
			onGazeOut: function(){
				console.log("onGazeOut")
				this.videoplaneTwoLogo.pause();
				// do something when user moves reticle off targeted object
				//this.material.emissive.setHex( 0xcc0000 );
			}.bind(this),
			onGazeLong: function(){
				console.log("onGazeLong",this)
				//console.log(plane.reticulumData)
				this.videoplaneTwoLogo.play();
				
				// do something user targetes object for specific time
				//this.material.emissive.setHex( 0x0000cc );
			}.bind(this),
			onGazeClick: function(){
				console.log("onGazeClick")
				// have the object react when user clicks / taps on targeted object
				//this.material.emissive.setHex( 0x0000cc );
			}
		});

		
		
	}

	update(){
		this.movieMaterial.update();
		requestAnimationFrame(this.update.bind(this));
	}
}





