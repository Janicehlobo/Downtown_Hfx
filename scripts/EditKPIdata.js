/*Mahnoush
*Shows active KPIs in CPI dataentry page
*/

window.showKPIEdit=function(){
  window.location.href = '#DataEditPage';
    location.reload();
  }


$(document).ready(function(){
  $.post("scripts/database/ShowActiveKPI.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
      data = JSON.parse(data);
      var p = document.getElementById("kpilistEdit"); 
      
      var out =  "<div>";

         for (var i = 0; i < data.length; i ++){

         out += "<input type='hidden'  id='IDkpiedit"+i+"' value='" + 
         data[i].idkpi + "'></input>"+

         "<div data-role='main' class='ui-content'><a href='#popkpi"+i+"'  data-rel='popup'" +
         "class='ui-btn ui-corner-all ui-icon-comment ui-btn-icon-notext'" +
         "data-arrow='t' transition='pop'></a></div>"+

        "<input class='title' type='text'  readonly id='titlekpiedit"+i+"' value= '" + 
        data[i].title + ":'></input>"+

        "<input class='data' type='number'  id='kpiedit"+i+"' name='kpi"+i+"' required></input>"+

        "<div data-role='popup' data-history='false' id='popkpiedit"+i+"' class='ui-content' value='"+ 
        "' ><p> </p></div> ";
       }
        out +="</div>";
        p.innerHTML = out ;
        
      // Trigger a refresh in jQuery Mobile so that it will display your changes
      $('[data-role="content"]').trigger('create');
  });
  return false;
});


  window.editKPIDataCoopId=function(){

  var coop = $("#datacoopnameEdit").val();
  var newInfo = {"coop" : coop } ;

    $.post("scripts/database/editDataCoopId.php", newInfo, function(data){
        data = JSON.parse(data); 
        var  idcoop = data[0].idcoop;
         $('#txtIDcoop').val(idcoop);

         var newInfo = {"idcoop" : idcoop } ;
          $.post("scripts/database/editDataYear.php", newInfo, function(data){

          data = JSON.parse(data);
            document.getElementById('yearEdit').innerHTML = "";
            var select = document.getElementById('yearEdit');  
            var option;
            option = document.createElement('option');
            option.text = "Please select Year"
            select.add(option);
        
          for (var i = 0; i < data.length; i++) {
              option = document.createElement('option');              
              option.text = data[i].year.substring(0,4);
              select.add(option);
            }
       });
    });
  }


  $(document).ready(function(){
    
    displayRevenue('revenuesizeEdit');
    displayAsset('assetsizeEdit');
  });

window.editKPIDataID=function(){ 
  var coopid = $("#txtIDcoop").val();
  var year = $('#yearEdit').val();
  

  var newInfo = { "coopid" : coopid, "year" : year } ;

  // displayRevenue('revenuesizeEdit');
    $.post("scripts/database/editDataID.php", newInfo, function(data){

        
        data = JSON.parse(data);        
        var  iddata = data[0].iddata;
        var  fiscalyear = data[0].fiscalYear.substring(0,4);
        var  assetsize = data[0].assetSize;
        var  revenuesize = data[0].revenueSize;
        alert("Please insert data for all KPIs");


        $('#txtIdData').val(iddata);
        $('#fiscalyearEdit').val(fiscalyear);
        $('#fiscalyearEdit').selectmenu('refresh');
        $('#assetsizeEdit').val(assetsize);
        $('#assetsizeEdit').selectmenu('refresh');
        $('#revenuesizeEdit').val(revenuesize);
        $('#revenuesizeEdit').selectmenu('refresh');

  });
}

window.editKPIData=function(){
  var coop = $("#datacoopnameEdit").val();
  var id = $("#txtIDcoop").val();
  var year =  $("#yearEdit").val();
  var iddata = $("#txtIdData").val();
  var fiscalyear = $("#fiscalyearEdit").val();   
  var assetsize =  $("#assetsizeEdit").val();
  var revenuesize = $("#revenuesizeEdit").val();
 

  var values = new Array();  
  if (coop == "" || year == "" || fiscalyear == "" || assetsize == "" || revenuesize == "" ){
    alert("please complete all fields");
  } else {
    $.post("scripts/database/ShowActiveKPI.php", null, function(data){
      // Change the data from plain text that PHP echo'd to a JavaScript object
      data = JSON.parse(data);
      for (var i = 0 ; i < data.length; i ++) {
        var x = new Array();
        x[0] =  data[i].idkpi;
        x[1] = $("#kpiedit"+i).val();
        values.push(x);
      }
      var kpivalues = JSON.stringify(values);
      var newInfo = {"coop" : coop , "id" : id , "year" : year , "iddata" : iddata ,"fiscalyear" : fiscalyear ,
        "assetsize" : assetsize ,"revenuesize" : revenuesize, "kpivalues" : kpivalues } ;
      $.post("scripts/database/editData.php", newInfo, function(data){
        alert(data);
        location.reload(true);   
      });    
    });
  }
};







