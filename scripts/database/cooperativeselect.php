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
	$fyear = $_POST['fromyearco'];
    $tyear = $_POST['toyearco'];
	$coop = $_POST['coop'];
	$status2 = $_POST['status2'];	
	if (isset($_SESSION["userlogin"])){
         $userid = $_SESSION['userlogin'];
	     $_SESSION['fyear'] = $_POST['fromyearco'];
         $_SESSION['tyear'] = $_POST['toyearco'];
	     $_SESSION['coop'] = $_POST['coop'];
	     $_SESSION['status2'] = $_POST['status2'];
	  }
	if($coop =="" && $status2 == ""){
    $sql = ("SELECT user.email,user.ustatus, cooptable.coopName, cooptable.type, datatable.year, datatable.assetSize, datatable.revenueSize, kpitable.title,kpivalue.kpiValue 
	from user, access,cooptable, datatable, kpivalue, kpitable 
	where user.iduser = access.user_iduser && access.cooptable_idcoop = cooptable.idcoop && cooptable.idcoop = datatable.cooptable_idcoop && datatable.iddata = kpivalue.datatable_iddata && kpitable.idkpi = kpivalue.kpitable_idkpi && datatable.year BETWEEN :fyear AND :tyear
   	order by user.iduser");
	}
	else if($status2 == ""){
    $sql = ("SELECT user.email,user.ustatus, cooptable.coopName, cooptable.type, datatable.year, datatable.assetSize, datatable.revenueSize, kpitable.title,kpivalue.kpiValue 
	from user, access,cooptable, datatable, kpivalue, kpitable 
	where user.iduser = access.user_iduser && access.cooptable_idcoop = cooptable.idcoop && cooptable.idcoop = datatable.cooptable_idcoop && datatable.iddata = kpivalue.datatable_iddata && kpitable.idkpi = kpivalue.kpitable_idkpi && datatable.year BETWEEN :fyear AND :tyear && cooptable.coopName = :coop
   	order by user.iduser");
	}
	else if($coop == ""){
    $sql = ("SELECT user.email,user.ustatus, cooptable.coopName, cooptable.type, datatable.year, datatable.assetSize, datatable.revenueSize, kpitable.title,kpivalue.kpiValue 
	from user, access,cooptable, datatable, kpivalue, kpitable 
	where user.iduser = access.user_iduser && access.cooptable_idcoop = cooptable.idcoop && cooptable.idcoop = datatable.cooptable_idcoop && datatable.iddata = kpivalue.datatable_iddata && kpitable.idkpi = kpivalue.kpitable_idkpi && datatable.year BETWEEN :fyear AND :tyear && user.ustatus = :status2
   	order by user.iduser");
	}
	else{
	$sql = ("SELECT user.email,user.ustatus, cooptable.coopName, cooptable.type, datatable.year, datatable.assetSize, datatable.revenueSize, kpitable.title,kpivalue.kpiValue 
	from user, access,cooptable, datatable, kpivalue, kpitable 
	where user.iduser = access.user_iduser && access.cooptable_idcoop = cooptable.idcoop && cooptable.idcoop = datatable.cooptable_idcoop && datatable.iddata = kpivalue.datatable_iddata && kpitable.idkpi = kpivalue.kpitable_idkpi && datatable.year BETWEEN :fyear AND :tyear && cooptable.coopName = :coop && user.ustatus = :status2
   	order by user.iduser");	
	}
    $stmt = $conn->prepare($sql);
    $stmt->bindValue(':fyear', $fyear);
    $stmt->bindValue(':tyear', $tyear);

    if($coop != "") {
	$stmt->bindValue(':coop', $coop);
    }
    if ($status2 != "") {
	$stmt->bindValue(':status2', $status2);
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