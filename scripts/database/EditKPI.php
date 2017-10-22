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
    date_default_timezone_set('America/Halifax');
    $idkpi = $_POST['idkpi'];
    $title = $_POST['title'];
    $category = $_POST['category'];
    $kstatus = $_POST['kstatus'];
    $unit = $_POST['unit'];
    $definition = $_POST['definition'];
    $updatedAt = date('y-m-d');
    
    $sql = ("UPDATE kpitable SET title = :title , category = :category , kstatus = :kstatus, 
        unit = :unit , definition = :definition, updatedAt = :updatedAt , updatedBy = :userid where idkpi = :idkpi ");

    $stmt = $conn->prepare($sql);
    $stmt->execute(array('title' => $title ,'unit' => $unit ,'definition' => $definition ,'category' => $category,
                           'kstatus' => $kstatus ,'idkpi' => $idkpi, 'updatedAt' => $updatedAt, 'userid' => $userid ));

    echo" KPI has been updated ";

}
catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
$conn = null;
?>