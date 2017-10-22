/* Business report Janice*/

window.checkbusiness=function () {
	
	var frommonthRange = document.getElementById("fromyear");
    var frmyear = frommonthRange.options[frommonthRange.selectedIndex].text;
	var tomonthRange = document.getElementById("toyear");
    var toyear = tomonthRange.options[tomonthRange.selectedIndex].text;
	var businessSelected = document.getElementById("btypereport");
    var business = businessSelected.options[businessSelected.selectedIndex].text;
	
	  if(business == "Please select" || frmyear == "Please select" || toyear == "Please select"){
	  alert("Please fill the required information.");	  
	  }
	  else if (frmyear>toyear){
	  alert("The from year cannot be greater than to year");  
	  }
	  else{
	  var registerBusiness = {"fromyear" : frmyear, "toyear" : toyear, "business" : business};
      $.post("newscripts/businessReport.php", registerBusiness, function(data){
 	  
      // Change the data from plain text that PHP echo'd to a JavaScript object
      data = JSON.parse(data);
	  
      var p = document.getElementById("thebusinesses");

      var out = "<table>" +"<tr><th>"+"Seq"+"</th><th>"+ "Year" + "</th><th>"+"Business" + "</th><th>"+ "Tax Paid" + "</th><th>" + "Sales" + "</th></tr>";

      for (var i = 0; i < data.length; i++){
        out += "<tr><td>"+
        [i+1] +
        "</td><td>" +
        data[i].year +
        "</td><td>" +
        data[i].BusinessType +
		"</td><td>" +
        data[i].Total_Taxpaid +
        "</td><td>" +
		data[i].Total_Sales +
        "</td></tr>" ;
      }
	  out += "</table>";
      p.innerHTML = out;       
      // Trigger a refresh in jQuery Mobile so that it will display your changes
      //$('[data-role="content"]').trigger('create');
	  window.location.href = "#BusinessReport";
	  
	  });
	  }
  return false;
};

/* Download business report Janice*/

window.downloadreport=function () {
var url='data:application/vnd.ms-excel,' + encodeURIComponent($('#thebusinesses').html()) ;
        location.href=url;
}






