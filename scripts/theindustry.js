//Gurmeet Singh
window.checkadminindustry=function () {
	  var frmyear1 =  $("#fromyeari").val();
      var toyear1 =  $("#toyeari").val();
      var newfrom = frmyear1+"-"+"01"+"-"+"01";
	  var newto = toyear1+"-"+"01"+"-"+"01";
	  var industry = $("#txtindustryuserreport").val();
      var status3 = $("#status3").val();
	  
      if(industry == "Please select")
	  {
		  industry = "";
	  }
	  
      if(frmyear1 == "" || toyear1 == ""){
	  alert("Please fill the required information.");	  
	  }
	  else if (frmyear1>toyear1){
	  alert("The from year field should be less than or equal to to year field");  
	  }
	  else {	  
	  var registerUser = {"fromyeari" : newfrom, "toyeari" : newto, "ind" : industry, "status3" : status3};
      $.post("scripts/database/industryselect.php", registerUser, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
      data = JSON.parse(data);
      var p = document.getElementById("theindustry");     
      var out = "<table>" +"<tr><th>"+ "SEQ" + "</th><th>" + "Email" + "</th><th>" + "Status" +"</th><th>" + "Coop Name" +"</th><th>" + "industry" +"</th><th>" + "Year" + "</th><th>" + "Asset Size" + "</th><th>" + "Revenue Size" + "</th><th>" + "Kpi Name" +"</th><th>"+ "Kpi Value" + "</th></tr>";

      for (var i = 0; i < data.length; i++){
        out += "<tr><td>"+
        [i+1] +
        "</td><td>" +
        data[i].email +
        "</td><td>" +
        data[i].ustatus +
		"</td><td>" +
        data[i].coopName +
        "</td><td>" +
        data[i].industry + 
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
        "</td></tr>";
      }
      out += "</table>";
      p.innerHTML = out;       
      // Trigger a refresh in jQuery Mobile so that it will display your changes
      $('[data-role="content"]').trigger('create');
	  window.location.href = "#IndustryReport";
    document.getElementById("formi").reset();
  });
  }
  return false;
};