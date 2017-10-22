//Gurmeet Singh
$(document).ready(function() {
	//console.log("ready");
	$("#emailBtn").on("click", function() {
		console.log("Button clicked");
		var doc = new jsPDF('p','pt','a1');
		doc.fromHTML($("#theusercountry").html(),200,40);
		var pdf = doc.output();
		//console.log(pdf);
		//doc.save('test.pdf');

		// Send it to the server
		var pdfBase64Format = btoa(pdf);
		$.ajax({
			method: "POST",
			url: "scripts/database/email-pdf.php",
			data: {data: pdfBase64Format}
		}).done(function(data) {
			console.log(data);
		});
		window.location.href="#useremail";
		 location.reload();
	});
});
