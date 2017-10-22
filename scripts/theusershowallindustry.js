//Gurmeet Singh
window.checkalluserindustry=function () {
	 var frmyear1 =  $("#fromyearui").val();
     var toyear1 =  $("#toyearui").val();
	 var newfrom = frmyear1+"-"+"01"+"-"+"01";
	 var newto = toyear1+"-"+"01"+"-"+"01";
	 
	 if(frmyear1 == "" || toyear1 == ""){
	  alert("Please fill the required information.");	  
	  }
	  else if (frmyear1>toyear1){
	  alert("The from year field should be less than or equal to to year field");  
	  }
	  else{
	  var registerUser = {"fromyearui" : newfrom, "toyearui" : newto };
      $.post("scripts/database/showindustryusers.php", registerUser, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
      data = JSON.parse(data);
      var p = document.getElementById("theuserindustry15");
      
       var out = "<table>" +"<tr><th>"+ "SEQ" + "</th><th>" + "Industry" +"</th><th>" + "Language" +"</th><th>" + "Year" + "</th><th>"+ "Asset Size" +"</th><th>"+ "Revenue Size" +"</th><th>" + "Kpi Name" + "</th><th>" + "Kpi Value" +"</th></tr>";

      for (var i = 0; i < data.length; i++){
        out += "<tr><td>"+
        [i+1] +
        "</td><td>" +
        data[i].industry +
        "</td><td>" +
        data[i].language + 
        "</td><td>" +
		data[i].year +
		"</td><td>" +
        data[i].assetSize +
        "</td><td>" +
        data[i].revenueSize +
		"</td><td>" +
		data[i].title +
		"</td><td>" +
        data[i].kpiValue +
        "</td></tr>" ;
      }
      out += "</table>";
      p.innerHTML = out;       

      // Trigger a refresh in jQuery Mobile so that it will display your changes
      $('[data-role="content"]').trigger('create');
	  window.location.href = "#ShowallUserIndustryReport";
    document.getElementById("formui").reset();
  });
  }
  return false;
};