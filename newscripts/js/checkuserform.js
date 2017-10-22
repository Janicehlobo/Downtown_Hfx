/* Check user registration Janice*/

window.checkUserForm=function () {
   var fname =  $("#txtRegisterfname").val();
   var lname =  $("#txtRegisterlname").val();
   var email =  $("#txtRegisterEmail").val(); 
   var phone=$("#txtRegisterlphone").val();   
   var passworduser=  $("#txtRegisterPassword").val();
   var btypeu = document.getElementById("businesstype");
var btype = btypeu.options[btypeu.selectedIndex].value;
var confirmpassword = $("#txtConfirmPassword").val();  
  var companyname = $("#txtCompanyname").val();
var ck =    /^[A-Za-z ]+$/ ;
var ckemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var ckphone= /\d{3}-\d{3}-\d{4}|\d{10}/;


   if ( fname == "" || lname == "" || email == "" || passworduser == "" || phone == "" || companyname == ""|| confirmpassword == ""){   
   alert("Please complete all the required fields");
  
 }
 else if(!ck.test(fname)){
	 alert("First name should contain only letters");
	 
 }
 else if(!ck.test(lname)){
	 alert("Last name should contain only letters");
	 
 }
 
 
 else if (!ckemail.test(email))
  {  
    alert("Invalid Email ID");
  }
else if(passworduser.length > 8 || confirmpassword.length>8){
	 alert("Password cannot be greater than 8 characters long");
	 
 }
  
 else if(passworduser != confirmpassword){
	 
	 alert("Please check your password is correct");
	 document.getElementById("txtRegisterPassword").value= "";
	 document.getElementById("txtConfirmPassword").value= "";
 }
 
 else {
        
         var registerUser = {"fname" : fname, "lname" : lname, "email" : email, "phone" : phone, "password" : passworduser ,"company" : companyname,"btype": btype};
		
		 $.post('newscripts/login.php', registerUser, function(data){
			 
			 alert(data);
		 });
         
      window.location.replace("#login");
   } 
   document.getElementById("txtRegisterfname").value= "";document.getElementById("txtRegisterlname").value= "";
   document.getElementById("txtRegisterEmail").value= "";
   document.getElementById("txtRegisterlphone").value= "";document.getElementById("txtRegisterPassword").value= "";
   document.getElementById("txtCompanyname").value= "";document.getElementById("txtConfirmPassword").value= "";
   
   
 };