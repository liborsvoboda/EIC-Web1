
/*
* mediaRecorder: Media Recorder
* videoRecBlob: Recorder Blob
* videoCaptureStream: Recording Stream
* capturedVideo: new Blob(recordedBlobs, {type: EicJSscript[0].videoMimeType})
* preferCurrentTab: Browser Current Tab
* selfBrowserSurface: "include","exclude" ->Show UserQuestion for Screen fullmonitor/browser
* monitorTypeSurfaces: "include","exclude" ->Show UserQuestion for Screen fullmonitor/browser
*/
window.EicJSscript = [{
	 mediaRecorder : null, //Media Recorder
	 videoRecBlob : [], //Recorder Blob
	 videoCaptureStream: null, //Recording Stream
	 videoMimeType : "video/mp4",
	 imageMimeType : "image/png",  
	 capturedVideo : null,  
	 elVideoCameraControl: "VideoCameraButton",
	 elVideoScreenControl: "VideoScreenButton",
	 elVideoPlayer: "VideoPlayer", 
	 elImageControl: "ImageButton",
	 elImagePreview: "ImagePreview",
	 EICconsole: "", 
	 videoCaptureOpt : {
		video: { displaySurface: "browser" }, // "monitor","browser"
		audio: { suppressLocalAudioPlayback: false },
		preferCurrentTab: false,
		systemAudio: "include",
		selfBrowserSurface: "exclude",
		surfaceSwitching: "include",
		monitorTypeSurfaces: "include"
		//, cursor: 'always'		
	}
}];


//Start Capturing Video
if(!navigator.getDisplayMedia && !navigator.mediaDevices.getDisplayMedia) {
    var error = 'Your browser does NOT supports getDisplayMedia API.';
    EicJSscript[0].EICconsole = error + "\r\n" + EicJSscript[0].EICconsole ;
    document.getElementById(EicJSscript[0].elVideoCameraControl).style.display = 'none';
	document.getElementById(EicJSscript[0].elVideoScreenControl).style.display = 'none';
	document.getElementById(EicJSscript[0].elImageControl).style.display = 'none';
}


window.EicJSscript.CaptureCameraToVideo = async function() {
	let tmpVideoCtrl = document.getElementById(EicJSscript[0].elVideoCameraControl);
	if(tmpVideoCtrl.value ==  "start"){
		tmpVideoCtrl.value =  "stop";
		tmpVideoCtrl.innerHTML = tmpVideoCtrl.innerHTML.replace("Start","Stop");
		try {
			const stream = await navigator.mediaDevices.getUserMedia(EicJSscript[0].videoCaptureOpt);
			let tmpVideoPlayer = document.getElementById(EicJSscript[0].elVideoPlayer);
			tmpVideoPlayer.style.display = "inline";
			tmpVideoPlayer.src = "";
			tmpVideoPlayer.srcObject = stream;
			tmpVideoPlayer.play;
			EicJSscript.HandleStreamSuccess(stream);
		} catch (e) { EicJSscript[0].EICconsole = 'navigator.getUserMedia error: ' + e + "\r\n" + EicJSscript[0].EICconsole; }
	} else{ 
		EicJSscript[0].mediaRecorder.stop();
		let tracks = EicJSscript[0].videoCaptureStream.getTracks();
		tracks.forEach(track => {track.stop();});
	}
}

window.EicJSscript.CaptureScreenToVideo = async function() {
	let tmpVideoCtrl = document.getElementById(EicJSscript[0].elVideoScreenControl);
	if(tmpVideoCtrl.value ==  "start"){
		tmpVideoCtrl.value =  "stop";
		tmpVideoCtrl.innerHTML = tmpVideoCtrl.innerHTML.replace("Start","Stop");
		try {
			const stream = await navigator.mediaDevices.getDisplayMedia(EicJSscript[0].videoCaptureOpt);
			let tmpVideoPlayer = document.getElementById(EicJSscript[0].elVideoPlayer);
			tmpVideoPlayer.style.display = "inline";
			tmpVideoPlayer.src = "";
			tmpVideoPlayer.srcObject = stream;
			tmpVideoPlayer.play;
			EicJSscript.HandleStreamSuccess(stream);
		} catch (e) { EicJSscript[0].EICconsole = 'navigator.getUserMedia error: ' + e + "\r\n" + EicJSscript[0].EICconsole; }
	} else{ 
		EicJSscript[0].mediaRecorder.stop();
		let tracks = EicJSscript[0].videoCaptureStream.getTracks();
		tracks.forEach(track => {track.stop();});
	}
}



window.EicJSscript.HandleStreamSuccess = function(stream) {
  EicJSscript[0].videoCaptureStream= stream;
  window.EicJSscript.StartVideoRecording();
}


window.EicJSscript.StartVideoRecording =async function(){
	try {
		let options = EicJSscript[0].videoMimeType;
		EicJSscript[0].mediaRecorder = new MediaRecorder(EicJSscript[0].videoCaptureStream, {options});
	} catch (e) {
		EicJSscript[0].EICconsole = 'Exception while creating MediaRecorder: ' + e + "\r\n" + EicJSscript[0].EICconsole;
		return;
	}
	EicJSscript[0].mediaRecorder.ondataavailable = EicJSscript.HandleDataAvailable;
	EicJSscript[0].mediaRecorder.start();
}


window.EicJSscript.HandleDataAvailable= function (event) {
  if (event.data && event.data.size > 0) {
    EicJSscript[0].videoRecBlob.push(event.data);
	EicJSscript[0].capturedVideo = new Blob(EicJSscript[0].videoRecBlob, {type: EicJSscript[0].videoMimeType});
  }
}

window.EicJSscript.DownloadCapturedVideo = function(){
	const EICdownloadUrl = window.URL.createObjectURL(EicJSscript[0].capturedVideo);
	const a = document.createElement('a');
	a.style.display = 'none'; a.href = EICdownloadUrl;
	a.download = a.mimeType = EicJSscript[0].videoMimeType;
	document.body.appendChild(a);a.click();
	setTimeout(() => {document.body.removeChild(a);window.URL.revokeObjectURL(EICdownloadUrl);}, 100);
}


//Start Capturing Screen Image
window.EicJSscript.CaptureToCanvas = async function () {
	let EICtmpStream = await navigator.mediaDevices.getDisplayMedia({video: true});
	let EICtmpVideo = document.createElement("video");
	EICtmpVideo.srcObject = EICtmpStream;
	EICtmpVideo.play();
	
	return new Promise(resolve => {
		EICtmpVideo.addEventListener("canplay", e => {
			let EICtmpCanvas = EicJSscript.DrawCaptureImage(EICtmpVideo);
			resolve(EICtmpCanvas);
		}, {once:true});
	});
}

window.EicJSscript.CaptureToImage = async function() {
	setTimeout(async () => {
		let EICvideoCanvas = await EicJSscript.CaptureToCanvas();
		localStorage.setItem(EicJSscript[0].elImagePreview, EICvideoCanvas.toDataURL("image/png"));
		document.getElementById(EicJSscript[0].elImagePreview).src = localStorage.getItem(EicJSscript[0].elImagePreview,null);
		document.getElementById(EicJSscript[0].elVideoPlayer).style.display = "none";
		document.getElementById(EicJSscript[0].elImagePreview).style.display = "inline";
	}, 500);
}


window.EicJSscript.DrawCaptureImage = function(video) {
	let EICtmpCanvas = document.createElement("canvas");
	video.width = EICtmpCanvas.width = video.videoWidth;
	video.height = EICtmpCanvas.height = video.videoHeight;
	EICtmpCanvas.getContext("2d").drawImage(video, 0, 0);
	video.srcObject.getTracks().forEach(track => track.stop());
	video.srcObject = null;
	return EICtmpCanvas;
}

window.EicJSscript.DownloadCapturedImage= function () {
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = localStorage.getItem(EicJSscript[0].elImagePreview,null);
    a.download = "ScreenShot.png";
    document.body.appendChild(a);
    a.click();
	setTimeout(() => {
		document.body.removeChild(a);
	}, 100);
}


window.EicJSscript.ClearCapturedImage = function() {
   localStorage.setItem(EicJSscript[0].elImagePreview,null);
}


//End Capturing Screen Image