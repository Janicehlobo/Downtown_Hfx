//Gurmeet Singh
$(function () {

    var specialElementHandlers = {
        '#editor11': function (element,renderer) {
            return true;
        }
    };
 $('#cmd11').click(function () {
        var doc = new jsPDF('p','pt','a1');
		margins = {
            top: 40,
            bottom: 60,
            left: 200,
            width: 522
        };
        doc.fromHTML($('#theuserindustry').html(),margins.left,margins.top, {
            'width': margins.width,'elementHandlers': specialElementHandlers
        });
        doc.save('user-industry-report.pdf');
    });  
});