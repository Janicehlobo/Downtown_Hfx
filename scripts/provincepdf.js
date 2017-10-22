//Gurmeet Singh
$(function () {

    var specialElementHandlers = {
        '#editor1': function (element,renderer) {
            return true;
        }
    };

 $('#cmd1').click(function () {
        var doc = new jsPDF('p','pt','a1');
		margins = {
            top: 40,
            bottom: 60,
            left: 200,
            width: 522
        };
        doc.fromHTML($('#theprovince').html(),margins.left,margins.top, {
            'width': margins.width,'elementHandlers': specialElementHandlers
        });
        doc.save('province-report.pdf');
    });  
});