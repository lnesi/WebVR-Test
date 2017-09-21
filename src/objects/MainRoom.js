import * as THREE from 'three';
import ColladaLoader from "../Loaders/ColladaLoader";
import Reticulum from '../utils/reticulum';

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
		var texture = new THREE.TextureLoader().load( "assets/london.jpg" );
		var geometry = new THREE.PlaneGeometry( 8, 4.5, 1 );
		var material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide} );
		var plane = new THREE.Mesh( geometry, material );
		plane.position.z=-11
		plane.position.y=5
		this.scene.add( plane );

		Reticulum.add( plane, {
			clickCancelFuse: true, // Overrides global setting for fuse's clickCancelFuse
			reticleHoverColor: 0x00fff6, // Overrides global reticle hover color
			fuseVisible: true, // Overrides global fuse visibility
			fuseDuration: 1.5, // Overrides global fuse duration
			fuseColor: 0xcc0000, // Overrides global fuse color
			onGazeOver: function(){
				// do something when user targets object
				//this.material.emissive.setHex( 0xffcc00 );
			},
			onGazeOut: function(){
				// do something when user moves reticle off targeted object
				//this.material.emissive.setHex( 0xcc0000 );
			},
			onGazeLong: function(){
				// do something user targetes object for specific time
				//this.material.emissive.setHex( 0x0000cc );
			},
			onGazeClick: function(){
				// have the object react when user clicks / taps on targeted object
				//this.material.emissive.setHex( 0x0000cc );
			}
		});
	}
}