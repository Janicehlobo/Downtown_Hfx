//Gurmeet Singh
$(document).ready(function() {
    var link = $("#usercountry");
	$("#usercountrylink").on("click", function() {
	$.post("scripts/database/useruserselectcsv.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
        data = JSON.parse(data);
        
        var csv = "Industry , Country , Language, Year , Asset Size , Revenue Size , Kpi Name, Kpi Value \n";
        //we should have the same amount of name/cookie fields
        for (var i = 0; i < data.length; i++){
        
        var coopname = data[i].industry;
        var country = data[i].country;
        var language = data[i].language;
		var year = data[i].year;
        var assetSize = data[i].assetSize;
        var revenueSize = data[i].revenueSize;
		var kpiname = data[i].title;
        var kpiValue = data[i].kpiValue;
        		
		csv += coopname + ',' + country + ',' + language + ',' + year + ',' + assetSize + ',' + revenueSize + ',' + kpiname + ',' + kpiValue + '\n';
        
		}			
        console.log(csv);
        link.attr("href",'data:application/csv;charset=UTF-8,' + encodeURI(csv));
		link.attr("download" ,"user-country.csv");
        link[0].click();
    });
	});
	})