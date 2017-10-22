//Gurmeet Singh
$(function () {

    var specialElementHandlers = {
        '#editor13': function (element,renderer) {
            return true;
        }
    };
 $('#cmd13').click(function () {
        var doc = new jsPDF('p','pt','a1');
		margins = {
            top: 40,
            bottom: 60,
            left: 200,
            width: 522
        };
        doc.fromHTML($('#theusercountry').html(),margins.left,margins.top, {
            'width': margins.width,'elementHandlers': specialElementHandlers
        });
        doc.save('user-country-report.pdf');
    });  
});