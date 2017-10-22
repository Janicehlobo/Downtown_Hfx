/* Delete User Janice*/

window.deleteUser =function(iduser){
	
    var r = confirm("Do you want to delete user?");
    if (r){
      $.post("newscripts/deleteUser.php", {"iduser" : iduser}, function(data){
		  alert(data);
     
      location.reload();
    }); 
    
  } 
  }
  