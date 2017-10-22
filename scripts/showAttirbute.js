
$(document).ready(function(){
 
  $.post("scripts/database/ShowAttribute.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
      data = JSON.parse(data);
      var p = document.getElementById("Attributestable");
      var out = "<table>" +
       "<tr><th>"+ "seq" + "</th><th>" +  "Attribute Name" + 
       "</th><th>" + "Attribute Value" + 
       "</th><th>" + "Status"  +
       "</th><th>" + "Action" + 
       "</th></tr>" ;

      for (var i = 0; i < data.length; i ++){
        out += "<tr><td>"+
        [i+1] +
        "</td><td>" +
        data[i].dropdownName +
        "</td><td>" +
        data[i].dropdownValue  +
         "</td><td>" +
        data[i].dstatus  + 
         "</td><td>" +
        "<a class='ui-btn ui-icon-edit ui-btn-icon-notext ui-corner-all'  " +
        "onclick='editstatus(" + i + ")'></a>"+
        "</td></tr>" ;
      }
      out += "</table>";
      p.innerHTML = out;       
      // Trigger a refresh in jQuery Mobile so that it will display your changes
      $('[data-role="content"]').trigger('create');
  });
  return false;
});
function editstatus(index) {
    $.post("scripts/database/ShowAttribute.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
      data = JSON.parse(data);
    
     var attributeName = data[index].dropdownName;
     var attributeValue  = data[index].dropdownValue;
     var status = data[index].dstatus;
     
    $('#AttributeName').val(attributeName);
    $('#AttributeValue').val(attributeValue);
    $('#editVal').val(status);
    $("#myPopupDialogedit").popup().popup("open");
  });
 } 

 function editattributeDatabase(){
    
    var editname = $('#AttributeName').val();
    var editValue = $('#AttributeValue').val();
    var editstatus = $('#editVal').val();
    
    var newInfo = { "attributeName"  : editname, "attributeValue" : editValue, "status" : editstatus } ;

    $.post("scripts/database/EditAttribute.php", newInfo, function(data){
        alert(data);  
  });

    window.location.href = "#Attribute";
    location.reload();
 }