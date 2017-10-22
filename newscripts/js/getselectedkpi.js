/*Shows active KPIs in Membership dataentry page Janice*/

  
function getSelectedChx(){

  var checkboxes = document.getElementsByName("kpichx");
  var checkboxesChecked = [];
  // loop over them all

  for (var i=0; i<checkboxes.length; i++) {
     // And stick the checked ones onto an array...
     if (checkboxes[i].checked) {
       // checkboxesChecked.push(checkboxes[i]);
		checkboxesChecked.push(i+1);
     }
	 
	 
  }
  
  if(checkboxesChecked.length == 0){alert("Please select the KPI's to display");
  window.location.replace("#Attribute");
  }
  else{
  var kpivalues = JSON.stringify(checkboxesChecked);
  
		 $.post('newscripts/showkpi.php', {"kpivalues" : kpivalues}, function(data){
			 
			 alert(data);
  });
  window.location.replace("#Attribute");
  }
  // Return the array if it is non-empty, or null
  
};


	
	




