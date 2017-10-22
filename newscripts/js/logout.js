/* Logout function Janice*/ 
 
 window.logout =function(){
    var r = confirm("Do you want to logout?");
    if (r){
      $.post("newscripts/logout.php", null, function(data){
      window.location.href = '#login';
      location.reload();
    }); 
    
  } 
  }