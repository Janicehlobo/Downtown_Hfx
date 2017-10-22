<?php
//Gurmeet Singh
session_start();
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
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	if (isset($_SESSION["userlogin"])){
         $userid = $_SESSION['userlogin'];
		 $fyear = $_SESSION['fyeari'];
         $tyear = $_SESSION['tyeari'];
	     $ind = $_SESSION['ind'];
	     $status3 = $_SESSION['status3'];	
		
	  }
	if($status3 == "" && $ind == ""){
    $sql = ("SELECT user.email,user.ustatus, cooptable.coopName, cooptable.industry, datatable.year, datatable.assetSize, datatable.revenueSize, kpitable.title, kpivalue.kpiValue 
	from user, access,cooptable, datatable, kpitable, kpivalue 
	where user.iduser = access.user_iduser && access.cooptable_idcoop = cooptable.idcoop && cooptable.idcoop = datatable.cooptable_idcoop && datatable.iddata = kpivalue.datatable_iddata && kpitable.idkpi = kpivalue.kpitable_idkpi && datatable.year BETWEEN :fyear AND :tyear
   	order by user.iduser");
	}
	elseif($ind == ""){
	$sql = ("SELECT user.email,user.ustatus, cooptable.coopName, cooptable.industry, datatable.year, datatable.assetSize, datatable.revenueSize, kpitable.title, kpivalue.kpiValue 
	from user, access,cooptable, datatable, kpitable, kpivalue 
	where user.iduser = access.user_iduser && access.cooptable_idcoop = cooptable.idcoop && cooptable.idcoop = datatable.cooptable_idcoop && datatable.iddata = kpivalue.datatable_iddata && kpitable.idkpi = kpivalue.kpitable_idkpi && datatable.year BETWEEN :fyear AND :tyear && user.ustatus = :status3
   	order by user.iduser");	
	}
	elseif($status3 == ""){
	$sql = ("SELECT user.email,user.ustatus, cooptable.coopName, cooptable.industry, datatable.year, datatable.assetSize, datatable.revenueSize, kpitable.title, kpivalue.kpiValue 
	from user, access,cooptable, datatable, kpitable, kpivalue 
	where user.iduser = access.user_iduser && access.cooptable_idcoop = cooptable.idcoop && cooptable.idcoop = datatable.cooptable_idcoop && datatable.iddata = kpivalue.datatable_iddata && kpitable.idkpi = kpivalue.kpitable_idkpi && datatable.year BETWEEN :fyear AND :tyear && cooptable.industry = :ind
   	order by user.iduser");	
	}
	else{
	$sql = ("SELECT user.email,user.ustatus, cooptable.coopName, cooptable.industry, datatable.year, datatable.assetSize, datatable.revenueSize, kpitable.title, kpivalue.kpiValue 
	from user, access,cooptable, datatable, kpitable, kpivalue 
	where user.iduser = access.user_iduser && access.cooptable_idcoop = cooptable.idcoop && cooptable.idcoop = datatable.cooptable_idcoop && datatable.iddata = kpivalue.datatable_iddata && kpitable.idkpi = kpivalue.kpitable_idkpi && datatable.year BETWEEN :fyear AND :tyear && cooptable.industry = :ind && user.ustatus = :status3
   	order by user.iduser");	
	}
    $stmt = $conn->prepare($sql);
     $stmt->bindValue(':fyear', $fyear);
    $stmt->bindValue(':tyear', $tyear);

    if($ind != "") {
	$stmt->bindValue(':ind', $ind);
    }
    if ($status3 != "") {
	$stmt->bindValue(':status3', $status3);
    }
    $stmt->execute(); 
    

    // Set the resulting array to associative
    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
    // Output all the rows in JSON format
    echo json_encode($stmt->fetchAll());
}
catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
$conn = null;
?>

