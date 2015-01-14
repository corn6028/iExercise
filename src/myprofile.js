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

<<<<<<< HEAD
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

=======
>>>>>>> origin/gh-pages
