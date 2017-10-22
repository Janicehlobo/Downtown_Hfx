/*Mahnoush
*/
$(document).ready(function(){
  $.post("scripts/database/ShowProfile.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
      if (!data.length) return;
      data = JSON.parse(data);

      var p = document.getElementById("theprofile");

      
      var out = "<table>" +
      "<tr><th>"+ "seq" + "</th><th>"+ "Coop Name" +
       "</th><th>" + "Industry" + 
       "</th><th>" + "Type" + 
       "</th><th>" + "Postalcode" + 
       "</th><th>" + "Province" + 
       "</th><th>" + "country" + 
       "</th><th>" + "language" + 
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

        "<a data-inline='true'  data-mini='true' data-role='button' href='#editprofile' data-icon='edit' data-iconpos='notext' onclick='showprofileEditForm("+ i + ")' ></a>"+
        
        "</td></tr>" ;


      }
      out += "</table>";
      p.innerHTML = out; 


      // Trigger a refresh in jQuery Mobile so that it will display your changes
      $('[data-role="content"]').trigger('create');
  });
  displayindustry('txtEditindustrypro');
  displaytype('txtEdittypepro'); 
  return false;
  
});


function showprofileEditForm(index) {
    
    $.post("scripts/database/ShowProfile.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
     if (!data.length) return; 
     data = JSON.parse(data);
    
     var  idcoop = data[index].idcoop;
     var coopName = data[index].coopName;
     var industry = data[index].industry;
     var postalCode = data[index].postalCode;
     var type = data[index].type;
     var province = data[index].province;
     var country = data[index].country;
     var language = data[index].language;
   
    
    $('#txtEditproid').val(idcoop);
    $('#txtEditproName').val(coopName);
    $('#txtEditindustrypro').val(industry);
    $('#txtEditindustrypro').selectmenu('refresh');
    $('#txtEditpostalcodepro').val(postalCode);
    $('#txtEdittypepro').val(type);
    $('#txtEdittypepro').selectmenu('refresh');
    $('#txtEditprovincepro').val(province);
    $('#txtEditcountrypro').val(country);
    $('#txtEditlanguagepro').val(language).selectmenu('refresh');

  });
 } 

 function EditproInfo(){
    
    var idcoop = $('#txtEditproid').val();
    var CoopName = $('#txtEditproName').val();
    var industry =  $('#txtEditindustrypro').val();
    var postalcode= $('#txtEditpostalcodepro').val();
    var type = $('#txtEdittypepro').val();
    var province = $('#txtEditprovincepro').val();
    var country = $('#txtEditcountrypro').val();
    var language = $('#txtEditlanguagepro').val();
   


    var newInfo = { "idcoop" : idcoop ,"CoopName" : CoopName , "industry" : industry , 
     "postalcode" : postalcode , "type" : type, "province" : province, "country" : country, "language" : language } ;

    $.post("scripts/database/Editprofile.php", newInfo, function(data){
        alert(data);  
       

  });

    window.location.href = "#Profile";
    location.reload();
 }













