/* Reset password Janice*/

window.resetPassword=function(){
var email =  $("#existingEmail").val();
  var currpassword =  $("#currPassword").val();
  var newpassword =  $("#NewPassword").val();
  
  if ( email == "" || password == ""){   
   alert("Please check your input is correct");
 }
 else if(newpassword.length > 8){
	 alert("Password cannot be greater than 8 characters long");
	 
 }
      
 else {
        
         var resetPass = {"email" : email, "currpassword" : currpassword, "newpassword" : newpassword};
		 $.post('newscripts/resetPassword.php',resetPass, function(data){
			 data = JSON.parse(data);
			 var status=data;
			 if(status == '0')
			 {
				 alert("Invalid user");
			 }
			 
			 else if(status =='1'){
				 
				 alert("Invalid password");
			 }
			 else{
				 alert("Password  has been updated");
				 window.location.replace("#login");
			 }
			 
		 });
         
      
   } 
   document.getElementById("existingEmail").value= "";document.getElementById("currPassword").value= "";
   document.getElementById("NewPassword").value= "";
 };