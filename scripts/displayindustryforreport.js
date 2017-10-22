//Gurmeet Singh
window.displayindustryforreport =function (id) {
	
$.post("scripts/database/displayIndustryforreport.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
      data = JSON.parse(data);
  
document.getElementById(id).innerHTML = "";

 var select = document.getElementById(id);
  
            
            var option;
            option = document.createElement('option');
            option.text = "Please select"
            select.add(option);
            for (var i = 0; i < data.length; i++) {
              option = document.createElement('option');
              option.text = data[i].industry;
              select.add(option);
            }

      // Trigger a refresh in jQuery Mobile so that it will display your changes
      $('[data-role="content"]').trigger('create');
    
  });
  return false;

 }
 $(document).ready(function(){
	 displayindustryforreport('txtindustryuserreport');
 });