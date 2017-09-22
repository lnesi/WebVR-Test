import * as THREE from 'three';
import ColladaLoader from "../Loaders/ColladaLoader";
import Reticulum from '../utils/Reticulum';
import ChromaVideoPlane from '../objects/ChromaVideoPlane';
import VideoPlane from '../objects/VideoPlane';

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
		this.videoplaneTwoLogo.scale.x=0.5;
		this.videoplaneTwoLogo.scale.y=0.5;
		this.videoplaneTwoLogo.rotation.y=-Math.PI/2;
		

		this.videoplaneTwoLogo.position.y=3;
		this.videoplaneTwoLogo.position.x=11;
		this.scene.add( this.videoplaneTwoLogo );

		this.videoPlaneScreen=new VideoPlane("assets/big_buck_bunny.mp4",8,4.5);
		this.videoPlaneScreen.position.z=-10;
		this.videoPlaneScreen.position.y=4;
		this.scene.add(this.videoPlaneScreen);

		Reticulum.add( this.videoPlaneScreen, {
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
				this.pause();
				// do something when user moves reticle off targeted object
				//this.material.emissive.setHex( 0xcc0000 );
			},
			onGazeLong: function(){
				console.log("onGazeLong",this)
				//console.log(plane.reticulumData)
				this.play();
				
				// do something user targetes object for specific time
				//this.material.emissive.setHex( 0x0000cc );
			},
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





