$('.left.demo.sidebar').first()
  .sidebar('attach events', '.toggle.button')
;
$('.toggle.button')
  .removeClass('disabled')
;

$(function(){
  $('.signup.button').click(function(){
	$('.modal')
	//  .modal('setting', 'closable', ture)
	  .modal('show')
	;
  })
});

Parse.initialize("lGJxaJjLAeZewHob85fxeWXeXVOlFUFHWKjSazzH", "HnbslyPWRrrj13cw4koWYAo6UxWMbxIpgoYCpx6f");

window.fbAsyncInit = function() {
    Parse.FacebookUtils.init({ // this line replaces FB.init({
      appId      : '315243075347265', // Facebook App ID
      status     : true,  // check Facebook Login status
      cookie     : true,  // enable cookies to allow Parse to access the session
      xfbml      : true,  // initialize Facebook social plugins on the page
      version    : 'v2.2' // point to the latest Facebook Graph API version
    });
 
    // Run code after the Facebook SDK is loaded.
}; 
(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


$(function() {
  $('.submit').click(function() {
	var user = new Parse.User();
	user.set("username", $('#user-name').val());
	user.set("password", $('#password').val());
	user.set("email", $('#email').val());
  
	// other fields can be set just like with Parse.Object
	user.set("first_name", $('#first-name').val());
	user.set("last_name", $('#last-name').val());
	  
	user.signUp(null, {
    success: function(user) {
    	// Hooray! Let them use the app now.
  	},
  	error: function(user, error) {
    	// Show the error message somewhere and let the user try again.
  	alert("Error: " + error.code + " " + error.message);
 	 }
	});
	$('.modal').modal('hide');
  })
  $('.facebook').click(function() {
	Parse.FacebookUtils.logIn(null, {
    success: function(user) {
      if (!user.existed()) {
        alert("User signed up and logged in through Facebook!");
      } else {
        alert("User logged in through Facebook!");
      }
    },
    error: function(user, error) {
      alert("User cancelled the Facebook login or did not fully authorize.");
    }
    });
  })
});

