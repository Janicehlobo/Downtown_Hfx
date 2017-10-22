/* show active KPI's Janice*/

function showKPIView() {

 
  $.post("newscripts/addKPI.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
      data = JSON.parse(data);
      var p = document.getElementById("kpilistview");


      var out = "<table>" +"<tr><th>"+"KPI"+"</th><th>"+ "Check KPI" + "</th></tr>";

      for (var i = 0; i < data.length; i++){
        out += "<tr><td>"+
        data[i].KPIName +
        "</td><td> <input type='checkbox' name ='kpichx' id='"+ data[i].KPIName +
        "'> </td></tr>" ;
		
      }
	  out += "</table>";
      p.innerHTML = out;       
      // Trigger a refresh in jQuery Mobile so that it will display your changes
      //$('[data-role="content"]').trigger('create');
	  window.location.href = "#kpilistV";
	  
	  });
	  return false;
	  };