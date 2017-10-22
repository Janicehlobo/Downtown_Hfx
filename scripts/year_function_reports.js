//Gurmeet Singh
$(document).ready(function(){

    for (i = new Date().getFullYear(); i >= 2010; i--) 
    { 
        $('#fromyearco').append($('<option />').val(i).html(i));
		$('#toyearco').append($('<option />').val(i).html(i));
		$('#fromyeari').append($('<option />').val(i).html(i));
		$('#toyeari').append($('<option />').val(i).html(i));
		$('#fromyearp').append($('<option />').val(i).html(i));
		$('#toyearp').append($('<option />').val(i).html(i));
		$('#fromyearc').append($('<option />').val(i).html(i));
		$('#toyearc').append($('<option />').val(i).html(i));
		
		$('#fromyearuco').append($('<option />').val(i).html(i));
		$('#toyearuco').append($('<option />').val(i).html(i));
		$('#fromyearui').append($('<option />').val(i).html(i));
		$('#toyearui').append($('<option />').val(i).html(i));
		$('#fromyearup').append($('<option />').val(i).html(i));
		$('#toyearup').append($('<option />').val(i).html(i));
		$('#fromyearuc').append($('<option />').val(i).html(i));
		$('#toyearuc').append($('<option />').val(i).html(i));
		
    }
    });