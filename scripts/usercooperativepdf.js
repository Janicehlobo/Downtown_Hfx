//Gurmeet Singh
$(function () {

    var specialElementHandlers = {
        '#editor10': function (element,renderer) {
            return true;
        }
    };
 $('#cmd10').click(function () {
        var doc = new jsPDF('p','pt','a1');
		margins = {
            top: 40,
            bottom: 60,
            left: 200,
            width: 522
        };
        doc.fromHTML($('#theusercooperative').html(),margins.left,margins.top, {
            'width': margins.width,'elementHandlers': specialElementHandlers
        });
        doc.save('user-cooperative-report.pdf');
    });  
});