/* Get company of user Janice*/

 window.editgetCompany=function(){

        var email = sessionStorage.getItem('emailID');

         var userEmail = {"email" : email};
	
		 $.post('newscripts/member.php',userEmail, function(data){
			 data = JSON.parse(data);
			 
			 var status=data["company"];
		 var edittxtCompany = document.getElementById("edituserCompany");
	edittxtCompany.value=status;
	edittxtCompany.disabled = true;	
	getAlldetails(status);
	
	
		 });
         
  };

/* Company report get all the companies Janice*/

function getAlldetails(company) {
var company=company;
 var company = document.getElementById('edituserCompany').value;
var company = {"company" : company};
  $.post("newscripts/editDetails.php", company, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
      data = JSON.parse(data);
	  var id = data[0].companyname;
    var oTable = document.getElementById('myTable');

	var obj = data[0];
	for (var key in obj){
		var attrName = key;
        var attrValue = obj[key];
		if(attrName == 'iddata' || attrName=='companyname' || attrName=='BusinessType' || attrName=='year' || attrName=='monthrange' || attrName =='lastmodified'){
			
		}
		else{
         
		if(attrValue==""){
			
		} 
		else{
			
		document.getElementById(attrName).value=attrValue;
		}
		
		}
    }
});}


	  