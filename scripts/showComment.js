
$(document).ready(function(){
 
  $.post("scripts/database/ShowComment.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
      data = JSON.parse(data);
      
      var count = data.length;
      
      var p = document.getElementById("comments");

      
  //    var out = "<table>" + "<tr><th>"+ "comment" +  "</th></tr>" ;

   // for (var i = 0; i < data.length; i ++){
    //    out += "<tr><td>"+
     //  data[i].comment 
       
    //}
      
     //out += "</table>";
    //  p.innerHTML = out;       
        p.innerHTML = data[count-1].comment;

      // Trigger a refresh in jQuery Mobile so that it will display your changes
      $('[data-role="content"]').trigger('create');
  });
  return false;
});


//unction showKpiEditForm(index) {
    
   // $.post("scripts/database/ShowKPIs.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
    //  data = JSON.parse(data);
   
    //var tbRecords = JSON.parse(localStorage.getItem("tbRecords"));
    // var title = data[index].title;
    // var category = data[index].category;
   //  var kstatus = data[index].kstatus;
   //  var unit = data[index].unit;
   //  var definition = data[index].definition;

  
    
  //  $('#txtEditKPI').val(title);
  //  $('#txtEditCategory').val(category);
  //  $('#txtEditpostalcode').val(kstatus);
  //  $('#txtEditUnit').val(unit);
  //  $('#txtEditDef').val(definition);
      
 // });
 //} 




