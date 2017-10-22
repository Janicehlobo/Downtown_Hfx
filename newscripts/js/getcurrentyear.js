/* Get current year Janice*/

function getYear(){
	var year = new Date().getFullYear();
	var txtyear = document.getElementById("dataYear");
	txtyear.value=year;
	txtyear.disabled=true;
	var edittxtyear = document.getElementById("editdataYear");
	edittxtyear.value=year;
	edittxtyear.disabled=true;
	
};