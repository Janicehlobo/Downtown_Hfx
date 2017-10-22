/* Add a new KPI Janice*/

window.addnewKPI=function () {
var newkpiVal = $('#newkpiVal').val();
   if(newkpiVal == ""){
	   
	   alert("Please enter the KPI to be added");
   }
   else{
   var AddKPI = {"newkpiVal" : newkpiVal};
		
		 $.post('newscripts/addNewKPI.php', AddKPI, function(data){
			 
			 alert(data);
		 });
		 
		location.reload(); 
}
 document.getElementById("newkpiVal").value= "";
 };