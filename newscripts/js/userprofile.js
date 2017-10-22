/* Show user profile Janice*/

 window.userProfile =function(){
	 var email = sessionStorage.getItem('emailID');
	 
  $.post("newscripts/editUser.php", {"email" : email}, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
      data = JSON.parse(data);
      document.getElementById("txteditfname").value=data["firstName"];
	  document.getElementById("txteditlname").value=data["lastName"];
	  document.getElementById("txteditEmail").value=data["email"];
	  document.getElementById("txteditphone").value=data["telephone"];
	  document.getElementById("txteditCompanyname").value=data["company"];
	  
	  document.getElementById("txteditBusinesstype").value=data["btype"];
	    }); 
		
    
  } 
  