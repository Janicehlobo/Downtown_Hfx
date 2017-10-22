/* Show existing users Janice*/

$(document).ready(function(){
  $.post("newscripts/ShowUsers.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
      data = JSON.parse(data);
      var p = document.getElementById("theUsers");

      
       var out = "<table>" +
      "<tr><th>"+ "seq" + "</th><th>"+ "Membership ID" + "</th><th>" + "First Name" + "</th><th>" + 
       "Last Name" + "</th><th>" + "Email" + "</th><th>" + "Phone #" +  "</th><th>" + "Company Name" + 
       "</th><th>" + "Business Type" +  "</th><th>" +"Action" +  "</th></tr>" ;

      for (var i = 0; i < data.length; i ++){
        out += "<tr><td>"+
        [i+1] +
        "</td><td>" +
        data[i].iduser +
        "</td><td>" +
        data[i].firstName +
        "</td><td>" +
        data[i].lastName +
        "</td><td>" +
        data[i].email +
        "</td><td>" +
        data[i].telephone +
        "</td><td>" +
        data[i].company +
        "</td><td>" +
       data[i].btype +
        "</td><td>" +
        "<a data-inline='true'  data-mini='true' data-role='button'" + 
        "data-icon='delete' data-iconpos='notext' onclick='deleteUser(" + data[i].iduser + ")' ></a>"+
        
        "</td></tr>" ;
        
      }
      out += "</table>";
      p.innerHTML = out;       


      // Trigger a refresh in jQuery Mobile so that it will display your changes
      $('[data-role="content"]').trigger('create');
  });
  
  return false;
});




  

window.userUpdate =function(){
	
	 var  fname = document.getElementById("txteditfname").value;
	 var lname=  document.getElementById("txteditlname").value;
	 var email= document.getElementById("txteditEmail").value;
	  var phone= document.getElementById("txteditphone").value;
	  var company = document.getElementById("txteditCompanyname").value;
	  var btype= document.getElementById("txteditBusinesstype").value;
	  
	  var registerUser = {"fname" : fname, "lname" : lname, "email" : email, "phone" : phone, "company" : company,"btype": btype};
		
  $.post("newscripts/updateUser.php", registerUser, function(data){
      
	  alert(data);
       }); 
		
    
  } 