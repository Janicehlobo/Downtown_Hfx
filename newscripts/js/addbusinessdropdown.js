/* Get business type Janice*/

function ReportBtype() {
   $.post("newscripts/AddBtype.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
     
	 data = JSON.parse(data);
	 
	
  var b = document.getElementById("btypereport");
     for(var i in data){
		 var bName = data[i].BusinessType;
		 
		 var option = document.createElement("option");
        option.text  =bName;	
		b.add(option);
		 
	 }
     
    
    });
	
	
 };
window.onload=ReportBtype();