<?php
/*Mahnoush*/
 
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
      }
    
   
  $sql = ("SELECT user.iduser, user.firstName, user.lastName, user.telephone, user.ustatus, user.email, access.role, access.cooptable_idcoop,
  cooptable.coopName from user join access on user.iduser = access.user_iduser left join cooptable on access.cooptable_idcoop = cooptable.idcoop order by user.ustatus, user.firstName");
  
    $stmt = $conn->prepare($sql);
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