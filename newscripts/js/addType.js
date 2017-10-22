/*
*Shows active KPIs in CPI dataentry page
*/
window.addnewKPI=function () {
var newkpiVal = $('#newkpiVal').val();
   
   var AddKPI = {"newkpiVal" : newkpiVal};
		 //alert(addMonth);
		 $.post('newscripts/addNewKPI.php', AddKPI, function(data){
			 
			 alert(data);
		 });
		 location.reload();
 };
 
 
 
function showKPIView() {

 
  $.post("newscripts/addKPI.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
      data = JSON.parse(data);
      var p = document.getElementById("kpilistview");


      var out = "<table>" +"<tr><th>"+"KPI"+"</th><th>"+ "Check KPI" + "</th></tr>";

      for (var i = 0; i < data.length; i++){
        out += "<tr><td>"+
        data[i].KPIName +
        "</td><td> <input type='checkbox' name ='kpichx' id='"+ data[i].KPIName +
        "'> </td></tr>" ;
		
      }
	  out += "</table>";
      p.innerHTML = out;       
      // Trigger a refresh in jQuery Mobile so that it will display your changes
      //$('[data-role="content"]').trigger('create');
	  window.location.href = "#kpilistV";
	  
	  //window.location.href = "#BusinessReport";
	  
	  //document.getElementById("formco").reset();
	  });
	  return false;
	  };
	  
	  
function showKPIData() {

 
  $.post("newscripts/getKPI.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
      data = JSON.parse(data);
      var p = document.getElementById("kpilist");


      var out = "<table id='myTable'>";

      for (var i = 0; i < data.length; i++){
        out += "<tr><td>"+
        data[i].KPIName +
        "</td><td> <input type='text' name ='kpitxt' id='"+ data[i].KPIName +
        "'> </td></tr>" ;
		
      }
	  out += "</table>";
      p.innerHTML = out;       
      // Trigger a refresh in jQuery Mobile so that it will display your changes
      //$('[data-role="content"]').trigger('create');
	  window.location.href = "#DataEntryPage";
	  //window.location.href = "#BusinessReport";
	  
	  //document.getElementById("formco").reset();
	  });
	  return false;
	  };

function getAlldetails(company) {
//var company = sessionStorage.getItem('company');
var company=company;
 var company = document.getElementById('edituserCompany').value;
var company = {"company" : company};
  $.post("newscripts/editDetails.php", company, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
      data = JSON.parse(data);
	  var id = data[0].companyname;
      //var p = document.getElementById("editkpilist");
var oTable = document.getElementById('myTable');

    //gets rows of table
   // var rowLength = oTable.rows.length;

    //loops through rows    
    
	
	var obj = data[0];
	for (var key in obj){
		var attrName = key;
        var attrValue = obj[key];
		if(attrName == 'iddata' || attrName=='companyname' || attrName=='BusinessType' || attrName=='year' || attrName=='monthrange' || attrName =='lastmodified'){
			
		}
		else{
         
		if(attrValue==""){
			//document.getElementById(attrName).disabled = true;	
			
		} 
		else{
			//document.getElementById(attrName).enabled = true;	
		document.getElementById(attrName).value=attrValue;
		}
		
		}
    }
});}


	  
function editAllKPI() {

 
  $.post("newscripts/addKPI.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
      data = JSON.parse(data);
      var p = document.getElementById("editkpilist");


      var out = "<table id='myTable'>";

      for (var i = 0; i < data.length; i++){
        out += "<tr><td>"+
        data[i].KPIName +
        "</td><td> <input type='text' name ='kpitxt' id='"+ data[i].KPIName +"'> </td></tr>" ;
		
		
		
	
		
      }
	  out += "</table>";
      p.innerHTML = out;       
      // Trigger a refresh in jQuery Mobile so that it will display your changes
      //$('[data-role="content"]').trigger('create');
	  window.location.href = "#DataEditPage";
	  //window.location.href = "#BusinessReport";
	  
	  //document.getElementById("formco").reset();
	  });
	  return false;
	  };
	  
function showAllKPI() {

 
  $.post("newscripts/getKPI.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
      data = JSON.parse(data);
      var p = document.getElementById("kpilist");


      var out = "<table id='myTable'>";

      for (var i = 0; i < data.length; i++){
        out += "<tr><td>"+
        data[i].KPIName +
        "</td><td> <input type='text' name ='kpitxt' id='"+ data[i].KPIName +
        "'> </td></tr>" ;
		
      }
	  out += "</table>";
      p.innerHTML = out;       
      // Trigger a refresh in jQuery Mobile so that it will display your changes
      //$('[data-role="content"]').trigger('create');
	  window.location.href = "#DataEntryPage";
	  //window.location.href = "#BusinessReport";
	  
	  //document.getElementById("formco").reset();
	  });
	  return false;
	  };	  
  
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
  //alert(kpivalues);
     //var kpiid = {"kpivalues" : kpivalues};
	 //alert(showkpi);
		 //alert(addMonth);
		 $.post('newscripts/showkpi.php', {"kpivalues" : kpivalues}, function(data){
			 
			 alert(data);
  });
  window.location.replace("#Attribute");
  }
  // Return the array if it is non-empty, or null
  
};


	
	




