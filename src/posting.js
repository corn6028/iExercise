//Parse.initialize("lGJxaJjLAeZewHob85fxeWXeXVOlFUFHWKjSazzH", "HnbslyPWRrrj13cw4koWYAo6UxWMbxIpgoYCpx6f");
/*var params = window.location.search.split('?')[1];
var key = params.split('=')[0];
var name = params.split('=')[1];
*/
//alert(Parse.User.current().get('username'));
var currentUser = Parse.User.current();
if (currentUser) {
    // do stuff with the user
	alert(currentUser.get('username'));
  $(document).ready(function(){
	if(currentUser.get('notFB')){
	  window.fbLoaded = function() {
		FB.api('/me', function(response) {
            var my_name = response.name;
           // var my_gender = response.gender;
            var my_username = response.username;
            var my_facebook_id = response.id;
            $("#my_name").html(my_name);
           // $("#my-profile-gender").html(my_gender);
            $("#user_name").html(my_name);
           // $("#my-profile-facebook-id").html(my_facebook_id);
        });
		FB.api('/me/picture?width=250', function(response) {
            var my_picture_url = response.data.url;
            $("#my_picture").attr('src', my_picture_url);
        });
	  }
	} else {
		$("#my_name").html("Hi, "+currentUser.get('last_name'));
  		$("#user_name").html(currentUser.get('username'));
  		$("#age").html('x');
  		$("#height").html('x');
  		$("#weight").html('x');
  		$("#pdis").html('x');
  		$("#pweight").html('x');
  		$("#goal").html('x'+" Kg");
	}

  });
	
} else {
    // show the signup or login page
	alert("Please signup or login first");
	window.location.href = "katy.html";
}

function validate_required(field,alerttxt)
{
    with (field)
    {
    if (value==null||value=="")
      {alert(alerttxt);return false}
      else {return true}
      }
}
function validate_form(thisform)
{
    with (thisform)
    {
    if (validate_required(distance,"Distance must be filled out!")==false)
      {distance.focus();return false}
    }
}

$(function() {
  $('.green').click(function(){
	/*Parse.User.logIn(name,{
  	  success: function(user){
		alert('hi');
  	  },
  	  error: function(user,error) {
		alert("LOGIN ERROR");
  	  }
	});*/
	Parse.User.logOut();
	window.location.href = "katy.html";
  })
  $('#me').click(function(){
	window.location.href = "myprofile.html";
  })
  $('#friend-post').click(function(){
	window.location.href = "posting.html";
  })

  $('#winner-post').click(function(){
	window.location.href = "posting.html";
  })
  $('#i-exercise').click(function(){
	window.location.href = "home.html";
  })
});
