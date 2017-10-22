//Gurmeet Singh
window.checkadmincooperative=function () {
	  var frmyear1 =  $("#fromyearco").val();
      var toyear1 =  $("#toyearco").val();
	  
	  var newfrom = frmyear1+"-"+"01"+"-"+"01";
	  var newto = toyear1+"-"+"01"+"-"+"01";
	  var co = $("#dcoopuserreport").val();
	  var status2 = $("#status2").val();
	  if(co == "Please select")
	  {
		  co = "";
	  }
	  if(frmyear1 == "" || toyear1 == ""){
	  alert("Please fill the required information.");	  
	  }
	  else if (frmyear1>toyear1){
	  alert("The from year field should be less than or equal to to year field");  
	  }
	  else{
	  var registerUser = {"fromyearco" : newfrom, "toyearco" : newto, "coop" : co  , "status2" : status2};
      $.post("scripts/database/cooperativeselect.php", registerUser, function(data){
 	  //alert(data);
      // Change the data from plain text that PHP echo'd to a JavaScript object
      data = JSON.parse(data);
      var p = document.getElementById("thecooperative");

      var out = "<table>" +"<tr><th>"+ "SEQ" + "</th><th>"+ "Email" + "</th><th>" + "Status" + "</th><th>" + "Coop Name" + "</th><th>" + "Type" +"</th><th>" + "Year" +"</th><th>" + "Asset Size" + "</th><th>" + "Revenue Size" +  "</th><th>" + "Kpi Name" + "</th><th>" + "Kpi Value" +  "</th></tr>";

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
        data[i].type +
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
	  window.location.href = "#CoopReport";
	  document.getElementById("formco").reset();
	  });
	  }
  return false;
};