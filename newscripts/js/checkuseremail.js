/* Check user Email Janice*/

 window.checkUserEmail=function () {
	 
	 var email =  $("#txtRegisterEmail").val(); 
	var loginUser = {"email" : email}; 
 $.post('newscripts/checkNewUserEmail.php',loginUser, function(data){
			 data = JSON.parse(data);
		 var status=data["userId"];
 
 if(status == 1 || status == 'error'){
	 alert("User already exists");
	 
	 }
	 else{
		 
		 checkUserForm();
	 }
	 
 });
 
 }