import * as THREE from 'three';
import * as WebVRui from 'webvr-ui';
import VRControls from './controls/VRControls';
import VREffect from './effects/VREffect';
import Reticulum from './utils/Reticulum';

export default class WebVRScene{
	
	constructor(sceneHolderID){
		console.log("ThreeVRDemo: Creting WebVRScene...");

		this.lastRenderTime=0;
		
		this.setupScene(sceneHolderID)
		this.setupVR();

		window.addEventListener('resize', this.onResize.bind(this), true);
		window.addEventListener('vrdisplaypresentchange', this.onResize.bind(this), true);
		
		document.getElementById('webvr-try-vr-disabled').addEventListener('click',function(){
	    	this.enterVR.requestEnterFullscreen();
	    }.bind(this));
		window.scene=this.scene;

		this.createGazeInteractor()
		
	}
	
	onResize(e){
		document.getElementsByTagName("body").width=window.innerWidth;
		document.getElementsByTagName("body").height=window.innerHeight;
		this.vrEffect.setSize(window.innerWidth, window.innerHeight);
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
	}

	setupScene(sceneHolderID){
		this.scene = new THREE.Scene();
		this.renderer = new THREE.WebGLRenderer({ antialiasing: true });
		this.renderer.setClearColor(0x3399ff);
		this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
		this.audioListener = new THREE.AudioListener();
		this.audioListener.name="AudioListener";
		this.camera.add(this.audioListener);
		this.vrControls = new VRControls(this.camera);
	    this.vrControls.standing = true;
	    this.camera.position.y = this.vrControls.userHeight;

	    this.vrEffect = new VREffect(this.renderer);
    	this.vrEffect.setSize(window.innerWidth, window.innerHeight);
     	this.renderer.setPixelRatio(Math.floor(window.devicePixelRatio));
     	
		document.getElementById(sceneHolderID).appendChild( this.renderer.domElement );
		this.renderer.setSize( window.innerWidth, window.innerHeight );
	}
	
	setupVR(){
		var options = { 
			 "color": "black",
			 "background": "white",
			 "corners": "round"
		};
		this.enterVR = new WebVRui.EnterVRButton(this.renderer.domElement, options);
		this.enterVR.on("enter", ()=>{
                console.log("enter VR")
            })
            .on("exit",()=>{
                console.log("exit VR");
                this.camera.quaternion.set(0,0,0,1);
                this.camera.position.set(0,this.vrControls.userHeight,0); 
            })
            .on("hide", ()=>{
                document.getElementById("webvr-ui").style.display = "none";
                // On iOS there is no button to close fullscreen mode, so we need to provide one
                if(this.enterVR.state == WebVRui.State.PRESENTING_FULLSCREEN) document.getElementById("webvr-exit").style.display = "initial";
            })
            .on("show", ()=>{
                document.getElementById("webvr-ui").style.display = "inherit";
                document.getElementById("webvr-exit").style.display = "none";
            }).on("error",(error) => {
                //document.getElementById("learn-more").style.display = "inline";
                console.error(error);
            });

        this.vrDisplay=null;
        this.enterVR.getVRDisplay().then((display) => {
                this.vrDisplay = display;
                display.requestAnimationFrame(this.update.bind(this));
                this.update();
            }).catch(()=>{
                // If there is no display available, fallback to window
                this.vrDisplay = window;
                window.requestAnimationFrame(this.update.bind(this));
                this.update();
            });

		document.getElementById("vr-ui-button").append(this.enterVR.domElement);
	}
	createGazeInteractor(){
		var restPoint=this.vrControls.userHeight;
		Reticulum.init(this.camera, {
			proximity: false,
			clickevents: true,
			near: 4, //near factor of the raycaster (shouldn't be negative and should be smaller than the far property)
			far: 20, //far factor of the raycaster (shouldn't be negative and should be larger than the near property)
	
			reticle: {
				visible: true,
				restPoint:restPoint, //Defines the reticle's resting point when no object has been targeted
				color: 0xcc00cc,
				innerRadius: 0.0004,
				outerRadius: 0.003,
				hover: {
					color: 0x00cccc,
					innerRadius: 0.02,
					outerRadius: 0.024,
					speed: 5,
					vibrate: 50 //Set to 0 or [] to disable
				}
			},
			fuse: {
				visible: false,
				duration: 2.5,
				color: 0x00fff6,
				innerRadius: 0.045,
				outerRadius: 0.06,
				vibrate: 0, //Set to 0 or [] to disable
				clickCancelFuse: false //If users clicks on targeted object fuse is canceled
			}
		});
		this.camera.name="Camera";
		this.scene.add(this.camera);
	}
	update(timestamp){
		this.lastRenderTime = timestamp;
		Reticulum.update();
        if(this.enterVR.isPresenting()){
            this.vrControls.update();
            this.renderer.render(this.scene,this.camera);
            this.vrEffect.render(this.scene, this.camera);
        } else {
            this.renderer.render(this.scene,this.camera);
        }
        this.vrDisplay.requestAnimationFrame(this.update.bind(this));
	}
}