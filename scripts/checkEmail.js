/* Send email by Fatma
*
*/
  window.CheckEmail= function () {
  var EmailUser= $("#emailcheck").val();
  
  if (EmailUser == "" ) {
   alert("please enter your email address");
  }

  else { 

   //document.getElementById("checkEmail").reset(); 
   
   $.post("scripts/database/checkEmail.php", {'EmailUser' : EmailUser},function (data){
   var data = JSON.parse(data);
  
  
   var stat = data.wasSuccessful;
   
   if (stat == true){

   window.location.replace("#newpassword");

   }
   
else {

alert("This email does not exist! ");

}
     
   });    
  }
}



