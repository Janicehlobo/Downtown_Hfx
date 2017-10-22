/* User login Janice*/

window.loginInput=function(){
var email =  $("#email").val();
  var password =  $("#password").val();
   
   sessionStorage.setItem('emailID', email);
   if ( email == "" || password == ""){   
   alert("Please check your input is correct");
 }
 else {
        
         var loginUser = {"email" : email, "password" : password};
		 
		 $.post('newscripts/checkNewUserEmail.php',loginUser, function(data){
			 data = JSON.parse(data);
			 var status=data["userId"];
			 if(status == 0)
			 {
				 alert("Invalid user");
				 document.getElementById("email").value= "";
   document.getElementById("password").value= "";
			 }
			 else if(status == 'error'){
				 alert("Invalid password, Please try again");
				 document.getElementById("email").value= "";
   document.getElementById("password").value= "";
				 
			 }
			 else if(status == 1){
				 window.location.replace("#adminHome");
				 
				 
			 }
			 else{
				 
				 window.location.replace("#userHomePage");
			 }
			 
		 }); 
      
   } 
   
 }; 