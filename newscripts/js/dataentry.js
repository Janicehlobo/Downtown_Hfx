/* Membership Data entry Janice*/
  
 
 
 window.addBusinessDetails=function () {
   var company =  $("#userCompany").val();
   var year =  $("#dataYear").val();
   var colNames = [];
   var colValues = [];
   
   var monthRange = document.getElementById("getMonthRange");
var month = monthRange.options[monthRange.selectedIndex].value;

    var oTable = document.getElementById('myTable');

    //gets rows of table
    var rowLength = oTable.rows.length;

    //loops through rows    
    for (i = 0; i < rowLength; i++){

      //gets cells of current row  
       var oCells = oTable.rows.item(i).cells;

       //gets amount of cells of current row
       var cellLength = oCells.length;

       //loops through each cell in current row
       

              // get your cell info here

              var cellVal0 = oCells.item(0).innerHTML;
			  
              colNames.push(cellVal0);
			  var cellVal1 = oCells.item(1).innerHTML;
			  var txtvalue=document.getElementById(cellVal0).value;
			 // alert(txtvalue);
           colValues.push(txtvalue);
    }
   
  
   var colNames = JSON.stringify(colNames);
   var colValues = JSON.stringify(colValues);
  
   if ( company == "" || year == "" || month== "Please select"){   
   alert("Please complete all the required fields");
  
 }
 
 else {
        
         var dataEntry = {"company" : company, "year" : year, "month" : month, "colNames": colNames, "colValues":colValues };
		
		 $.post('newscripts/memberData.php', dataEntry, function(data){
			 
			 alert(data);
		 });
         
      
   } 
  
   window.location.replace("#AdminDataEntryMenu");
 };
 