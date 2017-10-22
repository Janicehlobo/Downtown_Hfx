/*Mahnoush
*Shows active KPIs in KPI definition page
*/
$(document).ready(function(){
  $.post("scripts/database/ShowActiveKPI.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
      data = JSON.parse(data);
      var p = document.getElementById("KPIDefinitionList");


      var out =  "<div>";

      for (var i = 0; i < data.length; i ++){

         out += "<div data-role='collapsible' data-iconpos='right' id='Defkpi"+i+"' name='kpi"+i+"'>"+

         " <input type='hidden'  id='IDkpi"+i+"'>"+data[i].definition+

         "<h5 id='titledefkpi"+i+"'>"+ data[i].title +"</h5>"+
         "<p id='definitinkpi"+i+"' > </p></div>";

       }
      out +=  "</div>";
      p.innerHTML = out ;
      // Trigger a refresh in jQuery Mobile so that it will display your changes
      $('[data-role="content"]').trigger('create');
  });
  return false;
});


  

  




