
/*first page functions*/

/**
* Checks that the password matches default app password 
* Expects #passcode input field to be app default password
* Alerts user when passwords does not match
* No output or return value on success, goes to the login page
*mahnoush
*/

$(document).ready(function(){
    $("#btnEnter").click(function() {
      
      var p= $("#passcode").val();
      if (p!=""){
      var pass = { password: p };
      $.post("scripts/database/accessCode.php", pass, function(data){
      while(true){
      if (!data.length ) {
        alert("Wrong password.");
        return false;
      } else{
        window.location.href = '#login';
        return true;
      }
    }
    });  
    }else{
      alert("Please enter password");
    }
  
  });
});


/*Mahnoush-Matt
*check password for download db, if it matches db will be downloaded
*/
$(document).ready(function(){
    $("#btndownload").click(function() {
     var params = { password: $("#downpass").val() };
     $("#downpass").val();
     $.post("scripts/database/backup_data.php", params, function(data){
      if (!data.length) {
        alert("Wrong password.");
        return false;
      }
      var link = $("#downloadLink");
      link.attr("href", "data:application/sql;charset=UTF-8," + encodeURI(data));
      link.attr("download", "cearc-cpi-db-backup-" + new Date().getTime() + ".sql");
      link[0].click();
    });  
    window.location.href = '#adminHome';
    return true; 
  });
});




/*change password page functions*/// & /*new user page functions*/

/**
* Validate two forms: #frmNewPassword(page id: #newpassword)& #nUser(page id: #newuser)
* Checks that the password and confirm password fields match in both pages
* Expects #newPassword and #cfmPassword input fields in #frmNewPassword to have the same value
* Expects #txtpassword and #txtcfmPassword input fields in #nUser to have the same value
* Alerts user when passwords do not match
* No output or return value on success
* If fails, clears #cfmPassword input fields in #frmNewPassword 
* If fails, clears #txtcfmPassword input fields in #nUser
*mahnoush
*/


window.checkPasswordMatch=function (passwordFieldId, confirmPasswordFieldId) {
    var password = $("#" + passwordFieldId).val();
    var confirmPassword = $("#" + confirmPasswordFieldId).val();
    if (password!="" && confirmPassword!="" && password != confirmPassword){
        alert("Passwords do not match");
        $("#"+confirmPasswordFieldId).val("");       
      }
};

/**
* Validate two forms: #frmNewPassword(page id: #newpassword)& #nUser(page id: #newuser)
* Checks that the password length is not less than 5 character and more than 10 character
* Expects #newPassword input fields length in #frmNewPassword is more than 5 character and less than 10 character
* Expects #txtpassword input fields length in #nUser is more than 5 character and less than 10 character
* Alerts user when passwords do not match
* No output or return value on success
* If fails, clears #newPassword input fields in #frmNewPassword 
* If fails, clears #txtpassword input fields in #nUser
*mahnoush
*/

window.checkPasswordLength=function (passwordFieldId) {
    var password = $("#" + passwordFieldId).val();
    if(password.length < 5 || password.length > 10){
      
      $("#"+passwordFieldId).val("");
      alert("Number of password character should be more than 5 and less than 10");    
      
      }
};


// check Inputs-Fatma

window.checkUserForm=function () {
   var fname =  $("#txtRegisterfname").val();
   var lname =  $("#txtRegisterlname").val();
   var phone = $("#txtRegisterphone").val();
   var email =  $("#txtRegisterEmail").val();   
   var passworduser=  $("#txtRegisterPassword").val();
   var confirmPassuser = $("#txtConfirmPassword").val(); 
   var companyname = $("#txtCompanyname").val(); 
   if ( fname == "" || lname == "" || email == "" || passworduser == "" || confirmPassuser == "" || phone == ""){   
   alert("please complete your basic information or check your input is correct");
 }
 else {
        
         var registerUser = {"fname" : fname, "lname" : lname, "email" : email, "phone" : phone, "password" : passworduser };
        $.post("scripts/database/insertNewUser.php", registerUser, function(data){
        alert(data);
    }).always(function() { 
     window.location.href = "#login";
      location.reload();
      document.getElementById("nUser").reset(); });  
   } 
 };


  // check email format-Fatma-Mahnoush
 
  window.ValidateEmail=function(id){
  var validemail = $("#"+id).val();
   var FormatEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (validemail != "")
           {
            if(!FormatEmail.test(validemail))
            {
              alert("The format of email address is incorrect");
               document.getElementById(id).value = "";
             }else{
                var newUserEmail = {"email" : validemail };
                $.post("scripts/database/checkNewUserEmail.php", newUserEmail, function(data){
                var data = JSON.parse(data);
                var Id = data.userId;
                if (Id != 0){
                   alert("This email has been already registered in application");
                   document.getElementById(id).value = "";
                   }
                }) 
               }
            }
}

//Check postal code format & length && // check postal code for new coop 
/**
* Validate two forms: #nCoop(page id: #newCoop)& #frmAddcoop(page id: #AddCoop)
* Checks that the postal code input format and length match Canada postal code format and length 
* Expects #txtpostalcode input fields format & length in #nCoop match Canada postal code format and length 
* Expects #txtpostalcodecoop input fields format & length in #frmAddcoop match Canada postal code format and length 
* returns true if the format & length match
*mahnoush
*/

window.checkPostal=function(postalcodeID){
var pat1=/[a-zA-Z][0-9][a-zA-Z](-| |)[0-9][a-zA-Z][0-9]/;
var pat2=/[a-zA-Z][0-9][a-zA-Z][0-9][a-zA-Z][0-9]/;
var post = $(postalcodeID).val();

if (!pat1.test(post) || (post.length) != 7){
  if (!pat2.test(post) || (post.length) != 6){
   return false;
 }else{
  return true;
 }
} 
else{
return true;
} 
}

//Insert provinces & country for new coop 
/**
* Validate two forms: #nCoop(page id: #newCoop)& #frmAddcoop(page id: #AddCoop)
* Checks that the postal code input format and length match Canada postal code format and length
* Checks that the postal code input first letter belongs to one of the Canada's provinces
* Expects #txtpostalcode input fields format & length in #nCoop match Canada postal code format and length 
* Expects #txtpostalcodecoop input fields format & length in #frmAddcoop match Canada postal code format and length 
* Alerts user when postal code format or length does not match Canda postal code format & length or the postal code does not belongs to any peovinces
* If fails, clears postal code field
* It has two outputs country and province related to the postal code
* Fills #txtprovince & #txtcountry in #nCoop related to input value in #txtpostalcode
* Fills #txtprovinceuser & #txtcountryuser in #frmAddcoop related to input value in #txtpostalcodecoop
*mahnoush
*/

window.checkPostalCode=function(postalcodeID, provinceID, countryID){
  if(checkPostal(postalcodeID)){  
    var fLetter = $(postalcodeID).val().charAt(0);
    var fLetterUp = fLetter.toUpperCase();
    $(countryID).val("Canada"); 
    var text1;
    
    switch(fLetterUp){
      case "A":
        text1='Newfoundland and Labrador';        
        break;

      case "B":
        text1='Nova Scotia';        
        break;
        
      case "C":
        text1='Prince Edward Island';       
        break;  

      case "E":
        text1='New Brunswick';        
        break;

      case "G":
      case "H":
      case "J":
        text1='Qu�bec';
        
        break;
      case "K":
      case "L":
      case "M":
      case "N":
      case "P":
        text1='Ontario';        
        break;  

      case "R":
        text1='Manitoba';        
        break; 

      case "S":
        text1='Saskatchewan';       
        break; 

      case "T":
        text1='Alberta';       
        break;

      case "V":
        text1='British Columbia';        
        break;

      case "X":
        text1='Northwest Territories and Nunavut';        
        break; 

      case "Y":
        text1='Yukon Territory';        
        break;

      default:
      $(postalcodeID).val('');
      $(countryID).val('');
      text1='';
      alert('This code is not for any provinces'); 

    }
    $(provinceID).val(text1);    
   }
     else {
       $(postalcodeID).val('');
       $(provinceID).val('');
       $(countryID).val('');
       alert('Postal code format does not match');   
};
};




//create new user button
$(document).ready(function(){   
$("#createNewUser").click(function () {         
    document.location.href = "#login";
     
});
});




   // show dailog to add new industry
    window.InsertIndustry =function () {
    
    var IndustryVal =  $("#IndustryVal").val();
     if (IndustryVal == ""){
   
     alert("please enter industry");
      
 }
 else {
    window.location.href = "#Attribute";
    location.reload();
   $.post("scripts/database/InsertIndustry.php", {'IndustryValue' : IndustryVal },function (data){
   alert(data);
   
   });
 
    }
    }


      // display industry in drop diwn list-Fatma
 window.displayindustry =function (id) {
$.post("scripts/database/displayIndustry.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
      data = JSON.parse(data);
document.getElementById(id).innerHTML = "";
 var select = document.getElementById(id); 
            var option;
            option = document.createElement('option');
            option.text = "Please select"
            select.add(option);
            for (var i = 0; i < data.length; i++) {
              option = document.createElement('option');
              option.text = data[i].dropdownValue;
              select.add(option);
            }

      // Trigger a refresh in jQuery Mobile so that it will display your changes
      $('[data-role="content"]').trigger('create');
    
  });
  return false;
 }
/*Mahnoush
*3 below functions added to pass dropdown list values for windows users
*/
   $(document).ready(function(){
    displayindustry('txtindustryuser');
   });

   $(document).ready(function(){
    displayindustry('txtEditindustrypro');
   });

   $(document).ready(function(){
    displayindustry('txtEditindustry');
   });
 

      // Fatma- show dailog to add new industry
    window.InsertType =function () {
    
    var TypeVal =  $("#TypeVal").val();
    if (TypeVal == ""){
   
     alert("please enter type");
      
     }
    else {
    window.location.href = "#Attribute";
    location.reload();
    $.post("scripts/database/InsertType.php", {'TypeValue' : TypeVal },function (data){
    alert(data);
   
   });
 
 
    }
    }


// display industry in drop diwn list-Fatma
 window.displaytype =function (id) {
$.post("scripts/database/displayType.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
      data = JSON.parse(data);
 document.getElementById(id).innerHTML = "";
 var select = document.getElementById(id);
           var option;
            option = document.createElement('option');
            option.text = "Please select"
            select.add(option);
            
            for (var i = 0; i < data.length; i++) {
              option = document.createElement('option');
              option.text = data[i].dropdownValue;
              select.add(option);
            }
      // Trigger a refresh in jQuery Mobile so that it will display your changes
      $('[data-role="content"]').trigger('create');
  });
  return false;
 }

 /*Mahnoush
*3 below functions added to pass dropdown list values for windows users
*/
  $(document).ready(function(){
   displaytype('txttypeuser');
 });

   $(document).ready(function(){
   displaytype('txtEdittypepro');
 });

 $(document).ready(function(){
   displaytype('txtEdittype');
 });

/*Admin - KPIs- Fatma*/

window.checkKPI=function () {
   var KPI =  $("#txtKPI").val(); 
   var Category =  $("#txtCategory").val();   
   var Unit  = $("#txtUnit").val();   
   var Definition  = $("#txtDef").val();
   
   if (KPI == ""  || Category == "Please select" ||  Unit == "" || Definition == ""){  

     alert("please complete your basic information");
   }
   else {      
      window.location.href = "#KPIs";
      location.reload();
      document.getElementById("frmAddKPI").reset();

      var addKpi = {"kpi" : KPI, "category" : Category, "unit" : Unit, "definition" : Definition };     
       $.post("scripts/database/insertNewKpi.php", addKpi, function(data){
       
        alert(data);
    })     
   }  
}


  // Fatma-show pop up to add category
    window.ShowPopUpCat=function  () {    
      var person = prompt("Please enter new category", "category name")
      
    } 
 


// display category in drop diwn list-Fatma
window.displaycategory =function (id) {
$.post("scripts/database/displayCategory.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
      data = JSON.parse(data);
 document.getElementById(id).innerHTML = "";
 var select = document.getElementById(id);
           var option;
            option = document.createElement('option');
            option.text = "Please select"
            select.add(option);
            
            for (var i = 0; i < data.length; i++) {
              option = document.createElement('option');
              option.text = data[i].dropdownValue;
              select.add(option);
            }
      // Trigger a refresh in jQuery Mobile so that it will display your changes
      $('[data-role="content"]').trigger('create');
  });
  return false;
 }

 /*Mahnoush
*2 below functions added to pass dropdown list values for windows users
*/
  $(document).ready(function(){
   displaycategory('txtCategory');
 });

   $(document).ready(function(){
   displaycategory('txtEditCategory');
 });


 
   //Fatma- show dailog to add new category
    window.InsertCategory =function () {
    var CategoryVal =  $("#txtCategoryVal").val();
    if (CategoryVal == ""){
    alert("please enter category");
      
 }
 else {
   window.location.href = "#Attribute";
      location.reload();
      document.getElementById("categoryform").reset();
   $.post("scripts/database/InsertCategory.php", {'categoryValue' : CategoryVal },function (data){
   alert(data);
   
   });
 
    }
    }
    

    // show dailog to add new category-Fatma
    window.InsertAsset =function () {
    var AssetVal =  $("#txtAssetVal").val();
    if (AssetVal == ""){
     alert("please enter Asset Size");
 }
 else {
    window.location.href = "#Attribute";
    location.reload();
   $.post("scripts/database/InsertAssetSize.php", {'assetValue' : AssetVal },function (data){
   alert(data);
  
   });
 
    }
    }


// show dailog to add new category-Fatma
    window.InsertRevenue =function () {
    
    var RevenueVal =  $("#txtRevenueVal").val();
    if (RevenueVal == ""){
    alert("please enter Revenue Size");  
 }
 else {
    window.location.href = "#Attribute";
    location.reload();
   $.post("scripts/database/InsertRevenue.php", {'revenueValue' : RevenueVal },function (data){
   alert(data);
   });
    }
    }

//Fatma
    window.InsertComment =function () {
    var AdminComment=  $("#admCommentForUser").val();
     if (AdminComment == ""){
     alert("please enter your comment");
 }
 else {
   $.post("scripts/database/InsertComment.php", {'admCommentForUsers' : AdminComment },function (data){
   alert(data);
   location.reload();
   });
    }
    }


/* display CoopNames in drop diwn list-Fatma
*It display coops in dataEntryPage and based on user role shows the coop related to the
*logged in user or shows the whole list to admin role
*/
 window.displayCoop =function (id) {
$.post("scripts/database/displayCoop.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
    if(data != ""){
 data = JSON.parse(data); 

 document.getElementById(id).innerHTML = "";
 var select = document.getElementById(id);  
            var option;
            option = document.createElement('option');
            option.text = "Please select"
            select.add(option);
                      
            for (var i = 0; i < data.length; i++) {
              option = document.createElement('option');              
              option.text = data[i].coopName;
              select.add(option);
            }
      // Trigger a refresh in jQuery Mobile so that it will display your changes
      $('[data-role="content"]').trigger('create'); 
      }     
  });
  return false;
 }

  /*Mahnoush
*3 below functions added to pass dropdown list values for windows users
*/
  $(document).ready(function(){
   displayCoopProfile('txtCoopsName');
 });

  $(document).ready(function(){
   displayCoop('datacoopname');
 });

  $(document).ready(function(){
   displayCoop('usercoopname');
 });


 /*MAHNOUSH
* used in coop drop down list in edit data page to show the coops which have data in database
 */

 window.displayCoopEditData =function (id) {
$.post("scripts/database/displayCoopEditData.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
  if(data != ""){
    data = JSON.parse(data); 

    document.getElementById(id).innerHTML = "";
    var select = document.getElementById(id);  
            var option;
            option = document.createElement('option');
            option.text = "Please select"
            select.add(option);
                      
            for (var i = 0; i < data.length; i++) {
              option = document.createElement('option');              
              option.text = data[i].coopName;
              select.add(option);
            }
      // Trigger a refresh in jQuery Mobile so that it will display your changes
      $('[data-role="content"]').trigger('create');
      }      
  });
  return false;
 }

  /*Mahnoush
 below function added to pass dropdown list values for windows users
*/
  $(document).ready(function(){
   displayCoopEditData('datacoopnameEdit');
 });


 /*Mahnoush- display CoopNames in drop diwn list-Mahnoush
 * Just used in Profile page to show all the active coops to user 
 */
 window.displayCoopProfile =function (id) {
$.post("scripts/database/displayCoopProfile.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
 data = JSON.parse(data); 

 document.getElementById(id).innerHTML = "";
 var select = document.getElementById(id);  
            var option;
            option = document.createElement('option');
            option.text = "Please select"
            select.add(option);
                      
            for (var i = 0; i < data.length; i++) {
              option = document.createElement('option');              
              option.text = data[i].coopName;
              select.add(option);
            }
      // Trigger a refresh in jQuery Mobile so that it will display your changes
      $('[data-role="content"]').trigger('create');      
  });
  return false;
 }

//Fatam- display Asset size in drop diwn list fatma

 window.displayAsset =function (id) {
$.post("scripts/database/displayAsset.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
 data = JSON.parse(data); 

 document.getElementById(id).innerHTML = "";
 var select = document.getElementById(id);  
            var option;
            option = document.createElement('option');
            option.text = "Please select"
            select.add(option);

            for (var i = 0; i < data.length; i++) {
              option = document.createElement('option');              
              option.text = data[i].dropdownValue;
              select.add(option);
            }
      // Trigger a refresh in jQuery Mobile so that it will display your changes
      $('[data-role="content"]').trigger('create');      
  });
  return false;
 }

  /*Mahnoush
*2 below functions added to pass dropdown list values for windows users
*/
  $(document).ready(function(){
   displayAsset('assetsizeEdit');
 });

  $(document).ready(function(){
   displayAsset('assetsize');
 });



/*Fatma
* display Revenue size in drop diwn list fatma
*/

window.displayRevenue =function (id) {
$.post("scripts/database/displayRevenue.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
 data = JSON.parse(data); 

 document.getElementById(id).innerHTML = "";
 var select = document.getElementById(id);  
            var option;
            option = document.createElement('option');
            option.text = "Please select"
            select.add(option);

            for (var i = 0; i < data.length; i++) {
              option = document.createElement('option');              
              option.text = data[i].dropdownValue;
              select.add(option);
            }
      // Trigger a refresh in jQuery Mobile so that it will display your changes
      $('[data-role="content"]').trigger('create');      
  });
  return false;
 }

  /*Mahnoush
*2 below functions added to pass dropdown list values for windows users
*/
  $(document).ready(function(){
   displayRevenue('revenuesize');
 });

   $(document).ready(function(){
   displayRevenue('revenuesizeEdit');
 });


/*mahnoush
*year and fiscal year dropdown list
*this works for page id="DataEntryPage" to show a list of years to select
and also add the new year to the list each year
*/

  $(document).ready(function(){

    for (i = new Date().getFullYear(); i >= 2010; i--) 
    { 
        $('#year').append($('<option />').val(i).html(i)); 
        $('#fiscalyear').append($('<option />').val(i).html(i)); 
   
        //$('#yearEdit').append($('<option />').val(i).html(i)); 
        $('#fiscalyearEdit').append($('<option />').val(i).html(i)); 
    }
    });

  

/*mahnoush*/
  window.logout =function(){
    var r = confirm("Do you want to log out?");
    if (r){
      $.post("scripts/database/logout.php", null, function(data){
      window.location.href = '#login';
      location.reload();
    }); 
    
  } 
  }


 /*mahnoush
*Used for cancel button in 'addNewCoop' & 'DataEntry' form
*to reset the form and goes back to the page that came from
*/
  function cancelBack(id){
  
  document.getElementById(id).reset();
  window.history.back();
}



/*mahnoush & Fatma
*For forget password; checks if the email exists in the database
*/
window.checkEmail= function () {
  var emailUser= $("#updateEmail").val();

  if (emailUser == "" ) {
   alert("please enter your email address");
  }
  else { 
   $("#updateEmail").val();
   $.post("scripts/database/checkEmail.php", { 'emailUser' : emailUser },function (data){    
   var data = JSON.parse(data);
   var Id = data.userId;
   var email = data.userEmail;
   
   if (Id == 0){
   alert("This email does not exist in database");
   }else{

   var timestamp = new Date().getTime();
   var key = timestamp + "-" + Id;
   var encodekey = b64EncodeUnicode(key); 
   //var url = 'http://159.203.1.85/~mahnoush/cpi/app/#newpassword';
   var urlemail = "?key=" + encodekey;
   //var getP =  getParameterByName('key'); 
  // var decodekey= b64DecodeUnicode('encodekey '); 

   $.post("scripts/database/AddKey.php", {'email' : email , 'key' : encodekey },function (data){
   
 //  var urluser = getParameterByName('urlemail'); 
   $.post("scripts/database/email-changepassword.php", {'email' : email , 'url' : urlemail , 'keyemail' : encodekey } ,function (data){
   alert("Please check your email for your reset password link");
   window.location.href = '#login';
   document.getElementById("updateEmail").value = "";
   }); 
   });     
     }
   });    
  }
}


function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}


function b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/*mahnoush
*Submitt new password
* Checks that the password and confirmpasword are filled and goes to log in page
* Expects #newPassword & #cfmPassword input fields are filled
* Alerts user when passwords do not match
* No output or return value on success
*/


window.updatePassword=function(){

var pass = $("#newPassword").val();  
var email = $("#updatePassIDUser").val();  
if (pass == "" || email ==""){
  alert("Please complete the form.")
}else{
  
  var getkey = getParameterByName('key');
  var pass = $("#newPassword").val();  
 
  var timeSent = b64DecodeUnicode(getkey);
 timeSent = timeSent.substr(0, timeSent.indexOf('-'));
 var oneDay = 24 *60 * 60 * 1000; // hours * minutes * seconds * milliseconds
 if (oneDay < (new Date().getTime() - timeSent)) {
   alert("More than one day has passed since you requested a password change. You must request a 'Reset Password' again");
   return;
 } 

  //var newInfo = {"pass" : pass , "id" : id , "getkey" : getkey} ;
  var newInfo = {"pass" : pass ,"getkey" : getkey} ;
    $.post("scripts/database/updatePassword.php", newInfo, function(data){
      
      alert(data);
      
      window.location.href = '#login';
      document.getElementById("frmNewPassword").reset();
  });
  }
}
//Insert email & accept terms and condition - Mahnoush
window.accept=function () {
   var email = $("#acceptEmail").val(); 
   if (email == "" ){  
     alert("please insert your email address");
   }
   else {      

       var newInfo = {"email" : email } ;
        $.post("scripts/database/email-acceptTerms.php", newInfo, function(data){

      });

      alert("Thank you, general access password will be send to your email");
      document.getElementById("acceptEmail").value=""; 
      window.location.href = '#fpage';
   
   }  
}











 


  

