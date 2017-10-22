<?php
//fatma
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
    $conn -> setAttribute (PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if (isset($_SESSION['userlogin']) && $_SESSION["isLoggedIn"]){
         $userid = $_SESSION['userlogin'];
        $userrole = $_SESSION["userrole"];
      

     if ($userrole =='user'){

       $sql = "SELECT DISTINCT(coopName) FROM access, cooptable, datatable where access.cooptable_idcoop = cooptable.idcoop AND 
               cooptable.idcoop = datatable.cooptable_idcoop AND cooptable.cstatus = 'Active' AND access.user_iduser= :userid";
       $stmt = $conn->prepare($sql);
       $stmt->execute( array('userid' => $userid  )); 

    }elseif ($userrole =='admin'){

       $sql = "SELECT DISTINCT(coopName) FROM cooptable, datatable where cooptable.cstatus = 'Active' AND cooptable.idcoop = datatable.cooptable_idcoop ";
       $stmt = $conn->prepare($sql);
       $stmt->execute();     
    }

      $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
    // Output all the rows in JSON format
      echo json_encode($stmt->fetchAll());
  
}
}
catch(PDOException $e)
{
  echo "Connection failed: " . $e->getMessage();
}
$conn = null;
?>