
$("#btnEnter").keypress(function(event){
    if(event.keyCode == 13){
        $("#btnEnter").click();
    }
});


/* Cancel button Janice*/

window.cancelBackDataEntry= function (){
var id = sessionStorage.getItem("emailID");
  
   if (id == "admin"){
  
    window.location.href = '#AdminDataEntryMenu';
    location.reload();

   }else {

   
    window.location.href = '#DataEntryMenu';
    location.reload();
  }

   };
  
 
 
 












 



 






 
 
 
 
 
	   

 

 