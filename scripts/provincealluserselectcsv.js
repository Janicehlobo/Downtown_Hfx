//Gurmeet Singh
$(document).ready(function() {
    var link = $("#userprovince14");
    $("#userprovincelink14").on("click", function() {
	$.post("scripts/database/showprovinceuserscsv.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
        data = JSON.parse(data);
        
        var csv = "Industry , Province , Language, Year , Asset Size , Revenue Size, Kpi Name, Kpi Value \n";
        //we should have the same amount of name/cookie fields
        for (var i = 0; i < data.length; i++){

        var coopname = data[i].industry;
        var province = data[i].province;
        var language = data[i].language;
		var year = data[i].year;
        var assetSize = data[i].assetSize;
        var revenueSize = data[i].revenueSize;
		var kpiname = data[i].title;
        var kpiValue = data[i].kpiValue;
        		
		csv += coopname + ',' + province + ',' + language + ',' + year + ',' + assetSize + ',' + revenueSize + ',' + kpiname + ','  + kpiValue + '\n';
        }			
        console.log(csv);
        link.attr("href",'data:application/csv;charset=UTF-8,' + encodeURI(csv));
		link.attr("download" ,"All-user-province.csv");
        link[0].click();
    });
	});
	})