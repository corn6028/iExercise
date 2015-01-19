$(function(){
$('#eadd').click(function(){
	$('#eaddmodal').modal('show');
	//$('.modal').modal('show');
})

});

$(function(){
$('#wadd').click(function(){
  $('#waddmodal').modal('show');
  //$('.modal').modal('show');
})

});

$(function(){
$('#eedit').click(function(){
  $('#eeditmodal').modal('show');
  //$('.modal').modal('show');
})

});

$(function(){
$('#wedit').click(function(){
  $('#weditmodal').modal('show');
  //$('.modal').modal('show');
})

});

function float2int (value) {
    return value | 0;
}

$(document).ready(function(){ 
	var Post = Parse.Object.extend("p");
	var post_mine = new Parse.Query(Post);
	post_mine.equalTo("username", currentUser.get("username"));
	post_mine.descending("createdAt");
	post_mine.find({
  		success: function(results) {
    		//alert("Successfully retrieved " + results.length + " post.");
    		if(results.length == 0){
				var post_list =	" <div style='background:#FDF5E6;' class='item'> "+
          						"<div class='content'>"+
          						"<div style='font-size:16pt;' class='ui header'>你還沒有PO文唷 ^_< </div></div></div>";
				document.getElementById('post_line').innerHTML = post_list;
			}
		/*	function float2int (value) {
    			return value | 0;
			}*/
			// Do something with the returned Parse.Object values
    		for (var i = 0; i < results.length; i++) { 
      			var object = results[i];
				//moment.locale("zh-TW");
				var now = new Date();
				var time_new = now.getTime();
				var time_old = object.createdAt.getTime();
				var t = time_new-time_old;
				//var x = new Date(time_old);
				//alert(x);
				//var c = new Date(n);
				//var a = object.createdAt.toString();
				//b = a.split(" ")[3]+3
      			//alert(time_z/60000);
				if(t>60000){
					if(t>3600000){
						if(t>86400000){
							if(t>604800000){
								var time_z = new Date(time_old);
							}else{
								t = float2int(t/86400000);
								var time_z = t + " days ago";
								if(t==1){	var time_z ="1 day ago";}
							}			
						}else{
							t = float2int(t/3600000);
							var time_z = t + " hours ago";
							if(t==1){	var time_z ="1 hour ago";}
						}
					}else{
						t = float2int(t/60000);
						var time_z = t + " minutes ago";
						if(t==1){	var time_z ="1 minute ago";}
					}
				}else{
					time_z = "1 minute ago";
				}
				if(i%2==0){	var bg = "#FDF5E6";}
				else{	var bg = "white";}
				var post_pic = currentUser.get("my_pic");
				var post_name = object.get("last_name");
				var post_content = object.get("post");
				var comment_num = object.get("comment");
				var likers = object.get("like_list");
				var post_list = "<div class='ui fitted divider'></div>"+
								"<div style='background:"+bg+";' class='item'>"+
								"<img class='ui image' src='"+currentUser.get("my_pic")+"' width='20%' height='20%'>"+
								"<div class='content'><div class='row'>"+
          						"<div style='font-size:13pt;' class='ui header'>"+object.get("post")+"</div>"+
								"<div style='font-size:9pt;color:gray;' class='description'>"+time_z+"・"+object.get('pdis')+"km"+" </div></div>"+
								"<div class='row' style='padding-top:10px'>"+
								'<i class="like icon" style="color:red" onclick="likes(\''+object.id+'\')"></i>'+
              					'<a class="like" id="'+object.id+'" onclick="likes_list(\''+object.id+'\',\''+likers+'\')">'+object.get("like")+ ' Likes'+'</a>'+
              					'<a class="comment" id="comment" style="padding-left:15%" onclick="comments(\''+object.id+'\',\''+post_pic+'\',\''+post_name+'\',\''+escape(post_content)+'\',\''+time_z+'\',\''+comment_num+'\')">'+
                				"<i class='comment outline icon' id='comment_num'></i>"+object.get("comment")+"  Comments"+"</a></div></div></div>";
				document.getElementById('post_line').innerHTML = document.getElementById('post_line').innerHTML + post_list;
		
    		}
  		},
  		error: function(error) {
    		alert("Error: " + error.code + " " + error.message);
  		}
	});
});

function likes(initValue){
	var friend = [currentUser.get("username")];
	var P = Parse.Object.extend("p");
	var p = new Parse.Query(P);
	p.get(initValue, {
  		success: function(result) {
    		// The object was retrieved successfully.
			var found = $.inArray(currentUser.get("username"), result.get("like_list"))>-1;
			if(found){	alert("你按過讚摟～");}
			else{
				friend = friend.concat(result.get("like_list"));
				result.set("like",result.get("like")+1);
				result.set("like_list",friend);
				result.save();
				document.getElementById(initValue).innerHTML = result.get("like").toString()+" Likes";}
				//$('#like').html(result.get("like").toString()+" Likess");}
  		},
  		error: function(object, error) {
    		// The object was not retrieved successfully.
    		// error is a Parse.Error with an error code and message.
 	 	}
	});
}

function likes_list(initValue,likers){
	$("#likemodal").children("div").remove();
	$("#likemodal").children("h3").remove();

	var friends = likers.split(",");
	//alert(Array.isArray(friends));
	var query = new Parse.Query("User");
	query.containedIn("username",friends);
	query.find({
		success: function(results) {
		//	alert(results.length);
			var header = [];
			header.push('<h3 class="ui black block header">覺得這很讚的人</h3><div class="ui divided list" id="list" style="margin-top:0px">');
			$('#likemodal').append(header.join(''));
    		// Do something with the returned Parse.Object values
    		for (var i = 0; i < results.length; i++) { 
      			var object = results[i];
				var like_list = [];
				like_list.push(	'<div class="item" style="margin:10px;">',
								'<div class="right floated compact ui button"><i class="add square icon"></i>Add</div>',
    							'<img class="ui avatar image" src="'+object.get("my_pic")+'"/>',
			    				'<div class="content">',
								'<div class="header">'+object.get("last_name")+'</div></div></div>');
				$('#list').append(like_list.join(''));
    		}
			$('#likemodal').innerHTML += "</div></div>";
			$('#likemodal').modal('show');
  		},
  		error: function(error) {
    		alert("Error: " + error.code + " " + error.message);
  		}
	});

}

function comments(initValue,post_pic,post_name,post_content,post_time,comment_num){
	$('#commentmodal').children("div").remove();

	//console.log(unescape(post_content));
	var Comment = Parse.Object.extend("comments");
	var comment_mine = new Parse.Query(Comment);
	comment_mine.equalTo("postid", initValue);
	comment_mine.ascending("createdAt");
	comment_mine.find({
  		success: function(results) {
    		if(results.length == 0){
				//alert(initValue);
				var no_comment ="<div class='ui segment' style='padding:10%'>"+
    						"<div class='row' style='padding:0;'>"+
            				"<div class='ui column grid'>"+
            				"<div class='four wide column'>"+
               				"<div class='label'>"+
                  			"<div class='scircle'>"+
                   			"<div class='inner' style='background-image:url("+post_pic+");'></div></div></div></div>"+
              				"<div class='twelve wide column' style='padding-left:0'>"+
               				"<a style='font-size:25px'>"+post_name+"</a>"+
							"<div class='date'>"+post_time+"</div>"+
               				"<h3>"+unescape(post_content)+"</h3></div></div></div>"+     
           					"<div class='ui center aligned grid'>"+
                	//		"<img src='"+posted.get('my_pic')+"' style='width:70%;height:70%'></img></div>"+
            				"<div class='ui gray stacked segment' style='background:#FFEFD5'>"+
              				"<h4 style='margin-top:0;'>Comment</h4>"+
             				"<div class='ui divider'></div>"+
							"<div class='ui column grid'>"+
							'<div class="equal height row" style="padding:0">'+
              				'<div class="two wide column" style="padding-right:0;padding-top:0">'+
                			'<img class="ui avatar image" src="'+currentUser.get('my_pic')+'"></img></div>'+
             				'<div class="fourteen wide column" style="padding-left:5px">'+
              				'<div class="ui fluid icon input">'+
                			'<input id="input1" type="text" placeholder="Comment.." onkeydown="if (event.keyCode == 13) write_comment(\''+initValue+'\')">'+
                			'<i class="write icon"></i></div></div>'+
							'<div class="ui divider"></div></div></div></div></div></div></div>';
  				//document.getElementById('commentmodal').innerHTML = document.getElementById('commentmodal').innerHTML + no_comment;
				$('#commentmodal').append(no_comment);
				$('#commentmodal').modal('show');
				//$('#commentmodal').children("div").remove();
				//var init = '<div class="ui small modal" id="commentmodal" >';
				//document.getElementById('commentmodal').innerHTML = init;
			}else{
			// Do something with the returned Parse.Object values
			var no_comment = [];
			no_comment.push("<div class='ui segment' style='padding:10%'>",
    						"<div class='row' style='padding:0;'>",
            				"<div class='ui column grid'>",
            				"<div class='four wide column'>",
               				"<div class='label'>",
                  			"<div class='scircle'>",
                   			"<div class='inner' style='background-image:url("+post_pic+");'></div></div></div></div>",
              				"<div class='twelve wide column' style='padding-left:0'>",
               				"<a style='font-size:25px'>"+post_name+"</a>",
							"<div class='date'>"+post_time+"</div>",
               				"<h3>"+unescape(post_content)+"</h3></div></div></div>",  
           					"<div class='ui center aligned grid'>",
            				"<div class='ui gray stacked segment' style='background:#FFEFD5' id='comments_list'>",
              				"<h4 style='margin-top:0;'>Comment</h4>",
             				"<div class='ui divider'></div>");
			//alert("1");
			$('#commentmodal').append(no_comment.join(''));
	
    		for (var i = 0; i < results.length; i++) { 
      			var object = results[i];
				var now = new Date();
				var time_new = now.getTime();
				var time_old = object.createdAt.getTime();
				var t = time_new-time_old;
				if(t>60000){
					if(t>3600000){
						if(t>86400000){
							if(t>604800000){
								var time_z = new Date(time_old);
							}else{
								t = float2int(t/86400000);
								var time_z = t + " days ago";
								if(t==1){	var time_z ="1 day ago";}
							}			
						}else{
							t = float2int(t/3600000);
							var time_z = t + " hours ago";
							if(t==1){	var time_z ="1 hour ago";}
						}
					}else{
						t = float2int(t/60000);
						var time_z = t + " minutes ago";
						if(t==1){	var time_z ="1 minute ago";}
					}
				}else{
					time_z = "1 minute ago";
				}

				var comment_list = [];
				comment_list.push(  "<div class='ui column grid'>",
                					"<div class='equal height row' style='padding:0'>",
              						"<div class='two wide column' style='padding-right:0;padding-top:0'>",
                					"<img class='ui avatar image' src='"+object.get('my_pic')+"'></img></div>",
              						'<div class="four wide column" style="padding-left:5px">',
                					'<a style="font-size:18px">'+object.get('last_name')+'</a>',
                					'<div class="date" style="font-size:12px">'+time_z+'</div></div>',
              						'<div class="ten wide column" style="padding-left:0;">',
                  					'<p style="font-size:16px">'+object.get('comment')+'</p></div></div>',
              						'<div class="ui divider"></div>');
				//alert("2");
				$('#comments_list').append(comment_list.join(''));

              //	document.getElementById('commentmodal').innerHTML = document.getElementById('commentmodal').innerHTML + comment_list; 
 			}
			var end_list = [];
			end_list.push(  "<div class='ui column grid'>",
							'<div class="equal height row" style="padding:0">',
              				'<div class="two wide column" style="padding-right:0;padding-top:0">',
                			'<img class="ui avatar image" src="'+currentUser.get('my_pic')+'"></img></div>',
			//				'<div class="four wide column" style="padding-left:5px">'+
              //  			'<a style="font-size:18px">'+currentUser.get('last_name')+'</a></div>'+
             				'<div class="ten wide column" style="padding-left:5px">',
              				'<div class="ui fluid icon input">',
                			'<input id="input1" type="text" placeholder="Comment.." onkeydown="if (event.keyCode == 13) write_comment(\''+initValue+'\',\''+comment_num+'\')">',
                			'<i class="write icon"></i></div></div>',
							'<div class="ui divider"></div></div></div></div></div></div></div></div>');
		//	alert(initValue);
			$('#comments_list').append(end_list.join(''));
			//document.getElementById('commentmodal').innerHTML = document.getElementById('comment_modal').innerHTML + end_list;
			$("#commentmodal").modal('show');
			}
  		},
  		error: function(error) {
    		alert("Error: " + error.code + " " + error.message);
  		}
	});

//	if(event.keyCode == 13){
//		alert($('#commentmodal').is(visible));
//	}
}

function write_comment(post_id,num){
	if(!$('#input1').val()){
		//alert("Please comment!");
	}else{
		var P = Parse.Object.extend("p");
		var p = new P();
		p.id = post_id;
		var total_num = parseInt(num)+1;
		p.set("comment",total_num);
		p.save();

		var C = Parse.Object.extend("comments");
		var c = new C();
		c.set("postid",post_id);
		c.set("comment",$("#input1").val());
		c.set("username",currentUser.get("username"));
		c.set("last_name",currentUser.get("last_name"));
		c.set("my_pic",currentUser.get("my_pic"));
		//alert($("#input1").val());
		
		c.save().then(function(response) {
        	alert("success");
        	location.reload(); //refreshes the form
   		 }, function(error) {
        	alert("error");
        	location.reload();
    	});
		$("#commentmodal").modal('hide');
	}
}

/*$(document).keyup(function (e) {
    if (e.keyCode === 13) {
       alert($('#commentmodal').modal('is active'));
    }
 });*/

$(document).ready(function(){ 
  var opt={dayNames:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
  dayNamesMin:["日","一","二","三","四","五","六"],
  monthNames:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
  monthNamesShort:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
  prevText:"上月",
  nextText:"次月",
  weekHeader:"週",
  showMonthAfterYear:true,
  dateFormat:"yy-mm-dd"
};
$("#datepicker1").datepicker(opt);
$("#datepicker2").datepicker(opt);
});

    function CanModify_P()
    {
        document.getElementById('ageinput').style.display='block';
        document.getElementById('ageinput').select();
        document.getElementById('heightinput').style.display='block';
        document.getElementById('heightinput').select();
        document.getElementById('weightinput').style.display='block';
        document.getElementById('weightinput').select();

        document.getElementById('ageinput').value=document.getElementById('age').innerHTML;
        document.getElementById('heightinput').value=document.getElementById('height').innerHTML;
        document.getElementById('weightinput').value=document.getElementById('weight').innerHTML;
    }
    function CanModify_E(){
        document.getElementById('edinput').style.display='block';
        document.getElementById('edinput').select();
        document.getElementById('edisinput').style.display='block';
        document.getElementById('edisinput').select();

        document.getElementById('edinput').value=document.getElementById('ed').innerHTML;
        document.getElementById('edisinput').value=document.getElementById('edis').innerHTML;

    }
    function CanModify_W(){
        document.getElementById('wdinput').style.display='block';
        document.getElementById('wdinput').select();
        document.getElementById('wwinput').style.display='block';
        document.getElementById('wwinput').select();

        document.getElementById('wdinput').value=document.getElementById('wd').innerHTML;
        document.getElementById('wwinput').value=document.getElementById('ww').innerHTML;
    }
    function DisModify()
    {
        if (event.keyCode == 13)
        {
			
            document.getElementById('ageinput').style.display='none';
            document.getElementById('heightinput').style.display='none';
            document.getElementById('weightinput').style.display='none';
            document.getElementById('edinput').style.display='none';
            document.getElementById('edisinput').style.display='none';
            document.getElementById('wdinput').style.display='none';
            document.getElementById('wwinput').style.display='none';
        
            var contents1=document.getElementById('edinput').value;
            var contents2=document.getElementById('edisinput').value;
            var contents3=document.getElementById('wdinput').value;
            var contents4=document.getElementById('wwinput').value;
            var contents5=document.getElementById('ageinput').value;
            var contents6=document.getElementById('heightinput').value;
            var contents7=document.getElementById('weightinput').value;

            document.getElementById('ed').innerHTML = contents1;
            document.getElementById('edis').innerHTML = contents2;
            document.getElementById('wd').innerHTML = contents3;
            document.getElementById('ww').innerHTML = contents4;
            document.getElementById('age').innerHTML = contents5;
            document.getElementById('height').innerHTML = contents6;
            document.getElementById('weight').innerHTML = contents7;


			var Point = Parse.Object.extend("User");
			var point = new Point();
			point.id = currentUser.id;

			point.set("age", parseInt(contents5));
			point.set("height", parseFloat(contents6));
			point.set("weight", parseFloat(contents7));

			point.save(null, {
				success: function(point) {
				},
				error: function(point, error) {
				}
			});

        }
    }

