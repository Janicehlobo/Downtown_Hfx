// check inputs-Mahnoush
window.CheckInput= function () {

  $("#btnEnterL").click( function() {

            //fetch the key/values pairs from the php script
            jQuery.getJSON( "scripts/database/businesstype.php", function( data ) {

                 var dropdown = $('#businesstype');

                //empty out the existing options
                dropdown.empty();

                //append the values to the drop down
                jQuery.each( data, function(i) {
                    dropdown.append( $('<option value="'+ i +'">' +'</option>') );
                });
            });

        }); 
}




