//Gurmeet Singh
$(document).ready(function() {
 
      var link = $("#cooperative");
     $("#admincooplink").on("click", function() {
     $.post("scripts/database/cooperativeselectcsv.php", null, function(data){
        data = JSON.parse(data);
      
        var csv = "Email , Status , Coop Name , Type , Year , Asset Size , Revenue Size , kpi Name, Kpi Value \n";
        //we should have the same amount of name/cookie fields
        for (var i = 0; i < data.length; i++){
        var email = data[i].email;
		var ustatus = data[i].ustatus;
        var coopName = data[i].coopName;
        var type = data[i].type;
		var year = data[i].year;
        var assetSize = data[i].assetSize;
        var revenueSize = data[i].revenueSize;
		var kpiname = data[i].title;
        var kpiValue = data[i].kpiValue;
        		
		csv += email + ',' + ustatus + ',' + coopName + ',' + type + ',' + year + ',' + assetSize + ',' + revenueSize + ',' + kpiname + ',' + kpiValue + '\n';
        }			
        console.log(csv);
        link.attr("href",'data:application/csv;charset=UTF-8,' + encodeURI(csv));
		link.attr("download" ,"admin-cooperative.csv");
        link[0].click();
    });
	});
	})