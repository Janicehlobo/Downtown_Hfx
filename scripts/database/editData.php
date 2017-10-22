<?php

//select distinct datatable_iddata, kpitable_idkpi from kpivalue;
/*mahnoush*/
session_start();
ini_set('display_errors',1);
error_reporting(E_ALL); 

 $servername = file_get_contents("../../config/servername.txt");
 $servername = trim($servername);
 $username = file_get_contents("../../config/username.txt");
 $username = trim($username);
 $port = file_get_contents("../../config/port.txt");
 $port = trim($port);
 $password = file_get_contents("../../config/password.txt");
 $password = trim($password);
 $dbname = file_get_contents("../../config/database.txt");
 $dbname = trim($dbname);

try {

	$conn = new PDO("mysql:host=localhost;port=$port;dbname=$dbname", $username, $password);
	$conn -> setAttribute (PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    if (isset($_SESSION["userlogin"])){
         $userid = $_SESSION['userlogin'];
      }
    date_default_timezone_set('America/Halifax');
    $coop = $_POST['coop']; 
    $id = $_POST['id'];   
	$year = $_POST['year'];
	$iddata = $_POST['iddata'];
	$fiscalyear = $_POST['fiscalyear'];
	$assetsize = $_POST['assetsize'];
	$revenuesize = $_POST['revenuesize'];
	$updatedAt = date('y-m-d');

	$kpidatas = json_decode($_POST['kpivalues']); 

    $datatable_SQLinsert = ("UPDATE datatable SET  fiscalyear = :fiscalyear'--01--01', assetsize = :assetsize, revenuesize = :revenuesize, 
    updatedBy = :userid, updatedAt = :updatedAt where cooptable_idcoop = :id AND year = :year'--01--01' ");

    $result1 = $conn->prepare($datatable_SQLinsert);
    $result1->execute(array('assetsize' => $assetsize ,'revenuesize' => $revenuesize , 'fiscalyear'=> $fiscalyear, 'userid'=> $userid,
    	                     'updatedAt'=> $updatedAt, 'id'=> $id,'year' => $year));

    $kpivalue_SQLinsert = "REPLACE INTO kpivalue VALUES ";
	foreach ($kpidatas as $key=>$kpidata) { 
		
		$kpivalue_SQLinsert .= "('".$kpidata[1]."',(SELECT createdAt from datatable where iddata = :iddata) ,null, :updatedAt ,(SELECT createdBy from datatable where iddata = :iddata), :iddata , '".$kpidata[0]."', :userid)" ;

		if(($key+1) < count($kpidatas)){
			$kpivalue_SQLinsert .= ",";
		}else{
			$kpivalue_SQLinsert .= ";";	
		}
	}
	$result2 = $conn->prepare($kpivalue_SQLinsert);
   		$result2->execute(array('iddata' => $iddata , 'updatedAt' => $updatedAt , 'userid' => $userid ));
	
   if ($result1 && $result2){
	   echo "Updated  successfully.";	
	
     }
     else{
	    echo "Update Failed.";
	   }
	   $conn = null;

	   }
	   
catch(PDOException $e)
    {
    echo "Connection failed: " . $e->getMessage();
    }    
	   
?>


