/* Select month range Janice*/

window.InsertMonth=function () {
var addMonth = $('#monthRange').val();
   
   var monthAdd = {"monthrange" : addMonth};
		 
		 $.post('newscripts/addMonth.php', monthAdd, function(data){
		
		 });
		 location.reload();
 };