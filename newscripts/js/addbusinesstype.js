/* Add a new business type Janice*/

window.InsertBtype=function () {
   var btype =  $("#AddBtype").val();
    
   if ( btype == ""){   
   alert("please enter business type to add");
 }
 else {
        
         var registerUser = {"btype" : btype};
		
		 $.post('newscripts/btype.php', registerUser, function(data){
		
		 });
         
      
   } 
   document.getElementById("AddBtype").value= "";
   location.reload();
 };