//Gurmeet Singh
$(document).ready(function() {
    var link = $("#userindustry");
	$("#userindustrylink").on("click", function() {
	$.post("scripts/database/industryuserselectcsv.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
        data = JSON.parse(data);
        
        var csv = "Industry , Language, Year , Asset Size , Revenue Size , Kpi Name, Kpi Value \n";
        //we should have the same amount of name/cookie fields
        for (var i = 0; i < data.length; i++){
        
        var industry = data[i].industry;
        var language = data[i].language;
		var year = data[i].year;
        var assetSize = data[i].assetSize;
        var revenueSize = data[i].revenueSize;
		var kpiname = data[i].title;
        var kpiValue = data[i].kpiValue;
        		
		csv += industry + ',' + language + ',' + year + ',' + assetSize + ',' + revenueSize + ',' + kpiname + ',' + kpiValue + '\n';
        }			
        console.log(csv);
        link.attr("href",'data:application/csv;charset=UTF-8,' + encodeURI(csv));
		link.attr("download" ,"user-industry.csv");
        link[0].click();
    });
	});
	})