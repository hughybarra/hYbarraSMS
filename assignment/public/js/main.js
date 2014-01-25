/* 

Formulas 
SeekTime / duration  * width  = Xpos

Xpos /  Width  * duration = seektime

Questions for the teacher

1. start recording flash box pops up but I cant get it to do anything. suggestions?

2. My sliders are very buggy. Any advice on how to fix this? 

3. set time is buggy when you drop the slider to set the time. it bouces left and then shoots to the 
current time. 

*/

var flashReady = function(){
	playerControllers();
}


// Player Controllers
// ===========================================
// ===========================================
//duration/ time * width - posx 
var _mouseDown 			= false;
var _playerMouseDown 	= false;
var _soundMouseDown 	= false;
var _firstClick 		= true;
var _videoWidth 		= 300;
var _serverUrl 			= "rtmp://localhost/SMSServer";
var _videoTitle 		= "startrekintodarkness_vp6";
var _volume 			= 5;
var _totalMinutes 		= $('.minutes-total').val();
var _minutes 			= $('.minutes').val();
var _seekTime 			= 0;
var _duration			= 0;
var _recordingDevice 	= false;
var _videoDevice 		= false;
var _fileName 			= 'temp';


var playerControllers = function(){
	/* 
		Player controllers Constructer function
		builds all controller asstes 
	*/
	// declaring vars
	var mouseX = 0;
	var mouseY = 0;
	var offset = 0;
	var handle = $('.slider-handle');
	var track = $('.slider-track');
	var sliderType = '';

	// auto hide pause button
	$('.glyphicon-pause').hide();
	// icon toggle 
	// auto hide glyph icons 
	$('.glyphicon-volume-down').show();
	$('.glyphicon-volume-up').hide();
	$('.glyphicon-volume-off').hide();

	// Set volume handle to .5
	$('.sound-slider-handle').offset({left: $('.sound-slider-bar').offset().left + 50});

	// auto hide device options
	$('.device-options').hide();

	// Pause 
	$('.glyphicon-pause').click(function(){
		pauseVideo();
	})// end pause click functions

	//Play
	$('.glyphicon-play').click(function(){
		playVideo();
	});// end click function

	// handle slider functionality
	$('.slider-handle').mousedown( function(e){
		// get mousedow
		console.log('video');
		_playerMouseDown = true;

		// _mouseDown = true;
		// handleManager('video');
		e.preventDefault();
		// return false;
	});// end mouse down function
	$(document).mouseup( function(e){
		console.log('mouseup');
		// check the position of the slider and set it
		// if the video slider was clicked and this is the 
		// mouse up for the click
		if (_playerMouseDown){
			setVideoSlider();
		}// end if

		_mouseDown = false;
		_playerMouseDown = false;
		_soundMouseDown = false;
	});// end mouse up function

	$('.sound-slider-handle').mousedown( function(e){
		console.log('volume');
		_soundMouseDown = true;
		// _mouseDown = true;
		// handleManager('sound');
		e.preventDefault();
		// return false;
	});// end slider handle function

	$(document).mousemove(function(e){

		if(_playerMouseDown){
			handleManager('video', e);
		}
		if (_soundMouseDown){
			handleManager('sound', e);
		}
	})// end mouse move function


	// Record Icons 
	// Record Video Hover Function
	$('.glyphicon-record ').mouseenter( function(){
		// call over function
		recordOver();
	}).mouseleave( function(){
	} );

	// Record Sound Hover Function 
	$('.glyphicon-camera').mouseenter(function(){
		videoOver();
	}).mouseleave(function(){	
	});// end sound hover function

	// options div 
	$('.glyphicon-remove-circle').click(function(e){
		// clear out the div
		$('.available-options').empty();
		// hide the div
		$('.device-options').hide();
	});// end options div click function

	var recording = false;
	// begin recording click function
	$('.glyphicon-play-circle').click(function(e){
		
		if (!recording){
			console.log('recording');
			// if chosen use select mic / video device

			// check if mic has been selected
			if (!_recordingDevice){
				// use the first device as default
				_recordingDevice = 0;
			}
			// check if video device has been selected
			if (!_videoDevice){
				// use the first device as default
				_videoDevice = 0;
			}
			// start recording the video
			// the flash icon is popping up but I cant do anything 
			// think its broken
			flash.startRecording(_fileName,_videoDevice,_recordingDevice);

			// toggle recording option
			recording = true;
		}else{
			console.log('stop recording');
			flash.stopRecording();
		}
	});

	// auto connect to the server
	// connect to the server
	flash.connect(_serverUrl);
}// end player Controllers 
// ===================

// Mouse Events 
// ===========================================
// ===========================================

// video hover Over function
var videoOver = function(){
	// clear out the device 
	$('.available-options').empty();
	// show the device div
	$('.device-options').show();
	// get all recording devices from system
	var cams = flash.getCameras();

	for (var i = 0; i < cams.length; i++){
		// add a "a" tag with the label in it
		$('.available-options').append('<a class="selected-device" index_number="'+i+'">'+cams[i]+'</a>');
	}
	// video option click function
	$('.selected-device').click(function(e){
		_videoDevice = $(this).attr('index_number');
		e.preventDefault;
		e.stopPropagation();
		$('.device-options').hide();
		return false;
	});
	
}// end video Over function
// ===================
var recordOver = function(){

	// clear out the devices
	$('.available-options').empty();
	// show the device div
	$('.device-options').show();
	var mics = flash.getMicrophones();

	for (var i = 0; i < mics.length; i ++){
		// add a "a" tag with the label in it
		$('.available-options').append('<a class="selected-device" index_number="'+i+'">'+mics[i]+'</a>');
	}
	// add all devices to div

	// audio option click function
	$('.selected-device').click(function(e){
		_recordingDevice = $(this).attr('index_number');
		e.preventDefault;
		e.stopPropagation();
		$('.device-options').hide();
		return false;
	});

	

}// end record over function
// ===================

// set video slider handle 
var setVideoSlider = function(){
	console.log('set position');

	// use the position of the slider handle to set the 
	// position of the video playback\

	xPos = _seekTime / _duration * 300;
	//Xpos /  Width  * duration = seektime
	handlePos =  $('.slider-handle').offset().left - $('.slider-bar').offset().left;

	videoSeekTime =  (handlePos / 300 * _duration);
	console.log(videoSeekTime);

	flash.setTime(Math.floor(videoSeekTime));

	// The flash . set time function is a little glitchy 

}// end setVideoSlider function
// ===================

// Play function
var playVideo = function(){
	console.log('play Clicked');
	$('.glyphicon-pause').show();
	$('.glyphicon-play').hide();

	// first play click 
	if (_firstClick){
		_firstClick = false;

		// moved this here 
		flash.startPlaying(_videoTitle);
	}else{
		flash.playPause();
	}// end if 

}// end playVideo 
// ===================

// Pause
var pauseVideo = function(){

	console.log('pause Clicked');
	$('.glyphicon-pause').hide();
	$('.glyphicon-play').show();

	// pause the video 
	flash.playPause();

}// end pause Vidoe 
// ===================
// Sound Handle Dragging Function

// Handle Dragging function
var handleManager = function(sliderType, e){

	/* 
	If the mouse is down get the position of the mouse 
	set the slider to the position of the mouse
	*/
	var mouseX 					= e.pageX;
	var mouseY 					= e.pageY;
	var videoWidth 				= 300;
	var videoHandle 			= $('.slider-handle').offset().left;
	var videoHandleWidth 		= $('.slider-handle').width();
	var videoBar 				= $('.slider-bar').offset().left;
	var soundHandle 			= $('.sound-slider-handle').offset().left;
	var soundHandleWidth 		= $('.sound-slider-handle').width();
	var soundBar 				= $('.sound-slider-bar').offset().left;
	var vXpos 					= 0;
	var sXpos 					= 0;
	var sVolume 				= 0;


	if (sliderType == 'video'){
		// reset the handle if it goes to low
		if (mouseX < videoBar){
			$('.slider-handle').offset({left: videoBar});
		}// end if 
		// reset the handle if it gets
		else if (mouseX > videoBar + videoWidth){
			$('.slider-handle').offset({left: videoBar+videoWidth - videoHandleWidth});
		}// end if 
		else{
			$('.slider-handle').offset({left: mouseX});
		}

		// on mouse up use this value to set the time 
		_seekTime = (videoHandle - videoBar) / videoWidth* _duration; 

		vXpos = _seekTime / _duration * videoWidth;
		console.log(vXpos);

	}// end video if 
	if (sliderType == 'sound'){
		// reset the handle if it goes too low\


		// So we gonna use the position of the mouse instead of the position of the handle
		if (mouseX 	 < soundBar){
			console.log('soundHandle < soundBar',soundHandle < soundBar)
			$('.sound-slider-handle').offset({left: soundBar});
		}// end if 
		else if(mouseX 	 >= soundBar + 100 - soundHandleWidth){
			$('.sound-slider-handle').offset({left: soundBar+100 - soundHandleWidth})
		}
		else
		{
			$('.sound-slider-handle').offset({left: mouseX});
		}
		
		if (sVolume > 90){
			sVolume = .9;
		}
		else if (sVolume < 0){
			sVolume = 0;
		}else{
			sVolume = (soundHandle - soundBar) / 100;
		}
		sVolume;
		// check the stae of the volume
		// swap out icons depending on the volume level
		console.log(sVolume);
		if (sVolume >= .5){
			console.log('volume up ');
			$('.glyphicon-volume-up').show();
			$('.glyphicon-volume-down').hide();
			$('.glyphicon-volume-off').hide();
		}
		else if (sVolume > 0){
			$('.glyphicon-volume-up').hide();
			$('.glyphicon-volume-down').show();
			$('.glyphicon-volume-off').hide();
		}
		else if (sVolume <= 0){
			$('.glyphicon-volume-up').hide();
			$('.glyphicon-volume-down').hide();
			$('.glyphicon-volume-off').show();
		}

		flash.setVolume(sVolume);
	}
}// end Handle Manager
// ===================

// End Player Controllers
// ===========================================
// ===========================================

// Call Back Functions 
// ===========================================
// ===========================================

var connected = function(success, error){
	/* 
		This function is called after the NetStream has connected to the server.
		@param success - (Boolean) if the connection was successful.
		@param error - (String) the message if connection was unsuccessful.
	*/	
	// console.log(success);

	if (success){
		// set the volume 
		flash.setVolume(_volume);
	}else{
		console.log('--------------------------------');
		console.log('---- Connect Error Message -----');
		console.log(message);
		console.log('--------------------------------');
	}
}// end Connected 
// ===================

var seekTime = function(time){
	/*
		This function is called when playing back a video.
		@param time - (Number) holds the current time (in seconds) of the video.
	*/	
	//console.log(time);

	var currentTime = Math.floor(time);
	var minutes = 0;
	var seconds = 0;
	var counter = 0;
	function pad(n) {
    if (n < 10){
        return "0" + n;
     }
    return n;
	}

	// count minutes
	// console.log(currentTime);
	if (currentTime >= 60){
		minutes ++;
		counter += 60;
	}// end if 

	seconds = currentTime - counter;

	// set minutes and seconds on vieo player
	$('.minutes').text(pad(minutes));
	$('.seconds').text(pad(seconds));

	// setting global seek tie 
	_seekTime = Math.floor(currentTime);
	
	// if the video slider handle is not being pressed 
	if (!_playerMouseDown){
		//SeekTime / duration  * width  = Xpos
		xPos = _seekTime / _duration * 300;
		// set the position of the video slider handle 
		$('.slider-handle').offset({left: xPos + $('.slider-bar').offset().left
		 - ($('.slider-handle').width()/2)});
	}
}// end Seek Time 
// ===================

var getDuration = function(duration){
	/*
		This function is called after the duration of a playback video has been determined. 
		@param duration - (Number) holds the duration (in seconds) of the video currently being played back.
	*/

	var newDuration = Math.floor(duration);
	
	_duration = newDuration;
	minutes = Math.floor(newDuration / 60);
	seconds = Math.floor(duration - minutes * 60) ;

	function pad(n) {
    if (n < 10){
        return "0" + n;
     }
    return n;
	}
	// set total minutes on video player
	$('.minutes-total').text(minutes);
	$('.seconds-total').text(pad(seconds));


}// end get Duration 
// ===================

var recordingError = function(message, code){
	/*
		This function is called if there is an error while recording.
		@param message - (String) holds the message of what went wrong.
		@param code - (String) the flash error code that was called.
	*/

}// end recording Error 
// ===================

var globalError = function(message){
	/* 
		This function is called if there are any flash errors.
		@param message - (String) holds the message of what went wrong.
	*/
	// console.log('------------------------');
	// console.log('---- Error Message -----');
	// console.log(message);
	// console.log('------------------------');
}// end global ERror
// ===================




// End CallBack Functions
// ===========================================
// ===========================================





