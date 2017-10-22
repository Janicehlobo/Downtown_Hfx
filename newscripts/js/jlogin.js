
$("#btnEnter").keypress(function(event){
    if(event.keyCode == 13){
        $("#btnEnter").click();
    }
});


window.InsertMonth=function () {
var addMonth = $('#monthRange').val();
   
   var monthAdd = {"monthrange" : addMonth};
		 //alert(addMonth);
		 $.post('newscripts/addMonth.php', monthAdd, function(data){
			 
		//	 alert(data);
		 });
		 location.reload();
 };

window.cancelBackDataEntry= function (){
//var id = $('#email').val();

var id = sessionStorage.getItem("emailID");
  //alert(id);

   if (id == "admin"){
    //document.getElementById(id).reset();
    window.location.href = '#AdminDataEntryMenu';
    location.reload();

   }else {

    //document.getElementById(id).reset();
    window.location.href = '#DataEntryMenu';
    location.reload();
  }

   };
  
 
 
 
function getYear(){
	var year = new Date().getFullYear();
	var txtyear = document.getElementById("dataYear");
	txtyear.value=year;
	txtyear.disabled=true;
	var edittxtyear = document.getElementById("editdataYear");
	edittxtyear.value=year;
	edittxtyear.disabled=true;
	//window.onload=getYear();
};
//window.onload=getYear();


function GetMonth() {
   //var btype =  $("#AddBtype").val();
   $.post("newscripts/getMonth.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
     
	 data = JSON.parse(data);
	 
	 //var bName = data[0].BusinessType;
	// var c = document.getElementById("email");
  var dropdownmonth = document.getElementById("getMonthRange");
  //var editdropdownmonth = document.getElementById("editgetMonthRange");
     for(var i in data){
		 var month = data[i].monthrange;
		 //$('#businesstype').add(bName);
		 var option = document.createElement("option");
        option.text  =month;
        dropdownmonth.add(option);
		//editdropdownmonth.add(option);
		 //document.write(data[i].BusinessType);  
	 }
     
    
    });
 };

window.onload=GetMonth();

function editGetMonth() {
   //var btype =  $("#AddBtype").val();
   $.post("newscripts/getMonth.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
     
	 data = JSON.parse(data);
	 
	 //var bName = data[0].BusinessType;
	// var c = document.getElementById("email");
  //var dropdownmonth = document.getElementById("editgetMonthRange");
  var editdropdownmonth = document.getElementById("editgetMonthRange");
     for(var i in data){
		 var month = data[i].monthrange;
		 //$('#businesstype').add(bName);
		 var option = document.createElement("option");
        option.text  =month;
        //dropdownmonth.add(option);
		editdropdownmonth.add(option);
		 //document.write(data[i].BusinessType);  
	 }
     
    
    });
 };

window.onload=editGetMonth();

function ReportBtype() {
   //var btype =  $("#AddBtype").val();
   $.post("newscripts/AddBtype.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
     
	 data = JSON.parse(data);
	 
	 //var bName = data[0].BusinessType;
	 //var c = document.getElementById("email");
  //var p = document.getElementById("businesstype");
  var b = document.getElementById("btypereport");
     for(var i in data){
		 var bName = data[i].BusinessType;
		 //$('#businesstype').add(bName);
		 var option = document.createElement("option");
        option.text  =bName;
        //p.add(option);
		b.add(option);
		 //document.write(data[i].BusinessType);  
	 }
     
    
    });
	
	
 };

function GetBtype() {
   //var btype =  $("#AddBtype").val();
   $.post("newscripts/AddBtype.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
     
	 data = JSON.parse(data);
	 
	 //var bName = data[0].BusinessType;
	 //var c = document.getElementById("email");
  var p = document.getElementById("businesstype");
  //var b = document.getElementById("btypereport");
     for(var i in data){
		 var bName = data[i].BusinessType;
		 //$('#businesstype').add(bName);
		 var option = document.createElement("option");
        option.text  =bName;
        p.add(option);
		//b.add(option);
		 //document.write(data[i].BusinessType);  
	 }
     
    
    });
	
	
 };
window.onload=GetBtype();


window.InsertBtype=function () {
   var btype =  $("#AddBtype").val();
   
  // alert("ok");
   if ( btype == ""){   
   alert("please enter business type to add");
 }
 else {
        
         var registerUser = {"btype" : btype};
		// alert(btype);
		 $.post('newscripts/btype.php', registerUser, function(data){
			 
			// alert(data);
		 });
         
      
   } 
   document.getElementById("AddBtype").value= "";
   location.reload();
 };
 
 window.forgotPassword=function(){
var email =  $("#forgotEmail").val();
  
           if ( email == ""){   
   alert("Please enter your email");
 } else{
         var userEmail = {"email" : email};
		
		 $.post('newscripts/passwordMailer.php',userEmail, function(data){
		
		
			 //data = JSON.parse(data);
			 var status=data;
			 if(status == 0)
			 {
				 alert("Error sending an email, Please contact your administrator");
			 }
			 
			 else if(status ==1){
				 
				 alert("Invalid Email ID");
			 }
			 else{
				 alert("An email containing the password has been sent");
				 window.location.replace("#login");
			 }
			 document.getElementById("forgotEmail").value= "";
		 });
         
		 }
    
	
};


 window.getCompany=function(){
//var email =  $("#email").val();
  
   
    //alert("data cap");
   

        var email = sessionStorage.getItem('emailID');

         var userEmail = {"email" : email};
	//	 alert(email);
		 $.post('newscripts/member.php',userEmail, function(data){
			 //var a;
			 data = JSON.parse(data);
			 
			 var status=data["company"];
			 var txtCompany = document.getElementById("userCompany");
	txtCompany.value=status;
	txtCompany.disabled = true;
	
		 var edittxtCompany = document.getElementById("edituserCompany");
	edittxtCompany.value=status;
	edittxtCompany.disabled = true;	
	//getAlldetails(status);
	
	
		 });
         
      
    //return status;
	
};


 window.editgetCompany=function(){
//var email =  $("#email").val();
  
   
    //alert("data cap");
   

        var email = sessionStorage.getItem('emailID');

         var userEmail = {"email" : email};
	//	 alert(email);
		 $.post('newscripts/member.php',userEmail, function(data){
			 //var a;
			 data = JSON.parse(data);
			 
			 var status=data["company"];
			
	
		 var edittxtCompany = document.getElementById("edituserCompany");
	edittxtCompany.value=status;
	edittxtCompany.disabled = true;	
	getAlldetails(status);
	
	
		 });
         
      
    //return status;
	
};


window.resetPassword=function(){
var email =  $("#existingEmail").val();
  var currpassword =  $("#currPassword").val();
  var newpassword =  $("#NewPassword").val();
  
  
   
    
   if ( email == "" || password == ""){   
   alert("Please check your input is correct");
 }
 else if(newpassword.length > 8){
	 alert("Password cannot be greater than 8 characters long");
	 
 }
   
    
 else {
        
         var resetPass = {"email" : email, "currpassword" : currpassword, "newpassword" : newpassword};
		 //alert(email);
		 $.post('newscripts/resetPassword.php',resetPass, function(data){
			 data = JSON.parse(data);
			 var status=data;
			 if(status == '0')
			 {
				 alert("Invalid user");
			 }
			 
			 else if(status =='1'){
				 
				 alert("Invalid password");
			 }
			 else{
				 alert("Password  has been updated");
				 window.location.replace("#login");
			 }
			 
		 });
         
      
   } 
   document.getElementById("existingEmail").value= "";document.getElementById("currPassword").value= "";
   document.getElementById("NewPassword").value= "";
 };
 
 
window.loginInput=function(){
var email =  $("#email").val();
  var password =  $("#password").val();
   
   sessionStorage.setItem('emailID', email);
   if ( email == "" || password == ""){   
   alert("Please check your input is correct");
 }
 else {
        
         var loginUser = {"email" : email, "password" : password};
		 
		 $.post('newscripts/checkNewUserEmail.php',loginUser, function(data){
			 data = JSON.parse(data);
			 var status=data["userId"];
			 if(status == 0)
			 {
				 alert("Invalid user");
				 document.getElementById("email").value= "";
   document.getElementById("password").value= "";
			 }
			 else if(status == 'error'){
				 alert("Invalid password, Please try again");
				 document.getElementById("email").value= "";
   document.getElementById("password").value= "";
				 
			 }
			 else if(status == 1){
				 window.location.replace("#adminHome");
				 
				 
			 }
			 else{
				 
				 window.location.replace("#userHomePage");
			 }
			 
		 }); 
      
   } 
   //document.getElementById("email").value= "";
   //document.getElementById("password").value= "";
 };   
 
 
 window.addBusinessDetails=function () {
   var company =  $("#userCompany").val();
   var year =  $("#dataYear").val();
   var colNames = [];
   var colValues = [];
   //var phone = $("#txtRegisterlphone").val();
  // var tax =  $("#tax").val(); 
  // var emp=$("#emp").val();   
  // var sales=  $("#sales").val();
   var monthRange = document.getElementById("getMonthRange");
var month = monthRange.options[monthRange.selectedIndex].value;
//var size = $("#size").val();  
   //var confirmPassuser = $("#txtConfirmPassword").val(); 
   
   //alert("ok");
    var oTable = document.getElementById('myTable');

    //gets rows of table
    var rowLength = oTable.rows.length;

    //loops through rows    
    for (i = 0; i < rowLength; i++){

      //gets cells of current row  
       var oCells = oTable.rows.item(i).cells;

       //gets amount of cells of current row
       var cellLength = oCells.length;

       //loops through each cell in current row
       

              // get your cell info here

              var cellVal0 = oCells.item(0).innerHTML;
			  
              colNames.push(cellVal0);
			  var cellVal1 = oCells.item(1).innerHTML;
			  var txtvalue=document.getElementById(cellVal0).value;
			 // alert(txtvalue);
           colValues.push(txtvalue);
    }
   
  // alert(colNames);
   var colNames = JSON.stringify(colNames);
   var colValues = JSON.stringify(colValues);
   
   //alert(colValues);
   
   if ( company == "" || year == "" || month== "Please select"){   
   alert("Please complete all the required fields");
  
 }
 
 else {
        
         var dataEntry = {"company" : company, "year" : year, "month" : month, "colNames": colNames, "colValues":colValues };
		// alert(fname);
		 $.post('newscripts/memberData.php', dataEntry, function(data){
			 
			 alert(data);
		 });
         
      
   } 
  // document.getElementByName("kpitxt").value= "";
   window.location.replace("#AdminDataEntryMenu");
 };
 
 
 
 
	   
window.checkUserForm=function () {
   var fname =  $("#txtRegisterfname").val();
   var lname =  $("#txtRegisterlname").val();
   //var phone = $("#txtRegisterlphone").val();
   var email =  $("#txtRegisterEmail").val(); 
   var phone=$("#txtRegisterlphone").val();   
   var passworduser=  $("#txtRegisterPassword").val();
   var btypeu = document.getElementById("businesstype");
var btype = btypeu.options[btypeu.selectedIndex].value;
var confirmpassword = $("#txtConfirmPassword").val();  
   //var confirmPassuser = $("#txtConfirmPassword").val(); 
   var companyname = $("#txtCompanyname").val();
var ck =    /^[A-Za-z ]+$/ ;
var ckemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var ckphone= /\d{3}-\d{3}-\d{4}|\d{10}/;

//var a = checkUserEmail();
		 
		 



   //alert("ok");
   if ( fname == "" || lname == "" || email == "" || passworduser == "" || phone == "" || companyname == ""|| confirmpassword == ""){   
   alert("Please complete all the required fields");
  
 }
 else if(!ck.test(fname)){
	 alert("First name should contain only letters");
	 
 }
 else if(!ck.test(lname)){
	 alert("Last name should contain only letters");
	 
 }
 
 
 else if (!ckemail.test(email))
  {  
    alert("Invalid Email ID");
  }
else if(passworduser.length > 8 || confirmpassword.length>8){
	 alert("Password cannot be greater than 8 characters long");
	 
 }
  
 else if(passworduser != confirmpassword){
	 
	 alert("Please check your password is correct");
	 document.getElementById("txtRegisterPassword").value= "";
	 document.getElementById("txtConfirmPassword").value= "";
 }
 
 else {
        
         var registerUser = {"fname" : fname, "lname" : lname, "email" : email, "phone" : phone, "password" : passworduser ,"company" : companyname,"btype": btype};
		// alert(fname);
		 $.post('newscripts/login.php', registerUser, function(data){
			 
			 alert(data);
		 });
         
      window.location.replace("#login");
   } 
   document.getElementById("txtRegisterfname").value= "";document.getElementById("txtRegisterlname").value= "";
   document.getElementById("txtRegisterEmail").value= "";
   document.getElementById("txtRegisterlphone").value= "";document.getElementById("txtRegisterPassword").value= "";
   document.getElementById("txtCompanyname").value= "";document.getElementById("txtConfirmPassword").value= "";
   
   
 };
 
 window.checkUserEmail=function () {
	 
	 var email =  $("#txtRegisterEmail").val(); 
	var loginUser = {"email" : email}; 
 $.post('newscripts/checkNewUserEmail.php',loginUser, function(data){
			 data = JSON.parse(data);
		 var status=data["userId"];
 
 if(status == 1 || status == 'error'){
	 alert("User already exists");
	 
	 }
	 else{
		 
		 checkUserForm();
	 }
	 
 });
 
 }
  window.logout =function(){
    var r = confirm("Do you want to logout?");
    if (r){
      $.post("newscripts/logout.php", null, function(data){
      window.location.href = '#login';
      location.reload();
    }); 
    
  } 
  }