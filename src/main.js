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

		new MainRoom(this.webVR.scene)
		
		 
		
	}

	render(){
	    requestAnimationFrame(this.render.bind(this));
	    
	     
	   
  }


}

 
 
window.app=new ThreeVRDemo();