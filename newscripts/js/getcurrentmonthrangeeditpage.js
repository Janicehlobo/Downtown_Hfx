/* Get current month range for edit page Janice*/

function editGetMonth() {
   
   $.post("newscripts/getMonth.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
     
	 data = JSON.parse(data);
	
  var editdropdownmonth = document.getElementById("editgetMonthRange");
     for(var i in data){
		 var month = data[i].monthrange;
		
		 var option = document.createElement("option");
        option.text  =month;
        
		editdropdownmonth.add(option);
	 }
     
    
    });
 };

window.onload=editGetMonth();