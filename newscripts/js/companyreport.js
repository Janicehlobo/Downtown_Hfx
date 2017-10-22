/* Company report Janice*/

function ReportCompany() {
   
   $.post("newscripts/getCompanies.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
   data = JSON.parse(data);

  var c = document.getElementById("txtcompanyuserreport");
     for(var i in data){
		 var comp = data[i].companyname;
		
		 var option = document.createElement("option");
        option.text  =comp;
        
		c.add(option);
		  
	 }
 
    });
	
 };
 
 window.onload=ReportCompany();
 
 
 
 window.checkcompany=function () {
	
	var frommonthRange = document.getElementById("fromyeari");
    var frmyear = frommonthRange.options[frommonthRange.selectedIndex].text;
 var tomonthRange = document.getElementById("toyeari");
    var toyear = tomonthRange.options[tomonthRange.selectedIndex].text;
	  var companySelected = document.getElementById("txtcompanyuserreport");
    var comp = companySelected.options[companySelected.selectedIndex].text;

	  if(companySelected == "Please select" || frmyear == "Please select" || toyear == "Please select"){
	  alert("Please fill the required information.");	  
	  }
	  else if (frmyear>toyear){
	  alert("The from year cannot be greater than to year");  
	  }
	  else{
	  var registerCompany = {"fromyear" : frmyear, "toyear" : toyear, "company" : comp};
      $.post("newscripts/companyReport.php", registerCompany, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
      data = JSON.parse(data);
	  
      var p = document.getElementById("thecompanies");

      var out = "<table>" +"<tr><th>"+"Seq"+"</th><th>"+ "Year" + "</th><th>"+"Company" + "</th><th>"+ "Tax Paid" + "</th><th>" + "Sales" + "</th></tr>";

      for (var i = 0; i < data.length; i++){
        out += "<tr><td>"+
        [i+1] +
        "</td><td>" +
        data[i].year +
        "</td><td>" +
        data[i].companyname +
		"</td><td>" +
        data[i].Total_Taxpaid +
        "</td><td>" +
		data[i].Total_Sales +
        "</td></tr>" ;
      }
	  out += "</table>";
      p.innerHTML = out;       
     
	  window.location.href = "#CompanyReport";
	 
	  });
	  }
  return false;
};



window.downloadcompreport=function () {
var url='data:application/vnd.ms-excel,' + encodeURIComponent($('#thecompanies').html()) ;
        location.href=url;
}