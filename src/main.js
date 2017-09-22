import * as THREE from 'three';
window.THREE=THREE;
import Promise from 'es6-promise';
window.Promise=Promise;


import WebVRScene from "./WebVRScene";
import WebVRPolyfill from 'webvr-polyfill';
import ColladaLoader from "./Loaders/ColladaLoader";
import MainRoom from "./objects/MainRoom";
class ThreeVRDemo{
	

	constructor(){
		console.info("ThreeVRDemo: Initializing...");
		
		this.webVR=new WebVRScene("wrapper");

		this.room=new MainRoom(this.webVR)
		
	

		window.document.getElementById( 'vr-ui-button' ).addEventListener('click',(e)=>{
			
			//hack for user gesture play security
			window.app.room.videoPlaneScreen.play();
			window.app.room.videoPlaneScreen.pause();
			window.app.room.videoplaneTwoLogo.play();
			
		});
		
	}

	render(){
	    requestAnimationFrame(this.render.bind(this));
	    
	     
	   
  }


}

 
 
window.app=new ThreeVRDemo();