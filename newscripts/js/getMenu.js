
/* Menu button Janice*/

window.getMenu= function (){
var id = sessionStorage.getItem("emailID");
  
   if (id == "admin"){
	   var mydiv = document.getElementById("getmenuentry");
	   var p = document.createElement("getmenuentry");
	   var out = "  <a href='#adminMenu' class='menu' data-role='button' data-iconpos='right' data-icon='bars'>Menu</a> "	;
	   p.innerHTML = out;   
    mydiv.appendChild(p);
   }else {

   
   var p = document.getElementById("getMenu");
	   var out = "  <a href='#adminMenu' class='menu' data-role='button' data-iconpos='right' data-icon='bars'>Menu</a> "
    p.innerHTML = out; 
  }

   };
  
 
 
 












 



 





