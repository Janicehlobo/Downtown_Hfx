 /* add new coop-Fatma & Mahnoush
 *
 */

 window.checkAddcoopForm=function  (){
     
     var newcoop =  $("#txtCoopNameuser").val();
     var industry =  $("#txtindustryuser").val();
     var type =  $("#txttypeuser").val();
     var postalcode =  $("#txtpostalcodecoop").val();
     var province =  $("#txtprovinceuser").val();
     var country =  $("#txtcountryuser").val();
     var language =  $("#txtlanguageuser").val();
     
 if (newcoop == "" || industry == "Please select" || type == "Please select" || language == "Please select"){
   
   alert("please complete your basic information or check your input is correct");
 }
 else {
    
     document.getElementById("frmAddcoop").reset();
     var data = {'txtCoopName' : newcoop, 'txtindustry' : industry , 'txttype' : type , 'txtpostalcode' : postalcode , 'txtprovince' : province , 'txtcountry' : country , 'txtlanguage' : language };

     $.post("scripts/database/InsertCoop.php", data ,function (data){

      var data = JSON.parse(data);
       if (data == "admin"){
        window.location.href = "#Cooperatives";
        location.reload();

       }else if (data == "user"){
        window.location.href = "#Profile";
        location.reload();
       }
       });
    }
   }





