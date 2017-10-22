/* Get current month range Janice*/

function GetMonth() {
   
   $.post("newscripts/getMonth.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
     
	 data = JSON.parse(data);
	 
	var dropdownmonth = document.getElementById("getMonthRange");
  
  for(var i in data){
		 var month = data[i].monthrange;
		 var option = document.createElement("option");
        option.text  =month;
        dropdownmonth.add(option);
		
	 }
     
    
    });
 };

window.onload=GetMonth();