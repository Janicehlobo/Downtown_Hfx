//Gurmeet Singh
$(function () {

    var specialElementHandlers = {
        '#editor15': function (element,renderer) {
            return true;
        }
    };
 $('#cmd15').click(function () {
        var doc = new jsPDF('p','pt','a1');
		margins = {
            top: 40,
            bottom: 60,
            left: 200,
            width: 522
        };
        doc.fromHTML($('#theuserindustry15').html(), margins.left,margins.top, {
            'width': margins.width,'elementHandlers': specialElementHandlers
        });
        doc.save('All-users-industry-report.pdf');
    });  
});