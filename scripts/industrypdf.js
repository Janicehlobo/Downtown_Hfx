//Gurmeet Singh
$(function () {

    var specialElementHandlers = {
        '#editor3': function (element,renderer) {
            return true;
        }
    };
 $('#cmd3').click(function () {
        var doc = new jsPDF('p','pt','a1');
		margins = {
            top: 40,
            bottom: 60,
            left: 200,
            width: 522
        };
        doc.fromHTML($('#theindustry').html(),margins.left,margins.top, {
            'width': margins.width,'elementHandlers': specialElementHandlers
        });
        doc.save('industry-report.pdf');
    });  
});