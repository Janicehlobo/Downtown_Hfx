/*Fatma
*/

function handleNewPassword(event) {
  var newPasswordRegExp = new RegExp('#newpassword\\?key=.*');
  var newPasswordBaseRegExp = new RegExp('#newpassword$'); 
 if (newPasswordRegExp.test(event.newURL) && newPasswordBaseRegExp.test(event.oldURL)) {
   // Stop performing the handler, otherwise user will never be able to navigate away
   window.onhashchange=null;
 }
   if (newPasswordRegExp.test(event.oldURL)) {
   // Redirect to the newpassword page with the parameter
   window.location.href = event.oldURL;
 }
}

window.onhashchange=handleNewPassword;









