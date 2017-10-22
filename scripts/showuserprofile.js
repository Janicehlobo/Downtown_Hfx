/*Fatma
*/
$(document).ready(function(){
  $.post("scripts/database/ShowProfileUser.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
      if (!data.length) return;
      data = JSON.parse(data);

      var p = document.getElementById("theprofileuser");

      var out = "<table>" +
      "<tr><th>"+ "seq" + "</th><th>"+ "First Name" +
       "</th><th>" + "Last name" + 
       "</th><th>" + "Phone Number" + 
       "</th><th>" + "Email" + 
       "</th><th>" + "Action" + 
        "</th></tr>" ;

      for (var i = 0; i < data.length; i ++){
        out += "<tr><td>"+
        [i+1] +
        "</td><td>" +
        data[i].firstName +
        "</td><td>" +
        data[i].lastName +
        "</td><td>" +
        data[i].telephone +
        "</td><td>" +
        data[i].email+       
        "</td><td>" +
        "<a data-inline='true'  data-mini='true' data-role='button' href='#editprofileuser' data-icon='edit' data-iconpos='notext' onclick='showprofileUserEdit("+ i + ")' ></a>"+
        "</td></tr>" ;
      }
      out += "</table>";
      p.innerHTML = out; 

      // Trigger a refresh in jQuery Mobile so that it will display your changes
      $('[data-role="content"]').trigger('create');
  });
 
  return false;
  
});


function showprofileUserEdit(index) {
    
    $.post("scripts/database/ShowProfileUser.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
     if (!data.length) return; 
     data = JSON.parse(data);
    
     var firstname = data[index].firstName;
     var lastname = data[index].lastName;
     var email = data[index].email;
     var phone = data[index].telephone;
   
    $('#txtEditfirstname').val(firstname);
    $('#txtEditlastname').val(lastname);
    $('#txtEditemail').val(email);
    $('#txtEditphone').val(phone);
   
  });
 } 

 function EdituserInfo(){
    
    var firstname = $('#txtEditfirstname').val();
    var lastname = $('#txtEditlastname').val();
    var email =  $('#txtEditemail').val();
    var phone = $('#txtEditphone').val();

  
    var newInfo = { "firstname" :  firstname ,"lastname" : lastname , "email" :  email , 
     "phone" : phone } ;

    $.post("scripts/database/editprofileuser.php", newInfo, function(data){
        alert(data);  
       

  });

    window.location.href = "#Profile";
    location.reload();
 }













