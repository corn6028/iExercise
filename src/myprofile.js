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
				var post_list = "<div class='ui fitted divider'></div>"+
								"<div style='background:"+bg+";' class='item'>"+
								"<img class='ui image' src='"+currentUser.get("my_pic")+"' width='20%' height='20%'>"+
								"<div class='content'><div class='row'>"+
          						"<div style='font-size:13pt;' class='ui header'>"+object.get("post")+"</div>"+
								"<div style='font-size:9pt;color:gray;' class='description'>"+time_z+"・"+object.get('pdis')+"km"+" </div></div>"+
								"<div class='row' style='padding-top:10px'>"+
              					"<a class='like'><i class='like icon'></i> 4 Likes</a>"+
              					'<a class="comment" id="comment" onclick="comments(\''+object.id+'\')">'+
                				"<i class=' comment outline icon' id='comment' style='padding-left:5%'></i>  Comments</a></div></div></div>";
				document.getElementById('post_line').innerHTML = document.getElementById('post_line').innerHTML + post_list;
		
    		}
  		},
  		error: function(error) {
    		alert("Error: " + error.code + " " + error.message);
  		}
	});
});

function comments(initValue){
	var Post = Parse.Object.extend("p");
	var post = new Parse.Query(Post);
	post.equalTo("objectId",initValue);
	post.find({
		success: function(results) {
			var posted = results[0];
			var now = new Date();
			var time_new = now.getTime();
			var time_old = posted.createdAt.getTime();
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
			header_list =   "<div class='ui segment' style='padding:10%'>"+
    						"<div class='row' style='padding:0;'>"+
            				"<div class='ui column grid'>"+
            				"<div class='four wide column'>"+
               				"<div class='label'>"+
                  			"<div class='scircle'>"+
                   			"<div class='inner'></div></div></div></div>"+
              				"<div class='twelve wide column' style='padding-left:0'>"+
               				"<a style='font-size:25px'>"+posted.get('last_name')+"</a>";
							"<div class='date'>"+time_z+"</div>"+
               				"<h3>"+posted.get('post')+"</h3></div></div></div>"+     
           					"<div class='ui center aligned grid'>"+
                			"<img src='"+posted.get('my_pic')+"' style='width:70%;height:70%'></img></div>"+
            				"<div class='ui gray stacked segment' style='background:#FFEFD5'>"+
              				"<h4 style='margin-top:0;'>Comment</h4>"+
             				"<div class='ui divider'></div>";
			document.getElementById('commentmodal').innerHTML = document.getElementById('commentmodal').innerHTML + header_list;
    	},
		error: function(error) {
    		alert("Error: " + error.code + " " + error.message);
  		}
	});
	var Comment = Parse.Object.extend("comments");
	var comment_mine = new Parse.Query(Comment);
	comment_mine.equalTo("postid", initValue);
	comment_mine.find({
  		success: function(results) {
    		if(results.length == 0){
				no_comment ='<div class="equal height row" style="padding:0">'+
              				'<div class="two wide column" style="padding-right:0;padding-top:0">'+
                			'<img class="ui avatar image" src="'+currentUser.get('my_pic')+'"></img></div>'+
             				'<div class="fourteen wide column" style="padding-left:5px">'+
              				'<div class="ui fluid icon input">'+
                			'<input type="text" placeholder="Comment..">'+
                			'<i class="write icon"></i></div></div></div></div></div></div></div></div>';
  				document.getElementById('commentmodal').innerHTML = document.getElementById('commentmodal').innerHTML + no_comment;
			}else{
			// Do something with the returned Parse.Object values
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

				$('#commentmodal').modal('show');
				var comment_list =  "<div class='ui column grid'>"+
                					"<div class='equal height row' style='padding:0'>"+
              						"<div class='two wide column' style='padding-right:0;padding-top:0'>"+
                					"<img class='ui avatar image' src='"+object.get('my_pic')+"'></img></div>"+
              						'<div class="four wide column" style="padding-left:5px">'+
                					'<a style="font-size:18px">'+object.get('last_name')+'</a>'+
                					'<div class="date" style="font-size:12px">'+time_z+'</div></div>'+
              						'<div class="ten wide column" style="padding-left:0;">'+
                  					'<p style="font-size:16px">'+object.get('comment')+'</p></div></div>'+
              						'<div class="ui divider"></div>';
              						document.getElementById('commentmodal').innerHTML = document.getElementById('commentmodal').innerHTML + comment_list; 
 			}
			var end_list =  '<div class="equal height row" style="padding:0">'+
              				'<div class="two wide column" style="padding-right:0;padding-top:0">'+
                			'<img class="ui avatar image" src="'+currentUser.get('my_pic')+'"></img></div>'+
             				'<div class="fourteen wide column" style="padding-left:5px">'+
              				'<div class="ui fluid icon input">'+
                			'<input type="text" placeholder="Comment..">'+
                			'<i class="write icon"></i></div></div></div></div></div></div></div></div>';
			document.getElementById('commentmodal').innerHTML = document.getElementById('comment_modal').innerHTML + end_list;
			}
  		},
  		error: function(error) {
    		alert("Error: " + error.code + " " + error.message);
  		}
	});
	$('#commentmodal').modal('show');
 	alert(initValue);         
}

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
            
        }
    }

