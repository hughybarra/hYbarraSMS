$(document).ready(function(){
	$('.simple-sign-up').hide();

	// github login 
	$('.left-button').click(function(e){
		// log into the server anonymously
		auth.login('anonymous');

		e.preventDefault;
		e.stopPropagation;
		return false;
	});// end github login 

	// simple login button
	$('#simple-login-button').click(function(e){
		console.log('login button clicked');

		// get user name/password
		var userEmail = '';
		var userPassword = '';
		//very simple regex
		var re = /\S+@\S+\.\S+/;
		var valid = true;

		/*
		 I was not sure how far you wanted us to go with the validation.
		 So I made this very simple validator 
		*/
		
		// email validation
		if (re.test($('#simple-user-email').val()) ){
			userEmail = $('#simple-user-email').val();
		}else{
			userEmail = '';
			valid = false;
			//add an x when this does not validate
		}
		// password validation
		if ( $('#simple-user-password').val().length >= 3){
			userPassword = $('#simple-user-password').val();
		}else{
			userPassword = '';
			valid = false;
			// add an x when this does nt validate
		}

		if (valid){
			var user = {
				'email': userEmail, 
				'password': userPassword
			};
			attemptLogin(user);
		}else{
			console.log('form invalid');
			$('#simple-user-password').addClass('invalid');
			$('#simple-user-email').addClass('invalid');
			// for testing only remove when done
			attemptLogin(user);
		}
		
		e.preventDefault;
		e.stopPropagation();
		return false;
	})// end simple login button function

	// sign up button switch
	$('#signup-button').click(function(e){
		console.log('sign up clicked');
		// hide login form
		$('.simple-login').hide();
		// show signup form
		$('.simple-sign-up').show();		
		e.preventDefault;
		e.stopPropagation();
		return false;
	});// end sign up button

	$('#simple-signup-button').click(function(e){

		console.log('sign up button clicked');

		//sign up vars 
		var userEmail 		= '';
		var userPassword 	= $('#simple-signup-password').val();
		var userPassword2 	= $('#simple-signup-password2').val();
		var passMatch 		= '';
		//very simple regex
		var re 				= /\S+@\S+\.\S+/;
		var valid 			= true;
		var truePass 		= '';


		//validation

		/*
		 I was not sure how far you wanted us to go with the validation.
		 So I made this very simple validator 
		*/

		// email validation
		if (re.test($('#simple-signup-email').val()) ){
			userEmail = $('#simple-signup-email').val();
		}else{
			userEmail = '';
			valid = false;
			//add an x when this does not validate
		}// end if 



		if (userPassword == userPassword2){
			passMatch = true;
			truePass = userPassword;
		}else{
			passmatch = false;
			valid = false;
		}// end if 


		if (valid){
			var user = {
				'email': userEmail, 
				'password': userPassword
			};
			// attemptLogin(user);
			console.log('sign up form valid');
			createSimpleUser(user);
		}else{
			console.log('sing up form invalid')
		}// end if 

		e.preventDefault;
		e.stopPropagation();
		return false;
	})// end sign pu button

	// back button switch
	$('#back-login-button').click(function(e){
		console.log('back button clicked');
		// show login form
		$('.simple-login').show();
		// hide signup form
		$('.simple-sign-up').hide();

		e.preventDefault;
		e.stopPropagation();
		return false;
	});// end back button 

	// remove invalid class if it is there
	$('#simple-user-password').focus(function(){
		$('#simple-user-password').removeClass('invalid');
	})
	$('#simple-user-email').focus(function(){
		$('#simple-user-email').removeClass('invalid');
	})// end function
});// end document ready function












