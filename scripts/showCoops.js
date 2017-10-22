/*Mahnoush
shows all coops in Admin coop page
*/
$(document).ready(function(){
  $.post("scripts/database/ShowCoops.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
      data = JSON.parse(data);
      var p = document.getElementById("theCoops");

      
      var out = "<table>" +
      "<tr><th>"+ "seq" + "</th><th>"+ "First Name" +
       "</th><th>" + "Last Name" + 
       "</th><th>" + "Email" + 
       "</th><th>" + "Phone Number" + 
	   "</th><th>" + "Role" + 
       "</th><th>" + "Company Name" + 
       "</th><th>" + "Business Type" + 
       "</th><th>" + "Membership ID" + 
       "</th><th>" + "Action" + 
        "</th></tr>" ;

      for (var i = 0; i < data.length; i ++){
        out += "<tr><td>"+
        [i+1] +
        "</td><td>" +
        data[i].coopName +
        "</td><td>" +
        data[i].industry +
        "</td><td>" +
        data[i].type +
        "</td><td>" +
        data[i].postalCode +
        "</td><td>" +
        data[i].province +
        "</td><td>" +
        data[i].country +
        "</td><td>" +
        data[i].language +
        "</td><td>" +
        data[i].cstatus +
        "</td><td>" +
        "<a data-inline='true'  data-mini='true' data-role='button' href='#editCoop' data-icon='edit' data-iconpos='notext' onclick='showCoopEditForm("+ i + ")' ></a>"+
        
        "</td></tr>" ;

      }
      out += "</table>";
      p.innerHTML = out;       


      // Trigger a refresh in jQuery Mobile so that it will display your changes
      $('[data-role="content"]').trigger('create');
  });

  
  displayindustry('txtEditindustry');
  displaytype('txtEdittype');
  return false;
});


function showCoopEditForm(index) {
    
    $.post("scripts/database/ShowCoops.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
      data = JSON.parse(data);
    
     var  idcoop = data[index].idcoop;
     var coopName = data[index].coopName;
     var industry = data[index].industry;
     var postalCode = data[index].postalCode;
     var type = data[index].type;
     var province = data[index].province;
     var country = data[index].country;
     var language = data[index].language;
     var cstatus = data[index].cstatus;
    
    $('#txtEditCoopid').val(idcoop);
    $('#txtEditCoopName').val(coopName);
    $('#txtEditindustry').val(industry);
    $('#txtEditindustry').selectmenu('refresh');
    $('#txtEditpostalcode').val(postalCode);
    $('#txtEdittype').val(type);
    $('#txtEdittype').selectmenu('refresh');
    $('#txtEditprovince').val(province);
    $('#txtEditcountry').val(country);
    $('#txtEditlanguage').val(language).selectmenu('refresh'); 
    $('#txtEditCoopStatus').val(cstatus).selectmenu('refresh');  

  });
 } 

 function EditCooInfo(){
    
    var idcoop = $('#txtEditCoopid').val();
    var CoopName = $('#txtEditCoopName').val();
    var industry =  $('#txtEditindustry').val();
    var postalcode= $('#txtEditpostalcode').val();
    var type = $('#txtEdittype').val();
    var province = $('#txtEditprovince').val();
    var country = $('#txtEditcountry').val();
    var language = $('#txtEditlanguage').val();
    var CoopStatus = $('#txtEditCoopStatus').val();   


    var newInfo = { "idcoop" : idcoop ,"CoopName" : CoopName , "industry" : industry , 
     "postalcode" : postalcode , "type" : type, "province" : province, "country" : country, "language" : language,
     "CoopStatus" : CoopStatus } ;

    $.post("scripts/database/EditCoop.php", newInfo, function(data){
        alert(data);  
       

  });

    window.location.href = "#Cooperatives";
    location.reload();
 }













