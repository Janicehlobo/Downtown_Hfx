//Gurmeet Singh
$(function () {

    var specialElementHandlers = {
        '#editor4': function (element,renderer) {
            return true;
        }
    };
 $('#cmd4').click(function () {
        var doc = new jsPDF('p','pt','a1');
		margins = {
            top: 40,
            bottom: 60,
            left: 200,
            width: 522
        };
        doc.fromHTML($('#thecooperative').html(),margins.left,margins.top, {
            'width': margins.width,'elementHandlers': specialElementHandlers
        });
        doc.save('cooperative-report.pdf');
    });  
});