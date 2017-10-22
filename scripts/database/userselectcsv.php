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
		 $frmyear = $_SESSION['fyearc'];
         $toyear = $_SESSION['tyearc'];
	     $con = $_SESSION['con'];
	     $status1 = $_SESSION['status1'];
	  }
	if($con == "" && $status1 == ""){
    $sql = ("SELECT user.email,user.ustatus, cooptable.coopName, cooptable.country, datatable.year, datatable.assetSize, datatable.revenueSize, kpitable.title, kpivalue.kpiValue from user, access,cooptable, datatable, kpitable, kpivalue where user.iduser = access.user_iduser && access.cooptable_idcoop = cooptable.idcoop && cooptable.idcoop = datatable.cooptable_idcoop && datatable.iddata = kpivalue.datatable_iddata && kpitable.idkpi = kpivalue.kpitable_idkpi && datatable.year BETWEEN :frmyear AND :toyear order by user.iduser");
	}
	elseif($status1 == ""){
	$sql = ("SELECT user.email,user.ustatus, cooptable.coopName, cooptable.country, datatable.year, datatable.assetSize, datatable.revenueSize, kpitable.title, kpivalue.kpiValue from user, access,cooptable, datatable, kpitable, kpivalue where user.iduser = access.user_iduser && access.cooptable_idcoop = cooptable.idcoop && cooptable.idcoop = datatable.cooptable_idcoop && datatable.iddata = kpivalue.datatable_iddata && kpitable.idkpi = kpivalue.kpitable_idkpi && datatable.year BETWEEN :frmyear AND :toyear && cooptable.country = '$con' order by user.iduser");
	}
	elseif($con == ""){
	$sql = ("SELECT user.email,user.ustatus, cooptable.coopName, cooptable.country, datatable.year, datatable.assetSize, datatable.revenueSize, kpitable.title, kpivalue.kpiValue from user, access,cooptable, datatable, kpitable, kpivalue where user.iduser = access.user_iduser && access.cooptable_idcoop = cooptable.idcoop && cooptable.idcoop = datatable.cooptable_idcoop && datatable.iddata = kpivalue.datatable_iddata && kpitable.idkpi = kpivalue.kpitable_idkpi && datatable.year BETWEEN :frmyear AND :toyear && user.ustatus = '$status1' order by user.iduser");
	}
	else{
	$sql = ("SELECT user.email,user.ustatus, cooptable.coopName, cooptable.country, datatable.year, datatable.assetSize, datatable.revenueSize, kpitable.title, kpivalue.kpiValue from user, access,cooptable, datatable, kpitable, kpivalue where user.iduser = access.user_iduser && access.cooptable_idcoop = cooptable.idcoop && cooptable.idcoop = datatable.cooptable_idcoop && datatable.iddata = kpivalue.datatable_iddata && kpitable.idkpi = kpivalue.kpitable_idkpi && datatable.year BETWEEN :frmyear AND :toyear && user.ustatus = '$status1' && cooptable.country = '$con' order by user.iduser");
	}
    $stmt = $conn->prepare($sql);
    $stmt->bindValue(':frmyear', $frmyear);
    $stmt->bindValue(':toyear', $toyear);
 
    if($con != "") {
	$stmt->bindValue(':con', $con);
    }
    if ($status1 != "") {
	$stmt->bindValue(':status1', $status1);
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