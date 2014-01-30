$(document).ready(function(){
	$('.user-logout').click(function(){
		logout();
	})
})

 
var getAuth = function(){
	/*
	Before logging users in, instantiate the FirebaseSimpleLogin by passing a Firebase reference and a callback. 
	This callback will be invoked any time that the user's authentication state changed:
	*/
	var errorCodes = [
		"INVALID_PASSWORD"
	];


	var chatRef = new Firebase('https://glaring-fire-7611.firebaseIO.com');
	var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
		if (error) {
		    // an error occurred while attempting login
		    console.log(error);
		    console.log(error.code);

		} else if (user) {
		    // user authenticated with Firebase
		    console.log('User ID: ' + user.id + ', Provider: ' + user.password);
		    console.log(user.email);
		    // setting the nav welcome to user email
		    $('.user-name').text(user.email);
		    // getLogin();
		} else {
		    // user is logged out
		    console.log('user is logged out');
		    getLogout();
		}// end else 

	});// end var auth
	// return auth
	return auth;
}// end get auth 

var auth = getAuth();

var logout = function(status){
	auth.logout();
}// end logout

var getLogout = function(){
	console.log('logged in');
	var url = "http://localhost:8886/SMS/assignment/public/";
	$.ajax({
		url: url,
		type: 'GET', 
		dataType: 'html',
		success: function(success){;
			var htmlData = success;
			var newLocation = "http://localhost:8886/SMS/assignment/public/index.php";
			// reload the new page
			window.location = newLocation;
		}
	});// end ajax call
}// end getLogin 