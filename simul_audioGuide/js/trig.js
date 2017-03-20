$(function() {
$("#carte").click(function(e) {
  var offset = $(this).offset();
  var relativeX= (e.pageX - offset.left);
  var relativeY = (e.pageY - offset.top);
  console.log(relativeX+':'+relativeY);

  if (relativeX>165 & relativeX<200 &
      relativeY>-360 & relativeY<-110) {

      soundPlayer1();

  }

  if (relativeX>520 & relativeX<545 &
      relativeY>-350 & relativeY<-130) {

      soundPlayer2();

  }
});
});
