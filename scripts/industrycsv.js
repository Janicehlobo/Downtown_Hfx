//Gurmeet Singh
$(document).ready(function() {
	  
      var link = $("#industry");
	$("#adminindustrylink").on("click", function() {
      $.post("scripts/database/industryselectcsv.php", null, function(data){
        data = JSON.parse(data);
        
        var csv = "Email , Status , Coop Name , Industry , Year , Asset Size , Revenue Size, Kpi Name, Kpi Value \n";
        //we should have the same amount of name/cookie fields
        for (var i = 0; i < data.length; i++){
        var email = data[i].email;
		var ustatus = data[i].ustatus;
        var coopname = data[i].coopName;
        var industry = data[i].industry;
		var year = data[i].year;
        var assetSize = data[i].assetSize;
        var revenueSize = data[i].revenueSize;
		var kpiname = data[i].title;
        var kpiValue = data[i].kpiValue;
        		
		csv += email + ',' + ustatus + ',' + coopname + ',' + industry + ',' + year + ',' + assetSize + ',' + revenueSize + ',' + kpiname + ',' +  kpiValue + '\n';
        }			
        console.log(csv);
        link.attr("href",'data:application/csv;charset=UTF-8,' + encodeURI(csv));
		link.attr("download" ,"admin-industry.csv");
        link[0].click();
    });
	});
	})