<?php
 $servername = file_get_contents("../../config/servername.txt");
 $servername = trim($servername);
 $username = file_get_contents("../../config/username.txt");
 $username = trim($username);
 $password = file_get_contents("../../config/password.txt");
 $password = trim($password);
 $dbname = file_get_contents("../../config/database.txt");
 $dbname = trim($dbname);
 $port = file_get_contents("../../config/port.txt");
 $port = trim($port);

if ($_POST["password"] != "MahMaDakMeet") exit;

try {
$conn = new PDO("mysql:host=localhost;port=$port;dbname=$dbname", $username, $password);
$stmt = $conn->prepare("SHOW TABLES");
$stmt->execute();
$stmt->setFetchMode(PDO::FETCH_ASSOC);
$tables = $stmt->fetchAll();

// Disable foreign key checks
echo "SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;\n";
echo "SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;\n";
echo "SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO';\n"; 

foreach($tables as $table) {
  $table = $table["Tables_in_" . $dbname];
  echo "-- Table " . $table . "\n";
  echo "DROP TABLE IF EXISTS " . $table . ";\n\n";

  $stmtCreate = $conn->prepare("SHOW CREATE TABLE " . $table);
  $stmtCreate->execute();
  $stmtCreate->setFetchMode(PDO::FETCH_ASSOC);
  $createValue = $stmtCreate->fetch();
  echo $createValue['Create Table'];
  echo ";\n\n";

  $stmt2 = $conn->prepare("SELECT * FROM " . $table);
  $stmt2->execute();
  $stmt2->setFetchMode(PDO::FETCH_ASSOC);
  $values = $stmt2->fetchAll();
  if (count($values) > 0) {
   echo "INSERT INTO " . $table . " VALUES \n";
   for ($i = 0; $i<count($values); $i++) {
    $row_values = array_values($values[$i]);
    echo "(";
    for ($j = 0; $j<count($row_values); $j++) {
      if (is_null($row_values[$j])) {
        echo "NULL";
      } elseif (is_numeric($row_values[$j])) {
        echo $row_values[$j];
      } else {
        // include quotes
        echo '"'.$row_values[$j].'"';
      }
      if ($j != count($row_values) - 1) {
        echo ",";
      }
    }
    echo ")";
    if ($i != count($values) - 1) {
      echo ",";
    } else {
      echo ";";
    }
    echo "\n";
   }
  }
  echo "\n\n";
}

// Enable foreign key checks
echo "SET SQL_MODE=@OLD_SQL_MODE;\n";
echo "SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;\n";
echo "SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;\n";

} catch (PDOException $e) {
  echo "Error: " . $e->getMessage();
}
$conn = null;
exit;
?>
