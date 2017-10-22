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
	$fyear = $_POST['fromyearuco'];
    $tyear = $_POST['toyearuco'];
	if (isset($_SESSION["userlogin"])){
        $userid = $_SESSION['userlogin'];
        $_SESSION['fyearucoa']= $_POST['fromyearuco'];
		$_SESSION['tyearucoa']=$_POST['toyearuco'];		 
	  }
	
	$sql = ("SELECT cooptable.industry, cooptable.type, cooptable.language, datatable.year, datatable.assetSize, datatable.revenueSize, kpitable.title, kpivalue.kpiValue from user, access,cooptable, datatable, kpitable, kpivalue where (user.iduser = access.user_iduser && access.cooptable_idcoop = cooptable.idcoop && cooptable.idcoop = datatable.cooptable_idcoop && kpitable.idkpi=kpivalue.kpitable_idkpi && datatable.iddata= kpivalue.datatable_iddata && datatable.year BETWEEN :fyear AND :tyear && cooptable.coopName = (select cooptable.coopName from user, access, cooptable where user.iduser = :userid 
    && user.iduser = access.user_iduser && access.cooptable_idcoop = cooptable.idcoop) && (select count(distinct user.iduser) from user, access, cooptable, datatable where user.iduser = access.user_iduser && access.cooptable_idcoop = cooptable.idcoop && cooptable.coopName = (select cooptable.coopName from user, access, cooptable where user.iduser = '$userid' && user.iduser = access.user_iduser && access.cooptable_idcoop = cooptable.idcoop)) >2) order by user.iduser");
    $stmt = $conn->prepare($sql);
    $stmt->execute(array('fyear' => $fyear, 'tyear' =>$tyear , 'userid' => $userid));

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

