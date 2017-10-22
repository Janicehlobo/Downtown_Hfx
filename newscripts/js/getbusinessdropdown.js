/* Get businesstype Janice*/

function GetBtype() {
  
   $.post("newscripts/AddBtype.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
     
	 data = JSON.parse(data);
	 
	 
  var p = document.getElementById("businesstype");
  
     for(var i in data){
		 var bName = data[i].BusinessType;
		 var option = document.createElement("option");
        option.text  =bName;
        p.add(option);
	 }
     
    
    });
	
	
 };
window.onload=GetBtype();