/* Get users company Janice*/

window.getCompany=function(){

        var email = sessionStorage.getItem('emailID');

         var userEmail = {"email" : email};
	
		 $.post('newscripts/member.php',userEmail, function(data){
			
			 data = JSON.parse(data);
			 
			 var status=data["company"];
			 var txtCompany = document.getElementById("userCompany");
	txtCompany.value=status;
	txtCompany.disabled = true;
	
		 var edittxtCompany = document.getElementById("edituserCompany");
	edittxtCompany.value=status;
	edittxtCompany.disabled = true;	
	
	 });
  
};