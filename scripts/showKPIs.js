/*Mahnoush
*shows all Kpi in Admin kpi page
*/
$(document).ready(function(){
  $.post("scripts/database/ShowKPIs.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
      data = JSON.parse(data);
      var p = document.getElementById("theKPIs");

      
      var out = "<table>" + "<tr><th>"+ "seq" + "</th><th>" +  "KPI Title" + "</th><th>" + 
      "Category" + "</th><th>" + "Status" + "</th><th>" + "Unit" +  "</th><th>" +
       "Definition" +  "</th><th>" + "Action" +  "</th></tr>" ;

      for (var i = 0; i < data.length; i ++){
        out += "<tr><td>"+
        [i+1] +
        "</td><td>" +
        data[i].title +
        "</td><td>" +
        data[i].category +
        "</td><td>" +
        data[i].kstatus +
        "</td><td>" +
        data[i].unit +
        "</td><td>" +
        data[i].definition +
        "</td><td>" +
        "<a data-inline='true'  data-mini='true' data-role='button' href='#editKPI'" +
        "data-icon='edit'  data-iconpos='notext' onclick='showKpiEditForm(" + i + ")' ></a>"+
        
        "</td></tr>" ;
        
      }
      out += "</table>";
      p.innerHTML = out;       


      // Trigger a refresh in jQuery Mobile so that it will display your changes
      $('[data-role="content"]').trigger('create');
  });
  
  displaycategory('txtEditCategory');
  return false;
});


function showKpiEditForm(index) {
    
    $.post("scripts/database/ShowKPIs.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
      data = JSON.parse(data);
   
     var idkpi = data[index].idkpi;
     var title = data[index].title;
     var category = data[index].category;
     var kstatus = data[index].kstatus;
     var unit = data[index].unit;
     var definition = data[index].definition;

  
    $('#txtEditKPIid').val(idkpi);
    $('#txtEditKPI').val(title);
    $('#txtEditCategory').val(category);
    $('#txtEditCategory').selectmenu('refresh');
    $('#txtEditKPIStatus').val(kstatus).selectmenu('refresh');
    $('#txtEditUnit').val(unit);
    $('#txtEditDef').val(definition);   
  
      
  });
 } 


function EditKPIInfo(){
    
    var idkpi = $('#txtEditKPIid').val();
    var title =  $('#txtEditKPI').val();
    var category= $('#txtEditCategory').val();
    var kstatus = $('#txtEditKPIStatus').val();
    var unit = $('#txtEditUnit').val();
    var definition = $('#txtEditDef').val();   


    var newInfo = { "idkpi" : idkpi ,"title" : title , "category" : category ,  "kstatus" : kstatus , "unit" : unit, "definition" : definition} ;
    $.post("scripts/database/EditKPI.php", newInfo, function(data){
        alert(data);    

  });

    window.location.href = "#KPIs";
    location.reload();
 }



