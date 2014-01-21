var flashReady = function(){


	// Slider Init 
	playerControllers();
}

// Player Controllers
// ===========================================
// ===========================================
var _mouseDown = false;
var _firstClick = true;
var _serverUrl = "rtmp://localhost/SMSServer";
var _videoTitle = "startrekintodarkness_vp6";
var _volume = 0;

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

	// auto hide pause button
	$('.glyphicon-pause').hide();
	// icon toggle 

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
		// get mouse
		console.log('mousedown');
		_mouseDown = true;
		handleManager();
		e.preventDefault();
	});// end mouse down function
	$(document).mouseup( function(e){
		console.log('mouseup');
		_mouseDown = false;
	});// end mouse up function
}// end player Controllers 
// ===================

// Mouse Events 
// ===========================================
// ===========================================

// Play function
var playVideo = function(){

	console.log('play Clicked');
	$('.glyphicon-pause').show();
	$('.glyphicon-play').hide();

	// first play click 
	if (_firstClick){
		// connect to the server
		flash.connect(_serverUrl);
		_firstClick = false;

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

// Handle Dragging function
var handleManager = function(){
	$(document).mousemove(function(e){
		/* 
		If the mouse is down get the position of the mouse 
		set the slider to the position of the mouse
		*/
		if(_mouseDown){

			mouseX = e.pageX;
			mouseY = e.pageY;
			handle = $('.slider-handle').offset().left;
			handleWidth = $('.slider-handle').width();
			bar = $('.slider-bar').offset().left;
			// console.log(mouseX);
			$('.slider-handle').offset({left: mouseX });


			if (handle < bar){
				console.log('lower');
				$('.slider-handle').offset({left: bar});
			}// end if 
			if (handle > bar+ 300){
				console.log('higher');
				$('.slider-handle').offset({left: bar+300 - handleWidth});
			}// end if 
		}// end if 
	});
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
	console.log(success);

	if (success){
		console.log('running');
		flash.startPlaying(_videoTitle);
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
}// end Seek Time 
// ===================

var getDuration = function(duration){
	/*
		This function is called after the duration of a playback video has been determined. 
		@param duration - (Number) holds the duration (in seconds) of the video currently being played back.
	*/


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
	console.log('------------------------');
	console.log('---- Error Message -----');
	console.log(message);
	console.log('------------------------');
}// end global ERror
// ===================




// End CallBack Functions
// ===========================================
// ===========================================





