//Gurmeet Singh
$(function () {

    var specialElementHandlers = {
        '#editor20': function (element,renderer) {
            return true;
        }
    };
 $('#cmd20').click(function () {
        var doc = new jsPDF('p','pt','a1');
		margins = {
            top: 40,
            bottom: 60,
            left: 200,
            width: 522
        };
        doc.fromHTML($('#theallusercooperative').html(), margins.left,margins.top, {
            'width': margins.width,'elementHandlers': specialElementHandlers
        });
        doc.save('All-users-cooperative-report.pdf');
    });  
});