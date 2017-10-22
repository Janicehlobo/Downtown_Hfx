/* Show KPI's  data for data entry page Janice*/

function showAllKPI() {

 
  $.post("newscripts/getKPI.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
      data = JSON.parse(data);
      var p = document.getElementById("kpilist");


      var out = "<table id='myTable'>";

      for (var i = 0; i < data.length; i++){
        out += "<tr><td>"+
        data[i].KPIName +
        "</td><td> <input type='text' name ='kpitxt' id='"+ data[i].KPIName +
        "'> </td></tr>" ;
		
      }
	  out += "</table>";
      p.innerHTML = out;       
      // Trigger a refresh in jQuery Mobile so that it will display your changes
      //$('[data-role="content"]').trigger('create');
	  window.location.href = "#DataEntryPage";
	  });
	  return false;
	  };	