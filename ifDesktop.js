var isTouchDevice = function() {  return 'ontouchstart' in window || 'onmsgesturechange' in window; };
var isDesktop = window.screenX != 0 && !isTouchDevice() ? true : false;

if(isDesktop){
    document.getElementById("buttons").style.display = "none";
   	document.getElementById('canvas').style.width = "70%";
    document.getElementById('canvas').style.height = "auto";
    window.onload = function(){
     alert('Thank you for visiting my interactive resume!\nThis webpage is mobile optimized.\nHowever, you can still use the keyboard to move the character around (Arrow + A & B Keys)!');
    }

}