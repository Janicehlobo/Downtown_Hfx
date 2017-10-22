<?php
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
	$year = $_POST['year'];
	$fiscalyear = $_POST['fiscalyear'];
	$assetsize = $_POST['assetsize'];
	$revenuesize = $_POST['revenuesize'];
	$createdAt = date('y-m-d');   
	$kpidatas = json_decode($_POST['kpivalues']); 

    $datatable_SQLinsert = "INSERT INTO datatable (year, fiscalyear, assetsize, revenuesize, createdBy, cooptable_idcoop, createdAt)
    VALUES (:year'--01--01', :fiscalyear'--01--01', :assetsize , :revenuesize , '$userid', (SELECT idcoop from cooptable where coopName = :coop) , '$createdAt')";

    $result1 = $conn->prepare($datatable_SQLinsert);
    $result1->execute(array('assetsize' => $assetsize ,'revenuesize' => $revenuesize , 'coop' => $coop ,'fiscalyear'=> $fiscalyear,'year' => $year));  

    $last_id = $conn->lastInsertId();

	$kpivalue_SQLinsert = "INSERT INTO kpivalue (kpiValue, createdAt, createdBy, datatable_iddata , kpitable_idkpi) VALUES ";
	foreach ($kpidatas as $key=>$kpidata) {
		
		$kpivalue_SQLinsert .= "('".$kpidata[1]."', '$createdAt', '$userid', '$last_id' , '".$kpidata[0]."')" ;

		if(($key+1) < count($kpidatas)){
			$kpivalue_SQLinsert .= ",";
		}else{
			$kpivalue_SQLinsert .= ";";	
		}
	}
	$result2 = $conn->prepare($kpivalue_SQLinsert);
    $result2->execute(); 
   if ($result1 && $result2){
	   echo "Insert  successful.";	
     }else{
	    echo "Insert  Failed.";
	   }
	   $conn = null;
	   }
catch(PDOException $e)
    {
    	echo"For this cooperative and selected year, data is available. If you wish to revise data please use 'Edit data' option. ";
    //echo "Connection failed: " . $e->getMessage();
    }    
	   
?>


