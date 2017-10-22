/*Mahnoush
*Shows active KPIs in CPI dataentry page
*/
window.showKPI=function(){
  window.location.href = '#DataEntryPage';
    location.reload();
  }

$(document).ready(function(){
  $.post("scripts/database/ShowActiveKPI.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
      data = JSON.parse(data);
      var p = document.getElementById("kpilist");
      var out =  "<div>";
         for (var i = 0; i < data.length; i ++){
         out += "<input type='hidden'  id='IDkpi"+i+"' value='" + 
         data[i].idkpi + "'></input>"+
         "<div data-role='main' class='ui-content'><a href='#popkpi"+i+"'  data-rel='popup'" +
         "class='ui-btn ui-corner-all ui-icon-comment ui-btn-icon-notext'" +
         "data-arrow='t' transition='pop'></a>"+
         "<div data-role='popup' data-history='false' id='popkpi"+i+"' class='ui-content' value='"+ 
         "' ><p> "+data[i].definition+"</p></div></div> "+
         "<input class='title'  type='text'  readonly id='titlekpi"+i+"' value= '" + 
         data[i].title + ":'></input>"+
         "<input class='data' type='number'  id='kpi"+i+"' name='kpi"+i+"' required></input>";
        }
        out +="</div>";
        p.innerHTML = out ;
        var popups = $("[id^=popkpi]");
         for (var i = 0; i < popups.length; i++) {
         $(popups[i]).popup();
       }
      // Trigger a refresh in jQuery Mobile so that it will display your changes
      $('[data-role="content"]').trigger('create');
  });
  return false;
});



window.saveKPIData=function(){

  var coop = $("#datacoopname").val();
  var year =  $("#year").val();
  var fiscalyear = $("#fiscalyear").val();   
  var assetsize =  $("#assetsize").val();
  var revenuesize = $("#revenuesize").val();
  var values = new Array();
  

  if (coop == "Please select" || year == "Please select" || fiscalyear == "Please select" || assetsize == "Please select" || revenuesize == "Please select" ){
    alert("please complete all fields");
  } else {
    $.post("scripts/database/ShowActiveKPI.php", null, function(data){
          // Change the data from plain text that PHP echo'd to a JavaScript object
      data = JSON.parse(data);  
       
      for (var i = 0 ; i < data.length; i ++) {
        var x = new Array();
        x[0] =  data[i].idkpi;
        x[1] = $("#kpi"+i).val();
        values.push(x);
      }
      
      var kpivalues = JSON.stringify(values);

      var newInfo = {"coop" : coop , "year" : year ,"fiscalyear" : fiscalyear ,
      "assetsize" : assetsize ,"revenuesize" : revenuesize, "kpivalues" : kpivalues } ;

      $.post("scripts/database/saveData.php", newInfo, function(data){
        alert(data);
        location.reload(true);
      });
    });
  }
};


window.cancelBackDataEntry= function (id){

  $.post("scripts/database/back.php", null,function (data){     
  
  var data = JSON.parse(data);

   if (data == "admin"){
    document.getElementById(id).reset();
    window.location.href = '#AdminDataEntryMenu';
    location.reload();

   }else if (data == "user"){

    document.getElementById(id).reset();
    window.location.href = '#DataEntryMenu';
    location.reload();
  }

   }); 
  
}

window.cancelBackEditData= function (id){

  $.post("scripts/database/back.php", null,function (data){     
  
  var data = JSON.parse(data);

   if (data == "admin"){
    document.getElementById(id).reset();
    window.location.href = '#AdminDataEntryMenu';
    location.reload();

   }else if (data == "user"){

    document.getElementById(id).reset();
    window.location.href = '#DataEntryMenu';
    location.reload();
  }

   }); 
  
}












