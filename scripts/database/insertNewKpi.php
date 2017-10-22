
<?php 
//mahnoush
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
   	$kpi = $_POST['kpi'];   	
	$category = $_POST['category'];
	$unit = $_POST['unit'];	
	$definition = $_POST['definition'];
    $createdAt = date('y-m-d');
	

	$kpi_SQLinsert = "INSERT INTO kpitable (title, category, kstatus, unit, definition ,createdAt, createdBy)
	VALUES ( :kpi , :category , 'active', :unit, :definition , :createdAt , :userid )";

 
	$result = $conn->prepare($kpi_SQLinsert);
	$result ->execute(array('kpi' => $kpi , 'unit' => $unit , 'definition' => $definition , 'category' => $category, 
	                     'createdAt' => $createdAt, 'userid' => $userid));	


   if ($result){
	   echo "KPI created successful.";		
     }
     else {
	    echo "KPI created Failed.";
	   }

  $conn = null; 

	   }


catch(PDOException $e)
    {
    echo "Connection failed: " . $e->getMessage();
    }

	   
	  
?>


