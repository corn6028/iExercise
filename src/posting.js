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
		$("#my_name").html("Hi, "+currentUser.get('last_name'));
  		$("#user_name").html(currentUser.get('last_name'));
  		$("#age").html('x');
  		$("#height").html('x');
  		$("#weight").html('x');
  		$("#pdis").html('x');
  		$("#pweight").html('x');
  		$("#goal").html('x'+" Kg");
		if(!currentUser.get('notFB')){
			$('#me').attr('src',currentUser.get('my_pic'));
			alert(currentUser.get('my_pic'));
			$(".inner").attr('background-image',url(currentUser.get('my_pic'))) ;
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
