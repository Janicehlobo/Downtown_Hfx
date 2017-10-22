/* Forgot password Janice*/

 window.forgotPassword=function(){
var email =  $("#forgotEmail").val();
  
           if ( email == ""){   
   alert("Please enter your email");
 } else{
         var userEmail = {"email" : email};
		
		 $.post('newscripts/passwordMailer.php',userEmail, function(data){
		

			 var status=data;
			 if(status == 0)
			 {
				 alert("Error sending an email, Please contact your administrator");
			 }
			 
			 else if(status ==1){
				 
				 alert("Invalid Email ID");
			 }
			 else{
				 alert("An email containing the password has been sent");
				 window.location.replace("#login");
			 }
			 document.getElementById("forgotEmail").value= "";
		 });
         
		 }
    
	
};