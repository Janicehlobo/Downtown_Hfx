<?php
/*Vivek Karunakaran*/
 
session_start();
$username="jh_lobo";

$dsn="mysql:dbname=jh_lobo;host=localhost";

$password="A00415463";

try {
   
    $conn = new PDO($dsn, $username, $password);
    $conn -> setAttribute (PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $kpiid = json_decode($_POST['kpivalues']);
	
		$sql1 = ("TRUNCATE TABLE CheckedKPI");
		$stmt = $conn->prepare($sql1);
		$stmt->execute();
	
		foreach ($kpiid as $kpidata) {
			
		$kpivalue_SQLinsert = "INSERT INTO CheckedKPI(KPIName) SELECT KPIName from KPITable where KPIid=";
		$kpivalue_SQLinsert .= $kpidata;
	
			$kpivalue_SQLinsert .= ";";	
			$result1 = $conn->prepare($kpivalue_SQLinsert);
		$result1 -> execute();
		
	}
if ($result1){
	   echo "KPI selected";	
     }
     else{
	    echo "Could not select KPI, Please try again";
	   }	
		
}
catch(PDOException $e)
{
  echo "Connection failed: " . $e->getMessage();
}
$conn = null;
?>