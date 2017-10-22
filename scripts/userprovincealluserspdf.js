//Gurmeet Singh
$(function () {

    var specialElementHandlers = {
        '#editor14': function (element,renderer) {
            return true;
        }
    };
 $('#cmd14').click(function () {
        var doc = new jsPDF('p','pt','a1');
		margins = {
            top: 40,
            bottom: 60,
            left: 200,
            width: 522
        };
        doc.fromHTML($('#theuserprovince14').html(), margins.left,margins.top, {
            'width': margins.width,'elementHandlers': specialElementHandlers
        });
        doc.save('All-users-province-report.pdf');
    });  
});