//Mahnoush
$(document).ready(function(){
  $.post("scripts/database/ShowUsers.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
      data = JSON.parse(data);
      var p = document.getElementById("theUsers");

      
       var out = "<table>" +
      "<tr><th>"+ "seq" + "</th><th>"+ "Membership ID" + "</th><th>" + "First Name" + "</th><th>" + 
       "Last Name" + "</th><th>" + "Email" + "</th><th>" + "Phone #" +  "</th><th>" + "Company Name" + 
       "</th><th>" + "Role" +  "</th><th>" + "Business Type" +  "</th><th>" +"Action" +  "</th></tr>" ;

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
        data[i].ustatus +
        "</td><td>" +
        data[i].role +
        "</td><td>" +
       data[i].coopName +
        "</td><td>" +
        "<a data-inline='true'  data-mini='true' data-role='button' href='#editUser'" + 
        "data-icon='edit' data-iconpos='notext' onclick='showUserEditForm(" + i + ")' ></a>"+
        
        "</td></tr>" ;
        
      }
      out += "</table>";
      p.innerHTML = out;       


      // Trigger a refresh in jQuery Mobile so that it will display your changes
      $('[data-role="content"]').trigger('create');
  });
  displayCoop('usercoopname');
  return false;
});


function showUserEditForm(index) {
    
    $.post("scripts/database/ShowUsers.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
      data = JSON.parse(data);
     
    //var tbRecords = JSON.parse(localStorage.getItem("tbRecords"));
     var fname = data[index].firstName;
     var lname = data[index].lastName;
     var email = data[index].email;
     var phone = data[index].telephone;
     //var password = data[index].password;
     var role = data[index].role;
     var status = data[index].ustatus;
     var id =  data[index].iduser;
     var coopid = data[index].idcoop;
     var coopname = data[index].coopName;

    $('#txtfnameUser').val(fname);
    $('#txtlnameUser').val(lname);
    $('#txtEmailUser').val(email);
    $('#txtlphoneUser').val(phone);
    //$('#txtPasswordUser').val(password);
    $('#txtroleuser').val(role).selectmenu('refresh');
    $('#txtsatauUser').val(status).selectmenu('refresh');
    $('#txtIDUser').val(id);
    $('#coopIDUser').val(coopid);
    $('#usercoopname').val(coopname);
    $('#usercoopname').selectmenu('refresh');


  });

    $('[data-role="content"]').trigger('create');
 } 

 function EditUserInfo(){
    
    var id =  $('#txtIDUser').val();
    var fname = $('#txtfnameUser').val();
    var lname = $('#txtlnameUser').val();
    var email = $('#txtEmailUser').val();
    var phone = $('#txtlphoneUser').val();
    var role = $('#txtroleuser').val();
    var status = $('#txtsatauUser').val();
    var coopid = $('#coopIDUser').val();
    var coopname = $('#usercoopname').val();

    var newInfo = { "id" : id , "fname" : fname, "lname" : lname, "email" : email, "phone" : phone , "role" : role, "status" : status, "coopIDUser" : coopid , "usercoopname" :coopname } ;
    $.post("scripts/database/EditUsers.php", newInfo, function(data){
        alert(data);    

  });

    window.location.href = "#Users";
    location.reload();
 }



